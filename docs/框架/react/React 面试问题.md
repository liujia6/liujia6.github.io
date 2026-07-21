
---

## 总结

- 为什么 react 要自己实现一套自定义事件
	- 第一，统一不同浏览器的事件行为，提供一致的 API；
	- 第二，通过事件委托减少大量事件监听器的注册成本；
	- 第三，方便 React 接管事件触发的更新流程，例如结合 Scheduler 进行优先级调度和批量更新。
- 为什么 if 条件不能包含 hook （这里的 hook 指的是 react 原生的 hook 例如 useState，useEffect）
	- React 保存 Hook 状态时并不是通过变量名，而是通过 Hook 的调用顺序来建立对应关系。组件每次 Render 时，React 都会按照相同顺序依次读取 Hook 状态。
	- 如果 Hook 写在 if、for 或其他条件逻辑中，某次 Render 可能执行，某次不执行，导致 Hook 调用顺序发生变化，后面的 Hook 状态全部错位，因此 React 要求 Hook 必须在组件顶层调用。
- useReducer 更适合状态机或复杂状态转换场景，它的设计更多是承载 Redux 的 reducer 思想，而不是推荐作为日常状态管理方式。

## 一、React 基础（必问）

1. [x] React 核心特性？
	- [x] 声明式、组件化、单向数据流、虚拟 DOM、JSX、可复用 / 可组合。
2. [x] JSX 是什么？为什么要编译？和 HTML 区别？
	- [x] JSX 是语法糖，编译成 `React.createElement`；
	- [x] 区别：className/htmlFor、表达式 `{}`、大小写（组件大写）、防止 XSS。
1. [x] 虚拟 DOM & Diff 算法原理？为什么快？
	- [x] 虚拟 DOM：JS 对象描述 DOM，更新后对比差异，最小化真实 DOM 操作；
	- [x] Diff 策略：同层比较、同类型复用、key 唯一标识，复杂度 O (n)；
	- [x] 虚拟 dom 相对原生直接操作：不是一定比原生快，批量更新 + 减少重排才是优势。
1. [x] key 的作用？为什么不能用 index？
	- [x] key 帮 Diff 识别节点，复用 DOM，减少渲染；
	- [x] 列表增删 / 排序时，index 会导致状态错乱、DOM 复用错误。
1. [x] 类组件 vs 函数组件（Hooks）区别？
	- [x] 类：this、生命周期、state 复杂、代码重；
	- [x] 函数：Hooks、更简洁、逻辑复用（自定义 Hook）、无 this 问题；
	- [x] 现在趋势：函数组件 + Hooks。
1. [x] 受控组件 vs 非受控组件？场景？
	- [x] 受控：state 控制 value，实时可控、易校验（表单常用）；
	- [x] 非受控：DOM 存值，用 ref 拿，简单场景 / 第三方组件。
2. 事件机制：合成事件 vs 原生事件？执行顺序？
	- React 合成事件：事件委托、冒泡、跨浏览器一致；
	- 顺序：原生捕获 → 合成捕获 → 原生冒泡 → 合成冒泡；
	- 阻止冒泡：`e.stopPropagation()`（合成）、`e.nativeEvent.stopImmediatePropagation()`（原生）。

---

## 二、Hooks 全家桶（重中之重）

### 1）useState

- [x] 更新是同步还是异步？
	- [x] React18：自动批处理，统一异步（合成事件 / 定时器 / 请求都合并）；
	- [x] 推荐函数式更新：`setCount(prev => prev+1)` 避免闭包。
- [x] state 为什么不可变？
	- [x] 直接改 state 不会触发渲染；必须新引用，方便 Diff 对比。

### 2）useEffect

- [x] 作用 & 依赖数组规则？
	- [x] 副作用：请求、订阅、DOM 操作、清理；
	- [x] 空依赖：挂载 + 卸载执行；有依赖：依赖变化执行；漏依赖→闭包陷阱。

>1. `useEffect(()=>{ return 清理函数 }, [])`
>副作用执行：挂载时运行一次副作用；
>清理函数：组件卸载时执行一次。
>
>并不是「空依赖同时执行挂载 + 卸载逻辑」，是两个不同时机分别触发「副作用回调」和「清理回调」，表述容易混淆。
> 2. 有依赖数组：
>依赖项更新 → 先执行上一轮的清理函数，再执行新副作用；
>
> 3. 漏写依赖，必然捕获旧的闭包变量，经典闭包陷阱。

- [x] useEffect vs useLayoutEffect？
	- [x] useEffect：异步，DOM 绘制后，不阻塞渲染（常用）；
	- [x] useLayoutEffect：同步，DOM 绘制前，改 DOM 防闪烁（慎用）。

### 3）useMemo / useCallback

- [x] 区别 & 用法？
	- [x] useMemo：缓存计算结果，避免重复计算（如列表过滤）；
	- [x] useCallback：缓存函数引用，防止子组件无效渲染（配合 React.memo）；
	- [x] React.memo 作用是拦截父更新带动的子无效渲染
- [x] 别滥用：简单计算不用，缓存成本 > 收益。

### 4）useRef

- [x] 用途？
	- [x] 存值：跨渲染不变、不触发更新；
	- [x] 拿 DOM 元素；穿透闭包。

### 5）useContext / useReducer

- Context 优缺点？
	- 优点：跨层级传值，避免 props drilling；
	- 缺点：一改全渲染，适合低频更新（主题 / 登录态）；
	- 优化：拆分多个 Context、原子化状态。
