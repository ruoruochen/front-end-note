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

### ❓ QUES:

**1. 说一说智能组件和木偶组件**

智能组件：组件内部的交互行为，修改state，即state在内部更新。

木偶组件：组件外部传入具体的值，修改组件中的state，即组件像”木偶“一样被操控。



**2. 介绍一下React生命周期**

React生命周期，分为三个阶段：**挂载、渲染、卸载**。

**挂载和卸载**

涉及`componentsWillMount`、`componentDidMount`、`componentsWillUnMount`。

**渲染阶段主要是数据更新**

从不同的数据更新的角度来看：

1、组件因自身`state`更新而更新：依次执行：`shouldComponentUpdate`、`componentWillUpdate`、`render`、`componentDidUpdate`。

2、组件因父组件`props`更新而更新，则在上述4个生命周期方法执行前，先执行`getDerivedStateFromProps`、`componentWillReceiveProps`。



**3. 介绍一下React生命周期各个API**

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



**4. 为什么不能再`componentWillUpdate`中执行`setState` TODO**



**5. React中获取组件DOM元素的方法**

1. `ref`引用
2. `findDOMNode`方法获取

**注意：findDOMNode 和 refs 都无法用于无状态组件，因为无状态组件挂载时只是方法调用，没有新建实例。**

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

#### ❓ QUES:

**1. 介绍一下合成事件及其原理（实现机制 ）**

**合成事件**是 React 自己封装的一套事件机制，通过事件池来实现，避免频繁的创建销毁事件对象。

合成事件的底层原理是进行了**事件委托**。

React 并不会把真实的事件处理函数直接绑定到真实DOM上，而是把所有事件绑定到了最外层`document`，使用一个统一的事件监听器，在这个事件监听器里维持了一个映射来保存所有组件内部的事件监听和处理函数。

当组件挂载或卸载时，其实就是在统一的事件监听器上增加或删除一些对象。

当事件触发时，事件冒泡到最外层，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用，根据触发的target将事件分发到具体的组件实例。



**2. React 为什么要用合成事件？WAIT**

1、抹平各个浏览器兼容性差异，实现跨平台。

> - 为什么自己封装的事件机制能解决跨平台和兼容性问题？
>
>   举个例子，在原生事件中，阻止冒泡时我们需要考虑兼容性，使用stopPropogation还是cancelBabel。
>
>   但是在合成事件回调中的`e`它是一个合成事件对象，它内部是会对兼容性进行处理，我们开发者直接使用`stopPropogation`，不用考虑兼容性，因为内部已经帮我们进行处理了。

2、避免垃圾回收 ？TODO

原生事件对象可能会被频繁创建和回收，但是我们 React 使用的是**事件池**，是在事件池中获取或释放事件对象。

**也就是说 React 事件对象是存放进一个数组中，当事件触发，就从这个数组中弹出，避免频繁地去创建和销毁(垃圾回收)**。



**3. 什么是内存泄漏？为什么会发生内存泄漏？什么情况下会发生？如何解决？**

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



**4. 如果页面卡顿，你觉得可能是什么原因造成的？有什么办法锁定原因并解决吗？TODO**

先会检查是否是网络请求太多，导致数据返回较慢，可以适当做一些缓存

也有可能是某块资源的bundle太大，可以考虑拆分一下

然后排查一下js代码，是不是某处有过多循环导致占用主线程时间过长

浏览器某帧渲染的东西太多，导致的卡顿

在页面渲染过程中，可能有很多重复的重排重绘

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

#### ❓ QUES:

1. React受控组件和非受控组件的区别 

   - 受控组件“受React控制”，允许我们禁用/启用、对Value进行修改。

   - 非受控组件“不受React控制”，状态存在DOM中。

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

#### ❓ QUES:

1. 介绍一下高阶组件

2. class组件是如何实现逻辑复用的？ TODO

3. 前端设计组件的原则（JS考题中有部分）TODO

   一般按照功能来进行组件的封装，原则

   1、组件再分离，多个组件出现的重叠部分，抽象成更细小的组件，提高复用性。并且我们希望这些组件是木偶式的。

   2、逻辑再抽离，将组件中相同的交互逻辑、业务逻辑进行抽象复用，可以使用高阶组件实现。

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

### 2.6 React-router

`v6`版本

#### 2.6.1 React-router 的基本使用

##### `<Routes>和<Route>`

`<Route>组件`必须有`path/index、element`属性，注意element属性的属性值是**`<App/>`**，而不是`APP`

