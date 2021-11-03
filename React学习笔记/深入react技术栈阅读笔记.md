# React

## 1 React简介

### 1.1 实现 Tabs 组件，了解 React

**智能组件 VS 木偶组件**

智能组件：组件内部的交互行为，修改state，即state在内部更新。

木偶组件：组件外部传入具体的值，修改组件中的state，即组件像”木偶“一样被操控。

#### Tabs组件结构和样式

![image-20211017204435427](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017204435427.png)

两种实现方法：

1、在Tabs组件中将所有定子组件显式展示。

- 直白易懂，但笨重。

![image-20211017204532760](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017204532760.png)

2、Tabs组件只显示定义内容区域（TabContent)的子组件集合，头部区域对应TabPane中的porps，让其在TabNav组件内拼装。

- 写法简介，复杂逻辑留给组件处理。
- Antd Tabs使用的就是这种形式。

![image-20211017204831290](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017204831290.png)

**如何实现拼装渲染？**

`prop.children`：组件的子组件集合。

![image-20211017224517775](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017224517775.png)

**开始生成TabNav和TabContent**

将父组件props传给子组件，并将`children`作为`panel`传给`TabNav`和`TabContent`进行渲染。

![image-20211017224838076](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017224838076.png)

**react中如何把父组件中的props原封不动的传给子组件？**

直接写`{...this.props}`

**TabNav渲染头部区域**

使用`React.Children.map`遍历`panels`子组件，并生成`li`，返回`li`数组。

![image-20211017225010807](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017225010807.png)

**React.Children API方法介绍**

`React.Children` 是React提供的一系列操作`children`的方法，例如map、forEach等函数，为处理子组件提供便利。

**如何一次性设置ClassName**

1、安装React-classnames库

```
npm install classnames --save
```

2、引入并使用

```js
import classnames from 'classnames'
```

![image-20211017221506051](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017221506051.png)

**如何拿到DOM元素上的key？**

通过`ele.key`拿到。

:x:我们不能通过`ele.props.key`拿到，因为这个返回的是`undefined`。

**TabContent内容渲染**

原理同上

![image-20211017225253201](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017225253201.png)

**React.cloneElement API 介绍**

```js
React.cloneElement(
  element,
  [props(objects)],
  [...children]
)
```

参数：

- 第一个参数：**必选**，TYPE（ReactElement)
- 第二个参数：可选，Props，注入的props。（可为新props，或TYPE中的部分props）
- 第三个参数：可选，新children，覆盖TYPE中的children。

在弄一下CSS样式，样式就出来了

**JSX 引入 CSS**

```jsx
// 引入css
import './css/index.css'
```

**CSS类前缀选择器和类后缀选择器**

`[class^=]`：以xxx开头

`[class*=]`：以xxx结尾

```css
//以-tabs结尾的
div[class*='-tabs'] {
  color: red;
}
//以tabs开头的
div[class^='tabs'] {
  color: yellow;
}
```

**less文件中的`&`**

`&`符号，被解析为父元素自身或父元素的伪类

![image-20211017215648067](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017215648067.png)

等同于

![image-20211017215659955](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017215659955.png)

#### Tabs组件行为

逻辑分析：

1、点击TabNav后，需要修改activeIndex，而activeIndex维护在Tabs中。

所以Tabs需要给TabNav传一个回调函数，当触发这个回调时，改变Tabs中的activeIndex。

**Tabs组件**

![image-20211017230920952](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017230920952.png)

**TabNav组件**

![image-20211017231011388](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017231011388.png)

>- Ques：React 组件通信。

**props规则校验与defaultProps基础用法**

1、引入`PropTypes`，**大写开头**

```
import PropTypes from 'prop-types'
```

2、

**校验：**

- `Class`组件有两种校验方法
  1. class名.propTypes
  2. 在类中使用静态变量定义

![image-20211017231610304](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017231610304.png)

![image-20211017231835364](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017231835364.png)

- `Function`组件只有一种校验方法
  1. Function名.propTypes

![image-20211017232111920](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017232111920.png)

**默认值：**

```jsx
//默认值
当前class名.defaultProps = {
  属性4: '我是默认值' //父组件就算不传值，且子组件又必须接收，就可以设默认值
}
```

### 1.2 React生命周期

React生命周期，三个阶段：**挂载、渲染、卸载**。

![image-20211018113500015](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018113500015.png)

**挂载和卸载**

涉及`componentsWillMount`、`componentDidMount`、`componentsWillUnMount`。

**数据更新**

1、组件因自身`state`更新而更新：依次执行：`shouldComponentUpdate`、`componentWillUpdate`、`render`、`componentDidUpdate`。

2、组件因父组件`props`更新而更新，则在上述4个生命周期方法执行前，先执行`componentWillReceiveProps`。

