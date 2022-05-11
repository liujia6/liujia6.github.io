[toc]

## [sourceMap](https://juejin.cn/post/6969748500938489892#heading-3)

Source map 就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。
有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。

目前，暂时只有 Chrome 浏览器支持这个功能。在 Developer Tools 的 Setting 设置中，确认选中"Enable source maps"。

### 如何启用 Source map

正如前文所提到的，只要在转换后的代码尾部，加上一行就可以了。
//@ sourceMappingURL=/path/to/file.js.map

### 类别

- eval： 使用 eval 包裹模块代码,利用字符串可缓存从而提效
- source-map·： 产生`.map`文件
- cheap： 不包含列信息（关于列信息的解释下面会有详细介绍)也不包含 loader 的 sourcemap
- module： 包含 loader 的 sourcemap（比如 jsx to js ，babel 的 sourcemap）,对于经由 babel 之类工具转义的代码，可以定位到转换后的代码
- inline： 将`.map`作为 DataURI 嵌入，不单独生成`.map`文件（这个配置项比较少见）,减少文件数

### 配置项最佳实践

#### 开发环境

- 我们在开发环境对 sourceMap 的要求是：快（eval），信息全（module），
- 且由于此时代码未压缩，我们并不那么在意代码列信息(cheap),

所以开发环境比较推荐配置：`devtool: cheap-module-eval-source-map`

#### 生产环境

- 一般情况下，我们并不希望任何人都可以在浏览器直接看到我们未编译的源码，
- 所以我们不应该直接提供 sourceMap 给浏览器。但我们又需要 sourceMap 来定位我们的错误信息，
- 一方面 webpack 会生成 sourcemap 文件以提供给错误收集工具比如 sentry，另一方面又不会为 bundle 添加引用注释，以避免浏览器使用。

这时我们可以设置`devtool: hidden-source-map`

### 参考

- [JavaScript Source Map 详解](https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

## 模块热替换(hot module replacement)

模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

- 保留在完全重新加载页面时丢失的应用程序状态。
  只更新变更内容，以节省宝贵的开发时间。
- 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。保留在完全重新加载页面时丢失的应用程序状态。
- 只更新变更内容，以节省宝贵的开发时间。
  调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。

### 关键实现

1. HotModuleReplaceMentPlugin 插件实现了什么？

   - HotModuleReplacementPlugin 为我们提供了一系列关于 HMR 的 API 而其中 最关键的部分则是 hot.accept

   - 在 HMR 已开启的情况下，我们可以通过访问全局的 module 对象下的 hot 成员它提供了一个 accept 方法，这个方法用来注册当某个模块更新以后需要如何处理，它接受两个参数 一个是需要监听模块的 path(相对路径)，第二个参数就是当模块更新以后如何处理 其实也就是一个回调函数

     ```js
     // main.js
     // 监听 child 模块变化
     module.hot.accept('./child', () => {
       console.log('老板好，child 模块更新啦～');
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
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');

script.charset = 'utf-8';
script.timeout = 120;

if (__webpack_require__.nc) {
  script.setAttribute('nonce', __webpack_require__.nc);
}
// 获取目标chunk的地址，__webpack_require__.p 表示设置的publicPath，默认为空串
script.src = __webpack_require__.p + '' + chunkId + '.bundle.js';
// 请求超时的时候直接调用方法结束，时间为 120 s
var timeout = setTimeout(function() {
  onScriptComplete({ type: 'timeout', target: script });
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
      var errorType = event && (event.type === 'load' ? 'missing' : event.type);
      var realSrc = event && event.target && event.target.src;
      var error = new Error(
        'Loading chunk ' +
          chunkId +
          ' failed.\n(' +
          errorType +
          ': ' +
          realSrc +
          ')'
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

- 传统的编译语言，编译器就可以醉哦到删除 Dead Code，但是 JS 是动态语言，编译器无法做到，我们需要借助打包工具实现消除 dead Code
- 借助 ESM 的静态结构分析，找到没有引入的模块打上标记，在压缩阶段利用 uglify-js 这样的压缩工具删除无用代码
