## 总结

- vue2 和 vue3 响应式区别
	- 抽离响应式为 reactivity 模块
		- 可对外暴露使用，而不是 vue2 仅仅内部渲染层
	- 从 defineProperty 换成 Proxy
		- 解决了 Vue2 新增属性、数组监听的固有缺陷
		- 更新力度更可控更加细
		- 惰性代理
- nextTick
	- 回调执行时，vue 内部的所有渲染更新和处理都已经处理完成，最新的 dom 都能拿到，只等待浏览器执行 layout 布局计算更新到屏幕上了
	- 微任务优先 Promise/MutationObserver，降级 setTimeout
- 虚拟 dom
	- diff
		- 共有同层比较，深度优先遍历，key 做唯一标识；双端 diff 算法
		- vue3
			- 预处理：头尾节点先快速比对，减少遍历范围；
			- 中间乱序节点通过最长递增子序列，只移动必要节点，减少 DOM 移动次数；
		- 静态标记提升：静态节点跳过 diff，编译阶段优化。
	- 延迟更新
		- 虚拟 DOM 的对比和创建真实的 createElement DOM 节点都是一起完成的，只不过把最后一步把这个 dom 节点这个逻辑拆分开来
			- 不只是新建插入节点会延迟，**所有对真实 DOM 的增、删、改、移、属性更新操作，全部会先缓存，等到同步代码执行完毕后批量一次性执行**。
		- 减少回流 / 重绘次数
		- 避免无效重复 DOM 操作
		- mounted 直接打印 ref → null → 加 nextTick 解决
			- 因为 mounted 时，dom 节点还未更新到页面中
- 生命周期
	- 父 beforeMount→子 beforeCreate→子 created→子 beforeMount→子 mounted→父 mounted；

## vue3 和 vue2 响应式原理区别

### vue3 响应式原理

- 宏观流程上，Vue2 和 Vue3 响应式都遵循「数据劫持、读取收集依赖、修改派发更新」三段式骨架，粗看流程相似；
	- 抽离响应式为 reactivity 模块
		- Vue2 响应式内核和 Vue 组件实例深度绑定，依赖收集、更新触发只能跟随框架渲染生命周期自动执行，用户无法干预，最小更新粒度是整个组件；
		- Vue3 将整套响应式逻辑抽离成独立 reactivity 模块，和渲染层解耦。框架内部渲染依旧会自动执行 track/trigger，同时对外暴露了 effect、track、trigger 等底层 API，开发者可以脱离组件手动创建响应式数据、自定义副作用，自主控制依赖收集和更新触发时机；
	- 除此之外，劫持 API 从 defineProperty 换成 Proxy，实现了惰性代理，解决了 Vue2 新增属性、数组监听的固有缺陷，同时 effect 具备自定义调度能力，更新粒度细化到单个副作用，不再是组件整体刷新。

#### 第一层：必答（API 劫持层，所有人都会说）

1. Vue2：使用 `Object.defineProperty` 遍历对象已有属性，逐个劫持 getter/setter；
2. Vue3：使用 `Proxy` 代理整个目标对象，搭配 `Reflect` 做属性操作。

顺带带上 API 天然缺陷，一句话补齐：

- defineProperty：监听不到对象新增、删除属性；数组下标、length 修改无法监听，需要 `$set` 补丁；初始化递归深度遍历嵌套对象，大对象初始化性能差。
- Proxy：原生支持增删属性、数组全部操作、Map/Set 等集合；惰性代理，访问嵌套子对象时才创建 Proxy，初始化更快。

proxy 解决的问题

- **增删属性**：defineProperty 监听不到，需 $set；Proxy set/deleteProperty 原生拦截
- **数组操作**：下标、length 不响应，重写 7 个方法打补丁；Proxy 全部原生监听
- **递归劫持**：初始化全量递归，慢；Proxy 懒代理，用到才劫持，首屏更快
- **操作类型**：仅能读写 key；Proxy 支持 13 种元操作，兼容 Map/Set

#### 第二层：核心原理架构区别（拉开 5 年经验差距，重点）

这才是原理层面真正的不同，不只是换了劫持 API：

##### 1. 依赖 & 更新单元不同

- Vue2：一个组件对应**唯一渲染 Watcher**，组件内所有响应式数据共用这一个 Watcher，数据变化只能整组件重新渲染，更新粒度是组件级；额外的 watch 单独生成 Watcher，全部强绑定组件实例。
- Vue3：以 `effect` 副作用为最小执行单元，一个组件可以存在多个独立 effect（渲染 effect、多个 watch、多个 computed），哪个副作用依赖的数据变动，就只执行当前 effect，细粒度更新；effect 和组件解耦。

##### 2. 响应式模块耦合度天差地别

- Vue3：将整套响应式 原理 `@vue/reactivity` 拆成独立模块，和 DOM、渲染层完全解耦，可以单独使用；

两种运行模式并存：

① 组件模板渲染：框架自动创建渲染 effect，全自动执行，无感；

② 开发者可手动导入 `effect/track/trigger`，脱离组件自由操控响应式逻辑。

##### 3. 调度机制升级

- Vue3：effect 支持自定义 `scheduler` 调度器，可自主控制副作用执行时机、防抖、调整更新优先级，computed、批量更新、父子组件渲染顺序都基于调度器实现。

#### 第三层：衍生配套 API 设计差异（顺带补充）

