# SSR

server-side rending 翻译过来就是服务器渲染，通过服务器返回页面，而不是通过返回一个静态 html 文件

## 解决了什么问题

- 有利于 SEO
- 减少页面首屏加载时间，让用户更早看到页面内容。

## 同构渲染

同构是 SSR（server-side rending 翻译过来就是服务器渲染）的一种，就是一套 React/Vue 代码在服务器上运行一遍，到达浏览器又运行一遍。服务端渲染完成页面结构，浏览器端渲染完成事件绑定。

实现同构端重要因素

## 缺点以及取舍

- 服务端渲染对服务器的压力也是相对较大的，通过 node 去渲染出页面再传递给客户端显然开销是比较大的
- 开发成本

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

## 参考阅读

- [服务器端渲染 (SSR)](https://vuejs.org/guide/scaling-up/ssr.html)
- [Vue SSR 示例代码](https://stackblitz.com/edit/vue-ssr-example-r4gtd6?file=server.js)
- [面试官：SSR 解决了什么问题？有做过 SSR 吗？你是怎么做的？](https://cloud.tencent.com/developer/article/1794294)
- [【万字长文警告】从头到尾彻底理解服务端渲染 SSR 原理](https://juejin.cn/post/6856321751115431944#heading-13)
- [深入理解 Vue SSR 服务端渲染的“爱恨情仇”](https://juejin.cn/post/6925802781622140941#heading-0)