**更新阶段各个生命周期介绍**

**`shouldComponentUpdate(nextProps,nextState)`**

接受更新的`props`和`state`，通过条件判断是否需要进行更新，返回`true`更新，返回`false`不更新。

**`componentWillReceiveProps(nextProps)`**

接受更新后的`props`，通过判断新旧`props`，进行`setState`，在此方法中`setState`不会触发二次渲染。（因为在渲染之前，setState合并）

**js判断某个对象是否有某个属性**

1、`obj.hasOwnProperty()`：只会判断自身属性，不会判断继承属性。

2、`in方法`：`属性名 in obj`，返回`true/false`

> - QUES：React生命周期
> - QUES：为什么不能再`componentWillUpdate`中执行`setState`? TODO 3.3节（应该与setState有关）

### 1.3 React 与 DOM

#### 1.3.1 ReactDOM

ReactDOM 中的 API 很少，只有` findDOMNode`、`unmountComponentAtNode` 和 `render`。

**` findDOMNode(ReactComponent component)`**

返回React组件实例相应的DOM节点。

**`render()`方法**

将`ReactElement`挂载到`container`中，返回`element`实例（**即`refs`引用**），挂载完毕后执行回调`callback`

```js
ReactComponent render( 
 ReactElement element, 
 DOMElement container, 
 [function callback] 
)
```

**`unmountComponentAtNode` **

卸载操作

#### 1.3.2 refs

`ref`的两种使用方法

1、直接使用`ref`属性

```js
<Comp ref="myComp" />
//获取
this.refs.myComp
```

> - QUES：React中获取组件DOM元素的方法
>

2、`ref`回调函数

```js
 <input type="text" ref={(ref) => this.myTextInput = ref} />

//获取
this.myTextInput
```

## 2 漫谈 React

### 2.1 事件系统

**合成事件**

所有事件都自动绑定在最外层`document`上

#### 2.1.1 合成事件的绑定

**注意区分**

`JSX`中使用驼峰形式`onClick`、`onChange`。

`html`使用全小写时形式`onclick`。

#### 2.1.2 合成事件的实现机制

在React底层，主要对合成事件做了两件事：**事件委托**和**自动绑定**。

**事件委托**

React 并不会把事件处理函数直接绑定到真实DOM上，而是把所有事件绑定到结构的最外层`document`，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。

当组件挂载或卸载时，就是在统一的事件监听器上增加或删除一些对象。

当事件发生时，事件冒泡到最外层，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，提升效率。

**自动绑定**

绑定方法中的`this`指向当前组件

1、bind方法绑定

![image-20211018214445403](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018214445403.png)

2、双冒号语法，只绑定不传参，作用与`bind(this)`一致。

![image-20211018214544202](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018214544202.png)

3、`constructor`中bind

![image-20211018214630079](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018214630079.png)

4、箭头函数

![image-20211018214721592](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018214721592.png)

> - QUES：介绍一下合成事件及其原理（实现机制 ）
> - QUES：React 为什么要用合成事件
> - QUES：React绑定this的办法 TODO

#### 2.1.3 在React中使用原生事件

使用`addEventListner`添加事件监听，使用`removeEventListner`移除事件监听。

**注意：在React中使用DOM原生事件，一定要在组件卸载时手动移除，否则可能出现内存泄漏的问题**

![image-20211018214815393](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018214815393.png)

> - QUES：内存泄漏是什么？什么情况下会发生？如何减少发生？

#### 2.1.4 尽量避免合成事件与原生事件混用

混用合成事件、原生事件可能出现的后果：

原生事件中阻止冒泡，很容易导致其他同类型react合成事件失效，因为合成事件是利用冒泡进行事件委托。

### 2.2 表单

#### 2.2.1 受控组件与非受控组件

**受控组件**

表单状态变化，都会写入组件`state`中，这种组件叫受控组件。一般就是`value`配合相应的`onChange`回调。

受控组件更新`state`流程：

（1）初始化`state`设置表单默认值

（2）表单变化，触发`onChange`事件处理器

（3）通过合成事件对象`e`拿到改变后的状态，更新`state`

（4）`setState`触发视图重新渲染，表单更新。

**非受控组件**

可以简单的认为，表单状态没有存在`React state`中的组件叫做非受控组件。一般使用`ref`来获取DOM元素。

> - QUES：React受控组件和非受控组件的区别 

### 2.3 样式处理

#### 2.3.1 基本样式设置

1、className设置

2、`style`行内样式，`style prop`需要一个对象

```jsx
<Component style={{color:'white'}} />;

const style = { 
 color: 'white', 
 backgroundImage: `url(${imgUrl})`, 
 WebkitTransition: 'all', 
 msTransition: 'all', 
};
<Component style={style} />;
```

**classnames库**

![image-20211018230521140](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018230521140.png)

