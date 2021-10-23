# JavaScript 函数式编程

## 一、什么是函数式编程

**定义：**函数式编程是一种编程范式，将整个程序都由函数调用以及函数组合构成。

可以看成一条流水线，**数据可以不断地从一个函数的输出流入另一个函数的输入，最后输出结果。**

![image-20211021221609884](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211021221609884.png)

### 1.1 从例子了解函数式编程

要求：字符串数组变成一个对象数组，并对人名进行转换。

```js
['john-reese', 'harold-finch', 'sameen-shaw'] 
// 转换成 
[{name: 'John Reese'}, {name: 'Harold Finch'}, {name: 'Sameen Shaw'}]
```

**命令式编程的思路**

面向过程，一步一步的指引来操作。

BAD ：建立一堆临时变量、要从头读到尾才知道干了什么。

![image-20211021203254176](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211021203254176.png)

**函数式编程的思路**

面向函数变成，通过函数组合变换解决问题。

1、我需要一个函数实现`String数组`到`Object数组`的转换。

2、中间涉及`String->Object`的转换，需要一个函数去实现。

3、这个函数需要用两个函数完成

- `capitalizeName`：把名称转换成指定形式
- `genObj`：把任意类型转换成对象

```js
//首字符大写，其他全小写
const capitalize = (x) => x[0].toUpperCase() + x.slice(1).toLowerCase()

//转字符串
const genObj = curry((key, x) => {
    let obj = {}
    obj[key] = x
    return obj
})

//负责格式化名称
const capitalizeName = compose(join(' '), map(capitalize), split('-'))
//任意类型转对象
const convert2Obj = compose(genObj('name'), capitalizeName)
//String数组转Object数组
const convertName = map(convert2Obj)

let ans = convertName(['john-reese', 'harold-finch', 'sameen-shaw'])
console.log(ans)//[{name: 'John Reese'},{name: 'Harold Finch'},{name: 'Sameen Shaw'}]
```

### 1.2 函数式编程的特点

#### 1. 函数是一等公民

函数和其他数据类型一样，处于平等地位，可以赋值、作为参数、作为返回值。

#### 2. 声明式编程

声明要做什么，而不是告诉应该怎么一步一步去做。

好处：可读性高，我们无须关心具体如何实现。

#### 3. 无状态和数据不可变

即没有副作用、纯函数。

##### 没有副作用

经验：对于对象，不要直接修改，一般是展开对象后，对某些属性进行赋值覆盖。

![image-20211021222506681](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211021222506681.png)

##### 纯函数

- 相同输入，相同输出。
- 没有副作用。（在纯函数中我们不能改变外部状态：修改全局变量、修改参数等。）
- 不依赖外部状态

## 二、函数式编程两大利器

### 2.1 函数柯里化

**函数柯里化：**使一个多元函数，可以分批接收参数。本质上就是返回一个函数接受参数。

#### 1. 部分函数应用 VS 柯里化

最初的柯里化：返回的是单元函数，即接受一个参数。

部分函数应用：返回更小元的函数，固定任意元参数。

#### 2. 高级柯里化

现成库中使用的`curry`函数，本质上是部分函数应用。

**原理：**根据统计传入参数的个数来判断是返回柯里化函数/结果值。

#### 3. 柯里化的应用

**参数复用，提高函数多样性**

有一个校验方法接受两个参数：正则表达式和校验字符串。

这个时候我们可以通过固定第一个参数（称为**配置**），产生很多新函数，在各种场合进行使用。

### 2.2 函数组合

#### 函数组合简介

**函数组合的定义：**多个函数组合成一个函数。（从右往左执行）

**注意：函数组合中要求函数单输入。**

> - QUES：如何实现compose函数 TODO

#### 函数组合实践

**要求：**将数组最后一个元素大写，假设 `log`, `head`，`reverse`，`toUpperCase` 函数存在。

**思路：**reverse后，取head，toUpperCase，log。

**命令式编程（面向过程）的写法：**

```js
log(toUpperCase(head(reverse(arr))))
```

**面向对象的写法：**

```js
arr.reverse().head().toUpperCase().log()
```

**函数式编程的写法**

```js
const upperLast = compose(log, toupperCase, head, reverse)
```

## 三、函数式编程实践经验

### 1. 柯里化中把要操作的数据放到最后

因为我们的输出通常是需要操作的数据，这样当我们固定了之前的参数（我们可以称为**配置**）后，可以变成一个单元函数，直接被**函数组合**使用。

```js
const split = curry((x, str) => str.split(x));
const join = curry((x, arr) => arr.join(x));
const replaceSpaceWithComma = compose(join(','), split(' '));
const replaceCommaWithDash = compose(join('-'), split(','));
```

**Q：如果没有把要操作的数据放最后怎么办？**

**A：**使用占位符号解决。

在`Ramda`中提供了占位符`R.__`，我们假设一个场景，`split`中的`str`为第一个参数。

```js
const split = curry((str,x)=>str.split(x));

const replaceSpaceWithComma = compose(join(','), split(R.__, ' '));
```

### 2. 函数组合的 Debug

定位函数组合中的错误，借助`trace`辅助函数，临时输出当前阶段的结果。

```js
const trace = curry((tip, x) => { console.log(tip, x); return x; });
const lastUppder = compose(toUpperCase, head, trace('after reverse'), reverse);
```

## 四、实战测试

