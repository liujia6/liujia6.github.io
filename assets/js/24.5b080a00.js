(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{534:function(t,n,e){"use strict";e.r(n);var a=e(22),s=Object(a.a)({},(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"vue-原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-原理"}},[t._v("#")]),t._v(" vue 原理")]),t._v(" "),e("p",[t._v("我们往后看这里有很多 xxxMixin 的函数调用，并把 Vue 当参数传入，它们的功能都是给 Vue 的 prototype 上扩展一些方法（这里具体的细节会在之后的文章介绍，这里不展开），Vue 按功能把这些扩展分散到多个模块中去实现，而不是在一个模块里实现所有，这种方式是用 Class 难以实现的。这么做的好处是非常方便代码的维护和管理，这种编程技巧也非常值得我们去学习")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Vue")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("options")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("process"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token constant"}},[t._v("NODE_ENV")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"production"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("warn")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Vue is a constructor and should be called with the `new` keyword"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("_init")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("initMixin")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Vue"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("stateMixin")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Vue"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("eventsMixin")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Vue"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("lifecycleMixin")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Vue"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("renderMixin")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Vue"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("ul",[e("li",[t._v("vm._render 最终是通过执行 createElement 方法并返回的是 vnode")]),t._v(" "),e("li",[t._v("Vue 的 _render 方法是实例的一个私有方法，它用来把实例渲染成一个虚拟 Node")]),t._v(" "),e("li",[t._v("在 Vue.js 中，Virtual DOM 是用 VNode 这么一个 Class 去描述")]),t._v(" "),e("li",[t._v("Virtual DOM 除了它的数据结构的定义，映射到真实的 DOM 实际上要经历 VNode 的 create、diff、patch 等过程。那么在 Vue.js 中，VNode 的 create 是通过之前提到的 createElement 方法创建的")])]),t._v(" "),e("h2",{attrs:{id:"vue-双向绑定"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-双向绑定"}},[t._v("#")]),t._v(" Vue 双向绑定")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("<!DOCTYPE html>\n<html>\n\n\t<head>\n\t\t<meta charset=\"UTF-8\">\n\t\t<title></title>\n\t</head>\n\n\t<body>\n\n\t\t<div id=\"app\">\n\n\t\t\t<input type=\"text\" v-model=\"text\" /> {{text}}\n\n\t\t</div>\n\n\t</body>\n\n\t<script type=\"text/javascript\">\n\t\t//\t\t\t编译函数\n\t\tfunction compile(node, vm) {\n\n\t\t\tvar reg = /\\{\\{(.*)\\}\\}/; // 来匹配{{xxx}}中的xxx\n\n\t\t\t//如果是元素节点\n\t\t\tif(node.nodeType === 1) {\n\n\t\t\t\tvar attr = node.attributes;\n\n\t\t\t\t//解析元素节点的所有属性\n\n\t\t\t\tfor(let i = 0; i < attr.length; i++) {\n\n\t\t\t\t\tif(attr[i].nodeName == 'v-model') {\n\n\t\t\t\t\t\tvar name = attr[i].nodeValue\n/*只需要绑定该元素的监听函数并且在初始化的时候展示data中的数据*/\n\t\t\t\t\t\tnode.addEventListener('input', function(e) {\n\t\t\t\t\t\t\tvm[name] = e.target.value\n\t\t\t\t\t\t})\n\n\t\t\t\t\t\tnode.value = vm.data[name]; //将data中的值赋予给该node，会让对应data数据将该watcher添加到数据的dep当中\n\n\t\t\t\t\t\tnode.removeAttribute('v-model')\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\t//如果是文本节点\n\n\t\t\tif(node.nodeType === 3) {\n\n\t\t\t\tif(reg.test(node.nodeValue)) {\n\n\t\t\t\t\tvar name = RegExp.$1; //获取到匹配的字符串\n\n\t\t\t\t\tname = name.trim();\n\n\t\t\t\t\t//node.nodeValue = vm[name]; //将data中的值赋予给该node\n\n\t\t\t\t\tnew Watcher(vm, node, name) //绑定一个观察者\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t\t//在向碎片化文档中添加节点时，每个节点都处理一下\n\n\t\tfunction nodeToFragment(node, vm) {\n\n\t\t\tvar fragment = document.createDocumentFragment();\n\n\t\t\tvar child;\n\n\t\t\twhile(child = node.firstChild) {\n\n\t\t\t\tcompile(child, vm);\n\n\t\t\t\tfragment.appendChild(child);\n\n\t\t\t}\n\n\t\t\treturn fragment\n\n\t\t}\n\n\t\t//\t\t\tVue构造函数\n\t\t//\t\t观察data中的所有属性值，注意增添了observe\n\n\t\tfunction Vue(options) {\n\n\t\t\tthis.data = options.data;\n\n\t\t\tobserve(this.data, this)\n\n\t\t\tvar id = options.el;\n\n\t\t\tvar dom = nodeToFragment(document.getElementById(id), this)\n\n\t\t\t//处理完所有节点后，重新把内容添加回去\n\t\t\tdocument.getElementById(id).appendChild(dom)\n\n\t\t}\n\n\t\t//\t\t实现一个响应式监听属性的函数。一旦有赋新值就发生变化\n\n\t\tfunction defineReactive(obj, key, val) {\n\n\t\t\tvar dep = new Dep();\n\n\t\t\tObject.defineProperty(obj, key, {\n\n\t\t\t\tget: function() {\n\n\t\t\t\t\tif(Dep.target) {\n\n\t\t\t\t\t\tdep.addSub(Dep.target)\n\n\t\t\t\t\t}\n\n\t\t\t\t\treturn val\n\n\t\t\t\t},\n\t\t\t\tset: function(newVal) {\n\n\t\t\t\t\tif(newVal === val) {\n\n\t\t\t\t\t\treturn\n\n\t\t\t\t\t}\n\n\t\t\t\t\tval = newVal;\n\n\t\t\t\t\tconsole.log('新值' + val);\n\n\t\t\t\t\t//一旦更新立马通知\n\n\t\t\t\t\tdep.notify();\n\n\t\t\t\t}\n\n\t\t\t})\n\n\t\t}\n\n\t\t//\t\t实现一个观察者，对于一个实例 每一个属性值都进行观察。\n\n\t\tfunction observe(obj, vm) {\n\n\t\t\tfor(let key of Object.keys(obj)) {\n\n\t\t\t\tdefineReactive(vm, key, obj[key]);\n\n\t\t\t}\n\n\t\t}\n\n\t\t//\t\tWatcher监听者\n\n\t\tfunction Watcher(vm, node, name) {\n\n\t\t\tDep.target = this;\n\n\t\t\tthis.vm = vm;\n\t\t\tthis.node = node;\n\t\t\tthis.name = name;\n\n\t\t\tthis.update();\n\n\t\t\tDep.target = null;\n\n\t\t}\n\n\t\tWatcher.prototype = {\n\n\t\t\tupdate() {\n\t\t\t\tthis.get();\n\t\t\t\tthis.node.nodeValue = this.value //更改节点内容的关键\n\t\t\t},\n\t\t\tget() {\n\t\t\t\tthis.value = this.vm[this.name] //触发相应的get\n\t\t\t}\n\n\t\t}\n\n\t\t//\t\tdep构造函数\n\n\t\tfunction Dep() {\n\t\t\tthis.subs = []\n\t\t}\n\t\tDep.prototype = {\n\t\t\taddSub(sub) {\n\t\t\t\tthis.subs.push(sub)\n\t\t\t},\n\t\t\tnotify() {\n\t\t\t\tthis.subs.forEach(function(sub) {\n\t\t\t\t\tsub.update();\n\t\t\t\t})\n\t\t\t}\n\t\t}\n\n\t\tvar vm = new Vue({\n\n\t\t\tel: 'app',\n\n\t\t\tdata: {\n\t\t\t\ttext: '赵刚'\n\t\t\t}\n\n\t\t})\n\t<\/script>\n\n</html>\n")])])]),e("h2",{attrs:{id:"依赖收集"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#依赖收集"}},[t._v("#")]),t._v(" 依赖收集")]),t._v(" "),e("ul",[e("li",[t._v("vue2 引入虚拟 dom，组件级别是一个 watcher 实例，即使一个组件内有 10 个节点使用了某个状态，单其实也只有一个 watcher 在观察这个状态的变化，只能通知到当前的组件，然后组件内部去通过虚拟 dom 比对与渲染，\n使用虚拟 dom 的优势")]),t._v(" "),e("li",[t._v("直接使用状态生成真实 dom 会有一定程度的性能浪费，使用虚拟 dom，可以讲虚拟节点缓存，比对上一次渲染时缓存的虚拟 dom，根据对比结果只更新需要更新的真实 dom，从而避免不必要的 dom 操作。节省一定的性能开销")]),t._v(" "),e("li",[t._v("粒度：当状态发生变化时，只通知到组件级别，然后组件内使用虚拟 dom 来渲染视图，也就是说只要组件使用的状态中有一个发生变化，那么整个组件就要重新渲")]),t._v(" "),e("li",[t._v("如果组件只有一个节点发生变化，那么重新渲染整个组件的所有节点")]),t._v(" "),e("li",[t._v("computed watch 并不会立刻求值，同时持有一个 dep 实例")]),t._v(" "),e("li",[t._v("求值：判断是否 dirty，，如果是通过 get 优质，然后设置为 false，")]),t._v(" "),e("li",[t._v("以$开头的属性是提供给用户的外部属性，以_开头的属性是提供给内部使用的属性，")]),t._v(" "),e("li",[t._v("初始化事件，将父组件在模板中注册的时间添加到子组件的时间系统")]),t._v(" "),e("li",[t._v("如果 v-on 写在组件标签上则该时间会注册到子组件的事件系统中，如果是平台标签则是浏览器事件")]),t._v(" "),e("li",[t._v("provide 和 inject 主要为告诫插件组件库提供用例，并不推荐直接用于程序代码中，并在其上下游关系成立的时间里始终生效")]),t._v(" "),e("li",[t._v("组件的_watchers 得到当前示例中所注册的所有 watcher 示例，并")]),t._v(" "),e("li",[t._v("prop 初始化：1. 格式化 2. 一个是调用 defineReactive 方法把每个 prop 对应的值变成响应式，可以通过 vm._props.xxx 访问到定义 props 中对应的属性")]),t._v(" "),e("li",[t._v("props 或是 data 的初始化都是把它们变成响应式对象")]),t._v(" "),e("li",[t._v("proxy 方法的实现很简单，通过 Object.defineProperty 把 target[sourceKey][key] 的读写变成了对 target[key] 的读写，所以对于 props 而言，对 vm._props.xxx 的读写变成了 vm.xxx 的读\nvue 双向数据绑定\n已经了解到 vue 是通过数据劫持的方式来做数据绑定的，其中最核心的方法便是通过 Object.defineProperty()来实现对属性的劫持，达到监听数据变动的目的，无疑这个方法是本文中最重要、最基础的内容之一，如果不熟悉 defineProperty，猛戳这里 整理了一下，要实现 mvvm 的双向绑定，就必须要实现以下几点：\n1、实现一个数据监听器 Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者\n2、实现一个指令解析器 Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数\n3、实现一个 Watcher，作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图\n4、mvvm 入口函数，整合以上三者")])]),t._v(" "),e("p",[t._v("在实例化一个 Vue 对象的时候，会传进去一个 data 对象，执行两个函数\n一个函数是对挂载目标元素模板里的 v-model 和"+t._s()+"；两个指令进行编译。\n另一个是对传进去的 data 对象里面的数据进行监听。\n上图中，observe 是利用 Object.defineProperty()对传入的 data 对象进行数据监听，在数据改变的时候触发该属性的 set 方法，更新该属性的值，并发布消息，我（该属性）的值变了。\ncompile 是编译器，找到 vue 的指令 v-model 所在的元素，将 data 中该属性的值赋给元素的 value，并给这个元素添加二级监听器，在元素的值改变的时候，将新值赋给 data 里面同名属性，这个时候就完成了单向数据绑定，视图 >> 模型。\n那么最终的由模型到视图的更新，依赖于 dep 和 watcher，dep 会收集订阅者，就是绑定了 data 里面属性的元素，在数据更新的时候，会触发该属性的 set 方法，在 set 里触发该属性的消息发布通知函数。而 Watcher 根据收到的数据变化通知，更新相应的数据。\ndep 这个东东给大家解释一下，就是 data 里的每个属性都有一个 dep 对象，dep 对象里可以有很多订阅者（watcher），但是只有一个添加订阅者的方法和一个发布变化通知的方法，就是模板上可以有多处元素绑定 data 里的同一个属性值，所以 dep 是依赖于 data 里面的属性的。\n而 Watcher 是每个"+t._s()+"有一个，初次编译的时候，会在 new 的时候自动更新一下模板的数据，等到下次数据改变的时候，由 dep 通知数据更新，直接调用 watcher 的 update 方法，更新模板的绑定数据。\n！！！！\n每一个 data 数据都有一个 dep，在 setter 里面也就是数据发生变化的时候，去让该 data 数据的 dep 去通知视图中每一个跟该数据相关的视图上的 node 节点，因为每一个具有双向绑定的节点都有一个 watcher，dep 会通知该数据的所有 watcher 去调用该 watcher 的 update 函数，更新视图从而实现从数据到视图的更新。\n从视图到数据的更新也就是通过在初始化编译的时候绑定监听函数。")]),t._v(" "),e("p",[t._v("链接：https://www.jianshu.com/p/ed19b36bc324")]),t._v(" "),e("h3",{attrs:{id:"vue-router-原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-router-原理"}},[t._v("#")]),t._v(" vue-router 原理")]),t._v(" "),e("p",[t._v("#代表网页中的一个位置。其右面的字符，就是该位置的标识符，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页。改变#会改变浏览器的访问历史，window.location.hash 这个属性可读可写，onhashchange 事件\n这是一个 HTML 5 新增的事件，当#值发生变化时，就会触发这个事件，http://twitter.com/#!/username\n就会自动抓取另一个 URL：\n　　http://twitter.com/?"),e("em",[t._v("escaped_fragment")]),t._v("=/username\n通过这种机制，Google 就可以索引动态的 Ajax 内容。\n只有将#转码为%23，浏览器才会将其作为实义字符处理")]),t._v(" "),e("p",[t._v("我们可以通过 javascript 对象表示的树结构来构建一棵真正的 dom 树，当数据状态发生变化时，可以直接修改这个 javascript 对象，接着对比修改后的 javascript 对象，记录下需要对页面做的 dom 操作，然后将其应用到真正的 dom 树，实现视图的更新，这个过程就是 Virtual DOM 的核心思想。")]),t._v(" "),e("h3",{attrs:{id:"mvvm-的理解"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mvvm-的理解"}},[t._v("#")]),t._v(" mvvm 的理解")]),t._v(" "),e("p",[t._v("视图（view）：用户界面\n控制器（controller）：业务逻辑\n模型（model）：数据保存\n通信方式如下：\nview 传送指令到 controller\ncontroller 完成业务逻辑后，model 改变状态\nmodel 将新的数据发送到 view，用户得到反馈\nVue 的 mvvm 主要就是 view 层、model 层、viewModel 层\n唯一的区别是 MVVM 采用了双向数据绑定，view 的变动自动反映在 view-model。Vue.js、\n那么这么多 MVVM 框架的诞生是为了解决什么问题？\n如何处理数据的更新和界面的更新。通过操作数据会自动反应到界面而不用操作 dom 来实现更新")]),t._v(" "),e("h3",{attrs:{id:"虚拟-dom-引入最大的好处就是"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#虚拟-dom-引入最大的好处就是"}},[t._v("#")]),t._v(" 虚拟 DOM 引入最大的好处就是：")]),t._v(" "),e("p",[t._v("组件的高度抽象化\n可以更好的实现 SSR，同构渲染等\n框架跨平台\n尤大神说的！vdom 把渲染过程抽象化了，从而使得组件的抽象能力也得到提升，并且可以适配 DOM 以外的渲染目标\n说到 DOM-diff 那一定要清楚其存在的意义，给定任意两棵树，采用先序深度优先遍历的算法找到最少的转换步骤\nDOM-diff 比较两个虚拟 DOM 的区别，也就是在比较两个对象的区别。\n作用： 根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新 DOM\n补丁就是需要 diff 的内容")]),t._v(" "),e("h2",{attrs:{id:"虚拟-dom-实现"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#虚拟-dom-实现"}},[t._v("#")]),t._v(" 虚拟 dom 实现")]),t._v(" "),e("p",[t._v("https://juejin.im/post/5d36cc575188257aea108a74#heading-16\n只比较同层节点，如果不同，那么即使该节点的子节点没变化，我们\n也不复用，直接将从父节点开始的子树全部删除，然后再重新创建节点添加到新的位置。如果父节点\n没变化，我们就比较所有同层的子节点，对这些子节点进行删除、创建、移位操作（通过四个索引：）")]),t._v(" "),e("p",[t._v("虚拟 dom 的实现主要是进行同层级递归地进行深度优先遍历的的对比\n在深度优先遍历的时候，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。\n通过列表对比算法判断移动的最小距离\n所以我们定义了几种差异类型：\nvar REPLACE = 0\nvar REORDER = 1\nvar PROPS = 2\nvar TEXT = 3\n替换，排序，属性，文本节点\n对于节点替换，很简单。判断新旧节点的 tagName 和是不是一样的，如果不一样的说明需要替换掉\n因为 tagName 是可重复的，不能用这个来进行对比。所以需要给子节点加上唯一标识 key，列表对比的时候，使用 key 进行对比，这样才能复用老的 DOM 树上的节点\n通过动态规划求解，时间复杂度为 O(M * N)。但是我们并不需要真的达到最小的操作，我们只需要优化一些比较常见的移动情况，牺牲一定 DOM 操作，让算法时间复杂度达到线性的（O(max(M, N))。\n根据不同类型的差异对当前节点进行 DOM 操作，在真正的 DOM 元素上应用变更\n通过在同层级间对比\nupdatechildrent 方法，通过新旧虚拟 dom 的首尾判断，来进行一个添加，删除，移位\n如果新旧节点的首节点相同就直接更新首节点，如果")]),t._v(" "),e("p",[t._v("判断两节点是否值得比较，值得比较则执行 patchVnode 不值得比较则用 Vnode 替换 oldVnode\npatchVnode 函数主要是对虚拟 dom 对比进行更新\n在 patch 方法中，我们看到会分为两种情况，\n一种是当 oldVnode 不存在时，会创建新的节点；另一种则是已经存在 oldVnode ，那么会对 oldVnode 和 vnode 进行 diff 及 patch 的过程。其中 patch 过程中会调用 sameVnode 方法来对对传入的 2 个 vnode 进行基本属性的比较，只有当基本属性相同的情况下才认为这个 2 个 vnode 只是局部发生了更新，然后才会对这 2 个 vnode 进行 diff，如果 2 个 vnode 的基本属性存在不一致的情况，那么就会直接跳过 diff 的过程，进而依据 vnode 新建一个真实的 dom，同时删除老的 dom 节点。\nfunction sameVnode (a, b) { return ( a.key === b.key && a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) ) }\n当 oldCh 和 ch 都存在且不相同的情况下，调用 updateChildren 对子节点进行 diff")]),t._v(" "),e("p",[t._v("主要是对比他们的子节点，如果两者都有子节点，则执行 updateChildren 函数比较子节点\nupdatechildren 函数\n有新旧节点的虚拟 dom 的首尾节点作为指针索引，在通过这四个指针对应的 dom 节点进行对比，如果新旧首节点一致，就\n用一个 while 循环\n这个循环的结束条件是直到 oldCh 或者 newCh 被遍历完后跳出循环")]),t._v(" "),e("p",[t._v("patch\n来看看 patch 是怎么打补丁的（代码只保留核心部分）\npatch 函数接收两个参数 oldVnode 和 Vnode 分别代表新的节点和之前的旧节点\n判断两节点是否值得比较，值得比较则执行 patchVnode\n不值得比较则用 Vnode 替换 oldVnode\n如果两个节点都是一样的，那么就深入检查他们的子节点。如果两个节点不一样那就说明 Vnode 完全被改变了，就可以直接替换 oldVnode。\n当我们确定两个节点值得比较之后我们会对两个节点指定 patchVnode 方法。那么这个方法做了什么呢？\n找到对应的真实 dom，称为 el\n判断 Vnode 和 oldVnode 是否指向同一个对象，如果是，那么直接 return\n如果他们都有文本节点并且不相等，那么将 el 的文本节点设置为 Vnode 的文本节点。\n如果 oldVnode 有子节点而 Vnode 没有，则删除 el 的子节点\n如果 oldVnode 没有子节点而 Vnode 有，则将 Vnode 的子节点真实化之后添加到 el\n如果两者都有子节点，则执行 updateChildren 函数比较子节点，这一步很重要")]),t._v(" "),e("h2",{attrs:{id:"ssr"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ssr"}},[t._v("#")]),t._v(" SSR")]),t._v(" "),e("p",[t._v('什么是服务端渲染，简单理解是将组件或页面通过服务器生成 html 字符串，再发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应用程序。 于传统的 SPA（单页应用）相比，服务端渲染能更好的有利于 SEO，减少页面首屏加载时间，当然对开发来讲我们就不得不多学一些知识来支持服务端渲染。同时服务端渲染对服务器的压力也是相对较大的，和服务器简单输出静态文件相比，通过 node 去渲染出页面再传递给客户端显然开销是比较大的，需要注意准备好相应的服务器负载。')]),t._v(" "),e("h3",{attrs:{id:"vue-不同版本区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-不同版本区别"}},[t._v("#")]),t._v(" vue 不同版本区别")]),t._v(" "),e("p",[t._v("完整版：同时包含编译器和运行时的版本。\n编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码。\n运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。")]),t._v(" "),e("h3",{attrs:{id:"渲染方法顺序"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#渲染方法顺序"}},[t._v("#")]),t._v(" 渲染方法顺序")]),t._v(" "),e("ul",[e("li",[t._v("el，template，render(渲染函数)都是 vue 对象对应的 HTML 元素（DOM 对象）")]),t._v(" "),e("li",[t._v("优先级顺序：el < template < render")]),t._v(" "),e("li",[t._v("el 对应的 HTML 元素是写在网页上的。")])]),t._v(" "),e("p",[t._v("注意：")]),t._v(" "),e("ul",[e("li",[t._v("只有 template，是不行的，因为，vue 对象不知道把 template 放在何处；")]),t._v(" "),e("li",[t._v("只有 render（渲染）函数,也是不行的，因为，vue 对象不知道把 render 后的结果放在何处；")]),t._v(" "),e("li",[t._v("既有 el 又有 template，就会用 template 里的内容替换 el 的 outterHTML。")])]),t._v(" "),e("h2",{attrs:{id:"参考"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://juejin.cn/post/7070708855046569997",target:"_blank",rel:"noopener noreferrer"}},[t._v("vue-router原理"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);n.default=s.exports}}]);