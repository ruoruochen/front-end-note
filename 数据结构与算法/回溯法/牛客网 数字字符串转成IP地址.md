# 数字字符串转成IP地址

现在有一个只包含数字的字符串，将该字符串转化成IP地址的形式，返回所有可能的情况。

例如：

给出的字符串为"25525522135",

返回["255.255.22.135", "255.255.221.35"]. (顺序没有关系)

```js
/**
  * 
  * @param s string字符串 
  * @return string字符串一维数组
  */
function restoreIpAddresses( s ) {
   const res= [];
   const len = s.length;
    
   var dfs =function (index,temp){
       if(temp.length>4){
           return
       }
       
       if(index === len && temp.length ===4){
           return res.push(temp.join('.'));
       }
       
       for(let i =1;i<=3;i++){
           if(index+i<=len){
               var num =s.substr(index,i);
               if(Number(num) <= 255){
                   if((num.length>1&&num[0]!='0') || (num.length===1)){
                       temp.push(num);
                       dfs(index+i,temp);
                       temp.pop();  
                   }

               }

                            

           }
       }
   }
   
   dfs(0,[]);
   return res;
}
module.exports = {
    restoreIpAddresses : restoreIpAddresses
};
```

