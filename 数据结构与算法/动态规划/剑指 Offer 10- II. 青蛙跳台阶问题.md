## 剑指 Offer 10- II. 青蛙跳台阶问题

#### 题目

一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

**示例 1：**

```
输入：n = 2
输出：2
```

**示例 3：**

```
输入：n = 0
输出：1
```

#### 代码

```JS
var numWays = function (n) {
  if (n <= 1) {
    return 1;
  }
  let dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 1e9 + 7;
  }
  return dp[n];
};
```

