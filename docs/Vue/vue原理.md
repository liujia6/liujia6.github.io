# vue原理
我们往后看这里有很多 xxxMixin 的函数调用，并把 Vue 当参数传入，它们的功能都是给 Vue 的 prototype 上扩展一些方法（这里具体的细节会在之后的文章介绍，这里不展开），Vue 按功能把这些扩展分散到多个模块中去实现，而不是在一个模块里实现所有，这种方式是用 Class 难以实现的。这么做的好处是非常方便代码的维护和管理，这种编程技巧也非常值得我们去学习
```javascript
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```
- vm._render 最终是通过执行 createElement 方法并返回的是 vnode
- Vue 的 _render 方法是实例的一个私有方法，它用来把实例渲染成一个虚拟 Node
- 在 Vue.js 中，Virtual DOM 是用 VNode 这么一个 Class 去描述
- Virtual DOM 除了它的数据结构的定义，映射到真实的 DOM 实际上要经历 VNode 的 create、diff、patch 等过程。那么在 Vue.js 中，VNode 的 create 是通过之前提到的 createElement 方法创建的

## Vue双向绑定

```
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>

	<body>

		<div id="app">

			<input type="text" v-model="text" /> {{text}}

		</div>

	</body>

	<script type="text/javascript">
		//			编译函数
		function compile(node, vm) {

			var reg = /\{\{(.*)\}\}/; // 来匹配{{xxx}}中的xxx

			//如果是元素节点
			if(node.nodeType === 1) {

				var attr = node.attributes;

				//解析元素节点的所有属性

				for(let i = 0; i < attr.length; i++) {

					if(attr[i].nodeName == 'v-model') {

						var name = attr[i].nodeValue 
/*只需要绑定该元素的监听函数并且在初始化的时候展示data中的数据*/
						node.addEventListener('input', function(e) { 
							vm[name] = e.target.value
						})

						node.value = vm.data[name]; //将data中的值赋予给该node，会让对应data数据将该watcher添加到数据的dep当中

						node.removeAttribute('v-model')

					}

				}

			}

			//如果是文本节点

			if(node.nodeType === 3) {

				if(reg.test(node.nodeValue)) {

					var name = RegExp.$1; //获取到匹配的字符串

					name = name.trim();

					//node.nodeValue = vm[name]; //将data中的值赋予给该node

					new Watcher(vm, node, name) //绑定一个观察者
				}

			}

		}

		//在向碎片化文档中添加节点时，每个节点都处理一下

		function nodeToFragment(node, vm) {

			var fragment = document.createDocumentFragment();

			var child;

			while(child = node.firstChild) {

				compile(child, vm);

				fragment.appendChild(child);

			}

			return fragment

		}

		//			Vue构造函数     
		//		观察data中的所有属性值，注意增添了observe

		function Vue(options) {

			this.data = options.data;

			observe(this.data, this)

			var id = options.el;

			var dom = nodeToFragment(document.getElementById(id), this)

			//处理完所有节点后，重新把内容添加回去
			document.getElementById(id).appendChild(dom)

		}

		//		实现一个响应式监听属性的函数。一旦有赋新值就发生变化 

		function defineReactive(obj, key, val) {

			var dep = new Dep();

			Object.defineProperty(obj, key, {

				get: function() {

					if(Dep.target) {

						dep.addSub(Dep.target)

					}

					return val

				},
				set: function(newVal) {

					if(newVal === val) {

						return

					}

					val = newVal;

					console.log('新值' + val);

					//一旦更新立马通知

					dep.notify();

				}

			})

		}

		//		实现一个观察者，对于一个实例 每一个属性值都进行观察。

		function observe(obj, vm) {

			for(let key of Object.keys(obj)) {

				defineReactive(vm, key, obj[key]);

			}

		}

		//		Watcher监听者

		function Watcher(vm, node, name) {

			Dep.target = this;

			this.vm = vm;
			this.node = node;
			this.name = name;

			this.update();

			Dep.target = null;

		}

		Watcher.prototype = {

			update() {
				this.get();
				this.node.nodeValue = this.value //更改节点内容的关键
			},
			get() {
				this.value = this.vm[this.name] //触发相应的get
			}

		}

		//		dep构造函数

		function Dep() {
			this.subs = []
		}
		Dep.prototype = {
			addSub(sub) {
				this.subs.push(sub)
			},
			notify() {
				this.subs.forEach(function(sub) {
					sub.update();
				})
			}
		}

		var vm = new Vue({

			el: 'app',

			data: {
				text: '赵刚'
			}

		})
	</script>

</html>
```
## 依赖收集
- vue2引入虚拟dom，组件级别是一个watcher实例，即使一个组件内有10个节点使用了某个状态，单其实也只有一个watcher在观察这个状态的变化，只能通知到当前的组件，然后组件内部去通过虚拟dom比对与渲染，
使用虚拟dom的优势
 - 直接使用状态生成真实dom会有一定程度的性能浪费，使用虚拟dom，可以讲虚拟节点缓存，比对上一次渲染时缓存的虚拟dom，根据对比结果只更新需要更新的真实dom，从而避免不必要的dom操作。节省一定的性能开销
 - 粒度：当状态发生变化时，只通知到组件级别，然后组件内使用虚拟dom来渲染视图，也就是说只要组件使用的状态中有一个发生变化，那么整个组件就要重新渲
 - 如果组件只有一个节点发生变化，那么重新渲染整个组件的所有节点
