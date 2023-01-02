# SplitChunk

核心要解决的问题：代码重复问题

> Webpack 4之前使用commonChunkPlugins，之后使用splitChunks
>
> [在淘宝优化了一个大型项目，分享一些干货(Webpack，SplitChunk代码实例，图文结合) - 掘金](https://juejin.cn/post/6844904183917871117#heading-10)

## Webpack SplitChunk默认配置

```JavaScript
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // 对哪些chunk进行拆包 all（所有）、initial（入口代码块）、async（异步chunk）
      minSize: 20000, // 生成chunk的最小体积，大于该值才会被拆包
      minRemainingSize: 0, // 剩余chunk需大于0，避免出现零块
      minChunks: 1, // chunk最少被引用次数，大于该值才会被拆包
      maxAsyncRequests: 30, // 拆包后，异步Chunk并行请求最大数
      maxInitialRequests: 30,   // 拆包后，入口代码块并行请求最大数
      enforceSizeThreshold: 50000, // 如果某个chunk大小大于该值，强制进行代码分割
      // 缓存组策略
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 正则匹配
          priority: -10, //优先级，当模块同时命中多个缓存组的规则时，分配到优先级高的缓存组
          reuseExistingChunk: true,// 是否复用其他chunk已拥有的模块，false：拆分出复用模块，给双方引用；true：直接复用其他chunk的模块。 
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

## 配置项

### maxSize

大于该值的模块才会被提取

### minChunks

模块被引用次数，模块引用次数大于该值才会被提取

### maxInitialRequests

决定入口**最多分成的代码块数量**

### maxAsyncRequests

按需加载时，代码块的最大数量。

### reuseExistingChunk

> https://segmentfault.com/q/1010000019710855/a-1020000021486049

- false：拆分出复用模块，多方引用。（可能会影响chunk命名）
- true（默认值）：直接复用已存在的chunk模块

### enforceSizeThreshold

强制拆包。而maxSize只提醒，不强制执行。

Tips：没用过，demo跑起来not work，暂不处理。

### name【重要】

> https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksname

各个取值及表现

- false（默认值）：基于代码块与缓存组key生成名称，生成多个chunk
- String 或 函数 ：自定义名称，生成一个chunk。
  - webpack5之前：如果splitChunk.name与入口文件name重复，则入口文件会被移除。webpack5以后：不允许cacheGroup名称覆盖入口名称，会报错。
  - 如果两个缓存组name一致，则会打包到一个chunk中

## SplitChunksPlugin 原理

> 源码地址：https://github1s.com/webpack/webpack/blob/a16909c5fdb9efe9f1dd20226a1e7fc216160d1a/lib/optimize/SplitChunksPlugin.js#L735

所有的webpack plugins统一以apply方法作为入口，注册事件。

```js
apply(compiler) {
	// compiler是webpack编译器实例，全局唯一，包含webpack环境的所有配置信息
	compiler.hooks.thisCompilation.tap("SplitChunksPlugin", compilation => {
		// compilation是每次编译的资源实例，通过它能得到当前编译的所有模块和资源信息
		// compilation拥有事件流机制，可以监听事件并触发回调（就是观察者模式），这里就是在优化事件发生时，执行代码分割逻辑
		compilation.hooks.optimizeChunks.tap(
			{
				name: "SplitChunksPlugin",
				stage: STAGE_ADVANCED
			},
			chunks => {
				// 三步走，完成代码分割优化
			}
		)
	}
}
```

### 1. 准备阶段

预处理阶段，定义数据和方法

#### chunkSetsInGraph

**作用：**提取公共的module。通过收集modulekey -> module chunksSet的映射，可以判断module是否被重复打入chunk

Key：chunksKey（对应一个module）

Value：该module的chunks集合，即chunksSet

```js
// modulekey -> module chunksSet的映射
const chunkSetsInGraph = new Map();
/**
 * 为包含该module的chunks生成一个key值，即每个module对应一个key，也对应chunksSet，后续我们判断module chunksSet的size 就可以判断module是否在chunk中重复了
 */
for (const module of compilation.modules) {
  // chunkGraph.getModuleChunksIterable(module)：根据module获取其chunks集合。
  // getKey(chunks)：获取chunks的key值。暂时不需要了解细节
  const chunksKey = getKey(chunkGraph.getModuleChunksIterable(module));
  if (!chunkSetsInGraph.has(chunksKey)) {
    chunkSetsInGraph.set(
      chunksKey,
      new Set(chunkGraph.getModuleChunksIterable(module)) // 该module的chunks集合
    );
  }
}
```

#### chunkSetsByCount

**作用：**计算每个module的引用次数，用于minChunks匹配。

Key：number

Value：chunkSet数组

```js

// 计算每个module的引用次数
const chunkSetsByCount = new Map();
/**
 * 匹配minChunks属性，可以根据minChunks（module的最小重复次数）直接找到对应的chunksSet的集合，
 * 注意，一个module对应一个chunksSet，一个count对应多个chunksSet，也就对应多个module，等同于count -> module的映射
 */
for (const chunksSet of chunkSetsInGraph.values()) {
  // 遍历chunkSetsInGraph，统计每个chunks集合的chunk数量，即每个module的重复次数，建立数量和chunks集合的映射
  const count = chunksSet.size;
  let array = chunkSetsByCount.get(count);
  if (array === undefined) {
    array = [];
    chunkSetsByCount.set(count, array);
  }
  array.push(chunksSet);
}
```

#### chunksInfoMap【最重要】

**作用：**分割缓存组，键名为根据name属性生成的key值，键值为该key值对应的modules、chunks和cacheGroup信息对象

key：cacheGroup.key + name

value：对象，包含一系列信息



- chunksInfoMap 存储着代码分割信息，每一项都是一个缓存组，对应于最终要分割出哪些额外代码块，会不断迭代，最终将代码分割结果加入 chunkGraph 中，而 chunkGraph 最终会生成我们见到的打包文件。当然，这些缓存组目前还附带一些额外信息，比如 cacheGroup，就是我们配置的 cacheGroup 代码分割规则，用于后续校验；再比如 sizes，记录了缓存组中模块的总体积，用于之后判断是否符合我们配置的 minSize 条件。

- addModuleToChunksInfoMap 就是向 chunksInfoMap 中添加新的代码分割信息，每次添加都会根据 key 值选择是创建新的缓存组还是在已有缓存组中添加模块，并更新缓存组信息。

```js
// 关键的Map结构，每一项对应一个分割出来的缓存组，键名为根据name属性生成的key值，键值为该key值对应的modules、chunks和cacheGroup信息对象
const chunksInfoMap = new Map();

const addModuleToChunksInfoMap = (
  cacheGroup,
  selectedChunks,
  selectedChunksKey,
  module
) => {
  const name = cacheGroup.getName(module, selectedChunks, cacheGroup.key);
  // 略：检查名称是否和已有的chunk有冲突，此外，webpack5以后不允许cacheGroup名称覆盖入口名称，会报错
  
  /**
   * - 如果cachGroup有name，直接采用name
   *。   - 每个module的key都一样
   * - 如果cachGroup没有name，用从cacheGroup和chunk生成的key值（selectedChunksKey）。
   *     - 每个module会生成不同key，最后每个module都会单独打成一个包，即多个包。
   */
  const key =
    cacheGroup.key + (name ? ` name:${name}` : ` chunks:${selectedChunksKey}`);
  // Add module to maps
  let info = chunksInfoMap.get(key);
  if (info === undefined) {
    chunksInfoMap.set(
      key,
      // 初始化
      (info = {
        // 会自动sort的Set
        modules: new SortableSet(undefined, compareModulesByIdentifier),
        cacheGroup,
        name,
        // 判断minSize是否为正值
        validateSize:
          hasNonZeroSizes(cacheGroup.minSize) ||
          hasNonZeroSizes(cacheGroup.minRemainingSize),
        sizes: {},
        chunks: new Set(),
        reuseableChunks: new Set(),
        chunksKeys: new Set(),
      })
    );
  }
  info.modules.add(module);
  // 计算代码块的体积
  if (info.validateSize) {
    for (const type of module.getSourceTypes()) {
      info.sizes[type] = (info.sizes[type] || 0) + module.size(type);
    }
  }
  // 将代码块加入到chunksInfoMap中，以便最后打包
  if (!info.chunksKeys.has(selectedChunksKey)) {
    info.chunksKeys.add(selectedChunksKey);
    for (const chunk of selectedChunks) {
      info.chunks.add(chunk);
    }
  }
};
```

#### combinationsCache

**作用：** 获得可能满足minChunks条件chunks集合，用于后续和minChunks条件比对

找到module对应的chunkSets，再根据chunkSets长度找到其子集，找子集的意义是什么？



Key：chunkSetsKey（即对应一个module）

Value：Chunkset数组

![image-20230101220906386](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/image-20230101220906386.png)

```js
// key: module key，value：chunksSet
const combinationsCache = new Map();

// 获得可能满足minChunks条件chunks集合，用于后续和minChunks条件比对
// key为module，即chunksKey
const getCombinations = (key) => {
	// 根据 chunksKey获取对应的chunksSet
  const cacheEntry = combinationsCache.get(key);
  // 已有缓存，直接return
  if (cacheEntry !== undefined) return cacheEntry;

  // 根据key值取出该module对应的chunks集合（chunksSet）
  const chunksSet = chunkSetsInGraph.get(key);
  // 结果集
  var array = [chunksSet];
  // chunksSet.size：module被引用的次数
  // 如果当前module被多次引用，尝试张
  if (chunksSet.size > 1) {
    // count：被引用次数，setArray：chunksSet数组
    for (const [count, setArray] of chunkSetsByCount) {
      // 为什么是 < 因为要找子集，只能找数量更少的
      if (count < chunksSet.size) {
        // 每个module对应一个set，这里是找出setArray的子集，防止遗漏
        for (const set of setArray) {
          // isSubset(A,B)：B是否为A的子集
          // 如果是子集，说明是公共代码，将公共chunkset push进结果集
          if (isSubset(chunksSet, set)) {
            array.push(set);
          }
        }
      }
    }
  }
  // 存入
  combinationsCache.set(key, array);
  return array;
};

const isSubset = (bigSet, smallSet) => {
	if (bigSet.size < smallSet.size) return false;
	for (const item of smallSet) {
		if (!bigSet.has(item)) return false;
	}
	return true;
};
```

### 2. 分组阶段

遍历所有module，若满足缓存组条件，则调用addModuleToChunksInfoMap方法，将module加入对应的缓存组中。

拿出combinations数组，每个元素判断其size，>minChunks说明引用数满足条件，将对应chunks加入到chunksInfoMap中

根据cacheGroups进行分组，仅检查minChunks和chunks规则

```js
for (const module of compilation.modules) {
  // getCacheGroups(module)：获取module命中的缓存组，test或其他条件过滤，可能命中多个cacheGroup
  let cacheGroups = this.options.getCacheGroups(module, context);
  if (!Array.isArray(cacheGroups) || cacheGroups.length === 0) {
    continue;
  }

  // 包含同一个module的chunk会对应唯一的key值，以便接下来获取要优化的chunks集合
  const chunksKey = getKey(
    // 获得所有包含该module的chunk
    chunkGraph.getModuleChunksIterable(module)
  );
  let combs = combinationsCache.get(chunksKey);
  if (combs === undefined) {
    // 这是准备阶段定义的方法，获得可能满足minChunks条件chunks集合，用于后续和minChunks条件比对
    combs = getCombinations(chunksKey);
    combinationsCache.set(chunksKey, combs);
  }

  for (const cacheGroupSource of cacheGroups) {
    // 将的cacheGroup配置都取出来，如果值不存在，则会从splitChunks全局配置继承
    const cacheGroup = this._getCacheGroup(cacheGroupSource);
    // 这里就是根据我们的cacheGroup配置，筛选出符合minChunks和chunks规则的chunk
    for (const chunkCombination of combs) {
      // 如果不满足minChunks，就直接break，不建立这个缓存组，也就不会分割相应代码
      if (chunkCombination.size < cacheGroup.minChunks) continue;
      // cacheGroup.chunksFilter：其实就是chunks属性 "initial" | "async" | "all"
      const {
        chunks: selectedChunks,
        key: selectedChunksKey,
      } = getSelectedChunks(chunkCombination, cacheGroup.chunksFilter);

      // 将目前符合条件的modules、chunks和cacheGroup信息存到chunksInfoMap中
      addModuleToChunksInfoMap(
        cacheGroup,
        selectedChunks,
        selectedChunksKey,
        module
      );
    }
  }
}
```

### 3. 排队检查阶段

> 源码：https://github1s.com/webpack/webpack/blob/a16909c5fdb9efe9f1dd20226a1e7fc216160d1a/lib/optimize/SplitChunksPlugin.js

- 分组阶段进行了基础的筛查，生成缓存组信息。

- 本阶段将针对cacheGroup配置，进行一项一项的筛查



由于配置比较多，就不一一列举，仅看一些我好奇是如何实现的

- reuseExistingChunk
- maxAsyncRequests

```js
// minSize maxSize判断略

while (chunksInfoMap.size > 0) {
  // 寻找最匹配的cacheGroup分组信息，优先进行分割，优先产生打包结果
  let bestEntryKey;
  let bestEntry;
  for (const pair of chunksInfoMap) {
    const key = pair[0];
    const info = pair[1];
    // compareEntries的过程，就是对比优先级、chunk个数、size大小、group位置等取最优
    if (bestEntry === undefined || compareEntries(bestEntry, info) < 0) {
      bestEntry = info;
      bestEntryKey = key;
    }
  }

  const item = bestEntry;
  chunksInfoMap.delete(bestEntryKey);

  let chunkName = item.name;
  // 由缓存组生成的新chunk
  let newChunk;
  let isExistingChunk = false;
  let isReusedWithAllModules = false;
  // 真正的代码分割从这开始，前面其实都是准备工作
  if (chunkName) {
    const chunkByName = compilation.namedChunks.get(chunkName);
    // 如果在原本的chunks中找到了这样名字的chunk，就将它提取出来，最终会将所有同名chunk合并在一起
    if (chunkByName !== undefined) {
      newChunk = chunkByName;
      item.chunks.delete(newChunk);
      isExistingChunk = true;
    }
    // reuseExistingChunk实现：
  } else if (item.cacheGroup.reuseExistingChunk) {
    // 如果没有设定name，则寻找是否能复用已有的chunk
    outer: for (const chunk of item.chunks) {
      if (chunkGraph.getNumberOfChunkModules(chunk) !== item.modules.size) {
        continue;
      }
      if (chunkGraph.getNumberOfEntryModules(chunk) > 0) {
        continue;
      }
      for (const module of item.modules) {
        if (!chunkGraph.isModuleInChunk(module, chunk)) {
          continue outer;
        }
      }
      if (!newChunk || !newChunk.name) {
        newChunk = chunk;
      } else if (chunk.name && chunk.name.length < newChunk.name.length) {
        newChunk = chunk;
      } else if (
        chunk.name &&
        chunk.name.length === newChunk.name.length &&
        chunk.name < newChunk.name
      ) {
        newChunk = chunk;
      }
    }
    if (newChunk) {
      item.chunks.delete(newChunk);
      chunkName = undefined;
      isExistingChunk = true;
      isReusedWithAllModules = true;
    }
  }

  // 该缓存组内没有chunk，则跳过本次循环，又因为之前chunksInfoMap.delete(bestEntryKey)删除了该缓存组，所以相当于从代码分割的结果集中去除了没有chunk的缓存组
  if (item.chunks.size === 0 && !isExistingChunk) continue;

  const usedChunks = Array.from(item.chunks);
  let validChunks = usedChunks;
  // 检测缓存组中的代码块是否满足maxInitialRequests和maxAsyncRequests条件，如果它们都是无穷大，就没必要检测了
  if (
    Number.isFinite(item.cacheGroup.maxInitialRequests) ||
    Number.isFinite(item.cacheGroup.maxAsyncRequests)
  ) {
    validChunks = validChunks.filter((chunk) => {
      // 如果chunk是初始代码块，只需判断maxInitialRequests条件是否满足；
      // 如果chunk不是初始代码块，只需判断maxAsyncRequests条件是否满足；
      // 如果chunk可以作为初始代码块，就取两者最小值；不过目前这个分支条件是走不到的，因为目前版本代码块只有初始（作为入口）或者非初始（懒加载）
      const maxRequests = chunk.isOnlyInitial()
        ? item.cacheGroup.maxInitialRequests
        : chunk.canBeInitial()
        ? Math.min(
            item.cacheGroup.maxInitialRequests,
            item.cacheGroup.maxAsyncRequests
          )
        : item.cacheGroup.maxAsyncRequests;
      // 如果不满足最大请求数的条件，则从validChunks中去除
      return !isFinite(maxRequests) || getRequests(chunk) < maxRequests;
    });
  }

  // 将那些不再包含缓存组中模块的代码块删除
  validChunks = validChunks.filter((chunk) => {
    for (const module of item.modules) {
      if (chunkGraph.isModuleInChunk(module, chunk)) return true;
    }
    return false;
  });

  // 将去除不符合条件的chunk之后的新缓存组加入chunksInfoMap，不断迭代，更新代码分割结果
  if (validChunks.length < usedChunks.length) {
    if (isExistingChunk) validChunks.push(newChunk);
    if (validChunks.length >= item.cacheGroup.minChunks) {
      for (const module of item.modules) {
        addModuleToChunksInfoMap(
          item.cacheGroup,
          validChunks,
          getKey(validChunks),
          module
        );
      }
    }
    continue;
  }

  // Webpack5新特性minRemainingSize，保证chunk被分割后的剩余体积不小于该值，防止出现特别小的单个代码块
  if (
    validChunks.length === 1 &&
    hasNonZeroSizes(item.cacheGroup.minRemainingSize)
  ) {
    const chunk = validChunks[0];
    const chunkSizes = { ...chunkGraph.getChunkModulesSizes(chunk) };
    for (const key of Object.keys(item.sizes)) {
      chunkSizes[key] -= item.sizes[key];
    }
    if (!checkMinSize(chunkSizes, item.cacheGroup.minRemainingSize)) {
      continue;
    }
  }

  // 创建新的代码块，加入我们编译器的chunkGraph，这个新的代码块就是分割出来的公共代码
  if (!isExistingChunk) {
    newChunk = compilation.addChunk(chunkName);
  }
  // 创建了新代码块还不够，还需要建立chunk和chunkGroup之间的关系
  for (const chunk of usedChunks) {
    // Add graph connections for splitted chunk
    chunk.split(newChunk);
  }

 
  if (!isReusedWithAllModules) {
    // 将缓存组中的所有模块都加入新生成的chunk中，就是把缓存组打包成新的代码块
    for (const module of item.modules) {
      // chunkCondition方法现版本永远返回true
      if (!module.chunkCondition(newChunk, compilation)) continue;
      chunkGraph.connectChunkAndModule(newChunk, module);
      // 从缓存组的chunks中删除那些已经被提取出来的模块，达到优化体积的目的
      for (const chunk of usedChunks) {
        chunkGraph.disconnectChunkAndModule(chunk, module);
      }
    }
  } else {
    // 如果缓存组中所有module都被复用了，则从usedChunks中将这些module全部删除，避免冗余
    for (const module of item.modules) {
      for (const chunk of usedChunks) {
        chunkGraph.disconnectChunkAndModule(chunk, module);
      }
    }
  }

  // 从其他缓存组中删除已经被提取出来的模块，避免产生重复代码
  for (const [key, info] of chunksInfoMap) {
    if (isOverlap(info.chunks, item.chunks)) {
      if (info.validateSize) {
        let updated = false;
        for (const module of item.modules) {
          if (info.modules.has(module)) {
            // remove module
            // 删除模块
            info.modules.delete(module);
            // 更新缓存组体积
            for (const key of module.getSourceTypes()) {
              info.sizes[key] -= module.size(key);
            }
            updated = true;
          }
        }
        // 删除重复模块后，要重新判断缓存组体积，如果小于minSize则删除该缓存组
        if (updated) {
          if (info.modules.size === 0) {
            chunksInfoMap.delete(key);
            continue;
          }
          if (!checkMinSize(info.sizes, info.cacheGroup.minSize)) {
            chunksInfoMap.delete(key);
          }
        }
      } else {
        for (const module of item.modules) {
          info.modules.delete(module);
        }
        if (info.modules.size === 0) {
          chunksInfoMap.delete(key);
        }
      }
    }
  }
}
```

### 疑问

combinationCache没看懂

为什么要分成2个阶段：分组阶段和排队检查阶段，而不是一次性把所有都进行检查。

### 其他学习到的知识

