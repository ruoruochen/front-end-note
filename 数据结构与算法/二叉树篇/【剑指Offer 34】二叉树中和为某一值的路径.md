# 二叉树中和为某一值的路径

输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。

示例:
给定如下二叉树，以及目标和 sum = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1

返回:

```
[
   [5,4,11,2],
   [5,8,4,5]
]
```

## 思路

套用回溯算法的思路

设定一个结果数组result来存储所有符合条件的路径

设定一个栈stack来存储当前路径中的节点

设定一个和sum来标识当前路径之和

- 从根结点开始深度优先遍历，每经过一个节点，将节点入栈
- 到达叶子节点，且当前路径之和等于给定目标值，则找到一个可行的解决方案，将其加入结果数组
- 遍历到二叉树的某个节点时有2个可能的选项，选择前往左子树或右子树
- 若存在左子树，继续向左子树递归
- 若存在右子树，继续向右子树递归
- 若上述条件均不满足，或已经遍历过，将当前节点出栈，向上回溯

```js
// dfs 深度优先遍历
// 递归减少规模
// 1.函数功能：计算二叉树中某路径的和 === 给定值
// 2.递归条件：到达叶子结点：if sum === 给定值，存入
// 3.等价表达式，减小规模 在每个结点有两条路走，走左节点，走右节点。
var pathSum = function (root, sum) {
  const result = [];
  if (root) {
    getSumPath(root, sum, [], 0, result);
  }
  return result;
};

var getSumPath = function (root, resultsum, stack, mysum, result) {
  stack.push(root.val);
  mysum += root.val;

  if (!root.left && !root.right && resultsum === mysum) {
    result.push(stack.slice(0));
  }

  if (root.left) {
    getSumPath(root.left, resultsum, stack, mysum, result);
  }

  if (root.right) {
    getSumPath(root.right, resultsum, stack, mysum, result)
  }

  //两个方向都走完了，无路可走，回溯。
  //此处pop是为了从stack中删除该节点，不要占位置。
  stack.pop();
}

```

![image-20210131195947280](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210131195947280.png)

```js
function pathSum( root ,  sum ) {
    //递归
    //状态变量：temp数组，node当前结点，currentSum当前和
    //递归出口：到达叶子结点且currentSum == sum
    //剪枝：currentSum>sum时不再往下求
    //递归列表，往左右子树走
    const res = [];
    var dfs = function(node,currentSum,temp){
        //一进来就放
        temp.push(node.val);
        currentSum += node.val;
        
        if(!node.left && !node.right && currentSum == sum){
          res.push(temp.slice(0));
        }
        
        if(node.left){
            dfs(node.left,currentSum,temp);
        }
        
        if(node.right){
            dfs(node.right,currentSum,temp);
        }
        temp.pop();
    }
    if(root){
            dfs(root,0,[]);
    }
  
    return res;
}
```



# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)