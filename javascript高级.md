# javascript面向对象

## 目标

![image-20200627090426517](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200627090426517.png)

### 1、面向对象编程介绍

#### 1-1 面向过程编程POP

![image-20200627144420279](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200627144420279.png)

#### 1-2 面向对象编程OOP

![image-20200627144448585](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200627144448585.png)



#### 1-3 面向过程与面向对象的对比

![image-20200627144856310](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200627144856310.png)

程序简单：面向过程

大工程 复杂：面向对象



### 2、ES6中的类和对象

#### 2-1 对象

![image-20200627145746217](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200627145746217.png)

#### 2-2 类

略



#### 2-3 创建类

![image-20200627145935877](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200627145935877.png)



#### 2-4 类constructor构造函数

![image-20200627151015080](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200627151015080.png)

​    (1) 通过class 关键字创建类, 类名我们还是习惯性定义首字母大写

​    (2) 类里面有个constructor 函数,可以接受传递过来的参数,同时返回实例对象

​    (3) constructor 函数 只要 new 生成实例时,就会自动调用这个函数, 如果我们不写这个函数,类也会自动生成这个函数

​    (4) 生成实例 new 不能省略

​    (5) 最后注意语法规范, 创建类 类名后面不要加小括号,生成实例 类名后面加小括号, 构造函数不需要加function。且类里边的所有方法都不用加function



#### 2-5 类添加方法

![image-20200627151543797](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200627151543797.png)

```html
 (1) 我们类里面所有的函数不需要写function 
 (2) 多个函数方法之间不需要添加逗号分隔
```



### 3、类的继承

#### 3-1 继承 extends

![image-20200627151734371](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200627151734371.png)



#### 3-2 super关键字

![image-20200627154022064](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200627154022064.png)

```js
   调用父类构造函数：
<script>
        class Father {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            sum() {
                console.log(this.x + this.y);

            }
        }

        class Son extends Father {
            constructor(x, y) {
                super(x, y);
            }
        }

        var son = new Son(2, 3);
        var son2 = new Son(11, 12);
        son.sum();
        son2.sum();
    </script>
```

```js
	调用父类的普通函数： 
<script>
        class Father {
            say() {
                return '我是爸爸'
            }
        }

        class Son extends Father {
            say() {
                console.log(super.say() + "的儿子");
                //输出：我是爸爸的儿子
            }
        }
        var son = new Son();
        son.say();
    </script>
```



**其他注意事项**

![image-20200627160852363](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200627160852363.png)

```js
  class Star {
            // 1. 在 ES6 中类没有变量提升，所以必须先定义类，才能通过类实例化对象
            // 2. 类里面的共有的属性和方法一定要加this使用.
      		// 3. this的指向问题
          constructor(uname, age) {
                console.log(this);

                this.uname = uname;
                this.age = age;
                this.button = document.querySelector("button");
                this.button.onclick = this.sing;
              //button.onclick = sing 赋予btn.onclick一个事件
              //button.onclick = sing() 表示调用，完后button.onclick 依然是null
            }
            
            sing() {
                // 这个this指向的是button按钮
                console.log(this.uname);//undifined
                console.log("大碗宽面");
            }

            dance() {
                //dance里面的this 指向实例对象。
                //因为吴亦凡调用了这个函数
                console.log(this);
            }
        }

        var fan = new Star("吴亦凡", 30);
		fan.dance();

```



# 构造函数和原型

## 目标

![image-20200629100003157](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200629100003157.png)

### 1、构造函数和原型

#### 1-1 概述

![image-20200629113655411](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200629113655411.png)

```js
<script>
        // 1、利用new Object()创建对象
        var obj1 = new Object();

        // 2、利用对象字面量创建对象
        var obj2 = {};

        // 3、利用构造函数创建对象
        function Star(uname, age) {
            this.uname = uname;
            this.age = age;

            this.sing = function () {
                console.log("我会唱歌");
            }
        }

        var wyf = new Star("吴亦凡", 18);
        var nana = new Star("欧阳娜娜", 18);
        console.log(wyf);
        nana.sing();

    </script>
```





