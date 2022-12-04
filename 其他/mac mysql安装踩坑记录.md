# mac mysql安装踩坑记录

- 优先推荐使用brew安装



## 安装mysql

```bash
brew install mysql
```



## 设置mysql

全程勾选y，如果执行改命令行

```shell
mysql_secure_installation
```



**意外报错处理：**

- 如果执行`mysql_secure_installation`，报错`can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)`

  - 原因：mysql未执行
  - 解决方案：执行命令`mysql.sever start`

- 如果执行`mysql.sever start`，报错`...Error The server quit without updating PID file`

  - 原因：`mysql`二次安装，之前未卸载干净

  - 解决方案：`mysql`完全删除

    - `Case1`：使用`homebrew`安装的，执行以下命令行

      - ```shell
        brew uninstall mysql
        brew cleanup
        ```

    - `Case2`：使用安装包下载的，在系统偏好设置中卸载

    统一检查，完全删除残余文件

    ```shell
    sudo rm /usr/local/mysql
    sudo rm -rf /usr/local/var/mysql;
    sudo rm -rf /usr/local/mysql*
    sudo rm -rf /Library/StartupItems/MySQLCOM
    sudo rm -rf /Library/PreferencePanes/My*
    rm -rf ~/Library/PreferencePanes/My*
    sudo rm -rf /Library/Receipts/mysql*
    sudo rm -rf /Library/Receipts/MySQL*
    sudo rm -rf /var/db/receipts/com.mysql.*
    ```

- **重点：**重启电脑，再重新安装mysql