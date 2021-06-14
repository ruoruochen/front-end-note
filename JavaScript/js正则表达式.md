## 正则表达式

>   正则表达式是用于匹配字符串中字符组合的模式，即实现对字符串中的信息进行查找、替换和提取操作。下面是我对js中正则表达式的整理与总结。如果大家发现文章中有问题，欢迎大家在评论中指正。

### 1.js的RegExp对象

**js通过内置对象RegExp支持正则表达式，有2种方法实例化RegExp对象：1.字面量 2.构造函数**

#### 1.1 创建RegExp对象

**1.字面量**

**“隐式位置” \b，匹配这样的位置：它的前一个“显式位置”字符和后一个“显式位置”字符不全是 \w。**

```js
var reg = /\bare\b/g;
var str = "You are a beautiful girls. There are many boys parsue you.";
str = str.replace(reg, 'ARE');
console.log(str);
//You ARE a beautiful girls. There ARE many boys parsue you.
```

**2.构造函数**

```js
// new RegExp("正则表达式","匹配模式");
var reg = new RegExp('\\bare\\b','g');
```

第1个参数：正则表达式，js中“\”本身就是特殊字符，想使用的话需要转义；

第2个参数：匹配模式。

#### 1.2 匹配方法

- string.match(reg) 获取匹配内容的数组集合
- string.search(reg) 匹配字符串是否有与正则匹配的字符串，有返回索引，否则-1.
- string.replace(reg，str2) 替换
- string.split(reg) 字符串拆分成数组
- reg.test(string) 字符串是否匹配正则

```js
//search
var str2 = "abc def ghi jjk";
var res2 = str2.search(/g[hjkl]i/);
console.log(res2);//8

//split
var str = "1a2b3c4d5e6f7";
var res = str.split(/[a-z]/i);
console.log(res);//["1", "2", "3", "4", "5", "6", "7"]
```

### 2.正则常见语法

#### 2.1 匹配模式

**记住常用三个：i g m**

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/570e094f65384c9ca99a2aac8c403067~tplv-k3u1fbpfcp-watermark.image)

```js
//1.匹配所有项，忽略大小写。
const testString = 'test Test tEsT abdskxc ioewhsnc'
const reg = new RegExp('test', 'gi');
console.log(testString.replace(reg, 'HAHA'));
//HAHA HAHA HAHA abdskxc ioewhsnc
```

```js
//多行搜索，以a开头的
var reg = /^a/m;
var reg2 = /^a/;
var str = "bfdjdjk\na";
console.log(reg.test(str));//true
console.log(reg2.test(str));//false
```

#### 2.2 元字符

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/119d172453694d1ca4ccf7bdfc277359~tplv-k3u1fbpfcp-watermark.image)

**s(space) d(digital) w(word)小写匹配，大写取反。**

```js
//1.匹配任意单个字符
const reg1 = /.at/gi;
const str1 = 'cat Bat mat DOG egg FAT cupcake sing';
console.log(str1.match(reg1));//["cat", "Bat", "mat", "FAT"]
//2.逻辑或 匹配满足其一即可
const reg2 = /yes|no|maybe/i;
const str2 = "Can I say No?";
console.log(reg2.test(str2));//true
//3.[]只能匹配方括号其一
const reg3 = new RegExp('[bc]at', 'gi');
const str3 = 'cat Bat mat DOG egg FAT cupcake sing';
console.log(str3.match(reg3));//["cat", "Bat"]
//4.[^]取反 排除方括号字符集合 -定义一个范围
const reg4 = /[^a-zA-z0-9_]/;
// /[^a-zA-z0-9_]/ 等价于 /[^\W]/
console.log(reg4.test('a'));//false
console.log(reg4.test('B'));//false
console.log(reg4.test('1'));//false
console.log(reg4.test('_'));//false
console.log(reg4.test('!'));//true
```

#### 2.3 量词

