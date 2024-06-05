import{_ as e,c as l,o as r,a as i}from"./app-BYS36vur.js";const n={},t=i('<h2 id="新名词们" tabindex="-1"><a class="header-anchor" href="#新名词们"><span>新名词们</span></a></h2><ul><li><p>RSC：Remote Service Component 远程服务化组件（通过热插拔的机制，可视化配置，即插即用，快速构建活动页面，是活动页面的核心组成单元。）</p></li><li><p>DPR：Distributed Persistent Rendering 分布式的持续渲染</p></li><li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps" target="_blank" rel="noopener noreferrer">PWA：Progressive Web Apps 渐进式 Web 应用</a></p></li><li><p>Pre-rendering 预渲染</p></li><li><p>SEO: Search Engine Optimization 搜索引擎优化</p></li><li><p>BaaS: Backend-as-a-Service 后端即服务</p></li><li><p>BFF：Backend for Frontend 聚合层/适配层</p><ul><li><a href="https://modernjs.dev/docs/guides/tutorials/c09-bff/9.1-serverless" target="_blank" rel="noopener noreferrer">modern.js 实践</a></li><li>前端技术（iOS、Android、小程序、Web 等）的不断发展，多端对后端要求有很大差异，在后端微服务架构的情况下，后端服务很难提供满足多个前端的统一接口，BFF 则可以针对前端的特定需求，做出适配</li><li>前端 bff 和后端 bff 的区别？</li></ul></li><li><p>serveless</p><ul><li>不需要关心后端和服务运维，写一个函数返回数据即可开启一个函数功能的后端接口服务</li></ul></li><li><p><a href="https://swc.rs/" target="_blank" rel="noopener noreferrer">swc</a></p><ul><li>通过 rust 实现的 bable：swc，一个将 ES6 转化为 ES5 的工具。</li></ul></li><li><p><a href="https://juejin.cn/post/6932046455733485575#heading-4" target="_blank" rel="noopener noreferrer">pnpm</a></p><ul><li>优势 <ul><li>全局安装包，项目内使用硬链接指向全局，大大减少存储空间</li><li>即使同一个包的不同版本，也会极大程度复用 <ul><li>比如 lodash 有 100 个文件，更新版本之后多了一个文件，那么磁盘当中并不会重新写入 101 个文件，而是保留原来的 100 个文件的 hardlink，仅仅写入那一个新增的文件。</li></ul></li><li>支持 monorepo</li><li>安全性高 <ul><li>解决幽灵依赖</li></ul></li><li><a href="https://www.cnblogs.com/Naylor/p/7597869.html" target="_blank" rel="noopener noreferrer">window 下的链接</a><ul><li>mklink <ul><li>/H 硬链接</li><li>/J 初级软链接，unction 链接方式，又叫初级的软链接</li></ul></li></ul></li></ul></li></ul></li><li><p><a href="https://pinia.vuejs.org/core-concepts/#using-the-store" target="_blank" rel="noopener noreferrer">pinia</a></p><ul><li>https://juejin.cn/post/7078281612013764616#heading-0</li></ul></li><li><p><a href="https://svelte.dev/blog/svelte-3-rethinking-reactivity" target="_blank" rel="noopener noreferrer">svelete</a></p></li><li><p><a href="https://developers.google.com/web/fundamentals/primers/service-workers/" target="_blank" rel="noopener noreferrer">service-worker</a></p><ul><li>service-worker 是一个特化的 worker，专门用来处理网页资源，在浏览器和真正的服务器之间做为一个正向代理</li><li>HTTP 请求的本地代理服务器+响应和资源的缓存管理器</li><li>主要解决两个问题 <ul><li>作为<a href="https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Introduction" target="_blank" rel="noopener noreferrer">PWA (Progressive Web Application, 渐进式网络应用)</a>的核心。</li><li>提供更好的网页性能。</li><li>提供优秀的<a href="https://mp.weixin.qq.com/s/3Ep5pJULvP7WHJvVJNDV-g" target="_blank" rel="noopener noreferrer">离线缓存</a>（对缓存的极限控制）和弱网环境的使用体验。</li></ul></li><li>Service Worker 缓存策略 <ul><li><strong>仅缓存（Cache Only）</strong></li><li><strong>重新验证时失效(Stale while revalidate)</strong></li></ul></li><li>苹果设备对其支持一般 <ul><li><strong>可以使用 service worker 和缓存 API</strong></li><li><strong>但是不能使用消息推送以及后台同步</strong></li></ul></li><li>有一定的数据存储能力</li></ul></li><li><p><a href="https://juejin.cn/post/6844904052166230030" target="_blank" rel="noopener noreferrer">面试官：请你实现一个 PWA 我：😭 - 掘金</a></p></li><li><p>在国内市场低：市场被小程序抢占</p></li><li><p><a href="https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/218.%E7%B2%BE%E8%AF%BB%E3%80%8ARust%20%E6%98%AF%20JS%20%E5%9F%BA%E5%BB%BA%E7%9A%84%E6%9C%AA%E6%9D%A5%E3%80%8B.md" target="_blank" rel="noopener noreferrer">RUST 新基建</a></p></li></ul><h2 id="新概念们" tabindex="-1"><a class="header-anchor" href="#新概念们"><span>新概念们</span></a></h2><ul><li><a href="https://mp.weixin.qq.com/s/rF7_xJBq4NJP6CmkW3HPpQ" target="_blank" rel="noopener noreferrer">漫画：什么是中台？</a><ul><li>中台和平台都是某种共性能力，区分两者的重点一是看是否具备业务属性，二是看是否是一种组织。中台是支持多个前台业务且具备业务属性的共性能力组织，平台是支持多个前台或中台业务且不具备业务属性的共性能力。</li><li>业务中台</li><li>技术中台</li></ul></li></ul>',4),o=[t];function a(s,p){return r(),l("div",null,o)}const h=e(n,[["render",a],["__file","index.html.vue"]]),u=JSON.parse('{"path":"/%E6%96%B0%E6%8A%80%E6%9C%AF/","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"新名词们","slug":"新名词们","link":"#新名词们","children":[]},{"level":2,"title":"新概念们","slug":"新概念们","link":"#新概念们","children":[]}],"git":{"updatedTime":1717615253000,"contributors":[{"name":"liujia6","email":"liujia11@qianxin.com","commits":1}]},"filePathRelative":"新技术/README.md"}');export{h as comp,u as data};
