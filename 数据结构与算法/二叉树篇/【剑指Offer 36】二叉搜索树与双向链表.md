# 二叉搜索树与双向链表

`自己想确实没思路`

## 题目

输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。

![image-20210108114927407](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210108132221902.png)

## 思路

解析：

​		在二叉搜索树中，每个结点都有两个分别指向其左、右子树的指针，左子树结点的值总是小于父结点的值，右子树结点的值总是大于父结点的值。在双向链表中，每个结点也有两个指针，它们分别指向前一个结点和后一个结点。所以这两种数据结构的结点是一致，二叉搜索树和双向链表，只是因为两个指针的指向不同而已，通过改变其指针的指向来实现是完全可能的。
 		为了减少指针的变换次数，并让操作更加简单，在转换成排序双向链表时，原先指向左子结点的指针调整为链表中指向前一个结点的指针，原先指向右子结点的指针调整为链表中指向下一个结点的指针。
​		由于要求链表是有序的，可以借助二叉树中序遍历，因为中序遍历算法的特点就是从小到大访问结点。当遍历访问到根结点时，假设根结点的左侧已经处理好，只需将根结点与上次访问的最近结点（左子树中最大值结点）的指针连接好即可。进而更新当前链表的最后一个结点指针。同时中序遍历过程正好是转换成链表的过程，可采用递归方法处理。

![image-20210108115437042](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210108114927407.png)

二叉搜索树的中序遍历即排序后的序列，故代码步骤如下：

- 1.递归左子树，找到左子树的最后一个节点，根节点左侧连接到左子树的最后一个节点
- 2.当前节点变为已经转换完成的链表的最后一个节点
- 3.递归右子树，找到当前树的最后一个节点
- 4.回溯到上一层，进行链接...

## 代码

```js
function Convert(pRootOfTree) {
    //如果空树，返回空链表
    if (!pRootOfTree) {
        return null;
    }
    //转换成双向链表
    ConvertCore(pRootOfTree);
    //向前移动到第一个节点
    while (pRootOfTree.left) {
        pRootOfTree = pRootOfTree.left;
    }
    return pRootOfTree;
}

function ConvertCore(node, last) {
    //递归左子树，获取左子树的最后一个结点
    if (node.left) {
        last = ConvertCore(node.left, last)
    }
    //根节点指向左子树最后一个结点
    node.left = last;
    //实现双向指针
    if (last) {
        //左子树最后一个结点指向根节点
        last.right = node;
    }
    //last记录新节点
    last = node;
    //递归右子树，获取右子树的最后一个节点
    if (node.right) {
        last = ConvertCore(node.right, last);
    }
    //返回记录节点
    return last;
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)