- computed watch 并不会立刻求值，同时持有一个dep实例
- 求值：判断是否dirty，，如果是通过get优质，然后设置为false，
- 以$开头的属性是提供给用户的外部属性，以_开头的属性是提供给内部使用的属性，
- 初始化事件，将父组件在模板中注册的时间添加到子组件的时间系统
- 如果v-on写在组件标签上则该时间会注册到子组件的事件系统中，如果是平台标签则是浏览器事件
- provide和inject主要为告诫插件组件库提供用例，并不推荐直接用于程序代码中，并在其上下游关系成立的时间里始终生效
- 组件的_watchers得到当前示例中所注册的所有watcher示例，并
- prop初始化：1. 格式化 2. 一个是调用 defineReactive 方法把每个 prop 对应的值变成响应式，可以通过 vm._props.xxx 访问到定义 props 中对应的属性
- props 或是 data 的初始化都是把它们变成响应式对象
- proxy 方法的实现很简单，通过 Object.defineProperty 把 target[sourceKey][key] 的读写变成了对 target[key] 的读写，所以对于 props 而言，对 vm._props.xxx 的读写变成了 vm.xxx 的读
vue双向数据绑定
已经了解到vue是通过数据劫持的方式来做数据绑定的，其中最核心的方法便是通过Object.defineProperty()来实现对属性的劫持，达到监听数据变动的目的，无疑这个方法是本文中最重要、最基础的内容之一，如果不熟悉defineProperty，猛戳这里 整理了一下，要实现mvvm的双向绑定，就必须要实现以下几点：
 1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者 
2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数 
3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图 
4、mvvm入口函数，整合以上三者



 


在实例化一个Vue对象的时候，会传进去一个data对象，执行两个函数
一个函数是对挂载目标元素模板里的v-model和{{ }}；两个指令进行编译。
另一个是对传进去的data对象里面的数据进行监听。
    上图中，observe是利用Object.defineProperty()对传入的data对象进行数据监听，在数据改变的时候触发该属性的set方法，更新该属性的值，并发布消息，我（该属性）的值变了。
    compile是编译器，找到vue的指令v-model所在的元素，将data中该属性的值赋给元素的value，并给这个元素添加二级监听器，在元素的值改变的时候，将新值赋给data里面同名属性，这个时候就完成了单向数据绑定，视图 >> 模型。
    那么最终的由模型到视图的更新，依赖于dep和watcher，dep会收集订阅者，就是绑定了data里面属性的元素，在数据更新的时候，会触发该属性的set方法，在set里触发该属性的消息发布通知函数。而Watcher根据收到的数据变化通知，更新相应的数据。 
    dep这个东东给大家解释一下，就是data里的每个属性都有一个dep对象，dep对象里可以有很多订阅者（watcher），但是只有一个添加订阅者的方法和一个发布变化通知的方法，就是模板上可以有多处元素绑定data里的同一个属性值，所以dep是依赖于data里面的属性的。
    而Watcher是每个{{ }}有一个，初次编译的时候，会在new的时候自动更新一下模板的数据，等到下次数据改变的时候，由dep通知数据更新，直接调用watcher的update方法，更新模板的绑定数据。
