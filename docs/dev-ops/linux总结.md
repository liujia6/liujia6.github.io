---
autoGroup-1: linux
---
# linux总结

## [新建用户](https://www.jianshu.com/p/eb6d0365c019)

## 文件

![img](https://i.loli.net/2020/12/12/t816ZLWsnBzxuvy.png)

文件类型：普通文件（-）、文件夹（d）、字符设备文件（c）、块设备文件（b）、符号链接文件（l）、管道文件（p）、套接字文件 （s）

## ls

```bash
# 选项
ls -a # 列出目录所有文件，包含以.开始的隐藏文件
ls -A # 列出除.及..的其它文件
ls -r # 反序排列
ls -t # 以文件修改时间排序
ls -S #以文件大小排序
ls -h #以易读大小显示
ls -l #除了文件名之外，还将文件的权限、所有者、文件大小等信息详细列出来
```

## inode

文件数据都储存在"块"中，那么很显然，我们还必须找到一个地方储存文件的元信息，比如文件的创建者、文件的创建日期、文件的大小等等。这种储存文件元信息的区域就叫做inode，中文译名为"索引节点"。文件或目录的inode编号是一个用 于标识的唯一数字，除了文件名以外的所有文件信息，都存在inode之中

每一个文件都有对应的inode，里面包含了与该文件有关的一些信息。

[理解inode](https://www.ruanyifeng.com/blog/2011/12/inode.html)

可以用stat命令，查看某个文件的inode信息：

> 　　stat example.txt

**字符设备**：【键盘、串口】提供连续的数据流，应用程序可以顺序读取，通常不支持随机存取。相反，此类设备支持按字节/字符来读写数据。举例来说，键盘、串口、调制解调器都是典型的字符设备

**块设备** ：【U盘】应用程序可以随机访问设备数据，程序可自行确定读取数据的位置。应用程序可以随机访问设备数据，程序可自行确定读取数据的位置。硬盘、软盘、CD-ROM驱动器和闪存都是典型的块设备，应用程序可以寻址磁盘上的任何位置，并由此读取数据。此外，数据的读写只能以块(通常是512B)的倍数进行。与字符设备不同，块设备并不支持基于字符的寻址。

## 归档| 压缩

命令|解释
---|---
tar -czvf test.tar test1/ test2/ |`压缩`test1和test2目录到test.tar/tar.gz/tgz三种文件都可以
tar -xzvf filename.tgz | `解压`tar/tar.gz/tgz三种文件都可以

参数|使用
---|---
-c | 建立压缩档案
- x | 解压
- t | 查看内容
- r | 向压缩归档文件末尾追加文件
- u | 更新原压缩包中的文件。
-z | 有gzip属性的,使用gzip算法
- v | 显示所有过程
- O | 将文件解开到标准输出中


目录（d）、文件（-）、字符型文件（c）或块设备（b）； 
## 复制
`cp source destination`

`cp -R source destination` 递归地复制整个目录的内容。 

## mkdir

`mkdir -p dir1/dir2 `   : 如果不存在该目录就，递归的创建目录

## find

- `find ../ -maxdepth 1 -name '*.zip' -exec  cp {} ./ \; `
  - 找到上一级目录下的zip文件并将其复制到当前目录下
  - find  path  option  
  - --maxdepth 1 只在当前目录下搜索
  - -exec  命令 \;           # 表示找到文件后对这些文件执行命令 命令必须以\;结尾
- `find /home ! -name "*.txt"`
  - 否定参数 ！，不满足该条件的其他文件，以上是/home目录下不是txt的所有文件
- `find . -name "*.java"|xargs cat|grep -v ^$|wc -l `
  -  代码行数统计, 排除空行获取文件的md5值

## md5值计算

```bash
$ md5sum app-sso.zip
49198f8f31d0315fe3392c39f2fed1bb *app-sso.zip
```

## wc 命令

`wc(word count)` 命令功能为统计指定的文件中字节数、字数、行数，并将统计结果输出。

```bash
#选项
-c #统计字节数
-l #统计行数
-m #统计字符数
-w #统计词数，一个字被定义为由空白、跳格或换行字符分隔的字符串

#实例
wc text.txt #查找文件的 行数 单词数 字节数 文件名，结果：7 8 70 test.txt
cat test.txt | wc -l #统计输出结果的行数

λ wc -l jsconfig.json     # 统计jsconfig.json文件的行数
#16 jsconfig.json

λ wc -l < jsconfig.json  # 统计jsconfig.json文件的行数，不输入文件名
#16 
```

## 查看文件类型file

|参数| 示例|结果|解释|
| ---- | ---- | ---- | ---- |
|-i |file -i a.jpg  | a.jpg: text/plain; charset=us-ascii | 输出文件的mime类型 |

- 
  text/plain：普通文本。
- text/html：HTML文本。
- application/pdf：PDF文档。
- application/msword：Word文档。
- image/png：PNG图片。
- mage/jpeg：JPEG图片。
- application/x-tar：TAR文件。
- application/x-gzip：GZIP文件。

## [curl](https://medium.com/hackernoon/how-to-easily-use-curl-for-http-requests-db3249c5d4e6)

如果命令需要换行，在换行处加 反斜杠\

```kotlin
curl --http1.0 --next --no-keepalive -X POST "https://www. domain.com/requestUri" \
    -H 'Content-Type: application/json' \
    -H 'User-agent: test' \
    -H "token: tokenValue" \
 --data "{\"jsons\":[{\"id\":\"1\",\"value\":1}],\"type\":\"M\",\"name\":\"fei\"}"
```

参数|使用
---|---
-v | 展示全部信息
–header | 指定 post body的 content type
-d | post body的内容
-H | 修改请求头
-T | PUT请求 其后加上文件可以直接上传文件
-O | 下载文件
-u | 设置用户名和密码
-XGET或者-XPOST | 指定请求方式为GET或者POST 
--data "{\"jsons\":[{\"id\":\"1\",\"value\":1}],\"type\":\"M\",\"name\":\"fei\"}" | body请求参数用 --data表示（两个横杆）；请求内容有引号时，加反斜杠\ 
                                                              |  




示例 | 使用
---|---
curl -v --header "Content-Type: application/json" -d"{\"value\":\"node JS\"}" http://localhost:3000/test | 设置请求头并post请求
curl -v -T test.tgz ${url}| 上传test.tgz文件到url目录下
curl -O http://www.linux.com/dodo[1-5].JPG | dodo1，dodo2，dodo3，dodo4，dodo5全部保存下来
curl -o #1_#2.JPG http://www.linux.com/{hello,bb}/dodo[1-5].JPG | 这样就需要对文件进行重命名。

[参考1](https://www.cnblogs.com/hujiapeng/p/8470099.html)

## [查看文件内容](https://www.cnblogs.com/yangliguo/p/8463131.html)

- cat 由第一行开始显示文件内容
- tac 从最后一行开始显示，可以看出 tac 是 cat 的倒着写
nl 显示的时候，顺道输出行号！
- more 一页一页的显示文件内容
- less 与 more 类似，但是比 more 更好的是，他可以往前翻页！
-head 只看头几行
- tail 只看尾巴几行
- 你可以使用 man [命令]来查看各个命令的使用文档，如 ：man cp。

## [curl](http://www.ruanyifeng.com/blog/2011/09/curl.html)和[wget](https://www.cnblogs.com/ftl1012/p/9265699.html)请求1

[wget](https://www.cnblogs.com/peida/archive/2013/03/18/2965369.html)


 wget是linux上的命令行的下载工具。这是一个GPL许可证下的自由软件。
- wget支持**HTTP(s)、FTP协议、代理服务器**和**断点续传**功能
- 能够**自动递归**远程主机的目录，找到合乎条件的文件并将其下载到本地硬盘上
- 如果必要，wget将恰当地转换页面中的超级连接以在本地生成可浏览的**镜像**。
- 由于没有交互式界面，wget可在**后台运行**，截获并忽略HANGUP信号，因此在用户推出登录以后，仍可继续运行。
- 通常，wget用于**成批量地下载**Internet网站上的文件，或制作远程网站的**镜像**。

rcp命令用于复制远程文件或目录。

## 软链接

坑：windows下ln -s命令不能达到预期效果，会创建一个硬链接。 

执行 `ln -s  test ab`

用`ls -l`命令看到以下文件夹ab，是一个指向test的软链接,查看和修改ab文件夹中的内容实际上就是修改test文件夹下的

![image-20201212192336320](https://i.loli.net/2020/12/12/azKLntyB5q7XRiP.png)

【软链接地址】指“快捷键”文件名称，该文件是被指令创建
两个路径都需要是绝对路径  不然会报红
示例 | 解释
---| ---
ln - s src linkDest| 创建
ln - snf newSrc linkDest| 修改
rm - rf linkDest | 删除软链接 ，软链接地址最后不能含有“/”，当含有“/”时，删除的是软链接目标目录下的资源，而不是软链接本身

## ps

`ps -l`    默认展示与当前shell相关的进程

`ps -aux `  列出目前所有的正在内存当中的程序

```shell
ps aux

# USER               PID  %CPU %MEM      VSZ    RSS   TT  STAT STARTED      TIME COMMAND
# kenny             6155  21.3  1.7  7969944 284912   ??  S    二03下午 199:14.14 /Appl...OS/WeChat
# kenny              559  20.4  0.8  4963740 138176   ??  S    二03下午  33:28.27 /Appl...S/iTerm2
# _windowserver      187  18.0  0.6  7005748  95884   ??  Ss   二03下午 288:44.97 /Syst...Light.WindowServer -daemon
# kenny             1408  10.7  2.1  5838592 347348   ??  S    二03下午 138:51.63 /Appl...nts/MacOS/Google Chrome
# kenny              327   5.8  0.5  5771984  79452   ??  S    二03下午   2:51.58 /Syst...pp/Contents/MacOS/Finder
```

## window下查看端口占用进程

以8080为例:

netstat -ano |findstr 8080 : 查找占用8080端口的进程对应的PID,假设是9784;

tasklist |findstr 9784 : 查找PID为9784的进程，也就是占用8080端口的进程;

taskkill /T /F /PID 9784 : 杀死这个进程

## awk

[`awk`](https://en.wikipedia.org/wiki/AWK)是处理文本文件的一个应用程序

- 它依次处理文件的每一行，并读取里面的每一个字段。

- 对于日志、CSV 那样的**每行格式相同的文本文件**，`awk`可能是最方便的工具。

[awk入门](http://www.ruanyifeng.com/blog/2018/11/awk.html)

[vim](https://mp.weixin.qq.com/s?__biz=MzA4MTc4NTUxNQ==&mid=2650518612&idx=1&sn=125c2cb9ee6d76a6817fb0ebc5a3c5e4&scene=21#wechat_redirect)

## [vim 常用操作总结](https://github.com/chenxiaochun/blog/issues/60)

**yy** 复制一行

**x** 向剪切一个一个字符，如果是在行尾，则为向前剪切

**dd** 删除一行

**p** 粘贴复制或剪切的内容

**u** 恢复更改

**ggVG** 全选

## [Ping 命令](https://zhuanlan.zhihu.com/p/45110873)

简单来说，「ping」是用来探测本机与网络中另一主机之间是否可达的命令，如果两台主机之间ping不通，则表明这两台主机不能建立起连接。ping是定位网络通不通的一个重要手段

- 基于 ICMP 协议， Internet 控制报文协议
- ping 命令会发送一份ICMP回显请求报文给目标主机，并等待目标主机返回ICMP回显应答。因为ICMP协议会要求目标主机在收到消息之后，必须返回ICMP应答消息给源主机，如果源主机在一定时间内收到了目标主机的应答，则表明两台主机之间网络是可达的。
- 直接基于网络层的IP协议，即ICMP报文是封装在IP包中
- IP协议是一种无连接的，不可靠的数据包协议，它并不能保证数据一定被送达，那么我们要保证数据送到就需要通过其它模块来协助实现，这里就引入的是ICMP协议。
- 大致可分为两类：
  - 查询报文类型；主要应用于：ping查询、子网掩码查询、时间戳查询等等。
  - 差错报文类型。

[yum安装](https://wangchujiang.com/linux-command/c/yum.html)

[linux下更新到最新版本](https://www.jianshu.com/p/d934d3ba67ec)

## linux删除.git文件夹

1.在本地仓库的目录下调用命令行删除根目录下的.git文件夹，输入

```
find . -name ".git" | xargs rm -Rf
```

这样本地仓库就清除了，像下面这样，master不见了。

1. 手动删除掉残留的.git文件
2. 在命令行中输入rm -rf + github仓库地址，例

```
rm -rf https://github.com/NeroSolomon/VLearning.git
```

1. 在github的对应的库中到setting删除库。

## [XShell上传下载文件](https://blog.csdn.net/hhy_123963/article/details/81080553?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.base)

sudo apt-get install lrzsz

安装完毕即可使用

rz，sz是便是Linux/Unix同Windows进行ZModem文件传输的命令行工具

rz------即是接收文件，xshell就会弹出文件选择对话框，选好文件之后关闭对话框，文件就会上传到linux里的当前目录

sz file ----------就是发文件到windows上（保存的目录是可以配置） 比ftp命令方便多了，而且服务器不用再开FTP服务了