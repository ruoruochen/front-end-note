#### 合并K个升序链表

```js
var mergeKLists = function(lists) {
    //把所有的结点放到一个数组
    const arr = lists.reduce((array,item)=>{
        while(item){
            array.push(item);
            item = item.next;
        }
        return array
    },[])
    //排序
    arr.sort((a,b)=>a.val-b.val)
    //从右往左拼接链表
    return arr.reduceRight((p,node)=>{
        node.next = p;
        p = node;
        return p;
    },null)
};
```

