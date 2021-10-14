#### NC69 链表中倒数最后k个节点

```js
function FindKthToTail( pHead ,  k ) {
    // 两个指针一块走，相差k位
    // 如果count没数到k，p2优先为null了 则返回一个空链表
    let p1 = pHead,p2=pHead,count=0;
    while(p2){
        count++;
        p2 = p2.next;
        if(count>k){
            p1 = p1.next;
        }
    }
    //如果p2为空出来 count<=k
    if(!p2 &&count<k){
        return null
    }
    return p1;
}
```

