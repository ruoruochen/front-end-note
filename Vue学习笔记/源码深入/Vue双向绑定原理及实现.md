# Vue 双向绑定原理及实现

## 前言

![20220301093759](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220301093759.png)

如果有人问你 Vue 双向绑定的原理，你一定会脱口而出：

Vue 是通过数据劫持、发布者订阅者模式实现的双向绑定。通过`Object.defineProperty`或`Proxy`进行数据劫持，把数据变为可观察属性，当数据发生变化时通知视图发生改变；当视图改变的时候，通过事件监听的方式通知数据变化。

数据通知视图改变，这个过程涉及到四个主要的对象：Observer、Dep、Watcher 和 Compiler

- Observer: 监听器。用于劫持并监听所有属性，当属性发生变化时，通知订阅者。
- Dep: 订阅管理器。用于收集订阅者，在监听器 Observer 和订阅者 Watcher 之间进行统一管理。
- Watcher: 订阅者。收到属性的变化通知，执行相应函数更新视图。
- Compiler: 解析器。用于扫描和解析模版指令，初始化视图。生成相应的订阅者，加入到 Dep 中。

整个过程的流程图：

![20220301095041](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220301095041.png)

如果让你手动实现一个 Vue 的双向绑定，你会吗？本文将以最简单的方式让你成功写出一个 Vue 双向绑定的代码。

提前展示一下效果：
![vue-bind](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/vue-bind.gif)

## 一、Observer 的实现

监听器 Observer，其主要作用是为了让数据变得可观测，可以感知到每个数据的读、写。Vue 的实现核心则是使用`Object.defineProperty`/`Proxy`来劫持数据。通过递归的方式遍历所有属性值。

