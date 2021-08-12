# 【leetcode 42】接雨水

### 题目

给定 *n* 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

**示例 1：**

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/rainwatertrap.png)

```
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
```

### 解决思路

**概念：**

```
left_max: 左边的最大值，它是从左往右遍历找到的
right_max: 右边的最大值，它是从右往左遍历找到的
left: 从左往右处理的当前下标
right: 从右往左处理的当前下标
```

解题思路：根据短板效应，我们可以得出一个结论，在某个位置i处，它能存的水，取决于它左右两边的最大值中最小的一个。

- 当我们从左往右处理left下标时，对于left来说，leftMax是真实有效的，但是他不能保证rightMax是真的最大值，因为有可能没有遍历到的中间存在更大的值。

- 当我们从右往左处理right下标时，对于right来说，rightMax是真实有效的，但是他不能保证leftMax是真的最大值，同上面原因。

这时候我们可以得出一个结论，对于left下标而言，左边最大值一定为leftMax，右边最大值一定>=rightMax；同理，对于right下标而言，右边最大值一定是rightMax，左边最大值一定>=leftMax。

**最终思路：**

我们进行一个循环，当left < right 

（积水都是从低位开始积的这个道理，大家都明白吧）

判断左右left right的高度，哪个低，先计算它积水的多少，然后移动指针，继续比较高度。

```js
var trap = function (arr) {
  let left = 0;
  let right = arr.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let count = 0;

  while (left < right) {
    if (arr[left] < arr[right]) {
      leftMax = Math.max(leftMax, arr[left]);
      count += leftMax - arr[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, arr[right]);
      count += rightMax - arr[right];
      right--;
    }
  }
  return count;
}

console.log(trap([4, 2, 0, 3, 2, 5]));

```

