# leetcode 39 组合总和

给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

**说明：**

所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 
**示例 1：**

```
输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[
  [7],
  [2,2,3]
]
```

**解题思路：**

我们来思考一下题目是需要使用什么数据结构和算法。首先要求总和，就是在所给数组中进行选择，可以形成一颗树形结构，为树形问题，故可以采取回溯法来解决。

**按照刻意练习的思路思考：**

1、递归树和状态变量。状态变量为当前值下标、当前和、新数组。

![image-20210314161444720](C:%5CUsers%5CAsus%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210314161444720.png)

2、递归出口：sum === target push

3、选择列表 for循环当前下标后的数组 push进temp中，递归下一层

4、剪枝：sum>target return

5、撤销 for中撤销 pop

```js
var combinationSum = function (candidates, target) {
  let len = candidates.length;
  const res = [];

  var dfs = function (sum, index, temp) {
    if (sum === target) {
      res.push(temp.slice());
    }
    if (sum > target) {
      return;
    }
    for (let i = index; i < len; i++) {
      temp.push(candidates[i]);
      dfs(sum + candidates[i], i, temp);
      temp.pop();
    }
  }

  dfs(0, 0, []);
  return res;
};


console.log(combinationSum([2, 3, 6, 7], 7));

```