具体`Object.defineProperty`的 API 参考 MDN: [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

**`Object.defineProperty`实现**

```js
class Observer {
  constructor(value) {
    this.value = value;
    // 递归进行，数据劫持
    this.walk(value);
  }

  // 递归子属性
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }

  defineReactive(obj, key, val) {
    // 创建订阅者Observer、并递归子属性
    this.observe(val);
    // 数据劫持当前属性
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        console.log("获取数据", val);
        return val;
      },
      set: function reactiveSetter(newVal) {
        console.log("设置新值", newVal);
        val = newVal;
      },
    });
  }

  // 创建订阅者Observer、并递归子属性
  observe(value) {
    // 不是对象
    if (!value || typeof value !== "object") {
      return;
    }
    let ob = new Observer(value);
    return ob;
  }
}

const data = {
  name: "ruoruochen",
  address: {
    city: "Peking",
    area: "ChaoYang",
  },
};

new Observer(data);

data.name = "ruoruochen2"; //设置新值 ruoruochen2

data.address.area = "DongCheng";
//获取数据 { city: [Getter/Setter], area: [Getter/Setter] }
// 设置新值 DongCheng
```

由此，一个最简单的 Observer 实现了。

## 二、Dep 的实现

Dep 是消息管理器，用于收集订阅器，在监听器 Observer 和订阅器 Watcher 之间进行统一管理。

既然要进行收集，必然有一个列表进行保存`subs=[]`，要进行消息的统一管理，我们自然而然的想到了发布订阅模式，订阅者将自身 Push 进 subs 中，订阅消息的变化。当监听器发现消息的变化时，通知 Dep，再由 Dep 作为中转站通知的相关的订阅者。

> 有人可能会问，为什么会想到发布订阅模式而不是观察者模式，设计者在设计的时候为什么不使用观察者模式？
> 我们仔细想想，观察者模式是两者直接接触，是耦合 在一起的。而发布订阅模式是通过中转站的模式，使两者解耦。并且考虑到监听数据变化不是一对多的，而是多对多的，这需要借用发布订阅模式的多主题特性。综上，设计者在设计时，使用了发布订阅模式。

思路：

1. 每一个子属性上会有一个 Dep 来管理订阅者
2. 在 get 的时候，判断是否需要添加订阅者，需要则将订阅者 push 进 Dep。
3. 在 set 的时候，将变动通知 Dep。

**Dep 的实现**

```js
let uid = 0;

class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  // 增加订阅者
  addSub(sub) {
    this.subs.push(sub);
  }

  // 移除订阅者
  removeSub(sub) {
    remove(this.subs, sub);
  }

  // 通知
  notify() {
    for (let i = 0; i < this.subs.length; i++) {
      this.subs[i].update();
    }
  }
}

// 抽象utils方法
function remove(array, item) {
  if (array.length) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}
```

**Observer 的改造**

```js
class Observer {
  constructor(value) {
    this.value = value;
    // 递归进行，数据劫持
    this.walk(value);
  }

  // 递归子属性
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }

  defineReactive(obj, key, val) {
    const dep = new Dep();
    // 创建订阅者Observer、并递归子属性
    this.observe(val);
    // 数据劫持当前属性
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        if (需要添加订阅者) {
          dep.addSub(watcher);
        }
        return val;
      },
      set: function reactiveSetter(newVal) {
        if (val === newVal) {
          return;
        }
        // 通知更新
        dep.notify();
        val = newVal;
      },
    });
  }

  // 创建订阅者Observer、并递归子属性
  observe(value) {
    // 不是对象
    if (!value || typeof value !== "object") {
      return;
    }
    let ob = new Observer(value);
    return ob;
  }
}
```

## 三、Watcher 的实现

Watcher:订阅者。用于订阅数据的变化，接到属性变化通知时，执行相应函数更新视图。

由此推测，Watcher 需要以下几个方法：

1. update 更新方法。
2. 初始化时，将自身添加到 Dep 中。

具体细节：

1. 如何将自身添加到 Dep 中呢？

我们知道 Observer 监听器是在 get 函数中执行了添加 Watcher 的操作，所以我们只需要 Watcher 初始化时触发相应的 get 函数去执行添加订阅者的操作即可。

`get`函数，熟悉吗？！数据劫持，搞起来。

2. 另外一个细节点：我们只希望在 Watcher 初始化时才添加订阅者，其他场景，不触发。如何实现？

变量标记法。在 Dep.target 上缓存下订阅者，添加成功后再将其去掉就可以了。

**Watcher 的实现**

```js
import { Dep } from "./dep";

export default class Watcher {
  vm: any;
  exp: string;
  cb: Function;
  value: any;
  // 初始化时将自身加入Dep中
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get(); //强行调用get，将自身加入Dep中
  }

  // 更新函数
  update() {
    this.run();
  }

  run() {
    //最新值
    let value = this.vm.data[this.exp];
    //旧值
    let oldVal = this.value;
    if (value !== oldVal) {
      //更新旧值
      this.value = value;
      // 执行更新函数
      this.cb.call(this.vm, value, oldVal);
    }
  }

  get() {
    Dep.target = this;
    const value = this.vm.data[this.exp];
    Dep.target = null;
    return value;
  }
}
```

**Observer 的改造**

```js
export class Observer {
  constructor(value) {
    this.value = value;
    // 递归进行，数据劫持
    this.walk(value);
  }

  // 递归子属性
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }

  defineReactive(obj, key, val) {
    const dep = new Dep();
    // 创建订阅者Observer、并递归子属性
    this.observe(val);
    // 数据劫持当前属性
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return val;
      },
      set: function reactiveSetter(newVal) {
        if (val === newVal) {
          return;
        }
        // 通知更新
        dep.notify();
        val = newVal;
      },
    });
  }

  // 创建订阅者Observer、并递归子属性
  observe(value) {
    // 不是对象
    if (!value || typeof value !== "object") {
      return;
    }
    let ob = new Observer(value);
    return ob;
  }
}
```

## 四、Compiler 的实现

Compiler 解析器：

1. 用于解析模版指令，初始化视图。
2. 将模版指令对应节点，绑定更新函数。生成相应的订阅者 Watcher。

我们要解析模版指令，首先先获取到 DOM 元素，再对含有指令的节点进行处理，由于这个过程中对 DOM 操作比较频繁，所以我们需要尽可能避免回流。

方法：1. display:none 处理完再放回去。 2. 创建文档片段 document，处理完再插进去。

显然第一种方法是不符合预期的，我们并不希望元素隐藏，所以我们使用第二种方法实现。

作为一个最简单 Compiler 实现，我们现仅考虑 v-on、v-bind、v-model、以及{{}}等场景，进行实现。

思路：拿到 el 对应的 DOM 元素进行解析。（由于 Vue 是单根结构）我们可以获取其子节点进行遍历，判断子节点类型，有以下几种情况

1. Text 节点。则判断是否有{{}}，若有，获取相应的 data 数据进行覆盖，并绑定更新函数。
2. 其他 DOM 节点。如果不包含 Vue 指令，直接不处理，如包含 Vue 指令（即 v-），进行情况判断
   - v-on:给相应节点绑定事件回调，node.addEventListener
   - v-bind:给相应节点绑定属性值，并创建订阅者绑定更新函数
   - v-model:绑定属性值+事件监听，并创建订阅者绑定更新函数

```js
// 解析匹配正则
// {{}}
const braceReg = /\{\{(.*)\}\}/;

export class Compiler {
  options: IVueOptions;
  vm: any;
  constructor(options, vm) {
    this.options = options;
    this.vm = vm;

    // el可以为选择器或DOM元素
    const el =
      options.el instanceof HTMLElement
        ? options.el
        : document.querySelector(options.el);
    // 解析el
    this.compilerElement(el);
  }

  compilerElement(el) {
    const childNodes = el.childNodes;
    [].slice.call(childNodes).forEach((node) => {
      const text = node.textContent;
      const value = node.value;

      if (isElementNode(node)) {
        this.compile(node);
      } else if (isTextNode(node) && braceReg.test(text)) {
        // 如果text节点满足{{}}
        this.compilerText(node, braceReg.exec(text)[1].trim());
      }

      if (node.childNodes && node.childNodes.length) {
        // 遍历子节点
        this.compilerElement(node);
      }
    });
  }

  compile(node) {
    let nodeAttrs = node.attributes;

    Array.prototype.forEach.call(nodeAttrs, (attr) => {
      let attrName = attr.name;
      let text = attr.textContent;
      if (this.isDirective(attrName)) {
        let exp = attr.value;
        let dir = attrName.substring(2);
        if (this.isEventDirective(dir)) {
          this.compileEvent(node, this.vm, exp, dir);
        } else if (this.isModelDirective(dir)) {
          this.compileModel(node, this.vm, exp, dir);
        } else if (this.isBindDirective(dir)) {
          this.compileBind(node, this.vm, exp, dir);
        }
      }
    });
  }

  // 解析带{{}}的Text节点
  compilerText(node, exp) {
    let data = this.vm.data[exp]; // 获取替代{{}}的数据
    this.updateText(node, data); // 更新视图

    // 创建订阅者绑定更新函数
    new Watcher(this.vm, exp, (value) => {
      this.updateText(node, value);
    });
  }

  compileEvent(node, vm, exp, dir) {
    const eventType = dir.split(":")[1];
    const cb = vm.methods && vm.methods[exp];
    if (eventType && cb) {
      // 给Dom元素绑定事件回调
      node.addEventListener(eventType, cb.bind(vm), false);
    }
  }

  compileModel(node, vm, exp, dir) {
    let val = vm.data[exp];

    this.updateModel(node, val);
    // 订阅者
    new Watcher(vm, exp, (value) => {
      this.updateModel(node, value);
    });

    // 添加事件回调
    node.addEventListener("input", (e) => {
      let newVal = e.target.value;
      if (val === newVal) {
        return;
      }
      this.vm.data[exp] = newVal;
      val = newVal;
    });
  }

  compileBind(node, vm, exp, dir) {
    let valueName = dir.split(":")[1];
    let val = vm.data[exp];

    this.updateBind(node, valueName, val);
    // 订阅者
    new Watcher(vm, exp, (value) => {
      this.updateBind(node, valueName, value);
    });
  }

  updateText(node, data) {
    node.textContent = typeof data === "undefined" ? "" : data;
  }

  updateModel(node, data) {
    node.value = typeof data === "undefined" ? "" : data;
  }

  updateBind(node, valueName, data) {
    node[valueName] = typeof data === "undefined" ? "" : data;
  }

  isDirective(name) {
    return name.indexOf("v-") === 0;
  }

  isEventDirective(name) {
    return name.indexOf("on:") === 0;
  }

  isModelDirective(name) {
    return name.indexOf("model") === 0;
  }

  isBindDirective(name) {
    return name.indexOf("bind:") === 0;
  }
}

// 判断是否为Text节点
function isTextNode(node) {
  return node.nodeType === Node.TEXT_NODE;
}

// 判断为DOM其他节点
function isElementNode(node) {
  return node.nodeType === 1;
}
```

## 总结

最后，我们把上面的代码整合在一起，就可以模拟一个最简单的 Vue 了。看到这里，你应该会觉得，原来开发一个 Vue 也没那么难嘛！

全部代码：[Github-MyVue](https://github.com/ruoruochen/MyVue)

![vue-bind](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/vue-bind.gif)

## 其他

一些小思考：

1. 为什么 Observer 类中的方法，不放在类中，而是放在类外？
   ![20220305203335](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220305203335.png)

我认为，这是作者出于内存占用、代码使用场景的思考。

- 我们知道 Observer 类是一个频繁调用的类，如果放在类内部，每次都需要进行方法的创建，消耗太多的内存。而放在类外，就不存在这个问题。

可能有人就要问了，那这样类的方法是不是就没有意义了啊？全放外边好了！这个 walk 方法是不是也可以放外边。

我认为`Class`存在的意义就是抽象性，可以归结为对数据和过程的抽象。具体来说就是三点：封装、继承、多态。

- 封装：它提供了数据和相应方法结合的实现。组织内部的状态和相应的过程，通过调用类提供的方法获取内部状态，调用方法对内部状态进行修改（而不是直接改变状态）。
  - 这样的好处在于，隐藏了方法的实现，限制了状态的改变途径，避免了大型工程中的不同状态和逻辑的混乱，提高了工程的组织性，也提高了生产效率。
- 继承：用现类扩展新类，提高了代码的复用性。
- 多态：使得对象对于同一消息能有不同的应答方式。

其实用一句话来说，Class 的存在可以让我们化简具体的问题与实现，找到合适的实现方案，抽象性让我们忽略具体细节的实现，关注逻辑关系。

**回到上面的话题，为什么 walk 不放在外边？**

我是这样理解的

1. 首先，我们看一下代码，walk 方法是在构造函数调用的方法，我认为这个方法跟这个 Class 属于关系紧密的关系，参考“封装”特性，我们应该把它放在 Class 内部。
2. 其次，向 observe、defineReactive 这些方法，他们不仅仅在 Observer 类中使用，还会作为 API 暴露给开发者使用，所以放在外边是最合适的。

## 参考链接

[vue 的双向绑定原理及实现](https://www.cnblogs.com/canfoo/p/6891868.html)

[0 到 1 掌握：Vue 核心之数据双向绑定](https://juejin.cn/post/6844903903822086151)
