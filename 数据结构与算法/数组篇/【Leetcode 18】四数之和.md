# 四数之和

## 题目

给定一个包含 `n` 个整数的数组`nums`，判断 `nums` 中是否存在四个元素`a，b，c，d` ，使得 `a + b + c + d = 0 ？`找出所有满足条件且不重复的四元组。

注意：答案中不可以包含重复的四元组。

```js
给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```

## 思路

你已经经历了两数之和、三数之和，玩玩没想到，还有四数之和...

其实，后面还有五数之和，六数之和...

到这里其实我们就能发现一些规律，我们可以像三数之和那样，我们可以通过大小指针来逼近结果，从而达到降低一层时间复杂度的效果。

**可以进行剪枝**

不管是几数之和，我们都用这种方法来进行优化

## 代码

**注意此处为什么需要i>0  j>i+1，因为j可以和i的数值相同。**

剪枝

```js
var fourSum = function (nums, target) {
    //如果数组元素不够4个
    if (nums.length < 4) {
        return [];
    }
    //排序
    nums.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < nums.length - 3; i++) {
        //去重
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        //如果4个当前最小的值加起来都大于target，查询结束。
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
            break;
        }
        //指针j
        for (let j = i + 1; j < nums.length - 2; j++) {
            //去重
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            //左指针和右指针
            let left = j + 1,
                right = nums.length - 1;
            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                }
                if (sum <= target) {
                    while (nums[left] === nums[++left]);
                } else {
                    while (nums[right] === nums[--right]);
                }
            }
        }
    }
    return result;
};
```

## 附加练习题：五数之和

```js
var fiveSum = function (nums, target) {
  if (nums.length < 5) {
    return [];
  }
  const result = [];
  nums.sort((a, b) => a - b);
  if (Array.isArray(nums)) {
    for (let i = 0; i < nums.length - 4; i++) {
      //去重
      if (i && nums[i] === nums[i - 1]) { continue }
      //如果当前最小5个加起来>target，停止寻找
      if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] + nums[i + 4] > target) {
        break;
      }
      //指向第二个数
      for (let j = i + 1; j < nums.length - 3; j++) {
        //去重
        if (j > i + 1 && nums[j] === nums[j - 1]) {
          continue;
        }
        //指向第三个数
        for (let k = j + 1; k < nums.length - 2; k++) {
          //去重
          if (k > j + 1 && nums[k] === nums[k - 1]) {
            continue;
          }
        }
        //左右指针
        let left = k + 1;
        let right = nums.length - 1;
        while (left < right) {
          const sum = nums[i] + nums[j] + nums[k] + nums[left] + nums[right];
          if (sum === target) {
            result.push([nums[i], nums[j], nums[k], nums[left], nums[right]]);
          }
          if (sum <= target) {
            //去重
            while (nums[left] === nums[left - 1]) {
              left++;
            }
          } else {
            while (nums[right] === nums[right + 1]) {
              right--;
            }
          }
        }
      }
    }
  }
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)

