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

每次将一个待排序的数字按其关键码的大小插入到一个已排好的有序序列中，直到全部数字排好序。

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

把数组分成N份，进行两两归并，获得 n/2 个长度为 2 的局部有序表，不断地进行两两归并，最终合并成长度为N的有序表。

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

