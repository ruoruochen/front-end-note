## K 个一组翻转链表

```js
var reverseKGroup = function(head, k) {
    //创建亚结点 作为第一组的pre结点
    const hair = new ListNode(-1);
    hair.next = head;
    let pre = hair;

    //遍历链表
    while(head){
        //尾结点初始为pre 走k步后到达真正的尾结点
        let tail = pre;
        for(let i =0;i<k;i++){
            tail = tail.next;
            //不足k位
            if(!tail) return hair.next;
        }
        //下一组的头节点
        const nex = tail.next;
        //翻转数组
        [head,tail] = reverseList(head,tail);
        //交换指向
        pre.next = head;
        tail.next = nex;
        pre = tail;
        head = tail.next;
    }
    return hair.next;
};

function reverseList(head,tail){
    //需要连接的尾结点
    let prev = tail.next;
    let p = head;
    while(prev!==tail){
        //遍历拿到结点
        const nex = p.next;
        //当前结点连接尾结点
        p.next = prev;
        //尾结点移动
        prev = p;
        //头节点移动
        p = nex;
    }
    //返回头尾
    return [tail,head];
}
```
