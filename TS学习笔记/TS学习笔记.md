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
  value(); // rror
  ```

### 1.8 Tuple元组类型

#### 1. 元组类型

元组类型：长度和元素类型都确定的数组。

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

我们开发者比TS更了解某个实体的类型，此时使用**类型断言**给该实体指定类型。

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

## 五、TS 函数

### 5.1 参数类型和返回类型

```typescript
function createUserId(name: string, id: number): string {
  return name + id;
}
```

### 5.2 函数类型

```typescript
let IdGenerator: (chars: string, nums: number) => string;

function createUserId(name: string, id: number): string {
  return name + id;
}

IdGenerator = createUserId;
```

### 5.3 可选参数和默认参数

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

### 5.4 函数重载

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

````temp
**Call Signatures 呼叫签名** TODO ？？？

在`TS`的函数类型表达式中不允许声明属性，此时我们可以使用 call signature 来给函数增加属性

```ts
type DescribableFunction = {
  description: string
  //左边为方法和接收参数 右边为返回值
  (someArg: number): boolean
}
//接受一个参数
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + ' returned ' + fn(6))
}
```

注：此时的函数类型表达式，参数和返回类型之使用 ：而非 =>
````

## 六、TS 接口

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

相同：可以定义对象的形状

不同点：接口可进行声明合并，类型别名不行。

## 七、TS 类

### 7.1 类的属性和方法

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

> - QUES：成员属性与静态属性，成员方法与静态方法的区别 TODO

### 7.2 成员访问修饰符

TypeScript 可以使用三种访问修饰符，分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认 `public` 
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问。但允许在类型检查期间，在类外使用括号表示法进行访问

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

**私有字段#**

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

### 

**继承中的方法覆盖**

子类需要遵循其基类的契约，例如父类的一个方法不接收参数，子类的同名方法不能强制required参数，可以使用可选。

因为我们常通过基类引用派生类。

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

假设，我们就是不遵守父类的契约，会发生什么？

![image-20211012200834596](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012200834596.png)

并且

```typescript
const b: Base = new Derived();
// Crashes because "name" will be undefined
b.greet();
```

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

### 参数属性

TS 提供了特殊的语法来将构造函数参数转换为具有相同名称和值的类属性。这些被称为*参数属性*

![image-20211012211732863](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012211732863.png)

### 类表达式

![image-20211012211912939](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012211912939.png)

#### 抽象类及其成员

抽象类：提供抽象方法，不可实例化，作为基类存在。`abstract`修饰抽象类和抽象方法

![image-20211012212057078](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012212057078.png)

## 





**通用函数、泛型**

在 TypeScript 中，当我们想要描述两个值之间的对应关系时，会使用*泛型*。我们通过在函数签名中声明一个类型参数来做到这一点：

**泛型都是将两个或多个具有相同类型的值关联起来，一个就没必要啦！**

```ts
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

**指定类型参数**

```ts
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
```

当我们参数不匹配时，将报错。

```ts
const arr = combine([1, 2, 3], ["hello"]);
// Type 'string' is not assignable to type 'number'.
```

解决：手动指定类型参数，即手动传Type

```ts
const arr = combine<string | number>([1, 2, 3], ["hello"]);
// ☑
```



**Function中的this声明**

```ts
// 1、☑
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
 
const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});

//2、✘ can not use arrow function
const db = getDB();
const admins = db.filterUsers(() => this.admin);
```

**参数结构**

```ts
function sum({ a, b, c }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });

//参数类型注释
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

//或者使用命名类型
// Same as prior example
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

**void 作为返回值**

void 作为函数返回值时，函数在实现时还是可以返回值的，只不过会被忽略。







**对象类型**

对象属性描述

```ts
// The parameter's type annotation is an object type
function printCoord(pt: { x: number,y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

可选属性

```ts
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

注：读取可选属性前需要判断是否为undefined

1. 

**文字类型**

const 声明，将不会进行类型扩展。

```ts
const constantString = "Hello World";

constantString;// 类型： "Hello World"
```

let/var 声明，会进行类型扩展。(被扩展为通用类型)

```ts
let changingString = "Hello World";

changingString; //类型：'string'
```

在类型位置引用特定的字符串和数字作为类型

```ts
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

**文字推理**

TS会对变量类型自动推理

```ts
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

原因：method被推理为string，此时handleRequest接受的第二个参数采用文字类型，不匹配。

解决方案：

1. 类型断言。(1)让method拥有文字类型“GET" (2)调用中我提前知道method是文字类型”GET“

   ```ts
   // Change 1:
   const req = { url: "https://example.com", method: "GET" as "GET" };
   // Change 2
   handleRequest(req.url, req.method as "GET");
   ```

2. const 断言。对象内属性不会进行类型扩展。

   ```ts
   const req = { url: "https://example.com", method: "GET" } as const;
   handleRequest(req.url, req.method);
   ```

**枚举enum**

了解有这个类型即可。

```js
enum UserResponse {
  No = 0,
  Yes = 1,
}
 
function respond(recipient: string, message: UserResponse): void {
  // ...
}
 
respond("Princess Caroline", UserResponse.Yes);
```

## Narrowing 缩小





## 对象类型

**定义对象类型的方法**

1、匿名对象

```ts
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
```

2、接口命名

```ts
interface Person {
  name: string;
  age: number;
}
 
function greet(person: Person) {
  return "Hello " + person.name;
}
```

3、类型别名

```ts
type Person = {
  name: string;
  age: number;
};
 
function greet(person: Person) {
  return "Hello " + person.name;
}
```

**属性修饰符**

对象类型的属性可以包含：类型、属性是否可选？、是否可写入。

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

解构赋值，赋予默认值

```ts
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
                                  
(parameter) xPos: number
  console.log("y coordinate at", yPos);
                                  
(parameter) yPos: number
  // ...
}
```

前一个被重新定义为后面的名。

接受属性shape，被重新定义名字为Shape，xPos被重新定义为number。

```ts
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  render(shape);
  // Cannot find name 'shape'. Did you mean 'Shape'?
  render(xPos);
  // Cannot find name 'xPos'.
}
```

readonly 修饰符

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
  // But we can't write to the 'resident' property itself on a 'Home'.
  home.resident = {
Cannot assign to 'resident' because it is a read-only property.
    name: "Victor the Evictor",
    age: 42,
  };
}

```

