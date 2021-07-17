## React学习

### React生命周期

![image.png](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/9c7b704f45fd435cb4ec579e8f0038ee~tplv-k3u1fbpfcp-watermark.image)

初始化执行顺序：constructor、componentWillMount、render渲染、componentDidMount、shouldComponentUpdate(prevProps, prevState)、componentWillUpdate(prevProps, prevState) 、componentDidUpdate(prevProps, prevState)

state改变执行顺序：shouldComponentUpdate(prevProps, prevState)、componentWillUpdate、render渲染、componentDidUpdate(prevProps, prevState)

- 一般在componentDidMount执行副作用，如异步请求，设置state。

**static getDerivedStateFromProps**

- 参数及返回值

  `static getDerivedStateFromProps(nextProps,prevState)`

  参数：接收新的props和之前的state

  返回值：返回一个对象来更新 state，或者返回 null 不更新 state。

- 触发时机：在组件实例化、接收到新的 `props` 、组件state更新时会被调用

- 作用：将父组件传递过来的 props 映射到子组件的 `state` 上面

- 配合 `componentDidUpdate`，可以覆盖 `componentWillReceiveProps` 的所有用法

**componentWillReceiveProps**

- 参数及返回值

  `componentWillReceiveProps(nextProps)`

- 触发时机：初始化render的时候不会执行，在组件接受到新的props时被触发

- 作用：一般用于父组件状态更新时子组件的重新渲染。

**shouldComponentUpdat**

询问组件是否需要更新，true更新，false不更新

**使用场景**

1、外部props改变，需要再次执行请求数据、改变state等。

- 使用`componentWillReceiveProps`，this.props和nextProps的某个属性进行比较，发生改变，this.setState或请求数据。

```js
componentWillReceiveProps(nextProps) {
    // 当父组件的 props 改变时，重新请求数据
    if (nextProps.id !== this.props.id) {
        this.setState({externalData: null});
        this._loadAsyncData(nextProps.id);
    }
}
```

- `getDerivedStateFromProps` + `componentDidUpdate` 加载数据

使用`getDerivedStateFromProps` 比较nextProps与prevState的某个属性进行比较，发生变化，修改state的某个属性为初始值，并将比较的props属性放入state中

在`componentDidUpdate`,判断如果state的某个属性为初始值，加载数据。

### React组件通信

父传子：props、onRef

子传父：自定义事件携带参数

跨层级组件通信：Context

**Context**

Consumer中的值等价于组件树上方离这个 context 最近的 Provider 提供的 value 值,如果没有则为其 defalut 值

```html
const { Consumer, Provider } = React.createContext((defaultValue)

// Father
<Provider value={this.state.info}>
    <div>
        <p>{this.state.info}</p>
        <Son />
    </div>
</Provider>


//GrandSon
<Consumer>
    {(info) => (
    // 通过 Consumer 中可以直接获取祖父组件的值
    <div>
        <p>祖父组件的值:{info}</p>
    </div>
    )}
</Consumer>
```

**onRef**

通过props将子组件的组件实例通过参数传递，回调给父组件，拿到子组件实例后可以调用其方法为所欲为啦~

```js
//Father
sonRef = (ref) => {
    this.child = ref // 在这里拿到子组件的实例
}
render() {
    return (
      <div>
        <Son onRef={this.sonRef} />
      </div>
    )
}

//Son
componentDidMount() {
    this.props.onRef(this) // 在这将子组件的实例传递给父组件
}
```

### React路由

`react-router` 包含 `3` 个，分别为`react-router`、`react-router-dom` 和 `react-router-native`。

包含三种基础组件：

路由组件： `<BrowserRouter>` 和 `<HashRouter>`

路由匹配组件： `<Route>` 和 `<Switch>`

导航组件： `<Link>`, `<NavLink>`, 和 `<Redirect>`

**路由组件**

- `BrowserRouter`：浏览器的路由方式，也就是使用 `HTML5` 提供的 [`history API`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHistory) ( pushState , replaceState 和 popstate 事件) 来保持 `UI` 和 `url` 的同步。这种方式在`react`开发中是经常使用的路由方式，但是在打包后，打开会发现访问不了页面，所以需要通过配置 `nginx` 解决或者后台配置代理。

- `HashRouter`：在路径前加入#号成为一个哈希值，`Hash` 模式的好处是，再也不会因为我们刷新而找不到我们的对应路径，但是链接上面会有`#/`。在`vue`开发中，经常使用这种方式。

**导航组件**

`<Link>`，在 html 页面会被渲染为一个`a`标签:

```html
<Link to='/'>Home</Link>
// <a href='/'>Home</a>
```

`<Redirect>`，强制跳转到某个页面

```js
<Redirect to='/login' />
```

### 状态管理

>前言：
>
>一个组件的状态有两种方式改变：
>
>- 来自父组件的 props 改变了，那么这个组件也会重新渲染
>- 自身有 state，自身的 state 可以通过`this.setstate`方法改变

#### redux

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
-  通过 subscribe(listener) 注册监听器; 
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

