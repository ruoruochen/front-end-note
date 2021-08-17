# vue-cli3进行路径自定义总结(vue-cli3配置踩雷：These dependencies were not found:)

今天弄这个弄了好久，于是想记录下来，方便自己也方便他人。

### vue-cli2

首先vue-cli2要是想要修改自定义路径，需要到build文件夹下面的、base.conf.js文件里面

![image-20210116194732900](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116194732900.png)

修改如下部分代码，在alias中加入新的自定义键值对即可。 

![image-20210116194747986](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116194747986.png)

### vue-cli3

在vuecli3中，推崇零配置，故不再存在build文件夹，所有的配置都需要在一个自己增加的文件vue.config.js中添加。

首先，在项目根目录下添加vue.config.js：**注意！必须是这个名字**

![image-20210116194956811](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116194956811.png)

这个文件应该导出一个包含了选项的对象：

```js
// vue.config.js
module.exports = {
  // 选项...
}
```

随后在vue.config.js中进行配置，导入path、resolve方法，最后在导出对象中配置别名。**set前面的参数要有@**     别问我为什么，问为什么我也不知道！搞了半天居然是这个的原因我气死了！

![image-20210116203515129](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116203515129.png)

如果不加**@**会报错：![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/0A61BC01.png)

```
ERROR  Failed to compile with 2 errors                                                           
These dependencies were not found:
```



![image-20210116203819332](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116203819332.png)



vue.config.js文件配置可以具体参考：https://cli.vuejs.org/zh/config/#vue-config-js

使用：

![image-20210116204219491](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116204219491.png)