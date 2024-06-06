import{_ as e,c as l,o as n,a}from"./app-BsmYACjM.js";const r={},i=a('<h1 id="oauth2-0与微信登陆" tabindex="-1"><a class="header-anchor" href="#oauth2-0与微信登陆"><span>OAuth2.0与微信登陆</span></a></h1><ul><li><p><a href="https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html" target="_blank" rel="noopener noreferrer">OAuth</a>2.0 是一种授权机制（Authorization），主要授权颁发令牌（token）</p></li><li><p>区分认证和授权</p><ul><li>身份认证是指的通过密码或者手机号直接登陆</li><li>授权是指登陆后授予权限获取某些信息</li></ul></li><li><p>OAuth2.0 是互联网行业一种标准的授权方式。各个公司根据这一套标准实现自己的 OAuth 认证和授权流程，而第三方想要接入这个流程，就需要使用 OAuth 这套方案。</p></li></ul><h2 id="授权登陆和认证登陆的区别" tabindex="-1"><a class="header-anchor" href="#授权登陆和认证登陆的区别"><span>授权登陆和认证登陆的区别</span></a></h2><p>数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。</p><p>使用令牌相较密码的好处如下</p><ol><li><p>令牌的限制</p><ol><li>短期，到期失效</li><li>数据所有者拥有对令牌的控制权，如果被撤销，会立即失效</li><li>有数据权限范围，例如只读和读写令牌。密码是完整权限</li></ol></li><li><p>令牌随时可控，不会危及系统安全</p></li></ol><h2 id="授权机制设计" tabindex="-1"><a class="header-anchor" href="#授权机制设计"><span>授权机制设计</span></a></h2><ol><li>用户申请授权</li><li>第三方应用确认同意授权</li><li>确认后给用户一个有效令牌 token（使用该 token，可以在一定期限内直接获取登陆后的数据（qq 等的数据））</li></ol><h2 id="通过授权码授权" tabindex="-1"><a class="header-anchor" href="#通过授权码授权"><span>通过授权码授权</span></a></h2><p>授权机制有四种方式实现，具体见<a href="https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html" target="_blank" rel="noopener noreferrer">理解OAuth 2.0</a>，其中最常用的是通过授权码授权，以下介绍通过授权码授权的方式</p><p>具体流程：用户申请授权码，前端申请获取授权码并使用授权码调用后端接口获取令牌</p><h3 id="好处" tabindex="-1"><a class="header-anchor" href="#好处"><span>好处</span></a></h3><ul><li>避免直接在前端获取令牌，提高安全性</li><li>授权码通过前端传送（在前端申请获取）</li><li>令牌存储在后端，且所有与资源服务器的通信都在后端完成</li></ul><p><img src="https://cdn.nlark.com/yuque/0/2022/jpeg/2198140/1658757044553-34941f36-1e6e-4e4e-946b-c7ef01ba04a5.jpeg" alt="img"></p><h2 id="小程序登陆" tabindex="-1"><a class="header-anchor" href="#小程序登陆"><span>小程序登陆</span></a></h2><p>小程序登录也是是使用 OAuth2 授权码授权实现的，相比较标准的授权码Auth2.0登录而言，通过微信的API静默授权获取code，免去了跳转第三方网站授权操作的过程</p><p><img src="https://cdn.nlark.com/yuque/0/2022/png/2198140/1658931940510-187c8044-b1f2-4db5-8515-a17ad48292e6.png" alt="img"></p><h3 id="说明" tabindex="-1"><a class="header-anchor" href="#说明"><span>说明</span></a></h3><ol><li>调用 <a href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html" target="_blank" rel="noopener noreferrer">wx.login()</a> 获取 <strong>临时登录凭证 code</strong> （code 只能使用一次），并回传到开发者服务器。</li><li>后端调用 <a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html" target="_blank" rel="noopener noreferrer">auth.code2Session</a> 接口，用 code 换取 用户唯一标识 OpenID 、 用户在微信开放平台帐号下的唯一标识 UnionID（若当前小程序已绑定到微信开放平台帐号） 和 会话密钥 session_key。</li><li>会话密钥 session_key 是对用户数据进行 <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html" target="_blank" rel="noopener noreferrer">加密签名</a> 的密钥。为了应用自身的数据安全，开发者服务器<strong>不应该把会话密钥下发到小程序，也不应该对外提供这个密钥</strong>。 <ol><li>每次调用 wx.login 后之前到 session_key 会失效，前端可以调用 checkSession 方法校验 session_key 是否有效</li><li>wx.getUserInfo()API 获取用户信息会返回的 encryptedData 和 iv，这是加密后到用户数据，需要使用 session_key 解密信息</li><li>前端将 encryptedData 和 iv 传递给后端获取私密信息，不传递 session_key</li></ol></li><li>自定登录态与 openid 和 session_key 关联，实际就是生成一个与 openid，session_key 关联的 token，下发给前端</li></ol><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><p><a href="https://segmentfault.com/a/1190000040700415" target="_blank" rel="noopener noreferrer">github oauth 第三方认证登录</a></p><p><a href="https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html" target="_blank" rel="noopener noreferrer">理解 OAuth 2.0 - 阮一峰的网络日志</a></p><p><a href="http://www.alloyteam.com/2021/04/15431/" target="_blank" rel="noopener noreferrer">走向匿名化，谈谈微信小程序新授权登录 | AlloyTeam</a></p><p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html" target="_blank" rel="noopener noreferrer">小程序登录 | 微信开放文档</a></p><p><a href="https://cloud.tencent.com/developer/article/1766827" target="_blank" rel="noopener noreferrer">一文详解小程序授权、登录、session_key 和 unionId - 腾讯云开发者社区-腾讯云</a></p><p><a href="https://developers.weixin.qq.com/community/develop/doc/000c2424654c40bd9c960e71e5b009?highline=Session" target="_blank" rel="noopener noreferrer">(4)获取用户信息 | 微信开放社区</a></p>',26),t=[i];function o(s,h){return n(),l("div",null,t)}const c=e(r,[["render",o],["__file","OAuth2.0与微信登陆.html.vue"]]),d=JSON.parse('{"path":"/%E6%96%B0%E6%8A%80%E6%9C%AF/OAuth2.0%E4%B8%8E%E5%BE%AE%E4%BF%A1%E7%99%BB%E9%99%86.html","title":"OAuth2.0与微信登陆","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"授权登陆和认证登陆的区别","slug":"授权登陆和认证登陆的区别","link":"#授权登陆和认证登陆的区别","children":[]},{"level":2,"title":"授权机制设计","slug":"授权机制设计","link":"#授权机制设计","children":[]},{"level":2,"title":"通过授权码授权","slug":"通过授权码授权","link":"#通过授权码授权","children":[{"level":3,"title":"好处","slug":"好处","link":"#好处","children":[]}]},{"level":2,"title":"小程序登陆","slug":"小程序登陆","link":"#小程序登陆","children":[{"level":3,"title":"说明","slug":"说明","link":"#说明","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"updatedTime":1717633708000,"contributors":[{"name":"liujia6","email":"liujia11@qianxin.com","commits":1}]},"filePathRelative":"新技术/OAuth2.0与微信登陆.md"}');export{c as comp,d as data};
