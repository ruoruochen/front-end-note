# 序列化二叉树

## 题目

请实现两个函数，分别用来序列化和反序列化二叉树

## 思路

- 若一颗二叉树是不完全的，我们至少需要两个遍历才能将它重建（像题目重建二叉树一样）
- 但是这种方式仍然有一定的局限性，比如二叉树中不能出现重复节点。
- 如果二叉树是一颗完全二叉树，我们只需要知道前序遍历即可将它重建。
- 因此在序列化时二叉树时，可以将空节点使用特殊符号存储起来，这样就可以模拟一棵完全二叉树的前序遍历
- 在重建二叉树时，当遇到特殊符号当空节点进行处理

## 代码

```js
//序列化
function Serialize(pRoot, arr = []) {
    //空
    if (!pRoot) {
        arr.push('#');
    } else {
        //中左右
        arr.push(pRoot.val);
        Serialize(pRoot.left, arr)
        Serialize(pRoot.right, arr)
    }
    //以逗号分隔
    return arr.join(',');
}
//反序列化
function Deserialize(s) {
    //字符串为空
    if (!s) {
        return null;
    }
    //split() 方法用于把一个字符串分割成字符串数组。
    return deserialize(s.split(','));
}

function deserialize(arr) {
    let node = null;
    //取出第一个元素
    const current = arr.shift();
    //节点不为空
    if (current !== '#') {
        //根节点
        node = { val: current }
        //左右子树
        node.left = deserialize(arr);
        node.right = deserialize(arr);
    }
    return node;
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)