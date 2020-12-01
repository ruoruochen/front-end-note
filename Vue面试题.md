# Vue面试题

###  Vue是什么

vue是一门渐进式的javascript框架。所谓的渐进式就是：从中心的的视图层渲染开始向外扩散的构建工具层。这过程会经历：视图层渲染->组件机制->路由机制->状态管理->构建工具；五个层级。

它的特点：易用，灵活，高效，入门门槛低。



### 什么是MVVM模型

MVVM是Model-View-ViewModel的缩写。Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。



### v-if和v-show的区别

`v-if`与`v-show`都可以根据值动态控制`DOM`元素显示隐藏

v-if 是直接添加或者删除dom节点。

v-show 无论如何元素总被渲染，使用display切换显示和隐藏。

总的来说：
（1）v-if有较高切换开销、v-show更高的初始渲染开销。
（2）频繁切换用v-show；变化很少用v-if



### Vue生命周期

Vue 实例从创建到销毁的过程为生命周期。从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，称之为 Vue 的生命周期。



### 计算属性computed与方法的对比



### 计算属性computed与监听属性watch的对比