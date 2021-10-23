# 使用pm2管理应用报错：

```
pm2 : 无法加载文件 C:\Users\Asus\AppData\Roaming\npm\pm2.ps1。
未对文件 C:\Users\Asus\AppData\Roaming\npm\pm2.ps1 进行数字签名。无法在当前系统上运行该脚本。有关运行脚本和设置执行策略的详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID =135170 中的 about_Execution_Policies。 
所在位置 行:1 字符: 1 + pm2 start .\app
```

解决方法:
1.
以管理员身份运行power shell
2.
输入set-ExecutionPolicy RemoteSigned
然后输入A 回车
问题解决

![image-20210117164531008](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210117164531008.png)