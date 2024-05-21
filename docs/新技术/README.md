## 新名词们

- RSC：Remote Service Component 远程服务化组件（通过热插拔的机制，可视化配置，即插即用，快速构建活动页面，是活动页面的核心组成单元。）
- DPR：Distributed Persistent Rendering 分布式的持续渲染
- [PWA：Progressive Web Apps 渐进式 Web 应用](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
- Pre-rendering 预渲染
- SEO: Search Engine Optimization 搜索引擎优化
- BaaS: Backend-as-a-Service 后端即服务
- BFF：Backend for Frontend 聚合层/适配层
  - [modern.js 实践](https://modernjs.dev/docs/guides/tutorials/c09-bff/9.1-serverless)
  - 前端技术（iOS、Android、小程序、Web 等）的不断发展，多端对后端要求有很大差异，在后端微服务架构的情况下，后端服务很难提供满足多个前端的统一接口，BFF 则可以针对前端的特定需求，做出适配
  - 前端 bff 和后端 bff 的区别？
- serveless
  - 不需要关心后端和服务运维，写一个函数返回数据即可开启一个函数功能的后端接口服务
- [swc](https://swc.rs/)
  - 通过 rust 实现的 bable：swc，一个将 ES6 转化为 ES5 的工具。
- [pnpm](https://juejin.cn/post/6932046455733485575#heading-4)
  - 优势
    - 全局安装包，项目内使用硬链接指向全局，大大减少存储空间
    - 即使同一个包的不同版本，也会极大程度复用
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
- [service-worker](https://developers.google.com/web/fundamentals/primers/service-workers/)

  - service-worker 是一个特化的 worker，专门用来处理网页资源，在浏览器和真正的服务器之间做为一个正向代理
  - HTTP 请求的本地代理服务器+响应和资源的缓存管理器
  - 主要解决两个问题
    - 作为[PWA (Progressive Web Application, 渐进式网络应用)](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Introduction)的核心。
    - 提供更好的网页性能。
    - 提供优秀的[离线缓存](https://mp.weixin.qq.com/s/3Ep5pJULvP7WHJvVJNDV-g)（对缓存的极限控制）和弱网环境的使用体验。
  - Service Worker 缓存策略
    - **仅缓存（Cache Only）**
    - **重新验证时失效(Stale while revalidate)**
  - 苹果设备对其支持一般
    - **可以使用 service worker 和缓存 API**
    - **但是不能使用消息推送以及后台同步**
  - 有一定的数据存储能力

- [面试官：请你实现一个 PWA 我：😭 - 掘金](https://juejin.cn/post/6844904052166230030)
- 在国内市场低：市场被小程序抢占

- [RUST 新基建](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/218.%E7%B2%BE%E8%AF%BB%E3%80%8ARust%20%E6%98%AF%20JS%20%E5%9F%BA%E5%BB%BA%E7%9A%84%E6%9C%AA%E6%9D%A5%E3%80%8B.md)

## 新概念们

- [漫画：什么是中台？](https://mp.weixin.qq.com/s/rF7_xJBq4NJP6CmkW3HPpQ)
  - 中台和平台都是某种共性能力，区分两者的重点一是看是否具备业务属性，二是看是否是一种组织。中台是支持多个前台业务且具备业务属性的共性能力组织，平台是支持多个前台或中台业务且不具备业务属性的共性能力。
  - 业务中台
  - 技术中台
