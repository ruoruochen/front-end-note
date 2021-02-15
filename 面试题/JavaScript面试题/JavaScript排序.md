`要求：手写+描述思路`

## 选择排序

#### 基本思想

遍历length-1次，每一次从左往右找，每遍历一次,将最小值跟当前遍历的第一个元素交换。

#### 代码实现

```js
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i];
    let index = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < min) {
        min = arr[j];
        index = j;
      }
    }

    if (index != i) {
      //也可以使用解构赋值 
      //[arr[i], arr[index]] = [arr[index], arr[i]]
      let temp = arr[i];
      arr[i] = arr[index];
      arr[index] = temp;
    }
  }
  return arr;
}
```

**时间复杂度：O(n²）**

**空间复杂度：O(1)**

#### 优劣

##### 优点：

- 上手比较简单，比较符合人的正常思路逻辑。

##### 缺点：

- **时间复杂度O(n^2)**，运算速度很慢，当数组元素个数比较多时，耗时长。

## 冒泡排序

#### 基本思想

遍历数组，每一次，从后往前进行比较， 相邻的两两比较，小的向前浮动。当一次遍历前后数组不产生变化时，说明该数组已经有序，结束排序。

```
面试官提问：
为什么要从后往前比较？
```



#### 代码实现

```js
function bubbleSort(arr) {
  var flag = true;
  for (var i = 0; i < arr.length && flag; i++) {
    flag = false;
    for (var j = arr.length - 1; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
        flag = true;
      };
    };
  };
  return arr;
}
```

**时间复杂度：O(n²）**

**空间复杂度：O(1)**

#### 优劣

##### 优点：

- 稳定；

##### 缺点：

- 时间复杂度O(n^2)，计算慢。且比较次数不一定。

## 插入排序

#### 基本思想

每次将一个待排序的元素按其大小插入到一个已排好的有序序列中，直到全部数字排好序。

#### 代码实现

```js
function insertionSort(arr) {
  var len = arr.length;
  var preIndex, current;// 从后向前扫描索引，当前元素数值
  for (var i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      //往后移动
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

```

#### 优劣

##### 优点：

- 稳定，快；

##### 缺点：

- 比较次数不一定，比较次数越少，插入点后的数据移动越多，特别是当数据总量庞大的时候，但用链表可以解决这个问题。

## 快速排序

#### 基本思路

用二分实现的快速排序。选择一个基准值，一般选择数组的一个值，遍历数组，大的放右边，小的放左边，一样大的放中间利用递归重复对大的数组和小的数组进行拆分，最后得出排序后的数组。

#### 代码实现

```js
function quickSort(arr) {
  //递归出口
  if (arr.length <= 1) {
    return arr;
  } else {
    const pivot = arr[0];//基准点
    const pivotArr = [];//一样大
    const lowArr = [];//小
    const highArr = [];//大

    arr.forEach(current => {
      if (current === pivot) {
        pivotArr.push(current);
      } else if (current > pivot) {
        highArr.push(current);
      } else {
        lowArr.push(current);
      }
    })
    return quickSort(lowArr).concat(pivotArr).concat(quickSort(highArr));
  }
}
```

#### 优劣

优点：

- 速度快，O(n*log n)

缺点：

- 快速排序的的平均时间复杂度是O(n * log n)，但最糟情况的复杂度是O(n ^ 2)，对于[1, 2, 3, 4, 5] 这种有序数组。快排的稳定性不如归并排序.

## 归并排序

#### 基本思想

把数组分成N份，进行两两归并，获得 n/2 个长度为 2 的有序序列，将若干有序序列逐步归并，最终归并为一个有序序列。

```
1. 把 n 个记录看成 n 个长度为 l 的有序子表 
2. 进行两两归并使记录关键字有序，得到 n/2 个长度为 2 的有序子表
3. 重复第 2 步直到所有记录归并成一个长度为 n 的有序表为止。
```

#### 代码实现

```js
function merge(left, right) {
  var tmp = [];

  while (left.length && right.length) {
    if (left[0] < right[0])
      tmp.push(left.shift());
    else
      tmp.push(right.shift());
  }

  return tmp.concat(left, right);
}

function mergeSort(a) {
  if (a.length === 1) 
    return a;

  var mid = Math.floor(a.length / 2)
    , left = a.slice(0, mid)
    , right = a.slice(mid);

  return m!erge(mergeSort(left), mergeSort(right));
}
```

**时间复杂度O(nlogn)**

**空间复杂度O(n)**

#### 优劣

##### 优点：

- 容易理解，稳定

##### 缺点：

- 需要辅助空间

## 堆排序

#### 基本思想

将待排序的序列构造成一个大顶堆。此时，整个序列的最大值就是堆顶的根节点。插入或删除元素的时候重新调整堆，保持其有序状态。

调整方法：

从第一个非叶子节点开始依次对数组中的元素进行下沉操作

- 和孩子节点的最大值`max`比较
- 大于`max` — 不需要在下沉
- 小于`max` — 和`max`交换位置 - 继续和下一层孩子节点比较，直到队列末尾

```
堆是具有下列性质的完全二叉树：每个结点的值都小于或等于其左右孩子结点的值（称为小根堆）；或者每个结点的值都大于或等于其左右孩子结点的值（称为大根堆）。
```

#### 代码实现

```js
function ajustMaxHeap(array, index, length) {
    //i为每一层的第一个节点
    for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
        //同层的下一个节点存在 且数值比该节点小 向右移动
        if (i + 1 < length && array[i + 1] > array[i]) {
            i++;
        }
        //如果顶层节点大于底层节点，break
        if (array[index] >= [array[i]]) {
            break;
        } else {
          //交换
            [array[index], array[i]] = [array[i], array[index]];
            index = i;
        }
    }
}

//构建大顶堆
function createMaxHeap(arr, length) {
    // 子树数目
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        //调整大顶堆
        ajustMaxHeap(arr, i, length);
    }
    return arr;
}
```

**时间复杂度为：O(nlgn)**

**空间复杂度为：O（1）**

#### 优劣

##### 优点：

- 排序快，且最坏情况下o(nlgn)的时间复杂度

##### 缺点：

- 不稳定

```
我们知道堆的结构是节点i的孩子为2*i和2*i+1节点，大顶堆要求父节点大于等于其2个子节点，小顶堆要求父节点小于等于其2个子节点。在一个长为n 的序列，堆排序的过程是从第n/2开始和其子节点共3个值选择最大(大顶堆)或者最小(小顶堆),这3个元素之间的选择当然不会破坏稳定性。但当为n /2-1, n/2-2, ...1这些个父节点选择元素时，就会破坏稳定性。有可能第n/2个父节点交换把后面一个元素交换过去了，而第n/2-1个父节点把后面一个相同的元素没有交换，那么这2个相同的元素之间的稳定性就被破坏了。所以，堆排序不是稳定的排序算法。
```

