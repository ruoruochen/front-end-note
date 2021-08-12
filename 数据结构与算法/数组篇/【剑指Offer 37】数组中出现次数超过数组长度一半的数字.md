# 数组中出现次数超过数组长度一半的数字

## 题目

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。

## 思路

### 解法1

map存储，开辟一个额外空间存储每个值出现的次数，时间复杂度最大为O(n)，逻辑简单。

```js
var majorityElement = function (nums) {
  if (nums && nums.length > 0) {
    var length = nums.length;
    var map = {};
    for (let i = 0; i < length; i++) {
      if (map[nums[i]]) {
        map[nums[i]]++;
      } else {
        map[nums[i]] = 1;
      }
      if (map[nums[i]] > length / 2) {
        return nums[i];
      }
    }
  }
  return 0;
};
```

![image-20210114092832417](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114092832417.png)

**时间复杂度：O(n)**

**空间复杂度：O(n)**

### 解法2

目标值的个数比其他所有值加起来的数多

记录两个变量 1.数组中的某个值 2.次数

1.当前遍历值和上一次遍历值相等？次数+1 ： 次数-1。

2.次数变为0后保存新的值。

3.遍历结束后保存的值,判断其是否复合条件

事件复杂度O(n) 不需要开辟额外空间 , 逻辑稍微复杂。

```js
var majorityElement = function (nums) {
  if (nums && nums.length > 0) {
    var target = nums[0];
    var count = 1;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] === target) {
        count++;
      } else {
        count--;
      }

      if (count === 0) {
        target = nums[i];
        count = 1;
      }
    }
    count = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] === target) {
        count++;
      }
    }
    return count > nums.length / 2 ? target : 0;
  }
  return 0;
};
```

![image-20210114093524689](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114093524689.png)

**时间复杂度O(n²）**

**空间复杂度O(1)**

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)

