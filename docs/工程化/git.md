# git

基本命令：[常用 git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

## **分支**

```shell
git branch -a               查看所有分支
git remote show origin       可以展示远程的信息
git remote prune origin   删除远程所有已经删除的分支，但是本地没有更新远程的分支
git branch -D gh-pages 删除分支（不管它有没有merge）

git fetch --prune       删除远程所有已经删除但是本地没有依然有的分支
git branch -D <branchname>  删除本地没有被合并的分支
git push <远程主机名> <本地分支名>:<远程分支名>
git push origin test          推送本地test分支到远程，远程没有就新建
git push --all origin        将所有本地分支都推送到origin主机。
Git branch -m oldbranchname newbranchname  本地分支重命名
```

### Git 修改本地或远程分支名称

```shell
git branch -m oldBranch newBranch  #将本地分支重命名
git push --delete origin oldBranch  #删除远程分支（远端无此分支则跳过该步骤）
git push origin newBranch  #将重命名后的分支推到远端
git branch --set-upstream-to origin/newBranch #把修改后的本地分支与远程分支关联
```

### master 分支自动创建

因为 git 的分支必须指向一个 commit，没有任何 commit 就没有任何分支

提交第一个 commit 后，例如在空仓库里添加一个 README 文件，git 则回自动创建 master 分支

## [merge](https://backlog.com/git-tutorial/cn/stepup/stepup1_4.html)

- fast-forward（快进）合并

  - 没有冲突，直接移动 HEAD 到最新的 commit
  - 如果执行了 Fast Forward，开发者根本不会看到这个分支，就像在 master 直接 commit 一样。
  - 一旦删除分支或者分支指针往前走，很难体现该处提交是合并自某个分支的。

- non fast-forward

  - 在 merge 分支上有其他分支的最新提交并与自己的提交有冲突，会产生 non fast-forward 合并，会多出一个 commit

  - ```bash
    git merge --no-ff -m "commit描述" 要合并的分支名
    ```

<img src="https://segmentfault.com/img/bV9qte?w=1008&h=836" alt="img" style="zoom:50%;" />

Merge 和 rebase 都是合并历史记录，但是各自的特征不同。

- **merge**
  保持修改内容的历史记录，但是历史记录会很复杂。
- **rebase**
  历史记录简单，是在原有提交的基础上将差异内容反映进去。
  因此，可能导致原本的提交内容无法正常运行。

您可以根据开发团队的需要分别使用 merge 和 rebase。
例如，想简化历史记录，

- 在 topic 分支中更新 merge 分支的最新代码，请使用 rebase。
- 向 merge 分支导入 topic 分支的话，先使用 rebase，再使用 merge。

[git-merge 完全解析](https://www.jianshu.com/p/58a166f24c81)

## **撤销更改**

![image-20210109103451980](https://i.loli.net/2021/01/09/TfbZnAsQI5majG9.png)

```shell
git reset --hard HEAD^^       --回到前两次提交
git reset --hard <commitid>  回到commitId所属次数的提交状态
```

git reset --hard HEAD^^ --回到前两次提交
git reset --hard \<commitid> 回到 commitId 所属次数的提交状态

如果我们使用了 git reset --hard \<commitID> 不小心撤掉了一次重要的修改，也是可以补救回来的
我们通过 git flog 命令找到对应 commit 记录的 commit，然后再执行 git reset --hard \<commitID>就可以恢复到我们指定那一次提交的状态中

## revert

git revert \<commitID> 撤消指定 commit，作为一个新的 commit。

![image-20210109103515706](https://i.loli.net/2021/01/09/wgPDu4iGK5BYsTo.png)

如果你已经 push 到线上代码库, reset 删除指定 commit 以后,你 git push 可能导致一大堆冲突.需要用 git push -f 才能 push 上去，但是这种做法有风险，如果我们用 git revert 并不会有任何冲突，所以相对来说一般用 git revert 来撤销已经的 push 操作

## **重写历史 --amend**

--amend 选项可以让当前提交合并到上一次提交中作为一次提交

git commit --amend 最终你只会有一个提交 - 第二次提交将代替第一次提交的结果。将最后一次的提交信息载入到编辑器中供你修改。 当保存并关闭编辑器后，编辑器会将更新后的提交信息写入新提交中，它会成为新的最后一次提交。

git commit --amend -m ’xxx‘ 修改上次提交的信息

git commit --amend --no-edit 跳过修改提交信息环节

vscdoe 自带的 git 工具也有相关简单操作，知道对应操作后不难理解

![image-20210109103557081](https://i.loli.net/2021/01/09/QJpr5LRkgv6sUmw.png)

## cherryPick

我们可能会有这样一个使用场景，在分支 branch-a 需要分支 branch-b 的某次提交，这个时候我们就可以先找到 branch-b 的那次提交记录的 id，然后在 branch-a 分支进行 git cherry-pick b-commit-id 将 branch-b 分支的提交记录拿过来了

比如在功能性迭代开发中发现一个 bug，并提交了一个 commit 进行修复，但是发现该 bug 也存在线上的发布版本上，必须要尽快对线上进行修复，此时可以使用 git cherry-pick 将 bug 修复的 commit 嫁接到 fix 分支上进行代码修复，并及时发布，解决线上 bug。

git cherry-pick \<commit-id> 将指定 commit 添加到当前分支

git cherry-pick -x \<commit_id> 增加 -x 参数，表示保留原提交的作者信息进行提交。

git cherry_pick \<start-commit-id\>…\<end-commit-id\> 它的范围就是 start-commit-id 到 end-commit-id 之间所有的 commit，但是它这是一个 (左开，右闭] 的区间，也就是说，它将不会包含 start-commit-id 的 commit。

git cherry-pick \<start-commit-id>^...\<end-commit-id> 包含 start-commit-id 的话，就需要使用 ^ 标记一下，就会变成一个 [左闭，右闭] 的区间，具体命令如下

### 从其他代码库 cherry-pick commit

```
git remote add endel git://github.com/endel/rest-client.git

git fetch endel want-cherry-pick-branch

git log endel/want-cherry-pick-branch

git cherry-pick 97fedac
```

## **rebase 变基**

你可以使用 rebase 变基命令将提交到某一分支上的所有修改都移至另一分支上，就好像“重新播放”一样。

效果和 git merge 命令相比类似，但是各有不同的用处

- rebase 操作可以把本地未 push 的分叉提交历史整理成直线；
- rebase 的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

**使用原则**：一般我们这样做的目的是为了确保在向远程分支推送时能保持提交历史的整洁

所以，原则是只对尚未推送或分享给别人的**本地修改**执行变基操作清理历史， 从不对已推送至别处的提交执行变基操作

**使用场景**：比如当我们向他人维护的开源项目提交修改时，肯定要先在自己的分支中进行开发，然后再提交，但如果我们变基后再提交，维护人员就不用进行整合工作了，直接快速合并即可。

**git rebase 原理** ：其实是先将 HEAD 指向目标分支和当前分支的共同祖先 commit 节点，然后将当前分支上的 commit 一个一个的 cherryPick 到目标分支上，cherryPick 完以后再将 HEAD 指向当前分支。

具体使用方法可以看[gitBook 变基](https://git-scm.com/book/zh/v2/Git-分支-变基)

**使用：**

`git rebase \<basebranch> \<topicbranch>` 将主题分支变基到目标分支上，即把 topicbranch 放到 basebranch 后面提交

`git rebase --onto master server client`取出 client 分支，找出 server 分支之后的分歧的补丁， 然后把它们在 master 分支上重放一遍

在 rebase 的过程中，也许会出现冲突(conflict). 在这种情况，Git 会停止 rebase 并会让你去解决 冲突；在解决完冲突后，用"git-add"命令去更新这些内容的索引(index), 然后，你无需执行 git-commit,只要执行:

`git rebase --continue` 这样 git 会继续应用(apply)余下的补丁。

在任何时候，你可以用 git rebase --abort 来终止 rebase 的行动，并且"mywork" 分支会回到 rebase 开始前的状态。

git pull = git fetch + git merge

git pull --rebase = git fetch + git rebase

当一个分支下有多人协作，那么就算在同时开发由于不同的人会在同一个分支下产生多个提交记录，那么如果这时候你 push 会报错，当提示你再 pull 代码的时候就会自动合并产生一次 merge 提交，如果我们用 git pull --rebase 就可以将直接提交，并且分支是只有一条线的，但是这时如果有冲突的话 rebase 会暂停等你解决冲突

## [**交互式变基**](https://blog.csdn.net/zwlove5280/article/details/46649799)

rebase 除了可以把本地未 push 的分叉提交历史整理成直线，

还有一个功能就是使用交互式变基-i 参数来灵活地修改整理 commit 历史，如 commit 的合并、顺序调整、任意一次或批量的 commit 提交信息修改都可使用交互式变基实现

语法：`git rebase -i [startpoint] [endpoint]`

git rebase -i HEAD~4 省略 endpoint，意思是修改从最近一次提交开始的 4 次提交记录

执行命令后会弹出一个文本文件如下，我们进行相应修改后，关闭文本框，命令行就会继续操作

常用的几个标识命令

- pick 就是表示该提交对象正在使用，普通提交默认就是 pick
- reword 就是在提交的同时你可以编辑 commit message，它会在执行的时候弹出一个文本让你编辑信息，当你退出的时候，会继续执行命令
- edit 可以编辑指定提交的文件 *，*也会应用此提交，但是会在应用时停止，提示用户使用 _git commit --amend_ 执行提交，以便对提交进行修补。 当用户执行 _git commit --amend_ 完成提交后，还需要执行 _git rebase --continue_ 继续变基操作。Git 会对用户进行相应的提示。 实际上用户在变基暂停状态执行修补提交可以执行多次，相当于把一个提交分解为多个提交。而且 _edit_ 动作也可以实现 _reword_ 的动作，因此对于老版本的 Git 没有 _reword_ 可用，则可以使用此动作。
- squash，合并此条记录到前一个记录中，并且会弹出一个文本，上面有两次提交的 message，需要手动修改为合并后的 message，如果连续修改几个记录为 squash，那么会产生叠加合并，可以同时合并几个 commit
- fixup ，合并此条记录到前一个记录中，但是直接忽略此条 commit message，最终显示前一个记录的 message，连续修改同样也可以同时合并几个 commit 并且取早的一次提交 message
- 通过删除指定行来直接删除指定提交
- 通过交换行的顺序实现 commit 顺序的调整

合并的过程中如果遇到冲突，解决后需要 git add ，然后 git rebase --continue，如果想中止，使用 git rebase --abort。

改为 reword 后弹出文本框如下有指定提交的 commit message，我们修改再保存

改为 quash 后文本显示两次的提交信息，我们修改保存本次的提交信息

## **patch 补丁**

patch 补丁即为根据 git diff 生成的文本内容文件，最简单的生成方法为 git diff > test.patch

生成 patch 文件后，在项目下使用 git apply test.patch，会根据 patch 文件内的信息，在现有文件中添加或删除内容

使用场景：假如发现某个项目有 bug，而自己又没有 git 的提交权限，那么此时最合适的解决方法就是用 diff 命令做一个补丁发给项目成员。项目成员通过 patch 命令可以立刻知道你的意图。

`git patch formate-patch -s <start-commit> <end-commit>`可以批量生成 patch 文件,-s 参数代表生成自己的 GPG 签名信息

## **submodule**

含有子仓库的父仓库在 clone 时，子仓库目录为空，在 clone 时下载包括子仓库的内容

`git clone --recursive submodules url`
**如果 clone 时忘记用上面的--recurse-submodules 命令了可以再使用 一下命令将仓库中的子仓库 clone 下来**

`git submodule update --init --recursive`

注意：此处拉的是父仓库记录的每个子仓库的某个 commit，而不是最新的子仓库 commit，如下图所示记录的子仓库的的 commitID, 如果需要拉到最新的远程仓库的一次 commit，需要用到**–-remote 参数**

- `git submodule update --init --recursive --remote` 按照远程最新 commit 初始化子仓库
- `git submodule update --recursive --remote` 更新本地仓库，与远程仓库同步

**添加子仓库**

`git submodule add https://github.com/chaconinc/DbConnector path` 子模块会将子项目放到一个与仓库同名的目录中，本例中是 “DbConnector”

**远程数据更新 所有 子模块**
`git submodule update --remote`

**foreach 子模块命令，它能在每一个子模块中运行任意命令**
`git submodule foreach 'git stash'`
`git submodule foreach 'git checkout -b featureA'`

**删除 submodule**

1. 在“.gitmodules”文件中删除相应配置信息。
2. 执行“git rm –cached ”命令将子模块所在的文件从 git 中删除。

**修改 submodule 的 url 和分支** 1. 修改.gitmodules 文件的对应 url 和 branch 2. 执行 git submodule sync ，该命令是为了让将新的 URL 更新到文件`.git/config`； 3. 执行 git submodule update --force --recursive --init --remote。该命令会抓取修改过的最新的 shared 仓库并初始化。

**合并 submodule 作为仓库代码**

```shell
git submodule update --init
# 先备份仓库文件
mv src/shared ./
# 卸载子仓库
git submodule deinit src/shared
# 删除git submodule缓存
git rm --cached src/shared
# 再把文件移回正确位置
mv shared/* src/shared
# 删除备份
rm -rf shared
# 提交
git add .
git commit -m 'feat: 合并shared'
```

## **tag**

```shell
git tag -a v1.0.0 -m "内容：v1.0.0"   #创建标签
git tag <tagname>               #轻量标签
git tag                         #列出所有tag
git push origin v1.0.0           #推送标签
git tag -d v1.0.0                 #删除本地
git push origin :refs/tags/v1.0.0     #删除远程的
git tag                        #显示所有的tag
git tag -l 'v1.0.*'                 #查看某个版本系列的tag
git show v0.0.6                 #查看标签的详情，可以看到你commit的内容
git push origin --tags  #把所有不在远程仓库服务器上的标签全部传送到那里。
git checkout branchName tagName  #从tag且切分支
```

## default.config

当我们用 git branch -m oldBranch newBranch 修改当前分支的名字，我们再 push 时会出现以下提示

![image-20210109104053375](https://i.loli.net/2021/01/09/YKUArWSjR4BQ5qO.png)

我们可以配置 push.default

The **current** in this setup means that by default you will **only push the current branch** when you do **git push**

Other options are:

- nothing : Do not push anything

- matching : Push all matching branches (default)

- tracking : Push the current branch to whatever it is tracking

- current : Push the current branch

- `simple`: (new in Git 1.7.11) like upstream, but refuses to push if the upstream branch's name is different from the local one

  This is the safest option and is well-suited for beginners.

  This mode has become the default in Git 2.0.

查看当前的 push.default 配置:

```shell
git config --global push.default
```

修改配置:

```shell
git config --global push.default curr
```

## **修改远程仓库地址并推代码**

查看远程仓库的 url

```shell
$ git remote -v
> origin  git@github.com:USERNAME/REPOSITORY.git (fetch)
> origin  git@github.com:USERNAME/REPOSITORY.git (push)使用 git remote set-url 命令将远程的 URL 从 SSH 更改为 HTTPS。
$ git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

## [配置别名](https://juejin.cn/post/6844903976245133326#heading-1)

1. 别名配置保存在 `~/.gitconfig` 文件
2. 配置单个别名  `git config --global alias.rc 'rebase --continue'`
3. 以vim的形式修改别名配置文件  `git config --global -e`
   
## node常用命令
- 获取最近的commit-id: `git rev-parse --short HEAD` 
- 获取最近的commit-message: `git log -1 --pretty=%B`
- 删除除了master以外所有本地分支 `git branch | grep -v 'master' | xargs git branch -D`

## [git rm](https://www.runoob.com/git/git-rm.html)

删除文件

```bash
git rm -f   #强行删除暂存区修改过的文件
git rm --cached <file> # 删除文件在git跟踪清单中，但仍然希望保留在当前工作目录中，可以理解为单次操作使得git ignore
git rm –r *  # 递归删除当前目录所有文件夹和文件
```
## 参考

[GIT-BOOK](https://git-scm.com/book/zh/v2/)

[cherry-pick](https://juejin.im/post/5925a2d9a22b9d0058b0fd9b#heading-3)

[patch 的妙用](https://juejin.im/post/5a7a5860f265da4e8409175c)

[git rebase 使用场景](https://www.cnblogs.com/mengff/p/11608864.html)

[Git 误操作救命篇一： 如何将改动撤销？](https://zhuanlan.zhihu.com/p/42929114)
