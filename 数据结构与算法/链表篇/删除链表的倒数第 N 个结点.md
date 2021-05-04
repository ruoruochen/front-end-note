#### 删除链表的倒数第 N 个结点

##### 笨方法

1、找到倒数第N个结点为正数第几个结点。

2、找到删除节点的前一个结点、删除节点，后一个节点。（需要进行边界判断，如果删除的为第一个结点，则不存在前一个结点）

3、前一个结点.next指向后一个节点。

需要走两趟

```js
var removeNthFromEnd = function(head, n) {
    //找到倒数第n个节点是整数第几个
    let index =0;
    let count =1;
    let p1 = head,p2=head;
    while(p2.next){
        count++;
        p2 = p2.next;
        if(count > n){
            p1=p1.next;
            index++;
        }
    }
    let pre,last,current = head;
    count = 0;
    if(index ==  0){
        return head.next;
    }else{
        while(current.next){

                let temp = current;

                if(count == index-1){
                    pre = temp;
                }else if (count == index+1){
                    last = temp;
                    break;
                }
                count++;
                current = current.next;
            }
    pre.next = p1.next;
    p1.next = null;
    return head;
    }
};
```

##### 快慢指针法

```js
var removeNthFromEnd = function(head, n) {
    //创建哑结点
    let preHead = new ListNode('-');
    preHead.next = head;
    //快慢指针
    let count =0;
    let p1 = preHead,p2=preHead;
    //删除节点的前一个节点
    let pre = null;
    while(p2){
        p2 = p2.next;
        //如果p2不为空且中间隔了n，p1移动
        if(p2&&count >= n){
            p1=p1.next;
            pre = p1;
        }
        count++;
    }

    //如果删除节点前一节点为空，说明删除的是第一个结点
    if(!pre) head = head.next;
    else{
        pre.next = pre.next.next;
    }
    return head;
};
```

