# ES6

## 1 ES6的模块化export和import

模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

### 1.1 export输出

1. 直接输出单个变量

   ```
   //1、
   export var year=1999;
   
   //2、
   var m = 1;
   export {m};
   ```

2. 用大括号输出一组变量 **推荐**

   ```
   export { firstName, lastName, year };
   ```

3. 输出单个函数或类（class)

   ```
   export function multiply(x,y){
   	return x * y;
   }
   ```

4. 用大括号输出一组函数或类

5. `export default`命令输出

   ```javascript
   // export-default.js
   export default function foo() {
     console.log('foo');
   }
   // 或者写成
   function foo() {
     console.log('foo');
   }
   export default foo;
   
   // 输入
   import crc32 from 'export-default'; 
   ```

   - import命令可以指定任意名字
   - 注意export和default export的区别：
     - `export default`时，对应的`import`语句不需要使用大括号
     - 不使用`export default`时，对应的`import`语句需要使用大括号

**注意：**

- 一般来说，输出变量名为本名，但可使用as关键字重命名：

  ```
  function v1() { ... }
  function v2() { ... }
  
  export {
    v1 as streamV1,
    v2 as streamV2,
    v2 as streamLatestVersion
  };
  ```

- export规定对外的接口，必须与模块内部的变量建立一一对应关系。

  错误写法：

  ```
  //均报错：
  export 1;
  
  var m=1;
  export m;
  
  function f() {}
  export f;
  ```

- `export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

- `export`命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错。

### 1.2 import输入

1. 一对大括号输入变量

   ```
   import { firstName, lastName, year } from './profile.js';
   ```

   >- 大括号里面的变量名，必须与被导入模块（`profile.js`）对外接口的名称相同。
   >
   >- 或者使用as关键字将输入变量重命名
   >
   > ```
   > import { lastName as surname } from './profile.js';
   > ```

   

2. 整体加载

   ```
   import * as circle from './circle';
   使用circle.xxx访问属性和方法
   ```

   

**注意**

- `import`命令输入的变量都是只读的，因为它的本质是输入接口。

- `import`命令具有提升效果，会提升到整个模块的头部，首先执行。

- 由于`import`是静态执行，所以不能使用表达式和变量
  错误写法：

  ```
  // 报错
  import { 'f' + 'oo' } from 'my_module';
  
  // 报错
  let module = 'my_module';
  import { foo } from module;
  
  // 报错
  if (x === 1) {
    import { foo } from 'module1';
  } else {
    import { foo } from 'module2';
  }
  ```

## 2 Promise

通过Promise对象，将异步操作以同步操作的流程表达出来，避免层层嵌套的回调函数。

### 2.1 Promise的基本使用

```js
    var succeed = false;
    // 1、创建Promise实例
    new Promise((resolve, reject) => {
      // 2、判断请求情况
      // 如果异步请求成功
      if (succeed) {
        resolve("ruoruochen niubi");
      } else {//失败
        reject("ruoruochen shabi");
      }
      // 3、通过then方法给指定resolve reject的回调函数
      // （1）then(函数1，[函数2])，1为resolve的回调函数，2为reject的
      //  (2)then(函数1).catch(函数2)
    }).then(message => {
      console.log("success " + message);
    }).catch(err => {
      console.log("fail " + err);
    })
```

**then方法中的回调方法将在当前脚本所有同步任务执行完才会执行。**

**调用`resolve`或`reject`并不会终结 Promise 的参数函数的执行。**

### 2.2 resolve的参数为Promise

- 如果resolve（所在Promise设为p1）的参数为Promise（设为p2)，p2状态决定了p1的状态。

- 如果p2处于pending，p1等待p2状态改变，若p2为resolved或rejected，则执行p1回调函数。

  ```js
      const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('fail'))
        }, 5000);
      })
  
      const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(p1)
        }, 1000);
      })
  
      p2.then(result => console.log(result))
        .catch(err => console.log(err))
  ```

  输出：Error: fail

### 2.3 Promise.prototype.then()方法详解

- `then`方法为 Promise 实例添加状态改变时的回调函数。
- then方法返回一个新的Promise实例，故可采用链式写法，then后调用then。

```js
    //将异步请求的promise封装成函数
	const test = function (succeed) {
      return new Promise((resolve, reject) => {
        // 判断请求情况
        // 如果异步请求成功
        if (succeed) {
          resolve("ruoruochen niubi");
        } else {//失败
          reject("ruoruochen shabi");
        }
      })
    }
    test(false).then((message) => {
      console.log("succeed: " + message);
      return message;
    }).then((data) => {
      console.log("I know:" + data);
    }).catch((message) => {
      console.log("fail");
    })
