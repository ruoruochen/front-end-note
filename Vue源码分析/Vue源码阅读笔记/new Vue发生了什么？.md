全篇文章，我们将探究当我们使用new Vue的时候发生了什么。

我们要知道new Vue发生了什么，首先得知道Vue它的定义是什么？首先找到Vue的构造函数

## Vue 的构造函数

找`Vue`的入口文件

打开package.json，我们可以看到当我们`npm run dev`时，是进入`config.js`文件中的。![image-20210516133737852](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210516133737852.png)

进入config.js找Tagert `web-full-dev`，找到入口文件`web/entry-runtime-with-compiler.js `

![image-20210516133822370](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210516133822370.png)

![image-20210516134007852](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210516134007852.png)

从入口文件`web/entry-runtime-with-compiler.js `文件开始讲根据以上路径，不断的import Vue from ......

根据以上查找路径，我们找到了Vue的构造函数。

![image-20210516134129727](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210516134129727.png)

在这个文件里，创建了Vue构造函数，调用了初始化函数xxxMixin，最后导出Vue。

在构造函数中，调用`_init`方法进行初始化。

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue

```

我们打开这五个方法的定义，发现它们的作用就是在Vue.prototype上挂载了方法或属性。

### 1、initMixin(Vue)

![image-20210516134350649](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210516134350649.png)

```js
Vue.prototype._init = function (options) {} 
```

### 2、stateMixin(Vue)

```js
Object.defineProperty(Vue.prototype, '$data', dataDef)
Object.defineProperty(Vue.prototype, '$props', propsDef)
Vue.prototype.$set = set
Vue.prototype.$delete = del
Vue.prototype.$watch = function(){}
```

### 3、eventsMixin(Vue)

```js
Vue.prototype.$on
Vue.prototype.$once
Vue.prototype.$off
Vue.prototype.$emit
```

### 4、lifecycleMixin(Vue)

```js
Vue.prototype._update
Vue.prototype.$forceUpdate
Vue.prototype.$destroy
```

### 5、renderMixin(Vue)

```js
Vue.prototype.$nextTick
Vue.prototype._render
```

### 根据上面的查找路径下一步到src/core/index.js

![image-20210516135158521](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210516135158521.png)

在这里调用了`initGlobalAPI（Vue）`进行全局方法的初始化。并在Vue.prototype上挂载了一些属性、Vue上挂载一些属性。

### 进入initGlobalAPI方法中，在这里挂载了一些静态属性和方法。

```js
Vue.util = {...}  
Vue.set = set
Vue.delete = del
Vue.nextTick = nextTick
Vue.options = {...}
Vue.use
Vue.mixin 
Vue.extend 
```

### 根据上面的查找路径下一步到runtime/index.js，在Vue.prototype上挂载`__patch__`和`$mount`

```js
Vue.prototype.__patch__
Vue.prototype.$mount
```

### 根据上面的查找路径到达入口文件`web/entry-runtime-with-compiler.js`

缓存`mount`函数并重写`Vue.prototype.$mount`，在重写中调用`compileToFunctions`方法将模板`template`编译为render函数。

将`compileToFunctions`方法挂载为Vue的静态方法`compile`。

```js
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function(){
    ...重写
}
Vue.compile = compileToFunctions
```

## new Vue发生了什么？

### 进入Vue中调用的`_init`方法

我们看一下Vue构造函数的`init`方法。

```js
export function initMixin(Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    vm._uid = uid++
    let startTag, endTag
    vm._isVue = true
    // 合并配置
    if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
      
    vm._renderProxy = vm
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) 
    initState(vm)
    initProvide(vm)
    callHook(vm, 'created')

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

`_init()` 方法在一开始的时候，在 `this` 对象上定义了两个属性：`_uid` 和 `_isVue`，然后判断有没有定义 `options._isComponent`这里会走 `else` 分支，也就是这段代码：

```js
if (options && options._isComponent) {
    initInternalComponent(vm, options)
} else {
    vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
    )
}
```

在这里使用`mergeOptions`方法使用策略模式进行选项合并。

接着就是调用`initLifecycle`、`initEvents`、`initState`进行初始化，并在`initState`前后回调了生命周期钩子 `beforeCreate` 和 `created`。

### 重点进入`initState`方法进行分析

