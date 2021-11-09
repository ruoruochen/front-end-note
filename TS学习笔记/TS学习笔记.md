# TypeScript Study

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/d88a00458ce14c73bd3114239f5cb7e2~tplv-k3u1fbpfcp-watermark.awebp)

## 一、TS 基本类型

### 1.1 Boolean类型

### 1.2 Number类型

### 1.3 String类型

### 1.4 Array类型

```typescript
let list: number[] = [1, 2, 3];
// ES5：var list = [1,2,3];

let list: Array<number> = [1, 2, 3]; // Array<number>泛型语法
// ES5：var list = [1,2,3];
```

**ReadonlyArray类型**

告诉别人，这个数组不能改变！

```ts
function doStuff(values: ReadonlyArray<string>) {
//function doStuff(values: readonly string[]) {   
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
 
  // ...but we can't mutate 'values'.
  values.push("hello!");
  // Property 'push' does not exist on type 'readonly string[]'.
}
```

**注意：没有ReadonlyArray这个构造函数，我们不能New ReadonlyArray(xx1,xx2....)**

但是我们可以把一个常规的Arrays分配给ReadonlyArray

```ts
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
```

### 1.5 Enum枚举类型

TypeScript 支持基于数字和基于字符串的枚举。

#### **1. 数字枚举**

```typescript
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;
```

默认情况下，NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。

也可以设置每个数字的初始值。

#### 2. 字符串枚举

```typescript
enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}
```

#### 3. 常量枚举

使用`const`关键字修饰枚举。

```typescript
const enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;
```

编译成 ES5 代码：

```js
"use strict";
var dir = 0 /* NORTH */;
```

### 1.6 Any类型

`any`类型：任何类型都能归为`any`类型。

- 可以对`any`类型进行任何操作，不进行类型错误检查。
- 但滥用`any`将丢失`TS`的保护特性。

### 1.7 Unknown类型

`unknown`类型

- 我们可以给`unknown`类型赋任何值。

- 但！并不能把`unknown`的值赋给非`unknown`、`any`的类型

- 不能对`unknown`类型进行任何操作（与`any`刚好相反）。

  ```typescript
  let value: unknown;
  
  //赋值
  let value1: unknown = value; // OK
  let value2: any = value; // OK
  let value3: boolean = value; // Error
  
  //操作
  value.foo.bar; // Error
  value.trim(); // Error
  value(); // Error
  ```

### 1.8 Tuple元组类型

#### 1. 元组类型

元组类型：给定每个元素类型的数组。

```ts
type StringNumberPair = [string, number];
```

该类型数组第一个元素类型为string，第二个元素为number。

#### 2. 元组可选属性

元组可选属性，只能用于最后一个。

```ts
type Either2dOr3d = [number, number, number?];
```

#### 3. 元组readonly

readonly 元组类型，即元素不允许发生改变

```ts
function doSomething(pair: readonly [string, number]) {
  pair[0] = "hello!";
  //Cannot assign to '0' because it is a read-only property.
}
```

### 1.9 Never类型

`never`类型：永不存在的值。常用于**分支收窄**中（if、switch）。

**使用never的好处**

使用 never 避免出现新增了联合类型没有对应的实现，保证类型安全。

#### 分支收窄

我们需要对参数类型进行区分，进行不同操作。此时在一个if中判断一个类型后，在外边TS会自动缩小范围为另一个类型

![image-20211008221240566](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211008221240566.png)

### 1.9 Void类型

`void`：没有任何类型。例如没有返回值的函数。

### 1.10 Null 和 Undefined

TypeScript 里，`undefined` 和 `null` 两者有各自的类型分别为 `undefined` 和 `null`。

### 1.11 object、Object 和 {} 类型

#### 1. object

非基础类型，基础类型包括`null` 和 `undefined`、`string`、`number`、`boolean`、`symbol`、`bigint`。

#### 2. Object

Object类的实例的类型

#### 3. {} 类型

没有成员的对象，不允许访问该对象的任意属性。

```typescript
// Type {}
const obj = {};

// Error: Property 'prop' does not exist on type '{}'.
obj.prop = "semlinker";
```

