# 宝石与石头

## 题目

给定字符串J 代表石头中宝石的类型，和字符串 S代表你拥有的石头。 S 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。

J 中的字母不重复，J 和 S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。

**示例 1:**

```
输入: J = "aA", S = "aAAbbbb"
输出: 3
```

**示例 2:**

```
输入: J = "z", S = "ZZ"
输出: 0
```

**注意:**

- S 和 J 最多含有50个字母。
- J 中的字符不重复。

## 代码

#### 解法1:indexOf寻找字符下标

```js
var numJewelsInStones = function (jewels, stones) {
  let count = 0;
  for (let i = 0; i < jewels.length; i++) {
    let char = jewels[i];
    var temp = stones;
    let index = temp.indexOf(char);
    while (index != -1) {
      count++;
      index = temp.slice(index + 1).indexOf(char);
    }
  }
  return count;
};
```

![image-20210202195023544](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210202195023544.png)

**时间复杂度:O(m*n)**

#### 解法二：哈希集合

![image-20210202200101995](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210202200101995.png)