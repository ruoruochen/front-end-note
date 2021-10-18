# 前言

记录TS体操类型，一开始不会的体操及其题解

## :x:EASY 

#### 4 实现**Pick**

![image-20211014112157258](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211014112157258.png)

```typescript
type MyPick<Type,Key in keyof Type> = {
    [W in Key] : Type[W]
}
```

#### 11 元组转换为对象

![image-20211014112319917](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211014112319917.png)

使用 T[number]，可以获取数组元素的类型，即："tesla" | "model 3" | "model X" | "model Y"

```typescript
type TupleToObject<T extends readonly any[]> = {
  [i in T[number]]:i
}
```

#### 第一个元素

![image-20211014171444878](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211014171444878.png)

判断T["length"]的长度是否等于0

```typescript
type First<T extends any[]> = T["length"] extends 0?never:T[0];
```

#### Exclude

![image-20211015104722931](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211015104722931.png)

如果T是U的子集，返回never，如果不是返回T。

```typescript
type MyExclude<T, U> = T extends U ? never:T;
```

理解：

被检查类型（即上述的T）是**裸类型参数**的条件类型称**分布条件类型**。

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

#### Awaited

![image-20211015110859077](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211015110859077.png)

Awaited接受一个泛型，这个泛型的基本类型是`Promise<any>`，通过infer推理Promise的返回类型，返回。

```typescript
type Awaited<T extends Promise<any>> = T extends Promise<infer U>?U:never
```

#### Include

![image-20211015113157234](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211015113157234.png)

递归查找。获取数组的第一个元素和剩余元素，比较第一个元素与T，相等返回true，不相等递归Includes查找。

```typescript
type Includes<U extends any[], T> = U extends [infer R, ...infer F] ? Equal<R, T>  extends true ? true : Includes<F, T> :false
```

#### Parameters

![image-20211015141647974](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211015141647974.png)

```typescript
type MyParameters<T extends (...args : any[]) => any> = T extends (...args:infer Args)=>any?Args:never;
```

## :x:Middle 

#### 2 - 获取函数返回类型

![image-20211015142941984](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211015142941984.png)

MyReturnType 一个泛型参数，为接收任意参数的函数，通过infer获取返回值 返回。

```typescript
type MyReturnType<T extends (...arg:any)=>any> = T extends (...arg:any)=>infer U?U:never
```

#### 3 - 实现 Omit

![image-20211015160139787](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211015160139787.png)

```typescript
type MyOmit<T, K extends keyof T> = {
  [i in Exclude<keyof T,K>]:T[i]
}
```

#### Readonly 2 TODO!

![image-20211015160815675](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211015160815675.png)

使用交集类型`&`，K的默认值：T的key值的联合类型

```typescript
type MyReadonly2<T, K extends keyof T = keyof T> = T & {
  readonly [P in K]:T[P];
} 
```

#### 深度 Readonly

![image-20211016111331414](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211016111331414.png)

索引签名 + 条件类型 + infer推理

```typescript
type DeepReadonly<T> = T extends {[propName:string]:infer R}?{readonly [i in keyof T]:DeepReadonly<T[i]> }:T;
```

#### 数组转联合类型

![image-20211016112038618](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211016112038618.png)

思路：使用索引访问类型进行实现，获取索引为number类型对应的值，即得到联合类型

```typescript
type TupleToUnion<T extends any[]> = T[number]
```

#### 可串联构造器

![image-20211016113629617](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211016113629617.png)

```typescript
type Chainable<T extends {} = {}> = {
  option<K extends string = string, V = any>(key: K, value: V): Chainable<T & { [P in K]: V }>
  get(): T
}
```

#### 最后一个元素

![image-20211016163744840](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211016163744840.png)

解法一：将T元素展开，取最后一个元素

解法二：使用剩余运算符接受前面的元素，推断最后一个元素，返回。

```typescript
//解法1
type Last<T extends any[]> = [never,...T][T["length"]]
//解法2
type Last<T extends any[]> = T extends [...infer R, infer L] ? L : never
```

#### Promise.all

![image-20211016170358373](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211016170358373.png)

```typescript
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>
```

#### Type Lookup

![image-20211016171816842](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211016171816842.png)

原思路：

遍历联合类型U，对比每个的type和T是否相等
问题1：如何遍历联合类型？ **解答：通过分布条件类型，会映射到各个联合成员上**
问题2：如果判断是否相等？**解答：通过{type:infer R}获取到type的属性值R，在通过R extends T判断是否相等**

```typescript
type LookUp<U, T extends string> = U extends {type:infer R}?R extends T?U:never:never;
```

#### Trim Left

![image-20211016172954792](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211016172954792.png)

思路：extends 某种格式，`${ignore}${infer R}` 再对剩下的R去trim。

**小结：**

- 在JS中，我们惯性思维是遍历后，符合某个条件进行操作。
- 而TS中，我们一般是extends 某个格式（${ignore}${infer R}），然后在进行递归操作。一般是配合extends和infer

