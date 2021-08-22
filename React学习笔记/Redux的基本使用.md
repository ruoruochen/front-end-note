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
const addTodo = text => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text
});
```

这种接收一些需要修改的参数，返回一个 Action 的函数在 Redux 中被称为 Action Creators（动作创建器）。

```js
dispatch(addTodo('我是一只小小小图雀'))
```

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

####  Redux Thunk

安装 Redux Thunk

```js
npm install --save redux-thunk
```

因为reducer是纯函数，我们不能在里面做API调用，也不能在action生成器中返回一个调用API的函数。这个时候我们就需要用到异步中间件。

**"thunk"** 是指被其它函数作为返回值的**函数**。

```JS
function doStuff() {
  return function(dispatch, getState) {
    // 在这里 dispatch actions
    // 或者获取数据
    // 或者该干啥干啥
  }
}
```

被返回的函数就是 "thunk"，把它作为返回值的就是“action 生成器”。

Action 生成器返回的函数接收两个参数：`dispatch` 函数和 `getState`。大多数场景你只需要 `dispatch`，但有时你想根据 Redux state 里面的值额外做些事情。这种情况下，调用 `getState()` 你就会获得整个 state 的值然后按需所取。

**Redux Thunk的使用**

1、安装redux-thunk

2、引入 `redux-thunk` 然后通过 Redux 的 `applyMiddleware` 函数把它应用到 store 中。

```js
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
```

3、创建Action生成器

```js
export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch("/products")
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json.products));
        return json.products;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}
```

4、（局部组件需要数据）在componentDidMount / useEffect中调用dispatch action获取数据

（全局数据）创建store后，就是用store.dispatch action

**Redux Actions命名规范**

获取数据的 Redux actions 通常使用标准三连：BEGIN、SUCCESS、FAILURE。

在你调用 API **之前**，dispatch BEGIN action。

调用成功**之后**，你可以 dispatch SUCCESS 数据。如果请求失败，你可以 dispatch  FAILURE错误信息。

全部代码：

1、创建全局Store，允许中间件。

```js
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './productReducer.js'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
```

2、创建action生成器、redux-thunk以及reducer函数

```JS
//ACTIONS生成器 productActions.js
export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch("/products")
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json.products));
        return json.products;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}
```

```js
//reducer函数 productReducer.js
import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from './productActions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function productReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_PRODUCTS_BEGIN:
      // 把 state 标记为 "loading" 这样我们就可以显示 spinner 或者其他内容
      // 同样，重置所有错误信息。我们从新开始。
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      // 全部完成：设置 loading 为 "false"。
      // 同样，把从服务端获取的数据赋给 items。
      return {
        ...state,
        loading: false,
        items: action.payload.products
      };

    case FETCH_PRODUCTS_FAILURE:
      // 请求失败，设置 loading 为 "false".
      // 保存错误信息，这样我们就可以在其他地方展示。
      // 既然失败了，我们没有产品可以展示，因此要把 `items` 清空。
      //
      // 当然这取决于你和应用情况：
      // 或许你想保留 items 数据！
      // 无论如何适合你的场景就好。
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // reducer 需要有 default case。
      return state;
  }
}
```

3、在`ProductList` 组件发起请求 获取数据

```js
import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "/productActions";

class ProductList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { error, loading, products } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {products.map(product =>
          <li key={product.id}>{product.name}</li>
        )}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(ProductList);

```



参考链接

[Redux](https://juejin.cn/post/6844904021187117069#heading-23)