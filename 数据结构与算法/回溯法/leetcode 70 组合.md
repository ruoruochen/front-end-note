# leetcode 77 组合

给定两个整数 *n* 和 *k*，返回 1 ... *n* 中所有可能的 *k* 个数的组合。

**示例:**

```
输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

**解题思路**

看到题目首先思考使用什么算法、使用什么数据结构。n个数中选k个，每个数字有两种状态，被选或没被选，那么这个时候，我们会发现这个题目的是树形问题。

以n=4，k=2为例，当我们选择数字1，第二个数字的选择只能是2，3，4，形成了一个选择树形，故我们锁定，本题的解题思路采用回溯法。

**使用刻意练习的思路思考：**

1、递归树，状态变量：当前所在数值、新数组。

![image-20210314155703006](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210314155703006.png)

2、递归出口：当新数组长度 === k

3、选择列表：从当前所在数值向后搜索，加入新数组

4、剪枝：暂无

5、撤销：当前值加入新数组后，回溯时需要撤销

```js
var combine = function (n, k) {
  const res = [];
  var dfs = function (start, temp) {
    if (temp.length === k) {
      return res.push(temp.slice());
    }
    for (let i = start; i <= n; i++) {
      temp.push(i);
      dfs(i + 1, temp);
      temp.pop();
    }
  }
  dfs(1, []);
  return res;
};

console.log(combine(4, 2));
```

