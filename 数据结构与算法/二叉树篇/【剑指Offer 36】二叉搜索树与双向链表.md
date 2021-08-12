# 二叉搜索树与双向链表

`自己想确实没思路`

## 题目

输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。要求不能创建任何新的节点，只能调整树中节点指针的指向。

 

为了让您更好地理解问题，以下面的二叉搜索树为例：

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/bstdlloriginalbst.png)

我们希望将这个二叉搜索树转化为双向循环链表。链表中的每个节点都有一个前驱和后继指针。对于双向循环链表，第一个节点的前驱是最后一个节点，最后一个节点的后继是第一个节点。

下图展示了上面的二叉搜索树转化成的链表。“head” 表示指向链表中有最小元素的节点。

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/bstdllreturndll.png)

特别地，我们希望可以就地完成转换操作。当转化完成以后，树中节点的左指针需要指向前驱，树中节点的右指针需要指向后继。还需要返回链表中的第一个节点的指针。

## 思路及代码

#### 解法 1: 递归+中序遍历

结合中序遍历，递归处理二叉树。初始化一个代表上一个节点的 pre 变量。递归中要做的就是：pre 的 right 指针指向当前节点 node，node 的 left 指向 pre，并且将 pre 更新为 node。

要注意的是，当递归到最下面的左节点时，pre 为空，要保留节点作为循环链表的 head。并在中序遍历结束后，处理头节点和尾节点的指针关系。

```js
var treeToDoublyList = function (root) {
  if (!root) {
    return;
  }
  var head = null;
  var pre = head;
  inorder(root);
  // 完成中序遍历后，pre指向了最后一个节点
  // 将其闭合成环状结构
  head.left = pre;
  pre.right = head;
  return head;

  function inorder(root) {
    if (!root) return;
    //遍历左子树
    inorder(root.left, pre);

    if (!pre) {
      //如果是左子树的最左边结点，那么记录下来，因为它将是head
      head = root;
    } else {
      //指向root
      pre.right = root;
    }
    root.left = pre;
    pre = root;

    // 遍历右子树
    inorder(root.right)
  }
}; 
```

![image-20210202171431685](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210202171431685.png)

#### 解法 2: 非递归+中序遍历

这里可以将递归转换为非递归的的中序遍历。转化思路是用栈来模拟递归调用的过程，其他的处理和解法 1 一样。

```js
var treeToDoublyList = function (root) {
  if (!root) {
    return;
  }

  //非递归中序遍历
  const stack = [];
  var current = root;
  var pre = null;
  var head = null;
  while (stack.length > 0 || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    //左子树的左后一个结点
    if (!pre) {
      head = current;
    } else {
      pre.right = current
    }
    current.left = pre;
    pre = current;
    current = current.right;
  }

  //循环链表
  head.left = pre;
  pre.right = head;
  return head;
};
```

![image-20210202172505867](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210202172505867.png)

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)

