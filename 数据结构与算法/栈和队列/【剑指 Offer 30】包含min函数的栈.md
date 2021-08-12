# 包含min函数的栈

## 题目

定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

**示例:**

```
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.min();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.min();   --> 返回 -2.
```

**提示：**

1. 各函数的调用总次数不超过 20000 次

## 思路

借助一个辅助栈，其中：辅助栈的栈顶元素，就是原栈中最小值。

原栈和辅助栈的处理过程：

- 元素压入原栈时，如果辅助栈为空或`元素<=辅助栈的栈顶元素`，元素也压入辅助栈
- 元素弹出原栈时，如果元素 = 辅助栈栈顶元素，辅助栈也弹出元素

**注意：这里的判断条件是`元素<=辅助栈栈顶元素` 而不是`元素 < 辅助栈栈顶元素`，这是为了应对重复元素**

```javascript
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.dataStack = [];
  this.minStack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.dataStack.push(x);
  const length = this.minStack.length;
  if (!length || x <= this.minStack[length - 1]) {
    this.minStack.push(x);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const { minStack, dataStack } = this;
  if (minStack[minStack.length - 1] === dataStack[dataStack.length - 1]) {
    minStack.pop();
  }
  dataStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  const length = this.dataStack.length;
  if (!length) {
    return null;
  } else {
    return this.dataStack[length - 1];
  }
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  const length = this.minStack.length;
  if (!length) {
    return null;
  } else {
    return this.minStack[length - 1];
  }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
```



![image-20210209141240664](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210209141240664.png)