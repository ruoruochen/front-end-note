# 对称二叉树

## 题目

请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。

## 思路

二叉树的右子树是二叉树左子树的镜像二叉树。

镜像二叉树：两颗二叉树根结点相同，但他们的左右两个子节点交换了位置。

对称二叉树满足以下条件：

- 根节点相同
- 左子树的左节点与右子树的右节点相同
- 左子树的右节点与右子树的左节点详图

## 代码

`没想出来`

```js
 function isSymmetrical(pRoot) {
      return isSymmetricalTree(pRoot, pRoot);
    }

function isSymmetricalTree(node1, node2) {
    //特判
    //如果两棵树都为空树，对称
    if (!node1 && !node2) {
        return true;
    }
    //一棵为空，另一棵不为空，不对称
    if (!node1 || !node2) {
        return false;
    }
    //如果根节点不相同，不对称
    if (node1.val != node2.val) {
        return false;
    }
    //递归判断左子树的左节点与右子树的右节点、左子树的右节点与右子树的左节点
    return isSymmetricalTree(node1.left, node2.right) && isSymmetricalTree(node1.right, node2.left);
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)