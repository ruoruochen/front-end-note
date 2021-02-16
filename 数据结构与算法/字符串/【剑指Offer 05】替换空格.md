# 替换空格

## 题目

请实现一个函数，把字符串 `s` 中的每个空格替换成"%20"。

**示例 1：**

```
输入：s = "We are happy."
输出："We%20are%20happy."
```

**限制：**

```
0 <= s 的长度 <= 10000
```

## 思路

#### 方法1 空格将字符串切割成数组 再用`20%`进行连接。

```js
var replaceSpace = function (s) {
  return s.split(' ').join("%20");
};
```

![image-20210216114634301](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210216114634301.png)

#### 方法2 使用正则表达式

用正则表达式找到所有空格依次替换

```js
var replaceSpace = function (s) {
  return s.replace(/\s/g, '%20');
};
```

![image-20210216114806214](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210216114806214.png)