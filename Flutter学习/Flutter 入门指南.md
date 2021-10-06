# Flutter 入门指南

1、Flutter基础

2、Flutter的设计思路

跨平台方案：

1、WebView渲染。项目嵌入H5，客户端使用WebView进行渲染，例子：微信小程序。

优点：学习成本低，缺点：性能不如原生。

2、React Native 原生控件渲染。

优点：性能接近原生，缺点：**存在系统控件更新、框架未更新的问题。？？？TODO**

3、绘图引擎渲染，在各个平台调用一个统一接口的绘图引擎来绘制用户界面，性能接近原生，不受原生控件限制，实现统一。例子：Flutter。

## 一、基础篇

### 1.1 Dart 语言的优势

**Dart 语言的优势**

1、支持 AOT 编译和 JIT 编译两种方式

2、Dart 为单线程，不允许抢占。

TODO：深入了解 AOT 和 JIT

### 1.2 Dart 语言的基本语法

#### 变量声明

1、可以通过 var 定义变量，支持闭包

2、Dart 属于强类型语言，自动推导类型，并变量类型不能发生改变。

3、没有初始化的变量都会被赋予默认值 null

4、常量声明：const 、 final，区别为

- const 编译时常量，必须在声明时初始化，且初始化值必须为确定值，不需要经过计算。
- final 运行时常量，声明时初始化/构造函数初始化，值可动态计算。

#### 基本类型

number、String、bool、list、map、set

**number**

- number 类型只有 Int 和 double。

```js
num x = 1; // x can have both int and double values
x += 2.5;
```

- 字符串转数字：int.parse()、double.parse()

- 数字转字符串：intNum.toString()、doubleNum.toStringAsFixed(n)保留n位小数。

```dart
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```

**Strings**

- 在字符串中使用变量，使用`${}/$变量`包裹

```dart
var s = 'string interpolation';

assert('Dart has $s, which is very handy.' ==
    'Dart has string interpolation, '
        'which is very handy.');
assert('That deserves all caps. '
        '${s.toUpperCase()} is very handy!' ==
    'That deserves all caps. '
        'STRING INTERPOLATION is very handy!');
```

- '''...'''，"""..."""表示多行字符串

```js
var s1 = '''
You can create
multi-line strings like this one.
''';

var s2 = """This is also a
multi-line string.""";
```

- r'...',r"..."表示“raw”字符串 TODO

**Bool值**

Dart 是强 bool 类型检查，只有bool 类型的值是 true 才被认为是 true

**list列表**

创建、增、删、查、排序

- 创建 list 列表

  1、new List

  2、简单 List

  3、集合 if 和集合 for

```js
// 1、new List
var vegetables = new List();
// 2、简单用List来赋值
var fruits = ['apples', 'oranges'];

var constantList = const [1, 2, 3];// 常量列表
// constantList[1] = 1; // This line will cause an error.
```

```dart
// 3、集合if
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (promoActive) 'Outlet'
];

// 3、集合for
var listOfInts = [1, 2, 3];
var listOfStrings = [
  '#0',
  for (var i in listOfInts) '#$i'
];
assert(listOfStrings[1] == '#1')
```

- 添加元素

Dart 2.3 增加了扩展运算符`...`和可识别空值的展开运算符`...?`

```js
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);

var list;
var list2 = [0, ...?list];
assert(list2.length == 1);
```

添加元素方法：add()添加一个、addAll()添加多个

```dart
// 添加元素
fruits.add('kiwis');

// 添加多个元素
fruits.addAll(['grapes', 'bananas']);
```

- 删除元素

```js
// 删除指定位置的元素，返回删除的元素
fruits.removeAt(index);

// 删除指定元素,成功返回true，失败返回false
fruits.remove('apples');

// 删除最后一个元素，返回删除的元素
fruits.removeLast();

// 删除指定范围元素，含头不含尾，成功返回null
fruits.removeRange(start,end);

// 删除指定条件的元素，成功返回null
fruits.removeWhere((item) => item.length >6)；

// 删除所有的元素
fruits.clear();
```

- 查询元素

```js
// 获取第一个元素
fruits.first;

// 获取元素最后一个元素
fruits.last;

// 查找某个元素的索引号
assert(fruits.indexOf('apples') == 0);
```

- 排序


```js
// sort()对元素进行排序，传入一个函数作为参数，return <0表示由小到大， >0表示由大到小
fruits.sort((a, b) => a.compareTo(b));
```

**Set**

唯一的无序集合。

- 创建 Set

```dart
// 1、简单赋值
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
//注意 var names = {}; 这是创建了一个map，而不是set！
// 2、
var names = <String>{};
Set<String> names = {};
```

- 向 Set 增加元素 add 、addAll
- 判断Set中是否包含某元素：set.contains(item)

```js
//是否包含
_saved.contains(pair);

//移除
_saved.remove(pair);
```

**Map**

- 创建 Map

