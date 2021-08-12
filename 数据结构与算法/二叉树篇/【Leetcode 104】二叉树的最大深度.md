# 二叉树的最大深度

## 题目

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明:** 叶子节点是指没有子节点的节点。

**示例：**

给定二叉树 `[3,9,20,null,null,15,7]`，

```text
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

## 思路

- 深度优先遍历 + 分治
- 一棵二叉树的最大深度 = 左子树深度和右子树深度的最大值+1

## 代码

**dfs 深度优先遍历**

```js
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
```

![image-20210119144930487](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210119144930487.png)

**bfs 广度优先遍历**

```js
var maxDepth = function (root) {
  if (!root) return 0;
  let depth = 1;
  let quene = [root];
  while (quene.length) {
    //当前层节点数
    const levelSize = quene.length;
    //节点出列，子节点入队列
    for (let i = 0; i < levelSize; i++) {
      const cur = quene.shift();
      if (cur.left) quene.push(cur.left);
      if (cur.right) quene.push(cur.right);
    }
    if (quene.length) depth++;
  }
  return depth;
};
```



# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)