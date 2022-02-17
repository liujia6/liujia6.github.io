# HTTP

- 定义
- 超文本是用超链接的方法，将各种不同空间的文字信息组织在一起的网状文本

## HTTP/0.9
- 只支持get请求，响应为html文档格式的字符串
## HTTP/1.0
- 支持get、post、head
- 包含基本的头信息、状态码等
- 支持各种数据类型

头信息必须是 ASCII 码，后面的数据可以是任何格式

**缺点：**
1. 一个请求发送一个请求，之后连接就关闭。
2. connection：keep-alive的设置不是标准字段，不同浏览器的实现不一致

## HTTP/1.1
- tcp连接默认不关闭
    - 可以被多个请求复用，不用声明connection：keep-alive，
    - 客户端发现对方一段时间没有活动自动关闭connection：close。规范的做法是在最后一个请求发送connection：close
    - 同一个域名，一般允许同时建立**6**个持久连接
- 管道机制
    - 在一个tcp连接里，客户端可以同时发送多个请求，不用等前面的收到回应再发送
    -  content-length字段声明本次回应的数据长度，区分数据包
- 分块传输编码
   - transfer-encoding：chunked表示回应将由数量未定的数据块组成，取代content-length
   - 数据之前，16进制数值表示块长度，最后大小为0的块表明本次传输完成
- 新的方法例如put、patch、head、options、delete
- host头域：将请求发往同一台服务器上的不同网站

**缺点**
- 一个tcp连接的通信的服务器回应是按照次序进行的，要是有一个回应特别慢，会发生队头阻塞。

## HTTP/2:基于SPDY协议

- 二进制分帧
    - HTTP/1.1 版的头信息肯定是文本（ASCII编码），数据体可以是文本，也可以是二进制。HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为"帧"（frame）：头信息帧和数据帧。
- 多路复用
    - 客户端和服务端可以同时发送数据，不管顺序
- 服务端推送
- 头部压缩
    - 头信息使用gzip或compress压缩后再发送；另一方面，客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就提高速度了。

参考：

- [HTTP 协议入门](http://www.ruanyifeng.com/blog/2016/08/http.html)
- [理解HTTP协议](https://www.cnblogs.com/wxisme/p/6212797.html)

## cookie和localstorage区别

```
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date> Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit> Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value> Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value> Set-Cookie: <cookie-name>=<cookie-value>; Secure Set-Cookie: <cookie-name>=<cookie-value>; 
```

HttpOnly如果服务器想改变一个早先设置的 Cookie，必须同时满足四个条件：Cookie 的key、domain、path和secure都匹配。举例来说，如果原始的 Cookie 是用如下的Set-Cookie设置的。

Set-Cookie: key1=value1; domain=example.com; path=/blog

改变上面这个 Cookie 的值，就必须使用同样的Set-Cookie。

Set-Cookie: key1=value2; domain=example.com; path=/blog

只要有一个属性不同，就会生成一个全新的 Cookie，而不是替换掉原来那个 Cookie。

服务器收到浏览器发来的 Cookie 时，有两点是无法知道的。

- Cookie 的各种属性，比如何时过期。
- 哪个域名设置的 Cookie，到底是一级域名设的，还是某一个二级域名设的。

浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享 Cookie（参见《同源政策》一章）。注意，这里不要求协议相同。也就是说，http://example.com设置的 Cookie，可以被https://example.com读取。

## session和token区别

- 是session是**后端保存**，会增加**服务端**查询，保存数据的**压力**，而且容易有**CSRF**跨站伪造请求攻击，因为sessionID是存在cookie中的， cookie如果被截获，用户就会很容易受到跨站请求伪造的攻击。

- token是前端保存，比较灵活，可以实现单点登录而不受后端的限制；但是缺点也是不受后端控制，签发后不能撤销，只能通过建立黑名单再存储到数据库中

- session需要考虑分布式部署下redis数据库保存数据


## 密码安全

1. 从信息安全的角度上不允许存储明文密码
2. 加密方式
  3. HAMC加盐的方式

### JWT

JWT 的最佳用途是「**一次性授权 Token**」，这种场景下的 Token 的特性如下：
有效期短，只希望被使用一次。
例如分享一个文件给朋友，在指定1小时打开有效。

尽管这看上去像cross-site scripting攻击，结果并不会导致什么。HTML 5 中指定不执行由innerHTML 插入的\<script\>标签。

#### 过程

1、第一次登录的时候，前端调后端的登陆接口，发送用户名和密码
2、后端收到请求，验证用户名和密码，验证成功，就给前端返回一个token
3、前端拿到token，将token存储到localStorage和vuex中，并跳转路由页面（本项目根据是否记住密码来判断token存储到sessionStorage或 localStorage ）
4、前端每次跳转路由，就判断 localStroage 中有无 token ，没有就跳转到登录页面，有则跳转到对应路由页面
5、每次调后端接口，都要在请求头中加token
6、后端判断请求头中有无token，有token，就拿到token并验证token，验证成功就返回数据，验证失败（例如：token过期）就返回401，请求头中没有token也返回401
7、如果前端拿到状态码为401，就清除token信息并跳转到登录页面



### WebStorage

**生命周期**：sessionStorage 在关闭页面后即被清空，而 localStorage 则会一直保存。

cookie机制：如果不在浏览器中设置过期时间，cookie被保存在内存中，生命周期随浏览器的关闭而结束，这种cookie简称会话cookie。如果在浏览器中设置了cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，cookie数据仍然存在，直到过期时间结束才消失。

**安全性**：WebStorage不会随着HTTP header发送到服务器端，所以安全性相对于cookie来说比较高一些，不会担心截获，但是仍然存在伪造问题；

HTML5 的本地存储 API 中的 localStorage 与 sessionStorage 在使用方法上是相同的，区别在于 

   Cookie是服务器发给客户端的特殊信息，cookie是以文本的方式保存在客户端，每次请求时都带上它

**存储内容**：cookie只能保存字符串类型，以文本的方式；session通过类似与Hashtable的数据结构来保存，能支持任何类型的对象(session中可含有多个对象)

**存储容量：cookie**为4kb，localStorage和sessionStorage的存储数据大小一般都是：5MB，

有些网站测试出来的不是整整的 5242880 （ 5120x1024 ），而是 5101k 之类的，我猜测应该是没把 key 算上，上面这个测试页面统计包含 key 的长度，所以很整齐，刚好 5120*1024，由此可知 key 也是算容量的localstorage的容量每个浏览器都不一样，都是在5MB左右，关于单位问题，单位是字符，可以是中文或英文字母，一个中文等同一个英文字母。所以有些地方说是容量是 10M，也不能算错。因为 js 用 utf-16，所以中文英文一个字符都是是 2 个字节，10M 指的是字节数。

**存储位置**：localStorage和sessionStorage都保存在客户端，不与服务器进行交互通信，节省了网络流量，而且显示更快。而cookie每次访问都要传送cookie给服务器
