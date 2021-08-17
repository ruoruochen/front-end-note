## redux

redux用于react的状态管理，将整个应用状态存储在store中，并且只有**一个**store，组件可以派发(dispatch)行为(action)给store，而不是直接通知其它组件；其它组件可以通过订阅store中的状态(state)来刷新自己的视图。

**规则**

- State 是只读的，唯一修改它的方式是 actions。

- 更新的唯一方式：dispatch(action) -> reducer -> new state。

- Reducer 函数必须是“纯”的，不能修改它的参数，也不能有副作用

state、action、reducer、store

1、state：数据集合

2、action 

Dsipatch一些Actions来改变State

**Redux Action**

具有 `type` 属性的普通对象就被称为 action，一般type属性为简单字符串且大写

```js
{
  type: "INCREMENT",
}
```

**Redux Dispatch**

每一次调用 `dispatch` 最终都会调用 reducer，故我们只需在reducer中处理Actions

```js
import { createStore } from "redux";
const defaultState = { count: 0 };
function reducer(state = defaultState, action) {
  console.log("reducer", state, action);

  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        count: state.count - 1
      };
    case "RESET":
      return {
        count: 0
      };
    default:
      return state;
  }
}

const store = createStore(reducer);
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "RESET" });
//输出
reducer {count: 0}{type: "INCREMENT"}
reducer {count: 1}{type: "INCREMENT"}
reducer {count: 2}{type: "DECREMENT"}
reducer {count: 1}
{type: "RESET"}
```

3、reducer 

接收当前 `state` 和一个 `action`，然后返回 `newState`

- reducer 绝不能返回 undefined。
- reducer 必须是纯函数，也就是不能修改他们的参数：state，也不能有副作用。

```js
function reducer(state, action) {
  console.log("reducer", state, action);
  return state;
}

const store = createStore(reducer);
```

4、store 

```js
let store = createStore(reducers);
```

store的职责：

- 维持应用的 state； 
- 提供 getState() 方法获取 state； 
- 提供 dispatch(action) 方法更新 state；
- 通过 subscribe(listener) 注册监听器; 
- 通过 subscribe(listener) 返回的函数注销监听器。



根据上面，我们创建好了一个很小的带有 `reducer` 的 `store`，当接收到 `action` 时它知道如何更新 `state`，此时我们需要将Redux连接到React上

**react-redux库的核心**

- < Provider store>
- connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

**Provider组件**

使用：引入Provider，将组件中的内容包裹起来，store以props形式传递

```JS
const store = createStore(reducer);
<Provider store={store}>
    <Counter />
</Provider>
```

**connect函数**

- `connect` 函数，从Redux内部取出整个state，传入mapStateToProps中。
- `connect` 是一个**高阶函数（HOC）**，调用它时会返回一个函数。然后调用**返回的**函数传入一个组件时，它会返回一个新（包装的）组件。
- `connect` 除了传递state，它还从 store 传递了 `dispatch` 函数，我们可以调用props.dispatch（action）

```JS
function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function Counter(props) {
  const increment = () => {
    props.dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    props.dispatch({ type: "DECREMENT" });
  };

  return (
    <div className="counter">
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span>{props.count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Counter);
```

好习惯：actions单独一个js文件，定义为常量，引入这些action名词代替手写字符串。

```js
//actions.js
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

//Counter.js
import { INCREMENT, DECREMENT, RESET } from "./actions";
const increment = () => {
    props.dispatch({ type: INCREMENT });
};

```

**Redux Action 生成器**

```js
//actions.js
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export function increment() {
  return { type: INCREMENT };
}

export const decrement = () => ({ type: DECREMENT });

//Counter.js
import { increment, decrement } from './actions';
increment = () => {
    this.props.dispatch(increment()); // << 在这使用
};
```

不要 `dispatch(increment)` 🚫

应该 `dispatch(increment())` ✅

**mapStateToProps工作机制**

`mapStateToProps` 返回的对象以 props 形式传给组件，是**从State到Props的映射**。

```js
function mapStateToProps(state) {
  return {
    count: state.count
  };
}

export default connect(mapStateToProps)(Counter);
```

**mapDispatchToProps工作机制**

```js
import { increment, decrement } from './actions';

//Counter
increment = () => {
    // 我们可以调用 `increment` prop,
    // 它会 dispatch action:
    this.props.increment();
}

decrement = () => {
    this.props.decrement();
}

const mapDispatchToProps = {
  increment,
  decrement
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

使用 Redux Thunk 获取数据

"thunk" 是（少见）指被其它函数作为返回值的**函数**。

Action 生成器返回的函数接收两个参数：`dispatch` 函数和 `getState`。

```js
function doStuff() {
  return function(dispatch, getState) {
    // 在这里 dispatch actions
    // 或者获取数据
    // 或者该干啥干啥
  }
}
```

安装 Redux Thunk

```js
npm install --save redux-thunk
```

参考链接

[Redux](https://juejin.cn/post/6844904021187117069#heading-23)