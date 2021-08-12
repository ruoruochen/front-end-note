# leetcode 47全排列2

给定一个可包含重复数字的序列 `nums` ，**按任意顺序** 返回所有不重复的全排列。

 **示例 1：**

```
输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

**解题思路：**

这道题我们可以看成填写一个n列的空格，我们需要从左往右填写n个数，每个数只能填一次，我们自然而然地想到穷举，可以画出一个递归树，该题目为树形问题，故可以采取回溯法。

- 由于每个数只能填一次，我们需要使用标记数组来标记数字是否填过。由于为可重复数组，我们需要为每一个元素都做一个标记，故使用数组设为false。
- 由于需要去重，我们需要降序排序。

**刻意练习的思路来思考：**

1、递归树和状态变量。状态变量，当前填写的空格位置Index，新数组temp。

![image-20210316070558120](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210316070558120.png)

2、递归出口：两种选其一：当新数组长度===len    或 index ==len

3、选择列表：for循环遍历选择数组，

4、剪枝：

- ​	如果 i >0 且当前元素与上一元素相同，且上一元素已被使用，则continue

  >i > 0 是防止 nums[i-1]索引<0

- 如果used[i] ===false 即，当前元素已被选过，则 continue

5、撤销：在for中撤销 ，pop 和 use恢复false

```js
var permuteUnique = function (nums) {
  const len = nums.length;
  nums.sort((a, b) => a - b)
  const res = [];
  const used = new Array(len).fill(false);

  var dfs = function (index, temp) {
    if (index == len) {
      return res.push(temp.slice());
    }

    for (let i = 0; i < len; i++) {
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
      if (used[i]) continue;
      used[i] = true;
      temp.push(nums[i]);
      dfs(index + 1, temp);
      temp.pop();
      used[i] = false;
    }
  }

  dfs(0, []);
  return res;
};
```

