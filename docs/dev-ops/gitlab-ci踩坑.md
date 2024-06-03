# Gitlab-ci 踩坑

## 问题一：**yarn 的时候报错**

解决方案：yarn 之前配 yarn 源，添加 yarn config set registry \${url}

## 问题二：**permission denied**

一开始是以为是密码错误，密码变量带有特殊字符，修改为用单引号包裹后还是报错。以上两个错误交替出现，最后用 sudo：yes 解决了，**删除文件需要较高的权限**

解决：在 ansible 的 task 上加上 sudo: yes 解决权限问题

![image-20210106215244122.png](https://i.loli.net/2021/01/06/xvVL45wmRJ9CQTS.png)

![image-20210106215244122](https://i.loli.net/2021/01/06/xvVL45wmRJ9CQTS.png)

## 问题三：配置 ssh 用户权限

北京：需要克隆子模块，而子模块的 url 是 ssh 地址，需要配置用户 ssh 才能 clone 仓库，采用以下配置 ssh 用户权限

node 镜像低也会导致某些错误

```
image: ${image}
script:
    - mkdir -p  ~/.ssh
    - chmod 700 ~/.ssh
    - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'  #设ssh配置:每次连接一个新主机不做确认和警告
    - eval $(ssh-agent -s)  # 启动ssh-agent
    - ssh-add < (echo "$PRIVATE_SSH_KEY") # 添加私钥到ssh-agent代理
```

## 问题四：stage 之间文件传递

每个 stage 是独立的，当前 stage 生成的文件会立即执行完后会立即删除，那下个 stage 要如何拿到上个 stage 的文件呢

- 此处有 cache 和 atifactory 两种方案对比，两者都可以传递，但是 cache 不是可靠的，只是作为优化的一种方案，不能确保两个 stage 之间一定能传递文件
- 不宜传递太大的文件，而且传递的文件太大例如 node_modules,会报错
- artifacts 可以在 gitlab 的对应 pipeline 上直接点击下载，可以设置制品的过期时间![image-20210106215244122](https://i.loli.net/2021/01/06/xvVL45wmRJ9CQTS.png)

## 问题五：prepare failed

解决：

指定 tags 为 k8s，不指定会报错

```
test1:
 stage: test1
 image: ${image}
 script:
 - mkdir dist
 - cd dist && touch markdown.md && cd -
 tags:
 - k8s
```

## 问题六：不能用环境变量指定 artifacts：path

解决：使用通配符

```
artifacts:
  - paths:
  - "*.zip"
```

## 问题七： ssh 执行命令，显示 command not find

- 问题：在 ssh 登录或者 ansible 登录执行命令报错显示 command not find
- 原因 ： ssh 登录少了环境变量
- **首先了解一下 login shell 与 non-login shell**

  /etc/profile 及/etc/bashrc 的区别：
  **login shell**：取得 bash 时需要完整的登入流程的，就称为 login shell。举例来说，你要由 tty1~tty6 登入，需要输入用户的账号和密码，此时取得的 bash 就称为『login shell』啰；
  **non-login shell**：取得 bash 接口的方法不需要重复登入的举动，举例来说，(1)你以 Xwindow 登入 Linux 后，再以 X 的图形化接口启动终端机，此时那个终端接口并没有需要再次的输入账号和密码，那个 bash 的环境就称为 non-login shell 了。(2)你在原本的 bash 环境下再次下达 bash 这个命令，同样的也没有输入账号密码，那第二个 bash (子程序)也是 non-login shell 。

```yaml
- mkdir ~/.ssh -p
- chmod 700 ~/.ssh
- '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'
- eval $(ssh-agent -s)
- echo "$PRIVATE_SSH_KEY"
- ssh-add <(echo "$PRIVATE_SSH_KEY")
- ssh -T ${USER}@${HOST} "source ~/.bash_profile; cd ${path} && yarn release"
```

[测试好的脚本放到](https://www.yuque.com/plantegg/weyi1s/mysyy3#342wyn) crontab 里就报错: 找不到命令

[关于 ansible 远程执行的环境变量问题（login shell &amp; nonlogin shelll）](https://blog.csdn.net/u010871982/article/details/78525367)

[远程执行命令的填坑记录](https://zhuanlan.zhihu.com/p/60914157)
