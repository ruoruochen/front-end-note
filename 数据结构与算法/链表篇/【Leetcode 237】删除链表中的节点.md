# 删除链表中的节点

给定单链表的头指针和要删除的指针节点，在O(1)时间内删除该节点。

- 1.删除的节点不是尾部节点 - 将next节点覆盖当前节点
- 2.删除的节点是尾部节点且等于头节点，即只有一个节点 - 将头节点置为null
- 3.删除的节点是尾节点且前面还有节点 - 遍历到末尾的前一个节点删除

只有第三种情况时间复杂度是O(n)，且这种情况只会出现1/n次，所以算法时间复杂度是O(1)

```js
var deleteNode = function (head, node) {
    if (node.next) {
        node.val = node.next.val;
        node.next = node.next.next;
    } else if (node === head) {
        node = null;
        head = null;
    } else {
        node = head;
        while (node.next.next) {
            node = node.next;
        }
        node.next = null;
        node = null;
    }
    return node;
};
```

## 删除链表中重复的节点

#### 方法1.存储链表中元素出现的次数

- 1.用一个map存储每个节点出现的次数
- 2.删除出现次数大于1的节点

此方法删除节点时可以使用上面总结的办法。

时间复杂度：O(n)

空间复杂度：O(n)

```js
function deleteDuplication(pHead) {
    const map = {};
    if (pHead && pHead.next) {
        let current = pHead;
        // 计数
        while (current) {
            //通过键获取值
            const val = map[current.val];
            //如果不为0则加一；否则等于1
            map[current.val] = val ? val + 1 : 1;
            //取下一个节点
            current = current.next;
        }
        //链表处理
        current = pHead;
        while (current) {
            //获取当前节点的值
            const val = map[current.val];
            if (val > 1) {
                // 删除节点
                console.log(val);
                if (current.next) {
                    current.val = current.next.val;
                    current.next = current.next.next;
                } else if (current === pHead) {
                    current = null;
                    pHead = null;
                } else {
                    current = pHead;
                    while (current.next.next) {
                        current = current.next;
                    }
                    current.next = null;
                    current = null;
                }

            } else {
                current = current.next;
            }
        }
    }
    return pHead;
}
```

#### 方法2：重新比较连接数组

链表是排好顺序的，所以重复元素都会相邻出现 递归链表：

- 1.当前节点或当前节点的next为空，返回该节点
- 2.当前节点是重复节点：找到后面第一个不重复的节点
- 3.当前节点不重复：将当前的节点的next赋值为下一个不重复的节点

```js
function deleteDuplication(pHead) {
    if (!pHead || !pHead.next) {
        return pHead;
    } else if (pHead.val === pHead.next.val) {
        let tempNode = pHead.next;
        while (tempNode && pHead.val === tempNode.val) {
            tempNode = tempNode.next;
        }
        return deleteDuplication(tempNode);
    } else {
        pHead.next = deleteDuplication(pHead.next);
        return pHead;
    }
}
```

递归分析：

1. 定义递归函数的功能：删除重复节点

2. 结束条件：节点为空和next为空

3. 等价表达式，缩小参数范围。

   pHead.next = deleteDuplication(pHead.next);

   return pHead

时间复杂度：O(n)

空间复杂度：O(1)

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)