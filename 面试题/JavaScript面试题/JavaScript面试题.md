#### 且lean、Number、String，还有在 ES6 中新增的 Symbol 类型。

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

**原型链**

JS的原型链是指原型与原型层层相连接的过程即为原型链。当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype，然后Object.prototype.__proto _ _为null。

![image-20200630114115388](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20200630112211059.png)

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

typeof NaN; // "number"

NaN 意指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况。

NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN != NaN为 true。

#### Array 构造函数只有一个参数值时的表现？

Array 构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度（length），而非只充当数组中的一个元素。这样创建出来的只是一个空数组，只不过它的 length 属性被设置成了指定的值。

构造函数 Array(..) 不要求必须带 new 关键字。不带时，它会被自动补上。

#### 说一说其他值到字符串的转换规则？

（1）Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
（2）Boolean 类型，true 转换为 "true"，false 转换为 "false"。
（3）Number 类型的值直接转换，**不过那些极小和极大的数字会使用指数形式。**
（4）Symbol 类型的值直接转换，但是**只允许显式**强制类型转换，使用**隐式**强制类型转换会产生**错误**。
（5）对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

#### 其他值到布尔类型的值的转换规则？

利用Boolean对象进行转换

以下这些是假值：
• undefined
• null
• false
• 0和 NaN
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

```
相等操作符==比较规则
x和y为String，Number，Boolean并且类型不一致，都转为Number再进行比较
1.如果有个操作数是布尔值，则在比较相等性之前，先将其转为数值，false->0,true->1
2.如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前，先将字符串转为数值
3.如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，用得到的基本类型值按照前面的规则进行比较
4.null和undefined是相等的，且在比较之前不能将其转换为其他任何值
5.如果一个操作数是NaN,则相等操作符返回false，注意NaN不等于NaN
6.如果两个操作数都是对象，则比较它们是不是同一对象，如果两个操作数都指向同一个对象，则相等操作符返回true，否则返回false
```

**注意：！！！**

```
null > 0   // null 尝试转型为number , 则为0 . 所以结果为 false, 
null >= 0  // null 尝试转为number ,则为0 , 结果为 true. 
null == 0  // null在设计上，在此处不尝试转型. 所以 结果为false. 
```

#### {} 和 [] 的 valueOf 和 toString 的结果是什么？

```
{} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"

[] 的 valueOf 结果为 [] ，toString 的结果为 ""
```

**B**

#### JavaScript 什么是闭包?

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。
闭包有两个常用的用途。

1.使我们在函数外部能够访问到函数内部的变量。

2.使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

闭包有很多好处，但是物极必反，如果我们滥用闭包，函数中的变量都被保存在内存中，内存消耗很大，造成网页的性能问题，且容易造成内存泄漏。解决方法是在退出函数之前，将不使用的局部变量全部删除

```js
function closure(){
    // div用完之后一直存在内存中，无法被回收
    var div = document.getElementById('div');
    div.onclick = function () {
       console.log(div.innerHTML);// 这里用oDiv导致内存泄露
    };
}

// 解除引用避免内存泄露
function closure(){    
    var div = document.getElementById('div');    
    var test = div.innerHTML;
    div.onclick = function () {
        console.log(test);
    };
    div = null;
}

```

#### 闭包的应用

- 构造函数的私有属性
- 函数节流、防抖

**私有属性**

由于javascript中天然没有类的实现，某些不希望被外部修改的`私有属性`可以通过闭包的方式实现。

```js
function Person(param) {
    var name = param.name; // 私有属性
    this.age = 18; // 共有属性

    this.sayName = function () {
        console.log(name);
    }
}

const tom = new Person({name: 'tom'});
tom.age += 1; // 共有属性，外部可以更改
tom.sayName(); // tom
tom.name = 'jerry';// 共有属性，外部不可更改
tom.sayName(); // tom

```

**函数节流**

节流是指在一段时间内只允许函数执行一次。我们可以使用定时器实现节流。

