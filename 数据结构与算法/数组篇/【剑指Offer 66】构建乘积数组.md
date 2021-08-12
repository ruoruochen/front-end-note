##  构建乘积数组

### 题目

给定一个数组A`[0,1,...,n-1]`,请构建一个数组B`[0,1,...,n-1]`,其中B中的元素`B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]`。不能使用除法。

### 思路

`B[i]`的值是`A`数组所有元素的乘积再除以`A[i]`，但是题目中给定不能用除法，我们换一个思路，将`B[i]`的每个值列出来，如下图：

![image-20210115140209008](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210115140209008.png)

`B[i]`的值可以看作下图的矩阵中每行的乘积。

可以将`B`数组分为上下两个三角，先计算下三角，然后把上三角乘进去。

### 代码

```js
function multiply(array) {
    const result = [];
    if (Array.isArray(array) && array.length > 0) {
        // 计算下三角  计算前i - 1个元素的乘积
        result[0] = 1;
        for (let i = 1; i < array.length; i++) {
            result[i] = result[i - 1] * array[i - 1];
        }
        // 乘上三角（越过i） 计算后N - i个元素的乘积并连接
        let temp = 1;
        for (let i = array.length - 2; i >= 0; i--) {
            temp = temp * array[i + 1];
            result[i] = result[i] * temp;
        }
    }
    return result;
}
```

# 更多资料

整理不易，若对您有帮助，请给个「关注+点赞」，您的支持是我更新的动力 👇

📖数据结构专栏：[剑指 Offer 题解 + JS 代码](https://blog.csdn.net/weixin_43786756/category_10716516.html) 
🐱Github笔记 ：[ruoruochen GitHub](https://github.com/ruoruochen/front-end-note)

