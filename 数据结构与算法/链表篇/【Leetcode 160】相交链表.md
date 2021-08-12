# 相交链表

leetcode 160

## 题目

编写一个程序，找到两个单链表相交的起始节点。

如下面的两个链表：

![image-20210110140222969](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114142400778.png)

在节点 c1 开始相交。

**示例 1：**

![image-20210110140249178](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210110140249178.png)

```j
 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Reference of the node with value = 8
输入解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

## 思路

#### 1.暴力法

对于链表 A 的每个节点，都去链表 B 中遍历一遍找看看有没有相同的节点。

**复杂度**

- 时间复杂度：O(M * N)*O*(*M*∗*N*), M, N 分别为两个链表的长度。
- 空间复杂度：O(1)*O*(1)。

#### 2. 哈希表

- 先遍历一遍链表 A，用哈希表把每个节点都记录下来(注意要存节点引用而不是节点值)。
- 再去遍历链表 B，找到在哈希表中出现过的节点即为两个链表的交点。

**复杂度**

- 时间复杂度：O(M + N)*O*(*M*+*N*), M, N 分别为两个链表的长度。
- 空间复杂度：O(N)*O*(*N*)，N 为链表 A 的长度。

#### 3.双指针

![image-20210110142729675](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210110142729675.png)

![image-20210110142800807](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210110142800807.png)

![image-20210110142856601](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210110142856601.png)

![image-20210110143004700](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210110143004700.png)

**如果链表有交点**

![image-20210110143035010](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114144103040.png)

![image-20210110143051219](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210110143035010.png)

**如果链表没有交点**

两个链表长度一样，第一次遍历结束后 pA 和 pB 都是 null，结束遍历
两个链表长度不一样，两次遍历结束后 pA 和 pB 都是 null，结束遍历

**复杂度**

- 时间复杂度：O(M + N)*O*(*M*+*N*), M, N 分别为两个链表的长度。
- 空间复杂度：O(1)*O*(1)。

## 代码

#### 1.暴力法

```js
var getIntersectionNode = function (headA, headB) {
    if (!headA || !headB) return null;

    let pA = headA;
    while (pA) {
        let pB = headB;

        while (pB) {
            if (pA === pB) return pA;
            pB = pB.next;
        }

        pA = pA.next;
    }
};
```

![image-20210114144103040](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114144240253.png)

#### 2.哈希表

```js
var getIntersectionNode = function (headA, headB) {
  if (!headA && !headB) {
    return null;
  }

  const hashmap = new Map();
  let pA = headA;
  while (pA) {
    hashmap.set(pA, 1);
    pA = pA.next;
  }

  let pB = headB;
  while (pB) {
    if (hashmap.has(pB)) return pB;
    pB = pB.next;
  }
}
```

![image-20210114144240253](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210110143051219.png)

#### 3.双指针

```js
var getIntersectionNode = function (headA, headB) {
  if (!headA && !headB) {
    return null;
  }

  let pA = headA;
  let pB = headB;
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
}
```

![image-20210114142925484](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114142925484.png)

快慢指针法（两个链表的第一个公共节点的方法）

```js
var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;
  var lengthA = getLength(headA);
  var lengthB = getLength(headB);
  var long, short, distance;
  if (lengthA > lengthB) {
    long = headA;
    short = headB;
    distance = lengthA - lengthB;
  } else {
    long = headB;
    short = headA;
    distance = lengthB - lengthA;
  }

  // 长的移动位置
  while (distance--) {
    long = long.next;
  }

  //一起走
  while (long && short) {
    if (long === short) {
      return long;
    }
    long = long.next;
    short = short.next;
  }
  return null;
};

function getLength(head) {
  let count = 0;
  let current = head;
  while (current) {
    count++;
    current = current.next;
  }
  return count;
}
```



![image-20210114142825887](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114142825887.png)



# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)