#### 1-2 构造函数

![image-20200629114504731](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200629114504731.png)

![image-20200629114952420](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200629114952420.png)

##### 静态成员和实例成员

![image-20200629115429781](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200629115429781.png)

```js
<script>
        function Star(uname, age) {
            this.uname = uname;
            this.age = age;

            this.sing = function () {
                console.log("我会唱歌");
            }
        }
        // 1、实例成员：使用this添加的成员，如uname,age,sing()
        // 实例成员只能由实例化对象访问
        var wyf = new Star("吴亦凡", 18);
        console.log(wyf.uname);//输出：吴亦凡
        wyf.sing();//输出：我会唱歌
        // Star.sing();//错误，会报错:Star.sing is not a function

        // 2、静态成员 sex为静态成员
        // 静态成员只能由构造函数访问
        Star.sex = '男';
        console.log(wyf.sex);//错误，输出undefined
        console.log(Star.sex);//输出：男
    </script>
```



### 1-3  构造函数的问题

![image-20200629120247526](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200629120247526.png)



#### 1-4 构造函数原型 prototype

![image-20200630104156351](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200630104156351.png)

```js
    <script>
        // 一般情况下，公共属性定义在构造函数里
        // 公共方法放在原型对象上
        function Star(uname, age) {
            this.uname = uname;
            this.age = age;
        }
        // 原型对象,共享方法
        Star.prototype.sing = function () {
            console.log("我会唱歌");
        }
        var wyf = new Star("吴亦凡", 18);
        var nana = new Star("欧阳娜娜", 18);
        // console.dir(Star);
        wyf.sing();
        nana.sing();
    </script>
```



#### 1-5 对象原型 __ proto __

![image-20200630104931459](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200630104931459.png)

```js
        function Star(uname, age) {
            this.uname = uname;
            this.age = age;
        }
        // 原型对象,共享方法
        Star.prototype.sing = function () {
            console.log("我会唱歌");
        }       

		// 对象身上系统自己添加一个__proto__，指向我们构造函数的原型对象,输出如图所示
        console.log(wyf);
        // 对象原型=原型对象
        console.log(wyf.__proto__ === Star.prototype);//输出：true
        // 方法查找规则：首先看wyf对象身上是否有sing方法，如果有就执行这个对象上的sing
        // 如果没有，因为有__proto__的存在，就去构造函数原型对象prototype身上查找sing这个方法
```



![image-20200630105048717](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200630105048717.png)



#### 1-6 constructor构造函数

![image-20200630111207136](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200630111207136.png)

```js
    <script>
        function Star(uname, age) {
            this.uname = uname;
            this.age = age;
        }
        // 很多情况下,我们需要手动的利用constructor 这个属性指回 原来的构造函数
        // Star.prototype.sing = function() {
        //     console.log('我会唱歌');
        // };
        // Star.prototype.movie = function() {
        //     console.log('我会演电影');
        // }
        Star.prototype = {
            // 如果我们修改了原来的原型对象,给原型对象赋值的是一个对象,则必须手动的利用constructor指回原来的构造函数
            constructor: Star,
            sing: function () {
                console.log('我会唱歌');
            },
            movie: function () {
                console.log('我会演电影');
            }
        }
        var ldh = new Star('刘德华', 18);
        var zxy = new Star('张学友', 19);
        console.log(Star.prototype);
        console.log(ldh.__proto__);
        console.log(Star.prototype.constructor);
        console.log(ldh.__proto__.constructor);
    </script>
```



#### 1-7 构造函数、实例、原型对象三者之间的关系

![image-20200630111502233](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200630111502233.png)



#### 1-8 原型链

![image-20200630112211059](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200630112211059.png)

```js
    <script>
        // 一般情况下，公共属性定义在构造函数里
        // 公共方法放在原型对象上
        function Star(uname, age) {
            this.uname = uname;
            this.age = age;
        }
        // 原型对象,共享方法
        Star.prototype.sing = function () {
            console.log("我会唱歌");
        }
        var ldh = new Star('刘德华', 18);
        // 1.只要是对象就有__proto__原型，指向原型对象
        console.log(Star.prototype);
        console.log(Star.prototype.__proto__ === Object.prototype);//输出true
        // 2、Star原型对象中的__proto__原型指向的是Object.prototype
        // 3、Object原型对象中的__proto__指向null
        console.log(Object.prototype.__proto__);//输出null

    </script>
```



