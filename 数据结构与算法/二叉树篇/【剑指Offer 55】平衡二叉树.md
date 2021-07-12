# 平衡二叉树

## 题目

输入一棵二叉树，判断该二叉树是否是平衡二叉树。

> 平衡二叉树：每个子树的深度之差不超过1

**示例 1：**

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/balance_1.jpg)

```
输入：root = [3,9,20,null,null,15,7]
输出：true
```

## 思路

#### 解法1

**我感觉这个方法不太好理解**

- 后续遍历二叉树，在遍历二叉树每个节点前都会遍历其左右子树

- 若左右子树存在一个不平衡或左右子树差值大于1，则整棵树不平衡
- 若左右子树平衡，则返回当前树深：左右子树最大深度+1

```js
// 1.函数功能：求二叉树是否平衡
// 2.递归出口：树为空时，平衡；如果不平衡，返回-1
// 3.等价表达式：
//    某二叉树平衡 = 左子树平衡 + 右子树平衡 + 左右子树树深<1
function IsBalanced_Solution(pRoot) {
  return balanced(pRoot) != -1;
}
function balanced(node) {
  //空树，平衡，树深0
  if (!node) {
    return 0;
  }
  //计算左右子树树深
  const left = balanced(node.left);
  const right = balanced(node.right);
  //判断是否平衡
  if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
    return -1;
  }
  //如果平衡，返回树深
  return Math.max(left, right) + 1;
}
```

![image-20210119152531319](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210119152531319.png)

#### 解法2

```js
var getMaxDeep = (root)=>{
    //最大深度
    if(!root) return 0;
    return Math.max(getMaxDeep(root.left),getMaxDeep(root.right))+1;
}

var isBalanced = function(root) {
   //平衡二叉树 = 当前树平衡 + 左子树平衡 + 右子树平衡
   //判断树平衡：左右深度相差<=1
   //递归判断 获取左子树高度 右子树高度
   if(!root) return true
   let left = getMaxDeep(root.left);
   let right = getMaxDeep(root.right);
   if(Math.abs(left-right)>1){
       return false;
   }
   return isBalanced(root.left) && isBalanced(root.right);
};
```



# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)