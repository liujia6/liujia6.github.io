# Babel

[BABEL 中文官网](https://www.babeljs.cn/docs/)

#### 参考：[一文彻底读懂 Babel](https://zhuanlan.zhihu.com/p/326824078)

#### 配置：[前端科普系列-Babel：把 ES6 送上天的通天塔](https://zhuanlan.zhihu.com/p/129089156)

polyfill配置：[javascript - Babel7 相关_个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000039347539)

![img](https://pic3.zhimg.com/80/v2-29d8d4701f6df08ccafc853af268b5a2_720w.jpg)

## 定义

- Babel 是一个 JavaScript 编译器。主要用于将高版本的 JavaScript 代码转为向后兼容的 JS 代码，从而能让我们的代码运行在更低版本的浏览器或者其他的环境中。

babel5 及之前是一个包含 CLI 工具+编译器+转换器的集合工具包；babel6 之后进行了拆分，集合包被分成多个包：

- `@babel/cli`
- 是 Babel 自带了一个内置的 CLI 命令行工具，我们就可以通过命令行来编译文件；
  
- 它有两种调用方式，可以通过全局安装或者本地安装调用，选用一种即可，推荐在项目本地安装。

babel 转换的阶段分为解析->转换->生成

- 解析（parsing）

  - @babel/parser 将源码解析成 AST
- 转换（transforming）

  - babel 的语法转换功能依赖于各种插件
- 生成（generating）

  - @babel/generator 将转好好的 AST 重新生成代码

## 配置

- `plugins`：babel 中使用的插件，这些插件可以控制如何转换代码
- `presets`：babel 可以使用哪些新的语法特性，一个 presets 对一组新语法的特性提供了支持，多个 presets 可以叠加。presets 其实是一组 plugins 的集合，每个 plugin 完成一个新语法的转换工作。presets 是按照 ECMAScript 草案来组织的，通常可以分为三大类：

**年度标准**

- ES2015 - 包含 2015 年加入的新特性
- ES2016 - 包含 2016 年加入的新特性
- ES2017 - 包含 2017 年加入的新特性
- env - 包含当前所有 ECMAScript 标准的新特性

**被社区提出未写入标准**

- stage0 一些 Babel 插件实现了对这些特性的支持，但是不确定是否会被定为标准
- stage1 值得被纳入标准的特性
- stage2 已被起草，将被纳入标准里
- stage3 已定稿，各大浏览器厂商和 NodeJS 社区开始着手实现
- stage4 在接下来一年会纳入标准

**支持特定场景的语法特征**

- babel-plugin-react 支持 React 开发里的 JSX 语法
- babel-plugin-import

### Babel 插件

- [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
- 核心库——@babel/core
  - @babel/core 模块是一个可以完成代码字符串转换的库，babel 所有的插件都是通过核心库来进行开发和加载的，如下是官方给的使用示例：

```
const babel = require("@babel/core");
babel.transform("code", optionsObject);
```

- syntax：语法
  - 像 `const`、`=>` 这些默认被 Babel 转译的就是 syntax 的类型
  - Sytanx 类型。例如箭头函数、const/let 等语法特性，babel 可以通过[各种插件](https://babeljs.io/docs/en/plugins)实现兼容。
- pollyfill
  - 像promise这种新的API需要引入polyfill实现
  

## pollyfill

- [前端工程化 - Babel7 转码（三）- preset-env + transform-runtime_个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000020237785?utm_source=sf-similar-article)
- [@babel/preset-env - 姜瑞涛的官方网站](https://www.jiangruitao.com/babel/babel-preset-env/)

**core-js**

- 它是 JavaScript 标准库的 polyfill
- 它尽可能的进行模块化，让你能选择你需要的功能
- 它和 babel 高度集成，可以对 core-js 的引入进行最大程度的优化

目前我们使用的默认都是`core-js@2`，但它已经封锁了分支，在此之后的特性都只会添加到`core-js@3`，因此也是推荐使用最新的`core-js@3

### 配置方式

1. preset-env预设的配置`useBuiltIns`，`"usage" | "entry" | false`，默认值是 false。
   - `false`：需要在 js 代码第一行主动 import '@babel/polyfill'，会将@babel/polyfill 整个包全部导入。
     （不推荐，能覆盖到所有 API 的转译，但体积最大）
   - `entry`：需要在 js 代码第一行主动 import '@babel/polyfill'，会将 browserslist 环境不支持的所有垫片都导入。
     （能够覆盖到‘hello‘.includes(‘h‘)这种句法，足够安全且代码体积不是特别大）
     - 根据browserslist 将环境不支持的所有垫片都导入，足够安全，其经过了browserslist过滤所需要的，代码量中等。可优化
   - `usage`：项目里不用主动 import，会自动将代码里已使用到的、且 browserslist 环境不支持的垫片导入。
     （但是检测不到‘hello‘.includes(‘h‘)这种句法，对这类原型链上的句法问题不会做转译，**书写代码需注意**）
     - 按需引入，处理不了nodeModules，需要所有nodeModules库都符合规范，不然容易报错，代码体积最小
2. `targets`，用来配置需要支持的的环境，不仅支持浏览器，还支持 node。如果没有配置 targets 选项，就会读取项目中的 browserslist 配置项。
3. @babel/plugin-transform-runtime插件配合preset-env表示将代码由ES6编译为可执行的ES5，不会污染全局



