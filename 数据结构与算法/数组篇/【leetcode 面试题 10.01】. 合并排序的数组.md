# 面试题 10.01. 合并排序的数组

给定两个排序后的数组 A 和 B，其中 A 的末端有足够的缓冲空间容纳 B。 编写一个方法，将 B 合并入 A 并排序。

初始化 A 和 B 的元素数量分别为 m 和 n。

#### 1、B放进A里排序

```js
var merge = function (A, m, B, n) {
  //B放进A里排序
  for (let i = m; i < m + n; i++) {
    A[i] = B[i - m];
  }
  A.sort((a, b) => a - b);
  return A;
};
```

![image-20210326171416758](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210326171416758.png)

#### 2、双指针

```js
var merge = function (A, m, B, n) {
  let i = 0, j = 0;
  const arr = [];
  while (i < m && j < n) {
    if (A[i] < B[j]) {
      arr.push(A[i]);
      i++;
    } else {
      arr.push(B[j]);
      j++;
    }
  }
  if (i < m) {
    for (let t = i; t < m; t++) {
      arr.push(A[t]);
    }
  } else if (j < n) {
    for (let t = j; t < n; t++) {
      arr.push(B[t]);
    }
  }
  for (let t = 0; t < m + n; t++) {
    A[t] = arr[t];
  }
  return A;
};
```

![image-20210326171955720](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210326171955720.png)

#### 3、