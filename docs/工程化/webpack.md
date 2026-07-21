## webpack

### [sourceMap](https://juejin.cn/post/6969748500938489892#heading-3)

Source map 就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。

目前，暂时只有 Chrome 浏览器支持这个功能。在 Developer Tools 的 Setting 设置中，确认选中 "Enable source maps"。

#### 如何启用 Source map

正如前文所提到的，只要在转换后的代码尾部，加上一行就可以了。

//@ sourceMappingURL=/path/to/file.js.map

[devtool配置](https://www.webpackjs.com/configuration/devtool/#devtool)

## 1. 拆分单词含义（核心，记住单词就懂作用）

- source-map·： 产生 `.map` 文件
1. `eval`：代码包裹在 `eval()` 执行，构建速度最快，无单独 .map 文件
2. `cheap`：只映射**行号**，不映射列号，解析更快
3. `module`：映射回原始源码（TS/SFC），否则只映射转译后代码
4. `inline`：将 `.map` 作为 DataURI 嵌入，不单独生成 `.map` 文件（这个配置项比较少见）,减少文件数
5. `hidden`：生成 map 文件，但 JS 里不携带 sourceMappingURL，线上不暴露源码

sourcemap 靠四个关键词区分：eval (快、无独立 map)、cheap (只行号)、module (原始源码)、inline/hidden (文件输出形式)。

日常开发统一使用 eval-cheap-module-source-map；生产环境使用 hidden-source-map。

## 2. 组合优先级记忆（开发首选固定组合）

开发环境标准：`eval-cheap-module-source-map`

拆解记忆顺序：eval + cheap + module

- eval：速度快
- cheap：只看行，提速
- module：定位原始 TS/Vue 源码，调试友好

## 3. 生产环境两类

1. `hidden-source-map`：生成独立 map，但不暴露给前端，而是给 sentry 用，线上报错后台解析用
2. `source-map`：完整独立 map，体积大，极少直接上线

### 参考

- [JavaScript Source Map 详解](https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

## 模块热替换 (hot module replacement)

## 原理

- **建立 websocket 长连接监听文件改动；**
- 重新编译改动模块，生成**新 chunk**；/ 这里如果是 vite，仅仅重新编译**变动文件**
- 浏览器拉取新模块，替换旧模块实例。

模块热替换 (HMR - Hot Module Replacement) 功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

### 关键实现

1. HotModuleReplaceMentPlugin 插件实现了什么？

- HotModuleReplacementPlugin 为我们提供了一系列关于 HMR 的 API 而其中 最关键的部分则是 hot.accept
- 在 HMR 已开启的情况下，我们可以通过访问全局的 module 对象下的 hot 成员它提供了一个 accept 方法，这个方法用来注册当某个模块更新以后需要如何处理，它接受两个参数 一个是需要监听模块的 path(相对路径)，第二个参数就是当模块更新以后如何处理 其实也就是一个回调函数

```js

// main.js

// 监听 child 模块变化

module.hot.accept("./child", () => {

console.log(" 老板好，child 模块更新啦～");

});

```

2. 为什么能够保留应用的状态？

- webpack 在检测到更新的模块时，会将新模块交给对应的 loader 处理。css 可以实现热更新的原因是因为 style-loader 支持了，js 部分入侵性比较强，但是也有对应的 loader 来处理。我没记错的话，vue-loader 也是实现了热更新，react 里面有对应的 loader
- 如果没有实现对应模块 hmr 的 accept 更新回调函数，则直接使用 live-reload 刷新页面

### 总结

构建 bundle 的时候，加入一段 HMR runtime 的 js 和一段和服务沟通的 js 。文件修改会触发 webpack 重新构建，服务器通过向浏览器发送更新消息，浏览器通过 jsonp 拉取更新的模块文件，jsonp 回调触发模块热替换逻辑。

### 参考

1. [120 行代码帮你了解 Webpack 下的 HMR 机制](https://juejin.cn/post/6973825927708934174#heading-8)
2. [搞懂 webpack 热更新原理](https://github.com/careteenL/webpack-hmr)

## webpack 模块加载原理

**webpack_require**.e ——使用 JSONP 动态加载

```js
// 使用 JSONP
var head = document.getElementsByTagName("head")[0];
var script = document.createElement("script");

script.charset = "utf-8";
script.timeout = 120;

if (__webpack_require__.nc) {
  script.setAttribute("nonce", __webpack_require__.nc);
}
// 获取目标chunk的地址，__webpack_require__.p 表示设置的publicPath，默认为空串
script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
// 请求超时的时候直接调用方法结束，时间为 120 s
var timeout = setTimeout(function() {
  onScriptComplete({ type: "timeout", target: script });
}, 120000);
script.onerror = script.onload = onScriptComplete;
// 设置加载完成或者错误的回调
function onScriptComplete(event) {
  // avoid mem leaks in IE.
  // 防止 IE 内存泄露
  script.onerror = script.onload = null;
  clearTimeout(timeout);
  var chunk = installedChunks[chunkId];
  // 如果为 0 则表示已加载，主要逻辑看 webpackJsonpCallback 函数
  if (chunk !== 0) {
    if (chunk) {
      var errorType = event && (event.type === "load" ? "missing" : event.type);
      var realSrc = event && event.target && event.target.src;
      var error = new Error(
        "Loading chunk " +
          chunkId +
          " failed.\n(" +
          errorType +
          ": " +
          realSrc +
          ")"
      );
      error.type = errorType;
      error.request = realSrc;
      chunk[1](error);
    }
    installedChunks[chunkId] = undefined;
  }
}
head.appendChild(script);
```

## [treeShaking 原理](https://segmentfault.com/a/1190000022194321)

- 传统的编译语言，编译器就可以到删除 Dead Code，但是 JS 是动态语言，编译器无法做到，我们需要借助打包工具实现消除 dead Code
- 借助 ESM 的静态结构分析，找到没有引入的模块打上标记，在压缩阶段利用 uglify-js 这样的压缩工具删除无用代码

需要满足

- 打包环境 `production` 模式
- 导入是**具名静态解构导入**，不是全量导入 / 动态导入
- 包正确配置 `sideEffects`
- 依赖内部没有混写 CommonJS

## 图片资源和 css 资源是如何解析的

[24.重学webpack——loader的原理及常用loader的实现（高频面试题）_俞华的博客-CSDN博客](https://blog.csdn.net/qq_17175013/article/details/119425847)

**asset-loader**

- [raw-loader](https://www.webpackjs.com/loaders/raw-loader/)：加载文件原始内容（utf-8）
- [val-loader](https://www.webpackjs.com/loaders/val-loader/)：将代码作为模块执行，并将 exports 转为 JS 代码
- [url-loader](https://www.webpackjs.com/loaders/url-loader/)：像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
- [file-loader](https://www.webpackjs.com/loaders/file-loader/)：将文件发送到输出文件夹，并返回（相对）URL

## 常见 loader 和 plugin

webpack4

资源处理，webpack5 为 asset 内置模块了

- 资源文件处理
	- [`raw-loader`](https://v4.webpack.js.org/loaders/raw-loader/) 将文件导入为字符串
	- [`url-loader`](https://v4.webpack.js.org/loaders/url-loader/) 将文件作为 data URI 内联到 bundle 中
	- [`file-loader`](https://v4.webpack.js.org/loaders/file-loader/) 将文件发送到输出目录
- css 相关 loader
	- css-loader 处理 CSS 的 import 依赖关系
	- style loader
	- SCSS loader
	- PostCSS loader。
- 其他语言
	- babel-loader
	- vue-loader
	- ts-loader

常用 Plugin（极简）

1. HtmlWebpackPlugin：生成 html
2. MiniCssExtractPlugin：生产抽离 CSS 文件
3. DefinePlugin：注入环境变量
4. TerserPlugin：压缩 JS
5. CopyWebpackPlugin：复制静态资源
6. ModuleFederationPlugin：模块联邦微前端

## 参考资料

- [Webpack Guidebook - 📚 Webpack 知识图谱：模块化、基础概念、工作原理、实战应用 - Webpack Guidebook](https://tsejx.github.io/webpack-guidebook/)

## Loader 和 Plugin 区别

1. **Loader**：文件转换器，只处理单个文件，输入源码、输出转换后代码；执行顺序：从右往左、从下往上；

	例子：babel-loader、css-loader、file-loader。

	- 作用：**资源格式转换**，串行处理单个文件，生命周期只在「模块加载阶段」

2. **Plugin**：插件，贯穿整个构建生命周期，能拿到整个编译上下文、chunk、bundle，可做全局操作；

	例子：HtmlWebpackPlugin、MiniCssExtractPlugin、DefinePlugin。

题目

去除项目的 console 代码应该用 plugin 还是 loader

- 用 plugin，统一后置处理去除 console，工程效率最高
- 只在打包末尾统一处理一次，性能更高；
- 1. 业务代码 + 第三方依赖代码全部生效；
1. 顺带做代码压缩、变量混淆，一举两得。

用 loader 的缺点

- 每个文件都单独解析一次 AST，重复消耗性能；
- 仅处理源码，无法处理打包合并后的 chunk 代码；
- 第三方依赖包里的 console 删不掉。

Less/Sass 转 CSS（sass-loader），也可以放到所有 less 文件集中后再转用 plugin 吗

- `sass-loader` 本质是**单文件级编译**：每一个 `.less/.scss` 文件单独交给 sass 编译器解析，处理变量、嵌套、mixin、@import 导入。
- 样式文件的 `@import` 依赖解析失效。`.scss` 内部 `@import "./var.scss"` 是 Sass 自身语法，不是 JS import。
- 无法和 css-loader 串联配合
- 构建缓存、增量构建完全失效
	- loader 是单文件粒度缓存，修改一个组件 scss，只重新编译这一个文件；
	- Plugin 全部收集后一次性编译，只要任意一个样式文件改动，全部样式都要重新编译，构建速度大幅下降。

