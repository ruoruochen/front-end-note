# Vue前言

## 一、Vue的初步认识

#### 1.1 什么是Vue

​	Vue 是一套用于构建用户界面的**渐进式框架**。

#### 1.2 Vue的特点

解耦视图和数据
可复用的组件
前端路由技术
状态管理
虚拟DOM

#### 1.3 Vue的使用体验

#### 1.4 什么是MVVM模型

#### 1.5 Vue 的生命周期



## 二、Vue基本语法

#### 2.1 Vue基础概念

**获取Vue的属性和方法**

**attribute和property的区别**

**什么是真值truthy**



#### 2.2 插值操作

**Mustache**

**指令**

- 什么是指令
- 插值操作指令的类型
- 插值操作指令的参数
- 插值操作指令的修饰符



#### 2.3 绑定属性v-bind

##### 2.3.1 绑定基本属性

href disable...

##### 2.3.2 绑定class

- 对象

- 数组

- 对象数组复合

- 组件上绑定

  

##### 2.3.3 绑定style

- 对象
- 数组
- 绑定多重值 数组对象



#### 2.4  计算属性

**computed**

**计算属性缓存与方法的对比**

**计算属性computed与监听属性watch的对比**

**计算属性的getter setter**





#### 2.5 条件与循环

##### 2.5.1 条件

**v-if**

- v-if的使用
  - 单独使用
  - 配合v-else
  - 配合v-else-if
  - 在template上使用，分组渲染
  - 在组件上使用
  - 使用key管理可复用元素

**v-show**

- v-show的使用

  - 单独使用

  - 在组件上使用

    局限性：
  
    - 不能用在template上
    - 不支持v-else



- v-if 和 v-show的区别
- v-if不要和v-for放在一个元素上
  - 原因
  - 场景
    - 过滤一个列表中的项目
    - 避免渲染隐藏列表



##### 2.5.2 循环（列表渲染）

**v-for的使用**

- 基于数组渲染
- 基于对象渲染
- 在template中使用
- 在组件上使用



**数组更新检测**

- 改变原始数组

  push pop inshift shift splice sort reverse

- 产生新数组

  filter concat slice



**使用key管理复用 建议v-for均使用key**

**显示过滤/排序后的项**

- 计算属性
- 计算属性不适用（嵌套for）,使用方法



> 使用v-for v-bind v-on v-modal实现建议TODO
>
> ​	父子通信
>
> - 子组件内使用$emit('方法名')抛出事件，父组件v-on:方法名="处理"接收事件



#### 2.6 事件处理

**v-on的事件参数**

- 无参
  - 若函数需要一个参，自动传event
- 一个参
- 一个参 加event，用$event传。



**v-on的修饰符**

- stop
- prevent
- capture
- self
- once



#### 2.7 表单输入处理

**v-model的使用**

- 文本

- 多行文本

- 单个复选框

- 多选复选框

- 单选按钮

- 单选select下拉

- 多选select

- v-for动态渲染select

  

>单个绑定布尔值，单选绑定字符串，多选绑定数组。

**值绑定，即绑定指定value**

- 字符常量
- vue数据
- 对象字面量

**v-model修饰符**

- .lazy
- .number
- .trim



## 三、组件

#### 3.1 组件的使用

##### 注册组件的方式

- 全局注册
- 局部注册
- 两者的区别

>组件的data必须为一个函数

##### 组件命名规则

字母全小写，包含一个连字符。

##### 组件必须只有一个根元素

##### 父子通信

- 父传子：props

  - 基本使用：

    1. 在父组件上绑定一些attribute。 v-bind:xxx="..."
    2. 在子组件中注册自定义attribute props:['xxx','yyy'....]，此时就变成了子组件的property
    3. 在子组件中访问这些数据

  - Prop

    1. Prop大小写

       HTML attribute使用kebab-case命名，JS使用camelCase命名。

       ```
       组件内：props: ['postTitle'],
       HTML:<blog-post post-title="hello!"></blog-post>
       ```

    2. Prop单向数据流

       - 父流向子

       - 子视图改变prop
         - 将prop作为本地数据使用；建议：保存为本地data
         - prop传入需转化;建议：使用计算属性

    3. Prop类型

       为给prop指定值类型，可采用以对象形式列出prop

       ```
        props: {
               title: String,
               isPublished: Boolean
             }
       ```

    4. Prop验证

       为组件prop指定验证要求，一个未满足则Vue会在浏览器控制台警告。

       - 6种Prop验证
       - 9种类型type检查

    5. 非prop的attribute

- 子传父：使用自定义事件监听子组件的事件

  使用：

  1. 父组件使用v-on:xxx="..."设置监听子组件的任意事件。
  2. 子组件调用$emit('xxx',[抛出值])。
  3. 父组件使用$event访问抛出值，并对事件进行处理。若事件处理函数为方法，抛出值作为第一个参数传入方法中。

##### v-bind:is

##### 自定义事件

###### 事件命名 

推荐：以kebab-case给事件名命名。

###### 使用.sync修饰符



##### 插槽

插槽内可以包含任何模板代码，包括 HTML、其他组件

###### 编译作用域

###### 后备（默认）内容

###### 2种插槽

**具名插槽**

**作用域插槽**



###### 动态插槽名