#### 1-9 JS成员的查找机制（规则）

查找时按照原型链查找

![image-20200630113031757](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200630113031757.png)



#### 1-10 扩展内置对象

![image-20200630114115388](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200630114115388.png)

```html
    <script>
        console.log(Array.prototype);
        Array.prototype.sum = function () {
            var sum = 0;
            for (var i = 0; i < this.length; i++) {
                sum += this[i];
            }
            return sum;
        }
        var arr = [1, 2, 3, 4];
        console.log(arr.sum());
    </script>
```





### 2、继承

ES6之前并没有提供extends继承，可以通过**构造函数+原型对象**模拟实现继承，被称为组合继承。



#### 2-1 call()

![image-20200702100417766](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200702100417766.png)

```js
    <script>
        function fn(x, y) {
            console.log("我想喝手磨咖啡");
            console.log(this);
            console.log(x + y);

        }

        var o = {
            name: 'andy'
        };
        // 1、call（）可以调用函数 this指向window
        fn.call();
        // 2、call（）可以改变函数的this指向 this指向o
        fn.call(o, 1, 2);
    </script>
```



#### 2-2 借用构造函数继承父类型属性

![image-20200702140258733](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200702140258733.png)

```js
    <script>
        // 借用父构造函数继承属性
        // 1、父构造函数
        function Father(uname, age) {
            // this指向父构造函数的对象实力
            this.uname = uname;
            this.age = age;
        }

        Father.prototype.money = function () {
            console.log("我能挣钱");

        }

        // 2、子构造函数
        function Son(uname, age) {
            // this指向子构造函数的对象实例
            // 调用Father函数，并让this指向子构造函数的对象实例
            Father.call(this, uname, age);
        }
        //如果这样，爸爸也要考试了呜呜呜
        // Son.prototype = Father.prototype //这样直接赋值有问题，如果修改了子原型对象，父原型对象也会改变。

        Son.prototype = new Father();//生成一个实例化对象
        //如果利用对象的形式修改了原型对象，别忘了利用constructor指回原来的构造函数
        Son.prototype.constructor = Son;
        Son.prototype.exam = function () {
            console.log("爸爸，我要去考试啦");
        }
        var son = new Son("吴亦凡", 18);
        console.log(son);
        console.log(Father.prototype);
        console.log(Son.prototype.constructor);

    </script>
```



### 3、ES5中的新增方法

#### 3-1 数组方法

![image-20200704163620466](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200704163620466.png)

##### 3-1-1 forEach()

![image-20200704163650989](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200704163650989.png)

```js
    <script>
        var arr = [1, 2, 3];
        var sum = 0;
        arr.forEach(function (value, index, array) {
            console.log("每一个数组元素" + value);
            console.log("每一个数组元素的索引号" + index);
            console.log("数组本身" + array);
            sum += value;
        })
        console.log(sum);
    </script>
```



##### 3-1-2 filter() 筛选数组 返回数组

![image-20200704163759498](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200704163759498.png)

```js
    <script>
        var arr = [12, 66, 4, 69];
        var new_arr = arr.filter(function (value, index, array) {
            // return value >= 20;//输出66,69
            // 返回偶数
            return value % 2 == 0//输出12,66,4
        })
        console.log(new_arr);

    </script>
```



##### 3-1-3 some() 查找元素是否存在 返回布尔值

![image-20200704164210231](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200704164210231.png)



##### 3-1-4 foreach、some、filter的区别。

