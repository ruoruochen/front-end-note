# Vuex

## 1 认识Vuex

### 1.1 什么是Vuex

Vuex 是一个状态管理模式，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

 ### 1.2 什么是状态管理模式？

- 可以简单的看成多个组件共享变量存储在一个对象中。

这个状态自管理应用包含以下几个部分：

- **state**，驱动应用的数据源；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。

表示“单向数据流”理念的简单示意

![image-20201222095704879](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20201222104442959.png)



## 2 Vuex的使用

### 2.1 Vuex的基本使用

1. 下载Vuex插件

   ```js
   npm install vuex --save
   ```

2. 配置：

   - 在src中创建文件夹store，创建Index.js，引入插件、使用Vue.use()安装插件、创建对象、导出对象。
   - 在main.js中引入store

   ```js
   //src/store/index.js
   import Vuex from 'vuex'
   import Vue from 'vue'
   // 1、安装插件
   Vue.use(Vuex)
   
   // 2、创建对象
   const store = new Vuex.Store({
     //保存状态
     state: {
       counter: 1000
     },
     mutations: {},
     actions: {},
     getters: {},
     modules: {}
   })
   
   //3、导出
   export default store;
   ```

   挂载

   ![image-20201222103547188](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20201222103547188.png)

3. 使用：

   - 获取状态：使用$store.state.xxx获取状态
   - 修改状态：现在vuex的mutation中定义方法，再在组件事件中调用：this.$store.commit("xxx");

### 2.2 Vuex状态管理图例

Actions中处理异步操作。建议使用Mutations修改状态，不建议Vue Components直接修改状态。

![image-20201222104442959](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20201222095704879.png)

```js
  //定义方法
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--
    }
  },
```

### 2.3 Vuex核心概念

Vuex有五大核心概念：State单一状态树、Getters、Mutation、Action、Modules。

#### 2.3.1 State单一状态树

在一个系统中只创建一个Vuex对象，即单一数据源。

#### 2.3.2 Getters

Getters类似于computed，当需要对数据进行筛选或处理时，使用Getters。

在index.js中定义，在模板中调用：

```js
//store/index.js
fullname(state,getters){
    .......
}
```

```html
//模板
{{$store.getters.agethanxStu(18)}}
```

**Getters参数传递**

getters默认是不能传递参数的, 如果希望传递参数, 那么只能让getters本身返回另一个函数。

需求1：返回年龄>x的学生名单

需求2：根据id查询学生。

>题解在：E:\Study\Front-end\vue\LearnVuejs05-Vuex\01-learnvuex 的Index.js和Hello.vue中

#### 2.3.3 Mutation

##### 2.3.3.1 Mutation更新

- **vuex的store状态更新的唯一方式：提交Mutation。（不要尝试使用其他方式修改state!例如不要action直接修改state!）**
- Mutation主要包括两部分：
  - 字符串的事件类型**type**
  - 回调函数，第一个参数为state **handler**
- 通过Mutation更新：this.$store.commit('xxxmutation名字')

##### 2.3.3.2 Mutation传递参数

- mutation更新数据时携带的参数，成为mutation的载荷（Payload)

  ```
  this.$store.commit('increment',1);
  ```

  如果参数为多个，则包装成对象。

##### 2.3.3.3 对象风格的提交方式

使用包含type属性的对象，整个对象都作为载荷传给mutation函数，handler保持不变。

提交：

```js
this.$store.commit({
  type: 'increment',
  amount: 10
})
```

index.js获取：

```js
increCount(state, payload) {
    console.log(payload);
    state.counter += payload.count;
},
```

##### 2.3.3.4 Mutation的相应规则

 Vuex 的 store 中的状态是响应式，这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 最好提前在你的 store 中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该

- 使用 `Vue.set(obj, 'newProp', 123)`, 或者

- 以新对象替换老对象。例如，利用运算展开运算符我们可以这样写：

  ```js
  state.obj = { ...state.obj, newProp: 123 }
  ```

**注：直接添加，该属性不会加入响应式系统中**

##### 2.3.3.5 使用常量代替Mutation事件类型

把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然，且容错率高，容易维护，但用不用取决于团队大小。

步骤：

1. 在store下创建一个mutation-types.js

   ```js
   //导出Mutation常量
   export const INCREMENT = 'increment'
   export const DECREMENT = 'decrement'
   ```

2. 在store/index.js和提交mutation的地方import该模块。并在commit中提交该常量。

   ```js
   //store/index.js
   import { INCREMENT, DECREMENT } from "./mutation-types.js";
   // 2、创建对象
   const store = new Vuex.Store({
     //保存状态
     state: {
       counter: 1000,
     },
     //定义方法
     mutations: {
       [INCREMENT](state) {
         state.counter++;
       },
       [DECREMENT](state) {
         state.counter--
       }
     },
     actions: {},
     getters: {},
     modules: {}
   })
   ```

   ```js
   //Hello.vue
   import { INCREMENT, DECREMENT } from "./store/mutation-types.js";
   export default {
     name: "App",
     components: {
       Hello
     },
     data() {
   	.....
     },
     methods: {
       addtion() {
         this.$store.commit(INCREMENT);
       },
       dection() {
         this.$store.commit(DECREMENT);
       }
     }
   };
   </script>
   ```

**注：Mutation 必须是同步函数，mutation 都是同步事务。**

如果mutation中包含异步操作，那么devtool 无法进行跟踪。

#### 2.3.4 Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

**Action函数的创建**

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象（但 context 对象不是 store 实例本身），在函数中调用context.commit提交一个mutation。