## 二、TS 断言

### 2.1 类型断言

我们开发者比TS更了解某个变量的类型，此时我们可以使用**类型断言**给变量指定类型，那么就不会进行类型扩展

#### 1. 尖括号语法

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

#### 2. as 语法

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

#### 3. 类型扩展

**什么是类型扩展：**某个变量的类型被扩展为通用类型，例如`string`、`number`等。

1、const 声明，将不会进行类型扩展。

```ts
const constantString = "Hello World";

constantString;// 类型： "Hello World"
```

2、let/var 声明，会进行类型扩展。

```ts
let changingString = "Hello World";

changingString; //类型：'string'
```

3、引用特定的字符串和数字作为类型，不会进行类型扩展

```ts
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

**应用：**

```ts
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

原因：method被推理为string，此时handleRequest接受的第二个参数采用文字类型`GET`和`POST`，不匹配。

解决方案：const 断言。对象内属性不会进行类型扩展。

```ts
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

### 2.2 非空断言

**非空断言运算符`！`：从 x 值域中排除 null 和 undefined。**

使用场景：

##### 1. 忽略 undefined 和 null 类型

```js
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'. 
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
```

**2. 调用函数时忽略 undefined 类型**

```js
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```

### 2.3 确定赋值断言

在实例属性和变量声明后使用`!`，明确告诉 TS 某变量已被明确赋值。

```js
let x: number;
initialize();
// Variable 'x' is used before being assigned.(2454)

// let x!: number; //OK
console.log(2 * x); // Error

function initialize() {
  x = 10;
}
```

## 三、类型守卫

用于检测属性、方法和原型。

### 3.1 in 关键字

判断某个对象里是否有某个属性

![image-20211022110458030](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20211022110458030.png)

### 3.2 typeof 关键字

判断某个对象的类型，跟 JS 的`typeof`差不多。

**注意：不能用在类型参数上（泛型）**

### 3.3 instanceof 关键字

判断某个对象是否为某个类的实例。

### 3.4 自定义类型保护的类型谓词

告诉 `TS` ，如果逻辑语句汇总返回的是`true`，则判断当前的`x`变量的类型为`number`类型。 

```typescript
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}
```

## 四、联合类型、交集类型、类型别名

### 4.1 联合类型

xxx | xxx

### 4.2 交集类型

使用 `&` 运算符定义交集类型，对象属性叠加类型

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle; 

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}
```

#### 1. 同名基础类型属性的合并

此时成员`C`类型不一致，`C`的类型为`never`

```typescript
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string
}

type XY = X & Y;
```

#### 2. 同名非基础类型属性的合并

可以正常合并

```typescript
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C //{x:{d: boolean, e: string,f: number}}

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666,
  },
}

console.log('abc:', abc)
```

### 4.3 类型别名

给类型起一个新的名字。

```js
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
```

## 五、对象类型

### 5.1 对象属性修饰

`可选?`、`readonly只读`

**可选？**

```ts
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
function paintShape(opts: PaintOptions) {
  // ...
}
const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
```

**readonly 只读**

被修饰属性无法被写入（类似const，不是一定的不变，只是意味着属性本身不能被重写。）

```ts
interface Home {
  readonly resident: { name: string; age: number };
}
 
function visitForBirthday(home: Home) {
  console.log(`Happy birthday ${home.resident.name}!`);
  //可以更新，并且不会报错
  home.resident.age++;
}
 
function evict(home: Home) {
  // 无法分配到 "resident" ，因为它是只读属性。
  home.resident = {
Cannot assign to 'resident' because it is a read-only property.
    name: "Victor the Evictor",
    age: 42,
  };
}
```

### 5.2 解构赋值重命名

`改名前：改名后`

接受属性shape，被重新定义名字为Shape，xPos被重新定义为number。

```ts
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  render(shape)
  // 找不到名称“shape”。你是否指的是“Shape”?
  render(xPos)
  // 找不到名称“xPos”。
}
```

### 5.3 索引签名 Index Signatures