```jsx
<Routes>
    <Route path="/" element={<App />} />
    <Route path="/home" element={<Home />}></Route>
    <Route path="/detail" element={<Detail />}></Route>
</Routes>
```

> 在v5中，`<Routes>`原名为`<Switch>`

##### `<Link>`

路径跳转至`home`

```jsx
<Link to="home">Home</Link>
```

**相对链接**

路径不以 `/` 开头，则继承最近的渲染路径，加深`URL`层次。若以 `/` 开头则不进行继承。

什么意思呢？ 

`Home`组件当前路径为：`http://localhost:3000/home`

我在`Home`组件中使用`Link`跳转至`detail`组件。

- 如果没有 `/` ，此时跳转路径为：`http://localhost:3000/home/detail/xxx`。
- 如果有 `/` ，此时跳转路径为：`http://localhost:3000/detail/xxx`

```jsx
<Link to={`detail/${id}`}>
    <h1 className="article-title">{title}</h1>
</Link>
```

##### `<NavLink>`

匹配上当前`URL`时，会给`NavLink渲染元素`添加参数。

将函数传递给`style/className`，通过`isActive` 来区分激活、未激活，给予不同的参数。

```html
const activeStyles = {
    color: 'red',
    fontSize: '50px',
}

<NavLink 
  style={({ isActive }) => (isActive ? activeStyles : undefined)}
  to={`/detail/${id}`}>
  <h1 className="article-title">{title}</h1>
</NavLink>
```

```html
<NavLink className={({ isActive }) => isActive ? "red" : "blue"} />
```

##### `Navigate`

当`Navigate`组件被渲染时，将改变当前`url`。例子：在用户输入网址进入登录界面，检测到用户已登录，自动跳转至首页。

```js
<Navigate to="/dashboard"/>
```



#### 2.6.2 嵌套路由及路由匹配

##### 1. 嵌套路由

嵌套路由中嵌套了`URL`：`"/"+"home"`、`"/"+"detail"`，始终显示`APP组件`，在`APP组件`的`Outlet`中显示匹配子路由。

```jsx
<Routes>
    <Route path="/" element={<App />}>
        <Route path="home" element={<Home />} />
        <Route path="detail" element={<Detail />} />
    </Route>
</Routes>
```

**`App`组件中使用`Outlet组件`供子路由组件切换**

```jsx
<div>
    <h1>App</h1>
    <nav>
        <Link to="home">Home</Link>
        <Link to="detail">Detail</Link>
    </nav>
    <Outlet></Outlet>
</div>
```

##### 2. 无匹配路由

如果所有路由都没匹配上，我们可以在路由配置中处理“不匹配”情况。`* `表示均无匹配。

```jsx
<Route
    path="*"
    element={
        <main>
            <p>There's nothing here!</p>
        </main>
    }
/>
```

#### 2.6.3 索引路由

**索引路由：**

- 父路由的子路由都不匹配，则匹配索引路由。
- 索引路由为父组件的默认子路由，例如`Home`组件为默认显示路由。
- 用户没有点击导航列表，呈现索引路由。

![image-20211105224801722](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/202111052248812.png)

例子：如果这个时候没有传`detailId`，则匹配中索引路由，显示“请选中博客”

#### 2.6.4 路由参数

##### 1. 普通参数

**传参：**

`<Route>组件`：`path`属性指明路由匹配路径，若路由需要参数，加上`:参数名`，若需要可选参数，加上`(:参数名)`

```jsx
<Routes>
    <Route path="/detail/:detailId" element={Detail}></Route>
</Routes>
```

**获取参数：**

1、函数式组件

使用`useParams`，获取参数对象，在调用对象`.`获取属性。

```js
import { useParams } from "react-router-dom";

export default function Invoice() {
  let params = useParams();
  return <h2>Invoice: {params.invoiceId}</h2>;
}
```

2、Class 组件 TODO ？

在`v5`版本，使用`this.props.match.xxx`获取参数，`v6`未知。

##### 2. 搜索参数

1、`function`组件

使用`useSearchParams Hooks` 获取搜索参数，即`?`后面的键值对。

通过`searchParams`对象的`get`方法获取特定参数。

```jsx
let [searchParams, setSearchParams] = useSearchParams();
searchParams.get("filter")
```

2、Class 组件 未知。

#### 2.6.5 自定义行为

在使用搜索参数对数据过滤时，希望点击链接后，不要清除输入框及 URL 中的参数。

**解决方案：**

自封装`QueryLink组件`，将查询字符串添加到链接`href`中进行保存。

