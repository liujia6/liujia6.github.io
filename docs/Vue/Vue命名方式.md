# vue 命名规范

- 定义组件名方法
  1. 采用短横线分隔命名
  2. 采用首字母大写命名：既可以用短横线分割名引用，也可以用首字母大写引用，注意在 dom 模板中使用只有短横线有效
- prop 名
  - html 中的特性名是大小写不敏感的，浏览器会把所有大写字符解释为小写字符，当你使用 dom 中的模板时 camelCase 格式的 prop 名需要使用其等价的 kebab-case 命名；例如

```html
<welcome greeting-text="hi"></welcome> props:{ greetingText:String }
```

- 事件名
  - 事件名不会被用作一个 JavaScript 变量名或属性名，所以就没有理由使用 camelCase 或 PascalCase 了。并且 v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 v-on:myEvent 将会变成 v-on:myevent——导致 myEvent 不可能被监听到。

因此，我们推荐你始终使用 kebab-case 的事件名

```javascript
this.$emit("dom-resize");
```

### 总结：

采用 kebab-case 短横线分隔法命名

- 文件夹
- 单文件组件 component 名
- 组件在 html 模板中使用`<my-conponent></my-component>`
- 在模板中 prop 传入到组件中`<my-conponent set-text="hello"></my-component>`
- 所有事件名 this.\$emit('api-reload')

采用 PascalCase 大驼峰命名

- 公共基础组件名 BaseButton
- js 中 component 注册组件
- 组件的 name 属性
- class 类

采用 camelCase 小驼峰命名

- 子组件接受 prop 属性 props：{setText：String}
- 变量和函数一般用小驼峰

其他

- 常量 const PRICE_MAX=1000，采用大写字符+下划线
- 私有变量 下划线开头+小驼峰 let \_this=this