有时候我们不知道对象类型属性的所有名称，但是我们知道它的key类型对应的可能值类型。这时候可以使用索引签名来描述可能值的类型。

```typescript
//这是一个带有索引签名的接口，当索引为number类型时，值类型为string
interface StringArray {
    [index: number] : string;
}

const myArray:StringArray = getStringArray();
const secondItem = myArray[1];
// const secondItem: string
```

**注意：索引签名属性类型必须为字符串/数字**

### 5.4 Keyof 类型运算符

获取对象的key值的类型，为联合类型。

### 5.5 索引访问类型

1、使用索引访问特定属性

![image-20211012170954764](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012170954764.png)

2、索引类型本身就是一种类型，所以我们可以使用 keyof 以及其他类型（例如联合类型）

![image-20211012171047159](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012171047159.png)

3、若使用索引不存在的属性，Error

4、使用`number`索引，可以获取数组元素的类型

![image-20211012171450441](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012171450441.png)

## 六、TS 函数

### 6.1 参数类型和返回类型

```typescript
function createUserId(name: string, id: number): string {
  return name + id;
}
```

### 6.2 函数类型

```typescript
let IdGenerator: (chars: string, nums: number) => string;

function createUserId(name: string, id: number): string {
  return name + id;
}

IdGenerator = createUserId;
```

#### 6.2.1 呼叫签名

**Call Signatures 呼叫签名** 

在`TS`的函数类型中不允许声明属性，此时我们可以使用呼叫签名来给函数增加属性

```ts
type GeneratorType = {
  description: string
  // 左参，右返回值
  (chars: string, nums: number): string
}
function callFn(fn: GeneratorType) {
  console.log(fn.description)
  fn('123', 1)
}
```

注：此时的函数类型表达式，参数和返回类型之使用 ：而非 =>

### 6.3 可选参数和默认参数

```ts
// 可选参数
function createUserId(name: string, id: number, age?: number): string {
  return name + id;
}

// 默认参数
function createUserId(
  name: string = "semlinker",
  id: number,
  age?: number
): string {
  return name + id;
}
```

**回调函数中的可选参数**

为回调编写函数类型时，**切勿编写可选参数**，除非您打算在不传递该参数的情况下调用该函数。

### 6.4 函数重载

同一函数名，接受的参数个数/类型不一致，称为函数重载。

格式：n(n>=2)个函数类型定义，紧跟实现函数体。

```ts
//函数类型定义
function makeDate(timeStamp: number): Date
function makeDate(m: number, d: number, y: number): Date
//实现函数体
function makeDate(mOrTimeStamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimeStamp, d)
  } else {
    return new Date(mOrTimeStamp)
  }
}
```

## 七、TS 接口

**接口：**命名对象的形状（Shape)

```js
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
```

**类型别名和接口的异同点**

相同：

1. 都可以定义对象的形状
2. 都可以被实现`implement`、被继承`extends`

不同点：

1. 接口可进行声明合并，类型别名不行。

```js
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/

type Point {
  x: number
  y: number
}

// ERROR：标识符 Point重复
type Point{
  z:number
}
```

## 八、TS 类

### 8.1 类的属性和方法

**成员属性与静态属性，成员方法与静态方法**

```typescript
class Greeter {
  // 静态属性
  static cname: string = "Greeter";
  // 成员属性
  greeting: string;

  // 构造函数 - 执行初始化操作
  constructor(message: string) {
    this.greeting = message;
  }

  // 静态方法
  static getClassName() {
    return "Class name is Greeter";
  }

  // 成员方法
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
```

### 8.2 成员访问修饰符

TypeScript 可以使用三种访问修饰符，分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认 `public` 
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问。

![image-20211012204217927](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012204217927.png)

- `protected` 修饰的属性或方法是受保护的，仅对自身和子类可见。

**跨层级protected访问**

`protected`通过基类引用访问成员是否合法？在TS中不合法！

**派生类无法修改基类的private可见性**

```typescript
class Base {
  private x = 0
}
class Derived extends Base {
  x = 1;
  // ERROR:Class 'Derived' incorrectly extends base class 'Base'.
  //Property 'x' is private in type 'Base' but not in type 'Derived'.
}
```