```jsx
import { useLocation, NavLink } from "react-router-dom";

function QueryLink({to,...props}){
    let location = useLocation();
    return <NavLink to={to+location.search} {...props}/>
}
```

`useLocation`返回一个对象包含`url`的信息：

```js
{
  pathame: "/invoices",
  search: "?filter=sa",
  hash: "",
  state: null,
  key: "ae4cz2j"
}
```

#### 2.6.6 路由切换方式

`hash` 模式和`history `模式两者的区别：

1、`hash` 模式：兼容性好、丑陋的`#`

2、`history` 模式：URL优雅、存在兼容性问题、需要额外的服务端配置解决任意路径刷新问题

##### `<BrowserRouter>`

推荐使用

##### `<HashRouter>`

强烈建议不要使用。

#### ❓ QUES

1. 介绍一下前后端路由

   - 前端路由：改变URL，页面不刷新。本质上就是切换URL，切换组件。
   - 后端路由：客户端发送请求url，后端处理url与页面的映射关系，服务端渲染页面后返回给客户端。

2. `React router`的原理及方式，路由方式的对比 TODO

3. `react-router`和`react-router-dom`分别提供哪些组件？

   - `react-router`提供的组件包括：`Routes`、`Route`
   - `react-router-dom`提供了`DOM`专用API：
     - `BrowerRouter`、`HashRouter`
     - ``Link`、`NavLink`
     - `Outlet `
     - `useParams`、`useSearchParams`、`useLocation`等

4. `redux`和`react-redux`分别提供什么组件？

   - `redux`：`createStore`、`applyMiddleware`、`combindReducers`
   - `react-redux`：`connect`、`Provider`

5. 为什么`history`模式需要额外的服务端配置解决任意路径刷新问题？

   原因：因为刷新是拿当前`URL`去请求服务器的，在刷新某个子路由路径的时候，这个资源是找不到的，因为它只是前端路由。

   解决方法：当访问前端路由时，去访问`index.html`入口，再由前端路由自己访问对应的页面。需要`nginx`配置`try files`指令

   需要服务端配置以下内容

   ```js
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

   `try_files file... uri`的意思：

   - `try_files`后面可以定义多个文件路径和最后一个作为内部跳转的`uri`，其中**文件路径是和 `alias` 和 `root` 两个指令合在一起构造而成**；
   - 而文件后面以"/"结尾，会检查目录是否存在；
   - 当文件都找不到时，就会去**以最后一个uri进行内部跳转请求**。

   以我们例子为例：

   - 我定义了 `try_files $uri $uri/ /h5/index.html` ，`root`是 `/Users/admin/www` ；
   - 我的访问路径时`testhistory.com/h5/about`，`$uri` 是 `/h5/about` ，那么加上root作为根目录不能找到 ， `$url/` 也不能找到对应的目录（如果不配置，则会显示404）；
   - 文件找不到了，那么就内部跳转到 `/h5/index.html` ，就相当于内部去请求`testhistory.com/h5/index.html`

6. 为什么`hash`模式不存在这个问题？

   不需要服务器配置，因为浏览器向服务器发送请求时不会携带hash的内容，所以总是能拿到入口文件。

### 

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

##### 2. `<Provider/>`、`connect()`用于Redux 与 React 连接

需要使用`react-redux`库，进行`Redux`和`React`的连接。

该库的核心`API`：`<Provider/>`、`connect()`。

**`<Provider store>`**

使用`Provider`将组件中的内容包裹起来，`store`以`props`形式传递。

**`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`**

**作用：**负责连接`React组件`和`Redux store`。

**参数：**

- `mapStateToProps(state, [ownProps]): stateProps` 函数：监听`Redux Store`的变化，发生改变则调用该函数，将数据注入到组件`props`中。**（换言之，省略这个参数则不会监听`Redux Store`的变化）**
- `mapDispatchToProps(dispatch, [ownProps]): dispatchProps` 函数：返回值可以是对象/函数。如果是对象，则对象的函数都会当成`Redux action createor`，最终会将这些属性注入到`props`中。**（函数情况大多数情况用不到，用到再去了解）**

- `mergeProps(stateProps, dispatchProps, ownProps): props` 函数：`mapStateToProps()` 与 `mapDispatchToProps()` 的执行结果和组件自身的 `props` 将传入到这个回调函数中，可以在其中筛选部分数据。
- [`options`] 定制 `connector` 的行为：
  - `pure = true`：`connector` 将执行 `shouldComponentUpdate` 并且浅对比 `mergeProps` 的结果，避免不必要的更新，前提是当前组件是一个纯组件，默认值为 `true`。
  - `withRef = false`：如果为 `true`，`connector` 会保存一个对被包装组件实例的引用，该引用通过 `getWrappedInstance()` 方法获得。默认值为 `false`。

