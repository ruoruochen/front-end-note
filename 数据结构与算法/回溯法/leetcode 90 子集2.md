# leetcode 90 子集2

给定一个可能包含重复元素的整数数组 ***nums***，返回该数组所有可能的子集（幂集）。

**说明：**解集不能包含重复的子集。

**解题思路：**

对于数组中的每一个数字，有两种状态，取或不取。这个问题为一个树形问题，故采用回溯法解决。难点在于如何去重，即剪枝。

- 将数组从小到大排序，重复数字，只取第一个。

- 一个数字有两种状态：

  1、不取，直接存入结果数组

  2、取，继续往后搜索。

**刻意联系的思路：**

1、递归树，状态变量：当前下标和新数组

![image-20210314153106066](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210314153106066.png)

2、递归出口：当前下标到达末尾，即搜索完毕。

3、选择列表：从当前下标数字往后的数字选取，存入新数组中

​	**若存在重复数字，只取第一次出现的数字，接着continue**

4、剪枝，去重

5、撤销操作：新数组中pop

```js
var subsetsWithDup = function (nums) {
  let len = nums.length
  nums.sort((a, b) => a - b);
  const res = [];
  helper();
  return res;

  function helper(temp = [], start = 0) {
    //不选择当前数字，直接push
    res.push(temp);
    //当全选时，退出
    if (temp.length === len) return;
    //选择列表
    for (let i = start; i < len; i++) {
      //相同元素只取第一个
      if (i > start && nums[i] === nums[i - 1]) continue
      temp.push(nums[i]);
      helper(temp.slice(), i + 1);
      temp.pop();
    }
  }

};


console.log(subsetsWithDup([1, 2, 2]));

```