**跨实例private访问**

TS 允许跨实例 private访问

```typescript
class A {
  private x = 10;
 
  public sameAs(other: A) {
    // No error
    return other.x === this.x;
  }
}
```

**注意事项**

private protected 只在类型检查过程中执行，这意味着，在JS运行时，还是可以访问到private或protected的成员。

```typescript
class MySafe {
  private secretKey = 12345
}
// In a JavaScript file...
const s = new MySafe()
// Will print 12345
console.log(s.secretKey)
```

### 8.3 私有字段#

使用私有字段`#`，在编译为 JS 后保持私有。

```typescript
class Dog {
  #barkAmount = 0;
  personality = "happy";
 
  constructor() {}
}

let dog = new Dog()
console.log(dog.barkAmount)//输出undefined
```

- 私有字段上不能使用成员访问修饰符。
- 私有字段不能在包含的类之外访问，甚至不能被检测到。

### 8.4 访问器

通过`setter`和`getter`实现数据的封装和有效性校验。

```typescript
let passcode = "Hello TypeScript";

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "Hello TypeScript") {
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee = new Employee();
employee.fullName = "Semlinker";
if (employee.fullName) {
  console.log(employee.fullName);// "Semlinker"
}
```

### 8.5 类的继承`extends`

“子承父业”，类与类之间、接口与接口之间最常见的关系。

#### 继承中的方法覆盖

子类需要遵循其基类的规则，例如父类的一个方法不接收参数，子类的同名方法不能强制required参数，可以使用可选。

```typescript
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}
 
const d = new Derived();
d.greet();
d.greet("reader");

// 通过基类引用派生类
const b: Base = d;
// No problem
b.greet();
```

假设，我们就是不遵守父类的规则，会发生什么？

![image-20211012200834596](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012200834596.png)

### 8.6 抽象类`abstract`

**抽象类：**提供抽象方法，不可实例化，一般作为基类存在。

`abstract`用于修饰抽象类和抽象方法![image-20211012212057078](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012212057078.png)

### ❓ QUES

1. 私有字段是如何做到私有的？

   通过WeekMap实现，需要环境支持ES2015即ES6。

   实现方法：实现私有属性，只要是外部无法知道这个属性名，只有内部知道的属性名，就可以做到外部无法访问的特性。

   数据存在WeakMap中

   ```js
   class Student {
     #name: string
     constructor(name: string) {
       this.#name = name
     }
   }
   
   //转换成ES6后 (自己简化版)
   var _Student_name;
   class Student {
       constructor(name) {
           _Student_name.set(this, name);
   }
   _Student_name = new WeakMap();
   ```

   [JS私有属性](https://juejin.cn/post/6904849160004960264#heading-0)

## 九、泛型

**泛型：**让一个函数接受不同类型参数的一种模板。

### 9.1 泛型接口

```ts
//泛型接口
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn<number> = identity;
```

### 9.2 泛型类

**静态成员不能使用类型参数，因为静态成员是通过构造函数访问的**

```ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

### 9.3 泛型约束

#### 1. 类型参数约束

```ts
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  //报错 'length' does not exist on type 'Type'.
  return arg;
}
```

要求：我们希望将这函数的类型参数限制为有Length属性的。

```ts
function loggingIdentity<Type extends { length: number }>(arg:Type):Type{
  console.log(arg.length);//OK
  return arg;
}
```

**应用：使用泛型创建工厂模式**

```typescript
//通用工厂：泛型+call签名
function create<Type>(c:{new():Type}):Type{
    return new c();
}

//动物园工厂
class BeeKeeper{
    hasMask:boolean = true;
}

class ZooKeeper{
    nametag:string = 'Mikle';
}

class Animal{
    numLeg:number = 4;
}

class Bee extends Animal{
    keeper:BeeKeeper = new BeeKeeper();
}

class Zoo extends Animal{
    keeper:ZooKeeper = new ZooKeeper();
}

function createAnimal<A extends Animal>(c:{new():A}):A{
    return new c();
}