应用场景如：输入框的联想，可以限定用户在输入时，只在每两秒钟响应一次联想。

```js
// 节流
var throttle = function(func, delay){
    var timer = null;

    return function(){
        var context = this;
        var args = arguments;
        if(!timer){
            timer = setTimeout(function(){
                func.apply(context, args);
                timer = null;
            },delay);
        }
    }
```

**防抖**

防抖的作用是在短时间内多次触发同一个函数，只执行最后一次，或者只在开始时执行。

以用户拖拽改变窗口大小，触发 `resize` 事件为例，在这过程中窗口的大小一直在改变，所以如果我们在 `resize` 事件中绑定函数，这个函数将会一直触发，而这种情况大多数情况下是无意义的，还会造成资源的大量浪费。

```js
// 防抖
function debounce(fn, delay){
    // 维护一个 timer
    let timer = null;
    
    return function() {
        // 获取函数的作用域和变量
        let context = this;
        let args = arguments;
        
        clearTimeout(timer);// 清除重新计时
        timer = setTimeout(function(){
            fn.apply(context, args);
        }, delay)
    }
}
```



#### Symbol类型是做什么的？

`Symbol` 是 `ES6` 新推出的一种基本类型，它表示独一无二的值。它最大的用途就是用来定义对象唯一的属性名。

#### 如何定义对象唯一的属性名。

由于 Symbol 值是独一无二的值，所以我们可以把它作为对象的属性名，就能保证不会出现同名的属性，还能防止某一个属性被不小心覆盖。

通过Symbol()方法可以生成一个symbol，里面可以带参数，也可以不带参数

```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

```
Symbol 类型的注意点
 
- 1.Symbol 函数前不能使用 new 命令，否则会报错。
- 2.Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
- Symbol值不能与其他类型值运算，不能转数值；可以转字符串和布尔值
- 不能用.运算符，要用方括号
- `Symbol名.description`，直接返回 Symbol 的描述。
- 3.Symbol 作为属性名时，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys() 返回。
- 4.Object.getOwnPropertySymbols 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
- 5.Symbol.for 接受一个字符串作为参数，首先在全局中搜索有没有以该参数为名称的Symbol值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
- 6.Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key。
```

##### Symbol和Symbol.for的区别

`Symbol.for()`与`Symbol()`这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()`不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的`key`是否已经存在，如果不存在才会新建一个值。比如，如果你调用`Symbol.for("1")`30 次，每次都会返回同一个 Symbol 值，但是调用`Symbol("1")`30 次，会返回 30 个不同的 Symbol 值。

#### 列举ES6的新特性并说一下如何使用

##### 1.const 与 let以及var以及块级作用域

具体如何使用

三者使用的区别

- 变量提升：var声明会被变量提升到函数顶部，let和const声明不会提升。

- 作用域：var是函数作用域；let和const是块级作用域, 在{}里就形成了一个作用域


```
块级作用域,也就是在{}内部声明的变量只能够在{}内部访问到，在{}外部无法访问到其内部声明的变量，
```

**const是常量**

const声明一个只读的常量，一旦声明，常量的值就不能改变。但const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。

**let和const没有变量提升，会存在暂时性死区**

