# React 基础

创建 react

```js
npx create-react-app my-app
cd my-app
npm start
```

## 组件

所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

## State

构造函数是唯一可以给 this.state 赋值的地方,不要直接修改 State

State 的更新可能是异步的,所以你不要依赖他们的值来更新下一个状态,但可以接受函数

## 事件处理

谨慎对待 JSX 回调函数中的 this，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined，一般使用 bind 修改 this 指向,或箭头函数

## key

key 值的设置

在 `map()` 方法中的元素需要设置 key 属性。

key 只是在兄弟节点之间必须唯一

数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：

如果你的组件中需要使用 `key` 属性的值，请用其他属性名显式传递这个值，不能获取到 props.key

## 表单

React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

## Hook

Hook 是一个特殊的函数，可以让你在函数组件里“钩入” React state 及生命周期等特性。

**使用 Hook 的场景**
在编写函数组件并意识到需要向其添加一些 state

### State Hook

#### useState

- 功能：创建 state 变量
- 返回值：useState 会返回一对值，当前状态和一个让你更新它的函数。可多次使用
- 参数：接受一个参数，初始 state,数字/字符串/对象均可。

**state 只在组件首次渲染的时候被创建。在下一次重新渲染时，useState 返回给我们当前的 state。**

**读取 State**
直接使用变量名

**更新 State**

```js
<button onClick={() => setCount(count + 1)}>Click me</button>
```

### Effect Hook

#### useEffect

useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API，无需拆分到不同謉生命周期函数里。
可多次使用

副作用函数还可以通过返回一个函数来指定如何“清除”副作用。例如，在下面的组件中使用副作用函数来订阅好友的在线状态，并通过取消订阅来进行清除操作

**清除副作用**
如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它

### 额外的 Hook

#### useCallback

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

返回一个回调函数,只有在依赖项发生变化的时候才会更新（返回一个新的函数）

> useCallback 是要配合子组件的 shouldComponentUpdate 或者 React.memo 一起来使用的，否则就是反向优化。

#### useMemo

传递一个创建函数和依赖项，创建函数会需要返回一个值，只有在依赖项发生改变的时候，才会重新调用此函数，返回一个新的值。

可以把一些昂贵的计算逻辑放到 useMemo 中，只有当依赖值发生改变的时候才去更新。(**有点像 computed**)

- useCallback 与 useMemo 一个缓存的是函数，一个缓存的是函数的返回就结果。
- useCallback 是来优化子组件的，防止子组件的重复渲染。useMemo - 可以优化当前组件也可以优化子组件，优化当前组件主要是通过 memoize 来将一些复杂的计算逻辑进行缓存
  useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

### Hook 规则

- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的**函数组件/自定义 Hook**中调用 Hook。不要在其他 JavaScript 函数中调用。

### 自定义 Hook

- 当我们想在两个函数/组件之间共享逻辑时，这时候我们可以使用自定义 Hook.
- 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。**只能在自定义 Hook 的顶层无条件地调用其他 Hook。**

# React 高级指南

## Context

- 给多个组件共享值，无需层层传递，类似于 Vuex.
- 共享那些对于一个组件树而言是“全局”的数据

慎重考虑：

- 应用场景：多个不同层级的组建访问同样数据，若想避免层层传递，**组件组合**优于**context**

### Context API

1.  React.createContext

```js
const MyContext = React.createContext(defaultValue)
```

- 作用：创建 Context 对象
- 返回值：返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
- 参数：接受一个参数，默认值
- 当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值，没有匹配到 Provider，采用默认值。

2. Context.Provider

```js
<MyContext.Provider value={/* 某个值 */}>
```

- 作用：允许消费组件订阅 context 变化
- 接受一个 value 属性，传递给消费组件

3. Class.contextType

```js
MyClass.contextType = MyContext
//直接设置
```

- 此属性能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

4. Context.Consumer

```js
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

内部为一个函数，该函数接受当前的 context 值，并返回一个 React 节点。
传递给函数的 value 值等价于组件树上方离这个 context 最近的 Provider 提供的 value 值,如果没有则为其 defalut 值

1. Context.displayName

```js
MyContext.displayName = 'MyDisplayName'
<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```

组件在 DevTools 中将显示为 MyDisplayName

## Render Props（理解 Context.Comsumer 需要）

- render props 本质是一个 props 告知组件需要渲染的具体内容，类似于 vue 插槽
- xxx 名 = 返回 React 元素的函数,可接受参数，并可通过参数给该元素设置 attribute
- 在组件内部通过调用此函数渲染该 React 元素，并可以获取组件的 state
