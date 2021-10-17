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