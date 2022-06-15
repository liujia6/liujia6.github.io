# css
## css 预处理器

- 变量
  - sass 用\$、less 用@、stylus 都可，可以减少重复代码
- mixin 处理属性前缀，Extend 和 Mixin 可以复用代码片段
- 继承
- 嵌套，反映层级和约束
  = @import 和 css 的不同，不会有多个请求，css 文件模块化 4.循环适用于复杂有规律的样式

### postcss

1. PostCSS 的主要功能是让开发者使用 JS 来处理 CSS 的处理器，把 CSS 解析成 JavaScript 可以操作的 AST，并调用插件处理 AST 并得到转换结果

```javascript
plugins: [require('postcss-cssnext')()]
```

### 常用 postcss 插件

- autoprefixer：自动添加浏览器前缀支持
- postcss-pxtorem:将 px 转换为 rem，用于移动端适配
- [cssnext](https://cssnext.github.io/features/)：是一系列与 CSS 未来版本相关的 PostCSS 插件的组合。比如，cssnext 中已经包含了对 Autoprefixer 的使用，因此使用了 cssnext 就不再需要使用 Autoprefixer，有以下常见特性
  - 自定义--属性与 var() 引用
  - 样式规则嵌套
  - color()、hwb()、gray()，函数来调整颜色
  - 用--name 表示 css 属性集，用@apply--name 来调用
  - 自定义媒体查询
  - 自定义选择器
  - 简化、安全的 calc()
  - CSS 模块化
    - 组件的 CSS 类名在使用时会被转换成带唯一标识符的形式。这样就避免了名称冲突。在组件开发中可以继续使用简单的 CSS 类名，而不用担心名称冲突问题,稍微复杂的组件命名规范可采用 bem
- cssnano ：会压缩你的 CSS 文件来确保在开发环境中下载量尽可能的小
- postcss-sprites ：将扫描你 CSS 中使用的所有图像，自动生成优化的 Sprites 图像和 CSS Sprites 代码
- postcss-bem:css 模块命名规则
  - bem 和 suit 都是面向类名的一种规范，suit 是基于 bem 发展的，它帮助你更好的组织样式，以及更好的帮助其他开发人员能识别各种类的目的，在 BEM 模式中没有@utility 和@when 语法
  - BEM 代表块（Block），元素（Element），修饰符（Modifier）
    - block 块指页面的一大块功能区域，比如 header 的 meau 导航块,简写为@b
    - 元素 element 就是块中的一个 div 或 input 框元素,@element 简写为@e
    - modifier 指当我们复用块时，只修改其中部分元素的外观时的变化，@modified 简写为@m
  - suit 外加的功能
    - utility ：处理结构和位置
    - when：处理状态相关

### [bem](https://juejin.im/post/5b925e616fb9a05cdd2ce70d)

| 写法                    | 渲染后     |
| ----------------------- | ---------- |
| @utility clearFix       | u-clearFix |
| @component-namespace el | el-        |
| @b info                 | -info      |
| @m info                 | --info     |
| @e input                | \_\_input  |
| @when bold              | .is-bold   |

例如

```less
@utility utilityName {
  color: green;
}
@component-namespace mine {
  @component el {
    @b alert {
      @m warning {
        ...;
      }
    }
    @b alert {
      @e title {
        @when bold {
          ...;
        }
      }
    }
  }
}
```

- 渲染为

```css
u-utilityName {
  color: green;
}
mine-el-alert--info {
  ...;
}
mine-el-alert__title.is-bold {
  ...;
}
```

1. [CSS 的未来已来](https://juejin.im/post/5dcb9c126fb9a04aba52bdf4#heading-0)

## less 知识点总结

1. 变量用@表示
2. 嵌套，&代表父级选择器引用
3. 媒体查询冒泡简便写法，类名在外，用@media 约束显示的属性
4. 可支持数学加减乘数运算，以最左边有单位的数值单位为准，当左右运算符不能运算时，将右边的单位转为左边的单位
5. 混合方法
   - 可传递参数
   - 可省略方法后的()
   - 可支持默认参数
   - 可用...展开福接受数量不定的参数用@argumnets 引用
   - 可使用！important 加在方法后
   - 可采用循环方法
   - 条件筛选，用 when
6. extends 伪类继承，加 all 会继承原先选择器的伪类如：after，相比方法可减少重复性
7. 有一系列判断类型、颜色操作、数学函数等自带方法函数如 isnumber(blue)//false,lighten()、floor()

```less
//@import "style"//引入外部文件，默认扩展名是less，位置随意但是会预编译在先,，但不会添加 把导入的文件 编译到最终输出中，只引用
@width: 200px;//@声明变量
#colors() {//映射
  primary: blue;
  secondary: green;
}
.toolClass(@size:12px){//函数
  background:#colors[primary];//映射
  border:@size solid black;
}


#header {
  @color:red;//变量作用域，往外层找
  width: @width;//变量，记得用@表示
  height:200-200px+10cm;//计算采用最左边的单位，可支持+、-、*、/
  .toolClass(20px);//混合，可以自定义像是清楚浮动，垂直居中的仓发，需要时再引用类名方法
  .inner{//嵌套
      background:@color;//找到前面的color变量，在{}作用域内。
  }
}
/*生成
#header{
    width:200px;
    height:10px;
    border:20px solid black;
    .inner{
        backgroound:red;
    }
}
*/
@supports not (display: grid) {
   /* 不支持grid的浏览器会应用header样式 */
  #header{
    background:pink;
  }
}
@supports (display: grid) {
  /* 支持grid的浏览器会应用header样式 */
  #header{
    background:blue;
  }
}
@min768: ~"(min-width: 768px)";
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}

/*转化为
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
*/
/*继承：使用extend伪类方法继承声明，和方法的区别在与继承是共用声明，函数是重复声明*/
.animation{
    transition: all .3s ease-out;
    .hide{
      transform:scale(0);
    }
}
#main{
    &:extend(.animation);
}
#con{
    &:extend(.animation .hide);
}

/* 生成后的 CSS */
.animation,#main{
  transition: all .3s ease-out;
}
.animation .hide , #con{
    transform:scale(0);
}


/* all 全局搜索替换*/
#main{
  width: 200px;
}
#main {
  &:after {
    content:"Less is good!";
  }
}
#wrap:extend(#main all) {}

/* 生成的 CSS */
#main,#wrap{
  width: 200px;
}
#main:after, #wrap:after {
    content: "Less is good!";
}
*/
```
