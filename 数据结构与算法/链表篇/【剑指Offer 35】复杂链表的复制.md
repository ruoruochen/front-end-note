# 复杂链表的复制

## 题目

输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。

## 思路

拆分成三步：

1.复制每一个节点，使得复制后的节点都在当前节点的下一个节点

2.原生链表的节点的指向任意节点，使复制的节点也都指向某一任意节点

3.重新连接节点，把原生节点重新连接起来，把克隆后的节点连接起来

## 代码

```js
function Clone(pHead) {
    if (pHead === null) {
        return null;
    }
    //1.克隆节点，插在每个节点后面
    let current = pHead;
    while (current) {
        //复制节点
        var cloneNode = {
            label: current.label,
            next: current.next
        };
        current.next = cloneNode;
        current = cloneNode.next;
    }
    
    //2.克隆Random指针
    current = pHead;
    while (current) {
        //当前节点的下一个节点为克隆节点
        var cloneNode = current.next;
        //复制Ramdom指针
        if (current.random) {
            cloneNode.random = current.random.next;
        } else {
            cloneNode.random = null;
        }
        //移动到下一个原生节点
        current = cloneNode.next;
    }

    //3.将克隆节点连接起来，并还原原生链表
    var cloneNode = pHead.next;
    var cloneHead = cloneNode;
    //当前节点
    current = pHead;
    while (current) {
        //还原原生链表
        current.next = cloneNode.next;
         //移动到下一个原生节点
        current = cloneNode.next;
        //如果下一个存在
        if (current) {
            //连接克隆节点
            cloneNode.next = current.next;
            //克隆节点移动
            cloneNode = current.next;
        } else {
            //到达末尾
            cloneNode.next = null;
        }
    }
    //返回克隆链表
    return cloneHead;
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)