```
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

比如，存在全局变量`temp`，但是块级作用域内`let`又声明了一个局部变量`temp`，局部变量就绑定这个块级作用域，所以在`let`声明变量前，对`temp`赋值会报错。

##### 2.箭头函数

ES6 中，箭头函数就是函数的一种简写形式，使用括号包裹参数，跟随一个 =>，紧接着是函数体；

具体的使用细节：

箭头函数和普通函数的区别

- 箭头函数不绑定arguments，取而代之用rest参数...代替arguments对象，来访问箭头函数的参数列表。
- 箭头函数没有prototype属性，不能用作构造函数，即不可以使用new 关键字来实例化对象，否则会抛出一个错误。
- 箭头函数没有自己的this，箭头函数的this指向在定义的时候继承自外层第一个普通函数的this。
- 普通函数可以使用call修改this。但箭头函数不能用call、apply修改里面的this

>- new发生了什么

##### 3.Promise（常用）

Promise的出现改变了JS的异步编程，现在基本上异步请求都是使用Promise实现。

Promise的出现主要是为了解决回调地狱的问题。

回调地狱就是多层嵌套的问题。 每种任务的处理结果存在两种可能性（成功或失败），那么需要在每种任务执行结束后分别处理这两种可能性，需要多次异步请求的话，就会显得代码跳跃且乱。

具体的使用的话：

Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。

一个 Promise 实例有三种状态，分别是 pending、fulfilled 和 rejected，分别代表了进行中、成功和失败。实例的状态只能由进行中转变成功或者进行中转失败，并且状态一经改变，就无法再被改变了。

状态的改变是通过 resolve() 和 reject() 函数来实现的，我们可以在异步操作结束后调用这两个函数改变 Promise 实例的状态。

Promise的原型上定义了一个 then 方法， 分别是成功和失败的回调。我们可以使用这个 then 方法可以为两个状态的改变注册回调函数。

这样子我们创建了一个最基本的promise。

>- 实现一下Promise

##### 4.模板字符串

ES6新增了模板字符串，用反引号(``)表示，可以用于定义多行字符串，或者在字符串中嵌入变量。如果要在模板字符串中嵌入变量，需要将变量名写在${}之中。

##### 5.for ... of循环

for ... of是作为ES6新增的遍历方式,允许遍历一个含有iterator接口的数据结构并且返回各项的值。它与for ... in的区别如下：

1. for ... of获取的是迭代器返回的value值,  for ... in 可以获取对象的键名。
2. 对于数组的遍历，for ... in会返回数组中所有可枚举的属性， for ... of只返回数组的下标对应的属性值

##### 6.对象属性/方法简写

- es6允许当对象的属性和值相同时，省略属性名
- es6允许当一个对象的属性的值是一个方法时，可以使用简写的形式。省略了:function

##### 7.Module模块化

import导入，export导出。ES6 Module是静态的，也就是说它是在编译阶段运行，和var以及function一样具有提升效果。

**import()动态加载。**把import作为一个函数可以实现动态加载模块，它返回一个Promise，Promise被resolve时的值为输出的模块。Vue中路由的懒加载的ES6写法就是使用了这个技术,使得在路由切换的时候能够动态的加载组件渲染视图。

>- 什么是模块化开发

```
我对模块的理解是，一个模块是实现一个特定功能的一组方法。在最开始的时候，js 只实现一些简单的功能，所以并没有模块的概念，但随着程序越来越复杂，代码的模块化开发变得越来越重要。
```

##### 8.解构赋值

我对于数组解构原理的理解是，从数组中提取值，按照对应位置，对变量赋值。对象解构原理的理解是，通过键找键，找到了相同的属性名就赋值了。

##### 9.剩余运算符rest/扩展运算符

**扩展运算符**

以数组为例,使用扩展运算符可以"展开"一个数组，可以把这些元素集合放到另外一个数组里面。

**剩余运算符**

消耗3个点后面的数组的所有迭代器，读取后面所有迭代器的value属性，放到右边的数组中。

##### 10.类（Class）

ES6 引入了class（类），让JavaScript的面向对象编程变得更加简单和易于理解。比如说，构造函数、继承、super、this之类的都跟Java、C++很像。

#### 手写一个 Promise/实现一下Promise

简易Promise。

**思路：**

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(fn) {
  // 保存初始化状态,设置self是为了在resolve、reject函数里面使用，	   resolve、reject函数的this是window
  var self = this;
  // 初始化状态
  this.state = PENDING;
  // 用于保存 resolve 或者 rejected 传入的值
  this.value = null;
  // 用于保存 resolve 的回调函数
  this.fulfilledCallbacks = [];
  // 用于保存 reject 的回调函数
  this.rejectedCallbacks = [];

  // 状态转变为 fulfilled 方法
  function resolve(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变，
      if (self.state === PENDING) {
        // 修改状态
        self.state = FULFILLED;

        // 设置传入的值
        self.value = value;

        // 执行回调函数
        self.fulfilledCallbacks.forEach(callback => {
          callback(value);
        });
      }
    }, 0);
  }

  // 状态转变为 rejected 方法
  function reject(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = REJECTED;
        // 设置传入的值
        self.value = value;
        // 执行回调函数
        self.rejectedCallbacks.forEach(callback => {
          callback(value);
        });
      }
    }, 0);
  }

  // 将两个方法传入函数执行
  try {
    //执行Promise
    fn(resolve, reject);
  } catch (e) {
    // 遇到错误时，捕获错误，执行 reject 函数
    reject(e);
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
// 如果是等待状态，则将函数加入对应列表中
  if (this.state === PENDING) {
    this.fulfilledCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }

  // 如果状态已经凝固，则直接执行对应状态的函数

  if (this.state === FULFILLED) {
    onResolved(this.value);
  }

  if (this.state === REJECTED) {
    onRejected(this.value);
  }	 
  // 返回this支持then 方法可以被同一个 promise 调用多次
  return this;
};
```

