# [css](https://juejin.cn/post/6905695376645292045#heading-202)

### [绝对定位元素](https://www.jianshu.com/p/ecbac906cd5b)

## 替换元素与非替换元素

大部分元素，页面上显示的结果，取决于元素内容，称为**非可替换元素**

少部分元素，页面上显示的结果，取决于元素属性，成为**可替换元素**
例如 img video audio

## position 属性的五个值：

```
static
relative
fixed
absolute 当元素绝对定位时，会从文档流中完全删除，相对于距离最近的非static祖先元素位置决定的
sticky
```

注意 sticky 属性：它是如果滚动条超过它的位置了，就采用 fixed 定位如果没有超过，就采用相对定位

## 文本省略

### 单行文本溢出显示省略号

```
overflow: hidden;
text-overflow: ellipsis;
white-space: no-wrap;
```

### 多行文本溢出显示省略号

```
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
```

## class 优先级

- 当一个元素指定多个 class 时，class 的优先级与指定顺序无关，而是和 class 的定义顺序有关。后声明的优先级高。
- 优先级
  1. 内联样式 权值为1000
  2. ID选择器 权值为0100
  3. 类、伪类、属性选择器 权值为0010
  4. 标签、伪元素选择器 权值为0001
  5. 通配符、子类选择器、兄弟选择器，如*, >, +，权值为0000
  6. 继承的样式没有权值

## rgba 透明和 opacity 透明的区别

1.opacity 会让所有子元素都变透明，rgba 只相对于当前元素
2.opacity 会创建新的图层

## link 和 import 引入 css 的区别

- link：是 html 标签，并且并行加载文件，还可以加载图片的资源文件
- import：是 css 提供的，网页都加载完后再加载，可能会出现闪烁，有兼容性问题，不能 dom 操作

## src 和 href 的区别

href：
href 是 Hypertext Reference 的缩写，表示超文本引用。用来建立当前元素和文档之间的链接。如 link a 并行下载该文档，并且不会停止对当前文档的处理
src：
src 是 source 的缩写，src 指向的内容会嵌入到文档当前标签所在位置
如 img、script、iframe 当浏览器解析到该元素时，会暂停浏览器的渲染，直到该资源加载完毕。

## 浮动

- 带来的问题
  1.  浮动元素脱离文档流，父元素塌陷，会覆盖在后面紧随的元素之上
- 清除浮动的方式
  1.  父级定义高度
  2.  最后一个浮动元素后添加空 div 标签并且添加 clear：both
  3.  包含浮动元素的父标签添加样式 overflow：hidden
  4.  使用伪类再去除

## 圣杯布局（全部浮动、container 留 padding、再通过 margin、position 调整位置、记得清除浮动）

```
<div class="container">
    <div class="middle">middle</div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
<style>
  div{
    height:200px;
  }
  .container{
    padding:0 100px;
      height:200px;
  }
  .container>div{
      float: left;
  }
  .middle{
    background:blue;
    width:100%;
  }
  .left{
    position:relative;
    background:pink;
    width:100px;
  /*   margin-left:calc(-100% - 100px); */
    margin-left:-100%;
    left:-100px;
  }
  .right{
    background:green;
    width:100px;
    margin-right:-100px;
  /*   position:relative; */
  /*   right:-100px; */
  }
</style>
```

## 双飞翼布局（改内部 padding 为外部 margin、免于相对定位，margin 不变）

思路：可以尝试去掉 margin 看，因为 left 和 right 的 margin 是相对于上面的 middle-container，没有圣杯布局中外容器的 padding 限制，所以可以直接调整到正确位置

```html
<div class="container">
    <div class="middle-container">
        <div class="middle">main</div>
    </div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
<style>
  div{
    height:100px;
    float: left;
  }
  .middle-container{
    width: 100%;//重点
    background: paleturquoise;
  }
  .middle{
    margin:0 200px;//重点
  }
  .left{
    background: palevioletred;
    width: 200px;
    margin-left:-100%;
  }
  .right{
    width: 200px;
    background: purple;
    margin-left:-200px;
  }

</style>


  flex布局
  div{
    height:100px;
    display:flex;
  }
  .middle{
    background: paleturquoise;
    width:100%;
  }
  .left{
    background: palevioletred;
    flex:0 0 200px;
    order:-1;
  }
  .right{
    width: 200px;
    flex:0 0 200px;
    background: purple;
  }
</style>
```