```js
  <script>
        // 如果需要查询数组中的唯一元素，使用some方法效率更高
        var arr = ['red', 'pink', 'blue', 'green'];
        // 1、foreach迭代遍历
        // arr.forEach(function (value) {
        //     if (value == 'pink') {
        //         console.log("找到该元素");
        //         return true;//遇到return 不会终止迭代
        //     }

        //     console.log(11);//输出了3次11
        // })

        // 2、some
        arr.some(function (value) {
            if (value == 'pink') {
                console.log("找到该元素");
                return true;
            }
            console.log(11);//输出了1次11
        })

        // 3、filter遇到return 也不会终止迭代
    </script>
```



#### 3-2 字符串方法

![image-20200704195403497](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200704195403497.png)

trim不会删除字符串之间的空格

```js
    <script>
        var str = '  andy and me   ';
        console.log(str);//输出：  andy and me   
        var str1 = str.trim();
        console.log(str1);//输出：andy and me
    </script>
```



#### 3-3 对象方法

##### 1、Object.keys()

![image-20200704200618966](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200704200618966.png)

```js
    <script>
        var obj = {
            id: 1,
            pname: '小米',
            price: 999,
            num: 2020
        }
        var arr = Object.keys(obj);
        console.log(arr);
    </script>
```



##### 2、Object.difineProperty方法

![image-20200704203435770](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200704203435770.png)

```js
    <script>
        var obj = {
            id: 1,
            pname: '小米',
            price: 1999
        };
        // 1、以前的对象修改和添加属性的方式
        // obj.price = 999;
        // obj.num = 10;
        // console.log(obj);

        // 2、Object.defineProperty()定义新属性或修改
        Object.defineProperty(obj, 'num', {
            value: 1000
        })

        Object.defineProperty(obj, 'id', {
            // false:不允许修改这个属性值
            writable: false,
        })
        obj.id = 2;//id依旧为1
        console.log(obj);
    </script>
```



```js
    <script>
        var obj = {
            id: 1,
            pname: '小米',
            price: 1999
        };
        // 1、以前的对象修改和添加属性的方式
        // obj.price = 999;
        // obj.num = 10;
        // console.log(obj);

        // 2、Object.defineProperty()定义新属性或修改
        Object.defineProperty(obj, 'num', {
            value: 1000,
            enumerable: true
        })

        Object.defineProperty(obj, 'id', {
            // false:不允许修改这个属性值
            writable: false,
        })
        obj.id = 2;//id依旧为1

        Object.defineProperty(obj, 'adress', {
            value: '中国山东找蓝翔',
            writable: false,
            // enumerable值为False 则不允许遍历，默认为false;
            enumerable: false,
            // configurable值为False 则不允许删除这个属性 默认为false 且不允许修改第三个参数里的特性
            configurable: false
        })
        console.log(obj);

        console.log(Object.keys(obj));

        // 删除属性
        delete obj.adress;//并没有被删除
        console.log(obj);
        delete obj.pname;//pname被删除
        console.log(obj);

        //报错！因为前面设置了configurable: false 不允许修改第三个参数里的特性
        Object.defineProperty(obj, 'adress', {
            value: '中国山东找蓝翔',
            writable: true,
            // enumerable值为False 则不允许遍历，默认为false;
            enumerable: true,
            // configurable值为False 则不允许删除这个属性 默认为false 且不允许修改第三个参数里的特性
            configurable: false
        })
    </script>	
```



# 函数进阶

## 目标

![image-20200705114013403](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200705114013403.png)

### 1、函数的定义和调用

#### 1-1 函数的定义方式

![image-20200705115141760](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200705115141760.png)

```js
    <script>
        // 1、自定义函数 命名函数
        function fn() { };

        // 2、函数表达式 匿名函数
        var fun = function () { };

        // 3、利用new Function('参数1','参数2','函数体'); Function为一个构造函数
        //参数、函数体要以字符串的形式写在括号里面，参数可省略。
        //以下a、b为形参
        var f = new Function('a', 'b', 'console.log(a+b)');
        f(1, 2);//输出3

        //4、所有函数都是Function的实例（对象）
        console.dir(f);//内含__proto__
        console.log(f instanceof Object);//true
    </script>
```

![image-20200705115410104](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200705115410104.png)



#### 1-2 函数的调用方式

![image-20200705120344721](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200705120344721.png)



