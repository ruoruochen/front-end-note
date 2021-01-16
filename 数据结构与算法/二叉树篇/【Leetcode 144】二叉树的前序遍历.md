# 二叉树前序遍历

所谓前序遍历，即按照中左右的顺序进行遍历。

## 题目

给定一个二叉树，返回它的**前序**遍历。

示例：

```js
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 
输出: [1,2,3]
```

## 代码

#### 递归算法

```js
var preorderTraversal = function(root , array = []){
    if(root){
        array.push(root.val);
        preorderTraversal(root.left,array);
        preorderTraversal(root.right,array);
    }
    return array;
}
```

![image-20210116174115082](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116174115082.png)

#### 非递归实现

初始化一个栈和结果数组，当栈不为空或目标节点不为空时，重复下面的步骤：

1. 目标节点存入结果数组，左孩子入栈  → 直至左孩子为空
2. 栈顶元素出栈，以栈顶元素为根节点
3. 以右孩子为目标节点，执行1、 2、 3

```js
var preorderTraversal = function(root){
    const result = [];
    const stack = [];
    let current = root;
    while(stack.length > 0 || current){
        while(current){
            result.push(current.val);
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        current = current.right;
    }
    return result;
}
```

![image-20210116174628464](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116174628464.png)

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构博客专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)