```

### 2.4 Promise.prototype.catch()方法详解

- catch方法用于指定发生错误时的回调函数。
- catch方法捕获场景：
  1. Promise状态变为rejected
  2. then方法运行中抛出错误

- Promise中的reject方法的作用等同于抛出错误。

**如果 Promise 状态已经变成`resolved`，再抛出错误是无效的。**

>因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。再抛出错误也不会被捕获。

```js
    const promise = new Promise((resolve, reject) => {
      resolve('ok');
      throw new Error('Error');
    })

    promise.then(value => console.log(value))
      .catch(err => console.log(err))
```

输出：ok

**一般来说，不使用then中包含两个函数，推荐使用then catch**

**如果没有使用`catch()`方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。**

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

上面代码中，`someAsyncThing()`函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示`ReferenceError: x is not defined`，但是不会退出进程、终止脚本执行，2 秒之后还是会输出`123`。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

### 2.5 Promise.prototype.finally()方法详解

- finally方法无论Promise对象状态如何，都会执行。

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

### 2.6 Promise.all()方法

Promise.all()将多个Promise实例，包装成一个新的Promise实例。

```js
const p = Promise.all([p1, p2, p3]);
```

- 参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
- `p`的状态由`p1`、`p2`、`p3`决定，全fulfilled则fulfilled，有rejected则rejected，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数，其他Promise依旧会执行。

- 如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。

```js
    const p1 = new Promise((resolve, reject) => {
      resolve('hello');
    })
      .then(result => result)
      .catch(e => e);

    const p2 = new Promise((resolve, reject) => {
      throw new Error('报错了');
    })
      .then(result => result)
      .catch(e => e);

    Promise.all([p1, p2])
      .then(result => console.log(result))
      .catch(e => console.log(e));
```

输出： ["hello", Error: 报错了]



转变完成后all的成功回调拿到的数组结果顺序，永远与Promise参数顺序一致

```js
    var p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
        console.log(1);//后执行
      }, 4000);
    })
    var p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(2);
        console.log(2);//先执行
      }, 1000);
    })
    Promise.all([p1, p2])
      .then(function (resp) {
        console.log(resp); //[1,2]
      })
```

输出：

2

1

(2) [1,2]

### 2.7 Promise.race()方法

将多个 Promise 实例，包装成一个新的 Promise 实例。**只比执行速度**

```js
const p = Promise.race([p1, p2, p3]);
```

只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，**它不管你返回的是fulfilled还是rejected**，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为`reject`，否则变为`resolve`。

```js
    //使用计时器模拟请求
    const fetch = function (t) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve("request succeed"), t);
      })
    }
    const p = Promise.race([
      fetch(5000),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), 3000)
      })
    ])

    p.then((message) => {
      console.log(message);
    }).catch((err) => {
      console.log(err);
    })
