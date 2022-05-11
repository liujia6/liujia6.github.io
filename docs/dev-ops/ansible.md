# ansible

## Ansible 到底解决了什么问题？

使用 ansible 可以实现多个对主机执行自动化任务操作，使用 yml 配置文件

- 自动化：避免运维工作中重复的工作，以及人的不确定性问题
- 模块化：手工写 shell，甚至手工写 python，要做到模块化和标准化，太困难了。Ansible 将大部分运维工作都抽象并标准化成一个个模块（module）。
- 标准化：所有的模块的使用方式都是一样的，减少学习成本
- 幂等的. 采用声明式的描述方式，无论被执行了多少次结果都应该是我们所声明的。

## Ansible 提供两种方式去完成任务

1. ad-hoc 命令，如果我们敲入一些命令去比较快的完成一些事情,而不需要将这些执行的命令特别保存下来, 这样的命令就叫做 ad-hoc 命令.
   ->[参考链接](http://einverne.github.io/post/2020/05/ansible-introduction.html#module)
2. 写 Ansible playbook.

前者可以解决一些简单的任务, 后者解决较复杂的任务.

## host 文件

```
[${branch}]
${hostIp} ansible_connection=ssh ansible_ssh_user=${user} ansible_ssh_pass=${pass}

```

- 参数

```yml
ansible_ssh_host  #将要连接的远程主机名.与你想要设定的主机的别名不同的话,可通过此变量设置.
ansible_ssh_port  #ssh端口号.如果不是默认的端口号,通过此变量设置.
ansible_ssh_user  #默认的 ssh 用户名
ansible_ssh_pass   #ssh 密码(这种方式并不安全,我们强烈建议使用 --ask-pass 或 SSH 密钥)
ansible_sudo_pass  # sudo 密码(这种方式并不安全,我们强烈建议使用 --ask-sudo-pass)
ansible_sudo_exe (new in version 1.8) #sudo 命令路径(适用于1.8及以上版本)
ansible_connection # 与主机的连接类型.比如:local, ssh 或者 paramiko. Ansible 1.2 以前默认使用 paramiko.1.2 以后默认使用 'smart','smart' 方式会根据是否支持 ControlPersist, 来判断'ssh' 方式是否可行.
ansible_ssh_private_key_file  #ssh 使用的私钥文件.适用于有多个密钥,而你不想使用 SSH 代理的情况.
ansible_shell_type #目标系统的shell类型.默认情况下,命令的执行使用 'sh' 语法,可设置为 'csh' 或 'fish'.
```

## 编写 Playbook

运维管理就是一场表演，入口文件就是导演，它规定了演员是谁、出演什么角色、到哪表演；任务列表就是角色的剧本，每一条任务就是一句台词。

- 导演的职责：编写入口文件的内容
- 角色的职责：playbook 的具体操作逻辑都是由角色来实现的，在规范中对于角色目录下的内容都有明确定义，最常见的就是 files、tasks、templates、vars 四个文件夹，其中 tasks 就是存放剧本的位置，其他文件夹都是表演中使用的道具。

术语解释

- Hosts 执行的远程主机列表
- files： 存放文件，这里的文件不经过任何变化直接复制到被控主机。通常 files 目录用来存放程序的安装包文件，由 copy 模块操作。
- tasks：yml 格式定义任务列表，playbook 执行后会按入口文件定义的顺序依次执行角色文件夹内 main.yml 文件。
- templates：文件夹内存放模板文件，模板文件以 JinJa2 格式编写的，执行时会将相应变量替换成真正内容后，再复制到被控主机。通常 templates 目录用来存放软件的配置文件、辅助文件，对需要动态调整的内容以参数替换形成模板，由 template 模块操作。
- vars：文件夹内存放以 yml 格式定义参数文件，playbook 查找参数时会默认搜索 vars 目录下 main.yml 文件。
- Handlers 和 notity 结合使用: 作为触发条件
- tags 标签，指定某条任务执行，用于选择运行 playbook 中的部分代码。

roles 标准目录

```yml
├── defaults
│   └── main.yml
├── files
│   └── nginx.tar.gz
├── handlers  # 被动触发的任务
│   └── main.yml
├── tasks     # 被动的执行任务
│   ├── config.yml
│   └── main.yml
└── templates   # 存放不同的配置文件
    └── nginx.conf
```

### options

```
// 参数-e传入变量，这样传入的变量在整个playbook中都可以被调用，属于全局变量
ansible-playbook ansible.yaml -e "HOST=${HOST}" -i ./hosts
```

    playbook命令的详细语法如下：
        ansible-playbook [options] playbook.yml [playbook2 ...]
        -u REMOTE_USER, --user=REMOTE_USER ＃ ssh 连接的用户名
        -k, --ask-pass ＃ssh登录认证密码
        -s, --sudo ＃sudo 到root用户，相当于Linux系统下的sudo命令
        -U SUDO_USER, --sudo-user=SUDO_USER ＃sudo 到对应的用户
        -K, --ask-sudo-pass ＃用户的密码（—sudo时使用）
        -T TIMEOUT, --timeout=TIMEOUT ＃ ssh 连接超时，默认 10 秒
        -C, --check ＃ 指定该参数后，执行 playbook 文件不会真正去执行，而是模拟执行一遍，然后输出本次执行会对远程主机造成的修改
        -e EXTRA_VARS, --extra-vars=EXTRA_VARS ＃ 设置额外的变量如：key=value 形式 或者 YAML or JSON，以空格分隔变量，或用多个-e -f FORKS, --forks=FORKS ＃ 进程并发处理，默认 5
        -i INVENTORY, --inventory-file=INVENTORY ＃ 指定 hosts 文件路径，默认 default=/etc/ansible/hosts
        -l SUBSET, --limit=SUBSET ＃ 指定一个 pattern，对- hosts:匹配到的主机再过滤一次 --list-hosts ＃ 只打印有哪些主机会执行这个 playbook 文件，不是实际执行该 playbook --list-tasks ＃ 列出该 playbook 中会被执行的 task --private-key=PRIVATE_KEY_FILE ＃ 私钥路径 --step ＃ 同一时间只执行一个 task，每个 task 执行前都会提示确认一遍 --syntax-check ＃ 只检测 playbook 文件语法是否有问题，不会执行该 playbook
        -t TAGS, --tags=TAGS ＃当 play 和 task 的 tag 为该参数指定的值时才执行，多个 tag 以逗号分隔 --skip-tags=SKIP_TAGS ＃ 当 play 和 task 的 tag 不匹配该参数指定的值时，才执行
        -v, --verbose ＃输出更详细的执行过程信息，-vvv可得到所有执行过程信息。

### 示例

ansible 配合 gitlab-ci 实现推服务器示例

```yml
script:
  - echo \"${HOST}\" ansible_ssh_user=${USER} ansible_ssh_pass=${PASS} ansible_ssh_host=${HOST} > hosts
  - echo ansible-playbook ansible.yaml -e hosts=${HOST} -i ./hosts
  - ansible-playbook ansible.yaml -e "HOST=${HOST}  DEST_PATH=${ROOT_PATH}/${MICROAPP_NAME} ROOT_PATH=${ROOT_PATH} FILE_NAME=${FILE_NAME}" -i ./hosts
  - rm -f hosts
```

```yml
# cat user.yml
- name: create user
  hosts: all
  user: root
  sudo_yes:yes
  gather_facts: false #gather_facts参数指定了在以下任务部分执行前，是否先执行setup模块获取主机相关信息，这在后面的task会使用到setup获取的信息时用到；
  vars:
  - user: "test"
  tasks:
  - name: create  user
    user: name="{{ user }}"
```

## Ansible 常用模块

### shell 模块

| 参数       | 解释                                                         |     |
| ---------- | ------------------------------------------------------------ | --- |
| chdir      | 运行 command 命令前先 cd 到这个目录                          |     |
| creates    | 如果这个参数对应的文件存在，就不运行 command                 |     |
| executable | 将 shell 切换为 command 执行，这里的所有命令需要使用绝对路径 |     |
| removes    | 如果这个参数对应的文件**不存在**，就**不运行 command**       |     |

### file [模块](https://hoxis.github.io/ansible-files-modules-file.html)

设置文件夹的权限是非常常见的操作，所以就有了 file 任务。

```yml
- name: 'ensure folder /app/nginx is created'
  file:
    path: '/app/nginx'
    owner: 'nginx' #owner：指定文件的所属用户。
    group: 'nginx' # group：指定文件的所属用户组。
    mode: '0700'
    state: 'directory'
```

- state 属性的值可以为：
  - absent：不存在。可以理解为删除该文件或文件夹。
  - directory：文件夹。如果该文件夹不存在，则创建。
  - file：文件。如果不存在，则创建。
  - touch：与 linux 的 touch 实现相同的效果。

### Service

在服务安装完成后，最常用的操作就是启动服务了。同时，它会根据不同的操作决定使用何种 service 实现。支持：BSD init, OpenRC, SysV, Solaris SMF, systemd, upstart。这就是封装的强大。用户只需要描述他的期望，剩下的机器能解决的，都由机器解决。

```yml
- name: ensure svn service started
  service:
    name: svnserver
    state: started
    enabled: true
```

enabled 属性值为 true 代表开机自动启动。state 属性值可以为：

- reloaded：服务是被重新加载过的。
- restarted：服务是被重启过的。
- started：服务是启动的。
- stopped：服务是停止的。

示例：

```yml
- name: deploy
  hosts: '{{ HOST }}'
  tasks:
    - name: delete dir
      file:
        path: '{{ DEST_PATH }}'
        state: absent
    - name: unarchive file
      unarchive:
        src: '{{ FILE_NAME }}'
        dest: '{{ ROOT_PATH }}'
```

### unarchive 模块

| copy       | no  | yes | yes/no | 在解压文件之前，是否先将文件复制到远程主机，默认为 yes。若为 no，则要求目标主机上压缩包必须存在。 |
| ---------- | --- | --- | ------ | ------------------------------------------------------------------------------------------------- |
| creates    | yes |     |        | 指定一个文件名，当该文件存在时，则解压指令不执行                                                  |
| dest       | yes |     |        | 远程主机上的一个路径，即文件解压的路径                                                            |
| grop       | no  |     |        | 解压后的目录或文件的属组                                                                          |
| list_files | no  | no  | yes/no | 如果为 yes，则会列出压缩包里的文件，默认为 no，2.0 版本新增的选项                                 |
| mode       | no  |     |        | 解压后文件的权限                                                                                  |
| src        | no  |     |        | 如果 copy 为 yes，则需要指定压缩文件的源路径                                                      |
| owner      | no  |     |        | 解压后文件或目录的属主                                                                            |

### Yum 模块

| **参数名**        | **是否必须** | **默认值** | **选项值**            | **参数说明**                                                                   |
| ----------------- | ------------ | ---------- | --------------------- | ------------------------------------------------------------------------------ |
| conf_file         | no           |            |                       | 设定远程 yum 执行时所依赖的 yum 配置文件                                       |
| disable_gpg_check | no           | no         | yes/no                | 在安装包前检查包，只会影响 state 参数为*present*或者*latest*的时候             |
| list              | no           |            |                       | 只能由 ansible 调用，不支持 playbook，这个干啥的大家都懂                       |
| name              | yes          |            |                       | 你需要安装的包的名字，也能如此使用*name=python=2.7*安装 python2.7              |
| state             | no           | present    | present/latest/absent | 用于描述安装包最终状态，*present/latest*用于安装包，*absent*用于 remove 安装包 |
| update_cache      | no           | no         | yes/no                | 用于安装包前执行更新 list,只会影响 state 参数为*present/latest*的时候          |

**ping 模块**

ping 模块尝尝用于检测网络是否通畅

```bash
ansible -i hosts all -m ping
```

### 其他模块

- [Ansible 命令相关模块之 command, shell, raw 模块](https://hoxis.github.io/ansible-commands-modules-command-shell-raw.html)

- [Ansible 命令相关模块之 expect, script, telnet 模块](https://hoxis.github.io/ansible-commands-modules-others.html)

- [Ansible 常用文件操作模块之 copy 模块](https://hoxis.github.io/ansible-files-modules-copy.html)

- [Ansible 常用文件操作模块之 file 模块](https://hoxis.github.io/ansible-files-modules-file.html)

- [Ansible 常用文件操作模块之 template 模块](https://hoxis.github.io/ansible-files-modules-template.html)

- [Ansible 常用系统模块之 service/systemd/ping 模块](https://hoxis.github.io/ansible-system-modules.html)

- user 模块：管理用户（创建用户的时候，这边有个提醒：是密码方面，可以使用加密）

- fetch 模块：从远程主机拉取文件到管理主机（和 copy 的功能相反），但是只能拉取单个文件（多个文件的话可以打包拉取）

- yum 软件包管理模块：（状态默认为 present、也就是 install）

- setup 模块（同样无参数，输出主机的信息，信息较多，这里就不写了，只写命令）

- cron 模块：定时任务模块

- script：本地脚本复制到远程主机执行

* 条件判断

```yml
name: Ensure nginx exists
  command: /sbin/shutdown -t now  # 执行命令的子任务类型。
  yum:
    name: nginx
    state: present
  when: ansible_os_family == "CentOS"  #只有 ansible_os_family == "CentOS" 为 true 时才执行该子任务。
  # when: ansible_distribution == "CentOS" and ansible_distribution_major_version == "6"  # 表示与的关系
  # when: ansible_distribution == "CentOS"  or ansible_distribution == "Debian" )  或的关系
```

### 循环遍历

```yml
- name: Ensure soft exists
  yum:
    name: '{{ item }}'
    state: present
  when: ansible_os_family == "CentOS"
  with_items:
    - gcc
    - gcc-c++
```

## 参考

[ansible-examples](https://github.com/ansible/ansible-examples)

[ Ansible 中文权威指南](https://ansible-tran.readthedocs.io/en/latest/index.html#)

[这样理解 Ansible 更容易](https://showme.codes/2019-09-19/understand-ansible/)

[Ansible 介绍及使用](http://einverne.github.io/post/2020/05/ansible-introduction.html#module)

[常见操作模块参考](https://zhuanlan.zhihu.com/p/162698360)

[ansible 从零开始快速上手](https://blog.csdn.net/chuanxincui/article/details/82864405)
