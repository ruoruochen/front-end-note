# 环形链表Ⅱ（链表环的入口节点）

## 题目

给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

## 思路

快慢指针法，声明两个指针 P1 P2

- 1.判断链表是否有环： P1 P2 从头部出发，P1走两步，P2走一步，如果可以相遇，则环存在
- 2.从环内某个节点开始计数，再回到此节点时得到链表环的长度 length
- 3.P1、P2 回到head节点，让 P1 先走 length 步 ，当P2和P1相遇时即为链表环的起点

![image-20210109120936539](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210109120936539.png)

关于思路3的理解：

这一张图告诉我们，对于快慢指针，当slow和fast相遇时，相遇点在C,	同时推导出 =>2(AB+BC) = AB+BC+CB+BC	=> AB = CB

![Floyd1](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/20200804111327945.png)·

第二张图告诉我们，当slow走到入口节点B的时候，fast走到D,也就是说 => 2AB = AB+BC+CD =>AB = BC+CD
结合上图的结论  AB = CB	则可以推导出 => CB = BC+CD =>CD+DB = BC+CD => DB=BC	也就是为什么 BC,BD两个距离都是Y

所以根据 X,Y 距离的设置  结合之前的关系（AB = CB） 推导出 => CD = X-Y,CDB=X
然后，当slow和fast在C点相遇后，让slow指针的位置不变，也就是指向C,更改fast指针的指向为pHead,两个指针每次都走一步，下一次相遇就是入口节点

![floyd2](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210113172620510.png)

## 代码

```js
function EntryNodeOfLoop(pHead) {
    if (!pHead || !pHead.next) {
        return null;
    }
    let P1 = pHead.next;
    let P2 = pHead.next.next;
    // 1.判断是否有环
    while (P1 != P2) {
        //p2走到终点，说明没有环
        if (P2 === null || P2.next === null) {
            return null;
        }
        P1 = P1.next;
        P2 = P2.next.next;
    }
    // 2.获取环的长度
    let temp = P1;
    let length = 1;
    P1 = P1.next;
    while (temp != P1) {
        P1 = P1.next;
        length++;
    }
    // 3.找公共节点
    P1 = P2 = pHead;
    // p2先走length步
    while (length-- > 0) {
        P2 = P2.next;
    }
    // p1 p2 一起走直至相遇
    while (P1 != P2) {
        P1 = P1.next;
        P2 = P2.next;
    }
    return P1;
}
```

更简便的写法：
```js
function EntryNodeOfLoop(pHead) {
    if (!pHead || !pHead.next) {
        return null;
    }
    let P1 = pHead.next;
    let P2 = pHead.next.next;
    // 1.判断是否有环
    while (P1 != P2) {
        //p2走到终点，说明没有环
        if (P2 === null || P2.next === null) {
            return null;
        }
        P1 = P1.next;
        P2 = P2.next.next;
    }
     //p1为相遇结点
    P2 = pHead;
    //一起走
    while(P1!==P2){
        P1 = P1.next;
        P2 = P2.next;
    }
    return P1;
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)
