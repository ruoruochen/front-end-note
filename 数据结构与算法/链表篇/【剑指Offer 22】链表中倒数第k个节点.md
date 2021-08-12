# 链表倒数第k个节点

Offer22

## 题目

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。

## 思路

简单思路： 循环到链表末尾找到 length 在找到length-k节点 需要循环两次。

优化：

设定两个节点，间距相差k个节点，当前面的节点到达终点，取后面的节点。

前面的节点到达k后，后面的节点才出发。

特判： 需要考虑head为null，k为0，k大于链表长度的情况。

## 代码

```js
var getKthFromEnd = function (head, k) {
  //如果链表为空 或 k=0
  if (!head || !k) return null;
  var front = head;
  var behind = head;
  //记录链表长度
  var index = 1;
  while (front.next) {
    index++;
    front = front.next;
	//如果前面指针走过长度>k 后面指针开始移动
    if (index > k) {
      behind = behind.next;
    }
  }
  return (index >= k) && behind;

};

```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)