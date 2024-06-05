import{_ as n,c as s,o as a,a as e}from"./app-BYS36vur.js";const p={},t=e(`<h1 id="链表" tabindex="-1"><a class="header-anchor" href="#链表"><span>链表</span></a></h1><p>链表的题，主要可以利用双指针的思想解决。</p><h2 id="两个链表的第一个公共结点" tabindex="-1"><a class="header-anchor" href="#两个链表的第一个公共结点"><span><a href="https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/" target="_blank" rel="noopener noreferrer">两个链表的第一个公共结点</a></span></a></h2><p>如下面的两个链表**：在节点 c1 开始相交**</p><p><a href="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png" target="_blank" rel="noopener noreferrer"><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png" alt="img"></a></p><ul><li>相当于将两个链表首尾相接，然后用两个指针同时走，最后相同的节点总会相遇，就是第一次遍历如果走到尾部即为 null 的时候就换一个走，直到相遇，或者都为 null，一起走到尾部也没有相遇</li><li>例如 12345 和 945 求第一个公共节点</li><li>12345945</li><li>94512345</li><li>末尾相同的总会对齐</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">var</span> <span class="token function-variable function">getIntersectionNode</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">headA<span class="token punctuation">,</span> headB</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> a <span class="token operator">=</span> headA<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">let</span> b <span class="token operator">=</span> headB<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">while</span> <span class="token punctuation">(</span>a <span class="token operator">!=</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    a <span class="token operator">=</span> a <span class="token operator">?</span> a<span class="token punctuation">.</span>next <span class="token operator">:</span> headB<span class="token punctuation">;</span></span>
<span class="line">    b <span class="token operator">=</span> b <span class="token operator">?</span> b<span class="token punctuation">.</span>next <span class="token operator">:</span> headA<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> a<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链表倒数第-k-个结点" tabindex="-1"><a class="header-anchor" href="#链表倒数第-k-个结点"><span><a href="https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/" target="_blank" rel="noopener noreferrer">链表倒数第 k 个结点</a></span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">输入：给定一个链表: 1-&gt;2-&gt;3-&gt;4-&gt;5, 和 k = 2.</span>
<span class="line">输出：返回链表 4-&gt;5.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>循环这个链表并用数组保存它的值，再找出数组中的值</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">function</span> <span class="token function">FindKthToTail</span><span class="token punctuation">(</span><span class="token parameter">head<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> arr<span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length <span class="token operator">-</span> k<span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>让快慢指针保持 k 的距离，快指针从头走了 k 步之后，快指针动身一起走，当快指针走到末尾的时候，慢指针的位置就是倒数第 k 个数</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">function</span> <span class="token function">FindKthToTail</span><span class="token punctuation">(</span><span class="token parameter">head<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>head <span class="token operator">||</span> <span class="token operator">!</span>k<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">let</span> front <span class="token operator">=</span> head<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">let</span> behind <span class="token operator">=</span> head<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">while</span> <span class="token punctuation">(</span>front<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    index<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">    front <span class="token operator">=</span> front<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&gt;</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      behind <span class="token operator">=</span> behind<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> k <span class="token operator">&lt;=</span> index <span class="token operator">&amp;&amp;</span> behind<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反转链表" tabindex="-1"><a class="header-anchor" href="#反转链表"><span>反转链表</span></a></h2><p>输入一个链表，反转链表后，输出新链表的表头</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">输入: 1-&gt;2-&gt;3-&gt;4-&gt;5-&gt;NULL</span>
<span class="line">输出: 5-&gt;4-&gt;3-&gt;2-&gt;1-&gt;NULL</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>要点在于一次只处理一个操作，就是将当前节点的 next 指向 pre，然后就是对 pre\\current\\next 三个变量的处理，来继续下次循环</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line">主要是用prev和next变量记录并改变链表<span class="token punctuation">;</span></span>
<span class="line">先保存当前节点的next变量<span class="token punctuation">;</span></span>
<span class="line">再将当前节点付给prev变量<span class="token punctuation">;</span></span>
<span class="line">再改变当前节点的prev值<span class="token punctuation">;</span></span>
<span class="line">再改变当前节点往下循环<span class="token punctuation">;</span></span>
<span class="line">要注意这个逻辑<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">function</span> <span class="token function">ReverseList</span><span class="token punctuation">(</span><span class="token parameter">pHead</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">var</span> prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">var</span> next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>pHead <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> pHead<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> pHead<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">while</span> <span class="token punctuation">(</span>pHead <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    next <span class="token operator">=</span> pHead<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line">    pHead<span class="token punctuation">.</span>next <span class="token operator">=</span> prev<span class="token punctuation">;</span></span>
<span class="line">    prev <span class="token operator">=</span> pHead<span class="token punctuation">;</span></span>
<span class="line">    pHead <span class="token operator">=</span> next<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> prev<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="剑指-offer-25-合并两个排序的链表" tabindex="-1"><a class="header-anchor" href="#剑指-offer-25-合并两个排序的链表"><span><a href="https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/" target="_blank" rel="noopener noreferrer">剑指 Offer 25. 合并两个排序的链表</a></span></a></h2><p>输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">示例1：</span>
<span class="line"></span>
<span class="line">输入：1-&gt;2-&gt;4, 1-&gt;3-&gt;4</span>
<span class="line">输出：1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>递归</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token comment">/*function ListNode(x){</span>
<span class="line">    this.val = x;</span>
<span class="line">    this.next = null;</span>
<span class="line">}*/</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">Merge</span><span class="token punctuation">(</span><span class="token parameter">pHead1<span class="token punctuation">,</span> pHead2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> list <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>pHead1 <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> pHead2<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>pHead2 <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> pHead1<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>pHead1 <span class="token operator">&gt;</span> pHead2<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    list <span class="token operator">=</span> pHead2<span class="token punctuation">;</span></span>
<span class="line">    list<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">Merge</span><span class="token punctuation">(</span>pHead2<span class="token punctuation">.</span>next<span class="token punctuation">,</span> pHead1<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    list <span class="token operator">=</span> pHead1<span class="token punctuation">;</span></span>
<span class="line">    list<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">Merge</span><span class="token punctuation">(</span>pHead2<span class="token punctuation">,</span> pHead1<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> list<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="判断是否有环形链表" tabindex="-1"><a class="header-anchor" href="#判断是否有环形链表"><span>判断是否有环形链表</span></a></h2><ul><li>每遍历到一个节点，就给他加一个属性，遍历的时候再判断是否有这个属性，有就说明有。</li><li>使用快慢指针，如果有环，那么快指针会在后面的环中追上慢指针，如果没有环，那么快指针最先到达尾结点，变为 null</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">var</span> <span class="token function-variable function">hasCycle</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> fast <span class="token operator">=</span> head<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">let</span> slow <span class="token operator">=</span> head<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">while</span> <span class="token punctuation">(</span>fast <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line">    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>fast <span class="token operator">==</span> slow<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用 JSON.stringify()不能字符串化含有循环引用的结构。</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">var</span> <span class="token function-variable function">hasCycle</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29),l=[t];function i(c,o){return a(),s("div",null,l)}const r=n(p,[["render",i],["__file","链表.html.vue"]]),d=JSON.parse('{"path":"/%E7%AE%97%E6%B3%95/%E9%93%BE%E8%A1%A8.html","title":"链表","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"两个链表的第一个公共结点","slug":"两个链表的第一个公共结点","link":"#两个链表的第一个公共结点","children":[]},{"level":2,"title":"链表倒数第 k 个结点","slug":"链表倒数第-k-个结点","link":"#链表倒数第-k-个结点","children":[]},{"level":2,"title":"反转链表","slug":"反转链表","link":"#反转链表","children":[]},{"level":2,"title":"剑指 Offer 25. 合并两个排序的链表","slug":"剑指-offer-25-合并两个排序的链表","link":"#剑指-offer-25-合并两个排序的链表","children":[]},{"level":2,"title":"判断是否有环形链表","slug":"判断是否有环形链表","link":"#判断是否有环形链表","children":[]}],"git":{"updatedTime":1717615253000,"contributors":[{"name":"liujia6","email":"liujia11@qianxin.com","commits":1}]},"filePathRelative":"算法/链表.md"}');export{r as comp,d as data};
