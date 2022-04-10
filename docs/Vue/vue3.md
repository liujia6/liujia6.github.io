# teleport 组件

如果用过 `React` 的同学，[可能对于]() `Portals` 比较熟悉，其实这两个是一个概念。[详见](https://links.jianshu.com/go?to=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fportals.html)。在 `Vue2`，如果想要实现类似的功能，需要通过第三方库 [portal-vue](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FLinusBorg%2Fportal-vue) 去实现，感兴趣可以了解一下

> Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。
>
> ```js
> ReactDOM.createPortal(child, container)
> ```
>
> 第一个参数（`child`）是任何[可渲染的 React 子元素](https://zh-hans.reactjs.org/docs/react-component.html#render)，例如一个元素，字符串或 fragment。第二个参数（`container`）是一个 DOM 元素。

## 使用场景

### 背景

1. 有时组件模板的一部分逻辑上属于该组件，而从技术角度来看，最好将模板的这一部分移动到 DOM 中 Vue app 之外的其他位置。

2. 一个 portal 的典型用例是当父组件有 `overflow: hidden` 或 `z-index` 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：

例如 modal

- 逻辑上会将 button 和 modal 放到一个组件，但是实际上会把 dom 结构放到 body 下
- teleport 中的 to 属性会将默认插槽的内容放入该 to 所属的元素的子集
- 多个 `<teleport>` 组件可以将其内容挂载到同一个目标元素。顺序将是一个简单的追加——稍后挂载将位于目标元素中较早的挂载之后
- 请注意，这将移动实际的 DOM 节点，而不是被销毁和重新创建，并且它还将保持任何组件实例的活动状态。所有有状态的 HTML 元素 (即播放的视频) 都将保持其状态。

```vue
<teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        I'm a teleported modal! 
        (My parent is "body")
        <button @click="modalOpen = false">
          Close
        </button>
      </div>
    </div>
</teleport>
```

### Teleport 的使用

我们希望 Dialog 渲染的 dom 和顶层组件是兄弟节点关系, 在`index.html`文件中定义一个供挂载的元素:

```html
<body>
  <div id="app"></div>
  <div id="dialog"></div>
</body>
```

定义一个`Dialog`组件`Dialog.vue`, 留意 `to` 属性， 与上面的`id`选择器一致：

```vue
<template>
  <teleport to="#dialog">
    <div class="dialog">
      <div class="dialog_wrapper">
        <div class="dialog_header" v-if="title">
          <slot name="header">
            <span>{{ title }}</span>
          </slot>
        </div>
      </div>
      <div class="dialog_content">
        <slot></slot>
      </div>
      <div class="dialog_footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </teleport>
</template>
```

最后在一个子组件`Header.vue`中使用`Dialog`组件, 这里主要演示 Teleport 的使用，不相关的代码就省略了。`header`组件

```
<div class="header">
    ...
    <navbar />
    <Dialog v-if="dialogVisible"></Dialog>
</div>
...
```

Dom 渲染效果如下： ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/712e61d275cb4b7da5252bb9cd6d2afa~tplv-k3u1fbpfcp-watermark.awebp) 图片. png 可以看到，我们使用 `teleport` 组件，通过 `to` 属性，指定该组件渲染的位置与 `<div id="app"></div>` 同级，也就是在 `body` 下，但是 `Dialog` 的状态 `dialogVisible` 又是完全由内部 Vue 组件控制.

## 参考

- https://juejin.cn/post/6940454764421316644

# [插槽](https://v3.cn.vuejs.org/guide/migration/slots-unification.html)

v-slot:可以用#替换:父 template 上用具名插槽和作用域插槽，v-slot 只能使用在 template 元素上。

v-bind：可以用：替换

v-on：可以用@替换

1. 组件中用`<slot>backup（编写默认值）</slot>`使用时直接将插槽内容放入模板中
2. 具名插槽：让组件中可以使用多个不同的插槽。
   - 通过给 slot 定义 name 属性，在使用时通过 template 的 v-slot 指定对应 slot 的名称
     - 组件中`<slot name="header"></slot>`
     - 使用时`<template v-slot:header>这里是header插槽内容</template>`
3. 作用域插槽：因为父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的，使用作用域插槽来在 slot 使用的父组件中访问 slot 定义子组件内部的一些可用数据。
   - 通过给子 slot 绑定一个组件内元素，在父 template 上通过 v-slot:(defalut)="slotProps",然后就可以在父元素里面通过 slotProps 元素来调用在子 slot 绑定的元素了，也可以用 v-slot:(defalut)="{property}",这样是利用解构赋值直接取出来了想要用的数据，不需要再调用了，更加方便
     - 组件中：`<slot :users="user"><slot>`， slot 组件上绑定的属性，称为插槽 props，即父传子
     - 使用中：`<template name="default" v-slot:default="slotProps">{{slotProps.users.lastName}}</template>`
   - 插槽结构

```html
<current-user v-slot="{ user }">
      {{ user.firstName }}
    </current-user>
```

你甚至可以定义后备内容，用于插槽 prop 是 undefined 的情形：

```html
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```

- 旧语法 slot
- slot 特性的具名插槽
  - 在使用时

```vue
<template slot="header"><div>backup</div></template>
```

- slot-scope 特性的作用域插槽
  - slot-scope 可接受传递给插槽的 prop
  - `<template slot="default" slot-scope="sotProps">{{slotProp.msg}}</template>`
- \$slots 和 slots-scope：
  - [\$slots](https://www.jianshu.com/p/7b0d437db9f6)是一个包含了当前组件使用 slot 实例的对象，键名是 slot 的 name，默认是 default ,可以使用 createElement('div',this.\$slots.slotName)来将 slotVNode 直接转换为对应 dom 节点
  - \$scopedSlots{ [name: string]: props => Array<VNode> | undefined }， 作用域插槽函数现在保证返回一个 VNode 数组，可以向函数中传递 dom 属性对象参数，会合并。

```js
props: ['message'],
render: function (createElement) {
  // `<div><slot :text="message"></slot></div>`
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.message
    })
  ])
}
Vue.component('blog-post', {
  render: function (createElement) {
    var header = this.$slots.header
    var body = this.$slots.default
    var footer = this.$slots.footer
    return createElement('div', [
      createElement('header', header),
      createElement('main', body),
      createElement('footer', footer)
    ])
  }
})
```

```js
import { useSlots, useAttrs } from 'vue';

const slots = useSlots();
const attrs = useAttrs();

export default {
  setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs);

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots);

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit);

    // TODO: translation
    // Expose public properties (Function)
    console.log(context.expose);
  },
};
```

大部分更改已经在 2.6 中发布。因此，迁移可以一步到位：

1. 在 3.x 中，将所有 `this.$scopedSlots` 替换为 `this.$slots`。
2. 将所有 `this.$slots.mySlot` 替换为 `this.$slots.mySlot()`。

`context` 是一个普通的 JavaScript 对象，也就是说，它不是响应式的，这意味着你可以安全地对 `context` 使用 ES6 解构。