```js
function mapStateToProps(state,ownProps) {
  return {
    count: state.count
  };
}

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

export default connect(mapStateToProps,mapDispatchToProps)(Counter);
```

**返回值：**返回一个注入了`state`和`action creator`的新`React`组件。

#### ❓ QUES:

1. Redux三大原则

   单一数据源、State只读、纯函数修改

2. Redux 如何解决数据源对象过大的问题？ TODO

   至于我们担心的数据源对象过于庞大的问题，可以在5.6.8 节中看到Redux提供的工具函数`combineReducers`是如何化解的。

3. 实现Redux createStore方法，原理

4. 实现connect方法，原理

### 5.2 Redux middleware 中间件

[Redux middleware 中间件](https://juejin.cn/post/6844904036013965325#heading-7)

**中间件：** 可以理解为拦截器，拦截某个过程并处理。是一个独立的模块。

而在`redux`中我们拦截的是从`dispatch`提交到`reducer`这个过程，去给`dispatch`增加功能。

#### 5.2.1 理解 middleware 机制

`Redux`提供 `applyMiddleware` 方法加载 `middleware`。

**`applyMiddleware` 源码**

源码分析：

`applyMiddleware `本质上就是给 `dispatch` 方法增加一些功能，依次执行中间件后使用函数式编程将他们串联起来，获取一个新的`dispatch`，返回一个更新`dispatch`后的`Store`对象

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
    //依次执行中间件,返回一个函数next=>action=>{}
    chain = middlewares.map((middleware) => middleware(middlewareAPI))
    //函数式编程 进行串联，传入参数dispatch,获取一个新的dispatch  函数形式action=>{}
    dispatch = compose(...chain)(store.dispatch)
    //更新dispatch
    return {
      ...store,
      dispatch,
    }
  }
}
```

**一个自实现中间件 logger middleware 日志中间件的实现**

```js
export default store => next => action =>{
    console.log('dispatch:',action);
    next(action);
    console.log('finish',action);
}
```

#### ❓ QUES:

1. 介绍一下`Redux middleware` 中间件

   **中间件：** 可以理解为拦截器，拦截某个过程并处理。是一个独立的模块。

   而在`redux`中我们拦截的是从`dispatch`提交到`reducer`这个过程，去给`dispatch`增加功能。

2. 实现一下`applyMiddleware`方法

   `applyMiddleware `本质上就是给 `dispatch` 方法增加一些功能，依次执行中间件后使用函数式编程将他们串联起来，获取一个新的`dispatch`，返回一个更新`dispatch`后的`Store`对象

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
       //依次执行中间件
       chain = middlewares.map((middleware) => middleware(middlewareAPI))
       //函数式编程 进行串联，获取一个新的dispatch
       dispatch = compose(...chain)(store.dispatch)
       //更新dispatch
       return {
         ...store,
         dispatch,
       }
     }
   }
   ```

3. `applyMiddleware`方法中的`middlewareAPI` 中的 `dispatch` 为什么要用匿名函数包裹呢？

   执行完`applyMiddleware`后，`dispatch`发生变化。我们希望在各个`middleware`中的`dispatch`是最新的，所以必须使用匿名函数包裹`dispatch`，利用闭包保存函数引用。

4. 在`middleware`中调用`store.dispatch(action)`和`next(action)`的区别

   在`middleware`中调用`store .dispatch()`和在其他任何地方调用的效果一样，就是分发`action`。而在`middleware`中调用`next()`,效果是进入下一个`middleware`

   ![image-20211104111959067](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/202111041120982.png)

5. 介绍一下函数式编程

   函数式编程是一种编程范式，是指整个程序都有函数调用、函数组成构成。

   - 有三大特点：函数是一等公民、声明式编程、无状态和数据不可变。

   - 函数式编程中最常见的使用是函数柯里化和函数组合。
   - 柯里化是指将一个一次性接受多个参数的函数改写为多次接受参数的函数。可以进行参数复用，提高函数多样性。
   - 函数组合是指将多个函数组合成一个函数。

6. 函数式编程`compose`方法的实现

   `compose`返回一个函数接收参数，将函数从右往左执行，每一个函数的返回值作为下一个函数的参数。

   ```js
   const compose = (...fns) => {
     return (args) => fns.reduceRight((composed, fn) => fn(composed), args)
   }
   ```

