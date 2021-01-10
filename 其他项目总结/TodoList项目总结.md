# TodoList项目总结

### 主要功能：

- 增加Todo项

- 删除Todo项

- 修改Todo项

- 筛选Todo项

- 清除已完成项

- 使用localStorage存储

- 支持回车修改、添加Todo项

### 项目设计图

![image-20210101101825583](img/image-20210101101825583.png)

### 项目结构：

```
├── node_modules/        # 依赖包，通常执行npm i会生成
├── public/              
├── src/                 # 源码目录（开发的项目文件都在此文件中写）
│   ├── assets/          # 放置需要经由 Webpack 处理的静态文件，通常			  |			为样式类文件，如css，sass以及一些外部的js
			  |___images/
│   ├── components/        # 公共组件
			  |
			  |___todoList/
			  			    TodoAdd.vue
			  			    TodoFilter.vue
			  			    TodoItem.vue
			  			    TodoList.vue
│   ├── router/            # 路由，此处配置项目路由
			  index.js
│   ├── store/          # 状态管理
			  index.js
│   ├── views/             # 路由页面组件
			  Home.vue
│   ├── App.vue             # 根组件
│   ├── main.js             # 入口文件
.....后面的不写了
```

### 组件树：

![image-20210101102259490](img/image-20210101102259490.png)

实现效果：

![image-20210101102416995](img/image-20210101102416995.png)

### 主要难点

#### 1、多级嵌套组件通信

##### 1-1 解决思路和理解

以下为解决思路，想直接看解决方法直接找到1-2。

我们来思考一个问题，现在一共有A,B,C三个组件，其嵌套关系如图所示，A与B通信为父子通信，使用prop和$emit即可，那么A跟C如何实现通信呢？

在我们项目中也遇到了这个问题，A为Home.vue，B为TodoList，C为TodoItem，TodoItem的编辑和删除事件触发时要传给Home.vue。

![image-20210101103413576](img/image-20210101103413576.png)

现在有几个解决方案：

1. 使用Vuex管理状态。当项目多个组件共享状态比较少，全局状态比较少时，这并没有发挥Vuex强大的威力。
2. B作为中转站。A组件prop给B，B在prop给C。$emit同理。但如果组件过多，就会导致代码繁琐，维护困难。

​        以上两种方案都无法解决，故我们使用Vue2.4新引入的东西：$attr和$listener，且新增了**inheritAttrs** 选项。 在版本2.4以前，默认情况下父作用域的不被认作props的属性属性百年孤独，将会“回退”且作为普通的HTML特性应用在子组件的根元素上。

例子如下：

父组件：

```html
<template>
   <div>
     <child-dom
      :foo="foo"
      :coo="foo"
     >
     </child-dom>
   </div>
</template>
<script>
   import childDom from "./ChildDom.vue";
   export default {
     data() {
        return {
          foo:"Hello, world",
          coo:"Hello,rui"
        }
     },
     components:{childDom},
   }
</script>
```

子组件：

```html
<template>
   <div>
      <p>foo:{{foo}}</p>
   </div>
</template>
<script>
export default {
 name:'child-dom'
 props:["foo"]
}
</script>
```

当显示父组件时，查看Dom结构，结构如下，coo跑到了子组件的根元素上！

![image-20210101104604041](img/image-20210101104604041.png)



我们再来尝试！使用inheritAttrs、$attrs、$listener。

在2.4中新增选项**inheritAttrs** inheritAttrs的默认值为true, 将inheritAttrs的值设为**false**, 这些默认的行为会禁止掉。但是通过实例属性**$attrs** ,可以将这些特性生效，且可以通过**v-bind** 绑定到子组件的非根元素上。

修改子组件代码如下：

```html
<template>
   <div>
      <p>foo:{{foo}}</p>
      <childDomChild v-bind="$attrs"></childDomChild>
   </div>
</template>
<script>
import childDomChild from './childDomChild';
export default {
 name:'child-dom'
 props:["foo"],
 inheritAttrs:false,
}
</script>
```

新增子组件 childDomChild

```html
<template>
  <div>
   <p>coo:{{coo}}</p>
  </div>
</template>
<script>
  export default {
    name:'childDomChild'
    props:["coo"],
    inheritAttrs:false
  }
</script>
```

输出结果如下：

![image-20210101104833058](img/image-20210101104833058.png)

**prop成功从A组件传到C组件啦！**



我们再继续探索 **C组件的信息怎么同步给A组件**呢？

vue2.4版本新增了$listeners 属性，我们在b组件上 绑定 v-on=”$listeners”, 在a组件中，监听c组件触发的事件。就能把c组件发出的数据，传递给a组件。



A组件代码：

```html
<template>
 <div>
   <child-dom
    :foo="foo"
    :coo="coo"
     v-on:upRocket="reciveRocket"
   >
   </child-dom>
 </div>
</template>
<script>
 import childDom from "@/components/ChildDom.vue";
 export default {
   name:'demoNo',
   data() {
     return {
       foo:"Hello, world",
        coo:"Hello,rui"
    }
  },
 components:{childDom},
 methods:{
   reciveRocket(){
      console.log("reciveRocket success")
   }
 }
}
</script>
```

