## [Docker](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)

Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。

- Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。
- 总体来说，Docker 的接口相当简单，用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。

### Docker 的用途

Docker 的主要用途，目前有三大类。

（1）提供一次性的环境。比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。

（2）提供弹性的云服务。因为 Docker 容器可以随开随关，很适合动态扩容和缩容。

（3）组建微服务架构。通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。

### image 镜像

Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。

### docker 命令

运行下面的命令，将 image 文件从仓库抓取到本地。中 library 是 image 文件所在的组，hello-world 是 image 文件的名字。
由于 Docker 官方提供的 image 文件，都放在 library 组里面，所以它的是默认组，可以省略

- `docker image pull library/hello-world`抓取成功以后，就可以在本机看到这个 image 文件了。
- `docker image ls`运行这个 image 文件。
- `docker container run hello-world`
  有些容器不会自动终止，因为提供的是服务。比如，安装运行 Ubuntu 的 image，就可以在命令行体验 Ubuntu 系统。

\$ docker container run -it ubuntu bash
对于那些不会自动终止的容器，必须使用 docker container kill 命令手动终止。

\$ docker container kill [containID]
八、容器文件
image 文件生成的容器实例，本身也是一个文件，称为容器文件。也就是说，一旦容器生成，就会同时存在两个文件： image 文件和容器文件。而且关闭容器并不会删除容器文件，只是容器停止运行而已。

```
# 列出本机正在运行的容器
$ docker container ls

# 列出本机所有容器，包括终止运行的容器
$ docker container ls --all
```

上面命令的输出结果之中，包括容器的 ID。很多地方都需要提供这个 ID，比如上一节终止容器运行的 docker container kill 命令。

终止运行的容器文件，依然会占据硬盘空间，可以使用 docker container rm 命令删除。

\$ docker container rm [containerID]
运行上面的命令之后，再使用 docker container ls --all 命令，就会发现被删除的容器文件已经消失了。

### Dockerfile 文件(制作自己的 image 镜像)

它是一个文本文件，用来配置 image。Docker 根据 该文件生成二进制的 image 文件。

### 实例：制作自己的 Docker 容器

下面我以 koa-demos 项目为例，介绍怎么写 Dockerfile 文件，实现让用户在 Docker 容器里面运行 Koa 框架。

作为准备工作，请先下载源码。

`git clone https://github.com/ruanyf/koa-demos.git`
`cd koa-demos`

### [编写 Dockerfile 文件](http://www.hangdaowangluo.com/archives/2163)

首先，在项目的根目录下，新建一个文本文件.dockerignore，写入下面的内容。以下这三个路径不要打包进入 image 文件。

```
.git
node_modules
npm-debug.log
```

在项目的根目录下，新建一个文本文件 Dockerfile，写入下面的内容。

```javascript
FROM node:8.4 //该 image 文件继承官方的 node image
COPY . /app  // 将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录。
WORKDIR /app  // 指定接下来的工作路径为/app。
RUN npm install  // 在/app目录下，运行npm install命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。 --registry=https://registry.npm.taobao.org
EXPOSE 3000  // 将容器 3000 端口暴露出来， 允许外部连接这个端口。
CMD node demos/01.js // 容器启动后自动执行node demos/01.js。
```

有了 Dockerfile 文件以后，就可以使用 `docker image build`命令创建 image 文件了。
`docker image build -t koa-demo .`
或者
`docker image build -t koa-demo:0.0.1 .`
上面代码中，-t 参数用来指定 image 文件的名字，后面还可以用冒号指定标签。如果不指定，默认的标签就是 latest。最后的那个点表示 Dockerfile 文件所在的路径，上例是当前路径，所以是一个点。

如果运行成功，就可以看到新生成的 image 文件 koa-demo 了。
`docker image ls`

#### 生成容器

`docker container run`命令会从 image 文件生成容器。

`docker container run -p 8000:3000 -it koa-demo /bin/bash`
或者

`docker container run -p 8000:3000 -it koa-demo:0.0.1 /bin/bash`

- -p 参数：容器的 3000 端口映射到本机的 8000 端口。
- -it 参数：容器的 Shell 映射到当前的 Shell，然后你在本机窗口输入的命令，就会传入容器。
- koa-demo:0.0.1：image 文件的名字（如果有标签，还需要提供标签，默认是 latest 标签）。
- /bin/bash：容器启动以后，内部第一个执行的命令。这里是启动 Bash，保证用户可以使用 Shell。
  如果一切正常，运行上面的命令以后，就会返回一个命令行提示符。
