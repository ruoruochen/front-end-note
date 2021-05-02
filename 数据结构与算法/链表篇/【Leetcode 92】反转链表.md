# 反转链表

## 题目

输入一个链表，反转链表后，输出新链表的表头。

## 思路

#### 1、递归

状态变量，递归出口，递归列表

状态变量：头结点

递归出口：head.next == null 或空表

递归列表：当前反转 =  反转head.next 改变1,2节点指向。



递归三要素：

- 定义递归函数的功能：反转链表
- 寻找结束条件：head.next == null 或空表
- 寻找等价关系，不断缩小参数范围

以下面例子为例

![image-20210109090749481](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210109090749481.png)

reverseList(head.next)可以得到下图，这是我们只需让head与head.next指针交换一下即可。

![image-20210109090757782](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210109090757782.png)

所以我们得到等价条件：

**reverseList(head)** 等价于 **reverseList(head.next）+ 改变一下1，2两个节点的指向** 。

写出递归式。

#### 2、非递归

以链表的头部节点为基准节点

将基准节点的下一个节点挪到头部作为头节点

当基准节点的`next`为`null`，则其已经成为最后一个节点，链表已经反转完成

### 代码

#### 代码1

```js
//用递归的方法反转链表
var reverseList = function (head) {
    // 1.递归结束条件
    if (head == null || head.next == null) {
        return head;
    }
    // 递归反转子链表
    var newList = reverseList2(head.next);
    // 改变 1，2节点的指向。
    // 通过 head.next获取节点2
    let t1  = head.next;
    // 让 2 的 next 指向 2
    t1.next = head;
    // 1 的 next 指向 null.
    head.next = null;
    // 把调整之后的链表返回。
    return newList;
}
```

#### 代码2

```js
var reverseList = function (head) {
  let currentNode = null;
  let headNode = head;
  while (head && head.next) {
    //获取基准点的下一个节点 将其作为头节点
    currentNode = head.next;
    //基准点的next指向头节点的下一节点，即越过current节点 
    //防止currentNode.netx丢失，即保留
    head.next = currentNode.next;
    //指向之间反转的链表
    currentNode.next = headNode;
    //headNode设置为已反转的链表
    headNode = currentNode;
  }
  //返回反转链表
  return headNode;
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)