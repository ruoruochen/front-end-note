# JQuery入门

## 目标

![](img/image-20200622161838038.png)

### 1、JQuery概述

#### 1-1 JavaScript库

![image-20200622162334632](img/image-20200622162334632.png)

以前学的 ：原生js代码

现在的JQuery：js库



##### 常见JavaScript库

![image-20200622162456977](img/image-20200622162456977.png)



## 2. JQuery的基本使用

#### 2-1 JQuery的入口函数

![image-20200622163614017](img/image-20200622163614017.png)

```js
    <script>
        // $('div').hide();
        // 1、等着页面DOM加载完毕再去执行js代码
        $(document).ready(function () {
            $('div').hide();
        })
        // 2、等着页面DOM加载完毕再去执行js代码,推荐
        $(function () {
            $('div').hide();
        })
    </script>
```

**注意：JQuery中的引号尽量使用“ ”双引号，没有别的原因，因为官方文档这样，这样写标准**



#### 2-2 JQuery的顶级对象$

![image-20200622165303799](img/image-20200622165303799.png)

#### 2-3 JQuery对象和DOM对象

![image-20200622165240976](img/image-20200622165240976.png)

```js
    <div></div>
    <script>
        //1、DOM对象
        var div = document.querySelector('div');
        console.dir(div);
        //2、JQuery对象
        $('div');
        console.dir($('div'));
        // 3、JQuery对象只能使用JQuery方法，DOM对象则使用原生的JS的属性和方法
        div.style.display = 'none';//正确
        div.hide();//报错
        $('div').style.display = 'none'; //报错
    </script>

```



##### JQuery对象与DOM对象的相互转换

![image-20200622165455752](img/image-20200622165455752.png)

```js
    <video src="test.mp4" muted="muted"></video>
    <script>
        // 1、DOM对象转换成JQuery对象
        var myvideo = document.querySelector('video');
        $(myvideo);  //为一个JQuery对象
        // 2、JQuery对象转换成DOM对象
        // 方法1：$('video')[0]为DOM对象  数组形式
        $('video')[0].play();
        // 方法2：$('video').get(0)为DOM对象 .get方法获取
        $('video').get(0).play();
    </script>

```



# JQuery常用API

## 目标

![image-20200622170634884](img/image-20200622170634884.png)



### 1、 JQuery选择器

#### 1-1 基础选择器

![image-20200622170953404](img/image-20200622170953404.png)



#### 1-2 层级选择器

![image-20200622171704714](img/image-20200622171704714.png)



#### 1-3 隐式迭代 ！imp

![image-20200622172401136](img/image-20200622172401136.png)

```js
    <div>惊喜不？意外不</div>
    <div>惊喜不？意外不</div>
    <div>惊喜不？意外不</div>
    <div>惊喜不？意外不</div>
    <ul>
        <li>相同的操作</li>
        <li>相同的操作</li>
        <li>相同的操作</li>
    </ul>
    <script>
        // 获取4个div
        $('div');
        console.log($('div'));
        // 给4个div设置粉色背景颜色 JQuery对象不能使用style
        $('div').css('background', 'pink');
        //给所有ul里的li字体颜色改成红色
        $('ul li').css('color', 'red');
    </script>
```



#### 1-4 筛选选择器

![image-20200622173150192](img/image-20200622173150192.png)

```js
    <ul>
        <li>选我快点选我！</li>
        <li>选我快点选我！</li>
        <li>选我快点选我！</li>
        <li>选我快点选我！</li>
        <li>选我快点选我！</li>
    </ul>
    <ol>
        <li>不选你就不选你</li>
        <li>不选你就不选你</li>
        <li>不选你就不选你</li>
        <li>不选你就不选你</li>
        <li>不选你就不选你</li>
        <li>不选你就不选你</li>
    </ol>
    <script>
        $(function () {
            //获取第一个li元素
            $('ul li:first').css('color', 'red');
            // 获取索引号为2的元素，索引号从0开始！
            $('ul li:eq(2)').css('color', 'blue');
            // 索引号为奇数
            $('ol li:odd').css('color', 'skyblue');
            // 索引号为偶数
            $('ol li:even').css("color", 'pink');
        })
    </script>
```



