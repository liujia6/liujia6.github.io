import{_ as n,c as a,o as s,a as e}from"./app-B_HqqEoK.js";const p={},t=e(`<h1 id="webpack" tabindex="-1"><a class="header-anchor" href="#webpack"><span>webpack</span></a></h1><h2 id="sourcemap" tabindex="-1"><a class="header-anchor" href="#sourcemap"><span><a href="https://juejin.cn/post/6969748500938489892#heading-3" target="_blank" rel="noopener noreferrer">sourceMap</a></span></a></h2><p>Source map 就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。 有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。</p><p>目前，暂时只有 Chrome 浏览器支持这个功能。在 Developer Tools 的 Setting 设置中，确认选中&quot;Enable source maps&quot;。</p><h3 id="如何启用-source-map" tabindex="-1"><a class="header-anchor" href="#如何启用-source-map"><span>如何启用 Source map</span></a></h3><p>正如前文所提到的，只要在转换后的代码尾部，加上一行就可以了。 //@ sourceMappingURL=/path/to/file.js.map</p><p><a href="https://www.webpackjs.com/configuration/devtool/#devtool" target="_blank" rel="noopener noreferrer">devtool配置</a></p><h3 id="类别" tabindex="-1"><a class="header-anchor" href="#类别"><span>类别</span></a></h3><ul><li>eval： 使用 eval 包裹模块代码,利用字符串可缓存从而提效</li><li>source-map·： 产生 <code>.map</code>文件</li><li>cheap： 不包含列信息（关于列信息的解释下面会有详细介绍)也不包含 loader 的 sourcemap</li><li>module： 包含 loader 的 sourcemap（比如 jsx to js ，babel 的 sourcemap）,对于经由 babel 之类工具转义的代码，可以定位到转换后的代码</li><li>inline： 将 <code>.map</code>作为 DataURI 嵌入，不单独生成 <code>.map</code>文件（这个配置项比较少见）,减少文件数</li></ul><h3 id="配置项最佳实践" tabindex="-1"><a class="header-anchor" href="#配置项最佳实践"><span>配置项最佳实践</span></a></h3><h4 id="开发环境" tabindex="-1"><a class="header-anchor" href="#开发环境"><span>开发环境</span></a></h4><ul><li>我们在开发环境对 sourceMap 的要求是：快（eval），信息全（module），</li><li>且由于此时代码未压缩，我们并不那么在意代码列信息(cheap),</li></ul><p>所以开发环境比较推荐配置：<code>devtool: cheap-module-eval-source-map</code></p><h4 id="生产环境" tabindex="-1"><a class="header-anchor" href="#生产环境"><span>生产环境</span></a></h4><ul><li>一般情况下，我们并不希望任何人都可以在浏览器直接看到我们未编译的源码，</li><li>所以我们不应该直接提供 sourceMap 给浏览器。但我们又需要 sourceMap 来定位我们的错误信息，</li><li>一方面 webpack 会生成 sourcemap 文件以提供给错误收集工具比如 sentry，另一方面又不会为 bundle 添加引用注释，以避免浏览器使用。</li></ul><p>这时我们可以设置 <code>devtool: hidden-source-map</code></p><h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h3><ul><li><a href="https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html" target="_blank" rel="noopener noreferrer">JavaScript Source Map 详解</a></li></ul><h2 id="模块热替换-hot-module-replacement" tabindex="-1"><a class="header-anchor" href="#模块热替换-hot-module-replacement"><span>模块热替换(hot module replacement)</span></a></h2><p>模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：</p><ul><li>保留在完全重新加载页面时丢失的应用程序状态。 只更新变更内容，以节省宝贵的开发时间。</li><li>调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。保留在完全重新加载页面时丢失的应用程序状态。</li><li>只更新变更内容，以节省宝贵的开发时间。 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。</li></ul><h3 id="关键实现" tabindex="-1"><a class="header-anchor" href="#关键实现"><span>关键实现</span></a></h3><ol><li><p>HotModuleReplaceMentPlugin 插件实现了什么？</p><ul><li><p>HotModuleReplacementPlugin 为我们提供了一系列关于 HMR 的 API 而其中 最关键的部分则是 hot.accept</p></li><li><p>在 HMR 已开启的情况下，我们可以通过访问全局的 module 对象下的 hot 成员它提供了一个 accept 方法，这个方法用来注册当某个模块更新以后需要如何处理，它接受两个参数 一个是需要监听模块的 path(相对路径)，第二个参数就是当模块更新以后如何处理 其实也就是一个回调函数</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token comment">// main.js</span></span>
<span class="line"><span class="token comment">// 监听 child 模块变化</span></span>
<span class="line">module<span class="token punctuation">.</span>hot<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token string">&quot;./child&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;老板好，child 模块更新啦～&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>为什么能够保留应用的状态？</p><ul><li>webpack 在检测到更新的模块时，会将新模块交给对应的 loader 处理。css 可以实现热更新的原因是因为 style-loader 支持了，js 部分入侵性比较强，但是也有对应的 loader 来处理。我没记错的话，vue-loader 也是实现了热更新，react 里面有对应的 loader</li><li>如果没有实现对应模块 hmr 的 accept 更新回调函数，则直接使用 live-reload 刷新页面</li></ul></li></ol><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>构建 bundle 的时候，加入一段 HMR runtime 的 js 和一段和服务沟通的 js 。文件修改会触发 webpack 重新构建，服务器通过向浏览器发送更新消息，浏览器通过 jsonp 拉取更新的模块文件，jsonp 回调触发模块热替换逻辑。</p><h3 id="参考-1" tabindex="-1"><a class="header-anchor" href="#参考-1"><span>参考</span></a></h3><ol><li><a href="https://juejin.cn/post/6973825927708934174#heading-8" target="_blank" rel="noopener noreferrer">120 行代码帮你了解 Webpack 下的 HMR 机制</a></li><li><a href="https://github.com/careteenL/webpack-hmr" target="_blank" rel="noopener noreferrer">搞懂 webpack 热更新原理</a></li></ol><h2 id="webpack-模块加载原理" tabindex="-1"><a class="header-anchor" href="#webpack-模块加载原理"><span>webpack 模块加载原理</span></a></h2><p><strong>webpack_require</strong>.e ——使用 JSONP 动态加载</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token comment">// 使用 JSONP</span></span>
<span class="line"><span class="token keyword">var</span> head <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&quot;head&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">var</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;script&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">script<span class="token punctuation">.</span>charset <span class="token operator">=</span> <span class="token string">&quot;utf-8&quot;</span><span class="token punctuation">;</span></span>
<span class="line">script<span class="token punctuation">.</span>timeout <span class="token operator">=</span> <span class="token number">120</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span>__webpack_require__<span class="token punctuation">.</span>nc<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  script<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;nonce&quot;</span><span class="token punctuation">,</span> __webpack_require__<span class="token punctuation">.</span>nc<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 获取目标chunk的地址，__webpack_require__.p 表示设置的publicPath，默认为空串</span></span>
<span class="line">script<span class="token punctuation">.</span>src <span class="token operator">=</span> __webpack_require__<span class="token punctuation">.</span>p <span class="token operator">+</span> <span class="token string">&quot;&quot;</span> <span class="token operator">+</span> chunkId <span class="token operator">+</span> <span class="token string">&quot;.bundle.js&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// 请求超时的时候直接调用方法结束，时间为 120 s</span></span>
<span class="line"><span class="token keyword">var</span> timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">onScriptComplete</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;timeout&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">target</span><span class="token operator">:</span> script <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">120000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">script<span class="token punctuation">.</span>onerror <span class="token operator">=</span> script<span class="token punctuation">.</span>onload <span class="token operator">=</span> onScriptComplete<span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// 设置加载完成或者错误的回调</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">onScriptComplete</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// avoid mem leaks in IE.</span></span>
<span class="line">  <span class="token comment">// 防止 IE 内存泄露</span></span>
<span class="line">  script<span class="token punctuation">.</span>onerror <span class="token operator">=</span> script<span class="token punctuation">.</span>onload <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">var</span> chunk <span class="token operator">=</span> installedChunks<span class="token punctuation">[</span>chunkId<span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 如果为 0 则表示已加载，主要逻辑看 webpackJsonpCallback 函数</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>chunk <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>chunk<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">var</span> errorType <span class="token operator">=</span> event <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">&quot;load&quot;</span> <span class="token operator">?</span> <span class="token string">&quot;missing&quot;</span> <span class="token operator">:</span> event<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">var</span> realSrc <span class="token operator">=</span> event <span class="token operator">&amp;&amp;</span> event<span class="token punctuation">.</span>target <span class="token operator">&amp;&amp;</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>src<span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">var</span> error <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token string">&quot;Loading chunk &quot;</span> <span class="token operator">+</span></span>
<span class="line">          chunkId <span class="token operator">+</span></span>
<span class="line">          <span class="token string">&quot; failed.\\n(&quot;</span> <span class="token operator">+</span></span>
<span class="line">          errorType <span class="token operator">+</span></span>
<span class="line">          <span class="token string">&quot;: &quot;</span> <span class="token operator">+</span></span>
<span class="line">          realSrc <span class="token operator">+</span></span>
<span class="line">          <span class="token string">&quot;)&quot;</span></span>
<span class="line">      <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      error<span class="token punctuation">.</span>type <span class="token operator">=</span> errorType<span class="token punctuation">;</span></span>
<span class="line">      error<span class="token punctuation">.</span>request <span class="token operator">=</span> realSrc<span class="token punctuation">;</span></span>
<span class="line">      chunk<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    installedChunks<span class="token punctuation">[</span>chunkId<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="treeshaking-原理" tabindex="-1"><a class="header-anchor" href="#treeshaking-原理"><span><a href="https://segmentfault.com/a/1190000022194321" target="_blank" rel="noopener noreferrer">treeShaking 原理</a></span></a></h2><ul><li>传统的编译语言，编译器就可以到删除 Dead Code，但是 JS 是动态语言，编译器无法做到，我们需要借助打包工具实现消除 dead Code</li><li>借助 ESM 的静态结构分析，找到没有引入的模块打上标记，在压缩阶段利用 uglify-js 这样的压缩工具删除无用代码</li></ul><h2 id="图片资源和css资源是如何解析的" tabindex="-1"><a class="header-anchor" href="#图片资源和css资源是如何解析的"><span>图片资源和css资源是如何解析的</span></a></h2><p><a href="https://blog.csdn.net/qq_17175013/article/details/119425847" target="_blank" rel="noopener noreferrer">24.重学webpack——loader的原理及常用loader的实现（高频面试题）_俞华的博客-CSDN博客</a></p><p><strong>asset-loader</strong></p><ul><li><a href="https://www.webpackjs.com/loaders/raw-loader/" target="_blank" rel="noopener noreferrer">raw-loader</a>：加载文件原始内容（utf-8）</li><li><a href="https://www.webpackjs.com/loaders/val-loader/" target="_blank" rel="noopener noreferrer">val-loader</a>：将代码作为模块执行，并将 exports 转为 JS 代码</li><li><a href="https://www.webpackjs.com/loaders/url-loader/" target="_blank" rel="noopener noreferrer">url-loader</a>：像 file loader 一样工作，但如果文件小于限制，可以返回 data URL</li><li><a href="https://www.webpackjs.com/loaders/file-loader/" target="_blank" rel="noopener noreferrer">file-loader</a>：将文件发送到输出文件夹，并返回（相对）URL</li></ul><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h2><ul><li><a href="https://tsejx.github.io/webpack-guidebook/" target="_blank" rel="noopener noreferrer">Webpack Guidebook - 📚 Webpack 知识图谱：模块化、基础概念、工作原理、实战应用 - Webpack Guidebook</a></li></ul>`,38),l=[t];function o(c,i){return s(),a("div",null,l)}const u=n(p,[["render",o],["__file","webpack.html.vue"]]),d=JSON.parse('{"path":"/%E5%B7%A5%E7%A8%8B%E5%8C%96/webpack.html","title":"webpack","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"sourceMap","slug":"sourcemap","link":"#sourcemap","children":[{"level":3,"title":"如何启用 Source map","slug":"如何启用-source-map","link":"#如何启用-source-map","children":[]},{"level":3,"title":"类别","slug":"类别","link":"#类别","children":[]},{"level":3,"title":"配置项最佳实践","slug":"配置项最佳实践","link":"#配置项最佳实践","children":[]},{"level":3,"title":"参考","slug":"参考","link":"#参考","children":[]}]},{"level":2,"title":"模块热替换(hot module replacement)","slug":"模块热替换-hot-module-replacement","link":"#模块热替换-hot-module-replacement","children":[{"level":3,"title":"关键实现","slug":"关键实现","link":"#关键实现","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":3,"title":"参考","slug":"参考-1","link":"#参考-1","children":[]}]},{"level":2,"title":"webpack 模块加载原理","slug":"webpack-模块加载原理","link":"#webpack-模块加载原理","children":[]},{"level":2,"title":"treeShaking 原理","slug":"treeshaking-原理","link":"#treeshaking-原理","children":[]},{"level":2,"title":"图片资源和css资源是如何解析的","slug":"图片资源和css资源是如何解析的","link":"#图片资源和css资源是如何解析的","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"updatedTime":1720052070000,"contributors":[{"name":"liujia6","email":"liujia11@qianxin.com","commits":1}]},"filePathRelative":"工程化/webpack.md"}');export{u as comp,d as data};