- RUN 命令在 image 文件的构建阶段执行，执行结果都会打包进入 image 文件；CMD 命令则是在容器启动后执行。另外，一个 Dockerfile 可以包含多个 RUN 命令，但是只能有一个 CMD 命令。
- 指定了 CMD 命令以后，docker container run 命令就不能附加命令了（比如前面的/bin/bash），否则它会覆盖 CMD 命令。现在，启动容器可以使用下面的命令。

root@66d80f4aaf1e:/app#
这表示你已经在容器里面了，返回的提示符就是容器内部的 Shell 提示符。执行下面的命令。

root@66d80f4aaf1e:/app# node demos/01.js
这时，Koa 框架已经运行起来了。打开本机的浏览器，访问 http://127.0.0.1:8000，网页显示"Not Found"，这是因为这个 demo 没有写路由。

这个例子中，Node 进程运行在 Docker 容器的虚拟环境里面，进程接触到的文件系统和网络接口都是虚拟的，与本机的文件系统和网络接口是隔离的，因此需要定义容器与物理机的端口映射（map）。

在容器的命令行

- Ctrl + c 停止 Node 进程
- 按下 Ctrl + d （或者输入 exit）退出容器。
- 可以用 docker container kill 终止容器运行。

```
# 在本机的另一个终端窗口，查出容器的 ID
$ docker container ls

# 停止指定的容器运行
$ docker container kill [containerID]
容器停止运行之后，并不会消失，用下面的命令删除容器文件。


# 查出容器的 ID
$ docker container ls --all

# 删除指定的容器文件
$ docker container rm [containerID]
也可以使用docker container run命令的--rm参数，在容器终止运行后自动删除容器文件。


$ docker container run --rm -p 8000:3000 -it koa-demo /bin/bash
```

\$ docker container run --rm -p 8000:3000 -it koa-demo:0.0.1
10.5 发布 image 文件
容器运行成功后，就确认了 image 文件的有效性。这时，我们就可以考虑把 image 文件分享到网上，让其他人使用。

首先，去 hub.docker.com 或 cloud.docker.com 注册一个账户。然后，用下面的命令登录。

\$ docker login
接着，为本地的 image 标注用户名和版本。

\$ docker image tag [imageName][username]/[repository]:[tag]

### 实例

\$ docker image tag koa-demos:0.0.1 ruanyf/koa-demos:0.0.1
也可以不标注用户名，重新构建一下 image 文件。

\$ docker image build -t [username]/[repository]:[tag] .
最后，发布 image 文件。

\$ docker image push [username]/[repository]:[tag]
发布成功以后，登录 hub.docker.com，就可以看到已经发布的 image 文件。

### 十一、其他有用的命令

docker 的主要用法就是上面这些，此外还有几个命令，也非常有用。

（1）`docker container start`

前面的 docker container run 命令是新建容器，每运行一次，就会新建一个容器。同样的命令运行两次，就会生成两个一模一样的容器文件。如果希望重复使用容器，就要使用 docker container start 命令，它用来启动已经生成、已经停止运行的容器文件。

`docker container start [containerID]`
`docker container stop`

前面的 docker container kill 命令终止容器运行，相当于向容器里面的主进程发出 SIGKILL 信号。而 docker container stop 命令也是用来终止容器运行，相当于向容器里面的主进程发出 SIGTERM 信号，然后过一段时间再发出 SIGKILL 信号。

\$ bash container stop [containerID]
这两个信号的差别是，应用程序收到 SIGTERM 信号以后，可以自行进行收尾清理工作，但也可以不理会这个信号。如果收到 SIGKILL 信号，就会强行立即终止，那些正在进行中的操作会全部丢失。

（3）docker container logs

docker container logs 命令用来查看 docker 容器的输出，即容器里面 Shell 的标准输出。如果 docker run 命令运行容器的时候，没有使用-it 参数，就要用这个命令查看输出。

\$ docker container logs [containerID]
（4）docker container exec

docker container exec 命令用于进入一个正在运行的 docker 容器。如果 docker run 命令运行容器的时候，没有使用-it 参数，就要用这个命令进入容器。一旦进入了容器，就可以在容器的 Shell 执行命令了。

\$ docker container exec -it [containerID] /bin/bash
（5）docker container cp

docker container cp 命令用于从正在运行的 Docker 容器里面，将文件拷贝到本机。下面是拷贝到当前目录的写法。

\$ docker container cp [containID]:[/path/to/file] .

## [docker-service](http://www.hangdaowangluo.com/archives/2141)

应该说 docker service 是 swarm(docker 集群)最重要的管理指令，可以实现部署运行服务、服务扩容缩容、删除服务、滚动更新等功能，学习本章节的内容尤其重要，本文将详细展开 docker service 中的每一个选项的用法，不同于介绍其他的 docker 指令。

