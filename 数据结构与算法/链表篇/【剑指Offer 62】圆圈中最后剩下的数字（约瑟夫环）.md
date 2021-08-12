# 约瑟夫环

## 题目

`0,1,...,n-1`这`n`个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第`m`个数字。求出这个圆圈里剩下的最后一个数字。

其实这就是著名的约瑟夫环问题

## 思路

#### **解法1:用链表模拟环**

- 用链表模拟一个环
- 模拟游戏场景
- 记录头节点的前一个节点`current`，以保证我们找到的要删除的节点是`current.next`
- 每次循环m次找到目标节点删除，直到链表只剩下一个节点
- 时间复杂度`O(m*n)` 空间复杂度`O(n)`

#### **解法2:用数组模拟**

- 每次计算下标，需要考虑末尾条件

#### **解法3:数学推导**

- `f(n) = (f(n-1)+m)%n` 即 `f(n,m) = (f(n-1,m)+m)%n`
- 使用递归求解 边界条件为 `n=1`

#### **解法4**

大体思路：

n个人编号0,1,2,...,n-1，每数m次删掉一个人
假设有函数f(n)表示n个人最终剩下人的编号
n个人删掉1个人后可以看做n-1的状态，不过有自己的编号。
n个人删掉的第一个人的编号是(m-1)%n，那么n个人时删掉第一个人的后面那个人(m-1+1)%n一定是n-1个人时候编号为0的那个人，即n个人时的编号m%n（这个编号是对于n个人来考虑的），n-1个人时编号为i的人就是n个人时(m+i)%n
所以f(n)=(m+f(n-1))%n
f(1)=0，因为1个人时只有一个编号0。
因此可以将人数从2反推到n。



时间复杂度 `1>2>3>4`

易理解程度 `1>2>3>4`



## 代码

**解法1leetcode上超时！**

```js
// 解法1
function LastRemaining_Solution(n, m) {
    //如果数量、次数小于1 
    if (n < 1 || m < 1) {
        return -1;
    }
    //头指针指向第一个数字
    const head = { val: 0 }
	//模拟环
    let current = head;
    for (let i = 1; i < n; i++) {
        current.next = { val: i }
        current = current.next;
    }
    //尾部指向头节点
    current.next = head;
	//当环中的数量>1时进行循环
    while (current.next != current) {
        //循环找删除的节点
        for (let i = 0; i < m - 1; i++) {
            current = current.next;
        }
        //跨过删除节点
        current.next = current.next.next;
    }
    return current.val;
}
```

```js
// 解法2
function LastRemaining_Solution(n, m) {
    if (n < 1 || m < 1) {
        return -1;
    }
    const array = [];
    let index = 0;
    for (let i = 0; i < n; i++) {
        array[i] = i;
    }
    //长度>1时循环
    while (array.length > 1) {
        //计算删除节点的坐标
        index = (index + m) % array.length - 1;
        if (index >= 0) {
            //从Index坐标开始删除一个元素
            array.splice(index, 1);
        } else {
            //如果index<0，删除末尾元素
            array.splice(array.length - 1, 1);
            //指向第一个数字
            index = 0;
        }
    }
    return array[0];
}
```

```  js
// 解法3
function LastRemaining_Solution(n, m) {
    if (n < 1 || m < 1) {
        return -1;
    } else {
        return joseoh(n, m);
    }

}

function joseoh(n, m) {
    //递归条件
    if (n === 1) {
        return 0;
    }
    //等价表达式
    return (joseoh(n - 1, m) + m) % n;
}
```

![image-20210113172656947](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210113172656947.png)

```js
//解法4
var lastRemaining = function (n, m) {
  let ans = 0;
  for (let i = 2; i <= n; i++) {
    ans = (ans + m) % i;
  }
  return ans;
};
```

![image-20210113172925825](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210113172925825.png)

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)