createAnimal(Bee).keeper.hasMask;
```

#### 2. 类型参数相互约束

**使用类型参数约束另外一个类型参数**

```ts
function getProperty<Type,Key extends keyof Type>(obj:Type,key:Key){
    return obj[key]
}

let x={a:'a',b:'b'};

getProperty(x,'a');
getProperty(x,'m');
//Error Argument of type '"m"' is not assignable to parameter of type '"a" | "b" 
```

### 9.4 泛型参数的默认类型

TS 2.3 后的功能

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```

## 十、TS 装饰器

### 10.1 装饰器简介

**什么是装饰器？**

- 它是一个表达式
- 该表达式被执行后，返回一个函数
- 函数的入参分别为 target、name 和 descriptor
- 执行该函数后，可能返回 descriptor 对象，用于配置 target 对象

**装饰器的分类**

- 类装饰器（Class decorators）
- 属性装饰器（Property decorators）
- 方法装饰器（Method decorators）
- 参数装饰器（Parameter decorators）

需要注意的是，若要启用实验性的装饰器特性，你必须在命令行或 `tsconfig.json` 里启用 `experimentalDecorators` 编译器选项：

**命令行**：

```shell
tsc --target ES5 --experimentalDecorators
```

**tsconfig.json**：

```json
{
  "compilerOptions": {
     "target": "ES5",
     "experimentalDecorators": true
   }
}
```

### 10.2 类装饰器

**类装饰器：**用于装饰类，接收一个参数：被装饰的类，返回一个函数。

**类装饰器声明模板：**

```type
declare type ClassDecorator = <TFunction extends Function>(
	target: TFunction
) => TFunction | void;
```

**例子：**

```typescript
//装饰器Greeter 接受一个参数，返回一个函数
//该函数的入参仅使用了target
//在函数内给target的原型对象上增加属性或方法
function Greeter(greeting: string) {
  return function (target: Function) {
    target.prototype.greet = function (): void {
      console.log(greeting);
    };
  };
}

//使用装饰器 并传参
@Greeter("Hello TS!")
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
(myGreeting as any).greet(); // console output: 'Hello TS!';
```

### 10.3 属性装饰器

**属性装饰器：**用于装饰类的属性，接受两个参数：目标对象、属性名。

**属性装饰器声明模板：**

```typescript
declare type PropertyDecorator = (target:Object,propertyKey:string|symbol) =>void;
```

**例子：**

```typescript
function defaultValue(value: string) {
  return function (target: any, propertyName: string) {
    target[propertyName] = value
  }
}

class HelloWordClass {
  constructor() {
    console.log('我是构造函数')
  }
  @defaultValue('zzb')
  private name: string | undefined
}
let p = new HelloWordClass()
console.log(p.name)
```

### 10.4 方法装饰器

**方法装饰器：**用于装饰类的方法，接受三个参数：被装饰类、方法名、描述符（.value为函数体）。

**方法装饰器声明模板：**

```typescript
declare type MethodDecorator = <T>(target:Object,propertyKey:string|symbol,descriptor:TypePropertyDescript<T>) => TypedPropertyDescriptor<T> | void;
```

**例子：**`log方法装饰器`，劫持方法

```typescript
function log(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("wrapped function: before invoking " + propertyKey);
    let result = originalMethod.apply(this, args);
    console.log("wrapped function: after invoking " + propertyKey);
    return result;
  };
}

class Task {
  @log
  runTask(arg: any): any {
    console.log("runTask invoked, args: " + arg);
    return "finished";
  }
}

let task = new Task();
let result = task.runTask("learn ts");
console.log("result: " + result);
//输出：
//wrapped function: before invoking runTask
//runTask invoked, args: learn ts
//wrapped function: after invoking runTask
//result: finished
```

### 10.5 参数装饰器

**参数装饰器：**装饰函数参数，接受三个参数：被装饰的类、方法名、参数索引值。

**参数装饰器声明模板：**

```typescript
declare type ParameterDecorator = (target:Object,propertyKey:string|symbol,parameterIndex:number) => void
```

**例子：**