```js
// Map的声明
var hawaiianBeaches = {
    'oahu' : ['waikiki', 'kailua', 'waimanalo'],
    'big island' : ['wailea bay', 'pololu beach'],
    'kauai' : ['hanalei', 'poipu']
};
var searchTerms = new Map();

// 指定键值对的参数类型
var nobleGases = new Map<int, String>();

// Map的赋值，中括号中是Key，这里可不是数组
nobleGase[54] = 'dart';

//Map中的键值对是唯一的
//同Set不同，第二次输入的Key如果存在，Value会覆盖之前的数据
nobleGases[54] = 'xenon';
assert(nobleGases[54] == 'xenon');

// 检索Map是否含有某Key
assert(nobleGases.containsKey(54));

//删除某个键值对
nobleGases.remove(54);
assert(!nobleGases.containsKey(54));

```

#### 函数

函数前为返回值类型

```dart
bool isNoble ( int atomicNumber ) { return _nobleGases [ atomicNumber ] != null ; } 

isNoble ( atomicNumber ) { return _nobleGases [ atomicNumber ] != null ; } 

bool isNoble ( int atomicNumber ) => _nobleGases [ atomicNumber ] != null ;   
```

**参数**

函数参数后面可以跟命名参数、可选位置参数（但不能同时跟俩）。

**命名参数**

函数参数命名，传参时需要指定将哪个数据传给哪个参数。

```dart
// 函数定义
void enableFlags({bool bold,required bool hidden}) {...}
// 函数调用
enableFlags(bold: true, hidden: false);
```

required 必须传某个参数

**可选位置参数**

可选位置参数，使用`[]`将参数包裹，这个位置参数可以不传。

```js
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```

参数默认值

```js
void enableFlags({bool bold = false, bool hidden = false}) {...}
```

#### 条件判断与循环

- if...else
- for
- while do-while
- break continue
- switch...case 如果 case 后面有表达式但是没有 break，会抛出异常
- assert（仅在checked模式有效），如果条件为假，抛出异常

**if - else**

判断值必须为true或false，不能为别的！

**for 循环**

```js
var message = StringBuffer('Dart is fun');
for (var i = 0; i < 5; i++) {
  message.write('!');
}
```

```js
var collection = [1, 2, 3];
collection.forEach(print); // 1 2 3
```

#### 异步

Future、async/await

**Future**

类似于Promise，成功执行then，失败执行catchError，无论如何执行whenComplete

```js
void main() {
  Future.delayed(new Duration(seconds: 1), () {
    return "666";
  }).then((data) {
    // 成功后执行
    print(data);
  }).catchError((e) {
    // 失败后执行
    print("error");
  }).whenComplete(() {
    // 无论成功失败都会执行
    print("complete");
  });
}
```

**async/await**

在函数（）后加 async

```dart
void main() async{
  print(await getString());
}

getString() {
  return Future.delayed(new Duration(seconds: 1), () {
    return "666";
  });
}
```

### 1.3 Flutter

#### 控件基础

在 Flutter 里，**万物皆控件**：Widget。

- 一个 widget 中提供一个 `build()` 方法来描述如何展示 UI 。
- `Scaffold` 是 Material 库中提供的一个 widget，它提供了默认的导航栏、标题和包含主屏幕 widget 树的 body 属性。

##### 根控件

所有的控件都属于 StatefulWidget 或 StatelessWidget。

区别：StatefulWidget 拥有状态 State，而 StatelessWidget 没有。

*StatefulWidget控件：*

实现一个 stateful widget 至少需要两个类： 

1. 一个 StatefulWidget 类；
2. 一个 State 类。

StatefulWidget 类本身是不变的，但是 State 类在 widget 生命周期中始终存在。

##### 容器控件

将属性和配置作用于子控件上，例如宽高、位置、背景。

常用的容器控件有 Container、Center、Padding 等。

##### 布局控件

类比于Android的Layout，有一个chidren属性，接受控件数组。

常用的布局控件有 Row、Column、Stack、Flex、Scaffold 等。

**Scaffold布局控件**

`Scaffold` 实现了基本的 `Material` 布局。

重要属性：

- appBar：顶部的AppBar
- body：界面主内容

##### 基础控件

```dart
Text("666")
```

基础控件就是常用的文字、按钮、图片等控件。

常用的基础控件有 Text、TextField、Button、Image 等。

##### 功能控件

```dart
Navigator.of(context).push(MaterialPageRoute(builder: (context) {
    return NewPage();
}));
```

在 Flutter 里还有一类控件，它们不影响 UI 布局，但带有一些特定的功能，比如页面跳转、事件监听、定义主题等。我们把这一类控件称作功能控件。

常用的功能控件有 Navigator、NotificationListener、Theme 等。

#### 状态state

在 Flutter 的响应式风格的框架中，调用 `setState()` 会为 State 对象触发 `build()` 方法，从而导致对 UI 的更新

```dart
// 增加点击事件
onTap: () {
    // 修改状态
    setState(() {
        if (alreadySaved) {
            _saved.remove(pair);
        } else {
            _saved.add(pair);
        }
    });
});
```

#### 路由基础

在Flutter中，**导航器**管理应用程序的路由栈。将路由push进导航器的栈中，更新路由页面；从导航器的栈pop出，则显示前一个路由。

调用Navigator.push，使路由入栈。新页面的内容会在 MaterialPageRoute 的 `builder` 属性中构建，`builder` 是一个匿名函数。

```dart

```



#### 1、Flutter的设计思路

绘图引擎渲染，在各个平台调用一个统一接口的绘图引擎来绘制用户界面，性能接近原生，不受原生控件限制，实现统一。