import{_ as e,c as n,o as l,a}from"./app-BsmYACjM.js";const t={},o=a('<h1 id="微前端" tabindex="-1"><a class="header-anchor" href="#微前端"><span>微前端</span></a></h1><p>相关阅读</p><p><a href="https://zh-hans.single-spa.js.org/docs/recommended-setup" target="_blank" rel="noopener noreferrer">single-spa 接入推荐</a></p><p>https://codeteenager.github.io/Micro-Frontends/guide/learn.html</p><h3 id="场景" tabindex="-1"><a class="header-anchor" href="#场景"><span>场景</span></a></h3><p>伴随项目发展，项目变得越来越庞大，在一个仓库下维护项目变得越来越困难。以下介绍 3 种解决方案。</p><h2 id="monorepo-multirepo" tabindex="-1"><a class="header-anchor" href="#monorepo-multirepo"><span><a href="https://juejin.cn/post/6941279824589619208#heading-1" target="_blank" rel="noopener noreferrer">Monorepo/multirepo</a></span></a></h2><ul><li><a href="https://github.com/korfuri/awesome-monorepo/blob/master/README-zh-CN.md" target="_blank" rel="noopener noreferrer">monorepo</a><ul><li>所有模块放在一个仓库管理（使用 lerna） <ul><li>优点是便于统一管理配置和构建发布</li><li>缺点是所有库还是在一个仓库，难以管理，没有权限控制</li><li>适用场景 <ul><li>工具库封装</li></ul></li></ul></li></ul></li><li>multirepo <ul><li>将项目分化成多个模块，并分为多个 repo 管理，通常使用 git submodule 实现 <ul><li>优点是开发效率高</li><li>缺点是构建困难</li></ul></li><li><a href="https://github.com/chenxiaochun/blog/issues/72" target="_blank" rel="noopener noreferrer">使用 workspace</a><ul><li>将公共依赖包提升到所有子项目的父目录的 node_modules 中，以实现共享这些依赖包的机制</li><li>workspace 字段表明多包目录，在 yarn 时，yarn 会尽量拍平，把依赖安装在根目录下</li><li>如果想要直接在根目录下安装依赖，使用 yarn -w 命令表示在根目录下安装依赖</li><li>nohoist <ul><li>nohoist 机制可以使 workspace 去自定义处理那些不兼容 hoist 模式的第三方库。只要你进行了配置，它就不会把这些再模块提升到根目录。它们还是被放在原来的子项目中，就像运行在一个标准的、没有 workspace 的工程一样。</li></ul></li></ul></li></ul></li></ul><p>以上两种方式其实都不太适合大型项目的管理，目前微前端是一种很好的解决方案</p><h2 id="微前端-1" tabindex="-1"><a class="header-anchor" href="#微前端-1"><span>微前端</span></a></h2><p><a href="https://github1s.com/umijs/qiankun" target="_blank" rel="noopener noreferrer">qiankun</a>是比较流行的微前端框架</p><p>微前端是一种很好的解决项目过于庞大的方案，其核心价值如下</p><h3 id="核心价值" tabindex="-1"><a class="header-anchor" href="#核心价值"><span>核心价值</span></a></h3><p>微前端架构具备以下几个核心价值：</p><ul><li>技术栈无关 <ul><li>主框架不限制接入应用的技术栈，微应用具备完全自主权</li></ul></li><li>独立开发、独立部署 <ul><li>微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新</li></ul></li><li>增量升级 <ul><li>在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略</li></ul></li><li>独立运行时 - 每个微应用之间状态隔离，运行时状态不共享 微前端架构旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用(Frontend Monolith)后，随之而来的应用不可维护的问题。这类问题在企业级 Web 应用中尤其常见。</li></ul><h3 id="如何实现" tabindex="-1"><a class="header-anchor" href="#如何实现"><span>如何实现</span></a></h3><p>要实现微前端的模块分开部署和打包，需要解决以下问题</p><ol><li>路由劫持，通过不同路由区分不同的微应用</li><li>子应用的加载与卸载</li><li>应用间运行时隔离</li></ol><h3 id="原理" tabindex="-1"><a class="header-anchor" href="#原理"><span>原理</span></a></h3><ul><li>监视路由变化 <ul><li>主要是使用 single-spa 库实现路由劫持和应用加载</li><li><a href="https://zhuanlan.zhihu.com/p/378346507" target="_blank" rel="noopener noreferrer">singleSpa 介绍</a><ul><li>hash 路由</li><li>history.go history.back history.forward,window.onpopstate 事件监听</li><li>pushState\\replaceState 需要通过函数重写</li><li>history 理由</li><li>window.onhashchange</li></ul></li></ul></li><li>匹配子应用</li><li>加载子应用 <ul><li>使用 SystemJS 实现一个通用的模块加载器，在浏览器端实现对 CommonJS、AMD、UMD 等各种模块的加载 <ul><li><a href="https://zhuanlan.zhihu.com/p/402155045" target="_blank" rel="noopener noreferrer">systemJS 介绍</a></li><li><a href="https://zh-hans.single-spa.js.org/docs/recommended-setup" target="_blank" rel="noopener noreferrer">推荐设置</a></li></ul></li></ul></li><li>公共模块的共享 <ul><li><a href="https://zhuanlan.zhihu.com/p/115403616" target="_blank" rel="noopener noreferrer">模块联邦</a></li><li>直接将一个应用的包应用于另一个应用，同时具备整体应用一起打包的公共依赖抽取能力。</li></ul></li></ul><h3 id="路由劫持" tabindex="-1"><a class="header-anchor" href="#路由劫持"><span>路由劫持</span></a></h3><p>sigleSPA 实现路由的劫持，通过不同的路由与固定规则路径的资源对应加载。每个微应用内部实现路由劫持时通过 mount 与 unmount 生命周期钩子实现应用的加载（往 app 上挂载根 dom）与卸载（卸载 dom）</p><h3 id="应用间运行时隔离-即沙箱" tabindex="-1"><a class="header-anchor" href="#应用间运行时隔离-即沙箱"><span>应用间运行时隔离，即沙箱</span></a></h3><blockquote><p>qiankun 给我们提供的能力，主要便是子应用的加载和沙箱隔离</p></blockquote><p>qiankun 做沙箱隔离主要分为三种：</p><ul><li>legacySandBox</li><li>proxySandBox</li><li>snapshotSandBox</li></ul><h3 id="legacysandbox-代理window。记录-window-变化并还原变化" tabindex="-1"><a class="header-anchor" href="#legacysandbox-代理window。记录-window-变化并还原变化"><span>legacySandBox （代理window。记录 window 变化并还原变化）</span></a></h3><p>legacySandBox 还是会操作 window 对象，但是他通过激活沙箱时还原子应用的状态，卸载时还原主应用的状态来实现沙箱隔离的</p><h3 id="proxysandbox-一个微应用对应一个fackwindow-这个windowcopy了window属性例如document-location等" tabindex="-1"><a class="header-anchor" href="#proxysandbox-一个微应用对应一个fackwindow-这个windowcopy了window属性例如document-location等"><span>proxySandBox （一个微应用对应一个fackWindow，这个windowcopy了window属性例如document，location等）</span></a></h3><p>在 qiankun 中，proxySandBox 用于多实例（微应用共存）场景</p><p>proxySandBox 不会直接操作 window 对象。并且为了避免子应用操作或者修改主应用上诸如 window、document、location 这些重要的属性，会遍历这些属性到子应用 window 副本（fakeWindow）上</p><h3 id="snapshotsandbox-作为兼容-ie11-的方案。不能实现多实例" tabindex="-1"><a class="header-anchor" href="#snapshotsandbox-作为兼容-ie11-的方案。不能实现多实例"><span>snapshotSandBox （作为兼容 IE11 的方案。不能实现多实例）</span></a></h3><p>在不支持 Proxy 的场景下会降级为 snapshotSandBox，如同他的名字一样，snapshotSandBox 的原理就是在子应用激活 / 卸载时分别去通过快照的形式记录/还原状态来实现沙箱的。</p><p>遍历window属性做diff，有差异则记录到一个新的map中，在切换的时候，遍历这个差异对象</p><h3 id="css-隔离" tabindex="-1"><a class="header-anchor" href="#css-隔离"><span>css 隔离</span></a></h3><ul><li>基于 shadow DOM 的样式隔离 <ul><li>sandbox: { strictStyleIsolation?: boolean } 在该选项开启的情况下，我们会以 Shadow DOM 的形式嵌入微应用，</li><li>一些组件可能会越过 Shadow Boundary 到外部 Document Tree 插入节点，而这部分节点的样式就会丢失；比如 antd 的 Modal 就会渲染节点至 ducument.body ，引发样式丢失；针对刚才的 antd 场景你可以通过他们提供的 ConfigProvider.getPopupContainer API 来指定在 Shadow Tree 内部的节点为挂载节点，但另外一些其他的组件库，或者你的一些代码也会遇到同样的问题，需要你额外留心。</li><li>此外 Shadow DOM 场景下还会有一些额外的事件处理、边界处理等问题，后续我们会逐步更新官方文档指导用户更顺利的开启 Shadow DOM。所以请根据实际情况来选择是否开启基于 shadow DOM 的样式隔离，并做好相应的检查和处理。</li></ul></li></ul><p><a href="https://zhuanlan.zhihu.com/p/406574778" target="_blank" rel="noopener noreferrer">qiankun 和 emp 在国内微前端中为啥这么受欢迎？ - 知乎</a></p><p>EMP 与 qiankun 对比</p><ol><li>在 qiankun 的模式下，通过中心基座集成各微应用。而在 emp 的方案中不需要中心化的基座，每一个微前端应用都可以通过远程调用的方式引入共享模块</li></ol><p>我理解如果项目没有共用的 UI 菜单，每个 APP 都是独立的，可以使用 EMP，如果有共用的菜单，这个需要中心化的应用去维护，EMP 的接入使用较为简单，qiankun 较为复杂</p><p><a href="https://zhuanlan.zhihu.com/p/413165993" target="_blank" rel="noopener noreferrer">模块联邦原理</a></p><p><a href="https://mp.weixin.qq.com/s?__biz=Mzg3OTU5MjY5NQ==&amp;mid=2247485646&amp;idx=2&amp;sn=7c3c9a4433ec3dd9532e2e983260f76d&amp;chksm=cf035d56f874d440da5af431dbb83f1a45d812dbcc70e16cc741a58a5c30476f24ece813c1a8&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">微前端在得物客服域的实践 ｜ 那么多微前端框架，为啥我们选 Qiankun + MF</a></p><table><thead><tr><th>解决方案</th><th>来源</th><th>特点</th><th>缺点</th></tr></thead><tbody><tr><td>iframe</td><td>-</td><td>天生隔离样式与脚本、多页</td><td>窗口大小不好控制，隔离性无法被突破，导致应用间上下文无法被共享，随之带来开发体验、产品体验等问题无法做到单页导致许多功能无法正常在主应用中展示</td></tr><tr><td>single-spa</td><td>国外</td><td>Js Entry, 主应用重写 window.addEventListener 拦截监听路由的时间，执行内部的 reroute 逻辑，加载子应用</td><td>基于 reroute，对于需要缓存，加载多应用的场景不适合</td></tr><tr><td>qiankun</td><td>蚂蚁金服</td><td>基于 single-spa，增加了 html-entry,sandbox, globalSate, 资源预加载等核心功能</td><td>需要编译为 umd 方式，对于 AMD，systemJs 支持不友好，且官方没有公开支持 vite 构建</td></tr><tr><td>icestark</td><td>阿里</td><td>把大部分配置通过 cache 写进 window[&#39;icestark&#39;]全局变量</td><td>只对 React 支持，跨框架支持不友好</td></tr><tr><td>Garfish</td><td>字节</td><td>对现有 MFE 框架的增强版，VM 沙箱</td><td>-</td></tr><tr><td>microApp</td><td>京东</td><td>基于 web Component 的实现</td><td>存在兼容性问题，微前端方面的探索不够成熟</td></tr><tr><td>ESM</td><td>-</td><td>微模块，通过构建工具编译为 js，远程加载模块，无技术栈限制，跟页面路由无关，可以随处挂载</td><td>无法兼容所有浏览器(但可以通过编译工具解决)，需手动隔离样式（可通过 css module 解决），应用通讯不友好</td></tr><tr><td>EMP</td><td>欢聚时代</td><td>基于 Module Federation、去中心化、跨应用状态共享、跨框架组件调用、远程拉取 ts 声明文件、动态更新微应用、第三方依赖的共享等能力</td><td>目前无法涵盖所有框架</td></tr></tbody></table><p><a href="https://www.cnblogs.com/kongshu-612/p/17375980.html" target="_blank" rel="noopener noreferrer">浅谈(0,eval)(&#39;window&#39;) - kongshu - 博客园</a></p><p># import-html-entry</p><p>import-html-entry 库主要实现了，由于直接将 html 文件 append 到文档中，对应的脚本和样式都不会生效，所以需要解析对应的标签应用</p><ul><li>解析获取 html 文件中的 style、script 标签数据</li><li><a href="https://juejin.cn/post/7236021829000691771" target="_blank" rel="noopener noreferrer">2023微前端技术方案选型 - 掘金</a></li></ul>',47),i=[o];function r(d,s){return l(),n("div",null,i)}const h=e(t,[["render",r],["__file","微前端.html.vue"]]),c=JSON.parse('{"path":"/%E6%96%B0%E6%8A%80%E6%9C%AF/%E5%BE%AE%E5%89%8D%E7%AB%AF.html","title":"微前端","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"场景","slug":"场景","link":"#场景","children":[]},{"level":2,"title":"Monorepo/multirepo","slug":"monorepo-multirepo","link":"#monorepo-multirepo","children":[]},{"level":2,"title":"微前端","slug":"微前端-1","link":"#微前端-1","children":[{"level":3,"title":"核心价值","slug":"核心价值","link":"#核心价值","children":[]},{"level":3,"title":"如何实现","slug":"如何实现","link":"#如何实现","children":[]},{"level":3,"title":"原理","slug":"原理","link":"#原理","children":[]},{"level":3,"title":"路由劫持","slug":"路由劫持","link":"#路由劫持","children":[]},{"level":3,"title":"应用间运行时隔离，即沙箱","slug":"应用间运行时隔离-即沙箱","link":"#应用间运行时隔离-即沙箱","children":[]},{"level":3,"title":"legacySandBox （代理window。记录 window 变化并还原变化）","slug":"legacysandbox-代理window。记录-window-变化并还原变化","link":"#legacysandbox-代理window。记录-window-变化并还原变化","children":[]},{"level":3,"title":"proxySandBox （一个微应用对应一个fackWindow，这个windowcopy了window属性例如document，location等）","slug":"proxysandbox-一个微应用对应一个fackwindow-这个windowcopy了window属性例如document-location等","link":"#proxysandbox-一个微应用对应一个fackwindow-这个windowcopy了window属性例如document-location等","children":[]},{"level":3,"title":"snapshotSandBox （作为兼容 IE11 的方案。不能实现多实例）","slug":"snapshotsandbox-作为兼容-ie11-的方案。不能实现多实例","link":"#snapshotsandbox-作为兼容-ie11-的方案。不能实现多实例","children":[]},{"level":3,"title":"css 隔离","slug":"css-隔离","link":"#css-隔离","children":[]}]}],"git":{"updatedTime":1717633708000,"contributors":[{"name":"liujia6","email":"liujia11@qianxin.com","commits":1}]},"filePathRelative":"新技术/微前端.md"}');export{h as comp,c as data};