> - QUES：Pub/Sub模式的实现原理 TODO

### 2.4 React 组件抽象

复用公共组件：`mixin`和高阶组件。

#### 2.4.1 mixin

`mixin`类似于组合的概念，给一个东西增加功能。

**`mixin`存在的问题**

- **破坏了原有组件的封装**，可能带了新的state、props，需要我们去维护这些“不可见”的状态，但在开发的时候，我们又不会去注意到。并且`mixin`会存在相互依赖，造成混乱。
- **命名冲突**，各个`mixin`中不能有相同命名的方法，否则会报错。

#### 2.4.2 高阶组件

**高阶组件**

接受一个React组件，返回一个新的React组件。

**高阶组件的应用**

- 抽取重复代码，实现组件复用。**常见场景：页面复用。**
- 条件渲染，控制组件渲染逻辑（渲染劫持）。**常见场景：权限控制。**
- 捕获/劫持被处理组件的生命周期。**常见场景：组件渲染性能追踪、日志打点。**

**实现高阶组件的方式**

1、属性代理

2、反向继承

**属性代理**

1、操作`Props`，增加、删除、修改props

![image-20211019211313846](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211019211313846.png)

```jsx
// 返回一个无状态的函数组件
function HOC(WrappedComponent) {
  const newProps = { type: 'HOC' };
  return props => <WrappedComponent {...props} {...newProps}/>;
}

// 返回一个有状态的 class 组件
function HOC(WrappedComponent) {
  return class extends React.Component {
    render() {
      const newProps = { type: 'HOC' };
      return <WrappedComponent {...this.props} {...newProps}/>;
    }
  };
}
```

2、抽象`state`

```jsx
// 高阶组件
function HOC(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      };
      this.onChange = this.onChange.bind(this);
    }
    
    onChange = (event) => {
      this.setState({
        name: event.target.value,
      })
    }
    
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onChange,
        },
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

// 使用
@HOC
class Example extends Component {
  render() {
    return <input name="name" {...this.props.name} />;
  }
}
```

3、获取 `refs` 引用，通过`ref`回调拿到被包裹组件的引用。

`User`组件（被包裹组件）

```jsx
import * as React from 'react';
import * as styles from './index.module.less';

interface IProps {
  name: string;
  age: number;
  inputRef?: any;
}
class User extends React.Component<IProps> {
  private inputElement: any ;

  static sayHello () {
    console.error('hello world'); // tslint:disable-line
  }

  constructor (props: IProps) {
    super(props);
    this.focus = this.focus.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  state = {
    name: '',
    age: 0,
  };

  componentDidMount () {
    this.setState({
      name: this.props.name,
      age: this.props.age,
    });
  }

  onChange = (e: any) => {
    this.setState({
      age: e.target.value,
    });
  }

  focus () {
    this.inputElement.focus();
  }

  render () {
    return (
      <div className={styles.wrapper}>
        <div className={styles.nameWrapper}>姓名：{this.state.name}</div>
        <div className={styles.ageWrapper}>
          年龄:
            <input
              className={styles.input}
              value={this.state.age}
              onChange={this.onChange}
              type="number"
              ref={input => {
                if (this.props.inputRef) {
                  this.props.inputRef(input); // 调用父组件传入的ref回调函数
                }
                this.inputElement = input;
              }}
            />
        </div>
        <div>
          <button
            className={styles.button}
            onClick={this.focus}
          >
            获取输入框焦点
          </button>
        </div>
      </div>
    );
  }
}

export default User;
```

`HOD`高阶组件

```jsx
import * as React from 'react';
import * as styles from './index.module.less';

function HOC (WrappedComponent: any) {
    let inputElement: any = null;

    function handleClick () {
      inputElement.focus();
    }

    function wrappedComponentStaic () {
      WrappedComponent.sayHello();
    }

    return (props: any) => (
      <div className={styles.hocWrapper}>
        <WrappedComponent
          inputRef={(el: any) => { inputElement = el; }}
          {...props}
        />
        <input
          type="button"
          value="获取子组件输入框焦点"
          onClick={handleClick}
          className={styles.focusButton}
        />
        <input
          type="button"
          value="调用子组件static"
          onClick={wrappedComponentStaic}
          className={styles.callButton}
        />
      </div>
    );
}

export default HOC;
```

4、调用被包裹组件的`static`方法

![image-20211019213517894](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211019213517894.png)

5、通过`props`实现条件渲染。通过`props`控制渲染内容以及是否传入数据。

![image-20211019213825582](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211019213825582.png)

6、其他元素包裹`WrappedComponent`

加固定样式或布局。

![image-20211019214033558](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211019214033558.png)

**反向继承**

高阶组件返回的组件继承于`WrappedComponent`，在`render`方法中调用并返回`super.render()`。