## grid 布局（二维层次的一个布局）

```html
<div class="container">
  <div class="header">1</div>
  <div class="left">2</div>
  <div class="middle">3</div>
  <div class="right">3</div>
  <div class="footer">4</div>
</div>

.container { display:grid; grid-template-columns: 100px 1fr 100px;
grid-template-rows: 1fr 300px 1fr; grid-template-areas: "top top top" "left
middle right" "footer footer footer"; } .header { grid-area: top;
background:blue} .left { grid-area: left; background:pink} .middle{ grid-area:
middle; background:yellow} .right{grid-area:right;background:red} .footer {
grid-area:footer ; background:blue}
```

## table 布局

```html
<div class="container">
  <div class="left">left</div>
  <div class="center">center</div>
  <div class="right">right</div>
</div>

<style>
  div {
    height: 200px;
  }
  .container {
    display: table;
  }
  .container > div {
    display: table-cell;
  }
  .middle {
    background: blue;
  }
  .left {
    background: pink;
    width: 100px;
  }
  .right {
    background: green;
    width: 100px;
  }
</style>
```

## [自适应三栏布局](https://blog.csdn.net/weixin_44071019/article/details/85951685#1flex_3)

1. flex(左右的 flex：0 0 100px、中间 flex:1、可以单独设置高度也可以不设置就是等高的)
2. float(左右盒子设置固定宽度并浮动，中间盒子设置 100%宽度，需要注意，如果设置浮动，需要中间盒子和右边盒子调位，否则右边盒子会掉落)
3. inline-block
4. position(父级相对定位，左右分别绝对定位,center 会自然流动到他们上面，然后使用 margin 属性，留出左右元素的宽度，既可以使中间元素自适应屏幕宽度。)
5. gird(display: grid;（等高）
   grid-template-columns: 200px auto 200px;)
6. table 布局、父元素 display：table；子元素 display:table-cell;注意父元素 width：100%；子元素没有设置宽度的自动撑开（等高的）（容易发生重流，整个 table 都要跟着变动，开销大）
7. 圣杯布局、双飞翼布局（浮动加上 margin、padding、定位）

## 垂直居中

1. display：inline-block; + vertical-align:middle;

2. display:flex; + justify-content:center; + align-items:center;

3. position:absolute; + left + top

4. 父元素设置

   display:grid;
   align-items:center;
   justify-items:center;

## [等高布局](https://segmentfault.com/a/1190000019365216#articleHeader4)

1. 父元素设置 overflow：hidden 抵消（在最高点被裁减）；全部浮动；利用很大的 padding-bottom 和 margin-bottom：为-padding-bottom
2. 绝对定位设置 top：0；bottom：0；
3. flex 布局
4. table 布局
5. grid 布局
   display: grid;grid-template-columns: 1fr 1fr 1fr; width:100%;

## [对 display,position 和 float 之间关系的定义](https://www.iteye.com/blog/desert3-1562782)

1. display 为 none| => position、float 无效,display:转换
2. position:absolute，fixed |=> float 无效，
3. 有浮动：display 转换
4. 根元素：display 转换
5. 其他都没有就按照指定格式
   display 转换：
   1.inline-table => table
   2.inline、table-row、table-group 等 table 布局 => block

## 块级元素与内联元素的区别

- 块级元素：
  1. div、p、ul、li、ol、h1-h6、table、form、hr、dl、header、footer、aside...
  1. 占据一行、垂直排列
- 内联元素:
  1. img、a、span、input、label、strong、em
  2. 水平排列
  3. 不能设置宽高

## [可继承的属性](https://www.cnblogs.com/zhangnan35/p/8624608.html)

1. 字体相关：line-height, font-family, font-size, font-style, font-variant, font-weight, font
2. 列表相关：list-style-image, list-style-position, list-style-type, list-style
3. 文本相关 text-indent、text-align、line-height、word-spacing、letter-spacing、color
4. visibility
5. cursor

## css 选择器

1. max-width、max-height 等优先级最高
2. ！important
3. 内联样式 1000
4. id 选择器 100
5. class 选择器、伪类、属性选择器 10
6. 伪元素和元素选择器 1

