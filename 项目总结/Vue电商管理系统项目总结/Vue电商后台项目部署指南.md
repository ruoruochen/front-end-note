# 【超详细小白教学】Vue电商项目部署指南

## 前言

食用指南：推荐照着我的设置来走。

在最前面，厚着老脸，跟大家要一个star。

🐱 [本项目Github源码](https://github.com/ruoruochen/vue-manage)

## 1 准备工作

### 1.1 云服务器购买

进入阿里云官网 找到上边导航栏的产品→云服务器ECS

![image-20210122124410391](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122124410391.png)

随后点击立即购买

![image-20210122124438550](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122124438550.png)

进入购买页面后，按照我的选择进行选择就好啦

![image-20210122124552724](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122124552724.png)

在实例中，选择当前带，筛选“1vCPU"![image-20210122124626556](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122124626556.png)

然后选择这个最便宜的17.1的就好啦，够用。其他默认

![image-20210122124738237](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122124738237.png)

接下来选择镜像 公共镜像Alibaba 2.1903。

![image-20210122124815077](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122124815077.png)

接下来是选择存储和购买时长。存储的话，购买最低配20就够用了，购买时长，初学者推荐先购买一个月或一周的。弄好了可以再续。

![image-20210122125003315](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122125003315.png)

弄好之后点击下一步网络和安全组。网络默认。

带宽计费模式这里我是选择了按使用流量，峰值设为4。（说到底还是为了节省，按固定带宽太贵了23元呢！按流量0.8/GB，再怎么花也不超过5块钱。）

```
关于带宽计费模式两者的购买意见：
服务器使用频繁：按固定
不频繁：使用流量
```

因为针对我们初学者来说，使用服务器最频繁的时候就是部署上线的时候，其他时候几乎没啥请求。所以按流量足以。

![image-20210122125152381](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122125152381.png)

然后是选择安全组

![image-20210122125550002](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122125550002.png)

选择一个安全组，然后按选择就好了。如果你这里没有安全组，先关掉这个模态框，在安全组那一行选择新建安全组。

![image-20210122125630596](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122125630596.png)

![image-20210122125714066](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122125714066.png)

跳转至创建安全组页面，所有都默认就好了，直接创建。

![image-20210122125757879](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122125757879.png)

选择完安全组之后，按下一步系统配置

![image-20210122125900085](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122125900085.png)

在这里选择自定义密码

记住这个账号密码，是后面ssh登录要用的。其它默认，直接下一步：分组设置

![image-20210122130007997](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122130007997.png)

这里啥也不用填，直接下一步确认订单

![image-20210122130108040](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122130108040.png)

打钩服务协议那一行，确认下单，付钱，就完事了。

![image-20210122130144359](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122130144359.png)

### 1.2 代码准备

#### **前端代码准备**

打开`main-prod.js`(如果你没有区分开发文件和发布文件的话，那就打开`main.js`)，修改配置请求根路径如下图所示。**其中118.31.171.210修改成你的服务器公网ip，端口号改成你的接口所用的端口，在此处我是用8801。可以跟着我写**

```js
axios.defaults.baseURL = "http://118.31.171.210:8801/api/private/v1/"
```

![image-20210121204232140](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121204232140.png)

此外，还需要进入到`Add.vue`中进行修改

![image-20210121201838717](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121201838717.png)

将uploadurl中的ip地址和端口号改成上面用的。

![image-20210121204346254](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121204346254.png)

接下来进行npm run build，生成打包的dist文件。

![image-20210121202132997](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121202132997.png)

别着急，还没结束，打开dist文件夹中的index.html

![image-20210121202321412](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121202321412.png)

自动生成的html代码里面的路径可能是错误的，我们需要将每一行`/`改成以下形式`./`

**错误路径：**

```html
  <link href="/css/cate_params.fed87b68.css" rel="prefetch">
```

![image-20210121202409668](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121202409668.png)

**正确路径：**

```html
  <link href="./css/cate_params.fed87b68.css" rel="prefetch">
```

![image-20210121202649707](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121202649707.png)

至此，我们的前端代码准备就绪。**我们只需要上传dist文件夹，为了方便，我们创建一个"部署"文件夹，将dist文件夹拷贝进去。**

![image-20210121202934658](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121202934658.png)

#### 后端代码准备

后端代码为vueShop-api-server，建议将里面包含的node_modules文件夹直接删除（下方截图已删除node_modules文件夹），因为在Linux中还需要进行依赖包下载。

![image-20210121203039412](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121203039412.png)

在后端代码中，我们一共需要改2处。

1.修改config/default.json文件中的baseURL、user、password，如下图所示。

​	baseURL：仅修改接口端口号，其他勿动。

​	user：数据库用户名。

​	password：数据库密码。

​	**记住user和password**！！！后面有用。

![image-20210121203348910](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121203348910.png)

2.打开app.js，将listen端口号修改成你的接口端口号。

![image-20210121203651871](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121203651871.png)

将`vueShop-api-server`文件夹拷贝至“部署”文件夹中。

![image-20210121203840935](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121203840935.png)

至此，我们的代码准备工作完成。



## 2 部署上线

### 2.1 安装并登录宝塔系统

打开命令提示符cmd，输入以下命令，然后输入密码，就进来到Linux系统啦。

```
 ssh root@你的服务器公网ip
```

![image-20210121204939694](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121204939694.png)

接下来我们需要下载宝塔工具。

安装命令：

```
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```

当出现....?选择y就好啦，然后等待下载完成。

![image-20210121205227995](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121205227995.png)

安装完成后，我们可以看到外网网址以及用户名、密码。复制外网网址，到浏览器中打开，不要关闭此窗口。

![image-20210121205614603](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121205614603.png)

```
如果刚安装好面板，但是没有把系统初始的用户名和密码记下来，可以进入ssh然后输入命令如下：bt default
```

此时无法访问外网地址。为什么呢？因为在阿里云那里我们没有放行面板8888端口。接下来打开阿里云。

![image-20210121205903850](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121205903850.png)

在左侧栏中选择"云服务器ECS"，打开。

![image-20210121210051290](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121210051290.png)

再次从左边中选择“实例”，点击蓝字进入实例详情

![image-20210121210220481](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121210220481.png)

![image-20210121210252729](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121210252729.png)

在实例详情中点击“安全组”，并再次点击蓝字进入安全组管理

![image-20210121210416549](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121210416549.png)

选择“入方向”并点击“手动添加”

![image-20210121210543009](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121210543009.png)

填写优先级默认1，协议类型默认自定义TCP，端口号8888，授权对象均为0.0.0.0/0，点击保存。

![image-20210121210741283](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121210741283.png)

为了避免后期反复返回阿里云增加端口号，我们一次性添加完，按照以下示意图进行添加，一共开放12个端口，自己检查一下对不对。**注意我们的端口号全部是在入方向添加，出方向不用管，出方向默认全部放行**

**有些人会默认产生80、3389端口，有些人不会，自行添加就好。**

![image-20210121211226451](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121211226451.png)

端口说明：

```
3306:mysql默认端口
80:我自己开放的访问我的页面的端口
8801:api的端口

其他接口为宝塔的一些接口和阿里云默认接口，建议直接按照我的照抄
```

此时我们在重新刷新页面，就显示宝塔页面了，还记得在cmd中看到的账号密码吗？输入账号密码进入宝塔系统。

![image-20210121211555699](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121211555699.png)

进入之后需要绑定宝塔账号，自己去注册就好了，这个就不用多说。

![image-20210121211716561](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121211716561.png)

接下来他会跳出推荐安装页面，不用管，直接关掉。

![image-20210121211822241](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121211822241.png)

进入系统后，我们去安装东西，点击左边栏的“软件商店”

![image-20210121212014968](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121212014968.png)

安装一下三个软件，均使用极速安装：Nginx 1.18 、MySQL5.5、Tomcat7

![image-20210121212105674](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121212105674.png)

![image-20210121212128837](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121212128837.png)

![image-20210121212212932](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121212212932.png)

![image-20210121212249156](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121212249156.png)

在安装的过程中，我们去配置一下端口。在防火墙下方填写端口、及说明点击添加放行端口。

**注意，此处选择默认的放行端口，别选错了**

**一共12个端口，自己数数对不对**

![image-20210121231154245](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121231154245.png)

![image-20210121231208159](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121231208159.png)



以上操作完毕后，我们进入下一步：上传代码并配置

### 2.2 上传代码

选择左侧“文件”，找到tomcat->webapps ，将后端代码和前端代码上传到这个位置。

![image-20210121225058733](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121225058733.png)

![image-20210121225720547](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121225613312.png)

上传完成后，在webapps目录中就可以看到这两个文件啦

![image-20210121225613312](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121225720547.png)



### 2.3 数据库配置

在宝塔系统中选择数据库→root密码，密码改成root，提交。

![image-20210122130523141](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122130523141.png)

![image-20210122130549751](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122130549751.png)



```
Linux指令指南：
ls查看当前目录有哪些文件

cd … 返回上一级

cd 文件名 去往哪个文件夹（按tab键可以快速补全）
```

打开命令提示符cmd，进入Linux系统。

```
 ssh root@你的服务器公网ip
```

![image-20210122130838002](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122130838002.png)

输入命令`mysql -uroot -p`，再输入完密码后即可进入终端的操作界面了。密码为宝塔中设置的密码root。

输入命令`show databases;`可以看到已经存在的数据库

再输入命令

```
create database `mydb` default character set utf8 COLLATE utf8_general_ci
```

**注意：mydb肩膀上要有符号`**  

![image-20210122123222892](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122123222892.png)

通过命令show databases;就可以看到新的数据库已经创建成功了

![image-20210122131550079](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122131550079.png)

接下来就是将.sql文件放入该数据库中了。首先退出数据库`exit;`然后进入mydb.sql文件所在的目录中，我的是`/www/server/tomcat/webapps/vueShop-api-server/db`，之后是在该目录下进入数据库，即`mysql -uroot -p` 进入刚才创建的数据库mydb中`use mydb，使用命令`show tables;`可以看到此时数据库中没有任何的表；我们使用命令`source /www/server/tomcat/webapps/vueShop-api-server/db/mydb.sql;`即可在该数据库中创建表了。

![image-20210122131717926](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122131717926.png)

![image-20210122131747039](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122131747039.png)

![image-20210122131806434](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122131806434.png)

等待数据和表上传完成再次使用命令`show tables;`可以看到此时的数据库中出现的表，这就完成了本地数据库上传到服务器上的所有操作了。

![image-20210122131930458](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122131930458.png)

接下来回到宝塔系统，选择左边栏的数据库，再在显示页面中选择从服务器获取，出现mydb数据即表示成功

![image-20210122123516667](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122123516667.png)

### 2.4 启动node服务

首先看看有没有npm

```
npm -v
```

![image-20210121232209652](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121232209652.png)

 此时显示没有，那我们首先要去安装一个nodejs~可以在下面链接自己找版本进行安装，也可以使用我的版本。

[nodejs安装包 网站](https://nodejs.org/dist/)

附上CenOS安装nodejs的一个博客链接

[CenOS安装nodejs的4种方法](https://blog.csdn.net/xuaa/article/details/52262586)

```
//进入root目录
cd /root

//下载安装包
wget http://nodejs.org/dist/v12.18.2/node-v12.18.2-linux-x64.tar.gz
```

![image-20210121235055648](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210121235055648.png)

等待安装包下载完成~执行以下命令解压

```
sudo tar --strip-components 1 -xzvf node-v* -C /usr/local
```

解压完成之后，执行一下代码，查看是否安装成功

```
node --version
```

实现v.....说明安装成功了

![image-20210122001416707](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122001416707.png)

回到api文件夹，并使用npm install 安装依赖包，依赖包安装完成后，执行app.js

```
//回到api文件夹
cd /www/server/tomcat/webapps/vueShop-api-server

//安装依赖包
npm install

//执行,
node app.js
```

![image-20210122001505722](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122001505722.png)

```
如果在执行npm install的时候报错，npm WARN deprecated，有可能是你的node版本太低了，去上面的链接找一个距离你当下时间较近的安装包下载
```

但上面的app.js执行后，一旦关闭cmd窗口，后端接口就失效了，如何让node app的程序一直运行？

解决方法：

首先我们推出app.js执行，按ctrl + c

1.安装forever

```
//进入local目录
cd /usr/local

//安装
forever start app.js

```

![image-20210122132708663](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122132708663.png)

2.使用forever开启nodejs程序

```
cd /www/server/tomcat/webapps/vueShop-api-server

forever start app.js

```

![image-20210122132748105](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122132748105.png)

出现Forever processing file: app.js说明已经成功运行。

### 2.5 nginx配置并启动

点击软件商店，找到Nginx点击设置

![image-20210122001615465](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122001615465.png)

点击配置修改，增加下面代码：

```
 server{
     listen 80;
     server_name localhost 118.31.171.210;
     location / {
         root /www/server/tomcat/webapps/dist;
         try_files $uri $uri/ /index.html;
     }
 }
```

**其中listen为网页接口，server_name中的Id为你的服务器外网ip，location的root为dist文件夹位置，其他和我一样就好**

**特别注意！！！这一段代码是加在http中的，不要往下滑！！！不要加到下面的server中。这是我踩过的坑**

![image-20210122132955011](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122132955011.png)

配置完之后，选择保存。

回到服务，先点击重新配置，在点击重启

![image-20210122133246250](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122133246250.png)



如果此时运行失败，出现：bind() to 0.0.0.0:80 failed (98:Adress already in use)错误，是由于端口号被占用。

解决：

进行cmd命令行

```
//查看端口
netstat -ntlp
```

![image-20210122004905072](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122004905072.png)

找到80的Pid

```
//杀掉进程
kill 19016
```

![image-20210122005009466](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122005009466.png)

重新查看

```
netstat -ntlp
```

![image-20210122005041540](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122005041540.png)

解决。

在宝塔中重新点击重启即可。

如果成功的话，浏览器访问就能进入你的项目啦：（http://服务器的IP:80）

![image-20210122133757733](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122133757733.png)

![image-20210122123625369](http://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/img/image-20210122123625369.png)

到此，我们的项目就成功部署上线啦~有任何问题，都可以在评论区说出来~，你遇到的问题我基本都遇到过，因为踩了太多坑了呜呜呜。

# 总结

整理不易，若对您有帮助，请点个赞，给个star，您的支持是我更新的动力 👇

📖[本项目开发全过程博客记录](https://blog.csdn.net/weixin_43786756/category_10716603.html)

🐱 [GitHub笔记](https://github.com/ruoruochen/front-end-note/tree/master/Vue%E7%94%B5%E5%95%86%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E9%A1%B9%E7%9B%AE)

🐱 [本项目Github源码](https://github.com/ruoruochen/vue-manage)

各位看官老爷们~希望能给我的Github一个star~~~为了整理这个纯小白部署上线教程，我又重新购买了一个服务器，从头弄了一遍，看在这个份上可怜可怜小人把呜呜呜呜。