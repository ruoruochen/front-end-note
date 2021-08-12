# 最小的k个数

## 题目

输入整数数组 `arr` ，找出其中最小的 `k` 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

**示例 1：**

```
输入：arr = [3,2,1], k = 2
输出：[1,2] 或者 [2,1]
```

#### 思路

#### 解法1 

sort排序

```js
var getLeastNumbers = function (arr, k) {
  const result = []
  arr.sort((a, b) => a - b);
  for (let i = 0; i < k; i++) {
    result.push(arr[i]);
  }
  return result;
};
```



![image-20210116114412121](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116114412121.png)

#### 解法2 

堆

堆是一种非常常用的数据结构。最大堆的性质是：节点值大于子节点的值，堆顶元素是最大元素。利用这个性质，整体的算法流程如下：

创建大小为 k 的最大堆
将数组的前 k 个元素放入堆中
从下标 k 继续开始依次遍历数组的剩余元素：
如果元素小于堆顶元素，那么取出堆顶元素，将当前元素入堆
如果元素大于/等于堆顶元素，不做操作
由于堆的大小是 K，空间复杂度是O(K)O(K)，时间复杂度是O(NlogK)O(NlogK)。

由于 JavaScript 中没有堆，所以需要手动实现。代码如下： 

```js
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

class MaxHeap {
  constructor(arr = []) {
      this.container = [];
      if (Array.isArray(arr)) {
          arr.forEach(this.insert.bind(this));
      }
  }

  insert(data) {
      const { container } = this;

      container.push(data);
      let index = container.length - 1;
      while (index) {
          let parent = Math.floor((index - 1) / 2);
          if (container[index] <= container[parent]) {
              break;
          }
          swap(container, index, parent);
          index = parent;
      }
  }

  extract() {
      const { container } = this;
      if (!container.length) {
          return null;
      }

      swap(container, 0, container.length - 1);
      const res = container.pop();
      const length = container.length;
      let index = 0,
          exchange = index * 2 + 1;

      while (exchange < length) {
          // 如果有右节点，并且右节点的值大于左节点的值
          let right = index * 2 + 2;
          if (right < length && container[right] > container[exchange]) {
              exchange = right;
          }
          if (container[exchange] <= container[index]) {
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

/**
* @param {number[]} arr
* @param {number} k
* @return {number[]}
*/
var getLeastNumbers = function(arr, k) {
  const length = arr.length;
  if (k >= length) {
      return arr;
  }

  const heap = new MaxHeap(arr.slice(0, k));
  for (let i = k; i < length; ++i) {
      if (heap.top() > arr[i]) {
          heap.extract();
          heap.insert(arr[i]);
      }
  }
  return heap.container;
};

```

![image-20210116115315865](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210116115315865.png)