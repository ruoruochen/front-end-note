# leetcode 131. 分割回文串

给你一个字符串 `s`，请你将 `s` 分割成一些子串，使每个子串都是 **回文串** 。返回 `s` 所有可能的分割方案。

**回文串** 是正着读和反着读都一样的字符串。

 **示例 1：**

```
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
```

**示例 2：**

```
输入：s = "a"
输出：[["a"]]
```

![image-20210320143025007](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210320143025007.png)

**解题思路：**

我们对题目进行分析，我们要将字符串分割成若干个回文串，我们的求解思路是从第一个字符开始划分，当形成回文串后，将该回文串放入结果中，再对该下标后的字符进行判断是否形成回文串，直至搜索到最后一个字符，如果到最后一个字符还未形成回文串，则回溯。

**使用刻意练习的思路思考：**

1、递归树和状态变量。状态变量为当前搜索下标，新数组。将当前搜索下标前的回文串放入新数组中。

![image-20210320143545190](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210320143545190.png)

2、递归出口：当搜索下标到达最后，index ===len

3、选择列表：for循环 从当前下标到最后，判断当前下标到j之间是否形成回文串，若形成则temp.push，dfs(j+1,temp)

4、剪枝：无

5、撤回：pop

```js
var partition = function (s) {
  const res = [];
  const len = s.length;
  const f = new Array(len).fill(0).map(() => new Array(len).fill(true));

  for (let i = len - 1; i >= 0; i--) {
    for (let j = i + 1; j < len; j++) {
      f[i][j] = (s[i] === s[j]) && f[i + 1][j - 1];
    }
  }

  var dfs = function (index, temp) {
    if (index === len) {
      return res.push(temp.slice());
    }

    for (let i = index; i < len; i++) {
      if (f[index][i]) {
        temp.push(s.slice(index, i + 1));
        dfs(i + 1, temp);
        temp.pop();
      }
    }
  }

  dfs(0, []);
  return res;
};

console.log(partition("aab"));

```