### 2、this

#### 2-1 函数内this的指向

![image-20200707164454728](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200707164454728.png)



#### 2-2 改变函数内部this指向

##### 1、call方法

![image-20200707164627391](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200707164627391.png)



##### 2、apply方法

![image-20200707165253736](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200707165253736.png)

##### 3、bind方法（重点）

![image-20200711180819383](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200711180819383.png)

有的函数，我们不需要立即调用，但是又想改变这个函数内部的this指向，此时用bind。



例子：改变This指向的bind方法.html



#### 2-3 call apply bind总结

![image-20200711183256190](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200711183256190.png)



### 3、严格模式

 #### 3-1 开启严格模式

##### 1、为脚本开启严格模式

```js
    <!-- 为整个脚本script标签开启严格模式 -->
    <!-- 形式1 -->
    <script>
        'use strict';
        // 下面的js代码就会按照严格模式执行代码
    </script>

    <!-- 形式2 -->
    <script>
        // 立即执行函数
        (function () {
            'use strict';
        })
    </script>
```

##### 2、为函数开启严格模式

```js
        // 此时，只是给fn开启严格模式，fun还是按照普通模式执行
        function fn() {
            // 严格模式
            'use strict';
        }

        function fun() {
            // 普通模式
        }
```



#### 3-2 严格模式的变化

![image-20200711184508445](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200711184508445.png)

![image-20200711184834345](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200711184834345.png)



### 4、高阶函数

![image-20200716094142970](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200716094142970.png)



### 5、闭包

![image-20200716095321319](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200716095321319.png)

```js
<!-- 闭包指有权访问另一个函数作用域中变量的函数 -->
    <!-- 闭包：我们fun这个函数作用域访问另一个函数fn里面的局部变量num -->
    <!-- 被访问的局部变量所在的函数，被称为：闭包函数 -->
    <script>
        function fn() {
            var num = 10;
            function fun() {
                console.log(num);
            }
            fun();
        }
        fn();
    </script>
```



#### 5-1 闭包的作用：延伸了变量的作用范围

```js
<script>
        function fn() {
            var num = 10;
            // function fun() {
            //     console.log(num);
            // }
            // return fun;
            // 直接返回匿名函数
            return function () {
                console.log(num);
            }
        }
        var f = fn();
        // 类似于：
        // var f=function fun(){
        //     console.log(num);
        // }
        f();
```



闭包应用：

1、10- 闭包的应用 点击输出索引号.html

2、11- 闭包应用 定时器中的闭包.html

3、12- 计算打车价格.html



### 6、递归

#### 6-1 什么是递归？

![image-20200716111140968](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200716111140968.png)

#### 6-2 浅拷贝和深拷贝

![image-20200719171537270](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200719171537270.png)

```js
//浅拷贝：   
<script>
        var obj = {
            id: 1,
            name: 'andy',
            msg: {
                age: 18,
                height: 180
            },
            color: ['pink', 'blue']
        }

        var o = {};//花括号不能少，表示其为对象。不能定义为var o，会报错
        // for (var k in obj) {
        //     // k是属性名，obj[k]属性值
        //     o[k] = obj[k];
        // }
        // o.msg.age = 20; // 复杂数据拷贝的是地址。
        // console.log(o);
        // console.log(obj);

        console.log("--------------------");
        // es6的方法 浅拷贝
        Object.assign(o, obj);
        console.log(o);
    </script>
```



```js
// ----------------------- 深拷贝 Start
        var obj = {
            id: 1,
            name: 'andy',
            msg: {
                age: 18,
                height: 180
            },
            color: ['pink', 'blue']
        }

        var o = {};//花括号不能少，表示其为对象。不能定义为var o，会报错
        //   封装函数
        function deepCopy(newobj, oldobj) {
            for (var k in oldobj) {
                // 判断属性值属性哪种数据类型
                var item = oldobj[k];
                // 1、判断是否为数组？注意：数组也属于对象，所以要先判断数组
                if (item instanceof Array) {
                    newobj[k] = [];
                    deepCopy(newobj[k], item);
                    // 2、判断是否为对象？
                } else if (item instanceof Object) {
                    newobj[k] = {};
                    deepCopy(newobj[k], item);
                } else {
                    newobj[k] = item;
                }

                // 属于简单数据类型
            }
        }
        deepCopy(o, obj);
        console.log(o);
        o.msg.age = 30;
        console.log(obj);
```





