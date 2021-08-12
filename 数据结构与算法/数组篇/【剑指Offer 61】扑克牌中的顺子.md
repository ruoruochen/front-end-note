# 扑克牌中的顺子

剑指Offer61:[扑克牌中的顺子](https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/)

## 题目

扑克牌中随机抽`5`张牌，判断是不是一个顺子，即这`5`张牌是不是连续的。

`2-10`为数字本身，`A`为`1`，`J`为`11...`大小王可以看成任何数字，可以把它当作`0`处理。

**示例 1:**

```
输入: [1,2,3,4,5]
输出: True
```

**示例 2:**

```
输入: [0,0,1,2,5]
输出: True
```

## 思路

- 1.数组排序 **排序时应使用numbers.sort((a, b) => a - b);，直接numbers.sort（）将不对最后一个元素进行排序**
- 2.遍历数组
- 3.若为`0`，记录`0`的个数加`1`
- 4.若不为`0`，记录和下一个元素的间隔
- 5.最后比较`0`的个数和间隔数，间隔数`>0`的个数则不能构成顺子
- 6.注意中间如果有两个元素相等则不能构成顺子

```js
var isStraight = function (numbers) {
  if (numbers && numbers.length > 0) {
    numbers.sort((a, b) => a - b);
    let kingNum = 0;
    let spaceNum = 0;
    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] === 0) {
        kingNum++;
      } else {
        //间距
        const space = numbers[i + 1] - numbers[i];
        //如果存在相同数字，直接返回false
        if (space == 0) {
          return false;
        } else {
          //间距总和+=space-1
          spaceNum += space - 1;
        }
      }
    }
    //0的数量刚好能抵消间距 则true
    return kingNum - spaceNum >= 0;
  }
  return false;
}
```

![image-20210114103919035](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210114094622296.png)

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)

