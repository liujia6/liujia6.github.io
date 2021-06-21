# vue命名规范

- 定义组件名方法
  1. 采用短横线分隔命名
  2. 采用首字母大写命名：既可以用短横线分割名引用，也可以用首字母大写引用，注意在dom模板中使用只有短横线有效
- prop名
  - html中的特性名是大小写不敏感的，浏览器会把所有大写字符解释为小写字符，当你使用dom中的模板时camelCase格式的prop名需要使用其等价的kebab-case命名；例如

```html
<welcome greeting-text="hi"></welcome>
props:{
 greetingText:String
}
```

- 事件名
  - 事件名不会被用作一个 JavaScript 变量名或属性名，所以就没有理由使用 camelCase 或 PascalCase 了。并且 v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 v-on:myEvent 将会变成 v-on:myevent——导致 myEvent 不可能被监听到。

因此，我们推荐你始终使用 kebab-case 的事件名

```javascript
this.$emit('dom-resize')
```

### 总结：

采用kebab-case短横线分隔法命名

- 文件夹
- 单文件组件component名
- 组件在html模板中使用`<my-conponent></my-component>`
- 在模板中prop传入到组件中`<my-conponent set-text="hello"></my-component>`
- 所有事件名this.$emit('api-reload')

采用PascalCase大驼峰命名

- 公共基础组件名BaseButton
- js中component注册组件
- 组件的name属性
- class类

采用camelCase小驼峰命名

- 子组件接受prop属性props：{setText：String}
- 变量和函数一般用小驼峰

其他

- 常量 const PRICE_MAX=1000，采用大写字符+下划线
- 私有变量 下划线开头+小驼峰 let _this=this