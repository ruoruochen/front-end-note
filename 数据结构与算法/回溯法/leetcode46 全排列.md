# leetcode46 全排列

给定一个 **没有重复** 数字的序列，返回其所有可能的全排列。

**示例:**

```
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

**解题思路：**

分析题目可知为树形问题，可以使用回溯算法。且每一个数字只能选择一次，故我们需要使用一个变量记录数字是否被选择过。

**使用刻意练习的思路思考：**

1、递归树和状态变量。状态变量为新数组。

![image-20210315145416093](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210315145416093.png)

2、递归出口 len === n

3、选择列表 for循环 如果数字被选过，则continue。选择该数字，标记

4、剪枝 ：不能选重复的

5、撤销：for 循环中撤销，pop并取消标记。

```js
var permute = function (nums) {
  let len = nums.length;
  const res = [];
  const used = [];

  var dfs = function (temp) {
    if (temp.length === len) {
      return res.push(temp.slice());
    }

    for (let i = 0; i < len; i++) {
      if (used[nums[i]]) continue;
      used[nums[i]] = true;
      temp.push(nums[i]);
      dfs(temp);
      temp.pop();
      used[nums[i]] = false;
    }
  }

  dfs([]);
  return res;
};
```

