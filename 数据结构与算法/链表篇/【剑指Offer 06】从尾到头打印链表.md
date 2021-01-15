# 从尾到头打印链表

## 题目

输入一个链表，按链表值从尾到头的顺序返回一个`ArrayList`。

## 分析

- 链表的数据结构：`val`属性存储当前值，`next`属性存储下一个节点的引用。

- 遍历链表即不断寻找当前节点的`next`节点，直至`next`节点为`null`。
- 从尾到头顺序，使用一个队列来存储打印结果，每次从队列头部插入。（我觉得也可以使用栈来存储，用栈存储还需要一个一个pop出来存储，但麻烦）

## 代码

```js
function printListFromTailToHead(head) {
  const array = [];
  while (head) {
    array.unshift(head.val);
    head = head.next;
  }
  return array;
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)