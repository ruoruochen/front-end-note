# 二叉树的中序遍历

二叉树的中序遍历，即以左中右的顺序依次遍历数据元素。

## 题目

给定一个二叉树，返回它的**中序**遍历。

示例：

```js
输入: [1,null,2,3]
   1
    \
     2
    /
   3
输出: [1,3,2]
```

## 代码

#### 解法1：递归实现

递归有两种写法，递归函数本身、在闭包中递归。

```js
var inorderTraversal = function(root , array = []){
    //如果根节点不为空
    if(root){
        //对左节点遍历
        inorderTraversal(root.left,array);
        array.push(root.val);
        //对右节点遍历
        inorderTraversal(root.right,array);
    }
    return array;
}
```

**复杂度分析：**

时间复杂度：O(n)

![image-20210116165332422](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116165332422.png)

#### 解法2：非递归实现(迭代方法)

初始化一个栈和结果数组，当栈不为空或目标节点不为空时，重复下面的步骤：

1. 根节点和左节点入栈 →直至没有左孩子
2. 栈顶元素出栈，存入结果数组，将出栈元素作为根节点
3. 以右孩子为目标节点，执行1、2、3

```js
var inorderTraversal = function(root){
    var result= [];
    var stack = [];
    var current = root;
    while(stack.length >0 || current){
        while(current){
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current);
        current = current.right;
    }
    return result;
}
```

![image-20210116170537739](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116170537739.png)

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)