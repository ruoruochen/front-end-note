# 两个链表的第一个公共节点

剑指Offer52

## 题目

输入两个链表，找出它们的第一个公共结点。

**程序尽量满足O(n)时间复杂度，且仅用O(1)内存**

示例 1：

![img](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/160_example_1.png)

```
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Reference of the node with value = 8
输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

## 思路

#### 快慢指针法

- 1.先找到两个链表的长度`length1`、`length2`
- 2.让长一点的链表先走`length2-length1`步，让长链表和短链表起点相同
- 3.两个链表一起前进，比较获得第一个相等的节点
- 时间复杂度`O(length1+length2)` 空间复杂度`O(0)`

![image-20210110134735970](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210110134735970.png)


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

![image-20210114140418738](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114140418738.png)

#### 哈希集合法

```js
var getIntersectionNode = function(headA, headB) {
        const set = new Set();
        let temp = headA;
        while(temp){
            set.add(temp);
            temp = temp.next;
        }
        temp = headB;
        while(temp){
            if(set.has(temp)){
                return temp;
            }
            temp = temp.next;
        }
        return null;
};
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)