```jsx
const HOC = (WrappedComponent) => {
  return class extends WrappedComponent {
    render() {
      return super.render();
    }
  }
}
```

- 反向继承特点：允许高阶组件通过`this`访问被包裹组件，故可以通过`this`直接读取和操作被包裹组件的`state`和`refs`以及生命周期方法。
- 反向继承方式实现的高阶组件可以通过 `super.render()` 方法获取到传入组件实例的 `render` 结果

**劫持原组件生命周期方法**

因为返回新组建继承与`WrappedComponent`，同名方法会覆盖`WrappedComponent`内部的方法。

此时在这个方法中劫持到原方法，执行后，在增加其他新的操作。

![image-20211020152404500](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211020152404500.png)

**读取和操作被包裹组件的`state`**

![image-20211020152645128](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211020152645128.png)

**渲染劫持，修改React元素树**

![image-20211020154147289](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211020154147289.png)

**属性代理和反向继承对比**

- 属性代理：主要对props进行操作
- 反向继承：主要对State、生命周期、render进行操作。

参考链接：[React Hoc](https://juejin.cn/post/6844904050236850184#heading-18)

> - 介绍一下高阶组件
>- 前端设计组件的原则（JS考题中有部分 TODO
> 

#### 2.4.3 组合式开发实践

**1、组件再分离**

多个组件中出现的重叠部分，我们希望把他抽离出来，形成更细小的组件。

**对于颗粒度最小的组件，我们希望它是纯粹的、木偶式的。**

**2、逻辑再抽象**

将组件中相同的交互逻辑、业务逻辑进行抽象复用，可以使用高阶组件实现。

### 2.5 组件性能优化

主要问题：避免不必要渲染。

React 提供的方法：`PureComponent`。

#### 2.5.1 纯函数

**纯函数**

- 相同输入，相同输出。
- 没有副作用。（在纯函数中我们不能改变外部状态：修改全局变量、修改参数等。）
- 不依赖外部状态

#### 2.5.2 PureComponent

使用`shallowEqual`对新旧`props`进行前比较。

本质上就是内嵌了一个`shouldComponentUpdate`生命周期，使用`PureComponent`，不能再使用`shouldComponentUpdate`方法

> - QUES：实现一个shallowEqual TODO

#### 2.5.3 key

如果每个子组件是一个数组/迭代器，必须要有一个唯一的`key prop`，否则会报警告。

> - QUES：KEY值的作用
>
>   标识当前项的唯一性，类似于身份证。
>
> - QUES：为什么不能用index作为key
>
>   因为当中间插入学生时，Index与学生的唯一信息没有相匹配，相当于用了一个随机键。

### 2.6 自动化测试

## 3 React源码

### 3.1 Virtual DOM结构

Virtual DOM 的结构：

- 标签名`tagName`
- 节点属性，包括样式、属性和事件等等。

- 子节点
- key值

Virtual DOM 节点称为 ReactNode，分为三种类型`ReactElement`、`ReactFragment`、`ReactText`，而`ReactElement`又细分为`ReactComponentElement`和`ReactDOMElement`。

### 3.2 `setState`异步更新

`setState`通过一个队列机制实现`state`更新。当执行`setState`时，会将需要更新的`state`合并后放入状态队列，而不会立刻更新`this.state`,队列机制可以高效地批量更新`state`。

### 3.3 React Diff算法

### 3.4 React Patch

## 4 Flux 架构模式

### 4.1 Flux思想

`Flux` 的核心思想就是数据和逻辑永
远单向流动。

![image-20211024231031038](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/202110242310173.png)

### 4.2 Flux 基本概念

Flux 的三大核心部分是`dispatcher`、`store `和`view`。

#### 1. dispacher和action

#### 2. store

1、`store` 负责保存数据，并定义修改数据的逻辑。

2、调用`dispatcher`的`register`方法将注册为一个监听器，在不同的`action type`

```js
import { EventEmitter } from 'events'
import AppDispatcher from '../dispatcher/AppDispatcher'
import CommentActionType from '../constants/ActionType'
// 数据：commemnt
// 方法：getComment loadComment addChangeListener addChangeListener
let comment = []

const CommentStore = Object.assign({}, EventEmitter.prototype, {
  // 获取评论
  getComment() {
    return comment
  },
  // 触发事件
  emitChange() {
    this.emit('change')
  },
  // 增加监听器
  addChangeListener(callback) {
    this.on('change', callback)
  },
  // 移除监听器
  removeChangeListener(callback) {
    this.removeListener('change', callback)
  },
})

AppDispatcher.register((action) => {
  switch (action.type) {
    case CommentActionType.LOAD_COMMENT_SUCCESS: {
      comment = action.payload.comment.commentList
      CommentStore.emitChange()
      break
    }
    default: {
    }
  }
})
export default CommentStore
```

当我们调用`AppDispatcher.dispatch`，就会进入到这个函数中。

#### 3. controller-view

进行`store`与`React组件（view层）`之间的绑定，定义数据更新及传递的方式。

当`store`响应某个`action`并更新数据后，会触发一个更新事件，这个更新事件就是在`controller-view`中进行监听的。当`store`更新时，`controller-view` 会重新获取`store` 中的数据，然后调用`setState`方法触发界面重绘。这样所有的子组件就能获得更新后`store `中的数据了。

#### 4. actionCreator

创建`action`

```js
import AppDispatcher from '../dispatcher/AppDispatcher'
import CommentActionType from '../constants/ActionType'

const CommentActions = {
  loadComment() {
    // 三种action 获取前、获取成功、获取失败
    //dispatch action
    AppDispatcher.dispatcher({
      type: CommentActionType.LOAD_COMMENT,
    })

    fetch('../api/response.json')
      .then((res) => JSON.parse(res))
      .then((value) => {
        AppDispatcher.dispatcher({
          type: CommentActionType.LOAD_COMMENT_SUCCESS,
          payload: {
            comment: value,
          },
        })
      })
      .catch((err) => {
        AppDispatcher.dispatcher({
          type: CommentActionType.LOAD_COMMENT_ERROR,
          error: err,
        })
      })
  }
}
```

### 4.3 Flux 缺点

需要手动的创建`dispatcher`

![image-20211025115623965](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/202110251156088.png)

## 5 Redux 应用架构

### 5.1 Redux 基础概念

#### 5.1.1 Redux 三大原则

**1. 单一数据源**

**2. 状态是只读的**

**3. 状态修改均由纯函数完成**

#### 5.1.2 Redux 核心API

##### 1. `createStore`

`createStore(reducer, [preloadedState], enhancer)`

**作用：**创建唯一的`Redux store`存放`state`

**参数：**

接受三个参数：`reducer`函数、初始`state`、`enhancer`函数增强`Store`功能

**返回值：**返回一个`Store`对象，对象身上有4个方法：

1. `getState()`：获取`store`中的状态
2. `dispatch(action)`：调用`dispatch`分发`action`，修改`store`中的数据。
3. `subscribe(listener)`：注册一个监听者，在`store`变化时触发。
4. `replaceReducer(nextReducer)`：更新`reducer`函数。

```js
import {createStore} form 'redux';
const store = createStore(reducer);
```

##### 2. Redux 与 React 连接

需要使用`react-redux`库，进行`Redux`和`React`的连接。

该库的核心`API`：`<Provider/>`、`connect()`。

**`<Provider/>`**

使用Provider将组件中的内容包裹起来，store以props形式传递。

**`connect()`**

负责连接React和Redux。

- 获取state：从Redux内部取出整个state，传入mapStateToProps中。

```js
function mapStateToProps(state,ownProps) {
  return {
    count: state.count
  };
}

export default connect(mapStateToProps)(Counter);
```

- 分发action：

  ```js
  const mapDispatchToProps = (
    dispatch,
    ownProps
  ) => {
    return {
      onTodoClick: () => {
        dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter: ownProps.filter
        });
      }
    };
  }
  ```

- 包装原组件：`connect` 是一个**高阶函数（HOC）**，调用它后会返回一个函数，这个函数接受一个组件作为参数，返回一个新包装组件。将state和dispatch通过props的方式传入到原组件内部

- 监听Store变化：connect缓存了Store中state的状态,通过当前state状态和变更前state状态进行比较，如果发生变化就会触发子组件的重新渲染。

  **mapStateToProps如果不传，组件不会监听store的变化，也就是说Store的更新不会引起UI的更新**

#### ❓ QUES:

1、Redux 如何解决数据源对象过大的问题？ TODO

2、实现Redux createStore方法

### 5.2 Redux middleware 中间件

[Redux middleware 中间件](https://juejin.cn/post/6844904036013965325#heading-7)

**中间件：** 可以理解为拦截器，对某个过程进行拦截并处理，可以进行串联使用。

在`redux`中我们拦截的是从`dispatch`提交到`reducer`这个过程，增强`dispatch`的功能。

简化：中间件为**独立的、可拔插的**模块，依次给 `dispatch` 增加功能。

### 5.2.1 理解 middleware 机制

`Redux`提供 `applyMiddleware` 方法加载 `middleware`。

**`applyMiddleware` 源码**

```js
import compose from './compose'
export default function applyMiddleware(...middlewares) {
  return (next) => (reducer, initialState) => {
    //next一般传进来createStore
    let store = next(reducer, initialState)
    let dispatch = store.dispatch
    let chain = []
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    }
    chain = middlewares.map((middleware) => middleware(middlewareAPI))
    // 函数式编程
    dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch,
    }
  }
}
```

**一个logger middleware 日志中间件的实现**

```js
export default store => next =>action =>{
    console.log('dispatch:',action);
    next(action);
    console.log('finish',action);
}
```

> - `middlewareAPI` 中的 `dispatch` 为什么要用匿名函数包裹呢？TODO
> - 函数式变成`compose`方法的实现 TODO
>
>   - 手写 redux-thunk 的源码 TODO

**middleware 运行原理分析**

**1. 函数式编程的思想设计**

- `middleware`设计采用了函数式编程中的柯里化，通过单参数函数实现多参数函数。
- `applyMiddleware`中对`middleware`进行层层递归，给`store`、`next`赋值。

`middleware`采用函数柯里化的好处：

1. 易串联。函数柯里化具有延迟执行的特性，通过柯里化积累参数，再使用函数组合形成管道处理数据流。

**利用`Redux Thunk`中间件进行异步操作**

**redux-thunk**的实现

```js
const thunk = store=>next=>action=>{
    typeof action === 'function'?action(store.dispatch,store.getState):next(action);
}
```

### 5.3 Redux 异步流

#### 5.3.1 利用中间件简化异步请求

##### 1. redux-thunk

`thunk函数`：通过函数柯里化来实现对函数的惰性求值。这个返回的函数接受两个参数，一个是`dispatch`，一个是`getState`。一般我们会在里面调用`dispatch`进行获取数据。

**Redux Thunk的使用**

1、安装redux-thunk

2、引入 `redux-thunk` 然后通过 Redux 的 `applyMiddleware` 函数把它应用到 store 中。

```js
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
```

3、创建redux-thunk

这个redux-thunk函数返回一个函数，这个函数接受两个参数，dispatch和getState，然后在函数体中，使用dispatch一个Action，一般为Begin，然后return 发起请求获取数据，然后.then，dispatch，某某某Success，.catch，某某某Fail。

**模板：**

```js
//constants 部分省略
//action creator
const createFetchDataAction = function(id) {
    return function(dispatch, getState) {
        dispatch({
            type: FETCH_DATA_START, 
            payload: id
        })
        api.fetchData(id) 
            .then(response => {
                dispatch({
                    type: FETCH_DATA_SUCCESS,
                    payload: response
                })
            })
            .catch(error => {
                dispatch({
                    type: FETCH_DATA_FAILED,
                    payload: error
                })
            }) 
    }
}
//reducer
const reducer = function(oldState, action) {
    switch(action.type) {
    case FETCH_DATA_START : 
        // 处理 loading 等
    case FETCH_DATA_SUCCESS : 
        // 更新 store 等处理
    case FETCH_DATA_FAILED : 
        // 提示异常
    }
}
```

4、（局部组件需要数据）在componentDidMount / useEffect中调用dispatch action获取数据

![image-20211029233720352](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/202110292337568.png)

（全局数据）创建store后，就是用store.dispatch action

5、这个时候reducer函数内部就是负责处理这些不同的action，拿到payload去赋值

> - redux-thunk的实现代码 TODO

##### **2. redux-promise**

将`promise`作为`payload`提交给`dispatch`，让中间件处理，判断`action`或其`payload`为`Promise`时，将其`resolve`，并将`payload`设置为`promise`的成功/失败结果。

**redux-promise跟redux-thunk的区别**

在`redux-thunk`中，我们手动处理一个异步的`then().catch()`，在里面分别`dispatch`不同的action。

而在`redux-promise`中，这些工作由中间件去处理，我们只需要将异步任务在`payload`中执行。

**模板：**

```js
const FETCH_DATA = 'FETCH_DATA'
//action creator
const getData = function(id) {
    return {
        type: FETCH_DATA,
        payload: api.fetchData(id) // 直接将 promise 作为 payload
    }
}
//reducer
const reducer = function(oldState, action) {
    switch(action.type) {
    case FETCH_DATA: 
        if (action.status === 'success') {
             // 更新 store 等处理
        } else {
                // 提示异常
        }
    }
}
```

**redux-promise的实现**

```js
import { isFSA } from 'flux-standard-action'; 
function isPromise(val) { 
 return val && typeof val.then === 'function'; 
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    //判断action是否为正常action
    if (!isFSA(action))  {
      //如果action是Promise
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    //如果action.payload为Promise 添加回调分别dispatch
    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}
```

##### 3. redux-composable-fetch 自实现中间件

自实现中间件，在中间处理loading状态。识别出一个action为发送请求的action，然后根据url、params、method等参数发送异步请求，并在响应后分发请求成功/失败的action。

接受的参数如下：

```js
{ 
 url: '/api/weather.json', 
 params: { 
 	city: encodeURI(city), 
 }, 
 types: ['GET_WEATHER', 'GET_WEATHER_SUCESS', 'GET_WEATHER_ERROR'], 
}
```

**实现中间件**

```js
const fetchMiddleware = (store) => (next) => (action) => {
  // 如果不是异步请求action 直接分发action
  if (!action.url || !Array.isArray(action?.type)) {
    next(action)
  }

  const [LOADING, SUCCESS, ERROR] = action.type
  console.log('action', LOADING, SUCCESS, ERROR)

  // 异步请求前
  next({
    type: LOADING,
    loading: true,
  })

  // 发送请求
  fetch(action.url, { params: action.params })
    .then((res) => res.json())
    .then((res) => {
      next({
        type: SUCCESS,
        loading: false,
        payload: res,
      })
    })
    .catch((err) => {
      next({
        type: ERROR,
        loading: false,
        error: err,
      })
    })
}

export default fetchMiddleware
```

##### 3. redux-saga

使用generator替代promise

> - redux-promise的实现 TODO

### 5.4 使用中间件处理复杂异步流

#### 1. 轮询

轮询：在一定时间内重新启动，**发送请求**，实现长连接。

**自实现中间件redux-polling**

### 5.5 Redux 与 路由

#### 5.5.1 嵌套路由及路由匹配

`<Route>组件`：`path`属性指明路由匹配路径，若路由需要参数，加上`:参数名`，若需要可选参数，加上`(:参数名)`

#### 5.5.2 路由切换方式

`hashChange`、`history.pushState`。

两者的区别：

1、`hashChange`：兼容性好、丑陋的`#`

2、`history.pushState`：URL优雅、兼容性IE10+（？TODO）、需要额外的服务端配置解决任意路径刷新问题（？TODO）。

#### QUES

介绍一下前后端路由

1.前端路由：改变URL，页面不刷新。本质上就是切换URL，切换组件。

2.后端路由：客户端发送请求url，后端处理url与页面的映射关系，服务端渲染页面后返回给客户端。



### 5.6 Redux 与组件

两种类型组件：容器型组件、展示型组件。

**容器型组件：**组件如何工作，即如何更新数据，不包含组件样式。

**展示型组件：**组件如何渲染，即包含Virtual DOM修改或组件、组件样式等。

![image-20211103164032807](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/202111031640227.png)

#### QUES:

1、概念解释

容器型组件、展示型组件。

有状态组件、无状态组件。

类、方法

纯组件、非纯组件。

# 二、Question

#### 说一说智能组件和木偶组件

智能组件：组件内部的交互行为，修改state，即state在内部更新。

木偶组件：组件外部传入具体的值，修改组件中的state，即组件像”木偶“一样被操控。

#### 介绍一下React生命周期

React生命周期，分为三个阶段：**挂载、渲染、卸载**。

**挂载和卸载**

涉及`componentsWillMount`、`componentDidMount`、`componentsWillUnMount`。

**渲染阶段主要是数据更新**

从不同的数据更新的角度来看：

1、组件因自身`state`更新而更新：依次执行：`shouldComponentUpdate`、`componentWillUpdate`、`render`、`componentDidUpdate`。

2、组件因父组件`props`更新而更新，则在上述4个生命周期方法执行前，先执行`getDerivedStateFromProps`、`componentWillReceiveProps`。

#### 介绍一下React生命周期各个API

按顺序来。

**`componentDidMount()`**

`render`完成，仅在第一次渲染后执行。

**`componentWillReceiveProps(nextProps)`**

接受更新后的`props`，通过判断新旧`props`，进行`setState`，在此方法中`setState`不会触发二次渲染。（因为在render渲染之前，setState合并）

**`getDedrivedStateFromProps(nextProps,prevSTate)`**

接受更新的`props`和先前的`state`，对两者进行判断，满足某些条件，返回一个对象更新`state`，否则返回`null`不更新。

**`shouldComponentUpdate(nextProps,nextState)`**

接受更新的`props`和`state`，通过条件判断是否需要进行更新，返回`true`更新，返回`false`不更新。

**`componentDidUpdate`**

`render`渲染完成后执行。

#### 为什么不能再`componentWillUpdate`中执行`setState` TODO

#### React中获取组件DOM元素的方法

1. `ref`引用
2. `findDOMNode`方法获取

**注意：findDOMNode 和 refs 都无法用于无状态组件，因为无状态组件挂载时只是方法调用，没有新建实例。**

#### 介绍一下合成事件及其原理（实现机制 ）

**合成事件**是 React 自己封装的一套事件机制，通过事件池来实现，避免频繁的创建销毁事件对象。

合成事件的底层原理是进行了**事件委托**。

React 并不会把真实的事件处理函数直接绑定到真实DOM上，而是把所有事件绑定到了最外层`document`，使用一个统一的事件监听器，在这个事件监听器里维持了一个映射来保存所有组件内部的事件监听和处理函数。

当组件挂载或卸载时，其实就是在统一的事件监听器上增加或删除一些对象。

当事件触发时，事件冒泡到最外层，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用，根据触发的target将事件分发到具体的组件实例。

#### React 为什么要用合成事件？WAIT

1、抹平各个浏览器兼容性差异，实现跨平台。

> - 为什么自己封装的事件机制能解决跨平台和兼容性问题？
>
>   举个例子，在原生事件中，阻止冒泡时我们需要考虑兼容性，使用stopPropogation还是cancelBabel。
>   
>   但是在合成事件回调中的`e`它是一个合成事件对象，它内部是会对兼容性进行处理，我们开发者直接使用`stopPropogation`，不用考虑兼容性，因为内部已经帮我们进行处理了。

2、避免垃圾回收 ？TODO

原生事件对象可能会被频繁创建和回收，但是我们 React 使用的是**事件池**，是在事件池中获取或释放事件对象。

**也就是说 React 事件对象是存放进一个数组中，当事件触发，就从这个数组中弹出，避免频繁地去创建和销毁(垃圾回收)**。

#### 什么是内存泄漏？为什么会发生内存泄漏？什么情况下会发生？如何解决？

3W2H分析法：

What（是什么）、Why（为什么）、When（什么时候）

How（怎么进行）、How（如何高效/如何解决）

**内存泄漏的定义**

内存没有及时回收，被泄漏了。

**为什么会发生内存泄露**

垃圾回收机制通常采用标记清除，而内存泄漏的直接原因一般为，不同生命周期的两个东西相互通信，一个生命到期该回收，却被另一方还持有着，这时候就发生了内存泄漏。

**什么情况会发生内存泄漏**

1、遗忘的全局变量

没有及时手动回收（手动赋null）

2、遗忘的定时器

`setTimeout` 和 `setInterval` 是由浏览器的定时器线程来维护它的生命周期，如果没有手动清理这些定时器，这些定时器依旧会存活。

这个时候定时器的回调函数又持有了页面中的一些变量或DOM元素，就会导致即使页面销毁了，这些东西无法被正常回收，就发生了内存泄漏。

3、遗忘的闭包

正常情况下，函数执行完后，申请的内存会被回收。

但是在闭包情况下，函数内部返回一个函数，这个函数又持有外部函数的变量，这个函数又被外部持有，导致函数执行完之后，内存无法回收。

所以，一般我们倡导，在使用完闭包后，需要手动的去进行垃圾回收，即赋值`null`

4、遗忘的DOM元素

一般来说DOM元素的生命周期取决于是否挂在DOM树上，从DOM树上移除，就被销毁回收。

但如果在JS中，有某个DOM元素的引用，那么他的生命周期就由js和是否在DOM树上两者决定，DOM移除时，需要在两个地方都去清理。

**如何解决：分析内存泄漏并解决**

![img](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/202110241804587.webp)

#### 如果页面卡顿，你觉得可能是什么原因造成的？有什么办法锁定原因并解决吗？TODO

先会检查是否是网络请求太多，导致数据返回较慢，可以适当做一些缓存

也有可能是某块资源的bundle太大，可以考虑拆分一下

然后排查一下js代码，是不是某处有过多循环导致占用主线程时间过长

浏览器某帧渲染的东西太多，导致的卡顿

在页面渲染过程中，可能有很多重复的重排重绘

#### React受控组件和非受控组件的区别 

1. 受控组件“受React控制”，允许我们禁用/启用、对Value进行修改。
2. 非受控组件“不受React控制”，状态存在DOM中。

#### 介绍一下高阶组件

#### class组件是如何实现逻辑复用的？ TODO

#### 前端设计组件的原则（JS考题中有部分）TODO

一般按照功能来进行组件的封装，原则

1、组件再分离，多个组件出现的重叠部分，抽象成更细小的组件，提高复用性。并且我们希望这些组件是木偶式的。

2、逻辑再抽离，将组件中相同的交互逻辑、业务逻辑进行抽象复用，可以使用高阶组件实现。

#### 函数式变成 `compose` 方法的实现

接受`funcs`作为参数，返回一个新的函数，该函数接收一个参数作为初始值，`funcs`从右往左执行。
>
>```js
>function compose(...funcs) {
>return (args) => funcs.reduceRight((composed, f) => f(composed), args)
>}
>```

#### `middlewareAPI` 中的 `dispatch` 为什么要用匿名函数包裹呢？

???我们用applyMiddleware是为了改造dispatch,所以applyMiddleware执行完后, dispatch是变化了的，而middlewareAPI是applyMiddleware执行中分发到各个middleware的，所以必须用匿名函数包裹dispatch,这样只要dispatch更新了，middlewareAPI 中的dispatch 应用也会发生变化。