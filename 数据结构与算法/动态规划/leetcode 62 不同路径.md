## leetcode 62 不同路径

#### 题目

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

**示例 1：**

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/robot_maze.png)

```
输入：m = 3, n = 7
输出：28
```

#### 代码

```js
var uniquePaths = function (m, n) {
  if (m <= 0 || n <= 0) {
    return 1;
  }
  let dp = new Array(m);
  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n);
  }
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
  }

  //状态转移
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};
```

