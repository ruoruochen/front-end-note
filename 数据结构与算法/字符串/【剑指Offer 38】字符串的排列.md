# 字符串的排列

## 题目

输入一个字符串，打印出该字符串中字符的所有排列。

你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

**示例:**

```
输入：s = "abc"
输出：["abc","acb","bac","bca","cab","cba"]
```

## 思路 回溯 暂时不会

```js
var permutation = function (s) {
  const result = [];
  if (s) {
    queue = s.split('')
    PermutationCore(queue, result);
  }
  result.sort();
  //去重
  return [... new Set(result)];
}

function PermutationCore(queue, result, temp = "", current = "") {
  current += temp;
  //队列为空
  if (queue.length === 0) {
    //对家至结果数组，结束递归
    result.push(current);
    return;
  }

  //遍历队列
  for (let i = 0; i < queue.length; i++) {
    //从队列头部取一个元素
    temp = queue.shift();
    //递归排列剩余的字符
    PermutationCore(queue, result, temp, current);
    //放回队尾，回溯
    queue.push(temp);
  }
}
```

