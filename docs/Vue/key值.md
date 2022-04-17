# vue 中 key 值的作用

首先看下官方文档中对 key 值的介绍

- [key](https://cn.vuejs.org/v2/api/#key 'key')
- [维护状态](https://cn.vuejs.org/v2/guide/list.html#%E7%BB%B4%E6%8A%A4%E7%8A%B6%E6%80%81 '维护状态')

## 理解

- 维护状态
  - 如果在列表循环中不为子节点加 key 值属性，vue 会采用就地复用的策略，
    - 就地复用的策略就是例如你在列表中插入了一个元素，原来的对应顺序（位置）上的元素都不会更新，只会更新数据变化，将多余的末尾元素直接删除，具体请看[Vue2.0 v-for 中 :key 到底有什么用？](https://www.zhihu.com/question/61064119)
- key 值原理
  - 当 vue 在判断两个节点是否是同一个节点的时候，首先会比较 key 值，如果两个元素 key 值一致，则表示是同一个元素，则可以对改元素执行 dom 更新变化，如果 key 不相同，则认为是一个新的节点
  - key 值不相同的 dom 结构，被认为是不同的节点，如果修改 dom 的 key，vue 会认为是一个新的节点，会 unMount 原来的节点并删除，并重新渲染 key 值所在的节点
  - 当该节点被 transition 包围时，元素 key 值的改变，相当于元素变化 v-if，会引发过渡动画的效果

### 参考

- [Vue2.0 v-for 中 :key 到底有什么用？](https://www.zhihu.com/question/61064119)
