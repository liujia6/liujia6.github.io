# nginx

Nginx 的最重要的几个使用场景：

1. 静态资源服务，通过本地文件系统提供服务；
2. 反向代理服务，延伸出包括缓存、负载均衡等；
3. API 服务，OpenResty ；

### 动静分离

![动静分离](https://cdn.jsdelivr.net/gh/SHERlocked93/pic@env/uPic/2020-03-09-%E5%8A%A8%E9%9D%99%E5%88%86%E7%A6%BB.png)

Nginx 的高并发和静态资源缓存等特性，经常将静态资源部署在 Nginx 上。

如果请求的是静态资源，直接到静态资源目录获取资源，

如果是动态资源的请求，则利用反向代理的原理，把请求转发给对应后台应用去处理，从而实现动静分离。

## [location 匹配](https://juejin.cn/post/6844903849166110733#heading-2)

### 匹配优先级

1. 精确匹配 =
1. 前缀匹配 ^~（立刻停止后续的正则搜索）
1. 按文件中顺序的正则匹配 ~或~\*
1. 匹配不带任何修饰的前缀匹配。
1. 正则匹配是使用文件中的顺序，找到返回

| 符号      | 含义                                                                            |
| --------- | ------------------------------------------------------------------------------- |
| ~         | 区分大小写的正则匹配                                                            |
| ~\*       | 不区分大小写的正则匹配                                                          |
| ^~        | 前缀匹配，不匹配正则，优先正则匹配                                              |
| /document | 普通前缀匹配，前缀匹配下，返回最长匹配的 location，与 location 所在位置顺序无关 |

## [server 指令块与虚拟主机](https://segmentfault.com/a/1190000021771733)

虚拟主机是一种在单一主机或主机群上运行多个网站或服务的技术，可以用来解决 IP 地址资源有限而网站数目日益增多的问题。实现方式主要有以下三种:

- 基于域名(Name-based)
- 基于 IP 地址(IP-based)
- 基于 Port 端口(Port-based)

HTTP 请求通过 HOST 请求头指定我们要访问的域名，在 HTTP1.0 不支持，1.1 中请求必须带上 Host 请求头，否则服务器必须返回 400 相应，nginx 通过 server 指令配置虚拟主机

### servername 服务器配置专属开发环境

在服务器上开发时，可以通过 servername 定制自己的域名以及 root 前端打包后的资源，然后再本地配置该域名 host 到该服务器上，则可以访问了

nginx配置
```nginx
server {
  server_name $yourCustomServerName
  root $yourResourcePath
}
```
host文件
```
$serverIp $yourCustomServerName
```

## [history 模式的前端页面访问 404 问题解决](https://github.com/febobo/web-interview/issues/31)
