import{_ as n,c as l,o as a,a as e}from"./app-BYS36vur.js";const s={},i=e(`<h2 id="http-权威指南" tabindex="-1"><a class="header-anchor" href="#http-权威指南"><span>HTTP 权威指南</span></a></h2><ul><li>超文本传输</li></ul><h3 id="字符编码-ascii-unicode-和-utf-8" tabindex="-1"><a class="header-anchor" href="#字符编码-ascii-unicode-和-utf-8"><span>字符编码：ASCII，Unicode 和 UTF-8</span></a></h3><ul><li>二进制是起源，一个 0 或 1 就是 1 位</li><li>8 个二进制位称为一个字节，拥有 256 种状态</li><li>ASCII 编码拥有 128 个字符的编码，是英语字符与二进制位之间的关系映射。但是第一位始终为 0 不使用，只占用 7 位，一个字节就是一个英语字符</li><li>非 ASCII 编码，英语用 128 个符号编码够了，但是其他语言不够，中文由于一个字节只有 256 中，不够，所以采用两个字节，简体中文常见的编码方式是 GB2312</li><li>Unicode 将世界上所有的符号都纳入其中。每一个符号都给予一个独一无二的编码</li><li>Unicode 只是一个符号集，它只规定了符号的二进制代码，却没有规定这个二进制代码应该如何存储</li><li>UTF-8 是 Unicode 的实现方式之一</li><li>UTF-8 最大的一个特点，就是它是一种变长的编码方式。它可以使用 1~4 个字节表示一个符号，根据不同的符号而变化字节长度 <ul><li>对于单字节的符号，字节的第一位设为 0，后面 7 位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。</li><li>对于 n 字节的符号（n &gt; 1），第一个字节的前 n 位都设为 1，第 n + 1 位设为 0，后面字节的前两位一律设为 10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。</li></ul></li><li>utf-8 的优点在于一个英文只要一个字节，但是一个中文却是 3 个字节，utf-16 的优点在于编码长度固定，一个中文只要两 2 个字节，但是一个英文也要两个字节。所以对于英文网页 utf-8 编码更加有利，而对于中文网页使用 utf-16 应该更加有利</li><li>Java 和 JS 的字符串都是使用 UTF-16 编码，因为它有长度比较固定的优势，不像 UTF-8 字节数可能从 1 变到 4。如下图所示：英文和中文长度都是 1，而 Emoj 的长度是 2，因为长度单位是 2 个字节作为 1，Emoj 的需要 4 个字节，因此长度是 2</li><li>charCodeAt 返回当前字符的 utf 编码</li><li>如果是要检测中文的话可以使用正则表达式，看当前符号是否落在中文编码的范围内：</li><li>utf 是国际标准，规定了每个字符的编码，而 utf-8/utf-16 决定了 utf 该如何存储与读取，utf-8 的优点是对于英文比较有利，比较节省空间，utf-16 对于中文比较有利。但是如果西方国家使用 utf-8，然后东方国家使用 utf-16，那么互联网可能就乱了，所以从统一标准的角度我们还是使用 utf-8。还讨论了 GBK 编码和乱码的问题，如果一个字符存的时候是用的一种编码，但是读的时候却用的另一种编码，那就会对不上原先的字符，就会出现乱码的情况。另外，由于 utf-16 编码长度比较固定，所以 JS 和 Java 使用了 utf-16 做为它们在内存里字符串的编码。根据实验，meta 的 charset 标签在没有设置响应头的 charset 时可以起作用。</li><li><a href="https://jingyan.baidu.com/article/47a29f24671346c0142399fe.html" target="_blank" rel="noopener noreferrer">全角与半角</a><ul><li>全角的标点符号占 2 个字节，半角的标点符号占 1 个字节</li><li>半角是 ASCII 的编码，全角是 GB2312 的编码</li></ul></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">Unicode符号范围     |        UTF-8编码方式</span>
<span class="line">(十六进制)        |              （二进制）</span>
<span class="line">----------------------+---------------------------------------------</span>
<span class="line">0000 0000-0000 007F | 0xxxxxxx</span>
<span class="line">0000 0080-0000 07FF | 110xxxxx 10xxxxxx</span>
<span class="line">0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx</span>
<span class="line">0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="url-编码" tabindex="-1"><a class="header-anchor" href="#url-编码"><span><a href="http://www.ruanyifeng.com/blog/2010/02/url_encoding.html" target="_blank" rel="noopener noreferrer">url 编码</a></span></a></h2><ul><li>一般来说，URL 只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号</li><li>只有字母和数字[0-9a-zA-Z]、一些特殊符号&quot;$-_.+!*&#39;(),&quot;[不包括双引号]、以及某些保留字，才可以不经过编码直接用于 URL。</li><li>网址路径的编码，用的是 utf-8 编码</li><li>查询字符串的编码，用的是操作系统的默认编码</li><li>网页里的 form 编码其实不完全取决于网页编码，form 标记中有一个 accept-charset 属性，在非 ie 浏览器种，如果将其赋值(比如 accept-charset=&quot;UTF-8&quot;)，则表单会按照这个值表示的编码方式进行提交。</li><li>在已打开的网页上，直接用 Get 或 Post 方法发出 HTTP 请求,编码方法由网页的编码决定，也就是由 HTML 源码中字符集的设定决定。</li><li>在 Ajax 调用中，IE 总是采用 GB2312 编码（操作系统的默认编码），而 Firefox 总是采用 utf-8 编码&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html;charset=xxxx&quot;&gt;</li></ul><p>由于不同的方式的编码不同，所以我们在传送数据之前用 js 处理编码的方法来统一处理。</p><p>全角：LOVE 半角：ＬＯＶＥ</p><h3 id="编码方式" tabindex="-1"><a class="header-anchor" href="#编码方式"><span>编码方式</span></a></h3><table><thead><tr><th>编码方式</th><th>作用对象</th><th>具体编码机制</th></tr></thead><tbody><tr><td>escape/unescape</td><td>字符串</td><td>Unicode 编码值</td></tr><tr><td>encodeURI/decodeURI</td><td>整个 URL</td><td>除了常见的符号以外，对其他一些在网址中有特殊含义的符号&quot;; / ? : @ &amp; = + $ , #&quot;，也不进行编码。编码后，它输出符号的 utf-8 形式，并且在每个字节前加上%</td></tr><tr><td>encodeURIComponent/decodeURIComponent</td><td>URL 中的参数</td><td>&quot;; / ? : @ &amp; = + $ , #&quot;，这些在 encodeURI()中不被编码的符号，在 encodeURIComponent()中统统会被编码,具体的编码方法，与 encodeURI 一致</td></tr></tbody></table><p>如果上面这一行最后的 charset 是 UTF-8，则 URL 就以 UTF-8 编码；如果是 GB2312，URL 就以 GB2312 编码。</p><h2 id="base64" tabindex="-1"><a class="header-anchor" href="#base64"><span><a href="https://www.zhangxinxu.com/wordpress/2012/04/base64-url-image-%e5%9b%be%e7%89%87-%e9%a1%b5%e9%9d%a2%e6%80%a7%e8%83%bd%e4%bc%98%e5%8c%96/" target="_blank" rel="noopener noreferrer">base64</a></span></a></h2><blockquote><p>thunder://QUFodHRwOi8vd3d3LmJhaWR1LmNvbS9pbWcvc3NsbTFfbG9nby5naWZaWg==</p></blockquote><ul><li>一堆连续字母，最后有 1~2 个&quot;=&quot;的代码就是 base64</li><li>将三个字节转化成四个字节，因此编码后的文本，会比原文本大出三分之一左右</li></ul><h5 id="base64-url-传输图片文件的好处在于" tabindex="-1"><a class="header-anchor" href="#base64-url-传输图片文件的好处在于"><span>base64:URL 传输图片文件的好处在于：</span></a></h5><ul><li>减少了 HTTP 请求</li><li>某些文件可以避免跨域的问题</li><li>没有图片更新要重新上传，还要清理缓存的问题</li></ul><h5 id="什么情况下用-base64" tabindex="-1"><a class="header-anchor" href="#什么情况下用-base64"><span>什么情况下用 base64：</span></a></h5><ul><li>不能与其他图片以 CSS Sprite 的形式存在，只能独行</li><li>基本上很少被更新</li><li>实际尺寸很小</li><li>在网站中大规模使用</li></ul><p>HTML5 中 atob 和 btoa 方法支持 Base64 编码和解码。</p><ul><li>b 代表 base64，a 表示 ascii 码</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">&quot;https://lin-xin.github.io&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">btoa</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token function">atob</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// https://lin-xin.github.io</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// aHR0cHM6Ly9saW4teGluLmdpdGh1Yi5pbw==</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// https://lin-xin.github.io复制代码btoa</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>参数中带中文，已经超出了 8 位 ASCII 编码的字符范围，浏览器就会报错。所以需要先对中文进行 encodeURIComponent 编码处理。</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">&quot;哈喽 世界&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">btoa</span><span class="token punctuation">(</span><span class="token function">encodeURIComponent</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token function">decodeURIComponent</span><span class="token punctuation">(</span><span class="token function">atob</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// JUU1JTkzJTg4JUU1JTk2JUJEJTIwJUU0JUI4JTk2JUU3JTk1JThD</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 哈喽 世界</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务器的概念" tabindex="-1"><a class="header-anchor" href="#服务器的概念"><span>服务器的概念</span></a></h2><ul><li>分两种 <ul><li>硬件主机</li><li>24 小时服务的软件程序，可以用 node 的 server 模块穿件一个 clientServer 并监听端口，就可以对外提供服务来了</li></ul></li><li>内容分为 <ul><li>静态文件服务器</li><li>动态文件服务器</li></ul></li></ul><h2 id="代理" tabindex="-1"><a class="header-anchor" href="#代理"><span>代理</span></a></h2><h3 id="定义" tabindex="-1"><a class="header-anchor" href="#定义"><span>定义</span></a></h3><ul><li>代理是位于客户端与服务端之间的 HTTP 实体</li><li>它既是 web 服务器又是客户端</li><li>代理的 url 包括主机名，普通没有 <img src="https://note.youdao.com/yws/public/resource/c9f1b9f836ce443c9e328d9da17c3c84/xmlnote/5BB0842ECFE84C86948C30F835C5847A/13606" alt="image"></li></ul><h3 id="应用" tabindex="-1"><a class="header-anchor" href="#应用"><span>应用</span></a></h3><p>我的理解，就和中间件一样可以对请求和响应根据需求做出处理比如</p><ul><li>网站访问控制：儿童过滤器，公司、在入口部署</li><li>安全防火墙</li><li>反向代理（在服务器之前代替服务器，称为替代物，会假扮服务器的 ip 端口）</li></ul><h3 id="代理如何获取流量" tabindex="-1"><a class="header-anchor" href="#代理如何获取流量"><span>代理如何获取流量</span></a></h3><ol><li>通过在浏览器设置代理，称为正向代理 <ul><li>浏览器设置代理、chrome 用一个扩展程序</li><li><a href="https://www.barretlee.com/blog/2016/08/25/pac-file/" target="_blank" rel="noopener noreferrer">pac 文件</a></li></ul></li><li>在网络基础设备中导入代理，称为拦截代理</li><li>修改 dns，添加代理</li><li>服务器设置重定向，称为反向代理</li></ol><h2 id="网关" tabindex="-1"><a class="header-anchor" href="#网关"><span>网关</span></a></h2><ul><li>对比代理，网关可以处理不同协议间如 http/ftp 的对话，代理只处理 http 请求,但实际上两者区别也比较模糊，因为代理也要处理不同版本间的 http，商业化的代理也会支持 ssl、ftp</li><li>无论是 Apache 还是 Nginx，首先它们是 HTTP 服务器，其次实现代理和反向代理只是它们的一个功能而不是全部</li></ul><h3 id="tcp-编程" tabindex="-1"><a class="header-anchor" href="#tcp-编程"><span><a href="https://www.liaoxuefeng.com/wiki/897692888725344/923056653167136" target="_blank" rel="noopener noreferrer">TCP 编程</a></span></a></h3><p>Socket 是一套完整的 TCP,UDP 协议的接口。 你浏览的网页（网址以 http 开头)都是 http 协议传输到你的浏览器的, 而 http 是基于 Socket 之上的。 socket 连接：socket 连接就是所谓的长连接，理论上客户端和服务器端一旦建立起连接将不会主动断掉；但是由于各种环境因素可能会是连接断开 Socket 是一个针对 TCP 和 UDP 编程的接口，可以借助它建立 TCP 连接等等。而 TCP 和 UDP 协议属于传输层 ，而 http 是个应用层的协议，它实际上也建立在 TCP 协议之上。(HTTP 是轿车，提供了封装或者显示数据的具体形式；Socket 是发动机，提供了网络通信的能力。)</p><p>Socket 定义： 就是利用模式&quot;打开 open-&gt;write/read-&gt;关闭 close&quot;来实现的，socket 是一种特殊的文件。</p><p>HTTP 协议：简单对象访问协议，对应于应用层 ，HTTP 协议是基于 TCP 连接的</p><p>TCP 协议： 对应于传输层</p><p>IP 协议： 对应于网络层</p><p>TCP/IP 是传输层协议，主要解决数据如何在网络中传输；而 HTTP 是应用层协议，主要解决如何包装数据。</p><p>Socket 是对 TCP/IP 协议的封装，Socket 本身并不是协议，而是一个调用接口（API），通过 Socket，我们才能使用 TCP/IP 协议</p><p>http 连接：http 连接就是所谓的短连接，即客户端向服务器端发送一次请求，服务器端响应后连接即会断掉; socket 连接：socket 连接就是所谓的长连接，理论上客户端和服务器端一旦建立起连接将不会主动断掉；但是由于各种环境因素可能会是连接断开</p><p>Socket 是一个针对 TCP 和 UDP 编程的接口，可以借助它建立 TCP 连接等等。而 TCP 和 UDP 协议属于传输层 ，而 http 是个应用层的协议，它实际上也建立在 TCP 协议之上。(HTTP 是轿车，提供了封装或者显示数据的具体形式；Socket 是发动机，提供了网络通信的能力。) Socket 定义： 就是利用模式&quot;打开 open-&gt;write/read-&gt;关闭 close&quot;来实现的，socket 是一种特殊的文件。</p><p>Socket 的网络连接步骤 建立 Socket 连接至少需要一对套接字，其中一个运行于客户端，称为 ClientSocket ，另一个运行于服务器端，称为 ServerSocket 。 套接字之间的连接过程分为三个步骤：服务器监听，客户端请求，连接确认。 服务器监听：服务器端套接字并不定位具体的客户端套接字，而是处于等待连接的状态，实时监控网络状态，等待客户端的连接请求 客户端请求：指客户端的套接字提出连接请求，要连接的目标是服务器端的套接字。为此，客户端的套接字必须首先描述它要连接的服务器的套接字，指出服务器端套接字的地址和端口号，然后就向服务器端套接字提出连接请求。 连接确认：当服务器端套接字监听到或者说接收到客户端套接字的连接请求时，就响应客户端套接字的请求，建立一个新的线程，把服务器端套接字的描述发给客户端，一旦客户端确认了此描述，双方就正式建立连接。而服务器端套接字继续处于监听状态，继续接收其他客户端套接字的连接请求。</p><h2 id="重定向与负载均衡" tabindex="-1"><a class="header-anchor" href="#重定向与负载均衡"><span>重定向与负载均衡</span></a></h2><p>原因</p><ol><li>可靠，保证一个出错，还有其他的顶替</li><li>更快返回响应</li><li>减少网络拥塞</li></ol><ul><li><p>通用重定向</p><ol><li>HTTP 重定向 301 <ul><li>缺点：时延增加，增加服务器的负担，处理不了故障</li></ul></li><li>DNS 重定向 <ul><li>dns 轮转</li><li>不会平衡单个客户端的负载</li><li>负载均衡算法</li><li>邻接路由算法</li><li>故障屏蔽算法</li></ul></li><li>MAC 转发 <ul><li>在交换机上编写程序，将对应 MAC 地址流量，转发到代理缓存上，通常将骑牛转发给几个代理缓存，并在其中平衡负载或者备用 HTTP 服务器，</li><li>注意 MAC 转发是点对点的，只能一跳远</li></ul></li><li>IP 地址转发 <ul><li>IP 地址转发通 MAC 转发类似，更加自由，没有一跳远的限制，只需要位于交换机的上游，称为 NAT，网络地址转换</li><li>对称路由的限制，来去的路线必须一致</li><li>完全 NAT：源 IP 地址为交换机的 IP，缺点：无法确认唯一客户端，无法实现付费</li><li>半 NAT：源 IP 不变，缺点：需要确保实现对称路由</li></ul></li><li>网元控制协议 NECP <ul><li>网元是指路由器、交换机等设备网络元素</li><li>服务器元素 SE 是指 web 服务器和代理缓存等提供请求设备</li></ul></li></ol></li><li><p>代理重定向</p><ul><li>显式浏览器配置</li><li>代理自动配置 PAC 协议， <ul><li>让浏览器获取 PAC 文件，说明了每个 URL 关联的代理，为 PAC 文件关联一个特定的服务器</li></ul></li><li>WPAD 代理自动发现协议 <ul><li>不要求用户手工配置 dialing 设置，不依赖流量拦截，为 web 浏览器提供一种发现并使用附近代理的范式</li></ul></li></ul></li><li><p>缓存重定向：因为需要分配到可能包含特定内容的位置，要求可靠、高效且能感知内容</p><ol><li><strong>WCCP 重定向</strong>，使路由器将 web 流量重定向到代理缓存中，负责路由器和缓存服务器之间的通信，这样路由器就可以对缓存验证，在缓存中负载均衡，并将特定类型的流量发送给特定的缓存 <ul><li>GRE 分组封装：支持 WCCP 的路由器用服务器 IP 地址将 HTTP 分组封装起来，将其重定向到特定的服务器上。</li><li>服务组：由一组支持 WCCP 的路由器和缓存组成，可以交换 WCCP 报文</li></ul></li></ol><ul><li><strong>ICP 因特网缓存协议</strong>：允许缓存在兄弟缓存中查找命中的内容，会同时询问附近的多个缓存，看是否有特定 URL，返回 HIT 或 MISS，以一层为单位查询，打开 HTTP 连接传输</li><li><strong>CARP 缓存阵列路由协议</strong>：使用多个代理服务器将负载分散到一组服务器上，是 ICP 的替代品，可以通过单次查找确定对应缓存服务器的位置</li><li><strong>HTCP 超文本缓存协议</strong>：允许兄弟缓存之间通过 URL 和所有的骑牛以及响应首部来相互查询文档是否存在，而且允许对方修改资源</li></ul></li></ul><h2 id="国际化编码" tabindex="-1"><a class="header-anchor" href="#国际化编码"><span>国际化编码</span></a></h2><ul><li>客户端的 Accept-Charset、Accept-Language</li><li>服务端的 Content-type 中的 charset 和 content-Language 首部</li><li>字符集：把字符转换为二进制码的编码算法</li><li>字符集标记由 IANA 的 MIME 字符集注册机构标准化</li></ul><h3 id="内容和传输编码" tabindex="-1"><a class="header-anchor" href="#内容和传输编码"><span>内容和传输编码</span></a></h3><ol><li>content-length 是压缩后或包含内容编码后的大小</li><li>除非使用分块编码，否则是必须的报文实体字段</li><li>content-length 的作用 <ol><li>检测出服务器崩溃导致的<strong>报文截尾</strong><ul><li>早期是用正确关闭连接的方法划定报文结束 ，但是如果没有 content-length 无法判别服务器崩溃异常导致的连接关闭</li><li>若有缓存代理服务器，若有错误没有识别，会存储不完成的内容并重复使用，缓存服务器不会处理没有 content-length 的报文</li><li>HTTP1.1 规定若检测到无效长度需要通知用户</li></ul></li><li>对共享<strong>持久连接</strong>的多个报文正确分段 <ul><li>content-length 首部对持久连接必不可少，因为持久连接，无法通过连接关闭判断报文结束</li><li>如果采用分块编码可以没有 content-length 首部</li></ul></li></ol></li><li>内容编码：发送前进行编码，与内容的具体格式细节紧密相关，gzip 压缩文本，jpeg 不能用 gzip <ul><li>压缩</li><li>搅乱或加密</li><li>Content-Encoding：用于指定报文主体已经采用的编码方式，属于端到端首部，即在整个传输过程中有效。</li><li>Accept-Encoding：用于告知服务器客户端能够处理的编码方式和相对优先级，属于端到端首部，即<strong>在整个传输过程</strong>中有效。</li></ul></li><li><a href="https://www.geek-share.com/detail/2715577569.html" target="_blank" rel="noopener noreferrer">传输编码和分块编码</a><ul><li>HTTP 分块传输编码允许服务器为动态生成的内容维持 HTTP 持久链接</li><li>可以通过传输编码把报文扰乱保证安全，不过有了 SSL 就不太考虑用此了</li><li>Transfer-Encoding：用于指定传输报文主体时使用的编码方式，属于逐跳首部，即只在两个<strong>节点间</strong>有效。</li><li>TE：用于告知服务器客户端能够处理的编码方式和相对优先级，属于逐跳首部，即只在两个节点间有效。</li></ul></li></ol><h2 id="vary-首部" tabindex="-1"><a class="header-anchor" href="#vary-首部"><span>Vary 首部：</span></a></h2><ul><li>定义了服务器由什么的不同而发送不同的实体内容</li><li>若所提供的文档取决于 User-Agent 首部，vary 首部就必须包含 User-Agent</li><li>所服务器 Vary：User-Agent，cookie，大量不同的 User-Agent，cookie 会产生非常多的变体，缓存必须为每个变体保存相应文档版本</li><li>Vary: User-Agent ​ 例如你提供给移动端的内容是不同的，可用防止你客户端误使用了用于桌面端的缓存。 并可帮助 Google 和其他搜索引擎来发现你的移动端版本的页面，同时告知他们不需要 Cloaking。</li></ul><h2 id="trailer" tabindex="-1"><a class="header-anchor" href="#trailer"><span><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Trailer" target="_blank" rel="noopener noreferrer">Trailer</a></span></a></h2><p>Trailer 是一个响应首部，允许发送方在分块发送的消息后面添加额外的元信息，这些元信息可能是随着消息主体的发送动态生成的，比如消息的完整性校验，消息的数字签名，或者消息经过处理之后的最终状态等。</p>`,59),t=[i];function o(p,c){return a(),l("div",null,t)}const u=n(s,[["render",o],["__file","HTTP权威指南.html.vue"]]),d=JSON.parse('{"path":"/%E7%BD%91%E7%BB%9C/HTTP%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"HTTP 权威指南","slug":"http-权威指南","link":"#http-权威指南","children":[{"level":3,"title":"字符编码：ASCII，Unicode 和 UTF-8","slug":"字符编码-ascii-unicode-和-utf-8","link":"#字符编码-ascii-unicode-和-utf-8","children":[]}]},{"level":2,"title":"url 编码","slug":"url-编码","link":"#url-编码","children":[{"level":3,"title":"编码方式","slug":"编码方式","link":"#编码方式","children":[]}]},{"level":2,"title":"base64","slug":"base64","link":"#base64","children":[]},{"level":2,"title":"服务器的概念","slug":"服务器的概念","link":"#服务器的概念","children":[]},{"level":2,"title":"代理","slug":"代理","link":"#代理","children":[{"level":3,"title":"定义","slug":"定义","link":"#定义","children":[]},{"level":3,"title":"应用","slug":"应用","link":"#应用","children":[]},{"level":3,"title":"代理如何获取流量","slug":"代理如何获取流量","link":"#代理如何获取流量","children":[]}]},{"level":2,"title":"网关","slug":"网关","link":"#网关","children":[{"level":3,"title":"TCP 编程","slug":"tcp-编程","link":"#tcp-编程","children":[]}]},{"level":2,"title":"重定向与负载均衡","slug":"重定向与负载均衡","link":"#重定向与负载均衡","children":[]},{"level":2,"title":"国际化编码","slug":"国际化编码","link":"#国际化编码","children":[{"level":3,"title":"内容和传输编码","slug":"内容和传输编码","link":"#内容和传输编码","children":[]}]},{"level":2,"title":"Vary 首部：","slug":"vary-首部","link":"#vary-首部","children":[]},{"level":2,"title":"Trailer","slug":"trailer","link":"#trailer","children":[]}],"git":{"updatedTime":1717615253000,"contributors":[{"name":"liujia6","email":"liujia11@qianxin.com","commits":1}]},"filePathRelative":"网络/HTTP权威指南.md"}');export{u as comp,d as data};
