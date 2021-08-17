# 三数之和

## 题目

给定一个包含 `n` 个整数的数组`nums`，判断 `nums` 中是否存在三个元素`a，b，c` ，使得 `a + b + c = 0 ？`找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

```js
例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

## 思路

题目中说明可能会出现多组结果，所以我们要考虑好去重

- 1.为了方便去重，我们首先将数组排序
- 2.对数组进行遍历，取当前遍历的数`nums[i]`为一个基准数，遍历数后面的数组为寻找数组
- 3.在寻找数组中设定两个起点，最左侧的`left`(`i+1`)和最右侧的`right`(`length-1`)
- 4.判断`nums[i] + nums[left] + nums[right]`是否等于0，如果等于0，加入结果，并分别将`left`和`right`移动一位
- 5.如果结果大于0，将`right`向左移动一位，向结果逼近
- 5.如果结果小于0，将`left`向右移动一位，向结果逼近

注意整个过程中要考虑去重

## 代码

```js
var threeSum = function (nums) {
    const result = [];
    //从小到大排列
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        // 跳过重复数字
        if (i && nums[i] === nums[i - 1]) { continue; }
        //左指针
        let left = i + 1;
        //右指针
        let right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum > 0) {
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                //值=0 加入结果数组
                result.push([nums[i], nums[left++], nums[right--]]);
                //继续移动指针寻找
                // 跳过重复数字
                while (nums[left] === nums[left - 1]) {
                    left++;
                }
                // 跳过重复数字
                while (nums[right] === nums[right + 1]) {
                    right--;
                }
            }
        }
    }
    return result;
}
```

<<<<<<< HEAD
=======
```js
var threeSum = function(nums) {
    //定一（相同跨过） 移二
    nums.sort((a,b)=>a-b);
    const res = [];
    for(let i = 0;i<nums.length-2;i++){
        //相同跨过
        if(i && nums[i] === nums[i-1]) continue;
        let p1 = i+1 ,p2 = nums.length-1;
        while(p1<p2){
            //去重
            if((p1>i+1&&nums[p1]===nums[p1-1])) {
                p1++;
                continue
            }
            if((p2<nums.length-1&&nums[p2]===nums[p2+1])){
                p2--;
                continue;
            }
            let sum = nums[i]+nums[p1]+nums[p2];
            if(sum === 0){
                res.push([nums[i],nums[p1],nums[p2]]);
                p1++;
                p2--;
            }else if(sum<0){
                p1++;
            }else{
                p2--;
            }
        }
    }
    return res;
};
```


>>>>>>> a9f8a625a0f9e0944befa320c5e63711529a707a
![image-20210202193325642](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210202193325642.png)

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)

