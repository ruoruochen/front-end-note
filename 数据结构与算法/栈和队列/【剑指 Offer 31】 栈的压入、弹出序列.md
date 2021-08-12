# 栈的压入、弹出序列

## 题目

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如，序列 {1,2,3,4,5} 是某栈的压栈序列，序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列，但 {4,3,5,1,2} 就不可能是该压栈序列的弹出序列。

**示例 1：**

```
输入：pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
输出：true
解释：我们可以按以下顺序执行：
push(1), push(2), push(3), push(4), pop() -> 4,
push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1
```

**示例 2：**

```
输入：pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
输出：false
解释：1 不能在 2 之前弹出。
```

## 思路

借助一个辅助栈来模拟压入和弹出的过程，创建一个Index记录出栈序列当前元素。

1. 遍历入栈序列，将其数据依次入栈

- 当辅助栈栈顶元素与当前出栈序列元素相同时，辅助栈出栈、出栈索引+1。因为出栈可能联系，所以使用while循环持续判断辅助栈栈顶元素与当前出栈序列元素。
- 当....不相同，继续入栈。

   2.全部入栈完毕后，若出栈顺序正确，那么辅助栈为空。

```
return stack.length == 0;
```



```js
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function (pushed, popped) {
  if (pushed.length == 0 || popped.length == 0) {
    return true;
  }
  const stack = [];
  let index = 0;
  for (let i = 0; i < pushed.length; i++) {
    stack.push(pushed[i]);
    while (stack.length && stack[stack.length - 1] == popped[index]) {
      stack.pop();
      index++;
    }
  }

  return stack.length == 0;
};
```



![image-20210209145632525](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210209145632525.png)