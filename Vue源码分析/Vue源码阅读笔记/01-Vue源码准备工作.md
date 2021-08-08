## 1 Flow

vue.js在做2.0重构时引入了Flow做静态类型检查。

### 1.1 Flow的工作方式

通常类型检查分成 2 种⽅式： 

**类型推断**：通过变量的使⽤上下⽂来推断出变量类型，然后根据这些推断来检查类型。 

**类型注释**：事先注释好我们期待的类型，Flow 会基于这些注释来判断。

#### 1.1.1 类型注释 

类型注释是以冒号 : 开头，可以在函数参数，返回值、变量声明中使⽤。 

**函数类型注释**

```js
function add(x: number, y: number): number { 
    return x + y 
}
```

**数组类型注释**

数组类型注释的格式是 `Array<T> `， T 表⽰数组中每项的数据类型。

```js
/*@flow*/ 
var arr: Array<number> = [1, 2, 3] 
arr.push('Hello')//检查出错误
```

**类和对象**

```js
/*@flow*/ 8
class Bar { 
    x: string; // x 是字符串 
	y: string | number; // y 可以是字符串或者数字 
	z: boolean; 

	constructor(x: string, y: string | number) { 
        this.x = x 
        this.y = y 
        this.z = false } 
}

var bar: Bar = new Bar('hello', 4) 
var obj: { a: string, b: number, c: Array<string>, d: Bar } = { 	a: 'hello', 
    b: 11,                                                         c: ['hello', 'world'], 
    d: new Bar('hello', 3) 
}
```

**Null**

若想任意类型 `T` 可以为 `null` 或者 `undefined` ，只需类似如下写成 `?T `的格式即可。 

```js
/*@flow*/ 
var foo: ?string = null
```

此时， `foo` 可以为字符串，也可以为 `null` 。 

## 2 源码目录分析

Vue.js 的源码都在 src 目录下，其目录结构如下。 

```
src 
├── compiler # 编译相关 
├── core # 核⼼代码 
├── platforms # 不同平台的⽀持 
├── server # 服务端渲染 
├── sfc # .vue ⽂件解析 
├── shared # 共享代码
```

**compiler**

编译相关代码，包括模板解析成ast语法树、ast语法书优化、代码生成。

**core**

核心代码，包括内置组件、全局API封装、Vue实例化、观察者、虚拟DOM

**platforms**

跨平台

**server**

服务器端渲染

**sfc**

解析.vue文件成一个js对象

**shared**

工具方法

## 3 Vue.js源码构建

#### **1、打开package.json文件**

通常⼀个基于 NPM 托管的项目都会有⼀个 package.json 文件，它是对项目的描述文件。找到script脚本。

```js
"scripts": {
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build -- weex"
}
```

在这里我们可以看到3条build的命令，后面两个是在第一条的基础上添加环境参数。

#### **2、打开build.js文件**

```js
//从配置文件中读取配置
let builds = require('./config').getAllBuilds()

//使用命令行参数对配置过滤
//npm run build -- web-runtime-cjs,web-server-renderer
//process.argv[2]获得的其实是 -- 后面的这些参数
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  //把不需要打包的给过滤掉
  builds = builds.filter(b => {
    return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
  })
} else {
  // filter out weex builds by default
  builds = builds.filter(b => {
    return b.output.file.indexOf('weex') === -1
  })
}
```

#### **3、打开config文件，看一下是怎么拿到的配置**

![image-20210507111250000](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210507111250000.png)

暴露了方法来获取配置，使用Object.keys获取builds可枚举对象的属性值，再对buidls中的每一个调用genConfig方法，我们先来看一下builds变量是什么。

**builds变量**

builds是一个对象，其中的每一个key又是一个对象，builds为vue.js不同版本的一个配置。

- `entry ` ：构建的入口文件地址
- `dest `：构建后的JS文件地址
- `format`：构建的格式
  - `cjs`：遵循 CommonJS 规范
  - `es`：遵循 ES Module 规范
  - `umd`：遵循 UMD 规范

![image-20210507111912369](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210507111912369.png)

entry和dest都调用了resolve方法，resolve是什么东西？

**resolve方法**

```js
const aliases = require('./alias')
const resolve = p => {
  //找到根文件的名称
  const base = p.split('/')[0]
  //找到根文件绝对路径
  if (aliases[base]) {
    //根文件绝对路径 拼接后面的字符串，得到一个完整的绝对路径
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}
```

以`entry: resolve('web/entry-runtime.js')`为例，resolve找到base为`web`，去alias寻找`web`的绝对路径，存在`web`的绝对路径，与`entry-runtime.js`拼接，即可得到完整的绝对路径。

再以`dest: resolve('dist/vue.runtime.common.dev.js')`为例，找不到`dist`的绝对路径，使用path.resolve找到上一级并找到dist。

**alias方法**

提供到最终真实文件地址的一个映射关系。

`path.resolve`是`node.js`提供的一个路径解析的方法，会把一个路径解析为一个绝对路径。

`__dirname为当前目录`

