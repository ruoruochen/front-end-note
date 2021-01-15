# 树的子结构

## 题目

输入两棵二叉树`A`，`B`，判断`B`是不是`A`的子结构。（ps：我们约定空树不是任意一个树的子结构）

## 思路

首先找到`A`树中和`B`树根节点相同的节点

从此节点开始，递归`AB`树比较是否有不同节点

## 代码

```js
function HasSubtree(pRoot1, pRoot2) {
    let result = false;
    //均不空
    if (pRoot1 && pRoot2) {
        //根节点相同
        if (pRoot1.val === pRoot2.val) {
            //比较两者
            result = compare(pRoot1, pRoot2);
        }
        //没找到时进行查找
        if (!result) {
            //比较A的右子树与B树
            result = HasSubtree(pRoot1.right, pRoot2);
        }
        if (!result) {
            //比较A的左子树与B树
            result = HasSubtree(pRoot1.left, pRoot2);
        }
    }
    return result;
}

function compare(pRoot1, pRoot2) {
    if (pRoot2 === null) {
        return true;
    }
    if (pRoot1 === null) {
        return false;
    }
    //根节点不一样，返回
    if (pRoot1.val !== pRoot2.val) {
        return false;
    }
    //根节点一样，左子树与左子树比较，右子树与右子树比较
    return compare(pRoot1.right, pRoot2.right) && compare(pRoot1.left, pRoot2.left);
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)