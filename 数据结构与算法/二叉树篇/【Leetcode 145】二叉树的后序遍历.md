# 二叉树后序遍历

所谓后续遍历，即按照左右中的顺序进行遍历。

## 题目

给定一个二叉树，返回它的**后序**遍历。

示例：

```js
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 
输出: [3,2,1]
```

## 代码

#### 递归算法

```js
var postorderTraversal = function(root , array = []){
    if(root){
        postorderTraversal(root.left , array);
        postorderTraversal(root.right , array);
        array.push(root.val);
    }
    return array;
}
```

#### 非递归算法

初始化一个栈、结果数组和记录上次访问节点的变量，当栈不为空或根节点不为空时，重复下面的步骤：

1. 将左孩子入栈 → 直至左孩子为空
2. 栈顶节点的右节点为空或被访问过 → 节点出栈，存入结果数组，标记为已访问，继续出栈查找。
3. 栈顶节点的右节点不为空且未被访问 ，以右孩子为目标节点，执行1 、2 、3

```js
var postorderTraversal = function (root) {
  const result = [];
  const stack = [];
  var last = null; //标记上一个访问的节点
  let current = root;
  while (stack.length > 0 || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack[stack.length - 1];
    if (!current.right || current.right == last) {
      current = stack.pop();
      result.push(current.val);
      last = current;
      current = null;
    } else {
      current = current.right;
    }
  }
  return result;
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)