7. 实现一些redux-thunk

   redux-thunk本质上就是判断`action`是否为函数，如果是函数，执行函数并将`dispatch`和`getState`作为参数传入；如果不是函数，直接`next(action)`，进入下一个`middleware`。

   ```js
   const thunk = (store) => (next) => (action) =>
     typeof action === 'function'
       ? action(store.dispatch, store.getState)
       : next(action)
   ```

### 5.3 Redux 异步流

#### 5.3.1 利用中间件简化异步请求

##### 1. redux-thunk

`thunk函数`：通过函数柯里化实现函数惰性求值。

返回函数接收两个参数：`dispatch`、`getState`

**redux Thunk的使用**

1、安装 redux-thunk

2、使用`applyMiddleware`应用中间件。

```js
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
```

3、创建redux-thunk函数

**模板：**

```js
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

4、在 `componentDidMount / useEffect` 中调用`dispatch(action)`获取数据。

5、这个时候reducer函数内部就是负责处理这些不同的action，拿到payload去赋值

##### **2. redux-promise**

将`promise`作为`payload`提交给`dispatch`，让中间件处理，判断`action`或其`payload`为`Promise`时，将其`resolve`，并将`payload`设置为`promise`的成功/失败结果。

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

##### 3.  自实现 `redux-composable-fetch` 异步请求中间件

中间件判断`action`为异步请求`action`，发送异步请求后，分发请求/失败的`action`。

异步请求`action`：

```js
{ 
 url: '/api/weather.json', 
 params: { 
 	city: encodeURI(city), 
 }, 
 type: ['GET_WEATHER', 'GET_WEATHER_SUCESS', 'GET_WEATHER_ERROR'], 
}
```

**实现中间件**

```js
const fetchMiddleware = (store) => (next) => (action) => {
  // 如果不是异步请求action next(action)进入下一个middleware
  if (!action.url || !Array.isArray(action?.type)) {
    next(action)
  }

  const [LOADING, SUCCESS, ERROR] = action.type

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

#### ❓ QUES:

1. `redux-thunk`的实现

   ```js
   const thunk = store=>next=>action=>{
       typeof action === 'function'?action(store.dispatch,store.getState):next(action);
   }
   ```

2. `redux-promise`的实现

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

3. redux-promise跟redux-thunk的区别

   在`redux-thunk`中，我们手动处理一个异步的`then().catch()`，在里面分别`dispatch`不同的`action`。

   而在`redux-promise`中，这些工作由中间件去处理，我们只需要将异步任务在`payload`中执行。

### 5.4 Redux 与组件

两种类型组件：容器型组件、展示型组件。

**容器型组件：**组件如何工作，即如何更新数据，不包含组件样式。

**展示型组件：**组件如何渲染，即包含Virtual DOM修改或组合、组件样式等。

![image-20211103164032807](https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/202111031640227.png)

#### 5.4.3 Redux 中的组件

Redux中3种布局组件：`Layouts`、`Views`、`Components`

**1. Layouts**

页面布局组件，描述页面结构，通常为无状态组件。

**2.Views**

路由组件，`View`就是`Redux`中的容器组件。

**3.Components**

路由以下的组件，包含具体逻辑和交互，数据和`action`是由`Views`传下来的，意味着它是展示型组件。

#### ❓ QUES:

1. 概念解释：容器型组件、展示型组件；有状态组件、无状态组件；纯组件、非纯组件。
   - 容器型组件：定义组件如何工作，即数据如何更新，不包含组件样式。
   - 展示型组件：定义组件如何渲染，即包含Virtual DOM修改或组合、组件样式等。
   - 有状态组件：组件中维护数据`state`
   - 无状态组件：组件中没有自己的数据`state`，均依赖外界传进来的`props`进行渲染
   - 纯组件`pureComponent`：通过`props`和`state`的浅对比来实现`shouldcomponentupdate`
   - 非纯组件`Component`：不会进行新旧`props`和`state` 的对比。

### 5.5 服务端渲染

服务端渲染场景：第一次请求页面，由服务器渲染HTML返回给客户端，之后客户端接收渲染控制权。

#### 5.5.1 服务端使用 Redux

服务端把数据发送到客户端，需要经过：

1. 为每次请求创建全新的`Redux store`实例
2. 按需`dispatch`一些`action`
3. 从`store`中取出`state`
4. 把`state`返回给客户端

服务端需要做的事情：提供应用所需的**初始`state`**

客户端需要做的事情：使用服务器返回的`state`创建并初始化一个全新的`Redux store`。