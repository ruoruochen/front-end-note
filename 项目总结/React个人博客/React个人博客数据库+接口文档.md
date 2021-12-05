# React个人博客

## 数据库设计

## API接口文档

### 1.1 API接口说明

- 接口基准地址：`http://127.0.0.1:6060`
- 服务端已开启 CORS 跨域支持
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 1.2 注册登录

#### 1.2.1 注册接口

- 请求路径：register
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |
| email    | 邮箱     | 不能为空 |

- 响应参数

- 响应数据

```js
//成功
{
    "data": null,
    "meta": {
        "msg": "注册成功",
        "status": 200
    }
}

//失败
{
    "data": null,
    "meta": {
        "msg": "用户名已被占用",
        "status": 403
    }
}
```

#### 1.2.2 登录接口

- 请求路径：login
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| account  | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名   | 参数说明 | 备注        |
| -------- | -------- | ----------- |
| username | 用户名   |             |
| role     | 用户角色 |             |
| userId   | 用户Id   |             |
| token    | 令牌     | 基于JWT令牌 |
| message  | 报错信息 |             |

- 响应数据

```js
//成功
{
    "data": {
        "username": "123456",
        "role": 1,
        "userId": 62226540,
        "token": "xxx"
    },
    "meta": {
        "msg": "登陆成功",
        "status": 200
    }
}

//失败
{
    "data": null,
    "meta": {
        "msg": "密码不正确",
        "status": 403
    }
}

{
    "data": null,
    "meta": {
        "msg": "用户不存在",
        "status": 403
    }
}
```

### 1.3 文章管理

#### 1.3.1 获取文章列表

- 请求路径：article/list
- 请求方法：get
- 请求参数

| 参数名   | 参数说明   | 备注                     |
| -------- | ---------- | ------------------------ |
| page     | 页数       |                          |
| pageSize | 每页大小   |                          |
| keyword  | 关键字     |                          |
| tag      | 标签Id     |                          |
| category | 分类Id     |                          |
| all      | true/false | 获取全部数据，不进行分页 |

- 响应参数

| 参数名 | 参数说明           | 备注 |
| ------ | ------------------ | ---- |
| count  | 文章总数           |      |
| rows   | 当前获取的文章数据 |      |

- 响应数据

```js
{
    "count": 1,
    "rows": [
        {
            "createdAt": "2021-11-14 16:15:37",
            "updatedAt": "2021-11-15 11:50:23",
            "id": 90,
            "title": "用 node 写命令行工具",
            "content": "test",
            "viewCount": 91,
            "tags": [
                {
                    "name": "Node"
                },
                {
                    "name": "服务器与运维"
                }
            ],
            "categories": [
                {
                    "name": "Node"
                },
                {
                    "name": "服务器与运维"
                }
            ],
            "comments": []
        }
}
```

#### 1.3.2 根据`id`获取文章

- 请求路径：article/:id
- 请求方法：get
- 响应参数

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| createdAt  | 创建时间 |      |
| updatedAt  | 更新时间 |      |
| id         | 文章id   |      |
| title      | 标题     |      |
| content    | 内容     |      |
| viewCount  | ？TODO   |      |
| tag        | 标签     |      |
| categories | 分类     |      |

- 响应数据

```js
{
    "createdAt": "2021-11-11 12:19:35",
    "updatedAt": "2021-11-14 18:39:19",
    "id": 1,
    "title": "mysql - 数据库操作和数据属性",
    "content": "test-content",
    "viewCount": 20,
    "tags": [
        {
            "name": "MySQL"
        }
    ],
    "categories": [
        {
            "name": "MySQL"
        }
    ],
    "comments": []
}
```

#### 1.3.3 新增文章 

- 请求路径：article/add
- 请求方法：post
- 请求参数

| 参数名       | 参数说明 | 备注     |
| ------------ | -------- | -------- |
| authorId     | 作者Id   | 不能为空 |
| categoryList | 分类数组 |          |
| content      | 内容     |          |
| tagList      | 标签数组 |          |
| title        | 标题     |          |

- 响应参数

| 参数名   | 参数说明 | 备注                |
| -------- | -------- | ------------------- |
| username | 用户名   |                     |
| role     | 用户角色 |                     |
| userId   | 用户Id   |                     |
| token    | 令牌     | 基于 ？？？TODO令牌 |
| message  | 报错信息 |                     |

- 响应数据

```js
{
    "createdAt": "2021-11-14 18:41:08",
    "updatedAt": "2021-11-14 18:41:08",
    "viewCount": 0,
    "id": 92,
    "title": "\"Hello world\"",
    "content": "\"Hello\"",
    "tags": [],
    "categories": []
}
```

