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

[前端安全系列（二）：如何防止CSRF攻击？ - 美团技术团队](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)

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

根据CSRF的特点我们有以下防护措施

1. 校验请求来源
   1. 阻止不明请求
      1. [设置cookies的sameSite属性的值为strict或者lax](https://blog.csdn.net/sinat_36521655/article/details/104844667)
         1. 这样只有同源网站的请求才会带上cookies。
      2. 同源检测
         1. 根据Origin限制跨域请求
         2. 限制[referer](https://www.ruanyifeng.com/blog/2019/06/http-referer.html)：把Referrer Policy的策略设置成same-origin 可通过CSP
   2. 请求时要求附加本域才能获取的信息
      1. 验证csrf token：服务端随机生成token，保存在服务端session中，同时保存到客户端中，客户端发送请求时，把token带到HTTP请求头或参数中，服务端接收到请求，验证请求中的token与session中的是否一致。
         1. 前后端不分离：token可以直接在编译模板的过程中写到表单的隐藏字段中，这样发送请求不需要额外的操作；
         2. 前后端分离：双重cookie校验
            1. token可以在登录时写入到cookies中，发送请求时，js读取cookies中的token，并设置到HTTP请求头中。
               axios有相关配置如下
               ![img](https://picx.zhimg.com/80/v2-7ea9e31f1d90b2eb816e93d680e6e82b_720w.webp?source=1940ef5c)
   3. 保证网络请求由真实用户发出
      - 用户操作限制（验证码）
2. 不使用cookie，使用token校验用户身份，换用token标识用户身份，放到请求头里面

## [XSS](https://juejin.cn/post/6844903685122703367#heading-13)

Cross-site scripting，跨站脚本攻击。HTMl 注入插入恶意脚本，篡改网页，在用户浏览网页时，控制用户浏览器的一种攻击

[XSS 跨站脚本攻击 - JavaScript Guidebook](https://tsejx.github.io/javascript-guidebook/computer-networks/web-security/xss/#%E9%98%B2%E5%BE%A1%E7%AD%96%E7%95%A5)

[js-xss/README.zh.md at master · leizongmin/js-xss](https://github.com/leizongmin/js-xss/blob/master/README.zh.md)

主要经过以下两个步骤

1. 攻击者提交恶意代码。
2. 浏览器执行恶意代码。

### 分类

1. 存储型 XSS：也叫持久性 XSS，恶意代码提交到`服务器端`中，`服务端`拼接 html 返回，再在前端解析执行。
   1. **常见于评论、私信、发博客**。所有查看了该博客该评论的用户，都会执行这段恶意脚本
   2. XSS 蠕虫：**在恶意脚本中利用用户的登录状态进行关注、发微博、发私信等操作**，发出的微博和私信可再带上攻击 URL，诱导更多人点击，不断放大攻击范围。这种窃用受害者身份发布恶意内容，层层放大攻击范围的方式，被称为“XSS 蠕虫”。
2. 反射性XSS：也叫非持久性 XSS，输入恶意代码，通过`URL`提交执行，`服务端`取出恶意代码，拼接在 html 时返回，浏览器请求再执行恶意代码。
   1. 出现于前后端未分离的项目，后端控制前端渲染的情况下才会出现，如果是前后端分离的情况则属于DOM型XSS
   1. 常见于 **通过 URL 传递参数** 的功能，如网站搜索、跳转等
3. Dom 型 XSS：`前端`取出`URL`中的恶意代码执行，通过修改页面的 dom 节点形成的 XSS，称为 dom based XSS
   - 

## 总结

- 防范 XSS 是需要后端 RD 和前端 RD 共同参与的系统工程。
  - 存储型和反射型由于代码是存储到服务端的，需要服务端做xss防范
  - 而DOM型是纯前端获取与展示，需要前端做xss防范
- 转义应该在输出 HTML 时进行，而不是在提交用户输入时。

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

- 输入过滤（输入侧过滤能够在某些情况下解决特定的 XSS 问题，但会引入很大的不确定性和乱码问题。在防范 XSS 攻击时应避免此类方法。）
  - 输入侧过滤能够在某些情况下解决特定的 XSS 问题，但会引入很大的不确定性和乱码问题。在防范 XSS 攻击时应避免此类方法。 当然，对于明确的输入类型，例如数字、URL、电话号码、邮件地址等等内容，进行输入过滤还是必要的
- 转义 HTML
  - 不同的上下文，如 HTML 属性、HTML 文字内容、HTML 注释、跳转链接、内联 JavaScript 字符串、内联 CSS 样式表等，所需要的转义规则不一致。 业务 RD 需要选取合适的转义库，并针对不同的上下文调用不同的转义规则。
- 设置 cookie的httponly 缓解 xss，可以通过 trace 请求读取 httponly cookie 
- 预防 DOM 型 XSS 攻击：避免使用 DOM 中的内联事件监听器，
- 使用 CSP

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