**索引签名 Index Signatures**

有时候我们不知道类型属性的所有名称，但是我们知道它的key类型对应的可能值类型。这时候可以使用索引签名来描述可能值的类型。

```typescript
//这是一个带有索引签名的接口，当索引为number类型时，返回string
interface StringArray {
    [index: number] : string;
}

const myArray:StringArray = getStringArray();
const secondItem = myArray[1];
// const secondItem: string
```

**索引签名属性类型必须为字符串/数字**

**扩展类型**

```ts
interface AddressWithUnit {
  name?: string;
  unit: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

//单类型扩展
interface AddressWithUnit extends BasicAddress {
  unit: string;
}

//多类型扩展 ,分割
interface Colorful {
  color: string;
}
 
interface Circle {
  radius: number;
}
 
interface ColorfulCircle extends Colorful, Circle {}
 
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

**通用对象类型**

场景：一个Box可以包含任何值，有一个函数以Box为参数，需要对不同类型的contents类型进行处理，如何实现？

```ts
interface Box {
  contents: any;
}
```

1、Bad ✘

为每种类型Box，定义单独的接口，通过函数重载实现。

```ts
interface NumberBox {
  contents: number;
}
interface StringBox {
  contents: string;
}
interface BooleanBox {
  contents: boolean;
}

// 函数重载
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
  box.contents = newContents;
}
```

2、good ☑

Box接口的类型参数为泛型。

```ts
interface Box<Type>{
    content:Type
}

//创建不同的box
let StringBox:Box<string> = {content:'hello world'};

// Box可以实现很大程度的复用
interface Apple{
	//....    
}
type AppleBox = Box<Apple>

//方法也通过泛型实现，无需重载
function setContents<Type>(box:Box<Type>,newContents:Type){
    box.contents = newContents;
}
```



接口、类型别名均能使用泛型

```ts
type Box<Type> = {
  contents: Type;
};
```

我们可以用泛型来编写泛型辅助类型

```ts
type OneOrMany<Type> = Type || Type[];
```

**Array类型**

创建Array

1、字面量

```ts
let arr = [1,2,3];
let arr:number[] = [1,2,3];
let arr:Array<number> = [1,2,3];
```

2、new

```ts
let arr = new Array("1","2","3")
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

没有ReadonlyArray这个构造函数，我们不能New ReadonlyArray(xx1,xx2....)

但是我们可以把一个常规的Arrays分配给ReadonlyArray

```ts
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
```

`Array<Type>`的简写为`Type<>`，而`ReadonlyArray<Type>`的简写为`readonly Type[]`

**Readonly<T>**

`Readonly` 会接收一个 *泛型参数*，并返回一个完全一样的类型，只是所有属性都会被 `readonly` 所修饰。

## 类型操作

### 泛型

#### **泛型接口**

```ts
//泛型接口+call签名
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn<number> = identity;
```

#### **泛型类**

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

#### **泛型约束**

```ts
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  //报错 'length' does not exist on type 'Type'.
  return arg;
}
```

我们希望将这函数限制为有Length属性的。

```ts
interface Lengthwise{
    length:number;
}

function loggingIdentity<Type extends Lengthwise>(arg:Type):Type{
  console.log(arg.length);
  return arg;
}
```

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

**使用泛型创建工厂模式**

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

**泛型参数的默认类型**

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

### Keyof 类型运算符

![image-20211012165857842](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012165857842.png)

如果类型具有`string`或`number`索引签名，`keyof`则将返回这些类型：

![image-20211012165918031](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012165918031.png)

