#### NC2 重排链表

```js
function reorderList( head ) {
    // 变成双向链表，两边向中间遍历
    if(!head || !head.next) return head;
    let p1 = head;
    let p2 = head;
    while(p1 && p1.next){
        p1.next.pre = p1;
        p1 = p1.next;
    }
    while(p1!==p2 && p1.pre!==p2){
        let next = p2.next;
        p2.next = p1;
        p1.next =next;
        p2 = next;
        p1 = p1.pre;
    }
    p1.next=null;
    return head;
}
```

