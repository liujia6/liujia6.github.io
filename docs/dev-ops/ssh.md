---
autoGroup-1: linux
---

# ssh

- [SSH 原理与运用（一）：远程登录](https://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)
- [SSH 原理与运用（二）：远程操作与端口转发](https://www.ruanyifeng.com/blog/2011/12/ssh_port_forwarding.html)

## 远程登录

### [ssh 配置公钥免密登录实战](https://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)

1. 生成 ssh 秘钥 `ssh-keygen -t rsa -C "xxx@email.com"`,

2. 控制台问如果之前有生成过一次 ssh 地址，则需要输入本次的文件名例如 id_rsa_github，不然会覆盖之前的

3. 执行 `vi ~/.ssh/config` 按照以下格式写入主机的简称 ，之后可以用 ssh ${hostNickName} 而不是ssh ${username}@\${hostIp}登录了

   ```
   Host ${hostNickName}
     HostName ${hostIp}
     User ${username}
   ```

4. windows 下执行`ssh-copy-id -i ~/.ssh/id_rsa.pub 服务器用户名@服务器地址`

   - 本地 Mac 环境执行`ssh 服务器用户名@服务器地址 "echo \"`cat .ssh/id_rsa.pub`\" >> .ssh/authorized_keys"`
   - ssh-copy-id 是用来将本地公钥拷贝到远程的 authorized_keys 文件的脚本命令，它还会将身份标识文件追加到远程机器的 ~/.ssh/authorized_keys 文件中，并给远程主机的用户主目录适当的的权限。

5. 以上执行完成后会让输入密码

6. 完成啦！输入 ssh 225 即可登录服务器了！(这里 225 是我第一步配置的服务器 HOST 登录简称)

7. ~/.ssh 下一共有 4 个文件，`config id_rsa id_rsa.pub known_hosts`，分别是配置文件，用于简单登录服务器，私钥和公钥，

8. 第一次登录主机的时候会提示你`Are you sure you want to continue connecting (yes/no)? yes`,yes 完成后会将远程主机的公钥存放在此处

### 远程登录的原理

**账号密码登录**：保证主机提供的密码和账户名一致即可

1. 如何保证密码不被篡改
   1. 使用服务器的公钥将密码加密并使用私钥解密，如果一致则表示密码没有被篡改
2. 服务器的公钥没有证书中心 CA 公证，如何保证服务器的身份不被远程拦截（中间人攻击），
   1. 第一次登录时，系统提示并展示出服务器的公钥指纹，并要求确认，此时我们通过对比服务器公示出来的公钥指纹，确认核对即可
   2. 核对后，会将主机的公钥保存在.ssh/known_hosts 文件中，下次就可以不用核对了

**ssh 配置公钥免密码登录**：通过预先将本机生成的用户公钥保存在远程主机上，登录时验证通信时本机是否有对应的私钥即可

1. 如何验证对方是否有是否有对应私钥呢
   1. 登录时，服务器发送一个随机字符
   2. 主机用私钥将随机字符加密
   3. 发送给服务器时，服务器用预先存储的用户公钥解密如果确认是否和发送时一致即可确认用户身份
2. 用户公钥存储
   1. 远程主机将用户的公钥，保存在登录后的用户主目录的\$HOME/.ssh/authorized_keys 文件中。公钥就是一段字符串，只要把它追加在 authorized_keys 文件的末尾就行了

## [管理本机的多个 ssh 密钥](https://blog.csdn.net/agonie201218/article/details/89561961)（多个远程仓库账号）

可以使用 ssh-agent 统一对私钥代理，也可以通过 config 文件，固定不同域名使用不同私钥

当切换到其他电脑时，直接复制 ssh 文件夹，并且执行

```
chmod 600 ~/.ssh/config
```

### ssh-agent

- 使用场景：
  - 本机有多个用户需要登录不同的应用，例如公司的 gitlab 和 github 需要管理两个不一样的 ssh 密钥对，并在 clone 的时候切换用户，因为 ssh 默认使用的是 id_rsa 私钥，如果是需要切换到其他的可以用轻松切换 ssh-agent
  - 当私钥设置了密码，我们又需要频繁的使用私钥进行认证时，ssh 代理可以帮助我们免去重复的输入密码的操作。
- 使用
  - `eval $(ssh-agent)`
    - 开启 ssh-agent，输出进程 pid`Agent pid 1434`
    - `ssh-agent -k` 终止 ssh-agent 运行
    - eval `ssh-agent` 和 ssh-agent \$shell 都是同样的运行 ssh-agent 命令
  - `ssh-add 私钥路径`
  - AddKeysToAgent ->ssh config 文件配置
    - 是否自动将 key 加入到 `ssh-agent`，值可以为 no(default)/confirm/ask/yes。
    - 如果是 yes，key 和密码都将读取文件并以加入到 agent ，就像 `ssh-add`。其他分别是询问、确认、不加入的意思。添加到 ssh-agent 意味着将私钥和密码交给它管理，让它来进行身份认证。
- ssh-adds 使用
  - `ssh-add -D` 删除所有私钥
  - `ssh-add -l` 显示所有私钥列表
  - `ssh-add -L` 查看代理中的私钥对应的公钥
  - `ssh-add -d /path/of/key/key_name` 移除指定的私钥
  - `ssh-add -x` 锁定 ssh 代理,锁定时需要指定锁定密码，锁定后的 ssh 代理暂时不能帮助我们管理私钥
  - `ssh-add -X` 解锁 ssh 代理
  - `ssh-add -d /path/of/key/key_name` 移除指定的私钥

### config

ssh 程序可以从三个途径获取配置参数：

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

- SSH 客户端的 StrictHostKeyChecking 配置指令，`StrictHostKeyChecking=no`时可以实现当第一次连接服务器时自动接受新的公钥。不再有任何警告出现了。
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

### [配置 ssh-agent 登录](https://zhuanlan.zhihu.com/p/126117538)


。/俄xxxxxxxxxxxxxxxxxxxxxxxxxx40-[ssh-agent 代理转发原理参考](https://www.zsythink.net/archives/2422)

[使用参考](https://blog.csdn.net/miss1181248983/article/details/84555264?utm_medium=distribute.pc_relevant.none-task-blog-title-7&spm=1001.2101.3001.4242)

现在有 server1、server2、server3 三台机器，其中 server1 已经可以免秘钥登陆 server2 和 server3，但 server2 和 server3 之间无法通过 ssh 登陆。通过 server1 的 ssh-agent 配置可以实现 server 免秘钥登录 server3

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

-ssh -A server2 #这里 -A 不可省略，表示开启认证代理连接转发功能

## 远程执行命令

- `ssh server "cd /; ls"`
- `$ ssh example < test.sh` 远程执行本地脚本
- `ssh -t example "top"` 执行需要交互的命令

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

有的时候你可能没法直接登录到某台服务器，而需要使用一台中间服务器进行中转，如公司内网服务器。首先确保你已经为服务器配置了公钥访问，并开启了 agent forwarding，那么你需要添加如下配置到 `~/.ssh/config`：

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
