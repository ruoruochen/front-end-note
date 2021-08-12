## 数据流中的中位数

## 题目

如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。

例如，

[2,3,4] 的中位数是 3

[2,3] 的中位数是 (2 + 3) / 2 = 2.5

设计一个支持以下两种操作的数据结构：

void addNum(int num) - 从数据流中添加一个整数到数据结构中。
double findMedian() - 返回目前所有元素的中位数。
**示例 1：**

```
输入：
["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]
[[],[1],[2],[],[3],[]]
输出：[null,null,null,1.50000,null,2.00000]
```

## 思路

#### 解法1 暴力法

数组排序，取中间值

```js
var MedianFinder = function () {
  this.data = [];
};

MedianFinder.prototype.addNum = function (num) {
  //添加数据
  this.data.push(num);
};

MedianFinder.prototype.findMedian = function () {
  const length = this.data.length;
  if (!length) {
    return null;
  }
  //排序
  this.data.sort((a, b) => a - b);

  //中间
  const mid = Math.floor((length - 1) / 2);
  if (length % 2) {
    return this.data[mid];
  }
  return (this.data[mid] + this.data[mid + 1]) / 2;
};

```

![image-20210116113153195](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116113153195.png)

#### 解法2 二分法

其实不需要每次添加元素的时候，都对全部元素重新排序。如果之前一直保证元素是有序的，那么添加新元素的时候，只需要将元素插入到正确位置即可，查找正确位置可以通过「二分搜索」来完成。

```js
var MedianFinder = function() {
    this.data = [];
};

MedianFinder.prototype.addNum = function(num) {
    if (!this.data.length) {
        this.data.push(num);
        return;
    }
	//保持有序
    let left = 0,
        right = this.data.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (this.data[mid] === num) {
            this.data.splice(mid, 0, num);
            return;
        } else if (this.data[mid] < num) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    this.data.splice(right + 1, 0, num);
};

MedianFinder.prototype.findMedian = function() {
    const length = this.data.length;
    if (!length) {
        return null;
    }

    const mid = Math.floor((length - 1) / 2);
    if (length % 2) {
        return this.data[mid];
    }
    return (this.data[mid] + this.data[mid + 1]) / 2;
};
```

![image-20210116113901845](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116113901845.png)

#### 解法 3: 最大堆 + 最小堆

对于这种动态数据，堆是极好的解决方案。准备两个堆：

最大堆：存放数据流中较小的一半元素
最小堆：存放数据流中较大的一半元素
需要保证这 2 个堆的“平衡”。这里的平衡指得是：最大堆的大小 = 最小堆的大小， 或者 最大堆的大小 = 最小堆的大小 + 1。

当调用 findMedian 查询中位数的时候，中位数就是最大堆的堆顶元素，或者 (最大堆的堆顶元素 + 最小堆的堆顶元素)/2

剩下的问题就是怎么保证堆的平衡？步骤如下：

先让 num 入 maxHeap
取出 maxHeap 的堆顶元素，放入 minHeap
若此时最大堆的大小 < 最小堆的大小，取出 minHeap 的堆顶元素，让入 maxHeap
由于 JavaScript 中没有堆，所以要自己实现。在实现的时候，堆的代码其实只需要一份，堆中进行判定的比较函数由外界传入即可。

```js
const defaultCmp = (x, y) => x > y; // 默认是最大堆

const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

class Heap {
    /**
     * 默认是最大堆
     * @param {Function} cmp
     */
    constructor(cmp = defaultCmp) {
        this.container = [];
        this.cmp = cmp;
    }

    insert(data) {
        const { container, cmp } = this;

        container.push(data);
        let index = container.length - 1;
        while (index) {
            let parent = Math.floor((index - 1) / 2);
            if (!cmp(container[index], container[parent])) {
                return;
            }
            swap(container, index, parent);
            index = parent;
        }
    }

    extract() {
        const { container, cmp } = this;
        if (!container.length) {
            return null;
        }

        swap(container, 0, container.length - 1);
        const res = container.pop();
        const length = container.length;
        let index = 0,
            exchange = index * 2 + 1;

        while (exchange < length) {
            // // 以最大堆的情况来说：如果有右节点，并且右节点的值大于左节点的值
            let right = index * 2 + 2;
            if (right < length && cmp(container[right], container[exchange])) {
                exchange = right;
            }
            if (!cmp(container[exchange], container[index])) {
                break;
            }
            swap(container, exchange, index);
            index = exchange;
            exchange = index * 2 + 1;
        }

        return res;
    }

    top() {
        if (this.container.length) return this.container[0];
        return null;
    }
}


var MedianFinder = function() {
    this.maxHeap = new Heap();
    this.minHeap = new Heap((x, y) => x < y);
};

MedianFinder.prototype.addNum = function(num) {
    this.maxHeap.insert(num);
    this.minHeap.insert(this.maxHeap.top());
    this.maxHeap.extract();

    if (this.maxHeap.container.length < this.minHeap.container.length) {
        this.maxHeap.insert(this.minHeap.top());
        this.minHeap.extract();
    }
};

MedianFinder.prototype.findMedian = function() {
    return this.maxHeap.container.length > this.minHeap.container.length
        ? this.maxHeap.top()
        : (this.maxHeap.top() + this.minHeap.top()) / 2;
};


```

![image-20210116113925640](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116113925640.png)