```typescript
function Log(target: Function, key: string, parameterIndex: number) {
  let functionLogged = key || target.prototype.constructor.name;
  console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
	been decorated`);
}

class Greeter {
  greeting: string;
  constructor(@Log phrase: string) {
	this.greeting = phrase; 
  }
}
//输出："The parameter in position 0 at Greeter has been decorated" 

```

## 十一、条件类型

### 11.1 条件类型的基本使用

使用`extends?x:y;`，如果`T`的类型 是 `U`的类型的 **子集**，那么取结果`X`，否则取结果`Y`，类似于三元表达式。

```typescript
T extends U ? X : Y
```

**应用：**

一个createLabel函数，接受为number/string，此时使用函数重载实现.

```typescript
interface IDLabel {
  id: number
}

interface NameLabel {
  name: string
}

function createLabel(id: number): IDLabel
function createLabel(name: string): NameLabel
function createLabel(nameOrId: string | number): NameLabel | IDLabel
function createLabel(nameOrId: string | number): NameLabel | IDLabel {
  throw new Error('')
}

```

使用条件类型修改：

```typescript
type NameOrId<T extends number|stirng> = T extends number?IdLabel : NameLabel;

function createLabel<T extends number|string>(idOrName:T):NameOrId<T>{
    throw "unimplemented";
}
```

### 11.2 `infer`类型推理

**条件类型使用 infer 进行类型推理**

`infer`：表示在`extends`条件语句中待推断的类型变量。

**infer声明的这个变量只能在true分支中使用**

```typescript
type Params<T> = T extends (...args: infer P) => any ? P : T

interface User {
  name: string
  age: number
}

type Func = (user: User) => void

type MyParam = Params<Func> // MyParam = User
type AA = Params<string> // string

```

### 11.3 条件类型约束

希望效果：获取message，如果没有message 类型为never

```typescript
type MessageOf<T> = T["message"];
//ERROR：Type '"message"' cannot be used to index type 'T'.
```

原因：T不一定有message属性。

修改：约束T的范围，判断 T 是否有 message ，没有则nerver。

```typescript
type MessageOf<T> = T extends {message:unknown} ? T["message"]:never;
```

### 11.4 分布条件类型

被检查类型（即extends前的类型参数）是**裸类型参数**的条件类型称**分布条件类型**。

在实例化期间，分布条件类型会自动分布在联合类型上，即条件类型应用于联合类型的每个成员，结果是所有结果的联合。

```typescript
type t = Exclude<'a'|10,'a'|'b'|'c'>
// type t = 10

// 你以为的 Exclude
type c = 'a' | 10 extends 'a' | 'b' | 'c' ? never : 'a' | 10

// 实际上的 Exclude
type c =
  | ('a' extends 'a' | 'b' | 'c' ? never : 'a')
  | (10 extends 'a' | 'b' | 'c' ? never : 10)
```

**什么是裸类型参数？**

类型参数没有被包装到另一种类型中，例如：数组、元组、函数、或任意其他泛型类型。

## 十二、模板文字类型

### `Uppercase<StringType>`

将字符串转大写

### `Lowercase<StringType`

将字符串转小写

### `Capitalize<StringType>`

将字符串第一个字符转大写，其他不变。

### `Uncapitalize<StringType>`

将字符串第一个字符转小写，其他不变。

## 十三、模块

TS 使用`import type`用于类型的导入。

```typescript
export type Cat ={braed:string};
import type {Cat} from 'xxx./js'
```

导入时内联 type 表明引入的是类型

```typescript
// @filename: app.ts
import { createCatName, type Cat, type Dog } from "./animal.js";
 
export type Animals = Cat | Dog;
const name = createCatName();
```

## 十四、内置类型别名

### Partial< Type >

`Partial<Type>`：将某个类型的属性全变为可选项。

**实现**

```ts
type MyPartial<T> = {
    [K in keyof T]?: T[K];
};
```

### Required< Type >

`Required<Type>`：将某个类型的属性全变为必选项。

**实现**

通过 `-?` 移除了可选属性中的 `?`，使得属性从可选变为必选的。

> 通过`- 或 +`增加/移除这些修饰符`?`，如果不添加前缀，默认为`+`

```ts
type MyRequired<T> = {
  [K in keyof T]-?: T[K]
}
```

### Readonly< Type >

`Readonly<Type>`：将某个类型所有属性变为只读属性

**实现**

```ts
type MyReadonly<T> = {
  readonly [K in keyof T]:T[K]
}
```

### Record< Keys,Type >

`Record<Keys,Type>`：将keys的属性值类型转化为 T 类型。

```typescript
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