#### 1.3.4 上传文章 

- 请求路径：article/upload
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------ |
| file   | 文件     | binary |

- 响应数据：无，200上传成功

#### 1.3.5 确认上传

- 请求路径：article/upload/confirm
- 请求方法：post
- 请求参数：

| 参数名     | 参数说明 | 备注     |
| ---------- | -------- | -------- |
| authorId   | 作者ID   | 不能为空 |
| uploadList | 上传数组 |          |

- 响应参数

- 响应数据

#### 1.3.5 根据`id`删除文章

- 请求路径：article/:id
- 请求方法：delete
- 请求参数：

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| id     | 文章Id   | 不能为空 |

-   响应参数，204 No-content 删除成功


#### 1.3.1 获取文章分类列表

- 请求路径：category/list
- 请求方法：get

- 响应数据

```js
[
    {
        "name": "Sequelize",
        "count": 6
    },
    {
        "name": "HTTP",
        "count": 6
    },
    {
        "name": "MySQL",
        "count": 4
    }
]
```

#### 1.3.2 获取tag标签列表

- 请求路径：tag/list
- 请求方法：get

- 响应数据

```js
[
    {
        "name": "Sequelize",
        "count": 6
    },
    {
        "name": "HTTP",
        "count": 6
    },
    {
        "name": "MySQL",
        "count": 4
    }
]
```

### 1.4 评论管理

#### 1.4.1 增加评论/回复

- 请求路径：discuss/add
- 请求方法：post
- 请求参数

| 参数名    | 参数说明     | 备注     |
| --------- | ------------ | -------- |
| articleId | 文章Id       | 不能为空 |
| userId    | 用户Id       |          |
| content   | 评论内容     |          |
| comment   | 回复的评论Id |          |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| count  | 评论数量 |      |
| row    | 评论信息 |      |

- 响应数据

```js
{
    "count": 1,
    "rows": [
        {
            "createdAt": "2021-11-14 18:35:47",
            "id": 55,
            "content": "123",
            "replies": [],
            "user": {
                "createdAt": "2021-11-14 14:14:24",
                "id": 62226540,
                "username": "123456",
                "email": "2679330388@qq.com",
                "notice": true,
                "role": 1,
                "github": null,
                "disabledDiscuss": false
            }
        }
    ]
}
```

#### 1.4.2 删除评论

- 请求路径：discuss/comment/:commentId
- 请求方法：delete
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| commentId | 评论Id   | 不能为空 |

- 响应参数
- 响应数据

```js
{
    "data": null,
    "meta": {
        "msg": "删除成功",
        "status": 200
    }
}
```

#### 1.4.3 删除回复

- 请求路径：discuss/reply/:replyId
- 请求方法：delete
- 请求参数

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| replyId | 回复Id   | 不能为空 |

- 响应参数
- 响应数据

```js
{
    "data": null,
    "meta": {
        "msg": "删除成功",
        "status": 200
    }
}
```

### 1.5 用户管理

#### 1.5.1 获取用户列表

- 请求路径：user/list
- 请求方法：get
- 请求参数

| 参数名   | 参数说明                | 备注   |
| -------- | ----------------------- | ------ |
| username | 用户名                  | 可为空 |
| type     | 用户类型（站内、github) | 可为空 |
| page     | 页数                    | 可为空 |
| pageSize | 每页大小                | 可为空 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| count  | 用户数量 |      |
| row    | 用户数据 |      |

- 响应数据

```js
{
    "count": 62,
    "rows": [
        {
            "createdAt": "2021-11-14 14:18:07",
            "updatedAt": "2021-11-14 14:18:07",
            "id": 62226543,
            "username": "helloMyboy112",
            "password": "$2a$10$uuVQwPeDJtWwD7yeD3Gop.Pdm9fzkEWwXoLbGaQte9QpD.VASjgFa",
            "email": "535667892@qq.com",
            "notice": true,
            "role": 2,
            "github": null,
            "disabledDiscuss": false
        }
    ]
}
```

#### 1.5.2 更新用户信息

- 请求路径：user/:userId
- 请求方法：put
- 请求参数

| 参数名         | 参数说明         | 备注 |
| -------------- | ---------------- | ---- |
| userId         | 用户Id           |      |
| notice         | 邮箱提醒是否开启 |      |
| disableDiscuss | 是否禁言         |      |

- 响应参数

- 响应数据

```js
{
    "data": null,
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

#### 1.5.3 删除用户

- 请求路径：user/:userId
- 请求方法：delete
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| userId | 用户Id   | 不能为空 |

- 响应参数
- 响应数据

```js
{
    "data": null,
    "meta": {
        "msg": "删除成功",
        "status": 200
    }
}
```