```js
const path = require('path')

//
const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  entries: resolve('src/entries'),
  sfc: resolve('src/sfc')
}
```

至此，我们就知道builds变量里的东西是什么啦，其实就是不同vue.js版本的配置。

紧接着，我们来看**genConfig方法**

**调用genConfig方法**

genConfig方法，干了什么了？其实就是把我们的配置转换成rollup真正所需要的配置。

![image-20210507115355056](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210507115355056.png)

这样子，我们就完整的config配置了。我们返回build.js文件继续看逻辑

#### **4.返回build.js文件**

在前面，我们已经分析了如何获取config配置，并且通过命令行参数对config进行了过滤，接下来进行编译，调用`build`函数。

```js
build(builds)
//编译
function build(builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    //使用buildEntry方法，对配置进行一个一个编译
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}
```

build函数中调用buildEntry方法，对配置进行一个一个编译，buildEntry又干了什么了？接着看

```js
//拿到当前config
function buildEntry(config) {
  const output = config.output
  const { file, banner } = output
  const isProd = /(min|prod)\.js$/.test(file)
  //进行rollup编译
  return rollup.rollup(config)
    //output对应我们刚刚看到的dest目标
    .then(bundle => bundle.generate(output))
    .then(({ output: [{ code }] }) => {
      if (isProd) {
        const minified = (banner ? banner + '\n' : '') + terser.minify(code, {
          toplevel: true,
          output: {
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).code
        return write(file, minified, true)
      } else {
        return write(file, code)
      }
    })
}
```

buildEntry主要就是拿到config，使用rollup编译，并生成文件。

至此编译完成。

## 4 Vue初始化的过程

![image-20210510164310365](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210510164310365.png)

打开`src/platforms/web/entry-runtime-with-comipiler.js`，这是Runtime-Compiler构建Vue的入口，我们可以看到`import Vue from './runtime/index'`，这句话是关键代码，我们跟进去看看

![image-20210510152456422](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210510152456422.png)

紧接着我们再跟着他的思路进入`runtime/index`，咦？怎么还要继续import，我继续跟进`core/index`。

![image-20210510152624194](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210510152624194.png)

这里有两处关键代码`import Vue from './instance/index'`和`initGlobalAPI`方法初始化全局Vue API。

继续跟进`instance/index`。

![image-20210510153600212](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210510153600212.png)

### 4.1 Vue的定义

终于到底啦~看到Vue的定义了，原来Vue是一个function函数，那么这个时候就有一个问题了，**为什么不使用ES6的Class实现Vue了？**

如果使用Class类实现，需要在一个文件内对Vue进行一个完整的实现，而使用Function，我们可以在其prototype上面扩展方法，将Vue按功能把扩展分散到多个模块，更方便维护和管理。

![image-20210510152847348](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210510152847348.png)

我们再看一下下面的代码`initMixin(Vue)`、`stateMixin(Vue)`等等，这些方法它在做什么了？我们进入`init.js`里面看一下。其实在这个代码里，就是给Vue.prototype添加了扩展方法，其他也都是一样的。

![image-20210510160202223](C:%5CUsers%5CAsus%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210510160202223.png)

![image-20210510160358764](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210510160358764.png)

另外我还有一个问题，Vue为什么要层层嵌套地import？一次性import instance/index.js中的Vue不行吗？

**这个问题暂时没有解决，希望大佬可以解答**

### 4.2 InitGlobalAPI 方法

`InitGlobalAPI`方法用于在 Vue 上扩展的⼀些全局方法的定义。

![image-20210510154643458](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210510154643458.png)

## 5 Runtime Only和 Runtime Compiler的区别

**Runtime Only**

- 运行效率高
- 源代码量更少
- runtime-only 其实只能识别render函数，不能识别template，.vue文件中的template在编译阶段被 vue-template-compiler 翻译成了render函数。

**runtime-compiler的步骤：**
template -> ast -> render -> virtual dom -> 真实dom

**runtime-only的步骤**
render -> virtual dom -> 真实dom

## 6 日常提问/自测题

#### 1、为什么Vue是一个Function，不是一个Class类？

如果使用Class类实现，需要在一个文件内对Vue进行一个完整的实现，而使用Function，我们可以在其prototype上面扩展方法，将Vue按功能把扩展分散到多个模块，更方便维护和管理。

**如果要弄开源库，可以借鉴这个方法，在不同的文件中定义不同的方法，再使用prototype mixin我们的对象上。**

#### 2、Vue初始化的过程干了什么？

Vue在整个初始化的过程中，使用一堆`xxxxMixin`方法给Vue添加扩展方法，主要是在其prototype上面扩展方法。

然后使用InitGlobalAPI方法，在Vue上扩展的⼀些全局方法的定义。

#### 3、Vue为什么要层层嵌套地import？一次性import instance/index.js中的Vue不行吗

import Vue from './runtime/index' → import Vue from 'core/index' → import Vue from './instance/index'

我怀疑和设计模式相关，暂时无解，欢迎大佬解答~

## 7 总结

至此，Vue初始化过程就了解完毕啦~