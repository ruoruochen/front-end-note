# 第一个只出现一次的字符

剑指Offer:[第一个只出现一次的字符](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)

## 题目

在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

**示例:**

```
s = "abaccdeff"
返回 "b"

s = "" 
返回 " "
```

## 思路

### 解法1

用一个`map`存储每个字符出现的字数

第一次循环存储次数，第二次循环找到第一个出现一次的字符。

时间复杂度`O(n)`、空间复杂度`O(n)`

```js
var firstUniqChar = function (s) {
  if (!s) {
    return " ";
  }
  const countMap = {};
  const arr = s.split("");
  for (let i = 0; i < s.length; i++) {
    let current = arr[i];
    let count = countMap[current];
    countMap[current] = count ? count + 1 : 1;

  }
  for (let i = 0; i < s.length; i++) {
    if (countMap[arr[i]] === 1) {
      return arr[i];
    }
  }
  return " ";
};
```

![image-20210114110307145](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114110536085.png)

### 解法2

使用`js`的`array`提供的`indexOf`和`lastIndexOf`方法

遍历字符串，比较每个字符第一次和最后一次出现的位置是否相同。

`indexOf`的时间复杂度为`O(n)`，所以整体的时间复杂度为O(n2)，空间复杂度为`0`。

```js
var firstUniqChar = function (s) {
  if (!s) {
    return " ";
  }
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      return s[i];
    }
  }
  return " ";
};
```

![image-20210114110536085](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114103919035.png)