```

输出：Error: request timeout

若将fetch(5000)改成fetch(1000)，将输出：request succeed

### 2.8 Promise.allSettled()

接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束。

```js
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);
const allSettledPromise = Promise.allSettled([resolved, rejected]);
allSettledPromise.then(value => console.log(value))
```

输出：

（2）[

 { status: 'fulfilled', value: 42 },
 { status: 'rejected', reason: -1 }

​	] 

- 该方法返回的新的 Promise 实例，一旦结束，状态总是`fulfilled`，不会变成`rejected`。

- 状态变成`fulfilled`后，Promise 的监听函数接收到的参数是一个数组，每个成员对应一个传入`Promise.allSettled()`的 Promise 实例。

  >如上例。

  其中数组每个成员都是一个对象，每个对象都有status属性，属性值为fulfilled或rejected。`fulfilled`时，对象有`value`属性，`rejected`时有`reason`属性，对应两种状态的返回值。

- 确保所有操作都结束，且获取其状态。

#### 应用场景

- 过滤出成功的请求，只对fulfiled的数据进行操作
- 过滤出失败请求，并显示原因。

```js
//模拟请求
    const fetch = function (t) {
      return new Promise((resolve, reject) => {
        if (t > 0)
          resolve(t);
        else
          reject(t);
      })
    }
    const promises = [fetch(10), fetch(-10), fetch(0)];
    const allSettledPromise = Promise.allSettled(promises);
    allSettledPromise.then((results) => {
      //过滤出成功的请求
      const succeedPromise = results.filter(p => p.status === 'fulfilled')
      console.log(succeedPromise);
      //输出：{status: "fulfilled", value: 10}
        
      //过滤出失败的请求
      const failPromise = results.filter(p => p.status === 'rejected');
      console.log(failPromise);
	  //输出：
      //0: {status: "rejected", reason: -10}
	  //1: {status: "rejected", reason: 0}
        
    }).catch(() => {
      console.log("Error");
    })
```

>应用例子：
>
>假如一个模块需要显示三部分内容，每一部分内容都有一个返回Promise实例的接口，如果使用Promise.all需要三个接口都成功返回数据才可以，如果有一个接口挂掉了，则另外两个接口返回的数据不能被获取到，因为此时已经进入到了catch方法，无法在成功回调的函数里面操作数据，渲染界面等。
>
>此时可使用Promise.allSettled，依据status去过滤掉rejected的数据，只操作fulfilled的数据，就会得到我们想要的业务逻辑了。

### 2.9 Promise.any()

接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

```js
  <script>
    //模拟请求
    const fetch = function (t) {
      return new Promise((resolve, reject) => {
        if (t > 0)
          resolve(t);
        else
          reject(t);
      })
    }
    const promises = [fetch(10), fetch(-10), fetch(0)];
    const anyPromise = Promise.any(promises);
    console.log(anyPromise);
    //输出
    // Promise {<pending>}
    // __proto__: Promise
    // [[PromiseState]]: "fulfilled"
    // [[PromiseResult]]: 10
    anyPromise.then(first => {
      console.log(first);
      //输出10
    }).catch(err => {
      console.log(err);
      //全部rejected则抛出错误，输出：AggregateError: All promises were rejected
    })
```

### 2.10 Promise.resolve()

将现有对象转为 Promise 对象。

```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

#### 2.10.1 Promise.resolve方法的参数

1. 参数为Promise实例

   原封不动返回实例

2. thenable对象，即具有then方法的对象

   对象转为Promise对象，并立即执行thenable对象中的then方法

3. 不具备then方法的对象或不是对象

   返回一个Promise对象，状态为resolved。

4. 不带参数

   直接返回一个`resolved`状态的 Promise 对象。

### 2.11 Promise.reject()方法

`Promise.reject(reason)`方法返回一个新的 Promise 实例，该实例的状态为`rejected`。

```javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))
```

方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。

### 2.12 Promise的应用

- 加载图片

- Generator 函数与 Promise 的结合

#### 扩展：宏任务，微任务，队列

**常见的macrotask有：**

- `run <script>（同步的代码执行）`
- `setTimeout`
- `setInterval`
- `setImmediate (Node环境中)`
- `requestAnimationFrame`
- `I/O`
- `UI rendering`

**常见的microtask有：**

- `process.nextTick (Node环境中)`
- `Promise callbacks`
- `Object.observe (基本上已经废弃)`
- `MutationObserver`



**执行顺序**

![image-20201214092953116](img/image-20201214092953116.png)

顺序执行宏任务，当宏任务的JS堆栈清空之后，执行微任务。微任务清空即为一个宏任务的完成，接着执行另一个宏任务。

