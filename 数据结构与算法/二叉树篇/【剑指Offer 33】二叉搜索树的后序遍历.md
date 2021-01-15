# 二叉搜索树的后序遍历

## 题目

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

## 思路

1. 后序遍历分成三部分：
   - 最后一个节点为根节点
   - 左子树的值比根节点小
   - 右子树的值比根节点大
2. 先检验左子树，左侧比根节点小的值均判定为左子树
3. 除最后一个节点和左子树外的其他值为右子树，若右子树有一个比根节点小，则返回false。
4. 若存在左右子树，递归检测是否规范。

#### 代码

```js
function VerifySquenceOfBST(sequence) {
  if (sequence && sequence.length > 0) {
    const root = sequence[sequence.length - 1];
    for (var i = 0; i < sequence.length - 1; i++) {
      if (sequence[i] > root) {
        break;
      }
    }
    for (let j = i; j < sequence.length - 1; j++) {
      if (sequence[j] < root) {
        return false;
      }
    }
    var left = true;
    if (i > 0) {
      left = VerifySquenceOfBST(sequence.slice(0, i));
    }
    var right = true;
    if (i < sequence.length - 1) {
      right = VerifySquenceOfBST(sequence.slice(i, sequence.length - 1))
    }
    return left && right;
  }
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)