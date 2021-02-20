# 重建二叉树

## 题目

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

例如输入前序遍历序列`{1,2,4,7,3,5,6,8}`和中序遍历序列`{4,7,2,1,5,3,8,6}`，则重建二叉树并返回。
例如，给出

```
前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
```


返回如下的二叉树：

    	3
       / \
      9  20
        /  \
       15   7
## 思路

- 前序遍历：根节点  + 左孩子 + 右孩子
- 中序遍历：左孩子 + 根节点 + 右孩子
- 后序遍历：左孩子 + 右孩子 + 根节点

故我们可以得出以下规律：

1. 从前序遍历中找到根节点root
2. 在中序遍历中查找root的位置index，即可获取左右子树的长度
3. 截取左子树的前序遍历、右子树的前序遍历
4. 截取左子树的中序遍历、右子树的中序遍历
5. 递归重建二叉树 分别获得左右子树。
6. 利用根节点和左右子树即可重建二叉树。

![image-20210107140237965](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210107140237965.png)

```js
function reConstructBinaryTree(pre, inorder) {
  if (pre.length === 0) {
    return null;
  }
  if (pre.length === 1) {
    return new TreeNode(pre[0]);
  }
  const root = pre[0];
  const index = inorder.indexOf(root);
  // 分割前序遍历
  const preLeft = pre.slice(1, index+1);
  const preRight = pre.slice(index + 1);
  //分割中序遍历
  const inorderLeft = inorder.slice(0, index);
  const inorderRight = inorder.slice(index + 1);
  //分别求解左右子树并生成二叉树
  const node = new TreeNode(root);
  node.left = reConstructBinaryTree(preLeft, inorderLeft);
  node.right = reConstructBinaryTree(preRight, inorderRight);
  return node;
}
```

![image-20210117143245101](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210117143245101.png)

**练习题**

[leetcode 106 中后序构建二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)