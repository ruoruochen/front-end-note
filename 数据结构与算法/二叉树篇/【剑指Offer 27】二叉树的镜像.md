# 二叉树的镜像

## 题目

操作给定的二叉树，将其变换为源二叉树的镜像。

```
例如输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
镜像输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1

```

**示例 1：**

```
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
```

## 思路

递归交换二叉树所有节点的左右节点位置

### 代码

```js
/* 思路,符合递归的要求，每个子树都要进行节点交换
 1.交换左右两个节点
 2.对两个节点再进行镜像处理
 
 递归的功能：交换节点（镜像处理）
 递归的出口：节点为空
 等价表达式：整棵树的镜像 = 交换左右节点 + 左子树镜像 + 右子树镜像*/
var mirrorTree = function (root) {
  if (root) {
    const tmp = root.left;
    root.left = root.right;
    root.right = tmp;
    mirrorTree(root.left);
    mirrorTree(root.right);
  }
  return root;
};
```

![image-20210118235610794](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210118235610794.png)

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)