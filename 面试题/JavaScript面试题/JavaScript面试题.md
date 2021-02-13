#### 介绍 JavaScript的数据类型。

```
1.有两种
2.分两种展开说
```

**JavaScript的数据类型分为俩种，一种是基本数据类型，一种是引用数据类型**

1.基本数据类型

js 一共有六种基本数据类型，分别是 Undefined、Null、Boolean、Number、String，还有在 ES6 中新增的 Symbol 类型。
Symbol 代表创建后独一无二且不可变的数据类型，它的出现我认为主要是为了解决可能出现的全局变量冲突的问题。

2.引用数据类型

引用数据类型统称为 Object 对象，主要包括对象、数组、函数、日期和正则等等。

#### JavaScript 有几种类型的值？你能画一下他们的内存图吗？

涉及知识点：

- 栈：原始数据类型（Undefined、Null、Boolean、Number、String）
- 堆：引用数据类型（对象、数组和函数）

```
两种类型的区别是：存储位置不同。
原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。

引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。
```

回答：

JavaScript的数据类型分为俩种，一种是基本数据类型，一种是引用数据类型

基本数据类型....

引用数据类型....（参考1）

两种类型间的主要区别是它们的存储位置不同，基本数据类型的值直接保存在栈中，而引用数据类型的值保存在堆中，通过使用在栈中保存的指针来获取堆中的值。

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/20161007143531197)