#### 1-5 筛选方法 ！imp

![image-20200623104321801](img/image-20200623104321801.png)

```js
    <div class="grafa">
        <div class="father">
            <div class="son">儿子</div>
            <div class="nav">
                <p>我是屁</p>
                <div>
                    <p>我是屁</p>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(function () {
            // 1、查找父亲 返回最近一级的父级元素
            $('.son').parent();
            console.log($('.son').parent());
            // 2、查找孩子
            // (1)亲儿子 children()相当于子代选择器
            $('.nav').children('p').css('color', 'red');
            // （2）所有孩子 find()相当于后代选择器
            $('.nav').find('p').css('color', 'blue');
        })
    </script>
```

```js
    <ol>
        <li>我是ol 的li</li>
        <li>我是ol 的li</li>
        <li class="item">我是ol 的li</li>
        <li>我是ol 的li</li>
        <li>我是ol 的li</li>
        <li>我是ol 的li</li>
    </ol>

    <ul>
        <li>我是ul 的li</li>
        <li>我是ul 的li</li>
        <li>我是ul 的li</li>
        <li>我是ul 的li</li>
        <li>我是ul 的li</li>
        <li>我是ul 的li</li>
    </ul>
    <div class="current">俺有current</div>
    <div>俺没有current</div>
    <script>
        $(function () {
            // 1、选择兄弟元素
            // （1）所有亲兄弟
            $('.item').siblings('li').css("color", "red");
            // （2）选择当前元素之前的兄弟元素
            $('.item').prevAll('li').css("color", "blue");
            // (3)选择当前元素之后的兄弟
            $('.item').nextAll('li').css("color", "skyblue");
            // 2、第N个元素
            // (1)利用选择器方式选择
            $('ul>li:eq(2)').css("color", "pink");
            // (2)利用选择方法选择 推荐这个写法！
            $('ul>li').eq(3).css("color", "yellow");
            // 3、判断是否有某个类名 了解即可
            $('div:first').hasClass('current');
            console.log($('div:first').hasClass('current'));//true
            console.log($('div:last').hasClass('current'));//false
        })
    </script>
```



#### 1-6 JQuery里的排他思想

```js
应用：
    <button>快速</button>
    <button>快速</button>
    <button>快速</button>
    <button>快速</button>
    <button>快速</button>
    <button>快速</button>
    <button>快速</button>
    <script>
        $(function () {
            // 1、隐式迭代，给所有按钮都绑定事件
            $('button').click(function () {
                // 2、当前元素变化背景颜色
                $(this).css('background', "pink");
                // 3、当前元素的兄弟去掉背景颜色
                $(this).siblings('button').css("background", "");
            })
        })
    </script>
```



### 2、 JQuery样式操作

#### 2-1 操作css方法

![image-20200623142800135](img/image-20200623142800135.png)

```js
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
        }
    </style>

    <div></div>
    <script>
        $(function () {
            console.log($('div').css('width')); //输出200px
            $('div').css("width", "300px"); //属性名要加引号
            $('div').css({
                width: 400,
                height: 400,
                backgroundColor: "red"
                //复合属性必须采取驼峰命名法
                //如果值不为数字，要加引号
            })
        })
    </script>
```



#### 2-2 设置类样式方法

![image-20200623144422830](img/image-20200623144422830.png)

```js
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
            margin: 100px auto;
            transition: all .5s;
        }

        .current {
            background-color: red;
            transform: rotate(360deg);
        }
    </style>
</head>

<body>
    <div class="current"></div>
    <script>
        $(function () {
            // 1、添加类
            // $('div').click(function () {
            //     $(this).addClass('current');
            // })

            // 2、删除类
            // $('div').click(function () {
            //     $(this).removeClass('current');
            // })

            // 3、切换类
            $('div').click(function () {
                $(this).toggleClass('current');
            })

        })
    </script>
```

