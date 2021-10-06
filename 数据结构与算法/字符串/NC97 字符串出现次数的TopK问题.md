#### **NC97** **字符串出现次数的TopK问题**

```js
function topKstrings( strings ,  k ) {
    // write code here
    //字符串排序
    strings.sort();
    let res = [];
    for(let i = 0; i < strings.length;) {
        let j = i + 1;
        while(j < strings.length && strings[i] === strings[j]) {
            j++;
        }
        res.push([strings[i], (j - i).toString()]);
        i = j;
    }
    res.sort((a, b) => b[1] - a[1]);
    return res.slice(0, k)
}
```

