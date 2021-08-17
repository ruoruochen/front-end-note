```js
function LRU( operators ,  k ) {
    let res = [];
    let map = new Map();
    for(let i = 0; i < operators.length; i++){
        let [op, key, value] = operators[i];
        if(op === 1) {
            //缓存数 >= 容量
            if(map.size >= k) {
                //按顺序删除最不常用的
                map.delete(map.keys().next().value)
                //存入当前值
                map.set(key, value);
            } else {
                //缓存数 <容量
                //判断该key值是否存在，如果存在，则删除后重新添加
                if(map.has(key)) {
                    map.delete(key)                 
                }
                map.set(key, value);
            }
        //查找
        } else if(op === 2) {
            //不存在key值，返回-1
            if(!map.has(key)) {
                res.push(-1);
            } else {
                //获取key值对应的value，并重新存储。
                let value = map.get(key);
                res.push(value);
                map.delete(key);
                map.set(key, value);
            }
        }
    }
    return res;
}
```

