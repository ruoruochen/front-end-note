# 二叉树的最小深度

#### 题目

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明: 叶子节点是指没有子节点的节点。

示例:

给定二叉树 `[3,9,20,null,null,15,7]`,

```js
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最小深度 2

#### 思路

深度优先+分治

- 左右子树不为空：左右子树深度和右子树深度最小值+1
- 左子树为空：右子树深度最小值+1
- 右子树为空：左子树深度最小值+1

#### 代码

```js
/* 思路 递归
1.功能:求最小深度
2.出口 root空 return 0
3.等价表达式
左子树空 return 右子树最小深度+1
右子树空 return 左子树最小深度+1
左右子树均不空 return 左子树、右子树最小深度的最小值+1 */
var minDepth = function (root) {
  if (!root) {
    return 0;
  }

  if (!root.left) {
    return minDepth(root.right) + 1;
  }

  if (!root.right) {
    return minDepth(root.left) + 1;
  }

  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};
```

![image-20210119150654319](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210119150654319.png)

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)