例子：

```typescript
interface CatInfo {
  age: number
  breed: string
}

type CatName = 'miffy' | 'boris' | 'mordred'

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
}

let b = cats.boris //let b: CatInfo
```

### Pick < Type,Keys >

`Pick <Type,Keys> `：从Type中取出一组属性Keys构造新的类型。

```ts
type MyPick<Type, Keys extends keyof Type> = {
  [K in Keys]: Type[K]
}
```

### Omit< Type,Keys >

记忆：`out` `move` `it` = 移除属性 

`Omit<Type,Keys>`：从Type中删除Keys属性，构造类型。

```ts
type MyOmit<T, K extends keyof T> = {
  [i in Exclude<keyof T,K>]:T[i]
}
```

### Exclude< Type,ExcludedUnion >

`Exclude<Type,ExcludedUnion> `：获取Type联合类型中移除ExcludedUnion后的联合成员。

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

**实现**

```ts
// 从联合类型T中移除U
type MyExclude<T, U> = T extends U?never:T
```

### Extract< Type,Union >

`Extract<Type,Union>`：获取Type可分配给Union的联合成员，即求同。

```ts
type MyExtract<T, U> = T extends U ? T : never
```

### NonNullable< Type >

`NonNullable<Type>`：排除Type中的null、undefined后，得到的类型。

```ts
type MyNonNullable<T> = T extends null | undefined ? never : T
```

### Parameters< Type >

`Parameters<T>`：获得函数的参数类型组成的元组类型。

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args:infer Args)=>any?Args:never
```

### ConstructorParameters< Type >

`ConstructorParameters<Type>`：获取构造函数参数类型的元组类型。

```ts
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
```

### ReturnType< Type >

`ReturnType<T>`：获取函数 Type 的返回类型。

### InstanceType< Type >

`InstanceType<Type>`：获取构造函数类型的实例类型。

````temp
暂时无用 不想整理的东西

### 映射类型

拿到Type中的所有属性，并将值更改为布尔值。

```typescript
type OptionsFlags<Type>={
    [Property in keyof Type]:boolean;
}
```

Example：

```typescript
type FeatureFlags = {
    darkMode:()=>void;
    newUserProfile:()=>void;
}

type FeatureOption = OptionsFlags<FeatureFlags>;
//type FeatureOptions = {
//    darkMode: boolean;
//    newUserProfile: boolean;
//}
```

**映射修饰符**

有两个额外的修饰符可以在映射期间使用，readonly影响可变性，? 影响可选性

通过`- 或 +`增加/移除这些修饰符，如果不添加前缀，默认为`+`

![image-20211012192809256](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012192809256.png)

**使用as重新映射 映射类型中的键**

即给键名重新命名

```typescript
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]:Type[Properties]
}
```

利用模板字符串，获取新属性名

```typescript
type Getter<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
}

interface Person {
    name: string;
    age: number;
    location: string;
}
 
type LazyPerson = Getter<Person>;
```

### 

### this

**this 参数**

在 TS 中 this 作为参数具有特殊含义，转为 JS 时，这个参数会被擦除 

![image-20211012210646026](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012210646026.png)

在类中，除了使用箭头函数让this指向当前class，我们还可以在方法添加一个this参数去强制正确调用该方法。

```typescript
class MyClass {
  name = "MyClass";
  getName(this: MyClass) {
    return this.name;
  }
}
const c = new MyClass();
// 输出 MyClass 调用正常
c.getName();

// Error, would crash
const g = c.getName;
console.log(g());
//类型为“void”的 "this" 上下文不能分配给类型为“MyClass”的方法的 "this"。
```

## 
````

