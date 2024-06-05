import{_ as n,c as s,o as a,a as e}from"./app-BYS36vur.js";const l={},p=e(`<h1 id="vue-响应式原理" tabindex="-1"><a class="header-anchor" href="#vue-响应式原理"><span>Vue 响应式原理</span></a></h1><p>首先试想一下以下代码中点击$(&#39;#text&#39;)元素会发生什么呢？会触发 test 方法吗</p><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre class="language-vue"><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>age+=&#39;s&#39;<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> text: {{ text }} <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span> age: {{ age }} <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"> <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span> <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;12&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token string">&#39;12&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line"><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>&#39;computed text</span>
<span class="line">again<span class="token operator">!</span>&#39;<span class="token punctuation">)</span><span class="token punctuation">;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css"></span>
<span class="line"></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答案是会触发。这是什么原因呢，为什么会触发 test 方法呢，是 computed 的依赖收集收集还会收集到 test 函数里面去？</p><p>如果你不是很清楚为什么会触发，可以先看以下的 watcher 解析，看完再回过来思考此处是如果收集依赖的。</p><p>答案解析：</p><p>介绍完了 vue 中的依赖收集和大致的派发更新原理后我们可以回过来思考开始的问题</p><p>为了解答这个问题，我们需要了解 computed 是何如何收集依赖的，为什么 computed 里面调用的函数里面涉及到的 data 也能够收集到？带着疑问我们看下 computed 是如果收集依赖的</p><p>在以下的从 vue3 种 watcher 响应式原理解析理解完成之后不难理解以上代码点击$(&#39;#id&#39;)元素会发生了，由于 text 的 getter 函数中执行了 test 函数，此时访问了 age 属性，age 的 dep 会收集 text 的 ComputedWatcher，那么自然在 age 改变时就会触发 computed 重新计算。</p><p>watcher 解析</p><ul><li>在 vue 中 Watcher 不仅是 dep 和页面渲染 render 的桥梁，computed 属性和 watch 属性也是 Watcher 构造函数在不同情况下的实现，以下从响应式的依赖收集和派发更新分别分析</li><li>解析 watcher 首先看下 Dep 是如何实现的，Dep 实现了对 watcher 的管理，是连接数据和 watcher 的桥梁</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">static</span> <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token operator">?</span>Watcher<span class="token punctuation">;</span></span>
<span class="line">  <span class="token literal-property property">id</span><span class="token operator">:</span> number<span class="token punctuation">;</span></span>
<span class="line">  <span class="token literal-property property">subs</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Watcher<span class="token operator">&gt;</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> uid<span class="token operator">++</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>subs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 添加watcher</span></span>
<span class="line">  <span class="token function">addSub</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">sub</span><span class="token operator">:</span> Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>sub<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 移除watcher</span></span>
<span class="line">  <span class="token function">removeSub</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">sub</span><span class="token operator">:</span> Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">,</span> sub<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 让watcher添加自己Dep</span></span>
<span class="line">  <span class="token function">depend</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      Dep<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">addDep</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 通知watche触发更新</span></span>
<span class="line">  <span class="token function">notify</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> subs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>config<span class="token punctuation">.</span>async<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      subs<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>id <span class="token operator">-</span> b<span class="token punctuation">.</span>id<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> subs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      subs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">null</span></span>
<span class="line"><span class="token keyword">const</span> targetStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token comment">//targetStack 是为了保存watcher，当前一个的watcher改变的时候，前一个watcher还没有收集完，那么当当前watcher执行完成之后，可以回到前一个watcher</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">pushTarget</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token operator">?</span>Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  targetStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span></span>
<span class="line">  Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> target</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">popTarget</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  targetStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> targetStack<span class="token punctuation">[</span>targetStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="依赖收集" tabindex="-1"><a class="header-anchor" href="#依赖收集"><span>依赖收集</span></a></h2><p>data 中的数据会循环并递归执行 defineReactive，使得每个 data 上的对象都是响应式的</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">defineReactive</span> <span class="token punctuation">(</span></span>
<span class="line">  <span class="token parameter"><span class="token literal-property property">obj</span><span class="token operator">:</span> Object<span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">key</span><span class="token operator">:</span> string<span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">val</span><span class="token operator">:</span> any<span class="token punctuation">,</span></span>
<span class="line">  customSetter<span class="token operator">?</span><span class="token operator">:</span> <span class="token operator">?</span>Function<span class="token punctuation">,</span></span>
<span class="line">  shallow<span class="token operator">?</span><span class="token operator">:</span> boolean</span></span>
<span class="line"><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token comment">// 每个对象都有一个Dep实例，以保存管理watcher列表以便在数据变化是让watcher更新，执行更新视图</span></span>
<span class="line">  <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">//...</span></span>
<span class="line">  <span class="token keyword">let</span> childOb <span class="token operator">=</span> <span class="token operator">!</span>shallow <span class="token operator">&amp;&amp;</span> <span class="token function">observe</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span></span>
<span class="line">  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveGetter</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val</span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>childOb<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">          childOb<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">          <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">dependArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">return</span> value</span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveSetter</span> <span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val</span>
<span class="line">    <span class="token comment">//...</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span>setter<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">setter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> newVal<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        val <span class="token operator">=</span> newVal</span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">     <span class="token comment">// 此处重新让新赋值对象的变成响应式</span></span>
<span class="line">      childOb <span class="token operator">=</span> <span class="token operator">!</span>shallow <span class="token operator">&amp;&amp;</span> <span class="token function">observe</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span></span>
<span class="line">      dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据对象的访问会触发 getter 方法，那么什么时候会被访问呢，在 vue 组件的 mountComponent 方法执行时会需要渲染并访问到数据，从而触发 getter，以下是关键代码</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> updateComponent<span class="token punctuation">,</span> noop<span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">before</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&#39;beforeUpdate&#39;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* isRenderWatcher */</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="render-watcher-watcher-通知页面渲染" tabindex="-1"><a class="header-anchor" href="#render-watcher-watcher-通知页面渲染"><span>render watcher（watcher 通知页面渲染）</span></a></h2><ul><li>以上实例化了一个 renderWatcher <ul><li>首先进入 watcher 的构造函数</li><li>到 <code>&lt;span class=&quot;ne-text&quot;&gt;this.value = this.lazy ? undefined : this.get()&lt;/span&gt;</code> 执行 this.get() 方法</li><li>进入 get 函数，首先会执行：pushTarget(this)，把 Dep.target 赋值为当前的 renderWatcher 并压栈（为了恢复用)</li><li>接着执行了：<code>&lt;span class=&quot;ne-text&quot;&gt;value = this.getter.call(vm, vm)&lt;/span&gt;</code>this.getter 对应就是 updateComponent 函数，这实际上就是在执行：<code>&lt;span class=&quot;ne-text&quot;&gt;vm._update(vm._render(), hydrating)&lt;/span&gt;</code>,它会先执行 vm._render() 方法，因为之前分析过这个方法会生成 渲染 VNode，并且在这个过程中会对 vm 上的数据访问，这个时候就触发了 data 数据对象的 getter。</li><li>然后将每个 data 对象的 dep 都加入这个 renderWatcher，在数据更新的时候即 setter 中调用 renderWatcher 的 update 方法，重新渲染</li></ul></li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">constructor</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">expOrFn</span><span class="token operator">:</span> string <span class="token operator">|</span> Function<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">cb</span><span class="token operator">:</span> Function<span class="token punctuation">,</span></span>
<span class="line">    options<span class="token operator">?</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span></span>
<span class="line">    isRenderWatcher<span class="token operator">?</span><span class="token operator">:</span> boolean</span></span>
<span class="line">  <span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>vm <span class="token operator">=</span> vm</span>
<span class="line">    <span class="token comment">// 1.如果是renderWatcher，记录当前的watcher</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>isRenderWatcher<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      vm<span class="token punctuation">.</span>_watcher <span class="token operator">=</span> <span class="token keyword">this</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// 全局watchers记录</span></span>
<span class="line">    vm<span class="token punctuation">.</span>_watchers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// options</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>deep</span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>user</span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy</span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>sync</span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>before <span class="token operator">=</span> options<span class="token punctuation">.</span>before</span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 从此处可以看到watcher有4中类型分别是deep、user、lazy、sync类</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>cb <span class="token operator">=</span> cb</span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token operator">++</span>uid <span class="token comment">// uid for batching</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token comment">// for lazy watchers</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>depIds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>expression <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span></span>
<span class="line">      <span class="token operator">?</span> expOrFn<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token operator">:</span> <span class="token string">&#39;&#39;</span></span>
<span class="line">    <span class="token comment">// parse expression for getter</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> expOrFn <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> expOrFn</span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// watch 转换&#39;a.b.c&#39;为this.a.b.c,转换路径</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> <span class="token function">parsePath</span><span class="token punctuation">(</span>expOrFn<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// 这里调用了get方法，如果lazy为true代表是computed属性，此处先忽略。</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy</span>
<span class="line">      <span class="token operator">?</span> <span class="token keyword">undefined</span></span>
<span class="line">      <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token function">get</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 把 Dep.target 赋值为当前的渲染 watcher 并压栈（为了恢复用）</span></span>
<span class="line">    <span class="token function">pushTarget</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> value</span>
<span class="line">    <span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vm</span>
<span class="line">    <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 调用updateComponent方法，在此处组件渲染</span></span>
<span class="line">      value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> vm<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">getter for watcher &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">throw</span> e</span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// &quot;touch&quot; every property so they are all tracked as</span></span>
<span class="line">      <span class="token comment">// dependencies for deep watching</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deep<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">traverse</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token function">popTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cleanupDeps</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> value</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token function">addDep</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">dep</span><span class="token operator">:</span> Dep</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> id <span class="token operator">=</span> dep<span class="token punctuation">.</span>id</span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>depIds<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 主要是走这里添加依赖</span></span>
<span class="line">        dep<span class="token punctuation">.</span><span class="token function">addSub</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token function">update</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/* istanbul ignore else */</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>lazy<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sync<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">queueWatcher</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token function">run</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span></span>
<span class="line">        value <span class="token operator">!==</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">||</span></span>
<span class="line">        <span class="token comment">// Deep watchers and watchers on Object/Arrays should fire even</span></span>
<span class="line">        <span class="token comment">// when the value is the same, because the value may</span></span>
<span class="line">        <span class="token comment">// have mutated.</span></span>
<span class="line">        <span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>deep</span>
<span class="line">      <span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// set new value</span></span>
<span class="line">        <span class="token keyword">const</span> oldValue <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value</span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value</span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> value<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">callback for watcher &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> value<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token function">evaluate</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token function">depend</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length</span>
<span class="line">    <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="computed-watcher-computed-属性实现" tabindex="-1"><a class="header-anchor" href="#computed-watcher-computed-属性实现"><span>computed watcher （computed 属性实现）</span></a></h2><ul><li>首先找到 initComputed 函数</li></ul><div class="language-plain line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre class="language-plain"><code><span class="line">const computedWatcherOptions = { computed: true }</span>
<span class="line">function initComputed (vm: Component, computed: Object) {</span>
<span class="line">  const watchers = vm._computedWatchers = Object.create(null)</span>
<span class="line">  // computed properties are just getters during SSR</span>
<span class="line">  const isSSR = isServerRendering()</span>
<span class="line"></span>
<span class="line">  for (const key in computed) {</span>
<span class="line">    const userDef = computed[key]</span>
<span class="line">    const getter = typeof userDef === &#39;function&#39; ? userDef : userDef.get</span>
<span class="line"></span>
<span class="line">    if (!isSSR) {</span>
<span class="line">      //为每个computed属性创建一个computed watcher，该watcher的options是lazy属性为true</span>
<span class="line">      watchers[key] = new Watcher(</span>
<span class="line">        vm,</span>
<span class="line">        getter || noop,</span>
<span class="line">        noop,</span>
<span class="line">        computedWatcherOptions</span>
<span class="line">      )</span>
<span class="line">    }</span>
<span class="line">    defineComputed(vm, key, userDef)</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">---------------------------------------------------------</span>
<span class="line">export function defineComputed (</span>
<span class="line">  target: any,</span>
<span class="line">  key: string,</span>
<span class="line">  userDef: Object | Function</span>
<span class="line">) {</span>
<span class="line">  const shouldCache = !isServerRendering()</span>
<span class="line">  // 处理是computed属性是包含setter的对象还是只有getter的函数，主要是处理createComputedGetter方法</span>
<span class="line">  if (typeof userDef === &#39;function&#39;) {</span>
<span class="line">    sharedPropertyDefinition.get = shouldCache</span>
<span class="line">      ? createComputedGetter(key)</span>
<span class="line">      : userDef</span>
<span class="line">    sharedPropertyDefinition.set = noop</span>
<span class="line">  } else {</span>
<span class="line">    sharedPropertyDefinition.get = userDef.get</span>
<span class="line">      ? shouldCache &amp;&amp; userDef.cache !== false</span>
<span class="line">        ? createComputedGetter(key)</span>
<span class="line">        : userDef.get</span>
<span class="line">      : noop</span>
<span class="line">    sharedPropertyDefinition.set = userDef.set</span>
<span class="line">      ? userDef.set</span>
<span class="line">      : noop</span>
<span class="line">  }</span>
<span class="line">  Object.defineProperty(target, key, sharedPropertyDefinition)</span>
<span class="line">}</span>
<span class="line">---------------------------------------------------------</span>
<span class="line">// 重点！</span>
<span class="line">function createComputedGetter (key) {</span>
<span class="line">  return function computedGetter () {</span>
<span class="line">    const watcher = this._computedWatchers &amp;&amp; this._computedWatchers[key]</span>
<span class="line">    if (watcher) {</span>
<span class="line">      watcher.depend()</span>
<span class="line">      return watcher.evaluate()</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>以上 computed 的初始化逻辑结束，下面我们来梳理一下整个逻辑</li><li>首先为每个 computed 属性创建一个 computed watcher，该 watcher 的 options 是 lazy 属性为 true</li><li>在 watcher 的构造函数中判断如果是 computedwatcher 不会立刻求值，会给该 computedwatcher 创建一个 Dep 实例</li></ul><div class="language-plain line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre class="language-plain"><code><span class="line">constructor (</span>
<span class="line">  vm: Component,</span>
<span class="line">  expOrFn: string | Function,</span>
<span class="line">  cb: Function,</span>
<span class="line">  options?: ?Object,</span>
<span class="line">  isRenderWatcher?: boolean</span>
<span class="line">) {</span>
<span class="line">  // ...</span>
<span class="line">  if (this.computed) {</span>
<span class="line">    this.value = undefined</span>
<span class="line">    this.dep = new Dep()</span>
<span class="line">  } else {</span>
<span class="line">    this.value = this.get()</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后当 mount 的时候 render 函数执行到该 computed 属性，会触发该计算属性的 getter，会执行 createComputedGetter 函数，然后会执行 watcher.depend()，</li><li>主要是执行了 <code>&lt;span class=&quot;ne-text&quot;&gt;watcher.depend&lt;/span&gt;</code>方法，这个时候的 Dep.target 是 render watcher，执行该方法会使得 render watcher 订阅这个 computed watcher 的变化。</li></ul><div class="language-plain line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre class="language-plain"><code><span class="line">// 让当前正在收集依赖的watcher添加自己</span>
<span class="line">Watcher.depend () {</span>
<span class="line">    let i = this.deps.length</span>
<span class="line">// 如果是renderWatcher，this.deps是每个data的dep</span>
<span class="line">// 如果是computedWatcher，this.deps是getter里面访问到的data的dep</span>
<span class="line">    while (i--) {</span>
<span class="line">      this.deps[i].depend()</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line">// 让当前正在收集依赖的watcher添加自己</span>
<span class="line">Dep.depend () {</span>
<span class="line">    if (Dep.target) {</span>
<span class="line">      Dep.target.addDep(this)</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line">Watcher.addDep (dep: Dep) {</span>
<span class="line">    const id = dep.id</span>
<span class="line">    if (!this.newDepIds.has(id)) {</span>
<span class="line">      this.newDepIds.add(id)</span>
<span class="line">      this.newDeps.push(dep)</span>
<span class="line">      if (!this.depIds.has(id)) {</span>
<span class="line">        dep.addSub(this)</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后执行 <code>&lt;span class=&quot;ne-text&quot;&gt;watcher.evaluate&lt;/span&gt;</code>方法</li><li>evaluate 的逻辑非常简单，判断 this.dirty，如果为 true 则通过 this.get() 求值，然后把 this.dirty 设置为 false。在求值过程中，会执行 value = this.getter.call(vm, vm)，这实际上就是执行了计算属性定义的 getter 函数</li></ul><div class="language-plain line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre class="language-plain"><code><span class="line">evaluate () {</span>
<span class="line">  if (this.dirty) {</span>
<span class="line">    this.value = this.get()</span>
<span class="line">    this.dirty = false</span>
<span class="line">  }</span>
<span class="line">  return this.value</span>
<span class="line">}</span>
<span class="line">get () {</span>
<span class="line">// 此处将Dep.target赋值为该computedwatcher,targetStack中有renderWatcher和该computedWatcher</span>
<span class="line">    pushTarget(this)</span>
<span class="line">    let value</span>
<span class="line">    const vm = this.vm</span>
<span class="line">    try {</span>
<span class="line">    // 在此处执行computedgetter函数，为computedWatcher收集依赖，给每个computed getter函数中访问到的data的dep添加该computedWatcher</span>
<span class="line">      value = this.getter.call(vm, vm)</span>
<span class="line">    } catch (e) {</span>
<span class="line">      if (this.user) {</span>
<span class="line">        handleError(e, vm, \`getter for watcher &quot;\${this.expression}&quot;\`)</span>
<span class="line">      } else {</span>
<span class="line">        throw e</span>
<span class="line">      }</span>
<span class="line">    } finally {</span>
<span class="line">      // &quot;touch&quot; every property so they are all tracked as</span>
<span class="line">      // dependencies for deep watching</span>
<span class="line">      if (this.deep) {</span>
<span class="line">        traverse(value)</span>
<span class="line">      }</span>
<span class="line">      // 移除该computedwatcher的将Dep.target指向栈中的renderwatcher，因为此时还处于render函数执行过程中</span>
<span class="line">      popTarget()</span>
<span class="line">      this.cleanupDeps()</span>
<span class="line">    }</span>
<span class="line">    return value</span>
<span class="line">  }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>computed 是如何实现的缓存的？</p><ul><li>缓存是相对方法而言的，当页面重新渲染，一定会调用方法重新计算，而 computed 属性由于有缓存即 lazy 标志是否需要重新计算 flag 实现缓存不需要重新渲染都重新计算</li><li>只有 dirty 为 true 时才会进行重新计算，否则直接获取已经计算好的值</li><li>计算属性在创建 Watcher 依赖时，会传递一个 lazy 为 true 的属性。将 lazy 直接赋予到 Watcher 的 dirty 属性中（至于 dirty ，可以理解为是否为脏数据）。因此一开始，计算属性在页面中都会被计算一遍。另一方面，由于会把计算属性的 Getter 函数传入到 Wacther 作为更新回调函数使用，一旦依赖的响应式属性变化时，就会调用更新回调函数进行重新计算计算属性的值。</li><li>当页面第一次引用了计算属性时，dirty 的值肯定会为 true ，就会调用 Watcher 的 evaluate 方法。接下来，我们来看看 evaluate 方法在调用 get 计算最新值后，设置 this.dirty = false，表示 computed 值刚计算完肯定是最新的</li><li>那么什么时候 dirty 会设回 true？</li><li>计算属性的 Watcher 只会被收集到相对应的响应式属性中，因此在 computed 依赖的响应式属性更改后，通知到相对应的 Watcher 进行更新，其实就会在 update 函数中进行设置 dirty 为 true，我们来看看</li></ul><div class="language-plain line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre class="language-plain"><code><span class="line"></span>
<span class="line">//只有 dirty 为 true 时才会进行重新计算，否则直接获取已经计算好的值</span>
<span class="line">evaluate () {</span>
<span class="line">  if (this.dirty) {</span>
<span class="line">    this.value = this.get()</span>
<span class="line">    this.dirty = false</span>
<span class="line">  }</span>
<span class="line">  return this.value</span>
<span class="line">}</span>
<span class="line">// 计算属性的 Watcher 只会被收集到相对应的响应式属性中，因此在响应式属性更改后，通知到相对应的 Watcher 进行更新，其实就会在 update 函数中进行设置 dirty 为 false，</span>
<span class="line">Watcher.prototype.update = function update () {</span>
<span class="line">// computedWatcher的lazy才为true</span>
<span class="line">  if (this.lazy) {</span>
<span class="line">    this.dirty = true;</span>
<span class="line">  }</span>
<span class="line">  // ...</span>
<span class="line">};</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="user-watcher-watch-属性实现" tabindex="-1"><a class="header-anchor" href="#user-watcher-watch-属性实现"><span>user watcher（watch 属性实现）</span></a></h2><div class="language-plain line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre class="language-plain"><code><span class="line"></span>
<span class="line">function initWatch (vm, watch) {  // 初始化方法</span>
<span class="line">  for (const key in watch) {  // 遍历watch内多个监听属性</span>
<span class="line">    const handler = watch[key]  // 每一个监听属性的值</span>
<span class="line">    if (Array.isArray(handler)) {  // 如果该项的值为数组</span>
<span class="line">      for (let i = 0; i &lt; handler.length; i++) {</span>
<span class="line">        createWatcher(vm, key, handler[i])  // 将每一项使用watcher包装</span>
<span class="line">      }</span>
<span class="line">    } else {</span>
<span class="line">      createWatcher(vm, key, handler) // 不是数组直接使用watcher</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">---------------------------------------------------------</span>
<span class="line"></span>
<span class="line">function createWatcher (vm, expOrFn, handler, options) {</span>
<span class="line">  if (isPlainObject(handler)) { // 如果是对象，参数移位</span>
<span class="line">    options = handler</span>
<span class="line">    handler = handler.handler</span>
<span class="line">  }</span>
<span class="line">  if (typeof handler === &#39;string&#39;) {  // 如果是字符串，表示为方法名</span>
<span class="line">    handler = vm[handler]  // 获取methods内的方法</span>
<span class="line">  }</span>
<span class="line">  return vm.$watch(expOrFn, handler, options)  // 封装</span>
<span class="line">}</span>
<span class="line">// 以上对监听属性的多种不同的使用方式，都做了处理。使用示例在官网上均可找到：watch示例。可以看到最后是调用了vm.$watch方法。</span>
<span class="line"></span>
<span class="line">---------------------------------------------------------</span>
<span class="line">Vue.prototype.$watch = function(expOrFn, cb, options = {}) {</span>
<span class="line">  const vm = this</span>
<span class="line">  if (isPlainObject(cb)) {  // 如果cb是对象，当手动创建监听属性时</span>
<span class="line">    return createWatcher(vm, expOrFn, cb, options)</span>
<span class="line">  }</span>
<span class="line">  options.user = true  // user-watcher的标志位，传入Watcher类中</span>
<span class="line">  const watcher = new Watcher(vm, expOrFn, cb, options)  // 实例化user-watcher</span>
<span class="line">  if (options.immediate) {  // 立即执行</span>
<span class="line">cb.call(vm, watcher.value)  // 以当前值立即执行一次回调函数</span>
<span class="line">  }  // watcher.value为实例化后返回的值</span>
<span class="line">  return function unwatchFn () {  // 返回一个函数，执行取消监听</span>
<span class="line">    watcher.teardown()</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>由上可以知道，watcher 最后还是通过 new watcher 实现的，options 是 user = true，普通 watcher 即通过 user watcher 实现</li></ul><div class="language-plain line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre class="language-plain"><code><span class="line">class Watcher {</span>
<span class="line">  constructor(vm, expOrFn, cb, options) {</span>
<span class="line">    this.vm = vm</span>
<span class="line">    vm._watchers.push(this)  // 添加到当前实例的watchers内</span>
<span class="line">    if(options) {</span>
<span class="line">      this.deep = !!options.deep  // 是否深度监听</span>
<span class="line">      this.user = !!options.user  // 是否是user-wathcer</span>
<span class="line">      this.sync = !!options.sync  // 是否同步更新</span>
<span class="line">    }</span>
<span class="line">this.active = true  // // 派发更新的标志位</span>
<span class="line">    this.cb = cb  // 回调函数</span>
<span class="line">    if (typeof expOrFn === &#39;function&#39;) {  // 如果expOrFn是函数</span>
<span class="line">      this.getter = expOrFn</span>
<span class="line">    } else {</span>
<span class="line">      this.getter = parsePath(expOrFn)  // 如果是字符串对象路径形式，返回闭包函数</span>
<span class="line">    }</span>
<span class="line">    ...</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">----------------------------------------------------------</span>
<span class="line">const bailRE = /[^\\w.$]/  // 得是对象路径形式，如info.name</span>
<span class="line"></span>
<span class="line">function parsePath (path) {</span>
<span class="line">  if (bailRE.test(path)) return // 不匹配对象路径形式，再见</span>
<span class="line">  const segments = path.split(&#39;.&#39;)  // 按照点分割为数组</span>
<span class="line">  return function (obj) {  // 闭包返回一个函数</span>
<span class="line">    for (let i = 0; i &lt; segments.length; i++) {</span>
<span class="line">      if (!obj) return</span>
<span class="line">      obj = obj[segments[i]]  // 依次读取到实例下对象末端的值，所以会逐层收集依赖</span>
<span class="line">    }</span>
<span class="line">    return obj</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>parsePath 方法最终返回一个闭包方法，此时 Watcher 类中的 this.getter 就是一个函数了，再执行 this.get()方法时会将 this.vm 传入到闭包内，补全 Watcher 其他的逻辑：</li></ul><div class="language-plain line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre class="language-plain"><code><span class="line">class Watcher {c</span>
<span class="line">  constructor(vm, expOrFn, cb, options) {</span>
<span class="line">    ...</span>
<span class="line">    this.getter = parsePath(expOrFn)  // 返回的方法</span>
<span class="line">    this.value = this.get()  // 执行get</span>
<span class="line">  }</span>
<span class="line">  get() {</span>
<span class="line">    pushTarget(this)  // 将当前user-watcher实例赋值给Dep.target，读取时收集它</span>
<span class="line">    let value = this.getter.call(this.vm, this.vm)  // 将vm实例传给闭包，进行读取操作</span>
<span class="line">    if (this.deep) {  // 如果有定义deep属性</span>
<span class="line">      traverse(value)  // 进行深度监听</span>
<span class="line">    }</span>
<span class="line">    popTarget()</span>
<span class="line">    return value  // 返回闭包读取到的值，参数immediate使用的就是这里的值</span>
<span class="line">  }</span>
<span class="line">  ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="派发更新" tabindex="-1"><a class="header-anchor" href="#派发更新"><span>派发更新</span></a></h2><ul><li>以上 3 中数据无论是 renderwatcher 收集的 data 对象属性变化，还是 computed 收集的依赖属性变化还是 watch 的单个属性变化，都会调用变化的属性或值的 dep 的 watcher 数组执行 updata 方法</li></ul><div class="language-plain line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre class="language-plain"><code><span class="line">update () {</span>
<span class="line">    /* istanbul ignore else */</span>
<span class="line">    if (this.lazy) {</span>
<span class="line">      this.dirty = true // 此处执行了update方法，讲dirty置为true，表示下次需要更新</span>
<span class="line">    } else if (this.sync) {</span>
<span class="line">    // sync为true表示立即执行</span>
<span class="line">      this.run()</span>
<span class="line">    } else {</span>
<span class="line">    // 普通的更新的任务都放在队列当中，异步更新</span>
<span class="line">      queueWatcher(this)</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">-----------------------------------------</span>
<span class="line">run () {</span>
<span class="line">    if (this.active) {</span>
<span class="line">    // 获取最新值</span>
<span class="line">      const value = this.get()</span>
<span class="line">      if (</span>
<span class="line">        value !== this.value ||</span>
<span class="line">        isObject(value) ||</span>
<span class="line">        this.deep</span>
<span class="line">      ) {</span>
<span class="line">        const oldValue = this.value</span>
<span class="line">        this.value = value</span>
<span class="line">        if (this.user) {</span>
<span class="line">        // 普通watcher将新旧值传递给cb</span>
<span class="line">          try {</span>
<span class="line">            this.cb.call(this.vm, value, oldValue)</span>
<span class="line">          } catch (e) {</span>
<span class="line">            handleError(e, this.vm, \`callback for watcher &quot;\${this.expression}&quot;\`)</span>
<span class="line">          }</span>
<span class="line">        } else {</span>
<span class="line">          this.cb.call(this.vm, value, oldValue)</span>
<span class="line">        }</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">-----------------------------------------</span>
<span class="line">const queue: Array&lt;Watcher&gt; = []</span>
<span class="line">let has: { [key: number]: ?true } = {}</span>
<span class="line">let waiting = false</span>
<span class="line">let flushing = false</span>
<span class="line"> /*将一个观察者对象push进观察者队列，在队列中已经存在相同的id则该观察者对象将被跳过，除非它是在队列被刷新时推送*/</span>
<span class="line">查看queueWatcher的源码我们发现，Watch对象并不是立即更新视图，而是被push进了一个队列queue，此时状态处于waiting的状态，这时候会继续会有Watch对象被push进这个队列queue，等到下一个tick运行时，这些Watch对象才会被遍历取出，更新视图。同时，id重复的Watcher不会被多次加入到queue中去，因为在最终渲染时，我们只需要关心数据的最终结果。</span>
<span class="line">export function queueWatcher (watcher: Watcher) {</span>
<span class="line">  const id = watcher.id</span>
<span class="line">  if (has[id] == null) {</span>
<span class="line">    has[id] = true</span>
<span class="line">    if (!flushing) {</span>
<span class="line">      queue.push(watcher)</span>
<span class="line">    } else {</span>
<span class="line">      let i = queue.length - 1</span>
<span class="line">      while (i &gt; index &amp;&amp; queue[i].id &gt; watcher.id) {</span>
<span class="line">        i--</span>
<span class="line">      }</span>
<span class="line">      queue.splice(i + 1, 0, watcher)</span>
<span class="line">    }</span>
<span class="line">    // queue the flush</span>
<span class="line">    if (!waiting) {</span>
<span class="line">      waiting = true</span>
<span class="line">// 此处调用nextTick方法包装队列异步执行</span>
<span class="line">      nextTick(flushSchedulerQueue)</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="队列排序" tabindex="-1"><a class="header-anchor" href="#队列排序"><span>队列排序</span></a></h2><p>queue.sort((a, b) =&gt; a.id - b.id) 对队列做了从小到大的排序，这么做主要有以下要确保以下几点：</p><p>组件的更新由父到子；因为父组件的创建过程是先于子的，所以 watcher 的创建也是先父后子，执行顺序也应该保持先父后子。 用户的自定义 watcher 要优先于渲染 watcher 执行；因为用户自定义 watcher 是在渲染 watcher 之前创建的。 如果一个组件在父组件的 watcher 执行期间被销毁，那么它对应的 watcher 执行都可以被跳过，所以父组件的 watcher 应该先执行。</p><h2 id="nexttick" tabindex="-1"><a class="header-anchor" href="#nexttick"><span>nextTick</span></a></h2><p>在 Vue 中，可以通过 this.$nextTick 方法来确保在 DOM 更新完成后执行回调函数和获取更新后的 DOM。例如，如果你在数据变化后立即尝试获取 DOM 元素的内容，可能会发现获取的还是旧的内容。而在 nextTick 方法内部获取的将是更新后的内容</p><h3 id="异步更新-dom-的原因" tabindex="-1"><a class="header-anchor" href="#异步更新-dom-的原因"><span>异步更新 DOM 的原因</span></a></h3><p>异步更新 DOM 是为了优化性能和提升用户体验。在 Vue 中，数据变化触发更新后，并不会立即反映在 DOM 上，而是将更新操作添加到一个异步队列中。这样做有几个好处：</p><ol><li>性能优化 ：通过将多次数据变化合并到一个批处理中，减少了不必要的 DOM 操作，提高了性能。如果每次数据变化都立即触发 DOM 更新，可能会导致频繁的重绘和回流，影响页面的流畅性和性能。</li><li>减少重复更新 ：如果在同一个事件循环中发生多次数据变化，Vue 会将它们合并为一个更新，避免多次无谓的 DOM 更新。</li><li>防止过度渲染 ：在某些情况下，组件的数据可能会在同一事件循环中发生多次变化。如果每次变化都立即触发 DOM 更新，可能会导致不必要的重复渲染。</li><li>提升用户体验 ：异步更新可以确保 Vue 在适当的时机执行 DOM 更新，从而减少阻塞主线程的情况，保证用户界面的响应性。</li></ol><h3 id="如何使用异步更新-dom" tabindex="-1"><a class="header-anchor" href="#如何使用异步更新-dom"><span>如何使用异步更新 DOM</span></a></h3><p>确保函数执行过程中对数据任意的修改，触发变化执行 nextTick 的时候强制走 microTimerFunc。比如对于一些 DOM 交互事件，如 v-on 绑定的事件回调函数的处理，会强制走 macrotask。</p><ul><li><p>Vue 的 nextTick 之所以优先使用微任务实现?</p><ul><li>主要是因为微任务相比宏任务在执行效率上更高。在 JavaScript 的事件循环中，微任务（例如 Promise 的.then 和 MutationObserver）会在当前执行栈清空后进行，而不会等待其他宏任务（例如 setTimeout、setInterval）的执行。这意味着微任务可以更早地被执行，从而减少了等待时间，提高了应用的响应速度。 <ul><li><p>event loop</p><ul><li>执行一个宏任务</li><li>清空所有微任务</li><li>由浏览器判断是否需要 ui render</li></ul></li><li><p>由于 vue 的更新是异步的，我们要获取更新后的 dom，其实是只要保证回调函数在更新后尽快执行就可以了</p><ul><li>根据浏览器的渲染机制，渲染线程是在微任务执行完成之后运行的。渲染线程没运行，怎么拿到 Dom 呢？</li><li>因为，渲染线程只是把 Dom 树渲染成 UI 而已，Vue 更新 Dom 之后，在 Dom 树里，新的 Dom 节点已经存在了，js 线程就已经可以拿到新的 Dom 了。除非开发者读取 Dom 的计算属性，触发了强制重流渲染线程才会打断 js 线程。</li></ul></li></ul></li></ul></li><li><p>在 Vue 的实现中，它会优先检测当前浏览器是否支持原生 Promise，如果支持，则使用 Promise 的.then 方法来实现 nextTick。如果不支持 Promise，则会检测是否支持 MutationObserver，如果支持，则使用 MutationObserver。如果上述两种都不支持，才会退回到使用 setTimeout 来实现nextTick。</p></li></ul><div class="language-plain line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre class="language-plain"><code><span class="line">/*</span>
<span class="line">    延迟一个任务使其异步执行，在下一个tick时执行，一个立即执行函数，返回一个function</span>
<span class="line">    这个函数的作用是在task或者microtask中推入一个timerFunc，在当前调用栈执行完以后以此执行直到执行到timerFunc</span>
<span class="line">    目的是延迟到当前调用栈执行完以后执行</span>
<span class="line">*/</span>
<span class="line"></span>
<span class="line">//传入的cb会被push进callbacks中存放起来，然后执行timerFunc（pending是一个状态标记，保证timerFunc在下一个tick之前只执行一次）。</span>
<span class="line">// 使用Promise、MutationObserver、setTimeout以及setImmediate、MessageChannel等尝试得到timerFunc的方法。</span>
<span class="line"></span>
<span class="line">export function nextTick (cb?: Function, ctx?: Object) {</span>
<span class="line">  let _resolve</span>
<span class="line">  callbacks.push(() =&gt; {</span>
<span class="line">    if (cb) {</span>
<span class="line">      try {</span>
<span class="line">        cb.call(ctx)</span>
<span class="line">      } catch (e) {</span>
<span class="line">        handleError(e, ctx, &#39;nextTick&#39;)</span>
<span class="line">      }</span>
<span class="line">    } else if (_resolve) {</span>
<span class="line">      _resolve(ctx)</span>
<span class="line">    }</span>
<span class="line">  })</span>
<span class="line">  if (!pending) {</span>
<span class="line">    pending = true</span>
<span class="line">// 此方法把回调包装在异步任务队列中执行</span>
<span class="line">    timerFunc()</span>
<span class="line">  }</span>
<span class="line">  // $flow-disable-line</span>
<span class="line">  if (!cb &amp;&amp; typeof Promise !== &#39;undefined&#39;) {</span>
<span class="line">    return new Promise(resolve =&gt; {</span>
<span class="line">      _resolve = resolve</span>
<span class="line">    })</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>timerFunc 的实现比较简单，执行的目的是在 microtask 或者 task 中推入一个 function，在当前栈执行完毕（也许还会有一些排在前面的需要执行的任务）以后执行 nextTick 传入的 function JS 的 event loop 执行时会区分 task 和 microtask，会执行一个宏任务再执行完所有的微任务，所以微任务的优先级总比宏任务高，所以此处用微任务模拟执行回调</li><li>$nextTick 也是内部用了 nextTick 方法，用微任务模拟执行回调</li></ul><div class="language-plain line-numbers-mode" data-highlighter="prismjs" data-ext="plain" data-title="plain"><pre class="language-plain"><code><span class="line">Vue.prototype.$nextTick = function (fn: Function) {</span>
<span class="line">  return nextTick(fn, this)</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意： dom 更新和 next 函数的调用都是通过 nextTick 执行，都是在同一次微任务队列中清空执行，所以修改的先后顺序是重要的，如果在更新 data 之前调用 nextTick 则拿不到更新后的 dom</p><h2 id="原理图" tabindex="-1"><a class="header-anchor" href="#原理图"><span>原理图</span></a></h2><p>最后缕一下整个流程：原理图如下</p><p><img src="https://cdn.nlark.com/yuque/0/2024/png/2198140/1717413493425-b77c0111-e4f8-41a8-b184-bb51ce8537b3.png" alt=""></p><p><a href="https://github.com/answershuto/learnVue/blob/master/docs/Vue.js%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0DOM%E7%AD%96%E7%95%A5%E5%8F%8AnextTick.MarkDown" target="_blank" rel="noopener noreferrer">learnVue/docs/Vue.js 异步更新 DOM 策略及 nextTick.MarkDown at master · answershuto/learnVue</a></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>vue 中 computed、data、watch 属性以及组件级别的 render 更新都是利用了自有的 Vue 中 Watcher 构造函数实现的功能，只是根据各自不同的特性修改了 watcher 的功能。利用 object.defineProperty 以及发布订阅模式实现属性的依赖收集和触发更新</p><ul><li>一个组件有一个 watcher，用于在监听属性变化后重新渲染。在 Render 的时候做依赖收集</li><li>data 也是每个属性都有一个 watcher，在初始化时遍历属性初始化 watcher</li><li>watch 的依赖的固定的</li><li>computed 会在初次计算时做依赖收集，在更新时判断是否有变化，没有变化不更新</li><li>触发 setter 后则执行对应的 watcher 的回调函数执行更新操作</li></ul><p>触发更新后，vue 采用异步更新以及根据虚拟 dom 都 diff 算出差异更新，提高更新的效率。</p><h2 id="vue-最小功能实现" tabindex="-1"><a class="header-anchor" href="#vue-最小功能实现"><span>vue 最小功能实现</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">&lt;!DOCTYPE html&gt;</span>
<span class="line">&lt;html&gt;</span>
<span class="line">  &lt;head&gt;</span>
<span class="line">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span>
<span class="line">    &lt;title&gt;&lt;/title&gt;</span>
<span class="line">  &lt;/head&gt;</span>
<span class="line"></span>
<span class="line">  &lt;body&gt;</span>
<span class="line">    &lt;div id=&quot;app&quot;&gt;&lt;input type=&quot;text&quot; v-model=&quot;text&quot; /&gt; {{text}}&lt;/div&gt;</span>
<span class="line">  &lt;/body&gt;</span>
<span class="line"></span>
<span class="line">  &lt;script type=&quot;text/javascript&quot;&gt;</span>
<span class="line">    function compile(node, vm) {</span>
<span class="line">      var reg = /\\{\\{(.*)\\}\\}/; // 来匹配{{xxx}}中的xxx</span>
<span class="line">      //如果是元素节点</span>
<span class="line">      if (node.nodeType === 1) {</span>
<span class="line">        var attr = node.attributes;</span>
<span class="line">        //解析元素节点的所有属性</span>
<span class="line">        for (let i = 0; i &lt; attr.length; i++) {</span>
<span class="line">          if (attr[i].nodeName == &#39;v-model&#39;) {</span>
<span class="line">            var name = attr[i].nodeValue; //看看是与哪一个数据相关</span>
<span class="line">            node.addEventListener(&#39;input&#39;, function (e) {</span>
<span class="line">              //将与其相关的数据改为最新值</span>
<span class="line">              vm[name] = e.target.value;</span>
<span class="line">            });</span>
<span class="line">            node.value = vm.data[name]; //将data中的值赋予给该node</span>
<span class="line">            node.removeAttribute(&#39;v-model&#39;);</span>
<span class="line">          }</span>
<span class="line">        }</span>
<span class="line">      }</span>
<span class="line"></span>
<span class="line">      //如果是文本节点</span>
<span class="line">      if (node.nodeType === 3) {</span>
<span class="line">        if (reg.test(node.nodeValue)) {</span>
<span class="line">          var name = RegExp.$1; //获取到匹配的字符串</span>
<span class="line">          name = name.trim();</span>
<span class="line">          //					node.nodeValue = vm[name]; //将data中的值赋予给该node</span>
<span class="line">          new Watcher(vm, node, name); //绑定一个订阅者</span>
<span class="line">        }</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    //			在向碎片化文档中添加节点时，每个节点都处理一下</span>
<span class="line">    function nodeToFragment(node, vm) {</span>
<span class="line">      var fragment = document.createDocumentFragment();</span>
<span class="line">      var child;</span>
<span class="line">      while ((child = node.firstChild)) {</span>
<span class="line">        compile(child, vm);</span>
<span class="line">        fragment.appendChild(child);</span>
<span class="line">      }</span>
<span class="line">      return fragment;</span>
<span class="line">    }</span>
<span class="line">    //			Vue构造函数</span>
<span class="line">    //		观察data中的所有属性值，注意增添了observe</span>
<span class="line"></span>
<span class="line">    function Vue(options) {</span>
<span class="line">      this.data = options.data;</span>
<span class="line">      observe(this.data, this);</span>
<span class="line">      var id = options.el;</span>
<span class="line">      var dom = nodeToFragment(document.getElementById(id), this);</span>
<span class="line">      //处理完所有节点后，重新把内容添加回去</span>
<span class="line">      document.getElementById(id).appendChild(dom);</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    //		实现一个响应式监听属性的函数。一旦有赋新值就发生变化</span>
<span class="line">    function defineReactive(obj, key, val) {</span>
<span class="line">      var dep = new Dep();</span>
<span class="line">      Object.defineProperty(obj, key, {</span>
<span class="line">        get: function () {</span>
<span class="line">          if (Dep.target) {</span>
<span class="line">            dep.addSub(Dep.target);</span>
<span class="line">          }</span>
<span class="line">          return val;</span>
<span class="line">        },</span>
<span class="line">        set: function (newVal) {</span>
<span class="line">          if (newVal === val) {</span>
<span class="line">            return;</span>
<span class="line">          }</span>
<span class="line">          val = newVal;</span>
<span class="line">          console.log(&#39;新值&#39; + val);</span>
<span class="line">          //一旦更新立马通知</span>
<span class="line">          dep.notify();</span>
<span class="line">        },</span>
<span class="line">      });</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    //		实现一个观察者，对于一个实例 每一个属性值都进行观察。</span>
<span class="line">    function observe(obj, vm) {</span>
<span class="line">      for (let key of Object.keys(obj)) {</span>
<span class="line">        defineReactive(vm, key, obj[key]);</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line">    function observe(data) {</span>
<span class="line">      for (var key in data) {</span>
<span class="line">        // 每个data数据有一个dep，数据变化时，让dep通知所有观察者做出视图更新</span>
<span class="line">        // 在编译时，会获取数据以将视图节点对应watcher（每个watcher需要有不用的更新视图的更新函数，所以一个视图节点对应一个watcher）</span>
<span class="line">        // 将watcher添加到对应数据的dep当中</span>
<span class="line">        if (data.hasOwnProperty(key)) {</span>
<span class="line">          const dep = new Dep();</span>
<span class="line">          Object.defineProperty(data, key, {</span>
<span class="line">            //  enumerable:</span>
<span class="line">            enumerable: true,</span>
<span class="line">            configurable: true,</span>
<span class="line">            get(val) {</span>
<span class="line">              Dep.target &amp;&amp; Dep.addSub(Dep.target);</span>
<span class="line">              return val;</span>
<span class="line">            },</span>
<span class="line">            set(val) {</span>
<span class="line">              Dep.notify();</span>
<span class="line">              data[key] = val;</span>
<span class="line">            },</span>
<span class="line">          });</span>
<span class="line">        }</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line">    //		Watcher监听者</span>
<span class="line">    // 因为一个data数据可能有不同的视图节点依赖，所以需要采用发布订阅模式来监听data数据变化更新相关视图节点的变化</span>
<span class="line">    // 在编译时new watcher的时候将当前节点所对应watcher加入订阅器来监听对应data的相关视图变化</span>
<span class="line">    function Watcher(vm, node, name) {</span>
<span class="line">      Dep.target = this;</span>
<span class="line"></span>
<span class="line">      this.vm = vm;</span>
<span class="line">      this.node = node;</span>
<span class="line">      this.name = name;</span>
<span class="line"></span>
<span class="line">      this.update();</span>
<span class="line"></span>
<span class="line">      Dep.target = null;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    Watcher.prototype = {</span>
<span class="line">      update() {</span>
<span class="line">        this.get(); // 通过get将watcher加入订阅器</span>
<span class="line">        this.node.nodeValue = this.value; //更改节点内容的关键</span>
<span class="line">      },</span>
<span class="line">      get() {</span>
<span class="line">        this.value = this.vm[this.name]; //触发相应的get</span>
<span class="line">      },</span>
<span class="line">    };</span>
<span class="line"></span>
<span class="line">    //		dep构造函数</span>
<span class="line">    function Dep() {</span>
<span class="line">      this.subs = [];</span>
<span class="line">    }</span>
<span class="line">    Dep.prototype = {</span>
<span class="line">      addSub(sub) {</span>
<span class="line">        this.subs.push(sub);</span>
<span class="line">      },</span>
<span class="line">      notify() {</span>
<span class="line">        this.subs.forEach(function (sub) {</span>
<span class="line">          sub.update();</span>
<span class="line">        });</span>
<span class="line">      },</span>
<span class="line">    };</span>
<span class="line">    var vm = new Vue({</span>
<span class="line">      el: &#39;app&#39;,</span>
<span class="line"></span>
<span class="line">      data: {</span>
<span class="line">        text: &#39;赵刚&#39;,</span>
<span class="line">      },</span>
<span class="line">    });</span>
<span class="line">  &lt;/script&gt;</span>
<span class="line">&lt;/html&gt;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,66),i=[p];function t(c,o){return a(),s("div",null,i)}const d=n(l,[["render",t],["__file","vue2响应式原理.html.vue"]]),r=JSON.parse('{"path":"/Vue/vue2%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.html","title":"Vue 响应式原理","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"依赖收集","slug":"依赖收集","link":"#依赖收集","children":[]},{"level":2,"title":"render watcher（watcher 通知页面渲染）","slug":"render-watcher-watcher-通知页面渲染","link":"#render-watcher-watcher-通知页面渲染","children":[]},{"level":2,"title":"computed watcher （computed 属性实现）","slug":"computed-watcher-computed-属性实现","link":"#computed-watcher-computed-属性实现","children":[]},{"level":2,"title":"user watcher（watch 属性实现）","slug":"user-watcher-watch-属性实现","link":"#user-watcher-watch-属性实现","children":[]},{"level":2,"title":"派发更新","slug":"派发更新","link":"#派发更新","children":[]},{"level":2,"title":"队列排序","slug":"队列排序","link":"#队列排序","children":[]},{"level":2,"title":"nextTick","slug":"nexttick","link":"#nexttick","children":[{"level":3,"title":"异步更新 DOM 的原因","slug":"异步更新-dom-的原因","link":"#异步更新-dom-的原因","children":[]},{"level":3,"title":"如何使用异步更新 DOM","slug":"如何使用异步更新-dom","link":"#如何使用异步更新-dom","children":[]}]},{"level":2,"title":"原理图","slug":"原理图","link":"#原理图","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"vue 最小功能实现","slug":"vue-最小功能实现","link":"#vue-最小功能实现","children":[]}],"git":{"updatedTime":1717615253000,"contributors":[{"name":"liujia6","email":"liujia11@qianxin.com","commits":1}]},"filePathRelative":"Vue/vue2响应式原理.md"}');export{d as comp,r as data};