B组件更新：

```html
<template>
 <div>
 <p>foo:{{foo}}</p>
 <p>attrs:{{$attrs}}</p>
 <childDomChild v-bind="$attrs" v-on="$listeners"></childDomChild>
 </div>
</template>
<script>
import childDomChild from './childDomChild';
export default {
 name:'child-dom'
 props:["foo"],
 inheritAttrs:false,
}
</script>
```

C组件：

```html
<template> 
 <div>
 <p>coo:{{coo}}</p>
 <button @click="startUpRocket">我要发射火箭</button>
 </div>
</template>
<script>
 export default {
 name:'childDomChild',
 props:['coo'],
 methods:{
 startUpRocket(){
 this.$emit("upRocket");
 console.log("startUpRocket")
 }
 }
 }
</script>
```

运行：**A组件成功监听C组件！！！**

![image-20210101105333478](img/image-20210101105333478.png)

以上就是了**$attrs**,**$listerners**，**inheritAttrs** 的作用！我们可以套用至项目中。



##### 1-2 解决方法

以A组件监听C的deleteItem为例，其他时间是一样的。

**旧的方案，即采取B为中转站的方法，代码繁琐，可直接跳过**

//Home.vue 设为A

```html
      <TodoList
        :todolist="todolistFilter"
        @deleteitem="deleteItem"
        @edititem="editItem"
        @changetext="changetext"
        @checkchange="checkchange"
      />
```

```js
deleteItem(id) {
    for (var i = 0; i < this.todolist.length; i++) {
        if (this.todolist[i].id == id) {
            this.todolist.splice(i, 1);
        }
    }
},
```

//TodoList.vue 设为B

```html
<TodoItem
      v-for="item in todolist"
      :key="item.id"
      :item="item"
      @deleteitem="$emit('deleteitem',item.id)"
      @edititem="$emit('edititem',item.id)"
      @changetext="$emit('changetext',item.id)"
      @checkchange="$emit('checkchange',item.id)"
    />
```

//TodoItem.vue 设为C

```html
<div class="todo-item">
    <input type="checkbox" class="todo-check" @change="checkchange" :checked="isChecked" />
    <span class="todo-text">{{item.text}}</span>
    <input type="text" value class="input-text" @keydown="changetext" />
    <i class="edit" @click="editItem"></i>
    <i class="delete" @click="deleteItem"></i>
  </div>
```

```js
deleteItem() {
    this.$emit("deleteitem");
}
```

以deletItem方法为例

数据传递：A->B->C

事件传递：C->B->A



**使用attrs和listener**

//Home.vue 设为A

```html
      <TodoList
        :todolist="todolistFilter"
        @deleteitem="deleteItem"
        @edititem="editItem"
        @changetext="changetext"
        @checkchange="checkchange"
      />
```

```js
 //删除Todo
    deleteItem(id) {
      this.todolist.splice(this.todolist.findIndex(item => item.id === id), 1);
      this.saveData(this.todolist);
    },
```

//TodoList.vue 设为B

```html
<div class="todo-list">
    <TodoItem v-for="item in todolist" :key="item.id" :item="item" v-on="$listeners" />
  </div>
```

//TodoItem.vue 设为C

```html
  <div class="todo-item">
    <input type="checkbox" class="todo-check" @change="checkchange" :checked="isChecked" />
    <span class="todo-text">{{item.text}}</span>
    <input type="text" value class="input-text" @keydown="changetext" />
    <i class="edit" @click="editItem"></i>
    <i class="delete" @click="deleteItem"></i>
  </div>
```

```js
    deleteItem() {
      this.$emit("deleteitem", this.item.id);
    },
```

**TodoList代码简洁，直接使用v-on=“$listeners”**



#### 2、根据id对某条记录进行操作。

以deletItem方法为例

已知id，对某条Todo记录操作：

以deleteItem为例

**原写法：繁琐，效率不高**

```js
//删除Todo
deleteItem(id) {
    console.log("deleteItem");
    for (var i = 0; i < this.todolist.length; i++) {
        if (this.todolist[i].id == id) {
            this.todolist.splice(i, 1);
        }
    }
}
```

**改进：使用findIndex方法**

```js
deleteItem(id) {
    console.log("deleteItem");
    this.todolist.splice(
        this.todolist.findIndex(item => item.id === id),1);
}
```



#### 3、使用本地存储

```js
    // 获取本地存储数据
    // 将任务存入本地存储
    // 保存数据
    // 赋值给todolist
    // 保存本地数据
methods:{
    saveData(data) {
      localStorage.setItem("todolist", JSON.stringify(data));
    },
    //获取本地数据
    getData() {
      let data = localStorage.getItem("todolist");
      if (data != null) {
        return JSON.parse(data);
      } else {
        return [];
      }
    }
  }
```

使用封装的思想，在增删改的方法中调用saveData和getData方法即可。



### 总结

虽然这回只做了很小的一个Todolist，但复习了Vue的很多内容，也让自己发现了自己的不足。总之继续加油！打工人！