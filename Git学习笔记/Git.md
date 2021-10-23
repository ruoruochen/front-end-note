# Git

### 创建仓库

```other
//第一步，进入当前要进入文件目录
$ mkdir XXX //创建子目录 如果子目录存在则不用这一步
$ cd XXX //进入子目录
$ pwd //显示路径 确认以进入目录

//第二步，通过git init命令把这个目录变成Git可以管理的仓库：
$ git init
```



### 添加、提交文件

```other
$ git add file //添加文件至暂存区
$ git commit -m"explain" //提交
//可添加多个 一次提交
```



### 版本管理

```other
$ git status //查看工作区与版本库的状态
$ git log //查看提交记录
$ git log --pretty=oneline
$ git reflog //查看命令记录
$ cat file //查看内容
$ git reset --hard xxx//版本回退 xxx为版本号或 HEAD^ HEAD^^ HEAD~数字 。git用HEAD表示当前版本，，上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100.

```



### 修改管理

```other
$ git diff HEAD -- file  //查看工作区与版本库最新版本的区别
$ git checkout -- file //撤销（丢弃）工作区的修改 
					   //①修改后未放暂存区，	撤销修改后与版本库一致。
					   //②加入暂存区又做修改，撤销修改后回到添加到暂存						 区的状态。
$ git rm file //在版本库删除文件
$ git checkout -- file //误删时，复制版本库的最新版本。
```



### 关联远程仓库

```git
$ git remote add origin git@github.com:ruoruochen/learngit.git//关联远程库
$ git push -u origin master //本地库所有内容推送至远程库
$ git push origin master //可推送最新修改
```



### 克隆远程库

```git
$ git clone git@github.com:ruoruochen/gitskills.git //克隆
$ cd gitskills //进入子目录
$ ls //查看目录内容
```



## 分支管理

### 创建和合并分支

```git
$ git checkout -b dev //创建dev分支并切换到dev分支
$ git switch -c dev //创建并切换到dev分支 建议使用switch
//相当于一下两条命令：
//$ git branch dev //创建分支
//$ git checkout dev

$ git branch //查看当前分支
$ git checkout master //切回master分支
$ git switch master //切回master
$ git merge dev //git merge用于合并指定分支到当前分支，即合并dev到当前分支master
$ git branch -d dev //删除分支
```



### 解决冲突

```git
当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。
```



### 分支管理策略

- 强制禁用`Fast forward`模式进行合并：$ git merge --no-ff -m "merge with no-ff" dev
-  查看分支历史 $ git log --graph --pretty=oneline --abbrev-commit



### Bug分支

- 把当前工作现场“储藏”起来：$ git stash

- 查看工作现场：$ git stash list

- 将stash内容回复的两种方法：

  1. ​	git stash apply。恢复后，stash内容并不删除，你需要用`git stash drop`来删除。
  2. git stash pop。恢复的同时把stash内容也删了

- `cherry-pick`命令，让我们能复制一个特定的提交到当前分支

  ```git
  $ git cherry-pick 4c805e2
  ```

  

### Feature分支

- 添加一个新功能，新建一个feature分支，在上面开发，完成后，合并，最后删除该分支。



### 多人协作

- 查看远程库信息：git remote 或git  remote -v (更详细信息)

- 推送分支：

  ```git
  $ git push origin master
  ```

  - 推送失败，先用`git pull`抓取远程的新提交，若有冲突，处理冲突。
  - 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致
  - 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；



### Rebase

- rebase操作可以把本地未push的分叉提交历史整理成直线；
- rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。



# 标签管理

### 创建标签

- 创建标签：

  - 给最新提交的commit打上标签：$ git tag <tagname>

  - 给指定commit打标签：$ git tag v0.9 f52c633

  - 还可以创建带有说明的标签，用`-a`指定标签名，`-m`指定说明文字：

    ```
    $ git tag -a <tagname> -m "balbalabala" <commit id>
    ```

- 查看所有标签： $ git tag

- 查看标签信息：git show <tagname>



### 操作标签

- 删除标签(未推送至远程)：$ git tag -d <tagname>
- 删除远程标签：
  1. 本地删除 ：$ git tag -d <tagname>
  2. 远程删除 ：$ git push origin :refs/tags/tagname 
  3. 登录Github检查是否删除成功。
- 推送某个标签至远程：$ git push origin <tagname>
- 一次性推送全部未推送至远程的本地标签： $ git push origin --tags





### 使用Gitee

- 查看远程库信息:`git remote -v`
- 删除远程库：git remote rm origin
- 可以同步多个远程库，git给远程库默认名origin，多个远程库需用不同名称标识。