context对象中一般有：commit、dispatch、getters、rootGetters、rootState、state，可以使用对象解构。

```js
  actions: {
    // 模拟异步操作
    changeInfo(context, payload) {
      setTimeout(() => {
        context.commit('changename');
        console.log(payload);
      }, 1000);
    }
  },
```

>当需要调用commit很多次时，官方推荐使用ES2015的参数结构
>
>```js
>actions: {
>  increment ({ commit }) {
>    commit('increment')
>  }
>}
>```
>
>理解：context 类似store，其内部属性和方法有:state、getters、mutation、action、modules，用一个对象来接收，表示接收context.commit，后面直接使用commit就可以了

**Action的使用（分发Action）**

action通过store.dispatch触发。

```js
change() {
      this.$store.dispatch("changeInfo", "我是payload");
}
```

Action同样支持载荷方式和对象方式分发。

**组合Action**

`store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise。

此时，我们store.dispatch需要知道你里面处理完了，我可以执行别的操作了，那么action里面返回Promise，调用者就可以加.then方法进行处理，例子如下：

```js
//store/index.js
 actions: {
    changeInfo({ commit }, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('changename');
          console.log(payload);
          resolve('我处理完啦~')
        }, 1000);
      })
    }
  },
```

```js
change() {
    this.$store.dispatch("changeInfo", "我是payload").then(v => {
        console.log("你输出的内容：" + v);
        console.log("我收到啦，谢谢~");
    });
},
```

输出结果：

![image-20201228201342212](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20201228201342212.png)

#### 2.3.5 Modules

Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

##### 2.3.5.1 模块的局部状态

**模块化的实现**

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

子模块只能使用自己的东西。

```js
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  },
  
   actions: {
    UpdateInfo({ commit }) {
      setTimeout(() => {
        commit('change');
      }, 1000);
    }
  }
}
```

**Vue组件使用模块化内的东西**

模板中使用state

```html
<h2>{{$store.state.moduleA.count}}</h2>
```

模板中使用getters

```html
<h2>{{$store.getters.fullname}}</h2>
<h2>{{$store.getters.fullname2}}</h2>
<h2>{{$store.getters.fullname3}}</h2>
```

```
 //模块中的getters
 getters: {
    fullname(state) {
      return state.name + state.count;
    },
    fullname2(state, getters) {
      return getters.fullname + "22222";
    },
    //rootState为根state
    fullname3(state, getters, rootState) {
      return getters.fullname2 + rootState.counter;
    }
  }
```

使用mutation，直接commit

```js
incre() {
    this.$store.commit("increment2");
}
```

使用action，直接dispatch。**（注：action中commit提交的mutation为子模块的。）**

```js
asynUpdate() {
    this.$store.dispatch("UpdateInfo");
}
```

##### 2.3.5.2 命名空间

默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

store/index.js

```js
//尝试命名空间
const modulec = {
  namespaced: true,

  state: () => ({
    count: 100,
    name: 'Ed'
  }),
  getters: {
    gettertext(state, getters, rootState) { 
     // -> getters['modulec/gettertext']
      console.log(state.name);
      return state.name + rootState.counter;
    }
  },
  mutations: {
    change(state) {
      // -> commit('modulec/change')
      state.name = " Swift"
    }
  },
  actions: {
    actiontext(context) {
      // -> dispatch('modulec/actiontext')
      setTimeout(() => {
        console.log('123');
      }, 1000);
    }
  },
  //如果有嵌套模块
  modules: {
        // 继承父模块的命名空间
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: () => ({ ... }),
          getters: {
            popular () { ... }
            // -> getters['account/posts/popular']
          }
        }
      }
}
```

组件中使用：

```html
<h2>测试命名空间</h2>
<h2>{{$store.state.modulec.count}}</h2>
<h2>{{$store.state.modulec.name}}</h2>
<h2>{{$store.getters['modulec/gettertext']}}</h2>
<button @click="test1">测试mutation</button>
<button @click="test2">测试action</button>
```

```js
 test1() {
      this.$store.commit("modulec/change");
 },
 test2() {
      this.$store.dispatch("modulec/actiontext");
 }
```

如果是在模块内使用，dispatch和action默认为当前命名空间下的内容。

**在带命名空间的模块内访问全局内容（Global Assets）**

如果你希望使用全局 state 和 getter，`rootState` 和 `rootGetters` 会作为第三和第四参数传入 getter，也会通过 `context` 对象的属性传入 action。

若需要在全局命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

**在带命名空间的模块注册全局 action**

若需要在带命名空间的模块注册全局 action，你可添加 `root: true`，并将这个 action 的定义放在函数 `handler` 中。例如：

```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```

##### 2.3.5.3 模块动态注册

在 store 创建**之后**，你可以使用 `store.registerModule` 方法注册模块：

```js
import Vuex from 'vuex'

const store = new Vuex.Store({ /* 选项 */ })

// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

**保留 state**

>在注册一个新 module 时，你很有可能想保留过去的 state，例如从一个服务端渲染的应用保留 state。你可以通过 `preserveState` 选项将其归档：`store.registerModule('a', module, { preserveState: true })`。
>
>当你设置 `preserveState: true` 时，该模块会被注册，action、mutation 和 getter 会被添加到 store 中，但是 state 不会。这里假设 store 的 state 已经包含了这个 module 的 state 并且你不希望将其覆写。

即state不变，其他插入原有模块。

#### 扩展：项目文件夹目录，如何让代码更优雅

将getters、mutations、actions、modules抽取出来为js，注所有Module放在module文件夹中。