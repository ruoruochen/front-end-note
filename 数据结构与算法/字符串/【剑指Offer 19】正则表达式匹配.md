# 正则表达式匹配

## 题目

请实现一个函数用来匹配包含'. '和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（含0次）。在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但与"aa.a"和"ab*a"均不匹配。

**示例 1:**

```
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
```

**示例 2:**

```
输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
```

- `s` 可能为空，且只包含从 `a-z` 的小写字母。
- `p` 可能为空，且只包含从 `a-z` 的小写字母以及字符 `.` 和 `*`，无连续的 `'*'`。

### 思路

#### 解法1 正则表达式匹配

直接创建正则表达式匹配。**面试千万别用**

```js
var isMatch = function (s, p) {
  var reg = new RegExp(p);
  var result = s.match(reg);
  if (result === null) {
    return false;
  }
  return result[0] === s ? true : false;
};
```

```js
var isMatch = function (s, p) {
  var reg = new RegExp('^'+p+'$');
  return reg.test(s);
};
```



![image-20210218135533249](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210218135533249.png)

#### 解法二 动态规划  暂时放弃

```js
var isMatch = function (s, p) {
    let dp = Array(s.length + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = Array(p.length + 1).fill(false)
    }
    dp[0][0] = true;
    for (let i = 1; i < p.length; i++) {
        if (p.charAt(i) === "*") {
            dp[0][i + 1] = dp[0][i - 1]
        }
    }

    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < p.length; j++) {
            if (p.charAt(j) === '.') {
                dp[i + 1][j + 1] = dp[i][j]
            }

            if (p.charAt(j) === s.charAt(i)) {
                dp[i + 1][j + 1] = dp[i][j]
            }

            if (p.charAt(j) === '*') {
                if (p.charAt(j - 1) !== s.charAt(i) && p.charAt(j - 1) !== '.') {
                    dp[i + 1][j + 1] = dp[i + 1][j - 1]
                } else {
                    dp[i + 1][j + 1] = (dp[i + 1][j] || dp[i][j + 1] || dp[i + 1][j - 1])
                }
            }
        }
    }
    return dp[s.length][p.length]
};
```

