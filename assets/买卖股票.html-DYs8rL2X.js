import{_ as n,c as s,o as a,a as p}from"./app-BYS36vur.js";const e={},t=p(`<h2 id="买卖股票的最佳时机" tabindex="-1"><a class="header-anchor" href="#买卖股票的最佳时机"><span><a href="https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/" target="_blank" rel="noopener noreferrer">买卖股票的最佳时机</a></span></a></h2><p>给定一个数组，它的第  i 个元素是一支给定股票第 i 天的价格。</p><p>如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。</p><p>注意你不能在买入股票前卖出股票。</p><h2 id="买卖股票的最佳时机-1" tabindex="-1"><a class="header-anchor" href="#买卖股票的最佳时机-1"><span><a href="https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/" target="_blank" rel="noopener noreferrer">买卖股票的最佳时机</a></span></a></h2><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token literal-property property">输入</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token literal-property property">输出</span><span class="token operator">:</span> <span class="token number">5</span></span>
<span class="line"><span class="token literal-property property">解释</span><span class="token operator">:</span> 在第 <span class="token number">2</span> 天（股票价格 <span class="token operator">=</span> <span class="token number">1</span>）的时候买入，在第 <span class="token number">5</span> 天（股票价格 <span class="token operator">=</span> <span class="token number">6</span>）的时候卖出，最大利润 <span class="token operator">=</span> <span class="token number">6</span><span class="token operator">-</span><span class="token number">1</span> <span class="token operator">=</span> <span class="token number">5</span> 。</span>
<span class="line">     注意利润不能是 <span class="token number">7</span><span class="token operator">-</span><span class="token number">1</span> <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">,</span> 因为卖出价格需要大于买入价格。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>题解</p><ul><li>使用动态规划， 前 i 天的最大收益 = max{前 i-1 天的最大收益，第 i 天的价格-前 i-1 天中的最小价格}</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">var</span> <span class="token function-variable function">maxProfit</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">prices</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">var</span> min <span class="token operator">=</span> prices<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    pro <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> prices<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    min <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>prices<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> min<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    pro <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>prices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> min<span class="token punctuation">,</span> pro<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> pro<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_122-买卖股票的最佳时机-ii" tabindex="-1"><a class="header-anchor" href="#_122-买卖股票的最佳时机-ii"><span><a href="https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/" target="_blank" rel="noopener noreferrer">122.买卖股票的最佳时机 II</a></span></a></h2><p>给定一个数组，它的第  i 个元素是一支给定股票第 i 天的价格。</p><p>设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。</p><p>注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token literal-property property">输入</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token literal-property property">输出</span><span class="token operator">:</span> <span class="token number">7</span></span>
<span class="line"><span class="token literal-property property">解释</span><span class="token operator">:</span> 在第 <span class="token number">2</span> 天（股票价格 <span class="token operator">=</span> <span class="token number">1</span>）的时候买入，在第 <span class="token number">3</span> 天（股票价格 <span class="token operator">=</span> <span class="token number">5</span>）的时候卖出<span class="token punctuation">,</span> 这笔交易所能获得利润 <span class="token operator">=</span> <span class="token number">5</span><span class="token operator">-</span><span class="token number">1</span> <span class="token operator">=</span> <span class="token number">4</span> 。</span>
<span class="line">     随后，在第 <span class="token number">4</span> 天（股票价格 <span class="token operator">=</span> <span class="token number">3</span>）的时候买入，在第 <span class="token number">5</span> 天（股票价格 <span class="token operator">=</span> <span class="token number">6</span>）的时候卖出<span class="token punctuation">,</span> 这笔交易所能获得利润 <span class="token operator">=</span> <span class="token number">6</span><span class="token operator">-</span><span class="token number">3</span> <span class="token operator">=</span> <span class="token number">3</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>题解</p><ul><li>贪心算法：只要今天的股票比前一天的高就卖出去</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">var</span> <span class="token function-variable function">maxProfit</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">prices</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>prices<span class="token punctuation">)</span> <span class="token operator">||</span> prices<span class="token punctuation">.</span>length <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">let</span> max <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> prices<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>prices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&gt;</span> prices<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      max <span class="token operator">+=</span> prices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> prices<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> max<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),o=[t];function l(c,i){return a(),s("div",null,o)}const u=n(e,[["render",l],["__file","买卖股票.html.vue"]]),k=JSON.parse('{"path":"/%E7%AE%97%E6%B3%95/%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"买卖股票的最佳时机","slug":"买卖股票的最佳时机","link":"#买卖股票的最佳时机","children":[]},{"level":2,"title":"买卖股票的最佳时机","slug":"买卖股票的最佳时机-1","link":"#买卖股票的最佳时机-1","children":[]},{"level":2,"title":"122.买卖股票的最佳时机 II","slug":"_122-买卖股票的最佳时机-ii","link":"#_122-买卖股票的最佳时机-ii","children":[]}],"git":{"updatedTime":1717615253000,"contributors":[{"name":"liujia6","email":"liujia11@qianxin.com","commits":1}]},"filePathRelative":"算法/买卖股票.md"}');export{u as comp,k as data};
