## :x:EASY 

#### 4 实现Pick

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

