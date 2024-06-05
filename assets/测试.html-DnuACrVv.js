import{_ as e,c as l,o as i,a}from"./app-BYS36vur.js";const n={},s=a(`<h2 id="前端自动化测试" tabindex="-1"><a class="header-anchor" href="#前端自动化测试"><span><a href="https://juejin.im/post/5b374d8c6fb9a00e2d480bfe#heading-5" target="_blank" rel="noopener noreferrer">前端自动化测试</a></span></a></h2><p>1.前端的自动化测试主要包括：浏览器测试和单元测试</p><p>首先，先了解一下前端自动化测试的分类</p><p>单元测试 e2e 测试 视觉回归测试 性能测试</p><ul><li>e2e 测试的重点在于判断真实 DOM 是否满足预期要求，甚至很少出现 mock 场景，不可或缺的是一个浏览器运行环境</li><li>vue 单元测试的范围仅限于数据流动是否正确，逻辑渲染是否正确（v-if v-show v-for），style 和 class 是否正确，我们并不需要关系这个组件在浏览器渲染中的位置，也不需要关系对其它组件会造成什么影响，只要保证组件本身正确即可，前面说的断言，vue-test-utils 都能提供对应的方案，总体上节约很多测试成本</li></ul><p><a href="https://juejin.cn/post/6844903890060574727#heading-46" target="_blank" rel="noopener noreferrer">分类</a></p><h2 id="回归测试" tabindex="-1"><a class="header-anchor" href="#回归测试"><span>回归测试</span></a></h2><ul><li>全部的测试用例。是指对软件的新版本测试时，重复执行之前某一个重要版本的所有测试用例</li></ul><p>目的：</p><ol><li>验证之前版本产生的所有缺陷已全部被修复；</li><li>确认修复这些缺陷没有引发新的缺陷</li></ol><h2 id="冒烟测试" tabindex="-1"><a class="header-anchor" href="#冒烟测试"><span>冒烟测试</span></a></h2><ul><li>接受测试。是指在对一个新版本进行系统大规模的测试之前，先验证一下软件的基本功能是否实现，是否具备可测性。所以也叫可测性测试。</li></ul><h2 id="测试准则" tabindex="-1"><a class="header-anchor" href="#测试准则"><span>测试准则</span></a></h2><ul><li><p>对发现错误较多的程序段，应进行更深入的测试。一般来说，一段程序中已发现的错误数越多，其中存在的错误概率也就越大。</p></li><li><p>应当把“尽早和不断地测试”作为测试人员的座右铭</p></li></ul><h2 id="前端测试" tabindex="-1"><a class="header-anchor" href="#前端测试"><span>前端测试</span></a></h2><p>。前端测试分为单元测试，UI 测试，集成测试和端到端测试。</p><ul><li>单元测试：是指对软件中的最小可测试单元进行检查和验证，通常指的是独立测试单个函数。</li><li>UI 测试：是对图形交互界面的测试。</li><li>集成测试：就是测试应用中不同模块如何集成，如何一起工作，这和它的名字一致。</li><li>端到端测试（e2e）：是站在用户角度的测试，把我们的程序看成是一个黑盒子，我不懂你内部是怎么实现的，我只负责打开浏览器，把测试内容在页面上输入一遍，看是不是我想要得到的结果。</li></ul><h2 id="技术选型" tabindex="-1"><a class="header-anchor" href="#技术选型"><span>技术选型</span></a></h2><p>前端测试的框架可谓是百花齐放。</p><ul><li>单元测试有 Mocha, Ava, Karma, Jest, Jasmine 等。</li><li>UI 测试有 ReactTestUtils, Test Render, Enzyme, React-Testing-Library, Vue-Test-Utils 等。</li><li>e2e 测试有 Nightwatch, Cypress, Phantomjs, Puppeteer 等。</li></ul><p>因为我们的项目使用的是 React 技术栈，这里主要介绍 React 项目的技术选型和使用。</p><h2 id="单元测试" tabindex="-1"><a class="header-anchor" href="#单元测试"><span>单元测试</span></a></h2><h3 id="单元测试目的和意义" tabindex="-1"><a class="header-anchor" href="#单元测试目的和意义"><span>单元测试目的和意义</span></a></h3><p><img src="https://img2020.cnblogs.com/blog/381412/202008/381412-20200802214404589-1600413190.png" alt="What is 测试金字塔？ - EdisonZhou - 博客园">为最小的可测试单元编写测试，然后为它们之间的复合行为编写代码，这样层层递进就可以为复杂的应用程序建立全面的测试。本文档中的单元测试是最底层 Unit 层。</p><p>没有完备单元测试的代码所构成的一个系统，就像组装一架飞机，各个配件没有分别经过严格检验，只在最后组装好后，再通过试飞来检验飞机是否正常一样。</p><p>其中涉及到这个“单元”怎么样理解？在面向对象的编程中，一个单元通常是一个完整的接口，例如一个类，也可以是一个单独的方法。 比如，类中各方法之间是相互独立的，那么就应该以方法为单元进行测试；如果一个类中主要逻辑是以模板模式串起来的，那么就以类为单元进行测试。</p><h3 id="单元测试的作用" tabindex="-1"><a class="header-anchor" href="#单元测试的作用"><span><strong>单元测试的作用</strong></span></a></h3><p>1、 提升软件质量 2、促进代码优化 3、提升研发效率 4、增加重构自信</p><h3 id="单元测试的原则-air-原则-符合-bcde-原则" tabindex="-1"><a class="header-anchor" href="#单元测试的原则-air-原则-符合-bcde-原则"><span><strong>单元测试的原则（AIR 原则，符合 BCDE 原则）</strong></span></a></h3><p>A: Automatic（自动化）测试用例通常是被定期执行的，执行过程必须完全自动化才有意义 I: Independent（独立性） 单元测试用例之间决不能互相调用，也不能依赖执行的先后次序。 R: Repeatable（可重复）- 幂等，执行一次和执行多次结果一样，可以重复执行的，不能受到外界环境的影响</p><p>B: Border，边界值测试，包含循环边界、特殊值、特殊值时间点、数据顺序 C: Correct，正确的输入，并得到预期的结果 D: Design，与设计文档相结合来编写单元测试 E: Error，单元测试用于证明程序是有错的，需要强制进行错误的输入，来检测是否能达到预期的结果。</p><h3 id="单元测试编码规范" tabindex="-1"><a class="header-anchor" href="#单元测试编码规范"><span><strong>单元测试编码规范</strong></span></a></h3><ol><li><p>【强制】所有 public 和 protected 方法必须有对应的单元测试用例 说明：虽然可以通过反射改变方法的访问修饰符后也能进行单元测试，但是考虑到公共方法会调用私有方法也能覆盖到测试，所以不强求对私有方法进行单元测试</p></li><li><p>【强制】一个测试类只对应一个被测类，一个测试用例方法只测试一个方法</p></li><li><p>【强制】单元测试应该是全自动执行的，并且非交互式的。测试用例通常是被定期执行的，执 行过程必须完全自动化才有意义。输出结果需要人工检查的测试不是一个好的单元测试。</p></li></ol><p>4.【强制】保持单元测试的独立性。为了保证单元测试稳定可靠且便于维护，单元测试用例之间 决不能互相调用，也不能依赖执行的先后次序。 反例： method2 需要依赖 method1 的执行， 将执行结果作为 method2 的输入。</p><ol start="5"><li><p>【强制】对于单元测试，要保证测试粒度足够小，有助于精确定位问题。单测粒度至多是类级 别，一般是方法级别。 说明： 只有测试粒度小才能在出错时尽快定位到出错位置。单测不负责检查跨类或者跨系统的 交互逻辑，那是集成测试的领域。</p></li><li><p>【强制】核心业务、核心应用、核心模块的增量代码确保单元测试通过。 说明： 新增代码及时补充单元测试，如果新增代码影响了原有单元测试，请及时修正。</p></li><li><p>【推荐】单元测试的基本目标：语句覆盖率达到 70%；核心模块的语句覆盖率和分支覆盖率都 要达到 100%</p></li><li><p>【推荐】对于不可测的代码建议做必要的重构，使代码变得可测，避免为了达到测试要求而 书写不规范测试代码。</p></li><li><p>【推荐】在设计评审阶段，开发人员需要和测试人员一起确定单元测试范围，单元测试最好 覆盖所有测试用例（有可能做不到）。</p></li><li><p>【推荐】单元测试作为一种质量保障手段，不建议项目发布后补充单元测试用例，建议在项 目提测前完成单元测试。</p></li><li><p>【参考】为了更方便地进行单元测试，业务代码应避免以下情况： 构造方法中做的事情过多。 存在过多的全局变量和静态方法。 存在过多的外部依赖。 存在过多的条件语句。 说明： 多层条件语句建议使用卫语句、策略模式、状态模式等方式重构。</p></li><li><p>【参考】不要对单元测试存在如下误解： 那是测试同学干的事情。本文是开发手册，凡是本文内容都是与开发同学强相关的。 单元测试代码是多余的。 系统的整体功能与各单元部件的测试正常与否是强相关的。 单元测试代码不需要维护。一年半载后，那么单元测试几乎处于废弃状态。 单元测试与线上故障没有辩证关系。好的单元测试能够最大限度地规避线上故障。</p></li></ol><h2 id="e2e-测试" tabindex="-1"><a class="header-anchor" href="#e2e-测试"><span>e2e 测试</span></a></h2><p>站在用户角度的测试 e2e 测试是把我们的程序堪称是一个黑盒子，我不懂你内部是怎么实现的，我只负责打开浏览器，把测试内容在页面上输入一遍，看是不是我想要得到的结果。，就是利用一些工具库提供的 API 使用代码来模拟终端用户在 UI 界面上的操作，比如输入，点击等等</p><p>两者的存在都是很有意义的。 unit 测试是程序员写好自己的逻辑后可以很容易的测试自己的逻辑返回的是不是都正确。 e2e 代码是测试所有的需求是不是都可以正确的完成，<strong>而且最终要的是在代码重构，js 改动很多之后，需要对需求进行测试的时候测试代码是不需要改变的</strong>，你也不用担心在重构后不能达到客户的需求。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">1.测试团队是否兵强马壮  （基于人海战术的人肉e2e测试）</span>
<span class="line">2.产品UI是否相对不稳定，经常大改 （改e2e case都来不及）</span>
<span class="line">3.测试团队是否已经熟练掌握自动化测试技术，并已经运用起来  （QA来写e2e自动测试，理想国，前端就可以甩手了）</span>
<span class="line">4.每一个迭代周期，留给QA测试时间是否充裕  （人肉e2e测试时间充足）</span>
<span class="line">5.Service接口的测试覆盖率是否很高，后端UT的覆盖率是否很高 （底层建筑稳，隐患少）</span>
<span class="line">6.每一个迭代周期，留给前端开发的时间是否很紧张 （前端写完业务代码，也要有时间写e2e代码）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://segmentfault.com/img/bVbd8yg?w=1934&amp;h=1180" alt="clipboard.png"></p><h2 id="测试风格" tabindex="-1"><a class="header-anchor" href="#测试风格"><span>测试风格</span></a></h2><p>我们将测试用例的不同组织方式称为测试风格，现今流行的单元测试风格主要有**TDD（测试驱动开发）<strong>和</strong>BDD（行为驱动开发）**两种。</p><h2 id="tdd、bdd-和-ddd" tabindex="-1"><a class="header-anchor" href="#tdd、bdd-和-ddd"><span><a href="https://www.cnblogs.com/ustbwuyi/archive/2012/10/26/2741223.html" target="_blank" rel="noopener noreferrer">TDD、BDD 和 DDD</a></span></a></h2><p><strong>1. TDD</strong>（测试优先）</p><ul><li><p>测试驱动开发（Test Drive Development）</p></li><li><p>特点</p><ul><li>先写测试再写代码</li><li>一般结合单元测试使用，是白盒测试（看着代码测试，测试代码与业务代码耦合度高）</li><li>测试重点在代码</li><li>安全感低（单个组件或模块通过测试，不代表组合在一起就没问题）</li><li>速度快（采用 shallowMonut 方法，只渲染一层）</li></ul></li><li><p>开发流程(先测试再开发)</p><ul><li>针对每个功能点<strong>抽象出接口代码</strong></li><li><strong>编写单元测试</strong>代码</li><li><strong>实现接口</strong></li><li><strong>运行单元测试</strong>代码</li></ul></li><li><p>好处</p><ul><li>减少程序逻辑方面的错误，尽可能的减少项目中的 bug</li><li>而且现在大行其道的一些模式对 TDD 的支持都非常不错，比如 MVC 和 MVP 等</li></ul></li><li><p>适用场景</p><ul><li>需求必须足够清晰</li><li>程序员对整个需求有足够的了解，这要求我们前期的需求分析以及 HLD 和 LLD 都要做得足够的细致和完善。</li><li>项目的复杂度和依赖性低 <ul><li>对于一个业务模型及其复杂、内部模块之间的相互依赖性非常强的项目，采用 TDD 反而会得不尝失，这会导致程序员在拆分接口和写测试代码的时候工作量非常大。另外，由于模块之间的依赖性太强，我们在写测试代码的时候可能不采取一些桥接模式来实现，这样势必加大了程序员的工作量。</li></ul></li></ul><p><strong>2. BDD</strong>（需求优先）</p></li><li><p>行为驱动开发（Behavior Drive Development）(先测试再开发)</p></li><li><p>特点</p><ul><li>先写代码再写测试</li><li>一般结合集成测试使用，是<strong>黑盒测试</strong>（从用户角度只关注界面，行为，结果。一般涉及到多组件，不知道具体代码逻辑）</li><li>测试重点在<strong>UI</strong>（DOM）</li><li>安全感高（如果测试通过，即可认为在用户端可以放心使用）</li><li>速度慢（采用 mount 方法，将整个组件树都挂载出来）</li></ul></li><li><p>BDD 是建立在测试驱动开发基础之上，先编写验收测试，所用语言也是团队成员（业务、产品、开发、测试等）都可以读懂的实例，再进行上述 TDD 的流程。</p></li><li><p>目的：在业务和开发之间达成共识。</p></li><li><p>TDD 的一个分支。因为在 TDD 中，我们并不能完全保证根据设计所编写的测试就是用户所期望的功能。BDD 将这一部分简单和自然化，用自然语言来描述，让开发、测试、BA 以及客户都能在这个基础上达成一致。因为测试优先的概念并不是每个人都能接受的，可能有人觉得系统太复杂而难以测试，有人认为不存在的东西无法测试。所以，我们在这里试图转换一种观念，那便是考虑它的行为，也就是说它应该如何运行，然后抽象出能达成共识的规范。如果你用过 JBehave 之类的 BDD 框架，你将会更好的理解其中具体的流程。这里我推荐一篇具体阐述的文章。<a href="http://cache.baidu.com/c?m=9f65cb4a8c8507ed4fece763105d843a4c1cd0743ca08b53289fc45f93130a1c187bb3e57a770d05d1ce7d6007bb0c01aaa63922615537b6ebdff83ecac8e13f5f8d3047700b873105a21fb8b84732b053872a9f&amp;p=8b2a96418fd01cf217afc4710e17dc14&amp;newp=91769a46d29813fa08e2977f0651c1145c5bc4387ebad110748fc11d&amp;user=baidu&amp;fm=sc&amp;query=BDD%BF%AA%B7%A2%C4%A3%CA%BD&amp;qid=a08e02971812c57c&amp;p1=15" target="_blank" rel="noopener noreferrer">亲身体验行为驱动开发</a>。</p><p><strong>3. DDD</strong>（业务优先）</p></li><li><p>领域驱动开发（Domain Drive Design）</p></li><li><p>“领域”指的就是一块<strong>业务</strong>范围</p></li><li><p>DDD 适用于“业务复杂”的且“需要维护和扩展”的系统。</p></li><li><p>好处</p><ul><li>开发者和熟悉业务的人一起工作，加强团队间不同角色的合作；</li><li>能够帮助业务人员和开发人员梳理清楚复杂的业务规则；</li><li>开发出来的软件是能够准确表达业务规则的，设计就是代码，代码就是设计</li></ul></li></ul><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>测试业务的时候一般选择 BDD+集成测试</p><p>测试函数库的时候优先选择 TDD+单元测试</p><p>一般情况下可以采用两种模式结合使用对项目进行测试。</p>`,49),t=[s];function p(r,d){return i(),l("div",null,t)}const h=e(n,[["render",p],["__file","测试.html.vue"]]),o=JSON.parse('{"path":"/%E5%B7%A5%E7%A8%8B%E5%8C%96/%E6%B5%8B%E8%AF%95.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"前端自动化测试","slug":"前端自动化测试","link":"#前端自动化测试","children":[]},{"level":2,"title":"回归测试","slug":"回归测试","link":"#回归测试","children":[]},{"level":2,"title":"冒烟测试","slug":"冒烟测试","link":"#冒烟测试","children":[]},{"level":2,"title":"测试准则","slug":"测试准则","link":"#测试准则","children":[]},{"level":2,"title":"前端测试","slug":"前端测试","link":"#前端测试","children":[]},{"level":2,"title":"技术选型","slug":"技术选型","link":"#技术选型","children":[]},{"level":2,"title":"单元测试","slug":"单元测试","link":"#单元测试","children":[{"level":3,"title":"单元测试目的和意义","slug":"单元测试目的和意义","link":"#单元测试目的和意义","children":[]},{"level":3,"title":"单元测试的作用","slug":"单元测试的作用","link":"#单元测试的作用","children":[]},{"level":3,"title":"单元测试的原则（AIR 原则，符合 BCDE 原则）","slug":"单元测试的原则-air-原则-符合-bcde-原则","link":"#单元测试的原则-air-原则-符合-bcde-原则","children":[]},{"level":3,"title":"单元测试编码规范","slug":"单元测试编码规范","link":"#单元测试编码规范","children":[]}]},{"level":2,"title":"e2e 测试","slug":"e2e-测试","link":"#e2e-测试","children":[]},{"level":2,"title":"测试风格","slug":"测试风格","link":"#测试风格","children":[]},{"level":2,"title":"TDD、BDD 和 DDD","slug":"tdd、bdd-和-ddd","link":"#tdd、bdd-和-ddd","children":[{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}]}],"git":{"updatedTime":1717615253000,"contributors":[{"name":"liujia6","email":"liujia11@qianxin.com","commits":1}]},"filePathRelative":"工程化/测试.md"}');export{h as comp,o as data};
