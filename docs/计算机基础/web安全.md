# web 安全

## 点击劫持(clickjacking)

原理：攻击者使用透明的 iframe 覆盖在网页上，诱使用户在点击，

1. flash 点击劫持：用过 flash 游戏，让用户完成一系列复杂的操作
2. 图片覆盖攻击 Cross Site Image Overlaying（XSIO）

防护：

- **X-Frame-Options**
  - X-Frame-Options HTTP 响应头是用来给浏览器指示允许一个页面可否在 \<frame\>, \<iframe\>或者 \<object\> 中展现的标记。网站可以使用此功能，来确保自己网站的内容没有被嵌到别人的网站中去，也从而避免了点击劫持 的攻击。

## [CSRF](https://juejin.im/post/5ce55b3d5188253386140dd0#heading-4)

CSRF(Cross Site Request Forgery)指的是跨站请求伪造

[前端安全系列（二）：如何防止 CSRF 攻击？ - 美团技术团队](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)

### 概念

攻击者诱骗受害者访问第三方网站，该网站会向被攻击网站发送跨站请求，利用受害者的已注册凭证绕过验证，冒充其执行操作。

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

根据 CSRF 的特点我们有以下防护措施

1. 校验请求来源
   1. 阻止不明请求
      1. [设置 cookies 的 sameSite 属性的值为 strict 或者 lax](https://blog.csdn.net/sinat_36521655/article/details/104844667)
         1. 这样只有同源网站的请求才会带上 cookies。
      2. 同源检测
         1. 根据 Origin 限制跨域请求
         2. 限制[referer](https://www.ruanyifeng.com/blog/2019/06/http-referer.html)：把 Referrer Policy 的策略设置成 same-origin 可通过 CSP
   2. 请求时要求附加本域才能获取的信息
      1. 验证 csrf token：服务端随机生成 token，保存在服务端 session 中，同时保存到客户端中，客户端发送请求时，把 token 带到 HTTP 请求头或参数中，服务端接收到请求，验证请求中的 token 与 session 中的是否一致。
         1. 前后端不分离：token 可以直接在编译模板的过程中写到表单的隐藏字段中，这样发送请求不需要额外的操作；
         2. 前后端分离：双重 cookie 校验
            1. token 可以在登录时写入到 cookies 中，发送请求时，js 读取 cookies 中的 token，并设置到 HTTP 请求头中。
               axios 有相关配置如下
               ![img](https://picx.zhimg.com/80/v2-7ea9e31f1d90b2eb816e93d680e6e82b_720w.webp?source=1940ef5c)
   3. 保证网络请求由真实用户发出
      - 用户操作限制（验证码）
2. 不使用 cookie，使用 token 校验用户身份，换用 token 标识用户身份，放到请求头里面

## [XSS](https://juejin.cn/post/6844903685122703367#heading-13)

Cross-site scripting，跨站脚本攻击。攻击者通过注入恶意的脚本，在用户浏览网页的时候进行攻击，进行窃取用户信息或者其他非法行为

[XSS 跨站脚本攻击 - JavaScript Guidebook](https://tsejx.github.io/javascript-guidebook/computer-networks/web-security/xss/#%E9%98%B2%E5%BE%A1%E7%AD%96%E7%95%A5)

[js-xss/README.zh.md at master · leizongmin/js-xss](https://github.com/leizongmin/js-xss/blob/master/README.zh.md)

主要经过以下两个步骤

1. 攻击者提交恶意代码。
2. 浏览器执行恶意代码。

### 分类

1. 存储型 XSS：也叫持久性 XSS。
   1. 恶意代码提交到服务端，前端再根据服务端数据渲染。
   2. **常见于评论、私信、发博客**。所有查看了该博客该评论的用户，都会执行这段恶意脚本
   3. XSS 蠕虫：具有自我传播能力的 XSS 攻击，**在恶意脚本中利用用户的登录状态进行关注、发微博、发私信等操作**，发出的微博和私信可再带上攻击 URL，诱导更多人点击，不断放大攻击范围。这种窃用受害者身份发布恶意内容，层层放大攻击范围的方式，被称为“XSS 蠕虫”。
2. 反射性 XSS：也叫非持久性 XSS
   1. 常见于 **通过 URL 传递参数** 的功能，如网站搜索、跳转等
   2. 恶意代码来自 URL 参数，前端未过滤直接渲染导致，攻击者诱导用户点击 `https://example.com/search?q=<script>alert('XSS');</script>`
3. Dom 型 XSS：`前端`取出`URL`中的恶意代码执行，通过修改页面的 dom 节点形成的 XSS，称为 dom based XSS

## 总结

- 防范 XSS 是需要后端 RD 和前端 RD 共同参与的系统工程。
  - 存储型和反射型由于代码是存储到服务端的，需要服务端做 xss 防范
  - 而 DOM 型是纯前端获取与展示，需要前端做 xss 防范
- 转义应该在输出 HTML 时进行，而不是在提交用户输入时。

1. 存储型 XSS：
2. 攻击代码通过 URL 提交给服务端
3. 纯前端展示恶意代码

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

- 避免使用.innerHTML：考虑使用.textContent 或.innerText 来设置元素的内容，它们不会解析 HTML 标签。
- 如果需要使用.innerHTML，则需要转义 HTML 内容
  - 不同的上下文，如 HTML 属性、HTML 文字内容、HTML 注释、跳转链接、内联 JavaScript 字符串、内联 CSS 样式表等，所需要的转义规则不一致。 业务 RD 需要选取合适的转义库，并针对不同的上下文调用不同的转义规则。
- 设置 cookie 的 httponly 缓解 xss，可以通过 trace 请求读取 httponly cookie。
- 避免使用 DOM 中的内联事件监听器
- 配置 CS 内容安全策略检查

## [CSP（Content Security Policy）内容安全策略检查](http://www.ruanyifeng.com/blog/2016/09/csp.html)

- "网页安全政策"， CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单

- 如果只允许加载自己域的图片，可以 加上这个 meta 标签`<meta http-equiv="Content-Security-Policy" content="img-src 'self';">`

- `Content-Security-Policy: script-src 'self'`

- `Content-Security-Policy: default-src 'self'`

- 或者后端设置这个 http 响应头，self 表示本域，如果加载其他域的图片浏览器会报错

- ![image](https://pic4.zhimg.com/v2-bf28b28cd47bbab12b052811d52a1223_b.jpg)

- `Content-Security-Policy: script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:`

  - 脚本：只信任当前域名
  - `<object>`标签：不信任任何 URL，即不加载任何资源
  - 样式表：只信任`cdn.example.org`和`third-party.org`
  - 框架（frame）：必须使用 HTTPS 协议加载
  - 其他资源：没有限制

  参考：[前端安全配置之 Content-Security-Policy(csp)](https://www.cnblogs.com/heyuqing/p/6215761.html)

## 参考

- [Node 安全指南 - 《鹅厂(腾讯)代码安全指南》 - 书栈网 · BookStack](https://www.bookstack.cn/read/Tencent-secguide/JavaScript%E5%AE%89%E5%85%A8%E6%8C%87%E5%8D%97.md)
