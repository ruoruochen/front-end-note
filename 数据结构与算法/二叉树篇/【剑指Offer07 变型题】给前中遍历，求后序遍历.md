# 给前中遍历，求后序遍历。

## 题目

给定一棵二叉树的前序遍历和中序遍历，求其后序遍历

输入描述:

两个字符串，其长度n均小于等于26。 第一行为前序遍历，第二行为中序遍历。 二叉树中的结点名称以大写字母表示：A，B，C....最多26个结点。

输出描述:

输入样例可能有多组，对于每组测试样例， 输出一行，为后序遍历的字符串。

样例：

```text
输入
ABC
BAC
FDXEAG
XDEFAG

输出
BCA
XEDGAF
```

## 思路

本题一共有两种思路：

1. 重建二叉树后进行后序遍历。
2. 递归拼接二叉树的后序遍历。★★★★★推荐

第一种思路，常规思路，比较繁琐，代码如下

```js
function getPostTraversal(pre, vin) {
  // 1、重构二叉树
  function reContructBinaryTree(pre, vin) {
    if (pre.length === 0) {
      return null;
    }
    if (pre.length === 1) {
      return new TreeNode(pre[0]);
    }
    const root = pre[0];
    const index = vin.indexOf(root);
    const preLeft = pre.substring(1, index+1);
    const preRight = pre.substring(index + 1);
    const vinLeft = vin.substring(0, index);
    const vinRight = vin.substring(index + 1);
    const node = new TreeNode(root);
    node.left = reContructBinaryTree(preLeft, vinLeft);
    node.right = reContructBinaryTree(preRight, vinRight);
    return node;
  }
  // 2、后序遍历
  function postorderTraversal(root) {
    const result = "";
    const stack = [];
    var last = null;
    let current = root;
    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      current = stack[stack.length - 1];
      if (!current.right || current.right == last) {
        current = stack.pop();
        result = result + current.val;
        last = current;
        current = null;
      } else {
        current = current.right;
      }
    }
    return result;
  }
  // 3、调用
  const mytree = reContructBinaryTree(pre, vin);
  const postResult = postorderTraversal(mytree);
  return postResult;
}
```

第二种思路，非常的简洁！！！代码如下：

```js
function getHRD(pre, vin) {
    if (!pre) {
        return '';
    }
    if (pre.length === 1) {
        return pre;
    }
    const head = pre[0];
    const splitIndex = vin.indexOf(head);
    const vinLeft = vin.substring(0, splitIndex);
    const vinRight = vin.substring(splitIndex + 1);
    const preLeft = pre.substring(1, splitIndex + 1);
    const preRight = pre.substring(splitIndex + 1);
    return getHRD(preLeft, vinLeft) + getHRD(preRight, vinRight) + head;
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)