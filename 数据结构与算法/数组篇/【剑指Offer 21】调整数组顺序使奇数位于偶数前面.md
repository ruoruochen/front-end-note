# 调整数组顺序使奇数位于偶数前面

## 题目

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分

## 思路

两个指针start、end，一个从前开始，一个从后开始，比较指针所指元素。

1. 若arr[start]为偶数，arr[end]为奇数，交换两个元素，start++,end--。
2. 若arr[start]为偶数，arr[end]也为偶数，end--，直至end指针所指为奇数，交换。
3. 若arr[start]为奇数，start++，直至start指向偶数。
4. 当start>end交换完成。

## 代码

```js
function reOrderArray(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    //奇数
    while (arr[start] % 2 === 1) {
      start++;
    }
    //此时start所指为偶数，对后面判断
    while (arr[end] % 2 === 0) {
      end--;
    }
    //此时end所指为奇数，若start<end交换
    if (start < end) {
      // let temp = arr[start];
      // arr[start] = arr[end];
      // arr[end] = temp;
      // 使用解构赋值：
      [arr[start], arr[end]] = [arr[end], arr[start]]
    }
  }
  return arr;
}
```

> 若需要保证相对顺序不变，则不能用上面的写法，需要让两个指针同时从左侧开始

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)

