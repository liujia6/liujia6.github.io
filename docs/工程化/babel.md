## Babel

[BABEL 中文官网](https://www.babeljs.cn/docs/)

#### 参考：[一文彻底读懂 Babel](https://zhuanlan.zhihu.com/p/326824078)

#### 配置：[前端科普系列-Babel：把 ES6 送上天的通天塔](https://zhuanlan.zhihu.com/p/129089156)

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
- built-in：运行时转换 api
  - 像 `Array.includes` 和 `Promise` 、 `weekMap`这些都属于 built-in
  - 例如数组的静态方法 Array.from()、实例方法 arr.includes() 等，需要引入 corejs 作为 polyfill（垫片），从而能够在运行时提供支持。

`@babel/preset-env`，它的作用是根据环境来转换代码。

```javascript
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": "last 2 Chrome versions"
      }
    ]
  ]
}
```

`useBuiltIns`这个属性决定是否引入 polyfill，可以配置三个值：false（不引入）、usage（按需引入）和 entry（项目入口处引入）；`corejs`表示引入哪个版本的 core-js，可以选择 2（默认）或者 3，只有当 useBuiltIns 不为 false 时才会生效。

@babel/polyfill 转换新的属性 API

@babel/runtime ：运行时通过调用函数转换调用辅助函数

**core-js**

- 它是 JavaScript 标准库的 polyfill
- 它尽可能的进行模块化，让你能选择你需要的功能
- 它和 babel 高度集成，可以对 core-js 的引入进行最大程度的优化

目前我们使用的默认都是`core-js@2`，但它已经封锁了分支，在此之后的特性都只会添加到`core-js@3`，因此也是推荐使用最新的`core-js@3`

**@babel/plugin-transform-runtime** 除了能够转换上面的辅助函数，还能对代码中的新特性 API 进行一个转换