- useReducer 适用场景？
	- 复杂状态、多子状态、状态依赖、逻辑集中（类似 Redux）。

### 6）自定义 Hook

- 规则？
	- 以 `use` 开头；只在函数组件 / 其他 Hook 调用；不能在循环 / 条件 / 嵌套函数调用。

---

## 三、组件通信 & 状态管理

1. 组件通信方式？
	- 父子：props / 回调；
	- 兄弟：父组件中转 / 状态提升；
	- 跨级：Context / 自定义事件；
	- 全局：Redux / Zustand / Jotai。
2. Redux 核心？中间件？
	- 三原则：单一数据源、state 只读、纯函数 reducer；
	- 流程：action → reducer → state → view；
	- 中间件：redux-thunk（异步）、redux-saga、redux-toolkit（官方推荐）。
3. Redux vs Context？选型？
	- Context：内置、轻量、更新会全渲染，适合低频、小数据；
	- Redux：外部、可预测、中间件、DevTools，适合大型 / 高频 / 复杂状态。

---

## 四、生命周期（类组件 + Hook 对应）

- 类组件：
	- 挂载：constructor → render → componentDidMount；
	- 更新：render → componentDidUpdate；
	- 卸载：componentWillUnmount。
- Hook 对应：
	- componentDidMount → useEffect 空依赖；
	- componentDidUpdate → useEffect 带依赖；
	- componentWillUnmount → useEffect 返回清理函数。

---

## 五、性能优化（必问，结合项目）

1. 常见优化手段？
	- 组件拆分：状态下放、减少父渲染牵连子；
	- 渲染阻断：React.memo + useCallback + useMemo；
	- 懒加载：React.lazy + Suspense；
	- 长列表：虚拟滚动（react-window）；
	- 减少重排：批量 DOM、脱离文档流；
	- 代码分割、资源压缩、CDN。
2. React.memo 原理？什么时候用？
	- 浅比较 props，props 不变则不重渲染；
	- 适合：纯展示组件、props 稳定、渲染重。

---

## 六、React 18 新特性（2026 高频）

1. 并发渲染（Concurrent）？
	- 渲染可中断、优先级调度、不阻塞主线程，输入更流畅。
2. 自动批处理（Automatic Batching）？
	- 所有场景（合成 / 原生 / 定时器 / 请求）自动合并 setState，减少渲染次数。
3. useTransition / useDeferredValue？
	- 标记非紧急更新，不阻塞高优先级渲染（如输入框即时响应）。
4. Server Components（RSC）？
	- 服务端渲染、零 JS 体积、更快加载，Next.js 默认开启。

---

## 七、项目实战 & 踩坑（你 1 年 React 重点）

1. 你项目中怎么用 Hooks？遇到什么坑？
	- 闭包陷阱：漏依赖、用旧值 → 补全依赖 / 函数式更新；
	- 依赖循环：state 和 effect 互相依赖 → 拆分逻辑 / 用 useReducer；
	- 性能问题：滥用 useMemo/useCallback → 只在必要时用。
2. 表单怎么处理？校验？
	- 受控组件 + useState；
	- 库：Formik + Yup / React Hook Form + Zod（性能更好）。
1. 接口请求怎么处理？loading/error/ 缓存？
	- useEffect + async/await；
	- 库：React Query / SWR（缓存、重试、自动刷新）。
2. 权限 / 路由怎么设计？
	- 路由守卫：高阶组件 / 自定义 Hook；
	- 动态路由：根据权限渲染路由表。

---

## 九、加分题（深度）

1. React Fiber 原理？为什么重构？
	- 重构原因：解决大渲染阻塞主线程；
	- Fiber：可中断、优先级调度、时间切片。
2. React 为什么单向数据流？
	- 数据可追溯、状态变化可预测、调试简单。

---

### 面试建议（适配你背景）

- 基础题：答原理 + 简单例子；
- 实战题：讲你项目中怎么用、解决什么问题、踩过什么坑；
- 新特性：了解 React18 核心概念，不用太深源码；
- 手写题：练 2-3 个核心 Hook，写清楚思路。

### 总结不可变性的三大好处

1. 性能极高： React 只需要用 $O(1)$ 的速度比对一下两个对象的内存地址，就能断定组件要不要更新，完全不需要费时费力去递归遍历。
2. 时间旅行 / 历史回溯（Time Travel）： 因为每一次状态改变都是一个全新的对象，React 很容易把过去的状态存进一个数组里。Redux 的撤销、恢复、以及 React DevTools 的调试功能，都高度依赖这种 " 留存历史快照 " 的能力。如果直接修改原对象，历史记录就会被直接覆盖抹除。
3. 可预测性（没有副作用）： 如果多个组件共享同一个复杂对象，一个组件悄悄把对象内部的属性改了，其他组件可能在毫无感知的情况下发生了异常。保持不可变性，能让数据流变得极度清晰和安全。  

### 合成事件

合成事件是 react 模拟原生 DOM 事件所有能力的一个事件对象，其优点如下：

- 兼容所有浏览器，更好的跨平台
- 将事件统一存放在一个数组，避免频繁的新增与删除（垃圾回收）。方便 react 统一管理和事务机制。
- 事件的执行顺序为原生事件先执行，合成事件后执行，合成事件会冒泡绑定到 document 上，所以尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到 document 上合成事件才会执行