在 Swarm 集群上部署服务，必须在 Manager Node 上进行操作。先说明一下 Service、Task、Container（容器）这个三个概念的关系，如下图（出自 Docker 官网）非常清晰地描述了这个三个概念的含义：
![image](http://www.hangdaowangluo.com/wp-content/uploads/2017/06/20170315210902.jpg)

### [运行 dockerservice](https://www.jianshu.com/p/cc5e5a2da7cd)

了解 Service
在分布式应用中，我们经常会把应用程序拆分成许多个 Service（服务），比如一个电商交易系统可以拆分为商品详情服务、购物车服务、订单下单服务等，各个服务可以独立部署，共同协作完成业务。引入服务的概念可以实现系统的隔离、对服务可进行监控、扩展、从而保证系统高可用。Docker 支持服务化的部署和运行程序。

在 Docker 中，`一个服务一般只运行一个镜像`，它定义了这个镜像如何运行：它应该开放哪个端口，需要把容器复制多少份以增加服务处理能力等等。当访问量增大时，我们需要动态扩展我们运行服务的容器实例数量，分配更多的计算资源给到服务进程。以上这些工作，我们可以通过一个 docker-compose.yml 文件来完成。

## [docker-compose](http://www.ruanyifeng.com/blog/2018/02/docker-wordpress-tutorial.html):处理多个容器

## k8s

Kubernetes 相关术语
和其它技术一样，Kubernetes 也会采用一些专用的词汇，这可能会对初学者理解和掌握这项技术造成一定的障碍。为了帮助您了解 Kubernetes，我们在下面来解释一些常用术语。

- 主机（Master）： 用于控制 Kubernetes 节点的计算机。所有任务分配都来自于此。
- 节点（Node）：负责执行请求和所分配任务的计算机。由 Kubernetes 主机负责对节点进行控制。
- 容器集（Pod）：被部署在单个节点上的，且包含一个或多个容器的容器组。同一容器集中的所有容器共享同一个 IP 地址、IPC、主机名称及其它资源。容器集会将网络和存储从底层容器中抽象出来。这样，您就能更加轻松地在集群中移动容器。
- 复制控制器（Replication controller）：用于控制应在集群某处运行的完全相同的容器集副本数量。
- 服务（Service）：将工作内容与容器集分离。Kubernetes 服务代理会自动将服务请求分发到正确的容器集——无论这个容器集会移到集群中的哪个位置，甚至可以被替换掉。
- Kubelet：运行在节点上的服务，可读取容器清单（container manifest），确保指定的容器启动并运行。
- kubectl： Kubernetes 的命令行配置工具。

### [nginx+springboot 实战](https://www.cnblogs.com/evan-liang/p/12390315.html#nginxspringboot%E5%AE%9E%E6%88%98)

## 服务器知识

- 虚拟机是操作系统级别的资源隔离，而容器本质上是进程级的资源隔离。
- [Docker](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)本身并不是容器，它是创建容器的工具，是应用容器引擎
- 核心
  - 镜像（Image），那个放在包里的“镜像”，就是 Docker 镜像
  - 容器（Container），我在空地上，用魔法造好的房子，就是一个 Docker 容器
  - 仓库（Repository），而我的背包，就是 Docker 仓库
- K8S，就是基于容器的集群管理平台，它的全称，是 kubernetes
- 跳板机，就是可以给你远程连接的机器，然后通过这个机器再去访问别的机器，这个跳板机可以是 windows 下也可以是 Linux 下，跟操作系统无关，下面是其中比较常见的一种场景：
  - 很多客户方的服务器外网是连接不了的，一般只能通过 VPN 然后才能连接，然而一些客户方觉得做 VPN 的代价太大，但是开发方不方便经常去现场或者其他原因需要访问客户方的服务器并且服务器外网不能连接时，没有 VPN 时，只能通过远程连接，比如 teamview,QQ 远程，还有 windows 自带的远程连接工具，连接到远端的一台电脑上，这台电脑就是跳板机，作为一个桥梁，然后再通过这个机器在内网中访问其服务器，也就是相当于一个代理

## [数据卷 Volume](http://www.hangdaowangluo.com/archives/2150)

数据卷是一个可供一个或多个容器使用的特殊目录，它绕过 UFS（UNIX 文件系统的简称），可以提供很多有用的特性：

- 数据卷可以在容器之间共享和重用
- 对数据卷的修改会立马生效
- 对数据卷的更新，不会影响镜像
- 数据卷默认会一直存在，即使容器被删除

```
create	创建数据卷
例如：docker volume create vol01
ls	查看所有的数据卷
例如： docker volume ls
rm	删除数据卷
例如：docker volume rm vo01
prune	清除未使用的数据卷
例如：docker volume prune
inspect	查看数据卷详情信息
例如：docker volume inspect vo01
```
