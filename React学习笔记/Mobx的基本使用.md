## Mobx的基本使用

### Mobx环境准备

- 在react项目中安装 Mobx 和 Mobx-react

```shell
npm install mobx mobx-react
```

- 安装装饰器插件

```shell
npm install @babel/plugin-proposal-decorators
// 装饰器的一个插件
```

- 此时使用装饰器@xx会报错`对修饰器的实验支持是一项将在将来版本中更改的功能。设置"experimentalDecorators"选项以删除此警告。`

  解决方案：搜索experimentalDecorators，设置`"javascript.implicitProjectConfig.experimentalDecorators": true`，该选项默认为false，需要改为true

  随后重新启动vscode，即可。

- 此时运行会报错 `Support for the experimental syntax 'decorators-legacy' isn't currently enabled`

  解决方案：
	```shell
npm install customize-cra react-app-rewired --save
	```
	
	在`src`同级下创建文件`config-overrides.js`

	```js
//config-overrides.js
const { override, addDecoratorsLegacy } = require('customize-cra');
module.exports = override(
addDecoratorsLegacy()
);
	```

	修改`package.json`

	```js
"scripts": {
 "start": "react-app-rewired start",
 "build": "react-app-rewired build",
 "test": "react-app-rewired test",
 "eject": "react-app-rewired eject"
 }
	```

	重新 `npm start`即可

### Mobx重要API

#### action

**何时使用动作？**

应该永远只对**修改**状态的函数使用动作。 只执行查找，过滤器等函数**不**应该被标记为动作。

**如何保证action中this的正确性？**

1、`action.bound` 可以用来自动地将动作绑定到目标对象。

```js
class Ticker {
    @observable tick = 0

    @action.bound
    increment() {
        this.tick++ // 'this' 永远都是正确的
    }
}

const ticker = new Ticker()
setInterval(ticker.increment, 1000)
```

2、在观察者组件中调用时，使用箭头函数

```html
<button onClick={() => {
    this.props.store.deleteCount()
}}>
  -
</button>
```

**注意: `action.bound`不要和箭头函数一起使用；箭头函数已经是绑定过的并且不能重新绑定。**

**异步action**

`action` 包装/装饰器只会对当前运行的函数作出反应，而不会对当前运行函数所调用的函数（不包含在当前函数之内）作出反应！ 这意味着如果 action 中存在 `setTimeout`、promise 的 `then` 或 `async` 语句，并且在回调函数中某些状态改变了，那么这些回调函数也应该包装在 `action` 中。

##### 基于Promises

```js
mobx.configure({ enforceActions: true }) // 不允许在动作之外进行状态修改

class Store {
    @observable githubProjects = []
    @observable state = "pending" // "pending" / "done" / "error"

    @action
    fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        fetchGithubProjectsSomehow().then(
            projects => {
                const filteredProjects = somePreprocessing(projects)
                this.githubProjects = filteredProjects
                this.state = "done"
            },
            error => {
                this.state = "error"
            }
        )
    }
}

```

上面的示例会抛出异常，因为传给 `fetchGithubProjectsSomehow` promise 的回调函数不是 `fetchProjects` 动作的一部分，因为动作只会应用于当前栈。

解决方案：

1、将回调函数变成动作，回调函数需要使用@action.bind保证this的正确性。(思路清晰，但是需要包裹太多回调函数，还有给他们命名，麻烦)

```js
@action
fetchProjects() {
    this.githubProjects = []
    this.state = "pending"
	fetchGithubProjectsSomehow().then(this.fetchProjectsSuccess, this.fetchProjectsError)
}

@action.bound
fetchProjectsSuccess(projects) {
    const filteredProjects = somePreprocessing(projects)
    this.githubProjects = filteredProjects
    this.state = "done"
}
@action.bound
fetchProjectsError(error) {
    this.state = "error"
}
```

2、使用`runInAction`工具函数，将修改状态代码放入runInAction中

```js
@action
fetchProjects() {
    this.githubProjects = []
    this.state = "pending"
    fetchGithubProjectsSomehow().then(
        projects => {
            const filteredProjects = somePreprocessing(projects)
            // 将‘“最终的”修改放入一个异步动作中
            runInAction(() => {
                this.githubProjects = filteredProjects
                this.state = "done"
            })
        },
        error => {
            // 过程的另一个结局:...
            runInAction(() => {
                this.state = "error"
            })
        }
    )
}
```

>`runInAction` 是个简单的工具函数，它接收代码块并在(异步的)动作中执行。这对于即时创建和执行动作非常有用，例如在异步过程中。`runInAction(f)` 是 `action(f)()` 的语法糖。

