# Gitlab-ci踩坑

## 问题一：**yarn的时候报错**

解决方案：yarn之前配yarn源，添加  yarn config set registry ${url}

## 问题二：**permission denied**

一开始是以为是密码错误，密码变量带有特殊字符，修改为用单引号包裹后还是报错。以上两个错误交替出现，最后用sudo：yes解决了，**删除文件需要较高的权限**

解决：在ansible的task上加上sudo: yes解决权限问题

![image-20210106215244122.png](https://i.loli.net/2021/01/06/xvVL45wmRJ9CQTS.png)

![image-20210106215244122](https://i.loli.net/2021/01/06/xvVL45wmRJ9CQTS.png)

## 问题三：配置ssh用户权限

北京：需要克隆子模块，而子模块的url是ssh地址，需要配置用户ssh才能clone仓库，采用以下配置ssh用户权限

node镜像低也会导致某些错误

```
image: ${image}
script:
    - mkdir -p  ~/.ssh
    - chmod 700 ~/.ssh
    - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'  #设ssh配置:每次连接一个新主机不做确认和警告
    - eval $(ssh-agent -s)  # 启动ssh-agent
    - ssh-add < (echo "$PRIVATE_SSH_KEY") # 添加私钥到ssh-agent代理
```

## 问题四：stage之间文件传递

每个stage是独立的，当前stage生成的文件会立即执行完后会立即删除，那下个stage要如何拿到上个stage的文件呢

- 此处有cache和atifactory两种方案对比，两者都可以传递，但是cache不是可靠的，只是作为优化的一种方案，不能确保两个stage之间一定能传递文件
- 不宜传递太大的文件，而且传递的文件太大例如node_modules,会报错
- artifacts可以在gitlab的对应pipeline上直接点击下载，可以设置制品的过期时间![image-20210106215244122](https://i.loli.net/2021/01/06/xvVL45wmRJ9CQTS.png)

## 问题五：prepare failed

解决：

指定tags为k8s，不指定会报错

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

## 问题六：不能用环境变量指定artifacts：path

解决：使用通配符

```
artifacts:
  - paths:   
  - "*.zip"
```

##  问题七： ssh执行命令，显示command not find

- 问题：在ssh登录或者ansible登录执行命令报错显示command not find

- 原因 ： ssh登录少了环境变量

- **首先了解一下login shell 与 non-login shell**

  /etc/profile及/etc/bashrc的区别：
   **login shell**：取得bash时需要完整的登入流程的，就称为login shell。举例来说，你要由tty1~tty6登入，需要输入用户的账号和密码，此时取得的bash就称为『login shell』啰；
   **non-login shell**：取得bash接口的方法不需要重复登入的举动，举例来说，(1)你以Xwindow登入Linux后，再以X的图形化接口启动终端机，此时那个终端接口并没有需要再次的输入账号和密码，那个bash的环境就称为non-login shell了。(2)你在原本的bash环境下再次下达bash这个命令，同样的也没有输入账号密码，那第二个bash (子程序)也是non-login shell 。

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

[关于ansible远程执行的环境变量问题（login shell & nonlogin shelll）](https://blog.csdn.net/u010871982/article/details/78525367)

[远程执行命令的填坑记录](https://zhuanlan.zhihu.com/p/60914157)