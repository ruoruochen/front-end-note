# 二叉搜索树的第k小的元素

## 题目

 给定一棵二叉搜索树，请找出其中的第k小的结点。 例如， （5，3，7，2，4，6，8） 中，按结点数值大小顺序第三小结点的值为4。

## 思路

二叉搜索树的中序遍历即排序后的节点，本题实际考察二叉树的遍历。

## 代码

#### 递归实现

```js
function KthNode(root, k) {
  const arr = [];
  orderTraversal(root, arr)
  if (k > 0 && k <= arr.length) {
    return arr[k - 1];
  } else {
    return null
  }

}

function orderTraversal(root, arr) {
  if (root) {
    orderTraversal(root.left, arr);
    arr.push(root);
    orderTraversal(root.right, arr);
  }
}
```

#### 非递归实现

```js
function KthNode(root, k) {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current);
    current = current.right;
  }
  if (k > 0 && k <= result.length) {
    return result[k - 1];
  } else {
    return null;
  }
}

```

#### 其实我们不需要获取所有的result存起来，只要获取第k个result就好了

```js
function kNode(node, k) {
  //非递归.中序
  const stack = [];
  let current = node;
  let sum = 1;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    if (sum === k) {
      return current;
    } else {
      sum++;
    }
    current = current.right;
  }
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)