# 正则表达式

![image-20200719173053129](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200719173053129.png)

### 1、正则表达式概述

#### 1-1 什么是正则表达式

**正则表达式（Regular expressions）**是用于匹配字符串中字符组合的模式，是一个对象。

**正则表达式的作用：**

1、验证表单：输入文本/字符组合的**匹配**。

2、过滤敏感词，进行**替换**。

3、获取字符串的特定部分**（提取）**。



#### 1-2 正则表达式的特点

![image-20200719174138017](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200719174138017.png)



### 2、正则表达式在JavaScript中的使用

#### 2-1 创建正则表达式

![image-20200719174725091](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200719174725091.png)

```js
    <script>
        // 1、利用RegExp对象来创建
        var regexp = new RegExp(/123/);
        console.log(regexp);

        // 2、利用字面量创建
        var rg = /123/;
    </script>
```



#### 2-2 测试正则表达式 test

![image-20200719174811398](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200719174811398.png)

```js
        var rg = /123/;
        console.log(rg.test(123));//输出true
        console.log(rg.test("abs"));//输出false
```



### 3、正则表达式中的特殊字符

#### 3-1 正则表达式的组成

![image-20200719180205561](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200719180205561.png)



#### 3-2 边界符

![image-20200722110422932](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200722110422932.png)

```js
<script>
        var rg = /abc/;//正则表达式里面不需要加引号，不管是数字型还是字符串型
        // /abc/只要包含有abc这个字符则返回的都是True
        console.log(rg.test("abc"));//输出True
        console.log(rg.test("abcde"));//输出True
        console.log(rg.test("aaaabcde"));//输出True
        console.log('---------------------------');
        var reg = /^abc/;//以abc开头
        console.log(reg.test("abc"));//输出True
        console.log(reg.test("abcde"));//输出True
        console.log(reg.test("aaaabcde"));//输出false
        console.log('---------------------------');
        var reg1 = /^abc$/;//精确匹配 要求必须是abc字符串才符合规范
        console.log(reg1.test("abc"));//输出True
        console.log(reg1.test("abcde"));//输出false
        console.log(reg1.test("aaaabcde"));//输出false
        console.log(reg1.test("abcabc"));//输出false
    </script>
```



#### 3-3 字符类

```js
       <script>
        // var rg=/abc/;  //只要包含abc就可以， 不符合实际应用
        // 字符类：[] 表示有一系列字符可供选择，只要匹配其中一个就可以了
        var rg = /[abc]/;//只要包含有a或b或c，都返回true
        console.log(rg.test("andy"));//true
        console.log(rg.test('baby'));//true
        console.log(rg.test('color'));//true
        console.log(rg.test('hhh'));//false
        console.log('------------------------------');

        var rg1 = /^[abc]$/;//三选一 只有是a或b或c，才返回true
        console.log(rg.test('aa'));//false
        console.log(rg.test('abc'));//false
        console.log(rg.test('a'));//true
        console.log(rg.test('b'));//true
        console.log(rg.test('c'));//true
        console.log('------------------------------');

        var rg2 = /^[a-z]$/;//26个字母任何一个字母，返回true
        console.log(rg2.test('a'));//true
        console.log(rg2.test('z'));//true
        console.log(rg2.test('1'));//false
        console.log(rg2.test('A'));//false

        console.log('------------------------------');
        // 字符组合
        var reg = /^[a-zA-Z0-9_-]$/;//多选一 26个字母（大写小写均可）、0到9的数字、下划线、横杠中的任何一个返回True
        console.log(reg.test('a'));//true
        console.log(reg.test('B'));//true
        console.log(reg.test('9'));//true
        console.log(reg.test('_'));//true
        console.log(reg.test('-'));//true
        console.log(reg.test('!'));//false

        console.log('------------------------------');
        //如果中括号里面有 ^ 则表示取反的意思。  即不能包含a-zA-Z0-9_-
        //注意与边界符分开
		var reg1 = /^[^a-zA-Z0-9_-]$/;
        console.log(reg1.test('a'));//false
        console.log(reg1.test('B'));//false
        console.log(reg1.test('9'));//false
        console.log(reg1.test('_'));//false
        console.log(reg1.test('-'));//false
        console.log(reg1.test('!'));//true
    </script>
```



