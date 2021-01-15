# 两数之和

## 题目

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

```js
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

## 思路

使用一个`map`将遍历过的数字存起来，值作为`key`，下标作为值。

对于每一次遍历：

- 取`map`中查找是否有`key`为`target-nums[i]`的值
- 如果取到了，则条件成立，返回。
- 如果没有取到，将当前值作为`key`，下标作为值存入`map`

时间复杂度：`O(n)`

空间复杂度`O(n)`

## 代码

```js
var twoSum = function (nums, target) {
    const map = {};
    if (Array.isArray(nums)) {
        for (let i = 0; i < nums.length; i++) {
            //存在与nums[i]和为target的数。
            if (map[target - nums[i]] != undefined) {
                //返回两个的下标
                return [map[target - nums[i]], i];
            } else {
                //将该数和下标存入map
                map[nums[i]] = i;
            }
        }
    }
    return [];
};
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)