**基于async、await函数**

基于 async / await 的函数当开始使用动作时起初似乎会令人感到困惑。 因为在词法上它们看起来是同步函数，它给人的印象是 `@action` 应用于整个函数。 但事实并非若此，因为 async / await 只是围绕基于 promise 过程的语法糖。 结果是 `@action` 仅应用于代码块，直到第一个 `await` 。 在每个 `await` 之后，一个新的异步函数将启动，所以在每个 `await` 之后，状态修改代码应该被包装成动作。 这正是 `runInAction` 再次派上用场的地方:

```js
mobx.configure({ enforceActions: true })

class Store {
    @observable githubProjects = []
    @observable state = "pending" // "pending" / "done" / "error"

    @action
    async fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        try {
            const projects = await fetchGithubProjectsSomehow()
            const filteredProjects = somePreprocessing(projects)
            // await 之后，再次修改状态需要动作:
            runInAction(() => {
                this.state = "done"
                this.githubProjects = filteredProjects
            })
        } catch (error) {
            runInAction(() => {
                this.state = "error"
            })
        }
    }
}
```

#### Autorun

- 如果有一个函数依赖发生变化时，应该自动运行，但不会产生一个新的值，请使用`autorun`。
-  当使用 `autorun` 时，所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发。`autorun` 只会观察在执行提供的函数时所使用的数据。

**Autorun**接收两个参数，第一个为执行函数、第二个是一个参数对象，有如下可选的参数:

- `delay`: 可用于对效果函数进行去抖动的数字(以毫秒为单位)。如果是 0(默认值) 的话，那么不会进行去抖。
- `name`: 字符串，用于在例如像 [`spy`](https://cn.mobx.js.org/refguide/spy.html) 这样事件中用作此 reaction 的名称。
- `onError`: 用来处理 reaction 的错误，而不是传播它们。
- `scheduler`: 设置自定义调度器以决定如何调度 autorun 函数的重新运行

```js
autorun(() => {
    // 假设 profile.asJson 返回的是 observable Json 表示，
    // 每次变化时将其发送给服务器，但发送前至少要等300毫秒。
    // 当发送后，profile.asJson 的最新值会被使用。
    sendProfileToServer(profile.asJson);
}, { delay: 300 });
```

### 细节理解

####  MobX 会对什么作出反应?

- MobX 只追踪同步地访问数据

```js
autorun(() => {
    setTimeout(
        () => console.log(message.likes.join(", ")),
        10
    )
})
message.likes.push("Jennifer");
```

这将**不会**作出反应。在 `autorun` 执行期间没有访问到任何 observable，而只在 `setTimeout` 执行期间访问了。

-  避免在本地字段中缓存 observable。一个常见的错误就是把间接引用的 observable 存储到本地变量，然后认为组件会作出反应，实际上并不会。

  ```js
  @observer class MyComponent extends React.component {
      author;
      constructor(props) {
          super(props)
          this.author = props.message.author;
      }
  
      render() {
          return <div>{this.author.name}</div>
      }
  }
  ```

  解决方案：1、在 `render()` 中进行间接引用 2、在组件实例上引入一个计算属性

  ```js
  @observer class MyComponent extends React.component {
      @computed get author() {
          return this.props.message.author
      }
  // ...
  
  ```

```js
let message = observable({
    title: "Foo",
    author: {
        name: "Michel"
    },
    likes: [
        "John", "Sara"
    ]
})
```

针对以上message 不同情况下是否会做出反应

1.正确的: 在追踪函数内进行间接引用。做出反应：yes

```js
autorun(() => {
    console.log(message.title)
})
message.title = "Bar"
```

2.错误的: 在追踪函数外进行间接引用。no

```js
var title = message.title;
autorun(() => {
    console.log(title)
})
message.title = "Bar"

```

#### Mobx开启严格模式

```js
configure({ enforceActions: value })
```

- "never" (默认): 可以在任意地方修改状态

- "observed": 在某处观察到的所有状态都需要通过动作进行更改。在正式应用中推荐此严格模式。

- "always": 状态始终需要通过动作来更新(实际上还包括创建)。

#### Mobx数据更新，组建不更新？

1、检查是否没有命中Mobx的响应模式，比如使用在缓存了observable。

2、查看Mobx版本，Mobx最新版6.x需要在store的contructor构造函数中使用`makeObsevable(this)`），对整个class对象设置成observable。

```js
constructor() {
    // 添加makeObservable
    makeObservable(this)
}
```