！！！！
每一个data数据都有一个dep，在setter里面也就是数据发生变化的时候，去让该data数据的dep去通知视图中每一个跟该数据相关的视图上的node节点，因为每一个具有双向绑定的节点都有一个watcher，dep会通知该数据的所有watcher去调用该watcher的update函数，更新视图从而实现从数据到视图的更新。
从视图到数据的更新也就是通过在初始化编译的时候绑定监听函数。


链接：https://www.jianshu.com/p/ed19b36bc324
### vue-router原理
#代表网页中的一个位置。其右面的字符，就是该位置的标识符，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页。改变#会改变浏览器的访问历史，window.location.hash这个属性可读可写，onhashchange事件
这是一个HTML 5新增的事件，当#值发生变化时，就会触发这个事件，http://twitter.com/#!/username
就会自动抓取另一个URL：
　　http://twitter.com/?_escaped_fragment_=/username
通过这种机制，Google就可以索引动态的Ajax内容。
只有将#转码为%23，浏览器才会将其作为实义字符处理

我们可以通过javascript对象表示的树结构来构建一棵真正的dom树，当数据状态发生变化时，可以直接修改这个javascript对象，接着对比修改后的javascript对象，记录下需要对页面做的dom操作，然后将其应用到真正的dom树，实现视图的更新，这个过程就是Virtual DOM的核心思想。

### mvvm的理解
视图（view）：用户界面
控制器（controller）：业务逻辑
模型（model）：数据保存
通信方式如下：
view传送指令到controller
controller完成业务逻辑后，model改变状态
model将新的数据发送到view，用户得到反馈
Vue的mvvm主要就是view层、model层、viewModel层
    唯一的区别是MVVM采用了双向数据绑定，view的变动自动反映在view-model。Vue.js、
那么这么多MVVM框架的诞生是为了解决什么问题？
    如何处理数据的更新和界面的更新。通过操作数据会自动反应到界面而不用操作dom来实现更新

### 虚拟 DOM 引入最大的好处就是：
组件的高度抽象化
可以更好的实现 SSR，同构渲染等
框架跨平台
尤大神说的！vdom 把渲染过程抽象化了，从而使得组件的抽象能力也得到提升，并且可以适配 DOM 以外的渲染目标
说到DOM-diff那一定要清楚其存在的意义，给定任意两棵树，采用先序深度优先遍历的算法找到最少的转换步骤
DOM-diff比较两个虚拟DOM的区别，也就是在比较两个对象的区别。
作用： 根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新DOM
补丁就是需要diff的内容

## 虚拟dom实现

https://juejin.im/post/5d36cc575188257aea108a74#heading-16
只比较同层节点，如果不同，那么即使该节点的子节点没变化，我们
也不复用，直接将从父节点开始的子树全部删除，然后再重新创建节点添加到新的位置。如果父节点
没变化，我们就比较所有同层的子节点，对这些子节点进行删除、创建、移位操作（通过四个索引：）

虚拟dom的实现主要是进行同层级递归地进行深度优先遍历的的对比
在深度优先遍历的时候，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。
通过列表对比算法判断移动的最小距离
所以我们定义了几种差异类型：
var REPLACE = 0
var REORDER = 1
var PROPS = 2
var TEXT = 3
替换，排序，属性，文本节点
对于节点替换，很简单。判断新旧节点的tagName和是不是一样的，如果不一样的说明需要替换掉
因为tagName是可重复的，不能用这个来进行对比。所以需要给子节点加上唯一标识key，列表对比的时候，使用key进行对比，这样才能复用老的 DOM 树上的节点
通过动态规划求解，时间复杂度为 O(M * N)。但是我们并不需要真的达到最小的操作，我们只需要优化一些比较常见的移动情况，牺牲一定DOM操作，让算法时间复杂度达到线性的（O(max(M, N))。
根据不同类型的差异对当前节点进行 DOM 操作，在真正的DOM元素上应用变更
通过在同层级间对比
updatechildrent方法，通过新旧虚拟dom的首尾判断，来进行一个添加，删除，移位
如果新旧节点的首节点相同就直接更新首节点，如果