其他：通配符选择器、相邻同胞选择器、子选择器、后代选择器

!important > 行内样式>ID 选择器 > 类选择器/属性/伪类 > 标签 > 通配符 > 继承 > 浏览器默认属性

## [BFC](https://www.cnblogs.com/CandyManPing/p/5562447.html)

[块级格式上下文](https://www.bilibili.com/video/BV1aZ4y1M7gW/?spm_id_from=333.337.search-card.all.click&vd_source=bbffb4019ced31da1e3d2a77ed42bcee)

- 特点
  1. BFC 区域与外部不相关
  2. 可以包含浮动元素
- 触发条件
  1.  根元素
  2.  (浮动元素)float:none 以外
  3.  （内容超出不可见或滚动）overflow:visible 以外 （常用来生成BFC）
  4.  display：inline-block；table-cell、table-caption
  5.  position 的值为 absolute 或 fixed
- 作用
  1. 防止上下边距重叠 （利用BFC隔离上下间的margin）
  2. 清除浮动防止元素塌陷  
  3. 两栏布局，防止文字环绕 （利用BFC可以包含浮动元素）

## [水平垂直居中](https://segmentfault.com/a/1190000016389031?utm_source=tag-newest)

1. 父元素相对定位，子元素绝对定位 margin：auto；top-left-bottom-right 为 0
2. 父元素相对定位，子元素绝对定位设置 left、top：50%，再用 transfrom：translate（-50%，-50%）或者-margin
3. flex
4. grid

```
7. 父：display:table-cell;
       vertical-align: middle;
       text-align: center;
   子:display:inline-block;
```

8. 单行文本水平垂直居中：text-align:center；line-height:父高;
   多行文本也可以，不过由于子元素会继承父元素的 line-height，还需要修改子元素的行高
9. 父：text-align：center；子：vertical-align:middle;在父元素上添加伪元素来设置 height:100%

```
.d{
  height: 100px;
  width: 200px;
  text-align: center;
  border: 1px solid #ccc;
}
.d:before{
  content: "";
  height: 100%;
  background:yellow;
  display: inline-block;
  vertical-align: middle;
}
.d p {
  background:#000;
  color:#fff;
  vertical-align:middle;
  display:inline-block;
}
```

vertical-align：定义`行内`元素的`基线`相对于该元素所在行的基线的垂直对齐
在`表单元格table-cell`中，该元素设置单元格框中的单元格内容的对齐方式

总结：

- 有兼容性要求，宽高固定，推荐 absolute + 负 margin
- 有兼容要求，宽高不固定，推荐 css-table
- 无兼容性要求，推荐 flex
- 移动端推荐使用 flex

## [line-height](https://juejin.im/post/5bf805fde51d453a68008e32)

line-height:两行文字基线之间的距离

- 内联元素的高度是由行高决定的
- line-height 的百分比和数值都是基于当前元素的 font-size 来计算，不同在于继承元素的计算方式

**normal**
取决于用户代理。桌面浏览器（包括火狐）使用大约 1.2 的默认值，具体随元素的 font-family 而定。不同浏览器的默认行高可能存在差异。

**数值**：
根据父元素的 font-size 值计算 line-height 的值，子元素直接继承 line-height 的**设置数值**，根据自身的 font-size 再次计算 line-height 的值。这是设置行高并避免由于继承导致意外结果的首选方法。

**百分比值：**
根据父元素的 font-size 值计算 line-height 的值，子元素继承**计算后**的 line-height 值。

**em**:表示行高为当前字体大小的 2.6 倍

## height 和 width 的百分比差异

- 总结：父元素 height 为 auto 时，子元素百分比会被忽略

height 对百分比也是支持的，但是其和 width 还是有一个明显的区别：当父元素 width 属性为 auto 时，子元素宽度仍然可以使用百分比设置。

对于 height，只要子元素还是在正常文档流当中的，如果父元素的 height 属性为 auto，则子元素 height 设置为百分比会被忽略

如果包含块的高度没有显式指定，且该元素不是绝对定位，那么则计算值为 auto

父级元素的高度为 auto 时，我们设置子元素的高度为 100%，浏览器只能得到 undefined，算不出。

在\<body\>之中的元素的父元素并不仅仅只是\<body\>，还包括了\<html\>。
所以我们要同时设置这两者的 height，只设置其中一个是不行的

- 正常流下，如果块级元素的`width`是个固定值，`margin`是`auto`，则`margin`会撑满剩下的空间；如果`margin`是固定值，`width`是`auto`，则`width`会撑满剩下的空间。这就是流体布局的根本所在。

- **外在盒子和内在盒子**

  外在盒子是决定元素排列方式的盒子，即决定盒子具有块级特性还是内联特性的盒子。外在盒子负责结构布局。

  内在盒子是决定元素内部一些属性是否生效的盒子。内在盒子负责内容显示。

  如 `display: inline-table;` 外在盒子就是`inline`，内在盒子就是`table`。外在盒子决定了元素要像内联元素一样并排在一排显示，内在盒子则决定了元素可以设置宽高、垂直方向的 margin 等属性。如下图

![img](https://user-gold-cdn.xitu.io/2019/6/28/16b9eb290f144367?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

右侧的 table 和左侧的文字在一行排列（外在盒子 inline 的表现特征），同时有拥有自定义宽度 111px（内在盒子 table 可以设置宽高）。

- ```js
  // 三种定位机制使用了4个属性来描述定位元素各边相对于其包含块的偏移。这4个属性被称为偏移属性
  top/right/bottom/left = <length> | <percentage> | auto（默认） | inherit
  /*
  应用于：定位元素（也就是 position 值不是 static 的元素）。无继承性
  
  百分数：对于top和bottom，相对于包含块的 clientHeight；对于right和left，相对于包含块的 clientWidth
  
  这些属性描述了距离包含块最近边的偏移。top描述了定位元素上外边界离其包含块的顶端有多远。如果top为正值，会把定位元素的上外边距边界下移，若为负值，则会把定位元素的上外边距移到其包含块的顶端之上。
  类似地，left描述了定位元素的左外边距边界在其包含块左边界右边（正值）或左边（负值）有多远。如果是正值，会把定位元素的外边距边界移到包含块左边界右边，而负值则将其移到包含块左边界左边。
  所以，正值会导致向内偏移，使边界朝着包含块的中心移动，而负值会导致向外偏移
  偏移定位元素的外边距边界时，带来的影响是元素的所有一切（包含外边距、边框、内边距和内容）都会在定位的过程中移动
  
  注意：
      定位元素的边界是指定位元素 margin 外侧的边界；包含块的包含区域是指包含块的 border 内侧的 padding + content 区域
      如果同时定义了 left 和 right 值，且 width 和 height 有值，那么 left 生效， right 无效，同样，同时定义了 top 和 bottom，top 生效。
  */
  ```

## margin、padding

无论是垂直或水平方向，均是相对于**父元素的宽度**，正常文档流中和设置浮动的情况下，相对于父元素 content-box 的宽度；绝对定位时，相对于包含块 padding-box 的宽度。

## 定位元素的 left/right/bottom/top 百分比值

top 的百分比值是按离其最近的有定位属性的祖先元素的（内容高+padding）值来计算的

## DPR(devicePixelRatio) 设备像素比

它是默认缩放为 100%的情况下，设备像素和 CSS 像素的比值
window.devicePixelRatio=物理像素 /CSS 像素

## border-box 和 content-box 选择

Better box model by default. Everything in Bootstrap gets box-sizing: border-box, making for easier sizing options and an enhanced grid system.

可以看到之所以选择 border-box 是为了**更加方便控制 Dom 的大小，也更加容易实现和使用栅格系统**

在栅格系统中，bootstrap3 是通过百分比来控制 Dom 的大小，使用 border-box 只需要控制宽度即可，否者需要控制宽度和 padding，实现上过于麻烦，而且 padding 容易被修改，一旦被修改就会影响其他的布局。所以 bootstrap 才选择了 border-box 作为框架的统一的盒模型。

## css 选择器

这些都是以它的父元素，如果只知道父元素，可以先随便选择一个它的子元素来选择
特殊--p:nth-child(2) 父元素匹配的第 n 个子元素
p:nth-of-type(2) 第 n 个为 p 的元素
p:nth-last-child(2) 倒数第 n 个
p:nth-last-of-type(2) 倒数第 n 个为 p 的元素
p:nth-last-child(odd) //奇
p:nth-last-child(even) //偶
p:nth-of-type(3n+0) //索引是 3 的倍数的 p 元素

p:last-of-type 父元素的最后一个 p
p:first-of-type 父元素的第一个 p
p:last-child 最后一个 p
p:first-child 第一个 p

p:first-child i //匹配所有作为第一个子元素的 <p> 元素中的所有 <i> 元素
p:first-of-type 选择的每个 p 元素是其父元素的第一个 p 元素
p > i:first-child//匹配所有<p> 元素中的第一个 <i> 元素
总结：有 of-type 的就是其父元素的第 n 个匹配
没有的就是纯粹的满足匹配的第 n 个
attribute 属性中包含 value [title~=flower]  
attribute 属性以 value 开头 [lang|=en] 性中必须是完整且唯一的单词，或者以 - 分隔开 <p lang="en"> <p lang="en-us">
[attribute^=value] 属性的前几个字母是 value 就可以
.attribute 属性以 value 结尾: [attribute$=value]

在 CSS 中伪类一直用 : 表示，如 :hover, :active 等
伪元素在 CSS1 中已存在，当时语法是用 : 表示，如 :before 和 :after
后来在 CSS3 中修订，伪元素用 :: 表示，如 ::before 和 ::after，以此区分伪元素和伪类
由于低版本 IE 对双冒号不兼容，开发者为了兼容性各浏览器，继续使使用 :after 这种老语法表示伪元素
综上所述：::before 是 CSS3 中写伪元素的新语法； :after 是 CSS1 中存在的、兼容 IE 的老语法

## 可继承

可以继承的属性很少，只有**颜色，文字，字体间距行高对齐方式，和列表的样式**可以继承。

- 所有元素可继承：visibility 和 cursor。
- 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
- 终端块状元素可继承：text-indent 和 text-align。
- 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。

## css3

transform 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。
主要取值有：translate、scale、rotate、skew

对应移动，注意 translateZ 是空间里外移动，x 是横轴，y 是竖向

- scale 是放大缩小倍数

- rotate 是旋转度数

- skew 定义沿着 X 和 Y 轴的 2D 倾斜转换。我的理解是是坐标轴变换度数

  ```css
  animation-play-state: paused|running;
  /*动画*/
  @keyframes myfirst {
   from {background: red;}
   to {background: yellow;}
  }
  div {
    animation: myfirst 5s;
    -webkit-animation: myfirst 5s; /* Safari 与 Chrome */
  }
  /*过渡*/
  div {
    transition: width 2s;
    -webkit-transition: width 2s; /* Safari */
  }
  div:hover { width:300px; }
  /*只有属性值改变才会产生过渡*/
  animation: name duration timing-function delay iteration-count direction;
  transform:\scale(0.85,0.90)\ translate(0px,-30px)\ skew(-9deg,0deg)\Animation:
  word-wrap(单词换行)：normal(只允许在断点处换行)|break-world(如果单词过长，截断强制换行);
  ```

* word-break(单词换行)：normal(浏览器默认的换行规则，一般是不允许长单词内部换行) | break-all（允许在单词内换行) | keep-all(只能在半角空格或连字符处换行)

## [background](https://juejin.im/entry/589ff0c75c497d0056358912)

```
background-image: 设置背景图像, 可以是真实的图片路径, 也可以是创建的渐变背景;
background-position: 设置背景图像的位置;
background-size: 设置背景图像的大小;
background-repeat: 指定背景图像的铺排方式;
background-attachment: 指定背景图像是滚动还是固定;
background-origin: 设置背景图像显示的原点[background-position相对定位的原点];
background-clip: 设置背景图像向外剪裁的区域;
background-color: 指定背景颜色。
简写的顺序如下: bg-color || bg-image || bg-position [ / bg-size]? || bg-repeat || bg-attachment || bg-origin || bg-clip
background是一个复合属性, 可设置多组属性, 每组属性间使用逗号分隔, 其中背景颜色不能设置多个且只能放在最后一组。
如设置的多组属性背景图像之间存在重叠, 则前面的背景图像会覆盖在后面的背景图像上。

background: url("image.png") 0% 0%/60px 60px no-repeat padding-box,
            url("image.png") 40px 10px/110px 110px no-repeat content-box,
            url("image.png") 140px 40px/200px 100px no-repeat content-box #58a;
```

[perspective](https://css-tricks.com/how-css-perspective-works/)

## block，inline 及 inline-block 的简单介绍

### 总体概念

1. block 和 inline 这两个概念是简略的说法，完整确切的说应该是 block-level elements (块级元素) 和 inline elements (内联元素)。block 元素通常被现实为独立的一块，会单独换一行；inline 元素则前后不会产生换行，一系列 inline 元素都在一行内显示，直到该行排满。
2. 大体来说 HTML 元素各有其自身的布局级别（block 元素还是 inline 元素）：

- 常见的块级元素有 DIV, FORM, TABLE, P, PRE, H1~H6, DL, OL, UL 等。
- 常见的内联元素有 SPAN, A, STRONG, EM, LABEL, INPUT, SELECT, TEXTAREA, IMG, BR 等

另外：

1. block 元素可以包含 block 元素和 inline 元素；但 inline 元素只能包含 inline 元素。要注意的是这个是个大概的说法，每个特定的元素能包含的元素也是特定的，所以具体到个别元素上，这条规律是不适用的。比如 P 元素，只能包含 inline 元素，而不能包含 block 元素。
2. 一般来说，可以通过 display:inline 和 display:block 的设置，改变元素的布局级别。

### **block，inline 和 inline-block 细节对比**

- display:block

  1. block 元素会独占一行，多个 block 元素会各自新起一行。默认情况下，block 元素宽度自动填满其父元素宽度。
  2. block 元素可以设置 width,height 属性。块级元素即使设置了宽度,仍然是独占一行。
  3. block 元素可以设置 margin 和 padding 属性。

- display:inline

  1. inline 元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
  2. inline 元素设置 width,height 属性无效。
  3. inline 元素的 margin 和 padding 属性，水平方向的 padding-left, padding-right, margin-left, margin-right 都产生边距效果；但竖直方向的 padding-top, padding-bottom, margin-top, margin-bottom 不会产生边距效果。

- display:inline-block

  1. 简单来说就是将对象呈现为 inline 对象，但是对象的内容作为 block 对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个 link（a 元素）inline-block 属性值，使其既具有 block 的宽度高度特性又具有 inline 的同行特性。

  例如：

  inline-block 将会使元素成为一个 inline 元素（如后跟内联元素，将不会换行），但本身却仍然支持 block 元素的属性。

  ```
  <div>A</div>
  <span>B</span>
  ```

  此时 div 为 block 元素，span 为 inline 元素，显示顺序为 A->换行->B。

  对 block 元素使用 inline-block 属性。

  ```
  <div style="display:inline-block;margin-top:10px">A</div>
  <span>B</span>
  ```

  此时 div 为 inline 元素，但仍然支持 margin 的垂直属性 top，显示顺序为 A->同行->B(整体下降 10px)。

  对 inline 元素使用 inline-block 属性。

  ```
  <div>A</div>
  <span style="display:inline-block;margin-top:10px">B</span>
  <span>C</span>
  ```

  此时 div 为 block 元素，B 仍然为 inline 元素，但开始支持 margin 的垂直属性 top，C 为 inline 元素。显示顺序为 A->换行->B->同行->C(B,C 整体下降 10px)。

  虽然 inline-block 有着 block 与 inline 结合的好处的，在某些布局上可以贡献些力量，但是同时它也存在一些问题。

### **水平间隙问题**

我们创建一个导航列表，并将其列表 item 设置为 inline-block，主要代码如下：

```
<div class="nav">
  <a class="nav-item" href="#">导航</a>
  <a class="nav-item" href="#">导航</a>
  <a class="nav-item" href="#">导航</a>
</div>
.nav {
  background: #999;
}
.nav-item{
  display:inline-block; /* 设置为inline-block */
  width: 100px;
  background: #ddd;
}
```

效果图如下：

![img](https://pic4.zhimg.com/80/v2-ff6a8f27b0cf85992621fbeeada411cf_720w.jpg?ynotemdtimestamp=1622903086798)

我们从效果图中可以看到列表 item 之间有一点小空隙，但是我们在代码中并没有设置 margin 水平间距。那么这个空隙是如何产生的呢？

这是因为我们编写代码时输入空格、换行都会产生空白符。而浏览器是不会忽略空白符的，且对于多个连续的空白符浏览器会自动将其合并成一个，故产生了所谓的间隙。

对于上面实例，我们在列表 item 元素之间输入了回车换行以方便阅读，而这间隙正是这个回车换行产生的空白符。

同样对于所有的行内元素（inline，inline-block），换行都会产生空白符的间隙。

### **如何消除空白符**

从上面我们了解到空白符，是浏览器正常的表现行为。但是对于某些场景来说，并不美观，而且间隙大小非可控，所以我们往往需要去掉这个空白间隙。一般来说我们有两种方法来去掉这个换行引起间隙：代码不换行和设置 font-size。

### **代码不换行**

我们了解到，由于换行空格导致产生换行符，因此我们可以将上述例子中的列表 item 写成一行，这样空白符便消失，间隙就不复存在了。其代码如下：

```
<div class="nav">
  <a class="nav-item" href="#">导航</a><a class="nav-item" href="#">导航</a> <a class="nav-item" href="#">导航</a>
</div>
.nav {
  background: #999;
}
.nav-item{
  display:inline-block; /* 设置为inline-block */
  width: 100px;
  background: #ddd;
}
```

但考虑到代码可读及维护性，我们一般不建议连成一行的写法。

![img](https://pic2.zhimg.com/80/v2-b067648c7f051cf9a9846b98c025c259_720w.jpg?ynotemdtimestamp=1622903086798)

### **设置 Font-Size**

首先要理解空白符归根结底是个字符，因此，我们可以通过设置 font-size 属性来控制其产生的间隙的大小。我们知道如果将 font-size 设置为 0，文字字符是没法显示的，那么同样这个空白字也没了，间隙也就没了。

于是顺着这个思路就有了另一个解决方案：通过设置父元素的 font-size 为 0 来去掉这个间隙，然后重置子元素的 font-size，让其恢复子元素文字字符。

所以该方法代码如下：

```
.nav {
  background: #999;
  font-size: 0; /* 空白字符大小为0 */
}
.nav-item{
  display:inline-block;
  width: 100px;
  font-size: 16px; /* 重置 font-size 为16px*/
  background: #ddd;
}
```

![img](https://pic2.zhimg.com/80/v2-b067648c7f051cf9a9846b98c025c259_720w.jpg?ynotemdtimestamp=1622903086798)

使用该方法时需要特别注意其子元素一定要重置 font-size，不然很容易掉进坑里（文字显示不出来）。

### **垂直间隙问题**

由于 inline-block 垂直对齐使用的是 `vertical-align` 属性，而该属性默认的对齐方式为 `baseline`，而基线的位置为小写英文字母`x`的下端沿。该线离底线（text-bottom）还是有点距离的。

下面以实例论证，如下：

```
 <style>
 .nav {
           background: #999;
           display: inline-block
        }
 </style>
 <div class="nav">
   <img src="3148.png" alt="picture">
 </div>
```

效果图如下：

![img](https://pic2.zhimg.com/80/v2-a1c244be55e89a2d8f794667be1ef5c5_720w.jpg?ynotemdtimestamp=1622903086798)

按道理来说，div 的高度应该是图片撑开的高度，所以不可能看到如图所示的大概 3px （不同的字体大小，这个灰色间隙会不一样）的背景色。所以为了解决这个问题，我们可以设置 img 的 `vertical-align` 的值为 `middle`，`text-top`，`text-bottom`都可以（前提是父元素 `line-height` 计算的高度要小于图片的高度）。

所以一般为了避免这个垂直的间隙，在设置 inline-block 的时候，还需要顺手带个 `vertical-align: middle;`

```
 <style>
 .nav {
           background: #999;
           text-align:center;
           display: inline-block;
        }

          </style>
  <div class="nav">
       <img src="3148.png" alt="picture">
  </div>
```

![img](https://pic2.zhimg.com/80/v2-5dd0d28badd2dcfd07885ebf1284dac9_720w.jpg?ynotemdtimestamp=1622903086798)此时就没有了间距

## [如何画一个三角形](https://q.shanyue.tech/fe/css/191.html)