```js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

在这个方法中分别调用initxxx方法对`props`、`methods`、`data`、`computed`、`watch`进行了初始化。

### 重点进入`initData`方法进行分析

获取到data函数返回的data对象，并将其赋值到`vm._data`

拿到data的key值，通过proxy进行代理，这样子外界就可以通过this.属性名访问到data中的数据（实际上是访问到了this._data.属性名）

随后，通过observe方法，将数据通过Object.defineProperty进行set、get数据劫持，实现数据响应。

```js
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}

  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    proxy(vm, `_data`, key)
  }
  observe(data, true /* asRootData */)
}
```



在这个方法中创建了一个`Observer`类，传进来的`data`作为参数传给这个类。

```js
export function observe (value: any, asRootData: ?boolean): Observer | void {
  let ob: Observer | void
  ob = new Observer(value)
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
```

`Observer`类中，对`data`进行一个判断，如果是数组，对每个元素递归的调用`observe`方法；否则使用`walk`方法对`data`中的每一个属性使用`defineReactive`方法。

```js
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number;

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```

`defineReactive`方法中，使用`Object.defineProperty`进行数据劫持，在`set`中调用dep.notify通知依赖更新。

```js
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
 
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }
  
  //递归调用，使data数据包括子集进行get set化，进行响应
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```

**注意：**

1、在这个方法中，使用`childOb = !shallow && observe(newVal)`对`data`数据下的东西进行`get`、`set`化，进行响应。

2、`Object.defineProperty`无法监听数组的变化。Vue中是对数组的prototype上的八种方法进行了重写，再改变原型指向，也就是`Observer`类中的这段代码：

```js
//Observer类中的部分代码
if (Array.isArray(value)) {
    if (hasProto) {
        protoAugment(value, arrayMethods)
    } else {
        copyAugment(value, arrayMethods, arrayKeys)
    }
    this.observeArray(value)
}
```

```js
//改变原型指向
function protoAugment (target, src: Object) {
  target.__proto__ = src
}
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}
```

其中arrayMethods为改写后的Array原型对象。

### 我们看一下重写Vue原型对象的八种方法

其实这个方法也很简单，拿到数组的原型对象，重写八个方法，当数组进行这些操作时，使用ob.dep.notify()通知依赖更新，如果是增加了元素，那就使用`observeArary`方法对这些元素进行响应式。

```js
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
```

### 回到`_init`方法，继续往下看

如果`vm.$option.el`存在，使用`vm.$mount`方法挂载vm

```js
export function initMixin(Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    vm._uid = uid++
    let startTag, endTag
    vm._isVue = true
    // 合并配置
    if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
      
    vm._renderProxy = vm
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) 
    initState(vm)
    initProvide(vm)
    callHook(vm, 'created')

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

### 我们分析一下`vm.$mount`方法的实现

如果大家有印象的话，可能会记得我们在前面提过在一层层寻找Vue构造函数的路上，有定义这个`vm.$mount`方法，就在`runtime\index.js`文件中，实际上是调用`mountComponent`方法进行挂载。

```js
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

而在入口文件`vue\src\platforms\web\entry-runtime-with-compiler.js`中，对`$mount`方法进行了重写：

1、首先获取el，即挂载的真实DOM对象。

2、接着判断有无render方法，无render，对template进行规范之后，调用`compileToFunctions`将template转render。

3、调用原来的原型上的$mount方法挂载。

```js
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  //转换成DOM对象
  el = el && query(el)

  const options = this.$options
  //如果没有render方法
  if (!options.render) {
    let template = options.template
	//对template的一个规范
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        return this
      }
    } else if (el) {
      //取最近的外层元素作为当前模板
      template = getOuterHTML(el)
    }
    //有template 需要template转render
    if (template) {
      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  // 调用原来的原型上的$mount方法挂载
  return mount.call(this, el, hydrating)
}
```

`compileToFunctions`将模板板编译为ast语法树,经过静态优化, 最后处理成render函数，这个设计到编译问题，先不细讲。

调用原来的原型上的$mount方法挂载，实际上就是调用了`mountComponent`方法

```js
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

### 进入`mountComponent`方法进行分析

```js
//vue\src\core\instance\lifecycle.js
export function mountComponent(
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    }
  }
  //钩子函数
  callHook(vm, 'beforeMount')

  let updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }
  
  new Watcher(vm, updateComponent, noop, {
    before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```

**重点：Watcher**，他在这里有两个作用：

1、初始化的时候会执行回调函数

2、当 vm 实例中的监测的数据发生变化的时候执行回调函数。

### 我们重点分析`Watcher`类的实现

```js
export default class Watcher {
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
     
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }
  
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    value = this.getter.call(vm, vm)
    return value
  }
}
```

首先获取`this.value`的值，执行`get`方法，在这个方法中先会执行`pushTarget`，给Dep.target添加静态属性，代码如下：

```js
//vue\src\core\observer\dep.js
export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}
```

接着，执行`this.getter.call`方法，在上面我们已经设置了` this.getter = expOrFn`，即我们传进来的`updateComponent`方法，所以这里会执行`updateComponent()`方法

```js
let updateComponent = () => {
    vm._update(vm._render(), hydrating)
  }	
}
```

首先第一个参数是`vm._render()`，先调用该函数。`render`函数实际上就是把实例渲染成一个虚拟VNode，`vm.$createElement`即创建一个VNode。

```js
Vue.prototype._render = function (): VNode {
    const vm: Component = this
    const { render, _parentVnode } = vm.$options
    let vnode = render.call(vm._renderProxy, vm.$createElement)
    return vnode
}
```

参数准备完毕后，执行`vm_update`方法，在该方法的核心就是调用`vm.__patch`方法。如果还没有 `prevVnode` 说明是首次渲染，直接创建真实DOM。如果已经有了 `prevVnode` 说明不是首次渲染，那么就采用 `patch` 算法进行必要的DOM操作

```js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    vm._vnode = vnode
    if (!prevVnode) {
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false)
    } else {
        vm.$el = vm.__patch__(prevVnode, vnode)
    }
}
```

**new  Vue的具体调用流程**

![image-20210516194846746](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210516194846746.png)



**new Vue的大致过程**

![image-20210516184238930](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210516184238930.png)