**量词表示匹配多少个目标对象，精确匹配长度使用{}。**

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/20fdac363d2648df8f547c916b958efe~tplv-k3u1fbpfcp-watermark.image)

```js
// 1. * 匹配连续出现零次或多次字符
const reg1 = /hi*/gi
const str1 = 'ahiadahdisdhixc'
console.log(str1.match(reg1)) // [ 'hi', 'h', 'hi' ]
// 2. + 匹配 >=1次
const reg2 = /a+/gi;
const str2 = 'abchAbcdklasjaaa';
console.log(str2.match(reg2));//["a", "A", "a", "aaa"]
// 3. ? 0或1次
//正则表达式默认贪婪，匹配最长部分。
//？阻止贪婪模式
const greedyreg3 = /c[a-z]*t/gi;
const lazyreg3 = /c[a-z]*?t/gi;
const str3 = 'catshidtasji';
console.log(str3.match(greedyreg3));//["catshidt"]
console.log(str3.match(lazyreg3));//["cat"]
// 4. {n} 某字符重复n次 精确匹配
const reg4 = new RegExp('hi{3}', 'gi');
const str4 = 'hiiiihhhh';
const str4_2 = "hihihi"；
console.log(reg4.test(str4));//true
console.log(reg4.test(str4_2));//false
// 5. {m,n} 重复x次，其中m <= x <= n
const reg5 = /hi{1,4}/;
const str5 = 'hihi';
const str5_2 = 'hadi';
console.log(reg5.test(str5)) // true
console.log(reg5.test(str5_2)) // false
// 6. {n,} >=n次
const reg6 = /hi{5,}/;
const str6 = 'hiiiiii';
const str6_2 = 'hiiiihhh';
console.log(reg6.test(str6));//true
console.log(reg6.test(str6_2));//false
```

#### 2.4 边界符

| 边界 | 描述           |
| ---- | -------------- |
| ^    | 匹配字符串开头 |
| $    | 匹配字符串结尾 |

#### 2.5 分组

| 分组 | 描述                                 |
| ---- | ------------------------------------ |
| （） | 提前相匹配的字符串，使量词作用于分组 |

```js
console.log(`ashinmdnkbdkchbjduigh`.replace(/h(inm|bj)d/g, '-')) // as-nkbdkc-uigh
```

```js
const reg7 = /(abc){2}/g;
const str7 = 'abccccd,abcabcef,abcabcabc';
console.log(str7.match(reg7));//["abcabc", "abcabc"]
```

#### 2.6 优先级顺序

下面从最高优先级到最低优先级列排序：

​	 (1) 转义符：\

​     (2) 圆括号和方括号：(), []

​     (3) 量词： *, +, ?, {n}, {n,}, {n,m}

​     (4) 位置和顺序： ^, $

​     (5) “或”操作： |

### 练习

1、匹配select中所选中的项

```js
select id,name,age from student;
```

```js
// 思路：匹配select xxx from后，去除头尾， trim后 split(,)
let str = "select id, name, age from student"
let reg = /(select).*(from)/;

let res = str.match(reg)[0];
console.log(res.slice(7, -5).trim().split(','));
//[ 'id', ' name', ' age' ]
```

2、正则表达式匹配手机号码

```js
let IsPhone = /^1([358][0-9]|[4][134]|[7][12345])([0-9]){8}$/
console.log(IsPhone.test("15177890987"));//true
```

3、正则判断IP地址

```js
let IsIP = /^(([01]([\d]){0,2}|[2]([0-4][\d]|[5][0-5]))\.){3}([01]([\d]){0,2}|[2]([0-4][\d]|[5][0-5]))$/;
let ip = "257.1.1.1";

console.log(IsIP.test(ip));//true
```

4、正则处理数字千分位，如`12345`替换为`12,345`

### 需要转义的字符

1、反斜线必须转义

2、方括号必须转义

3、「^」在首和「-」在中必须转义