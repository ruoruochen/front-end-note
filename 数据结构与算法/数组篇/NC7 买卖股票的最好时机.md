#### NC7 买卖股票的最好时机

```js
function maxProfit(prices) {
  //动态规划 dp定义 股票：持有/不持有  所求：dp[len-1][0]
  //dp[i][0] 第i+1天不持有股票的最大利润
  //dp[i][1] 第i+1天持有股票的最大利润
  //动态转移 第i+1天不持有股票的最大利润 = max(第i天不持有（已卖出）,第i天持有&第i+1天卖出)
  //dp[i][0]=max(dp[i-1][0],dp[i-1][1]+prices[i])
  //dp[i][1]=max(dp[i-1][1],-prices[i]);
  //初始化 dp[0][0]第1天不持有股票 利润0 ；dp[0][1]第一天持有股票，利润-prices[0];
  let len = prices.length
  if (len <= 1) return 0
  const dp = new Array(len + 1)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(2)
  }
  dp[0][0] = 0
  dp[0][1] = -prices[0]
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
  }
  return dp[len-1][0]
}
```
