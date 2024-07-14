import{_ as n,c as s,o as a,a as e}from"./app-B_HqqEoK.js";const p={},t=e(`<h1 id="error" tabindex="-1"><a class="header-anchor" href="#error"><span>Error</span></a></h1><h2 id="基本-error-语法" tabindex="-1"><a class="header-anchor" href="#基本-error-语法"><span>基本 Error 语法</span></a></h2><p>Error 发生运行时错误时抛出对象，该 Error 对象还可以用作用户定义异常的基础对象。</p><p>Error 对象基本包含三个属性</p><ul><li>name</li><li>stack</li><li>message</li></ul><p>一般使用语法 <code>new Error(message)</code> 控制台上展示 Error 的格式为</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">name: message</span>
<span class="line">  stack...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">// name: message</span>
<span class="line">Uncaught ReferenceError: afs is not defined</span>
<span class="line">    at &lt;anonymous&gt;:1:1  // stack</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器能自主识别报错的 Error 常见的有 <a href="https://note.youdao.com/" target="_blank" rel="noopener noreferrer">TypeError 等</a>，都是 Error 的子类.</p><p>注意：throw 后面可以接任意数据类型，但是最佳实践是 throw 一个 Error 类型或者自定义 Error 类型，行为同 Promise.reject，eslint 就有一个规则https://eslint.org/docs/rules/prefer-promise-reject-errors</p><h2 id="同步与异步" tabindex="-1"><a class="header-anchor" href="#同步与异步"><span>同步与异步</span></a></h2><p>mdn 对 Error 的定义描述是 Error 在发生运行时错误时抛出，什么是运行时错误呢，简单理解就是在当前的执行调用栈中发生的错误都浏览器都可以 catch 到 Error，反之。</p><ul><li>try、catch 只能捕获当前执行栈发生的错误，异步错误执行时， try、catch 代码已经出栈了所以捕获不到</li><li>对异步代码的错误捕获我们可以使用 Promise.reject 通过回调捕获到</li></ul><h3 id="reject-和-throw-error-的区别" tabindex="-1"><a class="header-anchor" href="#reject-和-throw-error-的区别"><span>Reject 和 throw Error 的区别</span></a></h3><ol><li>错误捕获差异 <ol><li>reject 是回调函数，可以捕获异步方法，</li><li>throw 只能抛出当前执行栈的错误</li></ol></li><li>流程问题 <ol><li>reject 只是一个回调方法，不会阻断程序，如果在 promise 构造函数中 reject 后想要阻断代码执行，需要加上 return</li><li>throw 后代码会停止执行</li></ol></li><li>使用 promise 抛出错误，promise 出错永远都是返回一个 promise，而不会阻断程序执行，也不会抛出错误。在浏览器端，我们可以通过 unhandledReject 事件监听 promise 的未处理错误 <ol><li>在 executor 周围的“隐式 <code>try..catch</code>”自动捕获了 error，并将其变为 rejected promise。 这不仅仅发生在 executor 函数中，同样也发生在其 handler 中。如果我们在 <code>.then</code> 处理程序（handler）中 <code>throw</code>，这意味着 promise 被 rejected，因此控制权移交至最近的 error 处理程序（handler）。</li><li>catch 执行后的 then 会继续运行</li></ol></li></ol><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;catching an error&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不会执行，应为settimeout执行时，该catch函数已经出栈了，浏览器会在1s后抛出一个uncath error</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token function-variable function">rejectIn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">ms</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span></span>
<span class="line">  <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">_<span class="token punctuation">,</span> r</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">r</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span> ms<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">t</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">await</span> <span class="token function">rejectIn</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;catching an error&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">t</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="异常的传播" tabindex="-1"><a class="header-anchor" href="#异常的传播"><span>异常的传播</span></a></h2><p>异常的传播与浏览器事件模型相似。不同之处在于</p><ul><li>异常传播作用在函数调用栈</li><li>异常传播没有捕获阶段 <ul><li>错误发生后会一直在调用栈中冒泡，直到被 catch 住，如果 catch 后不再将错误抛出则停止传播。</li><li>如果一个异常没有被 catch，它会沿着函数调用栈一层层传播直到栈空。</li><li>如果 catch 语句内部发生了异常，也一样会沿着其函数调用栈继续执行上述逻辑，专业术语是 stack unwinding。</li></ul></li></ul><h2 id="异常的处理" tabindex="-1"><a class="header-anchor" href="#异常的处理"><span>异常的处理</span></a></h2><p>我们知道当处于函数调用栈顶部的函数报错， 其函数调用栈下方的任意函数都可以进行捕获，并且效果没有本质不同。那么问题来了，我到底应该在哪里进行错误处理呢？</p><ul><li>catch 应该只处理它知道的 error，并“抛出”所有其他 error。</li><li>通过责任链模式，谁有责任干什么事情是确定的，不要做能力范围以外的事情</li></ul><h2 id="js中已有的异常类型" tabindex="-1"><a class="header-anchor" href="#js中已有的异常类型"><span><a href="https://mp.weixin.qq.com/s/xXSeT2Q6HDJE0Q8Wn9Zz_A" target="_blank" rel="noopener noreferrer">JS中已有的异常类型</a></span></a></h2><h2 id="自定义-error-扩展-error" tabindex="-1"><a class="header-anchor" href="#自定义-error-扩展-error"><span>自定义 Error，扩展 Error</span></a></h2><p>开发中，需要根据不同的错误场景定义不同的自定义 Error 类型。例如对于网络操作中的 error，我们需要 HttpError，对于数据库操作中的 error，我们需要 DbError，对于搜索操作中的 error，我们需要 NotFoundError，等等。</p><ul><li>标准错误 分析所有可能的错误，我们可以定义出一个通用的 Error 所拥有的数据结构如下，不同的错误可以在以下错误字段的基础上中进行扩展</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">{</span>
<span class="line">    code:&#39;&#39;， // 表示错误码，用来作为错误的唯一标识判断</span>
<span class="line">    message:&#39;&#39;, // 错误描述</span>
<span class="line">    details:&#39;&#39;, // 错误详情</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义-error" tabindex="-1"><a class="header-anchor" href="#自定义-error"><span>自定义 Error</span></a></h2><ul><li>如何自定义一个 Error 类型呢</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token comment">// 继承Error基础类</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">CustomError</span> <span class="token keyword">extends</span> <span class="token class-name">Error</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span>foo <span class="token operator">=</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token operator">...</span>params<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">//传递基础参数给</span></span>
<span class="line">    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token operator">...</span>params<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//  追踪stack栈，以正确展示stack属性</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>Error<span class="token punctuation">.</span>captureStackTrace<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      Error<span class="token punctuation">.</span><span class="token function">captureStackTrace</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> CustomError<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;CustomError&#39;</span></span>
<span class="line">    <span class="token comment">// 自定义错误属性</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> foo</span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">CustomError</span><span class="token punctuation">(</span><span class="token string">&#39;baz&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bazMessage&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name<span class="token punctuation">)</span>    <span class="token comment">//CustomError</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>foo<span class="token punctuation">)</span>     <span class="token comment">//baz</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>message<span class="token punctuation">)</span> <span class="token comment">//bazMessage</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>stack<span class="token punctuation">)</span>   <span class="token comment">//stacktrace</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="包装异常" tabindex="-1"><a class="header-anchor" href="#包装异常"><span>包装异常</span></a></h2><p>当我们在不同的函数中会遇到不同的 Error，但是实际可以对这些 Error 统一处理，这时我们可以用包装异常去处理， 例如我们会遇到 SyntaxError 和 ValidationError，我们可以用 ReadError 将以上两种包装成同一种</p><ul><li>我们将创建一个新的类 ReadError 来表示一般的“数据读取” error。</li><li>函数 readUser 将捕获内部发生的数据读取 error，例如 ValidationError 和 SyntaxError，并生成一个 ReadError 来进行替代。</li><li>对象 ReadError 会把对原始 error 的引用保存在其 cause 属性中。</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">ReadError</span> <span class="token keyword">extends</span> <span class="token class-name">Error</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">message<span class="token punctuation">,</span> cause</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">super</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>cause <span class="token operator">=</span> cause<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;ReadError&#39;</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">ValidationError</span> <span class="token keyword">extends</span> <span class="token class-name">Error</span> <span class="token punctuation">{</span> <span class="token comment">/*...*/</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">PropertyRequiredError</span> <span class="token keyword">extends</span> <span class="token class-name">ValidationError</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">validateUser</span><span class="token punctuation">(</span><span class="token parameter">user</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>user<span class="token punctuation">.</span>age<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">PropertyRequiredError</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>user<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">PropertyRequiredError</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">readUser</span><span class="token punctuation">(</span><span class="token parameter">json</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> user<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">    user <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>err <span class="token keyword">instanceof</span> <span class="token class-name">SyntaxError</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ReadError</span><span class="token punctuation">(</span><span class="token string">&quot;Syntax Error&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">throw</span> err<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">validateUser</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>err <span class="token keyword">instanceof</span> <span class="token class-name">ValidationError</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ReadError</span><span class="token punctuation">(</span><span class="token string">&quot;Validation Error&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">throw</span> err<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">readUser</span><span class="token punctuation">(</span><span class="token string">&#39;{bad json}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">ReadError</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">alert</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// Original error: SyntaxError: Unexpected token b in JSON at position 1</span></span>
<span class="line">    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&quot;Original error: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>cause<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">throw</span> e<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="全局错误监听" tabindex="-1"><a class="header-anchor" href="#全局错误监听"><span>全局错误监听</span></a></h2><ul><li>JS 语法错误、代码异常</li><li>AJAX 请求异常</li><li>静态资源加载异常</li><li>Promise 异常</li><li>Iframe 异常</li><li>跨域 Script error</li><li>崩溃和卡顿</li></ul><h3 id="window-onerror" tabindex="-1"><a class="header-anchor" href="#window-onerror"><span>window.onerror</span></a></h3><p>当 <code>JS</code> 运行时错误发生时，<code>window</code> 会触发一个 <code>ErrorEvent</code> 接口的 <code>error</code> 事件，并执行<code>window.onerror()</code>。</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token doc-comment comment">/**</span>
<span class="line"> * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span>  <span class="token parameter">message</span>    错误信息</span>
<span class="line"> * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span>  <span class="token parameter">source</span>     出错文件</span>
<span class="line"> * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Number<span class="token punctuation">}</span></span>  <span class="token parameter">lineno</span>     行号</span>
<span class="line"> * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Number<span class="token punctuation">}</span></span>  <span class="token parameter">colno</span>      列号</span>
<span class="line"> * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Object<span class="token punctuation">}</span></span>  <span class="token parameter">error</span>      Error对象（对象）</span>
<span class="line"> */</span></span>
<span class="line">window<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">message<span class="token punctuation">,</span> source<span class="token punctuation">,</span> lineno<span class="token punctuation">,</span> colno<span class="token punctuation">,</span> error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;捕获到异常：&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> message<span class="token punctuation">,</span> source<span class="token punctuation">,</span> lineno<span class="token punctuation">,</span> colno<span class="token punctuation">,</span> error <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同步错误可以捕获到，但是，请注意 <code>window.error</code> 无法捕获静态资源异常和 JS 代码错误。</p><ul><li><p>当 <code>JS</code> 运行时错误发生时，<code>window</code> 会触发一个 <code>ErrorEvent</code> 接口的 <code>error</code> 事件，并执行 <code>window.onerror()</code>。</p></li><li><p><code>onerror</code> 无法捕获语法错误；</p></li><li><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">window.onerror\` 函数只有在返回 \`true\` 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 \`Uncaught Error: xxxxx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul><p>捕获场景</p><ol><li>异步执行的语法错误</li></ol><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line">window<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">message<span class="token punctuation">,</span> source<span class="token punctuation">,</span> lineno<span class="token punctuation">,</span> colno<span class="token punctuation">,</span> error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;捕获到异常：&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> message<span class="token punctuation">,</span> source<span class="token punctuation">,</span> lineno<span class="token punctuation">,</span> colno<span class="token punctuation">,</span> error <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="window-addeventlistener" tabindex="-1"><a class="header-anchor" href="#window-addeventlistener"><span>window.addEventListener</span></a></h3><p>当一项资源（如图片或脚本）加载失败，加载资源的元素会触发一个 <code>Event</code> 接口的 <code>error</code> 事件，并执行该元素上的<code>onerror()</code> 处理函数。这些 <code>error</code> 事件不会向上冒泡到 <code>window</code> ，不过（至少在 <code>Firefox</code> 中）能被单一的<code>window.addEventListener</code> 捕获。</p><ul><li>会比 window.onerror 先触发，与 onerror 的功能大体类似，不过事件回调函数传参只有一个保存所有错误信息的参数，不能阻止默认事件处理函数的执行，但可以全局捕获资源加载异常的错误</li></ul><h3 id="unhandledrejection" tabindex="-1"><a class="header-anchor" href="#unhandledrejection"><span>unhandledrejection</span></a></h3><p>没有写 catch 的 Promise 中抛出的错误无法被 onerror 或 try-catch 捕获到，所以我们务必要在 Promise 中不要忘记写 catch 处理抛出的异常。</p><p>解决方案： 为了防止有漏掉的 Promise 异常，建议在全局增加一个对 unhandledrejection 的监听，用来全局监听 Uncaught Promise Error。使用方式：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">window.addEventListener(&quot;unhandledrejection&quot;, function(e){</span>
<span class="line">  console.log(e);</span>
<span class="line">});</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="http://jartto.wang/2018/11/20/js-exception-handling/" target="_blank" rel="noopener noreferrer">如何优雅处理前端异常</a></li><li><a href="https://zh.javascript.info/custom-errors" target="_blank" rel="noopener noreferrer">自定义 Error，扩展 Error</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error" target="_blank" rel="noopener noreferrer">mdn Error</a></li><li><a href="https://segmentfault.com/a/1190000022977773" target="_blank" rel="noopener noreferrer">你不知道的前端异常处理（万字长文，建议收藏）</a></li><li><a href="https://segmentfault.com/a/1190000023259434" target="_blank" rel="noopener noreferrer"> window.onerror 和 window.addEventListener(&#39;error&#39;)的区别 </a></li></ul>`,54),l=[t];function o(c,i){return a(),s("div",null,l)}const u=n(p,[["render",o],["__file","Error.html.vue"]]),d=JSON.parse('{"path":"/JS/Error.html","title":"Error","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"基本 Error 语法","slug":"基本-error-语法","link":"#基本-error-语法","children":[]},{"level":2,"title":"同步与异步","slug":"同步与异步","link":"#同步与异步","children":[{"level":3,"title":"Reject 和 throw Error 的区别","slug":"reject-和-throw-error-的区别","link":"#reject-和-throw-error-的区别","children":[]}]},{"level":2,"title":"异常的传播","slug":"异常的传播","link":"#异常的传播","children":[]},{"level":2,"title":"异常的处理","slug":"异常的处理","link":"#异常的处理","children":[]},{"level":2,"title":"JS中已有的异常类型","slug":"js中已有的异常类型","link":"#js中已有的异常类型","children":[]},{"level":2,"title":"自定义 Error，扩展 Error","slug":"自定义-error-扩展-error","link":"#自定义-error-扩展-error","children":[]},{"level":2,"title":"自定义 Error","slug":"自定义-error","link":"#自定义-error","children":[]},{"level":2,"title":"包装异常","slug":"包装异常","link":"#包装异常","children":[]},{"level":2,"title":"全局错误监听","slug":"全局错误监听","link":"#全局错误监听","children":[{"level":3,"title":"window.onerror","slug":"window-onerror","link":"#window-onerror","children":[]},{"level":3,"title":"window.addEventListener","slug":"window-addeventlistener","link":"#window-addeventlistener","children":[]},{"level":3,"title":"unhandledrejection","slug":"unhandledrejection","link":"#unhandledrejection","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"updatedTime":1720052070000,"contributors":[{"name":"liujia6","email":"liujia11@qianxin.com","commits":1}]},"filePathRelative":"JS/Error.md"}');export{u as comp,d as data};