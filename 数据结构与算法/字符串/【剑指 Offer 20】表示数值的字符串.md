# 表示数值的字符串

## 题目

请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100"、"5e2"、"-123"、"3.1416"、"-1E-16"、"0123"都表示数值，但"12e"、"1a3.14"、"1.2.3"、"+-5"及"12e+5.4"都不是。

## 思路

#### 解法一 ：使用trim方法

字符串去除空格。

如果不存在，返回false，

如果存在，转换成Number，判断是否为NaN。

```js
var isNumber = function(s) {
  return s.trim()?!isNaN(Number(s)):false
};
```

或

```js
var isNumber = function(s) {
    if(!s.trim()) return false
    return Number(s).toString() !== 'NaN'
};

```