#### 3-4 量词符

![image-20200723104308562](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200723104308562.png)

```量词符
    <script>
        // 1、* 相当于>=0 可以出现0次或很多次。
        var reg1 = /^a*$/;
        console.log(reg1.test(''));//true
        console.log(reg1.test('a'));//true
        console.log(reg1.test('aaaa'));//true

        console.log('---------------------------');

        //2、 + 相当于>=1 可以出现1次或很多次。
        var reg2 = /^a+$/;
        console.log(reg2.test(''));//false
        console.log(reg2.test('a'));//true
        console.log(reg2.test('aaaa'));//true

        console.log('---------------------------');

        // 3、 ？ 相当于1或0
        var reg3 = /^a?$/;
        console.log(reg3.test(''));//true
        console.log(reg3.test('a'));//true
        console.log(reg3.test('aaaa'));//false

        console.log('---------------------------');

        // 4、{3} 重复3次
        var reg4 = /^a{3}$/;
        console.log(reg4.test(''));//false
        console.log(reg4.test('a'));//false
        console.log(reg4.test('aaaaa'));//false
        console.log(reg4.test('aaa'));//true

        console.log('---------------------------');

        //5、 {3，} 大于等于3
        var reg5 = /^a{3,}$/;
        console.log(reg5.test(''));//false
        console.log(reg5.test('a'));//false
        console.log(reg5.test('aaaaa'));//true
        console.log(reg5.test('aaa'));//true

        console.log('---------------------------');

        // 6、 {3,16} 大于等于3，小于等于16
        var reg6 = /^a{3,6}$/;
        console.log(reg6.test(''));//false
        console.log(reg6.test('a'));//false
        console.log(reg6.test('aaaa'));//true
        console.log(reg6.test('aaa'));//true
        console.log(reg6.test('aaaaaaa'));//false
    </script>
```



例子：5- 用户名验证.html



#### 3-5 括号总结

![image-20200723112255063](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200723112255063.png)

```js
    <script>
        // 1、中括号 字符集合  多选一
        var rg1 = /^[abc]$/; //三选一

        // 2、大括号 量词符
        var rg2 = /^a{3}$/;//a重复3次
        var rg3 = /^abc{3}$/;//让c重复3次。
        console.log(rg3.test('abccc'));//true
        console.log(rg3.test('abcabcabc'));//false

        console.log('-------------------------------');


        //3、小括号 表示优先级
        var rg4 = /^(abc){3}$/;//让abc重复3次。
        console.log(rg4.test('abccc'));//false
        console.log(rg4.test('abcabcabc'));//true
    </script>
```



#### 3-6 预定义类

![image-20200723114712754](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200723114712754.png)



### 4、正则表达式中的替换

#### 4-1 replace替换

![image-20200723123908215](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200723123908215.png)



#### 4-2 正则表达式参数

![image-20200723124509177](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200723124509177.png)

**例子：过滤敏感词**

```替换
    <textarea name="" id="message" cols="30" rows="10"></textarea>
    <div></div>
    <button>提交</button>
    <script>
        // 替换replace
        // var str = 'andy和red';
        // // var newstr = str.replace('andy', 'baby');
        // // 或
        // var newstr = str.replace(/andy/, 'baby');
        // console.log(newstr);

        // 过滤敏感词
        var text = document.querySelector('textarea');
        var btn = document.querySelector("button");
        var div = document.querySelector("div");
        btn.onclick = function () {
            div.innerHTML = text.value.replace(/我日|gay/g, '**');
        }
    </script>
```

！