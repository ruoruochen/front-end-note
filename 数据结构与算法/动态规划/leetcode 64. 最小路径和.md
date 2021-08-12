## leetcode 64. 最小路径和

#### 题目

给定一个包含非负整数的 `*m* x *n*` 网格 `grid` ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明：**每次只能向下或者向右移动一步。

**示例 1：**

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/minpath.jpg)

```
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。
```

#### 代码

```js
var minPathSum = function (grid) {
  let m = grid.length;
  let n = grid[0].length;
  // console.log(m);
  // console.log(n);

  let dp = new Array(m);
  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n);
  }

  dp[0][0] = grid[0][0];
  //状态初始化
  for (let i = 1; i < m; i++) {
    dp[i][0] = grid[i][0] + dp[i - 1][0];
  }

  for (let j = 1; j < n; j++) {
    dp[0][j] = grid[0][j] + dp[0][j - 1];
  }


  //状态转移
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }
  return dp[m - 1][n - 1];
};

console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]));

```

