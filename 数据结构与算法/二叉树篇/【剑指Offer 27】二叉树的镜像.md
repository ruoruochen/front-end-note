# 二叉树的镜像

## 题目

操作给定的二叉树，将其变换为源二叉树的镜像。

```
        源二叉树 
    	    8
    	   /  \
    	  6   10
    	 / \  / \
    	5  7 9 11
    	镜像二叉树
    	    8
    	   /  \
    	  10   6
    	 / \  / \
    	11 9 7  5
```

## 思路

递归交换二叉树所有节点的左右节点位置

### 代码

```js
function Mirror(node) {
  if (node) {
    const tmp = node.left;
    node.left = node.right;
    node.right = temp;
    Mirror(node.left);
    Mirror(node.right);
  }
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)