### Typeof 类型运算符

使用 typeof 运算符引用**变量/属性的类型**，不能用在泛型

![image-20211012170132271](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012170132271.png)

应用：我们想知道某个函数的返回值究竟是什么。

API:`ReturnType<x>`，接受一个函数类型，并返回它的返回类型。

1、直接将函数 f 传给 ReturnType 报错。✘

![image-20211012170442802](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012170442802.png)

2、将 typeof 传给 ReturnType ☑

![image-20211012170526475](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012170526475.png)

### 索引访问类型

1、使用索引访问特定属性

![image-20211012170954764](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012170954764.png)

2、索引类型本身就是一种类型，所以我们可以使用 keyof 以及其他类型（例如|）

![image-20211012171047159](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012171047159.png)

3、若使用索引不存在的属性，Error

4、使用`number`索引，配合可以获取**数组元素的类型**

![image-20211012171450441](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012171450441.png)

```typescript
let arr = string[];
type Array = arr[number]
```



5、只能在索引中使用类型type，不能使用const进行变量引用

![image-20211012172300221](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012172300221.png)

### 条件类型

**extends**

如果`T`包含的类型 是 `U`包含的类型的 **'子集'**，那么取结果`X`，否则取结果`Y`。

```typescript
T extends U ? X : Y
```

类似于三元表达式，一个简单使用，如果Dog是Animal的子类，则Exmaple1 type为number.....

![image-20211012173106244](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012173106244.png)

应用：

一个createLabel函数，接受为number/string，此时使用函数重载实现.

![image-20211012173342086](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012173342086.png)

使用条件类型修改：

```typescript
type NameOrId<T extends number|stirng> = T extends number?IdLabel : NameLabel;

function createLabel<T extends number|string>(idOrName:T):NameOrId<T>{
    throw "unimplemented";
}
```

![image-20211012173928731](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012173928731.png)

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

语句分析：如果T类型是接受一些参数的函数，则返回这个参数的类型，否则返回T。

**条件类型约束**

希望效果：获取message，如果没有message 类型为never

```typescript
type MessageOf<T> = T["message"];
//ERROR：Type '"message"' cannot be used to index type 'T'.
```

原因：T不一定有message属性。

修改：约束T的范围，判断 T 是否有 message ，没有则nerver。

```typescript
type MessageOf<T> = T extends {message:unknown} ? T["message"]:never;

interface Email {
  message: string;
}
 
interface Dog {
  bark(): void;
}
type EmailMessageContents = MessageOf<Email>;          
//type EmailMessageContents = string
type DogMessageContents = MessageOf<Dog>;          
//type DogMessageContents = never
```

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

### 模板文字类型

#### `Uppercase<StringType>`

将字符串转大写

#### `Lowercase<StringType`

将字符串转小写

#### `Capitalize<StringType>`

将字符串第一个字符转大写，其他不变。

#### `Uncapitalize<StringType>`

将字符串第一个字符转小写，其他不变。

## 模块

TS 使用`import type`用于类型的导入。

![image-20211012213126734](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211012213126734.png)

导入时内联 type 表明引入的是类型

```typescript
// @filename: app.ts
import { createCatName, type Cat, type Dog } from "./animal.js";
 
export type Animals = Cat | Dog;
const name = createCatName();
```

## 内置类型别名

#### Partial< Type >

`Partial<Type>`：将某个类型的属性全变为可选项。

#### Required< Type >

`Required<Type>`：将某个类型的属性全变为必选项。

#### Readonly< Type >

`Readonly<Type>`：将某个类型所有属性变为只读属性

#### Record< Keys,Type >

`Record<Keys,Type>`：将 K 中所有的属性的值转化为 T 类型。

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

#### Pick < Type,Keys >

`Pick <Type,Keys> `：从Type中取出一组属性Keys构造新的类型。

#### Omit< Type,Keys >

`Omit<Type,Keys>`：从Type中删除Keys属性，构造类型。

#### Exclude< Type,ExcludedUnion >

`Exclude<Type,ExcludedUnion> `：获取Type类排除ExcludedUnion后的联合成员。

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

#### Extract< Type,Union >

`Extract<Type,Union>`：获取Type可分配给Union的联合成员，即求同。

#### NonNullable< Type >

`NonNullable<Type>`：排除Type中的null、undefined后，得到的类型。

#### Parameters< Type >

`Parameters<T>`：获得函数的参数类型组成的元组类型。

#### ConstructorParameters< Type >

`ConstructorParameters<Type>`：获取构造函数参数类型的元组类型。

#### ReturnType< Type >

`ReturnType<T>`：获取函数 Type 的返回类型。

#### InstanceType< Type >

`InstanceType<Type>`：获取构造函数类型的实例类型。

#### ThisParameterType< Type >

`ThisParameterType<Type>`：获取函数的this参数的类型

#### OmitThisParameter< Type > TODO

#### ThisType< Type>

`ThisType<T>`：指定上下文对象类型