import{_ as s,c as n,o as a,a as l}from"./app-6XP77ETO.js";const e={},p=l(`<h1 id="css" tabindex="-1"><a class="header-anchor" href="#css"><span>css</span></a></h1><h2 id="css-预处理器" tabindex="-1"><a class="header-anchor" href="#css-预处理器"><span>css 预处理器</span></a></h2><ul><li>变量 <ul><li>sass 用$、less 用@、stylus 都可，可以减少重复代码</li></ul></li><li>mixin 处理属性前缀，Extend 和 Mixin 可以复用代码片段</li><li>继承</li><li>嵌套，反映层级和约束 = @import 和 css 的不同，不会有多个请求，css 文件模块化 4.循环适用于复杂有规律的样式</li></ul><h3 id="postcss" tabindex="-1"><a class="header-anchor" href="#postcss"><span>postcss</span></a></h3><ol><li>PostCSS 的主要功能是让开发者使用 JS 来处理 CSS 的处理器，把 CSS 解析成 JavaScript 可以操作的 AST，并调用插件处理 AST 并得到转换结果</li></ol><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;postcss-cssnext&#39;</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="常用-postcss-插件" tabindex="-1"><a class="header-anchor" href="#常用-postcss-插件"><span>常用 postcss 插件</span></a></h3><ul><li>autoprefixer：自动添加浏览器前缀支持</li><li>postcss-pxtorem:将 px 转换为 rem，用于移动端适配</li><li><a href="https://cssnext.github.io/features/" target="_blank" rel="noopener noreferrer">cssnext</a>：是一系列与 CSS 未来版本相关的 PostCSS 插件的组合。比如，cssnext 中已经包含了对 Autoprefixer 的使用，因此使用了 cssnext 就不再需要使用 Autoprefixer，有以下常见特性 <ul><li>自定义--属性与 var() 引用</li><li>样式规则嵌套</li><li>color()、hwb()、gray()，函数来调整颜色</li><li>用--name 表示 css 属性集，用@apply--name 来调用</li><li>自定义媒体查询</li><li>自定义选择器</li><li>简化、安全的 calc()</li><li>CSS 模块化 <ul><li>组件的 CSS 类名在使用时会被转换成带唯一标识符的形式。这样就避免了名称冲突。在组件开发中可以继续使用简单的 CSS 类名，而不用担心名称冲突问题,稍微复杂的组件命名规范可采用 bem</li></ul></li></ul></li><li>cssnano ：会压缩你的 CSS 文件来确保在开发环境中下载量尽可能的小</li><li>postcss-sprites ：将扫描你 CSS 中使用的所有图像，自动生成优化的 Sprites 图像和 CSS Sprites 代码</li><li>postcss-bem:css 模块命名规则 <ul><li>bem 和 suit 都是面向类名的一种规范，suit 是基于 bem 发展的，它帮助你更好的组织样式，以及更好的帮助其他开发人员能识别各种类的目的，在 BEM 模式中没有@utility 和@when 语法</li><li>BEM 代表块（Block），元素（Element），修饰符（Modifier） <ul><li>block 块指页面的一大块功能区域，比如 header 的 meau 导航块,简写为@b</li><li>元素 element 就是块中的一个 div 或 input 框元素,@element 简写为@e</li><li>modifier 指当我们复用块时，只修改其中部分元素的外观时的变化，@modified 简写为@m</li></ul></li><li>suit 外加的功能 <ul><li>utility ：处理结构和位置</li><li>when：处理状态相关</li></ul></li></ul></li></ul><h3 id="bem" tabindex="-1"><a class="header-anchor" href="#bem"><span><a href="https://juejin.im/post/5b925e616fb9a05cdd2ce70d" target="_blank" rel="noopener noreferrer">bem</a></span></a></h3><table><thead><tr><th>写法</th><th>渲染后</th></tr></thead><tbody><tr><td>@utility clearFix</td><td>u-clearFix</td></tr><tr><td>@component-namespace el</td><td>el-</td></tr><tr><td>@b info</td><td>-info</td></tr><tr><td>@m info</td><td>--info</td></tr><tr><td>@e input</td><td>__input</td></tr><tr><td>@when bold</td><td>.is-bold</td></tr></tbody></table><p>例如</p><div class="language-less line-numbers-mode" data-highlighter="prismjs" data-ext="less" data-title="less"><pre class="language-less"><code><span class="line"><span class="token atrule">@utility utilityName</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token atrule">@component-namespace mine</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token atrule">@component el</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token atrule">@b alert</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token atrule">@m warning</span> <span class="token punctuation">{</span></span>
<span class="line">        ...<span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token atrule">@b alert</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token atrule">@e title</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token atrule">@when bold</span> <span class="token punctuation">{</span></span>
<span class="line">          ...<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>渲染为</li></ul><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre class="language-css"><code><span class="line"><span class="token selector">u-utilityName</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">mine-el-alert--info</span> <span class="token punctuation">{</span></span>
<span class="line">  ...<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">mine-el-alert__title.is-bold</span> <span class="token punctuation">{</span></span>
<span class="line">  ...<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><a href="https://juejin.im/post/5dcb9c126fb9a04aba52bdf4#heading-0" target="_blank" rel="noopener noreferrer">CSS 的未来已来</a></li></ol><h2 id="less-知识点总结" tabindex="-1"><a class="header-anchor" href="#less-知识点总结"><span>less 知识点总结</span></a></h2><ol><li>变量用@表示</li><li>嵌套，&amp;代表父级选择器引用</li><li>媒体查询冒泡简便写法，类名在外，用@media 约束显示的属性</li><li>可支持数学加减乘数运算，以最左边有单位的数值单位为准，当左右运算符不能运算时，将右边的单位转为左边的单位</li><li>混合方法 <ul><li>可传递参数</li><li>可省略方法后的()</li><li>可支持默认参数</li><li>可用...展开福接受数量不定的参数用@argumnets 引用</li><li>可使用！important 加在方法后</li><li>可采用循环方法</li><li>条件筛选，用 when</li></ul></li><li>extends 伪类继承，加 all 会继承原先选择器的伪类如：after，相比方法可减少重复性</li><li>有一系列判断类型、颜色操作、数学函数等自带方法函数如 isnumber(blue)//false,lighten()、floor()</li></ol><div class="language-less line-numbers-mode" data-highlighter="prismjs" data-ext="less" data-title="less"><pre class="language-less"><code><span class="line"><span class="token comment">//@import &quot;style&quot;//引入外部文件，默认扩展名是less，位置随意但是会预编译在先,，但不会添加 把导入的文件 编译到最终输出中，只引用</span></span>
<span class="line"><span class="token variable">@width<span class="token punctuation">:</span></span> 200px<span class="token punctuation">;</span><span class="token comment">//@声明变量</span></span>
<span class="line"><span class="token selector">#colors()</span> <span class="token punctuation">{</span><span class="token comment">//映射</span></span>
<span class="line">  <span class="token property">primary</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">secondary</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">.toolClass(<span class="token variable">@size</span>:12px)</span><span class="token punctuation">{</span><span class="token comment">//函数</span></span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span>#colors[primary]<span class="token punctuation">;</span><span class="token comment">//映射</span></span>
<span class="line">  <span class="token property">border</span><span class="token punctuation">:</span><span class="token variable">@size</span> solid black<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token selector">#header</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token variable">@color<span class="token punctuation">:</span></span>red<span class="token punctuation">;</span><span class="token comment">//变量作用域，往外层找</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">@width</span><span class="token punctuation">;</span><span class="token comment">//变量，记得用@表示</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span>200<span class="token operator">-</span>200px<span class="token operator">+</span>10cm<span class="token punctuation">;</span><span class="token comment">//计算采用最左边的单位，可支持+、-、*、/</span></span>
<span class="line">  .<span class="token function">toolClass</span><span class="token punctuation">(</span>20px<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//混合，可以自定义像是清楚浮动，垂直居中的仓发，需要时再引用类名方法</span></span>
<span class="line">  <span class="token selector">.inner</span><span class="token punctuation">{</span><span class="token comment">//嵌套</span></span>
<span class="line">      <span class="token property">background</span><span class="token punctuation">:</span><span class="token variable">@color</span><span class="token punctuation">;</span><span class="token comment">//找到前面的color变量，在{}作用域内。</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">/*生成</span>
<span class="line">#header{</span>
<span class="line">    width:200px;</span>
<span class="line">    height:10px;</span>
<span class="line">    border:20px solid black;</span>
<span class="line">    .inner{</span>
<span class="line">        backgroound:red;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line">*/</span></span>
<span class="line"><span class="token atrule">@supports not <span class="token punctuation">(</span>display<span class="token punctuation">:</span> grid<span class="token punctuation">)</span></span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token comment">/* 不支持grid的浏览器会应用header样式 */</span></span>
<span class="line">  <span class="token selector">#header</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">background</span><span class="token punctuation">:</span>pink<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token atrule">@supports <span class="token punctuation">(</span>display<span class="token punctuation">:</span> grid<span class="token punctuation">)</span></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* 支持grid的浏览器会应用header样式 */</span></span>
<span class="line">  <span class="token selector">#header</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">background</span><span class="token punctuation">:</span>blue<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token variable">@min768<span class="token punctuation">:</span></span> ~<span class="token string">&quot;(min-width: 768px)&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token selector">.component</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token atrule">@media <span class="token punctuation">(</span>min-width<span class="token punctuation">:</span> 768px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span></span>
<span class="line">    <span class="token atrule">@media  <span class="token punctuation">(</span>min-resolution<span class="token punctuation">:</span> 192dpi<span class="token punctuation">)</span></span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>/img/retina2x.png<span class="token punctuation">)</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token atrule">@media <span class="token punctuation">(</span>min-width<span class="token punctuation">:</span> 1280px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/*转化为</span>
<span class="line">.component {</span>
<span class="line">  width: 300px;</span>
<span class="line">}</span>
<span class="line">@media (min-width: 768px) {</span>
<span class="line">  .component {</span>
<span class="line">    width: 600px;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">@media (min-width: 768px) and (min-resolution: 192dpi) {</span>
<span class="line">  .component {</span>
<span class="line">    background-image: url(/img/retina2x.png);</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">@media (min-width: 1280px) {</span>
<span class="line">  .component {</span>
<span class="line">    width: 800px;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">*/</span></span>
<span class="line"><span class="token comment">/*继承：使用extend伪类方法继承声明，和方法的区别在与继承是共用声明，函数是重复声明*/</span></span>
<span class="line"><span class="token selector">.animation</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">transition</span><span class="token punctuation">:</span> all .3s ease<span class="token operator">-</span>out<span class="token punctuation">;</span></span>
<span class="line">    <span class="token selector">.hide</span><span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">transform</span><span class="token punctuation">:</span><span class="token function">scale</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">#main</span><span class="token punctuation">{</span></span>
<span class="line">    &amp;<span class="token punctuation">:</span><span class="token function">extend</span><span class="token punctuation">(</span>.animation<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">#con</span><span class="token punctuation">{</span></span>
<span class="line">    &amp;<span class="token punctuation">:</span><span class="token function">extend</span><span class="token punctuation">(</span>.animation .hide<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* 生成后的 CSS */</span></span>
<span class="line"><span class="token selector">.animation,#main</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">transition</span><span class="token punctuation">:</span> all .3s ease<span class="token operator">-</span>out<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">.animation .hide , #con</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">transform</span><span class="token punctuation">:</span><span class="token function">scale</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* all 全局搜索替换*/</span></span>
<span class="line"><span class="token selector">#main</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">#main</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token selector">&amp;:after</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">content</span><span class="token punctuation">:</span><span class="token string">&quot;Less is good!&quot;</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">#wrap:extend(#main all)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">/* 生成的 CSS */</span></span>
<span class="line"><span class="token selector">#main,#wrap</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">#main:after, #wrap:after</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;Less is good!&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token operator">*</span><span class="token operator">/</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),i=[p];function t(c,o){return a(),n("div",null,i)}const d=s(e,[["render",t],["__file","less_postcss.html.vue"]]),r=JSON.parse('{"path":"/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80/less_postcss.html","title":"css","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"css 预处理器","slug":"css-预处理器","link":"#css-预处理器","children":[{"level":3,"title":"postcss","slug":"postcss","link":"#postcss","children":[]},{"level":3,"title":"常用 postcss 插件","slug":"常用-postcss-插件","link":"#常用-postcss-插件","children":[]},{"level":3,"title":"bem","slug":"bem","link":"#bem","children":[]}]},{"level":2,"title":"less 知识点总结","slug":"less-知识点总结","link":"#less-知识点总结","children":[]}],"git":{"updatedTime":1720052070000,"contributors":[{"name":"liujia6","email":"liujia11@qianxin.com","commits":1}]},"filePathRelative":"前端基础/less&postcss.md"}');export{d as comp,r as data};
