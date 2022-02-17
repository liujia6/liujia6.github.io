---
autoGroup-1: linux
---

# ssh

- 参考https://zhuanlan.zhihu.com/p/21999778
- 参考https://zhuanlan.zhihu.com/p/126117538
- [SSH原理与运用（一）：远程登录](https://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)
- [SSH原理与运用（二）：远程操作与端口转发](https://www.ruanyifeng.com/blog/2011/12/ssh_port_forwarding.html)

## 简单免密登录服务器

[参考](https://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)

1. 首先需要生成ssh秘钥`ssh-keygen -t rsa -C "953993047@qq.com"`,

2. 控制台问如果之前有生成过一次ssh地址，，则需要输入本次的文件名例如id_rsa_github，不然会覆盖之前的

3. 执行 `vi ~/.ssh/config` 按照以下格式写入主机的简称 ，之后可以用ssh ${hostNickName} 而不是ssh ${username}@${hostIp}登录了
    ```
    Host ${hostNickName}
      HostName ${hostIp}
      User ${username}
    ```
4. windows下执行`  ssh-copy-id -i ~/.ssh/id_rsa.pub 服务器用户名@服务器地址`

   - 本地Mac环境执行` ssh 服务器用户名@服务器地址 "echo \"`cat .ssh/id_rsa.pub`\" >> .ssh/authorized_keys"`
   - ssh-copy-id 是用来将本地公钥拷贝到远程的 authorized_keys 文件的脚本命令，它还会将身份标识文件追加到远程机器的 ~/.ssh/authorized_keys 文件中，并给远程主机的用户主目录适当的的权限。

5. 以上执行完成后会让输入密码

6. 完成啦！输入ssh 225即可登录服务器了！(这里225是我第一步配置的服务器HOST登录简称)

7. ~/.ssh下一共有4个文件，`config  id_rsa  id_rsa.pub  known_hosts`，分别是配置文件，用于简单登录服务器，私钥和公钥，

8. 第一次登录主机的时候会提示你`　Are you sure you want to continue connecting (yes/no)? yes`,yes完成后会将远程主机的公钥存放在此处

## 管理本机的多个ssh密钥（多个远程仓库账号）

[参考](https://blog.csdn.net/agonie201218/article/details/89561961)

可以使用ssh-agent统一对私钥代理，也可以通过config文件，固定不同域名使用不同私钥

当切换到其他电脑时，直接复制ssh文件夹，并且执行

```
chmod 600 ~/.ssh/config
```

https://serverfault.com/questions/253313/ssh-returns-bad-owner-or-permissions-on-ssh-config

### ssh-agent
- 使用场景：
  - 本机有多个用户需要登录不同的应用，例如公司的gitlab和github需要管理两个不一样的ssh密钥对，并在clone的时候切换用户，因为ssh默认使用的是id_rsa私钥，如果是需要切换到其他的可以用轻松切换ssh-agent
  - 当私钥设置了密码，我们又需要频繁的使用私钥进行认证时，ssh代理可以帮助我们免去重复的输入密码的操作。
- 使用
  - `eval $(ssh-agent) `   
    - 开启ssh-agent，输出进程pid`Agent pid 1434`
    - `ssh-agent -k`  终止ssh-agent运行
    - eval `ssh-agent`   和ssh-agent $shell都是同样的运行ssh-agent命令
  - `ssh-add  私钥路径`
  - AddKeysToAgent   ->ssh config文件配置
    - 是否自动将 key 加入到 `ssh-agent`，值可以为 no(default)/confirm/ask/yes。
    - 如果是 yes，key 和密码都将读取文件并以加入到 agent ，就像 `ssh-add`。其他分别是询问、确认、不加入的意思。添加到 ssh-agent 意味着将私钥和密码交给它管理，让它来进行身份认证。
- ssh-adds使用
  - `ssh-add -D` 删除所有私钥
  - `ssh-add -l` 显示所有私钥列表
  - `ssh-add -L`  查看代理中的私钥对应的公钥
  - `ssh-add -d /path/of/key/key_name`  移除指定的私钥
  - `ssh-add -x`   锁定ssh代理,锁定时需要指定锁定密码，锁定后的ssh代理暂时不能帮助我们管理私钥
  - `ssh-add -X`  解锁ssh代理
  - `ssh-add -d /path/of/key/key_name`   移除指定的私钥

### config

ssh程序可以从三个途径获取配置参数：

- 命令行选型，比如 -i ~/.ssh/id_rsa，-p 6004，-l jingwei；
- 用户配置文件，放置在 ~/.ssh/config；
- 系统配置文件，放置在 /etc/ssh/ssh_config（区别于 /etc/ssh/sshd_config）。

[参考->利用 SSH 的用户配置文件 Config 管理 SSH 会话](https://www.hi-linux.com/posts/14346.html)

[参考->SSH Config 那些你所知道和不知道的事](https://deepzz.com/post/how-to-setup-ssh-config.html)

配置不同的仓库指向不同的密钥文件，为不同网站应用各自的 SSH KEY

vi ~/.ssh/config

```bash
Host github.com(可更改)// 主机名字，不能重名
    HostName github.com// 主机所在域名或IP
    User git  // 用户名称
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_github  私钥路径
```

- SSH客户端的StrictHostKeyChecking配置指令，`StrictHostKeyChecking=no`时可以实现当第一次连接服务器时自动接受新的公钥。不再有任何警告出现了。
- **LocalForward**
  指定本地主机的端口通过 ssh 转发到指定远程主机。格式：LocalForward [bind_address:]post host:hostport，支持 IPv6。
- 取消 git 全局用户名/邮箱的设置，设置独立的 用户名/邮箱

```bash
# 取消全局 用户名/邮箱 配置
$ git config --global --unset user.name
$ git config --global --unset user.email
# 进入项目文件夹，单独设置每个repo 用户名/邮箱
$ git config user.email "xxxx@xx.com"
$ git config user.name "xxxx"
```

### 配置ssh-agent登录

​	[参考](https://zhuanlan.zhihu.com/p/126117538)

### ssh-agent代理转发

​    [原理参考](https://www.zsythink.net/archives/2422)

​    [使用参考](https://blog.csdn.net/miss1181248983/article/details/84555264?utm_medium=distribute.pc_relevant.none-task-blog-title-7&spm=1001.2101.3001.4242)

现在有server1、server2、server3三台机器，其中server1已经可以免秘钥登陆server2和server3，但server2和server3之间无法通过ssh登陆。通过server1的ssh-agent配置可以实现server免秘钥登录server3

步骤如下

- 编辑配置文件：

```bash
[root@server1 ~]# vim /etc/ssh/sshd_config         #做下面更改
AllowAgentForwarding yes   # 表示允许代理转发
```

- 启动 ssh-agent 服务：

```bash
[root@server2 ~]# ssh-agent bash

[root@server1 ~]# ps aux |grep ssh-agent
root     24338  0.0  0.0  51416   580 ?        Ss   02:43   0:00 ssh-agent
root     24388  0.0  0.0  51416  1032 ?        Ss   02:44   0:00 ssh-agent bash
```

- 添加私钥：

```bash
[root@server1 ~]# ssh-add ~/.ssh/id_rsa
```

- 测试登陆：

```bash
[root@server1 ~]# ssh -A server2          #这里 -A 不可省略，表示开启认证代理连接转发功能
Last login: Mon Nov 26 09:36:58 2018 from server1

[root@server2 ~]# ssh  server3            #后面这里 -A可以省略
Last login: Mon Nov 26 09:37:28 2018 from server1
```

-ssh -A server2          #这里 -A 不可省略，表示开启认证代理连接转发功能

## 远程执行命令

- `ssh  server "cd /; ls"`
- `$ ssh example < test.sh`  远程执行本地脚本
- `ssh -t example "top"`  执行需要交互的命令

## 远程服务当本地用

通过 LocalForward 将本地端口上的数据流量通过 ssh 转发到远程主机的指定端口。感觉你是使用的本地服务，其实你使用的远程服务。如远程服务器上运行着 Postgres，端口 5432（未暴露端口给外部）。那么，你可以：

```bash
Host db
    HostName db.example.com
    LocalForward 5433 localhost:5432
```

当你连接远程主机时，它会在本地打开一个 5433 端口，并将该端口的流量通过 ssh 转发到远程服务器上的 5432 端口。

首先，建立连接：

```bash
$ ssh db
```

之后，就可以通过 Postgres 客户端连接本地 5433 端口：

```bash
$ psql -h localhost -p 5433 orders
```

## 代理

有的时候你可能没法直接登录到某台服务器，而需要使用一台中间服务器进行中转，如公司内网服务器。首先确保你已经为服务器配置了公钥访问，并开启了agent forwarding，那么你需要添加如下配置到 `~/.ssh/config`：

```bash
Host gateway
    HostName proxy.example.com
    User root
Host db
    HostName db.internal.example.com                  # 目标服务器地址
    User root                                         # 用户名
    # IdentityFile ~/.ssh/id_ecdsa                    # 认证文件
    ProxyCommand ssh gateway netcat -q 600 %h %p      # 代理命令
```