判断两节点是否值得比较，值得比较则执行patchVnode不值得比较则用Vnode替换oldVnode
patchVnode函数主要是对虚拟dom对比进行更新
在 patch 方法中，我们看到会分为两种情况，
一种是当 oldVnode 不存在时，会创建新的节点；另一种则是已经存在 oldVnode ，那么会对 oldVnode 和 vnode 进行 diff 及 patch 的过程。其中 patch 过程中会调用 sameVnode 方法来对对传入的2个 vnode 进行基本属性的比较，只有当基本属性相同的情况下才认为这个2个vnode 只是局部发生了更新，然后才会对这2个 vnode 进行 diff，如果2个 vnode 的基本属性存在不一致的情况，那么就会直接跳过 diff 的过程，进而依据 vnode 新建一个真实的 dom，同时删除老的 dom节点。
function sameVnode (a, b) { return ( a.key === b.key && a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) ) }
当 oldCh 和 ch 都存在且不相同的情况下，调用 updateChildren 对子节点进行 diff

主要是对比他们的子节点，如果两者都有子节点，则执行updateChildren函数比较子节点
updatechildren函数
有新旧节点的虚拟dom的首尾节点作为指针索引，在通过这四个指针对应的dom节点进行对比，如果新旧首节点一致，就
用一个while循环
这个循环的结束条件是直到oldCh或者newCh被遍历完后跳出循环

patch
来看看patch是怎么打补丁的（代码只保留核心部分）
patch函数接收两个参数oldVnode和Vnode分别代表新的节点和之前的旧节点
判断两节点是否值得比较，值得比较则执行patchVnode
不值得比较则用Vnode替换oldVnode
如果两个节点都是一样的，那么就深入检查他们的子节点。如果两个节点不一样那就说明Vnode完全被改变了，就可以直接替换oldVnode。
当我们确定两个节点值得比较之后我们会对两个节点指定patchVnode方法。那么这个方法做了什么呢？
找到对应的真实dom，称为el
判断Vnode和oldVnode是否指向同一个对象，如果是，那么直接return
如果他们都有文本节点并且不相等，那么将el的文本节点设置为Vnode的文本节点。
如果oldVnode有子节点而Vnode没有，则删除el的子节点
如果oldVnode没有子节点而Vnode有，则将Vnode的子节点真实化之后添加到el
如果两者都有子节点，则执行updateChildren函数比较子节点，这一步很重要



## SSR
什么是服务端渲染，简单理解是将组件或页面通过服务器生成html字符串，再发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应用程序。 于传统的SPA（单页应用）相比，服务端渲染能更好的有利于SEO，减少页面首屏加载时间，当然对开发来讲我们就不得不多学一些知识来支持服务端渲染。同时服务端渲染对服务器的压力也是相对较大的，和服务器简单输出静态文件相比，通过node去渲染出页面再传递给客户端显然开销是比较大的，需要注意准备好相应的服务器负载。



### vue不同版本区别

完整版：同时包含编译器和运行时的版本。
编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码。
运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。

### 渲染方法顺序

- el，template，render(渲染函数)都是vue对象对应的HTML元素（DOM对象）
- 优先级顺序：el < template < render
- el对应的HTML元素是写在网页上的。


注意：
- 只有template，是不行的，因为，vue对象不知道把template放在何处；
- 只有render（渲染）函数,也是不行的，因为，vue对象不知道把render后的结果放在何处；
- 既有el又有template，就会用template里的内容替换el的outterHTML。