详细资料可以参考： [《JavaScript 有几种类型的值？》](https://blog.csdn.net/lxcao/article/details/52749421) [《JavaScript 有几种类型的值？能否画一下它们的内存图；》](https://blog.csdn.net/jiangjuanjaun/article/details/80327342)

#### 什么是堆？什么是栈？它们之间有什么区别和联系？

堆和栈的概念存在于数据结构和操作系统内存中。

**在数据结构中**，栈中数据的存取方式为先进后出。而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。

**在操作系统中**，内存被分为栈区和堆区。栈区一般储存基础数据类型，堆区一般储存引用数据类型

**栈区(stack)：**由操作系统自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。

**堆区(heap)：**一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。

```
堆和栈的区别可以用如下的比喻来看出： 
使用栈就象我们去饭馆里吃饭，只管点菜（发出申请）、付钱、和吃（使用），吃饱了就走，不必理会切菜、洗菜等准备工作和洗碗、刷锅等扫尾工作，他的好处是快捷，但是自由度小。 
使用堆就象是自己动手做喜欢吃的菜肴，比较麻烦，但是比较符合自己的口味，而且自由度大。 
```

详细资料可以参考： [《什么是堆？什么是栈？他们之间有什么区别和联系？》](https://www.zhihu.com/question/19729973)

#### 内部属性 [[Class]] 是什么？

所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 [[Class]]，我们可以把它看作一个内部的分类，而非传统的面向对象意义上的类。这个属性无法直接访问，一般通过 Object.prototype.toString(..) 来查看。

```
所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 [[Class]]（我们可以把它看作一个内部的分类，而非传统的面向对象意义上的类）。这个属性无法直接访问，一般通过 Object.prototype.toString(..) 来查看。例如：

Object.prototype.toString.call( [1,2,3] );
// "[object Array]"

Object.prototype.toString.call( /regex-literal/i );
// "[object RegExp]"

// 我们自己创建的类就不会有这份特殊待遇，因为 toString() 找不到 toStringTag 属性时只好返回默认的 Object 标签
// 默认情况类的[[Class]]返回[object Object]
class Class1 {}
Object.prototype.toString.call(new Class1()); // "[object Object]"

// 需要定制[[Class]]
class Class2 {
  get [Symbol.toStringTag]() {
    return "Class2";
  }
}
Object.prototype.toString.call(new Class2()); // "[object Class2]"
```

#### 介绍 js 有哪些内置对象？

回答：

js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。一般我们常用到的如全局变量值 NaN、undefined，全局函数如 parseInt()、parseFloat() ，用来实例化对象的构造函数如 Date、Object 等，还有提供数学计算的内置对象如 Math 对象。

相关资料：

```
全局的对象（ global objects ）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是说在全局作用域里的对象。全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。

标准内置对象的分类

（1）值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。

例如 Infinity、NaN、undefined、null 字面量

（2）函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

例如 eval()、parseFloat()、parseInt() 等

（3）基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

例如 Object、Function、Boolean、Symbol、Error 等

（4）数字和日期对象，用来表示数字、日期和执行数学计算的对象。

例如 Number、Math、Date

（5）字符串，用来表示和操作字符串的对象。

例如 String、RegExp

（6）可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。例如 Array

（7）使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。

例如 Map、Set、WeakMap、WeakSet

（8）矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。

例如 SIMD 等

（9）结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。

例如 JSON 等

（10）控制抽象对象

例如 Promise、Generator 等

（11）反射

例如 Reflect、Proxy

（12）国际化，为了支持多语言处理而加入 ECMAScript 的对象。

例如 Intl、Intl.Collator 等

（13）WebAssembly

（14）其他

例如 arguments
```

#### undefined 与 undeclared 的区别？

 undefined是已在作用域中声明但还没有赋值的变量。相反， undeclared 是还没有在作用域中声明过的变量。

**对于 undeclared 变量的引用**，浏览器会报引用错误。但是我们可以使用 typeof 的安全防范机制来避免报错，因为对于 undeclared 变量，typeof 会返回 "undefined"。

#### null 和 undefined 的区别？

```
1.都是基本数据类型，单值。
2.含义，使用场景
3.使用注意事项
	undefined不是保留字，如何处理这种情况。
	typeof null特殊
	== ===
```

首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。

undefined 代表的含义是未定义，null 代表的含义是空对象。一般变量声明了但还没有定义的时候会返回 undefined，null主要用于赋值给一些可能会返回对象的变量，作为初始化。

undefined 在 js 中不是一个保留字，这意味着我们可以使用 undefined 来作为一个变量名，这样的做法是非常危险的，它会影响我们对 undefined 值的判断。但是我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。因为使用void对后面的表达式求值，无论结果是多少，都会返回原始值undefined。

当我们对两种类型使用 typeof 进行判断的时候，Null 类型化会返回 “object”，这是一个历史遗留的问题。

当我们使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。

#### 如何获取安全的 undefined 值？

因为 undefined 是一个标识符，在 js 中不是一个保留字，所以可以被当作变量来使用和赋值，但是这样会影响 undefined 的正常判断。

我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。因为使用void对后面的表达式求值，无论结果是多少，都会返回原始值undefined。

#### 说几条写 JavaScript 的基本规范？

在项目开发中，我们遵守一些这样的基本规范，比如说：

（1）一个函数作用域中所有的变量声明应该尽量提到函数首部，声明时如果变量没有值，应该给该变量赋值对应类型的初始值，便于他人阅读代码时，能够知道变量对应的类型值。

（2）代码中出现地址、时间等字符串时需要使用常量代替。

（3）在进行比较的时候吧，尽量使用

 ```
'===', '!=='代替'==', '!='。
 ```

（4）不要在内置对象的原型上添加方法，如 Array, Date。

（5）switch 语句必须带有 default 分支。

（6）for 循环、if 语句必须使用大括号。

**A**

#### 介绍一下JavaScript 原型、原型链？原型链有什么特点？

```
构造函数原型 prototype
对象原型 __ proto __
```

```
回答思路：
1.构造函数原型
2.对象原型
3.原型链
4.原型链的特点
```

在 js 中我们是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性，指向另一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。

当我们使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，这个指针称为对象的原型。一般来说我们是不应该能够获取到这个值的，但是现在浏览器中都实现了 __proto__ 属性来让我们访问这个属性，但是我们最好不要使用这个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf() 方法，我们可以通过这个方法来获取对象的原型。

当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype

![image-20200630114115388](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20200630112211059.png)

原型链的特点：
原型链实现了继承。JavaScript 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。

####  js 获取原型的方法？

假设p为新建对象

```
- p.__proto__
- p.constructor.prototype
- Object.getPrototypeOf(p)
```

#### 在 js 中不同进制数字的表示方式

- 以 0X、0x 开头的表示为十六进制。
- 以 0、0O、0o 开头的表示为八进制。
- 以 0B、0b 开头的表示为二进制格式。

#### typeof NaN 的结果是什么？

NaN 意指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。

typeof NaN; // "number"

NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN != NaN为 true。

#### Array 构造函数只有一个参数值时的表现？

Array 构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度（length），而非只充当数组中的一个元素。这样创建出来的只是一个空数组，只不过它的 length 属性被设置成了指定的值。

构造函数 Array(..) 不要求必须带 new 关键字。不带时，它会被自动补上。

#### 说一说其他值到字符串的转换规则？

ToString ，它负责处理非字符串到字符串的强制类型转换。

（1）Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
（2）Boolean 类型，true 转换为 "true"，false 转换为 "false"。
（3）Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
（4）Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。
（5）对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

#### 其他值到布尔类型的值的转换规则？

ToBoolean，它负责处理其他值到布尔类型的强制类型转换。

以下这些是假值：
• undefined
• null
• false
• +0、-0 和 NaN
• ""

假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。

#### 其他值到数字值的转换规则？

```
有时我们需要将非数字值当作数字来使用，比如数学运算。我们可以使用Number进行转换

（1）Undefined 类型的值转换为 NaN。

（2）Null 类型的值转换为 0。

（3）Boolean 类型的值，true 转换为 1，false 转换为 0。

（4）String 类型的值转换，如果包含非数字值则转换为 NaN，空字符串为 0，全为数字直接转换。

（5）Symbol 类型的值不能转换为数字，会报错。

（6）对象/数组变为数字：先调取Symbol.toPrimitive 获取原始值，没有再通过valueOf获得原始值；如果没有原始值，再调取toString变为字符串，最后把字符串转为数字。
```

#### {} 和 [] 的 valueOf 和 toString 的结果是什么？

```
{} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"

[] 的 valueOf 结果为 [] ，toString 的结果为 ""
```

