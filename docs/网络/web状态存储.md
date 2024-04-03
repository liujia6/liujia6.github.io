
## cookie 和 localstorage 区别

```
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date> Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit> Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value> Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value> Set-Cookie: <cookie-name>=<cookie-value>; Secure Set-Cookie: <cookie-name>=<cookie-value>;
```

HttpOnly 如果服务器想改变一个早先设置的 Cookie，必须同时满足四个条件：Cookie 的 key、domain、path 和 secure 都匹配。举例来说，如果原始的 Cookie 是用如下的 Set-Cookie 设置的。

Set-Cookie: key1=value1; domain=example.com; path=/blog

改变上面这个 Cookie 的值，就必须使用同样的 Set-Cookie。

Set-Cookie: key1=value2; domain=example.com; path=/blog

只要有一个属性不同，就会生成一个全新的 Cookie，而不是替换掉原来那个 Cookie。

服务器收到浏览器发来的 Cookie 时，有两点是无法知道的。

- Cookie 的各种属性，比如何时过期。
- 哪个域名设置的 Cookie，到底是一级域名设的，还是某一个二级域名设的。

浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享 Cookie（参见《同源政策》一章）。注意，这里不要求协议相同。也就是说，http://example.com设置的 Cookie，可以被https://example.com读取。

## session 和 token 区别

- 是 session 是**后端保存**，会增加**服务端**查询，保存数据的**压力**，而且容易有**CSRF**跨站伪造请求攻击，因为 sessionID 是存在 cookie 中的， cookie 如果被截获，用户就会很容易受到跨站请求伪造的攻击。

- token 是前端保存，比较灵活，可以实现单点登录而不受后端的限制；但是缺点也是不受后端控制，签发后不能撤销，只能通过建立黑名单再存储到数据库中

- session 需要考虑分布式部署下 redis 数据库保存数据

## 密码安全

1. 从信息安全的角度上不允许存储明文密码
2. 加密方式
3. HAMC 加盐的方式

### JWT

JWT 的最佳用途是「**一次性授权 Token**」，这种场景下的 Token 的特性如下：
有效期短，只希望被使用一次。
例如分享一个文件给朋友，在指定 1 小时打开有效。

尽管这看上去像 cross-site scripting 攻击，结果并不会导致什么。HTML 5 中指定不执行由 innerHTML 插入的\<script\>标签。

#### 过程

1、第一次登录的时候，前端调后端的登陆接口，发送用户名和密码
2、后端收到请求，验证用户名和密码，验证成功，就给前端返回一个 token
3、前端拿到 token，将 token 存储到 localStorage 和 vuex 中，并跳转路由页面（本项目根据是否记住密码来判断 token 存储到 sessionStorage 或 localStorage ）
4、前端每次跳转路由，就判断 localStroage 中有无 token ，没有就跳转到登录页面，有则跳转到对应路由页面
5、每次调后端接口，都要在请求头中加 token
6、后端判断请求头中有无 token，有 token，就拿到 token 并验证 token，验证成功就返回数据，验证失败（例如：token 过期）就返回 401，请求头中没有 token 也返回 401
7、如果前端拿到状态码为 401，就清除 token 信息并跳转到登录页面

### WebStorage

**生命周期**：sessionStorage 在关闭页面后即被清空，而 localStorage 则会一直保存。

cookie 机制：如果不在浏览器中设置过期时间，cookie 被保存在内存中，生命周期随浏览器的关闭而结束，这种 cookie 简称会话 cookie。如果在浏览器中设置了 cookie 的过期时间，cookie 被保存在硬盘中，关闭浏览器后，cookie 数据仍然存在，直到过期时间结束才消失。

**安全性**：WebStorage 不会随着 HTTP header 发送到服务器端，所以安全性相对于 cookie 来说比较高一些，不会担心截获，但是仍然存在伪造问题；

HTML5 的本地存储 API 中的 localStorage 与 sessionStorage 在使用方法上是相同的，区别在于

Cookie 是服务器发给客户端的特殊信息，cookie 是以文本的方式保存在客户端，每次请求时都带上它

**存储内容**：cookie 只能保存字符串类型，以文本的方式；session 通过类似与 Hashtable 的数据结构来保存，能支持任何类型的对象(session 中可含有多个对象)

**存储容量：cookie**为 4kb，localStorage 和 sessionStorage 的存储数据大小一般都是：5MB，

有些网站测试出来的不是整整的 5242880 （ 5120x1024 ），而是 5101k 之类的，我猜测应该是没把 key 算上，上面这个测试页面统计包含 key 的长度，所以很整齐，刚好 5120\*1024，由此可知 key 也是算容量的 localstorage 的容量每个浏览器都不一样，都是在 5MB 左右，关于单位问题，单位是字符，可以是中文或英文字母，一个中文等同一个英文字母。所以有些地方说是容量是 10M，也不能算错。因为 js 用 utf-16，所以中文英文一个字符都是是 2 个字节，10M 指的是字节数。

**存储位置**：localStorage 和 sessionStorage 都保存在客户端，不与服务器进行交互通信，节省了网络流量，而且显示更快。而 cookie 每次访问都要传送 cookie 给服务器





其他请求头：

origin：跨域的判断

referer：防盗链

