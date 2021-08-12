# 扁平化多级双向链表

## 题目

多级双向链表中，除了指向下一个节点和前一个节点指针之外，它还有一个子链表指针，可能指向单独的双向链表。这些子列表也可能会有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例所示。

给你位于列表第一级的头节点，请你扁平化列表，使所有结点出现在单级双链表中。

**示例 1：**

```
输入：head =[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
输出：[1,2,3,7,8,11,12,9,10,4,5,6]
```

解释：
输入的多级列表如下图所示：

![image-20210110144738247](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210110144738247.png)

扁平化后的链表如下图：

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/multilevellinkedlistflattened.png)

**如何表示测试用例中的多级链表？**

以 **示例 1** 为例：

```js
 1---2---3---4---5---6--NULL
         |
         7---8---9---10--NULL
             |
             11--12--NULL
```

序列化其中的每一级之后：

```js
[1,2,3,4,5,6,null]
[7,8,9,10,null]
[11,12,null]
```

为了将每一级都序列化到一起，我们需要每一级中添加值为 null 的元素，以表示没有节点连接到上一级的上级节点。

```js
[1,2,3,4,5,6,null]
[null,null,7,8,9,10,null]
[null,11,12,null]
```

合并所有序列化结果，并去除末尾的 null 。

```js
[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
```

## 思路

- 遇到child就递归, 把next和child都传递过去, 因为指针会遍历到后面, 正好可以拼接next和child
- 递归返回之后要清掉child, 并且处理好prev指针

## 代码

```js
// 优化前
const flatten = (head, next) => {
  let curr = head
  while (curr && (curr.next || curr.child)) {
    if (curr.child) {
      curr.next = flatten(curr.child, curr.next)
      curr.child = null
      curr.next.prev = curr
    }
    curr = curr.next
  }
  if (next) {
    next.prev = curr
    curr.next = next
  }
  return head
}
```