之前学的classList:[classList](https://www.runoob.com/jsref/prop-element-classlist.html)



#### 2-3 类操作与className的区别

![image-20200623152043333](img/image-20200623152043333.png)



### 3 JQuery效果

#### 3-1 显示与隐藏效果

![image-20200623152220780](img/image-20200623152220780.png)

![image-20200623153914854](img/image-20200623153914854.png)

**注意：speed中的"slow" "normal"是字符串类型的**

#### 3-2 滑动效果

下滑：slideDown()

上滑：slideUp()

切换：slideToggle()

```js
语法规范及其参数上同。
	<button>下拉滑动</button>
    <button>上拉滑动</button>
    <button>切换滑动</button>
    <div></div>
    <script>
        $(function () {
            $('button').eq(0).click(function () {
                // 下滑动slideDown()
                $('div').slideDown();
            })

            $('button').eq(1).click(function () {
                $("div").slideUp();
            })

            $('button').eq(2).click(function () {
                $("div").slideToggle();
            })
        })
    </script>
```



#### 3-3 事件切换

![image-20200623203306956](img/image-20200623203306956.png)

```html
新浪下拉菜单.html
   <ul class="nav">
        <li>
            <a href="#">微博</a>
            <ul class="smallbox">
                <li>私信</li>
                <li>评论</li>
                <li>@我</li>
            </ul>
        </li>
        <li>
            <a href="#">微博</a>
            <ul class="smallbox">
                <li>私信</li>
                <li>评论</li>
                <li>@我</li>
            </ul>
        </li>
        <li>
            <a href="#">微博</a>
            <ul class="smallbox">
                <li>私信</li>
                <li>评论</li>
                <li>@我</li>
            </ul>
        </li>
        <li>
            <a href="#">微博</a>
            <ul class="smallbox">
                <li>私信</li>
                <li>评论</li>
                <li>@我</li>
            </ul>
        </li>
    </ul>
    <script>
        $(function () {
            // 以下三种写法均实现同一效果

            //-----------写法1----------------//
            //通过隐式迭代，给.nav里的亲儿子li都绑定了事件
            // 鼠标经过
            $('.nav>li').mouseenter(function () {
                // $(this) JQuery的当前元素，this不要加引号
                $(this).children("ul").slideDown();
            });
            // 鼠标离开
            $('.nav>li').mouseout(function () {
                $(this).children("ul").slideUp();
            })；
          

            //-----------写法2----------------//
            // 1、事件切换 hover 就是鼠标经过和离开的复合写法
            // $(".nav>li").hover(function () {
            //     $(this).children("ul").slideDown();
            // }, function () {
            //     $(this).children("ul").slideUp();
            // });

            //-----------写法3----------------//
            // 2、事件切换 hover 如果只写一个函数，那么鼠标经过和离开都会触发这个函数
            $(".nav>li").hover(function () {
                $(this).children("ul").slideToggle();
            });
        })
    </script>
```



#### 3-4 动画队列及其停止排队方法

![image-20200623204745938](img/image-20200623204745938.png)

```js
还是上面的例子：
            $(".nav>li").hover(function () {
                // stop方法必须写在动画的前面
                $(this).children("ul").stop().slideToggle();
            });
```



#### 3-5 淡入淡出效果

淡入：fadeIn()

淡出：fadeOut()

淡入淡出切换：fadeToggle();

**以上参数上同**



修改透明度： fadeTo() 	//速度和透明度必须写

参数：fadeTo(*speed,opacity,easing,callback*)

```js
    <button>淡入效果</button>
    <button>淡出效果</button>
    <button>淡入淡出切换</button>
    <button>修改透明度</button>
    <div></div>
    <script>
        $(function () {
            $("button").eq(0).click(function () {
                // 淡入fadeIn()
                $("div").fadeIn(1000);
            })

            $("button").eq(1).click(function () {
                // 淡出fadeOut()
                $("div").fadeOut(1000);
            })

            $("button").eq(2).click(function () {
                // 淡入淡出切换 fadeToggle()
                $("div").fadeToggle(1000);
            })

            $("button").eq(3).click(function () {
                // 修改透明度 fadeTo() 速度和透明度必须写
                $("div").fadeTo(1000, 0.5);
            })
        })
    </script>
```



#### 3-6 自定义动画animate

![image-20200624084355014](img/image-20200624084355014.png)



```js
 <style>
        div {
            position: absolute;
            width: 200px;
            height: 200px;
            background-color: pink;
        }
    </style>
    <script src="jquery-3.5.1.min.js"></script>
</head>

<body>
    <button>动起来</button>
    <div></div>
    <script>
        $(function () {
            $("button").click(function () {
                $("div").animate({
                    left: 500,
                    top: 300,
                    opacity: .4,
                    width: 500
                }, 500);
            })
        })
    </script>
</body>
```



**案例：手风琴案例.html**





### 4、 JQuery属性操作

#### 4-1 设置或获取元素固有属性值 prop()

![image-20200624111128593](img/image-20200624111128593.png)

```js
    <a href="http://www.baidu.com" title="挺好">挺好</a>
    <input type="checkbox" name="" id="" checked="checked">
    <script>
        $(function () {
            // 获取属性值：element.prop("属性名")、
            console.log($("a").prop("href"));
            //设置属性值
            $("a").prop("title", "哈哈哈哈哈");
            $("input").change(function () {
                console.log($(this).prop("checked"));
            })
        })
    </script>
```



#### 4-2 设置或获取元素的自定义属性值 attr()

![image-20200624111833621](img/image-20200624111833621.png)

```html
    <div index="1" data-index="3">我是div</div>
    <script>
        $(function () {
            // console.log($("div").prop("index"));//错误
            $("div").attr("index", 2);
            console.log($("div").attr("index"));
            console.log($("div").attr("data-index"));
        })
    </script>
```



#### 4-3 数据缓存data()

![image-20200624112558114](img/image-20200624112558114.png)

```html
    <div index="1" data-index="3">我是div</div>
    <span>123</span>
    <script>
        $(function () {
            //数据存储在元素的内存里
            $("span").data("uname", "andy");
            console.log($("span").data("uname"));   //andy
            // 这个方法获取data-index h5自定义属性 不用写data- 且返回的是数字型
            console.log($("div").data("index"));    //3
        })
    </script>
```



### 5 、Jquery内容文本值

![image-20200624120558013](img/image-20200624120558013.png)

![image-20200624120725470](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200624120725470.png)



```js
    <div>
        <span>我是内容</span>
    </div>
    <input type="text" name="" id="" value="请输入内容">、
    <script>
        $(function () {
            // 1、获取设置元素内容 html()
            console.log($("div").html());
            $("div").html("123");
            // 2、text()
            console.log($("div").text());
            $("div").text("lalala")
            // 3、表单的val值 val()
            console.log($("input").val());
            $("input").val("我就不输入");

        })
    </script>
```



### 6、JQuery元素操作

#### 6-1 遍历元素

##### $("XXX").each()

适合用于遍历dom对象

![image-20200624172812972](img/image-20200624172812972.png)

##### $.each()

适合用于遍历数组、对象。

![image-20200624174444004](img/image-20200624174444004.png)



```js
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <script>
        $(function () {
            //1、$("XXX").each(function(index,ele){});
            // 将三个div设置为不同的颜色
            var arr = ["red", "green", "blue"]
            //将三个div的值相加
            var sum = 0;
            $("div").each(function (index, domEle) {
                // 回调函数第一个参数一定是索引号 利用自己制定索引号名称
                console.log(index);
                //第二个参数为！！！ dom元素对象
                console.log(domEle);
                $(domEle).css("color", arr[index]);
                sum += parseInt($(domEle).text());
            })
            console.log(sum);

            // 2、$.each(obj, function (index,ele) { });
            //(1)遍历数组
            $.each(arr, function (index, ele) {
                console.log(index);
                console.log(ele);
            })

            // (2)遍历对象
            $.each({
                name: 'andy',
                age: 20
            }, function (index, ele) {
                console.log(index);//输出name age属性名
                console.log(ele);  //输出andy 20属性值
            })
        })
    </script>
```



#### 6-2 创建元素

![image-20200624180726253](img/image-20200624180726253.png)



#### 6-3 添加元素

![image-20200624180726253](img/image-20200624180726253-1606377013694.png)

![image-20200624181608236](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200624181608236.png)



#### 6-4 删除元素

![image-20200624182243189](img/image-20200624182243189.png)

```html
    <ul>
        <li>原来的小li</li>
    </ul>
    <div class="test">我是原先的div</div>
    <script>
        $(function () {
            // 1、创建元素
            var li = $("<li>我是后来创建的小li</li>");
            // 2、添加元素
            // （1）内部添加 
            $("ul").append(li);//放在后面
            $("ul").prepend(li);//放在前面
            // (2)外部添加
            var div = $("<div>我是后妈生的</div>");
            $(".test").after(div);//放在后面
            $(".test").before(div);//放在前面

            // 3、删除元素
            $("ul").remove();//删除匹配的元素
            $("ul").empty();//删除内部的子节点
            $("ul").html();//删除内部的子节点
        })  
    </script>
```

remove中不带参数!删除的是调用remove的元素。



### 7、jQuery尺寸、位置操作

#### 7-1 jQuery尺寸

![image-20200626190318716](img/image-20200626190318716.png)



#### 7-2 jQuery位置

##### 1、offset()

![image-20200626191529901](img/image-20200626191529901.png)

```html
    <style>
        .father {
            position: relative;
            overflow: hidden;
            margin: 100px auto;
            width: 500px;
            height: 500px;
            background-color: purple;
        }

        .son {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 100px;
            height: 100px;
            background-color: pink;
        }
    </style>
    <script src="jquery-3.5.1.min.js"></script>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <script>
        $(function () {
            console.log($(".son").offset().top);  //输出110
            // 修改值 传一个对象
            $(".son").offset({
                top: 200,
                left: 400
            })
        })
    </script>
</body>
```

##### 2、position()

##### ![image-20200626192040893](img/image-20200626192040893.png)



##### 3、scrollTop()/scrollLeft()

![image-20200626195156089](img/image-20200626195156089.png)

**案例：带动画的返回顶部**

![image-20200626195711943](img/image-20200626195711943.png)

```html
   <style>
        .back {
            position: fixed;
            right: 10px;
            top: 200px;
            width: 30px;
            height: 90px;
            text-align: center;
            background-color: pink;
            display: none;
        }

        .container {
            width: 800px;
            height: 800px;
            background-color: skyblue;
            margin: 500px auto;
        }
    </style>
    <script src="jquery-3.5.1.min.js"></script>
</head>

<body>
    <div class="back">返回顶部</div>
    <div class="container"></div>
    <script>
        $(function () {
            // 页面滚动时间
            $(window).scroll(function () {
                var boxTop = $(".container").offset().top;
                $(document).scrollTop();
                console.log($(document).scrollTop());
                if ($(document).scrollTop() >= boxTop) {
                    $(".back").fadeIn();
                }
                else {
                    $(".back").fadeOut();
                }
            })

            $(".back").click(function () {
                $("body,html").animate({ scrollTop: 0 });
                // $(document).animate({ scrollTop: 0 });//错误写法 不能是文档
                //元素才能做动画。
            })
        })
    </script>
```



**案例：品优购电梯导航**

# JQuery事件

## 目标

![image-20200624183716249](img/image-20200624183716249.png)

### 1、JQuery事件注册

![image-20200624184031512](img/image-20200624184031512.png)



### 2、JQuery事件处理

#### 2-1 事件处理on()绑定事件

##### 语法

![image-20200624184702873](img/image-20200624184702873.png)

##### 优势

![image-20200624184721519](img/image-20200624184721519.png)

```html
    <div></div>
    <script>
        $(function () {
            // 事件处理on
            $("div").on({
                mouseenter: function () {
                    $(this).css("background", "purple");
                },
                click: function () {
                    $(this).css("background", "skyblue");
                },
                mouseleave: function () {
                    $(this).css("background", "pink");
                }
            });
            
            //当事件处理程序相同时：
            $("div").on("mouseenter mouseleave", function () {
                $(this).toggleClass("current");
            })
        })
    </script>
```

![image-20200624185448631](img/image-20200624185448631.png)

```html
    <ul>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
        <li>我们都是好孩子</li>
    </ul>
    <script>
        $(function () {
            // click事件绑定在ul身上，但是触发对象为li
            $("ul").on("click", "li", function () {
                alert("22");
            })
        })
    </script>
```



![image-20200624190406298](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200624190406298.png)

```html
    <ol></ol>
    <script>
        $(function () {
            //此种写法  小li无反应
            // $("ol li").click(function () {
            //     alert("11");
            // })

            //而on可以给未来动态创建的元素绑定事件
            $("ol").on("click", "li", function () {
                alert("11");
            })
            var li = $("<li>我是新的li</li>");
            $("ol").append(li);
        })
    </script>
```



#### 2-2 事件处理off()解绑事件

![image-20200625115213799](img/image-20200625115213799.png)

```htm
    <p>我是屁</p>
    <script>
        $(function () {
            $("p").one("click", function () {
                alert("11");
            })
        })
    </script>
```



### 2-3 自动触发事件 trigger()

![image-20200625120504396](img/image-20200625120504396.png)

![image-20200625121027898](C:\Users\Asus\AppData\Roaming\Typora\typora-user-images\image-20200625121027898.png)

第三种与前两种的区别：第三种不会触发元素的默认行为



### 3、JQuery事件对象

![image-20200625121600758](img/image-20200625121600758.png)

其他方法参考webAPI中的方法。



# JQuery的其他方法

## 目标

![image-20200625121714303](img/image-20200625121714303.png)



### 1、JQuery 对象拷贝

![image-20200625123104075](img/image-20200625123104075.png)

```htm
    <script>
        $(function () {
            var targetObj = {
                id: 0,
                msg: {
                    sex: '男'
                }
            };
            var obj = {
                id: 1,
                name: "andy",
                msg: {
                    age: 18
                }
            };
            //会覆盖targetObj里面原来的数据 如id
            //浅拷贝： 复杂类型 拷贝其地址给目标对象，修改目标对象会影响拷贝对象。
            // 拷贝过程中，目标对象中的sex 男数据丢失。
            // $.extend(targetObj, obj);
            // console.log(targetObj);

            //深拷贝：
            //输出如图
            $.extend(true, targetObj, obj);
            console.log(targetObj);
            console.log(obj);

        })
    </script>
```

![image-20200625124740751](img/image-20200625124740751.png)



### 2、多库共存

![image-20200625160549808](img/image-20200625160549808.png)

```html
    <div></div>
    <span></span>
    <script>
        $(function () {
            function $(ele) {
                return document.querySelector(ele);
            }
            console.log($("div"));
            // 1、$符号冲突，则使用jQuery
            jQuery.each();
            // 2、让jquery释放$控制权，让用户自己决定
            var suibian = jQuery.noConflict();
            console.log(suibian("span"));
            suibian.each();
        })
    </script>
```



### 3、jQuery插件

![image-20200625162849330](img/image-20200625162849330.png)

经典、常用的jQuery插件：瀑布流、图片懒加载、全屏滚动![image-20200625165856932](img/image-20200625165856932.png)





## 重要案例： todolist

![image-20200626160049847](img/image-20200626160049847.png)

```js
            var todolist = [
                {
                    title: '我今天吃了8斤米',
                    done: false
                }
                ,
                {
                    title: '我今天学习了jq',
                    done: false
                }
            ]
            // localStorage.setItem("todo", todolist);  //值为[object Object],[object Object] 错误！
            // 1、本地存储只能存储字符串的数据格式 我们需要把数组对象转换为子串格式 JSON stringify()
            localStorage.setItem("todo", JSON.stringify(todolist));
            var data = localStorage.getItem("todo");
            // console.log(typeof data);
            // 2、获取本地存储的数据 我们需要把里面的字符串数据转换为对象格式 JSON.parse()
            var data = JSON.parse(data);
            console.log(data);
            console.log(data[0].title);
```



![image-20200626160247822](img/image-20200626160247822.png)



![image-20200626164119502](img/image-20200626164119502.png)

![image-20200626165040442](img/image-20200626165040442.png)

[splice()方法的用法](https://www.runoob.com/jsref/jsref-splice.html)

![image-20200626183503666](img/image-20200626183503666.png)

![image-20200626184840715](img/image-20200626184840715.png)