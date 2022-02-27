# Redux 基本原理剖析

## 前言

> 通过本文章，你将学到什么？

1. Redux 的设计思路、基本原理和实现。
2. React-Redux 的设计思路、基本原理和实现。
3. applyMiddleWare 的设计思路、基本原理的实现。

## 一、Redux 的设计思路

**Redux 知识简要**

我们知道 Redux 它的前世是 Flux，主要涉及四个方面的东西：

1. action
2. dispatch
3. reducer
4. store

Redux 的三个特点分别为：

1. 单一 Store
2. state 只读
3. reducer 是纯函数

Redux 的数据流动是单向数据流，即只能通过 dispatch action 的方式去出发数据状态的修改。action 进入 reducer 进行最终处理，获取到新的 store,然后进一步触发 View 的视图更新。

我们要了解 Redux 的设计思路，首先我们需要知道 Redux 它为我们解决了什么问题？

React 作为一个大型的组件化开发框架，开发过程中涉及到众多组件的通信，父子通信、跨层级通信等，自然而然的我们需要有一个地方去存储一些公共状态。而 Redux 就是为了解决这个问题而生。

说到状态管理，我们自然而然会想到使用一个单独的文件管理状态，在其他需要使用到这些状态的地方 import 引入就可以实现了，那为什么还需要 redux?

简单的 import 存在以下几个缺陷

1. 状态容易误修改。
2. 对状态的操作不易理解。

redux 是如何解决这些问题的呢？通过闭包，将状态变为私有的不能直接修改，提供改变状态的方法 dispatch，这样状态的改变就是可控的。当状态改变时，通知组件状态发生改变了，需要进行试图更新。

xxx 改变，通知 xxx。是不是很熟悉？对，这就是观察者模式。

redux 的核心就是在一个`createStore`方法中暴露了几个 API 接口：`getState`、`dispatch`、`subscribe`。

```js
export const createStore = (reducer, preloadedState, enhancer) => {
  // 属性
  let currentState = preloadedState || {};
  let currentReducer = reducer;
  let listeners = [];
  // 高阶函数，增强createStore
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  // 方法
  function getState() {}
  function dispatch() {}
  function subscribe() {}
  // 初始化
  dispatch({ type: "@@Redux.INIT" });
  //返回值
  return {
    getState,
    dispatch,
    subscribe,
  };
};
```

我们来依次实现一下这几个方法

### 1. getState()

很简单，直接返回`state`

```js
function getState() {
  return currentState;
}
```

### 2. dispatch()

思路：

1. 将 action 传入 reducer 函数中进行状态处理，获取到新的状态进行覆盖保存。
2. 状态改变，通知观察者。

```js
function dispatch(action) {
  currentState = currentReducer(action);
  for (let i = 0; i < listeners.length; i++) {
    listeners();
  }
  return action;
}
```

### 3. subscribe()

将观察者存入,返回一个取消订阅的函数

```js
function subscribe(listener) {
  let isSubscribed = true;
  listeners.push(listener);

  return function unsubscribe() {
    isSubscribed = false;
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}
```

redux 实现结束，是不是很简单？

总代码：

```js
export const createStore = (reducer, preloadedState, enhancer) => {
  // 属性
  let currentState = preloadedState || {};
  let currentReducer = reducer;
  let listeners = [];
  // 高阶函数，增强createStore
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  // 方法
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = currentReducer(action);
    for (let i = 0; i < listeners.length; i++) {
      listeners();
    }
    return action;
  }
  function subscribe(listener) {
    let isSubscribed = true;
    listeners.push(listener);

    return function unsubscribe() {
      isSubscribed = false;
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }
  // 初始化
  dispatch({ type: "@@Redux.INIT" });
  //返回值
  return {
    getState,
    dispatch,
    subscribe,
  };
};
```

## 二、React-Redux 的设计思路

`React-Redux`两个核心 API：`Provider`、`connect`。他们的原理是什么呢？

1. Provider 是将 store 放入 Context 中，供 connect 获取。
2. 而 connect 他是负责将 state 和 dispatch 挂到组件的 props 上，并让组件观察 state 的变化。

