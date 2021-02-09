# 用两个栈实现队列

## 题目

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

**示例 1：**

```
输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
```

**示例 2：**

```
输入：
["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
输出：[null,-1,null,null,5,2]
```

**提示：**

- `1 <= values <= 10000`
- `最多会对 appendTail、deleteHead 进行 10000 次调用`

## 思路

使用两个栈，当插入元素时，push进stack1；当删除元素时，判断stack2的状态：

- 若stack2 为空，遍历stack1的值pop出来，将其push进stack2中。
- 若stack2不为空，直接pop出stack2的值。

**注意，创建两个类使用this.xxx**

```js
var CQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.stack2.length) {
    return this.stack2.pop();
  }
  //将stack1放入stack2
  while (this.stack1.length) {
    this.stack2.push(this.stack1.pop())
  }

  return this.stack2.pop() || -1;
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```

![image-20210209134233535](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210209134233535.png)