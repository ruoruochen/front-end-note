# leetcode 40 组合总和2 

给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

**说明：**

- 所有数字（包括目标数）都是正整数。
- 解集不能包含重复的组合。 

**示例 1:**

```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
```

**解题思路：**

分析本题所采用的数据结构与算法，可知属于树形问题，采用回溯法。

- 对数组进行从小到大的排序。
- 每个数字只有取和不取两种状态，分别搜索。

**按照刻意练习的思路思考：**

1、递归树和状态变量。状态变量：当期值下标、总和、新数组

![image-20210314163518591](C:%5CUsers%5CAsus%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210314163518591.png)

2、递归出口：sum === target push

3、选择列表： for循环当前下标+1后的元素 

4、剪枝：sum>target return

5、撤销操作：for循环中pop

```js
var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  var len = candidates.length;
  const res = [];

  var dfs = function (sum, start, temp) {
    if (sum === target) {
      res.push(temp.slice());
    }
    if (sum > target) {
      return;
    }
    for (let i = start; i < len; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      temp.push(candidates[i]);
      dfs(sum + candidates[i], i + 1, temp);
      temp.pop();
    }
  }
  dfs(0, 0, []);
  return res;
};

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));

```