两个 API 的实现，都依赖于一个公共的文件：Context，用于创建 Context 对象。

### 1. Provider 的实现

Provider 的实现是利用了 React 的 Context 实现的。使用 Context.Provider 进行包裹，将 store 作为传递的值，供 connect 使用。

```js
import React from "react";
import Context from "./Context";

export default function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
```

### 2. connect 的实现

- connect 是获取到 Context 上的 store，调用 store 上的 subscribe 方法观察被观察者的变化，实现 UI 的更新。
- 通过高阶函数将数据注入到 props 中

```js
// connect返回一个高阶函数，接受一个组件，并返回一个高阶组件。
import React from "react";
import Context from "../redux-core/Context.ts";
import { store } from "../write-simple-redux/src/redux";
export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrapperComponent) {
    class MyConnect extends React.Component {
      componentDidMount() {
        console.log("context", this.context);
        // 从context获取store并订阅更新
        this.context.subscribe(this.handleStoreChange.bind(this));
      }

      handleStoreChange() {
        // 更新UI视图，仅简化
        // 实际上分各种情况,会检查是否需要更新等
        this.forceUpdate();
      }

      render() {
        return (
          <WrapperComponent
            {...this.props}
            {...mapStateToProps(this.context.getState())}
            {...mapDispatchToProps(this.context.dispatch)}
          />
        );
      }
    }

    MyConnect.contextType = Context;
    return MyConnect;
  };
}
```

一个小细节：

回顾一下 connect 的调用方式：`connect(mapStateToProps, mapDispatchToProps)(App)`,为其实 connect 完全可以把 App 跟着 mapStateToProps 一起传进去，`connect(mapStateToProps, mapDispatchToProps,App)`,看似没必要 return 一个函数再传入 App，为什么 react-redux 要这样设计呢？

其实 connect 这种设计，是装饰器模式的实现，所谓装饰器模式，简单地说就是对类的一个包装，动态地拓展类的功能。connect 以及 React 中的高阶组件（HoC）都是这一模式的实现。除此之外，也有更直接的原因：这种设计能够兼容 ES7 的装饰器(Decorator)，使得我们可以用@connect 这样的方式来简化代码，有关@connect 的使用可以看这篇<react-redux 中 connect 的装饰器用法>：

```js
//普通connect使用
class App extends React.Component {
  render() {
    return <div>hello</div>;
  }
}
function mapStateToProps(state) {
  return state.main;
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(action, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
```

```js
//使用装饰器简化
@connect(
  (state) => state.main,
  (dispatch) => bindActionCreators(action, dispatch)
)
class App extends React.Component {
  render() {
    return <div>hello</div>;
  }
}
```

原来这就是设计者的用意！

看到这里，这个时候依靠我们实现的 redux 和 react-redux 就可以跑个小 demo 了，试着实现一下计数器+1、-1 的功能.

