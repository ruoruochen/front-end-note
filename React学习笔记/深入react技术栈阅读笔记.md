# React

## 1 React简介

### 1.1 实现 Tabs 组件，了解 React

**智能组件 VS 木偶组件**

智能组件：组建内部的交互行为，修改state，即state在内部更新。

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

`^`：以xxx开头

`*`：以xxx结尾

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

React生命周期，三个阶段：挂载、渲染、卸载。

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
> - QUES：为什么不能再`componentWillUpdate`中执行`setState`? TODO 3.3节

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
>   1. `ref`引用
>   2. `findDOMNode`方法获取
>
>   **注意：findDOMNode 和 refs 都无法用于无状态组件，因为无状态组件挂载时只是方法调用，没有新建实例。**

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

在React底层，主要对合成事件做了两件事：**事件委派**和**自动绑定**。

**事件委派**

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

> - QUES：介绍一下合成事件及其原理（实现机制 ）TODO
> - QUES：React 为什么要用合成事件？TODO
> - QUES：React绑定this的办法 TODO

#### 2.1.3 在React中使用原生事件

使用`addEventListner`添加事件监听，使用`removeEventListner`移除事件监听。

**注意：在React中使用DOM原生事件，一定要在组件卸载时手动移除，否则可能出现内存泄漏的问题**

![image-20211018214815393](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018214815393.png)

> - QUES：内存泄漏是什么？什么情况下会发生？如何减少发生？TODO
> - QUES：为什么不手动卸载原生监听，会导致内存泄漏？TODO

#### 2.1.4 尽量避免合成事件与原生事件混用

混用合成事件、原生事件可能出现的后果：

在合成事件中阻止冒泡，发现没有阻止冒泡到原生事件上。

因为合成事件是利用冒泡，在最外层对所有事件进行统一的监听管理，还没有调用事件处理函数，所以`e.stopPropagation`没生效。

**解决：（1）全使用原生 （2）在原生事件中，使用e.target将冒泡上来的某些目标排除掉。**

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
>   1. 受控组件“受React控制”，允许我们禁用/启用、对Value进行修改。
>   2. 非受控组件“不受React控制”，状态存在DOM中。

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