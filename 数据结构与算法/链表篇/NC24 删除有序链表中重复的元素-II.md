#### NC24 删除有序链表中重复的元素-II

自己的解法1:
```js
function deleteDuplicates( head ) {
    //map 键 node.val 值 次数
    const map = new Map();
    let phead = head;
    while(head){
        if(map.has(head.val)){
            map.set(head.val,map.get(head)+1);
        }else{
            map.set(head.val,1);
        }
        head = head.next;
    }
    console.log(map)
    const res = []
    //遍历phead
    while(phead){
       if(map.get(phead.val)===1){
           res.push(phead);
           map.delete(phead.val);
       }
        phead = phead.next;
    }
    //拼接
    return res.reduceRight((p,node)=>{
        node.next = p;
        p = node;
        return p;
    },null)
}
```
