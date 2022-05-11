# 页面渲染探索和演进

- CSR：Client Side Rendering，客户端（通常是浏览器）渲染；
- SSR：Server Side Rendering，服务端渲染；
- SSG：Static Site Generation，静态网站生成；
- ISR：Incremental Site Rendering，增量式的网站渲染；
- DPR：Distributed Persistent Rendering，分布式的持续渲染。

## SSR

server-side rending 翻译过来就是服务器渲染，通过服务器返回页面，而不是通过返回一个静态 html 文件

## 解决了什么问题

- 有利于 SEO
- 减少页面首屏加载时间，让用户更早看到页面内容。

## 同构渲染

同构是 SSR（server-side rending 翻译过来就是服务器渲染）的一种，就是一套 React/Vue 代码在服务器上运行一遍，到达浏览器又运行一遍。服务端渲染完成页面结构，浏览器端渲染完成事件绑定。

实现同构端重要因素

## 缺点以及取舍

- 服务端渲染对服务器的压力也是相对较大的，通过 node 去渲染出页面再传递给客户端显然开销是比较大的
- 由于获取数据（server）→ 渲染成 HTML（server）→ 载入 code（client）→ hydrate（client）的流程本身就是一个 waterfall，React 官方提出的新架构就是将整个 app 的 waterfall，拆分成多个组件分别执行此流程。
- [React18：新的SSR架构解决了什么问题？](https://mp.weixin.qq.com/s/jzkbysgW2LbncC8RUizZrQ)

## 如何实现

以下介绍整体逻辑，具体实现见[Vue SSR 示例代码](https://stackblitz.com/edit/vue-ssr-example-r4gtd6?file=server.js)

- 前端 JS 语言可以实现服务器 Node，这意味着 SSR 中间层服务端必须使用 Node
- 利用框架，我们使用同一个代码生成实例（vdom 和相关操作）
- 注意异步操作，服务端需要执行完页面的异步请求方法后（统一调用组件的 asyncData 方法后）再调用 render
- 注意路由，匹配到对应路由后执行\$router.push 操作
- 相关具体文件实现
  - 专用文件
    - 此文件及其依赖项在服务器和客户端之间共享——我们称它们为通用逻辑代码
  - 客户补水
    - Vue 需要执行水合步骤。在 hydration 期间，它创建在服务器上运行的相同 Vue 应用程序，将每个组件与它应该控制的 DOM 节点匹配，并附加 DOM 事件侦听器。
  - 服务端
    - 在服务器请求中使用 renderToString()将 Vue 应用程序实例解析并返回一个解析为应用程序呈现的 HTML 的 Promise
    - 页面中返回执行了渲染了 dom
    - 将 client.js（执行客户端补水，用于事件绑定和相关逻辑处理）作为静态文件，在 index.html 中引入 client.js 的 script
      - 这一步也可以通过打包框架生成静态 js 文件，然后服务端按照位置引入，主要是可以写在前端也可以直接用一个 js 文件

## 使用场景

实时性要求较高的场景，比如新闻资讯类的网站，可能 SSR 才是最好的选择

## [SSG](https://cloud.tencent.com/developer/article/1819396)

通过 SSR，我们能实现服务端快速渲染页面，但是这增加了服务器的运营成本，当同一个页面我们每次渲染的内容都是一样的，但是每次渲染都需要服务端处理一变，这无疑是十分浪费服务器资源的。

我们可以通过 SSG，在应用编译构建时预先渲染页面，并生成静态的 HTML。把生成的 HTML 静态资源部署到服务器后，浏览器不仅首次能请求到带页面内容的 HTML ，而且不需要服务器实时渲染和响应，大大节约了服务器运维成本和资源。至于页面内那些动态的内容（用户头像、评论框等），就通过 HTTP API 的形式进行浏览器端渲染（CSR）。

好处

- 用户始终通过 CDN 加载页面核心内容，CDN 的边缘节点有缓存，速度极快
- 通过 HTTP API + CSR，页面内次要的动态内容也可以被很好地渲染
- 数据有变化时，重新触发一次网站的异步渲染，然后推送新的内容到 CDN 即可。
- 由于每次都是全站渲染，所以网站的版本可以很好的与 Git 的版本对应上，甚至可以做到原子化发布和回滚。

## ISR （Incremental Site Rendering）

ISR 的实质是 SSG + SSR

SSG 的方式存在一个缺点，对于只有几十个页面的个人博客、小型文档站而言，数据有变化时，跑一次全页面渲染的消耗是可以接受的。但对于百万级、千万级、亿级页面的大型网站而言，一旦有数据改动，要进行一次全部页面的渲染，需要的时间可能是按小时甚至按天计的，这是不可接受的。

既然全量预渲染整个网站是不现实的，那么我们可以做一个切分：

1、关键性的页面（如网站首页、热点数据等）预渲染为静态页面，缓存至 CDN，保证最佳的访问性能；
2、非关键性的页面（如流量很少的老旧内容）先响应 fallback 内容，然后浏览器渲染（CSR）为实际数据；同时对页面进行异步预渲染，之后缓存至 CDN，提升后续用户访问的性能。（SWR），始终返回 CDN 的缓存数据（无论是否过期），如果数据已经过期，那么触发异步的预渲染，异步更新 CDN 的缓存。

[ISR 的利弊](https://www.netlify.com/blog/2021/03/08/incremental-static-regeneration-its-benefits-and-its-flaws/)

## DPR（Distributed Persistent Rendering）

为了解决 ISR 的一系列问题，Netlify 在前段时间发起了一个新的[提案](https://github.com/jamstack/jamstack.org/discussions/549)

DPR 本质上讲，是对 ISR 的模型做了几处改动，并且搭配上 CDN 的能力：

1、去除了 fallback 行为，而是直接用 On-demand Builder（按需构建器）来响应未经过预渲染的页面，然后将结果缓存至 CDN；
2、数据页面过期时，不再响应过期的缓存页面，而是 CDN 回源到 Builder 上，渲染出最新的数据；
3、每次发布新版本时，自动清除 CDN 的缓存数据。

## 选择

1. 对seo要求不高，同时对操作需求比较多的项目，比如一些管理后台系统，建议使用 CSR。因为只有在执行完bundle之后， 页面才能交互，单纯能看到元素， 却不能交互， 意义不大， 而且SSR 会带来额外的开发和维护成本。
2. 如果页面无数据，或者是纯静态页面，建议使用pre-render。因为这是一种通过预览打包的方式构建页面，也不会增加服务器负担。
3. 对seo和加载速度有比较大需求的，同时页面数据请求多的情况，建议使用 SSR。

## 参考阅读

- [服务器端渲染 (SSR)](https://vuejs.org/guide/scaling-up/ssr.html)
- [Vue SSR 示例代码](https://stackblitz.com/edit/vue-ssr-example-r4gtd6?file=server.js)
- [面试官：SSR 解决了什么问题？有做过 SSR 吗？你是怎么做的？](https://cloud.tencent.com/developer/article/1794294)
- [【万字长文警告】从头到尾彻底理解服务端渲染 SSR 原理](https://juejin.cn/post/6856321751115431944#heading-13)
- [深入理解 Vue SSR 服务端渲染的“爱恨情仇”](https://juejin.cn/post/6925802781622140941#heading-0)
- [新一代 Web 技术栈的演进：SSR/SSG/ISR/DPR 都在做什么？](新一代Web技术栈的演进：SSR/SSG/ISR/DPR都在做什么？)
- [预渲染、SSR、SSG、ISR](https://www.xuanbiyijue.com/2021/08/17/%E9%A2%84%E6%B8%B2%E6%9F%93%E3%80%81SSR%E3%80%81SSG%E3%80%81ISR/)
- [「干货」你需要了解的六种渲染模式](https://cloud.tencent.com/developer/article/1673185)
- [Edge Side Rendering](https://ithelp.ithome.com.tw/articles/10279929?sc=rss.iron)
