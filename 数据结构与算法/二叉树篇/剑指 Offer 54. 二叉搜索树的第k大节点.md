#### 剑指 Offer 54. 二叉搜索树的第k大节点

easy，反中序 为递减。一个计数器判断当前为第几大节点，到达k直接return 不继续计算。

```js
var kthLargest = function(root, k) {
    //中序遍历就是递增 反中序 递减 右 中 左
    if(!root) return;
    const stack =[];
    let current = root,count=0;
    while(stack.length || current){
        while(current){
            stack.push(current);
            current = current.right;
        }

        current = stack.pop();
        count++;
        if(count == k){
            return current.val;
        }
        current = current.left;
    }
};
```

