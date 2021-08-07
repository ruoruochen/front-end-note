#### NC25 删除有序链表中重复的元素-I

解法1:
```js
function deleteDuplicates( head ) {
    //去重 先放入数组中去重 再重新拼接
    const arr = [];
    while(head){
        arr.push(head);
        head = head.next;
    }
    //数组去重 set map
    const res = [];
    const set = new Set();
    for(let i =0;i<arr.length;i++){
        if(!set.has(arr[i].val)){
            set.add(arr[i].val);
            res.push(arr[i]);
        }
    }
    //拼接
    return res.reduceRight((p,node)=>{
        node.next = p;
        p = node;
        return p;
    },null)
}
```

解法2:
```js
function deleteDuplicates( head ) {
    //双指针移动
    if(!head) return null;
    let cur = head,next = head.next;
    while(next){
        //比较
        if(cur.val === next.val){
            //next移动
            cur.next = next.next;
            next = cur.next;
        }else{
            //不相等 一起移动
            cur = cur.next;
            next = cur && cur.next;
        }
    }
    return head;
}
```
