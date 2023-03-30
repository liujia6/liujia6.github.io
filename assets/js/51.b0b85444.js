(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{518:function(a,o,t){"use strict";t.r(o);var r=t(22),n=Object(r.a)({},(function(){var a=this,o=a.$createElement,t=a._self._c||o;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"如何管理日益庞大的项目"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何管理日益庞大的项目"}},[a._v("#")]),a._v(" 如何管理日益庞大的项目")]),a._v(" "),t("h3",{attrs:{id:"场景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#场景"}},[a._v("#")]),a._v(" 场景")]),a._v(" "),t("p",[a._v("伴随项目发展，项目变得越来越庞大，在一个仓库下维护项目变得越来越困难。以下介绍 3 种解决方案。")]),a._v(" "),t("h2",{attrs:{id:"monorepo-multirepo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#monorepo-multirepo"}},[a._v("#")]),a._v(" "),t("a",{attrs:{href:"https://juejin.cn/post/6941279824589619208#heading-1",target:"_blank",rel:"noopener noreferrer"}},[a._v("Monorepo/multirepo"),t("OutboundLink")],1)]),a._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://github.com/korfuri/awesome-monorepo/blob/master/README-zh-CN.md",target:"_blank",rel:"noopener noreferrer"}},[a._v("monorepo"),t("OutboundLink")],1),a._v(" "),t("ul",[t("li",[a._v("所有模块放在一个仓库管理（使用 lerna）\n"),t("ul",[t("li",[a._v("优点是便于统一管理配置和构建发布")]),a._v(" "),t("li",[a._v("缺点是所有库还是在一个仓库，难以管理，没有权限控制")]),a._v(" "),t("li",[a._v("适用场景\n"),t("ul",[t("li",[a._v("工具库封装")])])])])])])]),a._v(" "),t("li",[a._v("multirepo\n"),t("ul",[t("li",[a._v("将项目分化成多个模块，并分为多个 repo 管理，通常使用 git submodule 实现\n"),t("ul",[t("li",[a._v("优点是开发效率高")]),a._v(" "),t("li",[a._v("缺点是构建困难")])])]),a._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/chenxiaochun/blog/issues/72",target:"_blank",rel:"noopener noreferrer"}},[a._v("使用 workspace"),t("OutboundLink")],1),a._v(" "),t("ul",[t("li",[a._v("将公共依赖包提升到所有子项目的父目录的 node_modules 中，以实现共享这些依赖包的机制")]),a._v(" "),t("li",[a._v("workspace 字段表明多包目录，在 yarn 时，yarn 会尽量拍平，把依赖安装在根目录下")]),a._v(" "),t("li",[a._v("如果想要直接在根目录下安装依赖，使用 yarn -w 命令表示在根目录下安装依赖")]),a._v(" "),t("li",[a._v("nohoist\n"),t("ul",[t("li",[a._v("nohoist 机制可以使 workspace 去自定义处理那些不兼容 hoist 模式的第三方库。只要你进行了配置，它就不会把这些再模块提升到根目录。它们还是被放在原来的子项目中，就像运行在一个标准的、没有 workspace 的工程一样。")])])])])])])])]),a._v(" "),t("p",[a._v("以上两种方式其实都不太适合大型项目的管理，目前微前端是一种很好的解决方案")]),a._v(" "),t("h2",{attrs:{id:"微前端"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#微前端"}},[a._v("#")]),a._v(" 微前端")]),a._v(" "),t("p",[a._v("微前端是一种很好的解决项目过于庞大的方案，其核心价值如下")]),a._v(" "),t("h2",{attrs:{id:"核心价值"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#核心价值"}},[a._v("#")]),a._v(" 核心价值")]),a._v(" "),t("p",[a._v("微前端架构具备以下几个核心价值：")]),a._v(" "),t("ul",[t("li",[a._v("技术栈无关\n"),t("ul",[t("li",[a._v("主框架不限制接入应用的技术栈，微应用具备完全自主权")])])]),a._v(" "),t("li",[a._v("独立开发、独立部署\n"),t("ul",[t("li",[a._v("微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新")])])]),a._v(" "),t("li",[a._v("增量升级\n"),t("ul",[t("li",[a._v("在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略")])])]),a._v(" "),t("li",[a._v("独立运行时 - 每个微应用之间状态隔离，运行时状态不共享\n微前端架构旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用(Frontend Monolith)后，随之而来的应用不可维护的问题。这类问题在企业级 Web 应用中尤其常见。")])]),a._v(" "),t("h2",{attrs:{id:"如何实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何实现"}},[a._v("#")]),a._v(" 如何实现")]),a._v(" "),t("p",[a._v("要实现微前端的模块分开部署和打包，需要解决以下问题")]),a._v(" "),t("ol",[t("li",[a._v("路由劫持，通过不同路由区分不同的微应用")]),a._v(" "),t("li",[a._v("子应用的加载与卸载")]),a._v(" "),t("li",[a._v("应用间运行时隔离")])]),a._v(" "),t("h2",{attrs:{id:"路由劫持"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#路由劫持"}},[a._v("#")]),a._v(" 路由劫持")]),a._v(" "),t("p",[a._v("sigleSPA 实现路由的劫持，通过不同的路由与固定规则路径的资源对应加载。每个微应用内部实现路由劫持时通过 mount 与 unmount 生命周期钩子实现应用的加载（往 app 上挂载根 dom）与卸载（卸载 dom）")]),a._v(" "),t("h2",{attrs:{id:"应用间运行时隔离-即沙箱"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#应用间运行时隔离-即沙箱"}},[a._v("#")]),a._v(" 应用间运行时隔离，即沙箱")]),a._v(" "),t("blockquote",[t("p",[a._v("qiankun 给我们提供的能力，主要便是子应用的加载和沙箱隔离")])]),a._v(" "),t("p",[a._v("qiankun 做沙箱隔离主要分为三种：")]),a._v(" "),t("ul",[t("li",[a._v("legacySandBox")]),a._v(" "),t("li",[a._v("proxySandBox")]),a._v(" "),t("li",[a._v("snapshotSandBox")])]),a._v(" "),t("h3",{attrs:{id:"legacysandbox-操作真实的-window-记录-window-并还原变化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#legacysandbox-操作真实的-window-记录-window-并还原变化"}},[a._v("#")]),a._v(" legacySandBox （操作真实的 window，记录 window 并还原变化）")]),a._v(" "),t("p",[a._v("legacySandBox 还是会操作 window 对象，但是他通过激活沙箱时还原子应用的状态，卸载时还原主应用的状态来实现沙箱隔离的")]),a._v(" "),t("h3",{attrs:{id:"proxysandbox-所有共有变量都使用一个代理去修改属性-实现多实例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#proxysandbox-所有共有变量都使用一个代理去修改属性-实现多实例"}},[a._v("#")]),a._v(" proxySandBox （所有共有变量都使用一个代理去修改属性，实现多实例）")]),a._v(" "),t("p",[a._v("在 qiankun 中，proxySandBox 用于多实例（微应用共存）场景")]),a._v(" "),t("p",[a._v("proxySandBox 不会直接操作 window 对象。并且为了避免子应用操作或者修改主应用上诸如 window、document、location 这些重要的属性，会遍历这些属性到子应用 window 副本（fakeWindow）上")]),a._v(" "),t("h3",{attrs:{id:"snapshotsandbox-作为兼容-ie11-的方案。不能实现多实例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#snapshotsandbox-作为兼容-ie11-的方案。不能实现多实例"}},[a._v("#")]),a._v(" snapshotSandBox （作为兼容 IE11 的方案。不能实现多实例）")]),a._v(" "),t("p",[a._v("在不支持 Proxy 的场景下会降级为 snapshotSandBox，如同他的名字一样，snapshotSandBox 的原理就是在子应用激活 / 卸载时分别去通过快照的形式记录/还原状态来实现沙箱的。")]),a._v(" "),t("h2",{attrs:{id:"css-隔离"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#css-隔离"}},[a._v("#")]),a._v(" css 隔离")]),a._v(" "),t("ul",[t("li",[a._v("基于 shadow DOM 的样式隔离\n"),t("ul",[t("li",[a._v("sandbox: { strictStyleIsolation?: boolean } 在该选项开启的情况下，我们会以 Shadow DOM 的形式嵌入微应用，")]),a._v(" "),t("li",[a._v("一些组件可能会越过 Shadow Boundary 到外部 Document Tree 插入节点，而这部分节点的样式就会丢失；比如 antd 的 Modal 就会渲染节点至 ducument.body ，引发样式丢失；针对刚才的 antd 场景你可以通过他们提供的 ConfigProvider.getPopupContainer API 来指定在 Shadow Tree 内部的节点为挂载节点，但另外一些其他的组件库，或者你的一些代码也会遇到同样的问题，需要你额外留心。")]),a._v(" "),t("li",[a._v("此外 Shadow DOM 场景下还会有一些额外的事件处理、边界处理等问题，后续我们会逐步更新官方文档指导用户更顺利的开启 Shadow DOM。所以请根据实际情况来选择是否开启基于 shadow DOM 的样式隔离，并做好相应的检查和处理。")])])])])])}),[],!1,null,null,null);o.default=n.exports}}]);