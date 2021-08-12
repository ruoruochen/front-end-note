# 连续子数组的最大和

剑指Offer42:[连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)

## 题目

输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值，要求时间复杂度为`O(n)`

例如:`{6,-3,-2,7,-15,1,2,2}`,连续子向量的最大和为8(从第0个开始,到第3个为止)。

## 思路

记录一个当前连续子数组最大值 `max` 默认值为数组第一项

记录一个当前连续子数组累加值 `sum` 默认值为数组第一项

1.从数组第二个数开始，若 `sum<0` 则当前的`sum`不再对后面的累加有贡献，`sum = 当前数`

2.若 `sum>0` 则`sum = sum + 当前数`

3.比较 `sum` 和 `max` ，`max = 两者最大值`

```js
var maxSubArray = function (nums) {
  if (nums && nums.length > 0) {
    var sum = nums[0];
    var max = nums[0];
    for (let i = 1; i < nums.length; i++) {
      if (sum < 0) {
        sum = nums[i];
      } else {
        sum = sum + nums[i];
      }

      if (sum > max) {
        max = sum;
      }
    }
    return max;
  }
  return 0;
};
```

![image-20210114094622296](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114110307145.png)

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)