#### call() 、apply() 和bind()的区别？

apply 、 call 、bind 三者都是用来改变函数的this对象的指向的。

**apply**

apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组提供的参数

**语法：**

```js
fun.apply(thisArg, [argsArray])
```

- thisArg：在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。

- argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。

**call**

其实 apply 和 call 基本类似，他们的区别只是传入的参数不同。

**语法：**

```js
fun.call(thisArg[, arg1[, arg2[, ...]]])
```

所以 apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组。

**bind**、

```
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，它可以接受若干个参数列表。



#### this

在es5中，this 的指向并不是在创建的时候就可以确定的，this 永远指向最后调用它的那个对象。

#### 构造函数的new都做了些什么？

1.  首先创建了一个新的空对象 
2. 再把函数中的this指向该对象；设置原型，将对象的原型设置为函数的 prototype 对象。
3. 让函数的 this 指向这个对象，执行构造函数的代码
4. 最终返回该对象实例。

因为箭头函数既没有prototype，也没有自己的``this``，它的``this``其实是继承了外层执行环境中的``this``，且`this`指向永远不会改变，所以箭头函数不能作为构造函数使用，用new调用时会报错！

#### 介绍各个数据结构的特点

**二叉树**是每个节点最多有两个子树的树结构，通常子树被称作“左子树”和“右子树”。

**栈**是先进后出的结构。

**队列**是先进先出的结构。

**堆**实质上是一个完全二叉树，它的根节点是最大值或最小值。每个的节点元素值不小于其子节点 - 最大堆；每个的节点元素值不大于其子节点 - 最小堆

**链表**是用一组任意存储的单元来存储线性表的数据元素。一个对象存储着本身的值和下一个元素的地址。

#### 二叉树是什么，有几种遍历，分别怎么实现之类的

简单，略

#### JS的事件循环/JS是如何实现异步的？

 JS是单线程的，但又能实现异步的原因在于事件循环和任务队列体系。先说一下几个概念：同步任务、异步任务、任务队列、macrotask、microtask。

同步任务指的是在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。

异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，等待同步任务执行完毕之后，轮询执行异步任务队列中的任务。

macrotask 宏任务，宏任务队列等同于我们常说的任务队列，"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。

microtask 微任务，总是添加到当前任务队列末尾执行。如果在处理microtask期间，如果有新添加的microtasks，也会被添加到队列的末尾并执行。

**事件循环：**
     JS 会创建一个类似于 `while (true)` 的循环，JS顺序执行宏任务，当宏任务的JS堆栈清空之后，执行微任务。微任务清空即为一个宏任务的完成，接着执行另一个宏任务。

**常见的macrotask有：**

- `run <script>（同步的代码执行）`
- `setTimeout`
- `setInterval`
- `setImmediate (Node环境中)`
- `requestAnimationFrame`
- `I/O`
- `UI rendering`

**常见的microtask有：**

- `process.nextTick (Node环境中)`
- `Promise callbacks` 
- `Object.observe (基本上已经废弃)`
- `MutationObserver`
- await后面的后面语句

```
async函数里面await标记之前的语句和 await 后面的语句是同步执行的。
后面的语句是异步的，丢进Micro
```

![image-20201214092953116](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20201214092953116.png)

顺序执行宏任务，当宏任务的JS堆栈清空之后，执行微任务。微任务清空即为一个宏任务的完成，接着执行另一个宏任务。

#### 手写call 、apply 、bind方法

**实现call方法思路**

1.在Function原型上增加_call方法，接受两个参数。第一个参数为指定的this值，默认值为window；第二个参数使用剩余运算符展开，获取参数列表。

2.将函数this设置为context对象的属性，通过隐式绑定的方式调用函数，把context上的属性删了，并返回函数调用的返回值

>- 这里的原理是：this指向调用它的对象，这是是context调用，所以this指向了context。
>
>- 为什么要删除context上的属性。
>
>  防止这个属性对context造成影响，而且这个属性本身也没有用啦，不用留着占内存，

**实现apply方法思路**

1.在Function原型上增加_apply方法，接受两个参数。第一个参数为指定的this值，默认值为window；第二个参数接受一个数组，默认值为空数组

2.将函数this设置为context对象的属性，通过隐式绑定的方式调用函数，把context上的属性删了，并返回函数调用的返回值

**实现bind方法思路**

bind方法的实现可以参考apply。bind和apply的区别在于，bind是返回一个绑定好的函数，apply是直接调用。那么实现也很简单，就是返回一个函数，里面执行了apply的操作而已。

不过有一个需要判断的点，因为返回新的函数，要考虑到使用new去调用，并且在this绑定中new的优先级比较高，所以需要判断new的调用，还有一个特点就是bind调用的时候可以传参，调用之后生成的新的函数也可以传参，效果是一样的，所以这一块也要做处理。

您已实现了apply 和 call ，那么bind 直接调用apply 或者 call 会更加优雅。 

```js
Function.prototype._call = function (context = window, ...args) {
  // 判断调用对象
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  args = args ? args : []
  //创建独一无二属性，以免覆盖原属性
  const key = Symbol();
  context[key] = this;
  //通过隐式绑定的方式调用函数
  const result = context[key](...args);
  //删除添加的属性
  delete context[key];
  //返回函数调用的返回值
  return result;
};

// 第二个参数是数组
Function.prototype._apply = function (context = window, args = []) {
  // 判断调用对象
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  const key = Symbol();
  context[key] = this;
  //通过隐式绑定的方式调用函数
  const result = context[key](...args);
  //删除添加的属性
  delete context[key];
  //返回函数调用的返回值
  return result;
};

Function.prototype._bind = function (context, ...args) {
  if (typeof this !== 'function') { 
    throw new TypeError('Error');
  }
  //返回一个绑定this的函数，我们需要在此保存this
  const fn = this;
  return function newFn(...newFnArgs) {
    //如果使用new调用，此时的this执行实例对象
    if (this instanceof newFn) {
      //直接new函数，此时的this指向函数本身
      return new fn(...args, ...newFnArgs)
    }
    //使用apply修改this指向
    return fn.apply(context, [...args, ...newFnArgs])
  }
};


let obj = { x: 1 };
function fn() {
  console.log(this.x, arguments);
}
fn._call(obj, 1, 2, 3);
fn._apply(obj, [1, 2, 3]);

const bindFn = fn._bind(obj, 1, 2, 3);
bindFn();
```

G