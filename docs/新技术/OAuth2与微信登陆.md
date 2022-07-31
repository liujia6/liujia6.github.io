# OAuth2.0 与小程序登陆

- [OAuth](https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)2.0 是一种授权机制（Authorization），主要授权颁发令牌（token）

- - 区分认证和授权

- - - 身份认证是指的通过密码或者手机号直接登陆
    - 授权是指登陆后授予权限获取某些信息

- OAuth2.0 是互联网行业一种标准的授权方式。各个公司根据这一套标准实现自己的 OAuth 认证和授权流程，而第三方想要接入这个流程，就需要使用 OAuth 这套方案。

## 授权登陆和认证登陆的区别

数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。

使用令牌相较密码的好处如下

1. 令牌的限制
   1. 短期，到期失效
   1. 数据所有者拥有对令牌的控制权，如果被撤销，会立即失效
   1. 有数据权限范围，例如只读和读写令牌。密码是完整权限

1. 令牌随时可控，不会危机系统安全

## 授权机制设计

1. 用户申请授权
2. 第三方应用确认同意授权
3. 确认后给用户一个有效令牌 token（使用该 token，可以在一定期限内直接获取登陆后的数据（qq 等的数据））

## 通过授权码授权

- 用户申请授权码，前端使用授权码调用后端接口获取令牌
  - 授权码通过前端传送
  - 令牌存储在后端，且所有与资源服务器的通信都在后端完成


### 好处

- 避免直接将令牌传送给前端，提高安全性

![img](https://cdn.nlark.com/yuque/0/2022/jpeg/2198140/1658757044553-34941f36-1e6e-4e4e-946b-c7ef01ba04a5.jpeg)

## 小程序登陆（使用 OAuth2 授权码授权）

![img](https://cdn.nlark.com/yuque/0/2022/png/2198140/1658931940510-187c8044-b1f2-4db5-8515-a17ad48292e6.png)

### 说明

1. 调用 [wx.login()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) 获取 **临时登录凭证 code** （code 只能使用一次），并回传到开发者服务器。
2. 后端调用 [auth.code2Session](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html) 接口，用 code 换取 用户唯一标识 OpenID 、 用户在微信开放平台帐号下的唯一标识 UnionID（若当前小程序已绑定到微信开放平台帐号） 和 会话密钥 session_key。
3. 会话密钥 session_key 是对用户数据进行 [加密签名](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html) 的密钥。为了应用自身的数据安全，开发者服务器**不应该把会话密钥下发到小程序，也不应该对外提供这个密钥**。
   1. 每次调用 wx.login 后之前到 session_key 会失效，前端可以调用 checkSession 方法校验 session_key 是否有效
   2. wx.getUserInfo()API 获取用户信息会返回的 encryptedData 和 iv，这是加密后到用户数据，需要使用 session_key 解密信息
   3. 前端将 encryptedData 和 iv 传递给后端获取私密信息，不传递 session_key
4. 自定登录态与 openid 和 session_key 关联，实际就是生成一个与 openid，session_key 关联的 token，下发给前端

## 参考

[github oauth 第三方认证登录](https://segmentfault.com/a/1190000040700415)

[理解 OAuth 2.0 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)

[走向匿名化，谈谈微信小程序新授权登录 | AlloyTeam](http://www.alloyteam.com/2021/04/15431/)

[小程序登录 | 微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)

[一文详解小程序授权、登录、session_key 和 unionId - 腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1766827)

[(4)获取用户信息 | 微信开放社区](https://developers.weixin.qq.com/community/develop/doc/000c2424654c40bd9c960e71e5b009?highline=Session)