完整代码：[github:write-simple-redux](https://github.com/ruoruochen/write-simple-redux)

## 三、applyMiddleware 以及中间件的实现

redux 中间件，我们可以理解为拦截器，本质上对 dispatch 能力的一种加强。它拦截的是 dispatch 提交到 reducer 的这个过程，在这个过程中进行一些额外的处理增加能力。

![20220227204750](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220227204750.png)

以记录日志的中间件为例，我们想在每次调用 dispatch 时，输出一个调用日志，如何实现？

1. 最简单的一把梭,在每个调用 dispatch 的后面手动输出日志

```js
store.dispatch({ type: "xxx", payload: "xxx" });
console.log("Log:", store.getState());
```

2. 封装一个日志方法

```js
function LogAfterDispatch(store, action) {
  store.dispatch(action);
  console.log("Log:", store.getState());
}
```

我们需要在每个调用 dispatch 的文件里，都要手动 import 这个方法，不优雅

3. 替换 dispatch

```js
let next = store.dispatch;
store.dispatch = function LogAfterDispatch(action) {
  const res = store.dispatch(action);
  console.log("Log:", store.getState());
  return res;
};
```

4. 模块化中间件

单独的一个中间件还好维护，如果以后，需要分别在 dispatch 的前中后，都要进行各种功能的增加，这个中间件将膨胀到难以维护。我们希望实现一个能够自由组合、独立可插拔的中间件，这个时候我们就需要进行**模块化拆分**。

```js
function patchStoreToAndLog(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndLog(action) {
    const res = next(action);
    console.log("after log", store.getState());
    return res;
  };
}

function patchStoreToCrashReport(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndCrash(action) {
    try {
      next(action);
    } catch (error) {
      console.error("catch a error", error);
      throw error;
    }
  };
}

// 可组合、插拔的中间件
patchStoreToAndLog(store);
patchStoreToCrashReport(store);
```

5. 函数式编程：组合，集中插入中间件

上面我们是使用 dispatch 覆盖，我们可以每次返回一个 dispatch，利用函数式编程的组合进行连接

```js
function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    //  创建store
    const store = createStore(reducer);
    const { getState, dispatch } = store;
    const params = {
      getState,
      dispatch: (action) => dispatch(action),
    };
    // 中间件store->dispatch->action
    // 函数柯里化 固定第一个参数
    const middlewares = middlewares.map((middleware) => middleware(params));

    // 函数式编程：组合
    dispatch = compose(...middlewares)(dispatch);

    // 返回一个新的store
    return { ...store, dispatch };
  };
}

function compose(...fns) {
  if (fns.length === 0) return () => {};
  if (fns.length === 1) return fns[0];
  return fns.reducer(
    (res, fn) =>
      (...args) =>
        res(fn(...args))
  );
}

// 中间件格式 函数柯里化
const LogAfterDispatch = (store) => (next) => (action) => {
  let res = next(action);
  console.log("Log after dispatch", store.getState());
  return res;
};
```

## 总结

redux 的源码是比较简短的，很适合新手朋友们阅读。在阅读的过程中，我们发现源码原来使用了许多编程思想与设计范式，例如：观察者模式、装饰器模式、中间件机制、函数柯里化、函数式编程等，阅读完源码绝不是结束，而是一个开始，将我们学到的这些思想、设计范式应用到我们真正的项目中，这才是技术最终的意义。

## 问题回顾

回到文章的开头，我们提出了三个问题，看到这里你找到问题的答案了吗？

1. Redux 的设计思路、基本原理和实现。

> Redux 采用了观察者模式进行实现的。使用 Redux 中状态的组件为观察者，会将其更新视图的方法加入到 listeners 中，当状态发生改变时，触发 listeners 中的事件回调，View 视图更新。

2. React-Redux 的设计思路、基本原理和实现。

> React-Redux 的两个核心 API 为：Provider、connect。他们本质上是利用 React 的 Context 组件的特性实现的。
>
> - 使用一个公共的文件创建 Context 对象。
> - 在 Provider 中引入该 Context，使用 Context.Provider 包裹子组件，将 store 作为 value 值传递，供 connect 获取。
> - 在 connect 中获取 Context 中的数据，通过 subscribe 方法将 View 试图更新方法加入观察者队列中；通过高阶函数将 state、dispatch 注入到 props 中，进行数据展示。

3. applyMiddleWare 的设计思路、基本原理的实现。

> applyMiddleWare 它采用了多种思想：函数柯里化、函数式编程的组合等等。applyMiddleWare 是将中间件的能力加入到 dispatch 中。
> redux 中间件，可以理解为拦截器，拦截的是从 dispatch 到 reducer 这个过程，在这个过程中增加 dispatch 的能力。
> 而 applyMiddleWare 它利用函数柯里化，多次接受参数:中间件列表、createStore 方法、reducer 函数，进行 store 的创建、reducer 参数的接受等，通过柯里化将中间件列表的参数 store 参数给固定住，再使用函数式编程之组合将各个中间件进行组合，形成“洋葱圈模型”，增强了 dispatch 的能力。最后返回一个新的 store。
