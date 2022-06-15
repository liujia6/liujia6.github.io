## 新名词们

- RSC：Remote Service Component 远程服务化组件（通过热插拔的机制，可视化配置，即插即用，快速构建活动页面，是活动页面的核心组成单元。）
- DPR：Distributed Persistent Rendering 分布式的持续渲染
- [PWA：Progressive Web Apps 渐进式 Web 应用](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
  - 对于弱网环境的用户体验提升很有帮助，而且还可以作为桌面应用的技术框架
  - 可发现（Discoverable）, 可以通过搜索引擎发现。
  - 可安装（Installable）, 可以出现在设备的主屏幕。
  - 可链接（Linkable）, 可以简单地通过 URL 分享。
  - 独立于网络（Network independent）, 可以在离线状态或者是在网速很差的情况下运行。
  - 渐进式（Progressive）, 在老版本的浏览器仍旧可以使用，在新版本的浏览器上可以使用全部功能。
  - 可重入（Re-engageable）, 无论何时有新的内容，都可以发送通知。
  - 响应式（Responsive）, 在任何具有屏幕和浏览器的设备上可以正常使用——包括手机、平板电脑、笔记本、电视、冰箱等。
  - 安全（Safe）, 在用户、应用和服务器之间的连接是安全的，第三方无法访问你的敏感数据。

- Pre-rendering 预渲染
- SEO: Search Engine Optimization 搜索引擎优化
- BaaS: Backend-as-a-Service 后端即服务
- BFF：Backend for Frontend 聚合层/适配层
  - [modern.js 实践](https://modernjs.dev/docs/guides/tutorials/c09-bff/9.1-serverless)
  - 前端技术（iOS、Android、小程序、Web 等）的不断发展，多端对后端要求有很大差异，在后端微服务架构的情况下，后端服务很难提供满足多个前端的统一接口，BFF 则可以针对前端的特定需求，做出适配
  - 前端 bff 和后端 bff 的区别？
- serveless
  - 不需要关心后端和服务运维，写一个函数返回数据即可开启一个函数功能的后端接口服务，
- [swc](https://swc.rs/)
  - 通过 rust 实现的 bable：swc，一个将 ES6 转化为 ES5 的工具。
- [pnpm](https://juejin.cn/post/6932046455733485575#heading-4)
  - 优势
    - 全局安装包，项目内使用硬链接指向全局，大大减少存储空间
    - 即使同一个包的不同版本，也会极大程度服用
      - 比如 lodash 有 100 个文件，更新版本之后多了一个文件，那么磁盘当中并不会重新写入 101 个文件，而是保留原来的 100 个文件的 hardlink，仅仅写入那一个新增的文件。
    - 支持 monorepo
    - 安全性高
      - 解决幽灵依赖
    - [window 下的链接](https://www.cnblogs.com/Naylor/p/7597869.html)
      - mklink
        - /H 硬链接
        - /J 初级软链接，unction 链接方式，又叫初级的软链接
- [pinia](https://pinia.vuejs.org/core-concepts/#using-the-store)
  - https://juejin.cn/post/7078281612013764616#heading-0
- [svelete](https://svelte.dev/blog/svelte-3-rethinking-reactivity)
- service-worker
  - [service-worker](https://developers.google.com/web/fundamentals/primers/service-workers/)

## 新概念们

- [漫画：什么是中台？](https://mp.weixin.qq.com/s/rF7_xJBq4NJP6CmkW3HPpQ)
  - **中台和平台都是某种共性能力，区分两者的重点一是看是否具备业务属性，二是看是否是一种组织。**中台是支持多个前台业务且具备业务属性的共性能力组织，平台是支持多个前台或中台业务且不具备业务属性的共性能力。
  - 业务中台
  - 技术中台
