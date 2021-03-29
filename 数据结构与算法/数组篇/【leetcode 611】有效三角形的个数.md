## 【leetcode 611】有效三角形的个数

给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。

**示例 1:**

```js
输入: [2,2,3,4]
输出: 3
解释:
有效的组合是: 
2,3,4 (使用第一个 2)
2,3,4 (使用第二个 2)
2,2,3
```

#### 解法一：枚举

**形成三角形的条件：两边之和大于第三边**

```js
var triangleNumber = function (arr) {
  let count = 0;
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; k++) {
        if (arr[i] + arr[j] > arr[k] && arr[i] + arr[k] > arr[j] && arr[j] + arr[k] > arr[i]) {
          count++;
        }
      }
    }
  }
  return count;
};
```

- 时间复杂度：O(N^3)，其中 N是数组的长度。
- 空间复杂度：O(1)。

#### 解法二：排序+双指针

如果三角形的三条边长从小到大为 a 、 b 、 c ，当且仅当 a + b > c 这三条边能组成三角形，即两条短边加起来 > 第三边即可

**解题思路：**

 先数组排序，排序完后，固定最长的边，利用双指针法判断其余边。

- 最长边从后往前搜索，nums[k] （ k 从 nums.length - 1 往左搜索至 0）

- 双指针 i , j。以 nums[i] （i 从 0 往右搜索）作为最短边，以 nums[j] 作为第二个数  （ j 从 nums.length - 2 往左搜索） 。


- 判断 nums[i] + nums[j] 是否大于 nums[k] 

  - 如果nums[i] + nums[j] > nums[k] ，则可构成三角形的三元组个数加 j-i ，并且 j 往前移动一位（ j-- ），继续进入下一轮判断。

  ```
  nums[i] + nums[j] > nums[k] 则：
  
  nums[i+1] + nums[j] > nums[k]
  nums[i+2] + nums[j] > nums[k]
  ...
  nums[j-1] + nums[j] > nums[k]
  
  因为nums[i]后面的数都比nums[i]大。
  ```

  - 如果nums[i] + nums[j] <= nums[k]，则 i ++ 继续判断。
    

```js
var triangleNumber = function (arr) {
  let count = 0;
  let len = arr.length;

  for (let k = len - 1; k > 1; k--) {
    let i = 0, j = len - 2;
    if (arr[i] + arr[j] > arr[k]) {
      count += j - i;
      j--;
    } else {
      i++;
    }
  }
  return count;
};
```