2. Vue3 分层提供 `ref/reactive/shallowRef/shallowReactive`，开发者按需选择深浅代理，做大列表等场景可手动优化内存与性能。

### 虚拟 DOM + diff 算法，Vue2 和 Vue3 diff 区别

3. 虚拟 DOM：JS 对象描述 DOM 结构，对比新旧 VNode，最小量更新真实 DOM，减少 DOM 操作。
4. Vue2 diff：同层比较，key 做唯一标识；双端 diff（头头、尾尾、头尾、尾头），乱序节点移动复用；无 key 就地复用，节点错乱。
5. Vue3 diff 优化（最长递增子序列）：
	- 预处理：头尾节点先快速比对，减少遍历范围；
	- 中间乱序节点通过最长递增子序列，只移动必要节点，减少 DOM 移动次数；
	- 静态标记、静态提升：模板静态节点直接跳过 diff，编译阶段优化。

#### （3）Vue 生命周期，父子组件执行顺序，异步场景生命周期踩坑

1. 完整生命周期：创建、挂载、更新、销毁 4 大阶段；
2. 父子执行顺序：

	父 beforeCreate→created→beforeMount→子 beforeCreate→子 created→子 beforeMount→子 mounted→父 mounted；

	更新：父 beforeUpdate→子 beforeUpdate→子 updated→父 updated；

	销毁：父 beforeUnmount→子 beforeUnmount→子 unmounted→父 unmounted。

3. 实战坑：mounted 获取不到子组件 DOM/ref，$nextTick 解决；异步接口写在 created 即可发请求，mounted 仅用于 DOM 操作。

#### $nextTick

JS 执行栈清空 → 微任务队列执行（nextTick） → 布局 Layout（回流） → 绘制 Paint（重绘） → 图层 Composite 合成

>`$nextTick` 回调执行时，Vue 内部的渲染队列已全部执行完成：新旧虚拟 DOM 完成 diff 比对，并且通过原生 DOM API 把变更落地到了真实 DOM 树中，DOM 节点内容、属性、层级都已是最新状态；仅剩浏览器还没有执行本轮事件循环的 Layout（回流）、Paint（重绘）、图层合成流程，页面还没有刷新展示在屏幕上。

原理：异步队列（微任务优先 Promise/MutationObserver，降级 setTimeout），DOM 更新是异步的，修改数据后 DOM 不会立刻更新，$nextTick 在 DOM 渲染完成后执行回调。

使用场景：

1. 修改数据后立刻通过 ref 获取最新 DOM 元素；
2. 动态渲染列表后操作滚动、DOM 尺寸；
3. v-if 切换组件后立即操作组件实例。

配套拆分两个边界场景巩固

DOM 树更新 ≠ 屏幕可见。

- JS 操作 DOM 只是修改内存里的文档树结构，属于 JS 引擎层面工作；Layout/Paint 是渲染引擎工作，二者在事件循环里串行执行，这也是 nextTick 能提前拿到最新 DOM，但页面肉眼还没变化的根本原因。

nextTick 保证框架渲染、虚拟 DOM diff、真实 DOM 树修改全部执行完毕；只是浏览器后续布局、绘制还没运行，页面暂未刷新到屏幕上。

### Vue 组件通信（高频，区分场景选型）

1. 父子：props（父传子）、emit（子传父）、parent/$children、ref；
2. 跨层级：provide/inject（深层透传，不响应式，适合组件库）；
3. 任意组件：EventBus（小型项目）、Vuex/Pinia（全局状态）；
5. 高级：\(attrs/\)listeners 批量透传属性和事件。

### 3. Vue2 Vuex vs Vue3 Pinia（资深必问）

#### Vuex 痛点

1. 样板代码极多：mutation、action、getter 分层繁琐；
2. 必须 commit 修改 state，异步只能放 action；
3. 模块嵌套 namespace 复杂，TS 类型推导差；
4. 全局单例，多个实例共享状态不方便。

#### Pinia 优势

1. 去掉 mutation，state 可直接修改，简洁；
2. 天然模块化，每个 store 独立，无需 namespace；
3. TS 完美支持，类型自动推导；
4. 无 $store 注入，组合式 API 直接 import 使用，代码可拆分；
5. 内置 devtools，支持时间旅行、热更新。

### Vue 性能优化（项目实战，5 年经验重点）

#### 编译 / 渲染层

1. v-for 必须绑定 key，禁止 index 当 key（乱序复用出错）；
2. v-if 和 v-for 不同放同一标签，v-for 层级更高会全量循环；

#### 响应式优化

1. 大对象拆分，避免不必要的响应式；shallowRef/shallowShallowRef 浅层响应；
2. 大数据列表冻结 Object.freeze，不做响应式劫持；

#### 打包工程化

1. 路由懒加载 component:()=>import ()；
2. 图片压缩、cdn、gzip 压缩；
3. 第三方库按需引入（element-plus 自动导入插件）；
4. 分包策略，chunk 分割，减小首屏 bundle 体积；

## vue 组件通信

- 简单的，prop 和 emit
- 兄弟组件可通过父组件协调
- 祖先就用 provide，inject
- 复杂的状态管理用
	- 顶层 ref 封装 = **ref 定义在 JS 模块最外层（不是 Hook 函数内部），再用自定义 Hook 统一导出状态和修改方法**，实现当前子应用内单例全局共享，是微型状态库平替方案。