# vue 使用总结

## [Vue.extend](https://juejin.cn/post/6844904126065688583)

是什么：获取Vue构造函数的子类

正常情况下我们用new Vue()去创建一个新的实例，通过这个Vue构造函数use实现一些插件，那么在有的情况下我们需要一个新的Vue构造函（会在这个新的Vue构造函数的基础上添加属性等）并且需要继承Vue的一些属性和静态方法等

- Vue.extend 返回一个 Vue 的子类，可以再对这个子类构造生成实例
- 其实和 new Vue.extend Vue 构造函数用法一样，只不过使用 vue.extend 它会帮你保证和 Vue 的全局属性和方法等一致，是 Vue 的继承子类
- 通过 vue.extend 方法传入 option 后返回一个组件实例
- vue3 后去除了该 API，如果 vue3，需要使用，可以考虑使用 extend 根节点
- 调研 element-plus 和 antd 的 Message 组件是如何替换 Vue.extend
- 都是使用 createVNode 和 render 组合使用

使用场景

- 微前端下每个微应用都应该继承容器的 Vue，实现在容器注册 vue 插件，每个微应用都能使用同样使用容器注册的 vue 插件
- 编程式调用组件例如 element-ui 的$msg(但是此处其实是无vue插件依赖的，直接用new Vue创建也没问题)

## slots

- 如何提供具名插槽的默认值
  - 先使用插槽，再用\<slot\/\>标签提供插槽
- 使用插槽
  - 具名插槽
    - 2.6 版本之前的旧语法：\<template slot="footer"\>，通过这种方式使用插槽，表明提供\$slots
      - 适用于 jsx 中组件或者 dom 表明是父组件的具名插槽，可以不通过 scopedSlots 作用域插槽去表示
    - 新语法：#footer
  - 作用域插槽
    - 旧语法：\<template slot-scope="context"\>
    - 新语法：#default="context"
- [vue3 jsx](https://github.com/vuejs/babel-plugin-jsx#installation)
- [slots()和 children 对比](https://vuejs.bootcss.com/guide/render-function.html#slots-和-children-对比)
  - children = ALL slots()
  - slots 把插槽细分了
  - 用 children 向子组件传递，可以传递所有插槽，而不是使用 slots.default
  - 有需要采用 children，没有的话，用 slots.default÷

## vue 单根结点

- [vue 为什么根节点只能用一个](vuejs/vue#7088 "comment")
- [vue-fragment](https://github.com/Thunberg087/vue-fragment/blob/master/src/component.js)

**原因**

- 由于技术限制：当前的 diff 算法实现都是基于 vNode 和 dom 真实元素一一对应，依赖于具有单个根的组件，如果允许 Fragments 需要对该算法进行重大更改，不仅要使其正常工作，而且必须使其具有高性能，这是一项非常艰巨的任务
- 代表任何组件的 vue 实例需要绑定到一个单一的 DOM 元素中。唯一可以创建一个具有多个 DOM 节点的组件的方法就是创建一个没有底层 Vue 实例的功能组件

**两种解决方案**：

- 使用 vue 功能组件（见[本期第二条评论](https://github.com/vuejs/vue/issues/7088#issuecomment-345855657)）
- 使用[vue-fragments](https://github.com/y-nk/vue-fragments)（第三方扩展）
- - render 函数中使用 div 包裹子组件
  - 在 mounted 后，修改 this.\$el,将改了后的 dom 插入到 parent 里，并删除原有的 dom

**REACT 实现**

- 在 React 中，解决方法是通过的一个 React.Fragment 标签创建一个虚拟元素

## 函数式组件

[\<template\>：内容模板元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)

**函数式组件（functional component）**

- 是一个不持有状态 data、实例 this 和生命周期的组件。
- 没有 data、生命周期和 this，函数式组件又叫**无状态组件**（stateless component）。

在 Vue 2 中，函数式组件主要有两个**应用场景**

- 作为性能优化，因为它们的初始化速度比有状态组件快得多
- 返回多个根节点

在 Vue 3 中，函数式组件剩下的唯一应用场景就是**简单组件**，比如创建动态标题的组件。否则，建议你像平常一样使用有状态组件

```js
import { h } from 'vue';

const DynamicHeading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots);
};

DynamicHeading.props = ['level'];

export default DynamicHeading;
```

```js
export default {
  name: 'MyInput',
  functional: true,
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  // NOTE 函数式组件没有 this
  render(h, context) {
    const { props, listeners, data } = context;
    return h('input', {
      // DOM 属性
      domProps: {
        value: props.value,
      },
      on: {
        input: ({ target }) => {
          data.on['my-change'](Math.random().toString(36));
          // listeners 是 data.on 的别名
          listeners['my-input'](target.value);
          listeners.input(target.value);
        },
      },
    });
  },
};
```

## 抽象组件

- 没有真实的节点，不去解析渲染成真实的 dom 节点，而只是作为中间的数据过渡层处理，在 keep-alive 中是对组件缓存的处理。
- \<keep-alive\>、\<transition\>、\<transition-group\>等组件的实现是一个对象，注意它有一个属性 abstract 为 true，表明是它一个抽象组件

  - 在抽象组件的**生命周期**过程中，我们可以对包裹的子组件**监听的事件进行拦截**，也可以对子组件进行 **Dom 操作**，从而可以对我们需要的功能进行封装，而不需要关心子组件的具体实现。
- set(vnode, `data.on[${eventName}]`, debounce(event, this.wait, this.options));
- 原理：就是父子组件建立关系时会跳过 abstract 组件

参考

- [用 Vue 编写抽象组件：实现一个按钮 debounce](https://juejin.cn/post/6844903838470635528)
- [原理](https://www.bookstack.cn/read/5865c0921b69e6006b3145a1/spilt.4.src-%E5%BD%BB%E5%BA%95%E6%90%9E%E6%87%82Vue%E4%B8%ADkeep-alive%E7%9A%84%E9%AD%94%E6%B3%95-%E4%B8%8A.md)

[learnVue/Vue.js异步更新DOM策略及nextTick.MarkDown at master · answershuto/learnVue](https://github.com/answershuto/learnVue/blob/master/docs/Vue.js%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0DOM%E7%AD%96%E7%95%A5%E5%8F%8AnextTick.MarkDown)
