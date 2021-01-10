## webpack面试题

### 1、webpack与grunt、gulp的不同？

三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。

grunt和gulp基于任务和流（Task、Stream），强调的是前端流程的自动化。比如定义一系列的task让grunt或gulp来依次执行，让整个流程自动化，grunt和gulp也被称作前端自动化任务管理工具。

而webpack（静态模块打包工具）基于入口，强调的是前端模块化开发管理。它是把一个项目当做一个整体，通过一个给定的入口，Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders、plugins进行一些处理，最后打包为一个（或多个）浏览器可识别的Javascript文件。

### 2、与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？

同样是基于入口的打包工具除了webpack，还有以下几个主流的：

- rollup
- parcel

**从应用场景上来看：**

- webpack适用于大型复杂的前端站点构建
- rollup适用于基础库的打包，如vue、react
- parcel适用于简单的实验性项目，他可以满足低门槛的快速看到效果

> 由于parcel在打包过程中给出的调试信息十分有限，所以一旦打包出错难以调试，所以不建议复杂的项目使用parcel



### 3、有哪些常见的Loader？他们是解决什么问题的？

css-loader，它是负责加载 CSS，并支持模块化、压缩、文件导入等特性

style-loader，把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。

less-loader，处理less文件

url-loader，进行图片文件的处理，当图片文件小于设定的limit时，会将图片编译成base64字符串形式，图片大于Limit,需要安装file-loader。

file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件

babel-loader：把 ES6的语法 转换成 ES5的语法。

### 4、有哪些常见的 Plugin ？他们能解决什么问题？

- define-plugin：通过DefinePlugin可以定义一些全局的变量，我们可以在模块当中直接使用这些变量，无需作任何声明。
- commons-chunk-plugin：提取公共代码
- html-webpack-plugin
- uglifyjs-webpack-plugin：通过`UglifyES`压缩`ES6`代码
- 

### 5、Loader 和 Plugin 的不同

**不同的作用**

- **Loader**译为"加载器"，专注于转化文件。Webpack将一切文件视为模块，但是原生webpack是只能解析js文件，要想打包其他类型的文件，就会用到`loader`。 所以Loader的作用是让webpack拥有了加载和解析*非JavaScript文件*的能力，
- **Plugin**译为"插件"，专注于对webpack功能的扩展。Plugin通过扩展webpack的功能，让webpack具有更多的灵活性，比如可以打包优化和压缩，重新定义环境变量等等。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

**不同的用法**

- **Loader**在`module.rules`中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个`Object`，里面描述了对于什么类型的文件（`test`），使用什么加载(`loader`)和使用的参数（`options`）等。
- **Plugin**在`plugins`中单独配置。 类型为数组，每一项是一个`plugin`的实例，参数都通过构造函数传入。

### 6、问什么要进行webpack配置分离，如何实现？

#### 1、为什么要进行配置分离

- development(开发环境) 和 production(生产环境) 这两个环境下的构建目标存在着巨大差异。
  开发环境：需要强大的 source map（源码映射-> debug） 和一个有着 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server（本地服务器）。
  生产环境：关注点在于压缩 bundle、更轻量的 source map、资源优化等，让包更小，浏览器加载更快。

  由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

#### 2、如何进行配置分离

​		在根目录下创建一个build文件夹，分别创建3个配置文件分别用于公共配置，开发配置，生产配置，并安装webpack-merge进行文件合并。