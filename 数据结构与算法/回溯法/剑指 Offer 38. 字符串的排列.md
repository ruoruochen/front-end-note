# 剑指 Offer 38. 字符串的排列

输入一个字符串，打印出该字符串中字符的所有排列。

你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

**示例:**

```
输入：s = "abc"
输出：["abc","acb","bac","bca","cab","cba"]

输入：s = "aab"
输出：["aba","aab","baa"]
```

**解题思路：**

分析题目，我们可以很容易地看出可以使用遍历的方法进行求解，即为树形问题，使用回溯法。在该题中，题目没有说明字符串中字符不重复，故我们需要对数组进行排列去重。

我们可以把题目想象为一个len个空格的待填格子，每个格子需要从字符串中选择一个字符填入，每个字符只能填写一次。这个时候，当前填写格子的下标就作为状态变量。

**注意数组元素为字符时，升序排序直接使用sort**

**按照刻意练习的步骤来思考：**

1、递归树和状态变量。状态变量为当前填写格子的下标和新数组。

![image-20210319231855138](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210319231855138.png)

2、递归出口：当前填写格子下标 === len 

3、选择列表：for循环字符数组，进行数组去重，数组去重条件为：

```js
if(i>0 && arr[i] === arr[i-1] && used[i-1]) continue
```

**特别注意：used[i-1] 需要重复元素的上一个元素被使用过才去重**

如果当前元素使用过也continue。

4、剪枝：如上

5、撤销操作：pop 和 used[i] = false;

```js
var permutation = function (s) {
  const len = s.length;
  const arr = s.split('');
  arr.sort()
  const res = [];
  const used = new Array(len).fill(false);

  var dfs = function (index, temp) {
    if (index === len) {
      return res.push(temp.join(''));
    }

    for (let i = 0; i < len; i++) {
      if (i > 0 && arr[i] === arr[i - 1] && used[i - 1]) continue;
      if (used[i]) continue;
      temp.push(arr[i]);
      used[i] = true;
      dfs(index + 1, temp);
      temp.pop();
      used[i] = false;
    }
  }

  dfs(0, []);
  return res;
}

console.log(permutation("baa"));
```

![image-20210319232306218](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210319232306218.png)