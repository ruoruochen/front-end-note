## leetcode 5. 最长回文子串

#### 题目

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

**示例 1：**

```
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
```

- `1 <= s.length <= 1000`
- `s` 仅由数字和英文字母（大写和/或小写）组成

#### 方案一：暴力法

两个变量，遍历起始位置和子串长度，判断当前子串是否为回文串，如果是且子串长度>max，则记录子串，更改max值。

时间复杂度大概为O(n^3)，有题目得到s.length <=1000 ，那么程序执行语句次数大概在10^9以内，不会超时。

```
一般来说，程序执行语句次数一般控制在10^8 到10^9以下 不会超时
```

**代码如下：**

```js
var longestPalindrome = function (s) {
  //暴力法
  var isPar = function (str) {
    let left = 0, right = str.length - 1;
    while (left < right) {
      if (str[left++] === str[right--]) continue;
      return false;
    }
    return true;
  }

  let len = s.length;
  let ans = "";
  let max = 0;
  if (!s || len < 2) {
    return s;
  }
  for (let i = 0; i < len; i++) {
    for (let j = 1; j <= len - i; j++) {

      if (isPar(s.substr(i, j)) && j > max) {

        max = j;
        // console.log(s.substr(i, j) + max);
        ans = s.substr(i, j);
      }
    }
  }
  return ans;
};

console.log(longestPalindrome("bb"));
```

![image-20210330215109341](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210330215109341.png)

#### 方案二：动态规划

首先对题目进行分析：我们要求最长回文串，一般都要设一个max来记录当前最大值，回文串满足最优子结构问题，一个索引从i 到 j 的子串是否形成回文串，取决去 s[i] 是否等于 s[j] 和s[i+1]到s[j-1]是否形成回文串。

如果i 到 j形成回文串，且长度>max，则记录子串，更新max，继续搜索。

**按照刻意练习的思路去思考动规：**

1、定义数组元素的含义。

dp[i] [j] 表示 索引从i 到 j 的子串是否形成回文串。true 为形成，false 为不形成。我们所求为在求解dp的过程中，找到最长的形成回文串的子串。

2、状态转移方程

形成回文串：s[i] === s[j] && （子串为长度为0 、1 或者 dp[i+1] [j-1] ） 。

**需要先判断子串长度，因为如果子串长度长度为<=1时，dp[i+1] [j-1]是没有意义的，比如i=0,j=1;此时dp[1] [0]无意义**

dp[i] [j] = s[i] === s[j] && (j - i < 2 || dp[i + 1] [j - 1]); (i从len-1遍历，j从i遍历)

- 因为i+1 需要先获得大的dp，所有i需要从大到小求起
- j-1 需要先获得小的dp，所以j 需要从小到大求起
- 因为dp[i] [j] 的含义为 索引 i 到 索引 j 是否形成回文串，故j>i是没有意义的，j需要从i开始求起 

3、初始值。

当只有一个字符时，形成回文串。

```js
for (let i = 0; i < len; i++) {
    dp[i][i] = true;//1个字符
}
```

**代码如下：**

```js
var longestPalindrome = function (s) {
  let len = s.length;
  let ans = '';
  let dp = new Array(len);
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len).fill(0);
  }

  //初始化
  for (let i = 0; i < len; i++) {
    dp[i][i] = true;//1个字符
  }
  for (let i = len - 1; i >= 0; i--) {
    //因为j>i没有意义，所有j从i开始
    for (let j = i; j < len; j++) {
      dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1]);
      if (dp[i][j] && j - i + 1 > ans.length) {
        ans = s.substring(i, j + 1);
      }
    }
  }
  return ans;
}

```
```js
var longestPalindrome = function(s) {
    //max = 1 start = 0len = s.length;
    //动态规划 dp[i][j] 下标i到j 是否形成回文串 true /false; i>=j才有意义
    //状态转移 dp[i][j] = dp[i+1][j-1] && s[i] === s[j];（j>1 i<s.length-1)
    // 方向 i从大到小 j从小到大
    // if true j-i+1>max? max = xxx,start = i
    // 初始化  dp[len-1][len-i] = true;
    let max = 1,start =0,len = s.length;
    let dp =new Array(len);
    for(let i =0;i<len;i++){
        dp[i] = new Array(len).fill(true);
    }
    //初始化
    dp[len-1][len-1] = true;
    for(let i =len-2;i>=0;i--){
        for(let j =i;j<len;j++){
            dp[i][j] = dp[i+1][j-1] && s[i] === s[j];
            if(dp[i][j] && j-i+1 >max){
                max = j-i+1;
                start = i;
                end = j;
            }
        }
    }
    
    return s.substr(start,max);
};
```


![image-20210330223351262](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210330223351262.png)
