#### 介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的？

相关知识点：

```
（1）有两种盒子模型：IE盒模型（border-box）、W3C标准盒模型（content-box）
（2）盒模型：分为内容（content）、填充（padding）、边界（margin）、边框（border）四个部分

IE盒模型和W3C标准盒模型的区别：

（1）W3C标准盒模型：属性width，height只包含内容content，不包含border和padding
（2）IE盒模型：属性width，height包含content、border和padding，指的是content+padding+border。

在ie8+浏览器中使用哪个盒模型可以由box-sizing（CSS新增的属性）控制，默认值为content-box，即标准盒模型；
如果将box-sizing设为border-box则用的是IE盒模型。如果在ie6，7，8中DOCTYPE缺失会将盒子模型解释为IE盒子模型。若在页面中声明了DOCTYPE类型，所有的浏览器都会把盒模型解释为W3C盒模型。
```

回答：

```
盒模型分为IE盒模型和W3C标准盒模型。盒模型都是由四个部分组成的，分别是content、padding、margin和border。

标准盒模型和IE盒模型的区别在于设置width和height时，包含内容不同。标准盒模型的width和height属性只包含了content，而IE盒模型的width和height属性包含了border、padding和content。

在ie8+浏览器中，我们可以通过修改元素的box-sizing属性来改变元素的盒模型。
```

详细的资料可以参考： [《CSS 盒模型详解》](https://juejin.im/post/59ef72f5f265da4320026f76)

#### CSS 选择符有哪些？

```
（1）通配符选择器（*）
（2）id选择器（#myid）
（3）类选择器（.myclassname）
（4）标签选择器（div,h1,p）
（5）后代选择器（h1 p）
（6）子代选择器（ul>li）
（7）相邻兄弟选择器（li+a）
（8）相邻兄弟选择器（li+a）
（9）属性选择器（a[rel="external"]）
（10）伪类选择器（a:hover,li:nth-child）
（11）伪元素选择器（::before、::after）
```

#### ::before 和:after 中双冒号和单冒号有什么区别？解释一下这 2 个伪元素的作用。

相关知识点：

```
单冒号（:）用于CSS3伪类，双冒号（::）用于CSS3伪元素。（伪元素由双冒号和伪元素名称组成）
双冒号是在当前规范中引入的，用于区分伪类和伪元素。不过浏览器需要同时支持旧的已经存在的伪元素写法，
比如:first-line、:first-letter、:before、:after等，
而新的在CSS3中引入的伪元素则不允许再支持旧的单冒号的写法。

想让插入的内容出现在其它内容前，使用::before，否者，使用::after；
在代码顺序上，::after生成的内容也比::before生成的内容靠后。
如果按堆栈视角，::after生成的内容会在::before生成的内容之上。
```

回答：

```
在css3中使用单冒号来表示伪类，用双冒号来表示伪元素。但是为了兼容已有的伪元素的写法，在一些浏览器中也可以使用单冒号来表示伪元素。

伪类一般匹配的是元素的一些特殊状态，如hover、link等，而伪元素一般匹配的特殊的位置

这 2 个伪元素的作用：用于创建一些不在文档树中的元素，并为其添加样式，。
想让插入的内容出现在其它内容前，使用::before，否者，使用::after。
```

#### 伪类与伪元素的区别

```
css引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分，比如，一句话中的第一个字母，或者是列表中的第一个元素。

伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover来描述这个元素的状态。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过::before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

有时你会发现伪元素使用了两个冒号（::）而不是一个冒号（:）。这是CSS3的一部分，并尝试区分伪类和伪元素。大多数浏览器都支持这两个值。按照规则应该使用（::）而不是（:），从而区分伪类和伪元素。但是，由于在旧版本的W3C规范并未对此进行特别区分，因此目前绝大多数的浏览器都支持使用这两种方式表示伪元素。
```

#### 说一说常用的伪类与伪元素

常用的伪类有：

1.状态伪类

- ：link 选择未访问的链接
- ：visited 选择已访问的链接
- ：hover 焦点悬停时
- ：active 选择活动的链接
- ：focus 选择获取焦点的输入字段

2.结构化伪类

- :first-child 匹配元素的第一个子元素。

如下例，第一个<li> 元素的文本会变为橙色。

```html
<ul>
    <li>这里的文本是橙色的</li>
    <li>一些文本</li>
    <li>一些文本</li>
</ul>
```

```css
li:first-child {
    color: orange;
}
```

- : last-child 匹配元素的最后一个子元素。
- :nth-child 根据元素的位置匹配一个或者多个元素，它接受一个 an+b 形式的参数
  - 1n+0，或 n，匹配每一个子元素。
  - 2n+0，或 2n，匹配位置为 2、4、6、8… 的子元素，该表达式与关键字 even 等价。
  - 2n+1 匹配位置为 1、3、5、7… 的子元素、该表达式与关键字 odd 等价。
  - 3n+4 匹配位置为 4、7、10、13… 的子元素。



常见的伪元素：

**1 ::before/:before**

:before 在被选元素前插入内容。需要使用 content 属性来指定要插入的内容。被插入的内容实际上不在文档树中。

**2 ::after/:after**

:after 在被元素后插入内容，其用法和特性与:before 相似。

**3 ::first-letter/:first-letter**

:first-letter 匹配元素中文本的首字母。被修饰的首字母不在文档树中。

**4 ::first-line/:first-line**

:first-line 匹配元素中第一行的文本。这个伪元素只能用在块元素中，不能用在内联元素中。