```typescript
type ignore =' ' | '\t' | '\n';
type TrimLeft<S extends string> = S extends `${ignore}${infer R}` ? TrimLeft<R> : S;
```

#### Capitalize

![image-20211016193144227](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211016193144227.png)

```typescript
//是否有字符，有，则第一个转大写，如果没有，直接返回
type Capitalize<S extends string> = S extends `${infer C}${infer R}` ? `${Uppercase<C>}${R}` : S
```

#### Replace

![image-20211017094948163](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017094948163.png)

```typescript
// 判断From是否为空字符串，是，直接返回S
// 不是，找到第一个匹配上From的，转为To
type Replace<S extends string,From extends string,To extends string> = From extends ''? S
  : S extends `${infer F}${From}${infer R}`
  ? `${F}${To}${R}`: S
```

#### ReplaceAll

![image-20211017095831617](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017095831617.png)

```typescript
type ReplaceAll<S extends string, From extends string, To extends string> =  From extends ""?S:S extends `${infer U}${From}${infer R}`?
`${ReplaceAll<U,From,To>}${To}${ReplaceAll<R,From,To>}`:S;
```

#### 追加参数

![image-20211017100309634](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017100309634.png)

```typescript
type AppendArgument<Fn, A> = Fn extends (...args:infer U)=>infer T?
(...args:[...U,A])=>T:Fn;
```

#### Permutation 排列组合

![image-20211017101534758](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017101534758.png)

```typescript
// 利用联合类型的分布条件类型，使用Exclude从U中排除当前T，递归情况。
type Permutation<T, U = T> = [T] extends [never] ? [] : T extends T ? [T, ...Permutation<Exclude<U, T>>] : never;
```

#### Length of String 求String的长度

![image-20211017102603125](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017102603125.png)

将第一个字符放入数组后，递归取出字符串中的字符放入数组中

```typescript
type StrToArr<S extends string> = S extends `${infer Head}${infer Rest}`
  ? [Head, ...StrToArr<Rest>]
  : []
type LengthOfString<S extends string> = StrToArr<S>['length']
```

#### Flatten 拍平数组

![image-20211017103604010](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211017103604010.png)

```typescript
// 遍历数组，如果是数组，递归拍平
type Flatten<T extends any[]> = T extends [infer R, ...infer U]
  ? R extends any[]
    ? [...Flatten<R>, ...Flatten<U>]
    : [R, ...Flatten<U>]
  : []
```

#### Append to object 追加对象属性

![image-20211018083938063](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018083938063.png)

方法：遍历T中的key 外加U，组成一个新的对象

```typescript
type AppendToObject<T extends object, U extends string, V extends any> = {
  [K in (keyof T | U)]:K extends keyof T?T[K]:V;
}
```

**为什么不能直接使用`&`交集类型**

使用`&`类型并没有直接返回一个新的对象。

#### Absolute 绝对值

![image-20211018090054590](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018090054590.png)

T是否能匹配上负号，如果匹配上，取负号以外的值；否则，转字符串输出。

```typescript
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}`?`${U}`:`${T}`
```

#### String to Union 

![image-20211018092001975](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018092001975.png)

通过extends匹配出一个一个字符，使用`|`拼接

```typescript
type StringToUnion<T extends string> = T extends `${infer A}${infer B}` ? A | StringToUnion<B> : never
```

#### Merge 合并类型属性

![image-20211018093035729](C:%5CUsers%5CAsus%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20211018093035729.png)

```typescript
type Merge<T extends object,U extends object>={
  [K in keyof(T & U)]:K extends keyof U?U[K]:K extends keyof T?T[K]:never
}
```

#### CamelCase 

![image-20211018100148920](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20211018100148920.png)

```typescript
// 驼峰 
// 1、判断S是否满足`xxx-xxx`格式，不满足直接返回S
// 2、判断S是否为首字符大写模式，若是，则保留-，继续递归驼峰
// 3、不是大写模式，移除-,递归驼峰
type CamelCase<S extends string> =S extends `${infer first}-${infer rest}`? rest extends Capitalize<rest>?
  `${first}-${CamelCase<rest>}`:`${first}${Capitalize<CamelCase<rest>>}`:S;
```

### 小结

#### 联合类型与其他类型的相互转换

##### 联合类型与数组

```typescript
type union = 'Hi' | 'Hello';
type arr = [union]
```

2、数组转联合类型

通过const断言，让其类型不扩展。

再使用typeof arr[number]，获取到每一个索引的类型，即字符串本身

```typescript
const arr = ['name', 'age', 'location', 'email'] as const;
type A = typeof arr[number];//'name' | 'age' | 'location' | 'email'
```

##### 联合类型与字符串

1、字符串转联合类型

通过extends匹配出一个一个字符，使用`|`拼接

```typescript
type StringToUnion<T extends string> = T extends `${infer A}${infer B}` ? A | StringToUnion<B> : never
```

