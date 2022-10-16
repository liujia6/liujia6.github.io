# 实现 vue 父子组件的双向数据绑定

## 一、前言：

**遇到了一个问题**：将新增弹出框抽出为一个外部的组件，将 modal 上绑定的 show 变量变为 true，可以正常打开，正常关闭，但是第二次点击不能正常打开

**原因分析**：第一次打开 modal 时，父组件传了 show 的值为 true 给子组件，可以显示，然后在子组件将这个值变为 false 的时候，弹框关闭，因为这个值只在子组件中改变，所以父组件中还是 true，所以这个时候当你再想打开这个组件的时候，就打开不了了，这是因为**子组件中的改变没有传到父中**。

- 以下代码示例中子组件中 fui-modal 上的.sync 修饰符是用来给 modal 组件控制关闭的，用来和 modal 上的 show 属性进行双向绑定，如果去掉的话，modal 上的关闭按钮无效
- 因为我们自己又对 modal 组件进行了一个封装，又涉及到了封装的这个组件和上级组件之间的父子组件传递，所以用了两个.sync

## 二、实现父子组件的双向数据绑定

- 首先，当父组件中的 prop 传入子组件，子组件改变传入的 prop 的时候，父组件中对应的值并不会跟着改变，如果我们想让父组件的值也跟着改变，只能通过在子组件中 prop 改变的时候触发一个事件让父接受，父接受事件并改变父的值
- 我们可以通过以下两个方法来简化实现点击多次点击父组件都能够正确打开 modal，在子组件中改变也会传递到父组件

### 1）自定义组件的 v-model

1.  **普通 v-model**

`<input v-model="something">`

仅仅是一个语法糖：

```
<input :value="something" @input="something=$event.target.value">
```

`v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。

`v-model` 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 `value` 属性和 `input` 事件；传 e.tatget.value

- checkbox 和 radio 使用 `checked` 属性和 `change` 事件；传 e.target.checked

- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

  **2. 自定义组件上的 v-model 实现父子组件双向绑定**

- 在自定义的组件上 v-model 默认会利用名为 value 的 prop 和名为 input 的事件实现，
- vue 提供 model 配置属性。model 是一个对象：接受一个 prop 属性,在有新的值时触发相应事件 event
- 要让组件的 v-model 生效，它应该 ：在子组件接受指定 prop，并且在 prop 变化时触发一个指定 event

```vue
- 父组件
<Add v-model="add.show" @click="add.show = true"></Add>
语法糖为
<Add
  :value="add.show"
  @input="add.show = $event"
  @click="add.show = true"
></Add>
```

- 子组件
  
```vue
<template>
  <fui-modal :visible.sync="value"> </fui-modal>
</template>
export default { 
  //自定义双向绑定的值和事件，value和input是默认值，可以不写
  model: { 
    prop: 'value', //父组件设置 v-model时，将value传给子组件，可以设置为其他prop 
    event: 'input' //父组件监听input事件，也可以定义其他事件如change 
  }, 
  //用modal定义的prop值，必须的值 
  props: {
    value: { // required: true, type: [Boolean], default: false, }, },
//用watch监听value值变化 
  watch:{ value(v) { this.$emit('input',
  v);//传值给父组件, 让父组件监听到这个变化 }, }, }
```

### 2）.sync 修饰符

在父组件中用 sync 修饰要改变的属性，它能自动接收到事件并改变值

```vue
- 父组件
<Add :value.sync="add.show" @click="add.show = true"></Add>
<!-- 等价于 -->
<Add
  :value="add.show"
  @update:value="add.show = $event"
  @click="add.show = true"
></Add>
```

- 子组件

```vue
<template>
  <fui-modal :visible.sync="value"> </fui-modal>
</template>

<script>
export default {
  props: {
    value: {
      // required: true,
      type: [Boolean],
      default: false
    }
  },
  watch: {
    value(newVal) {
      //这里与model不同，.sync指定'update:value'方法来表示value的更新方法
      this.$emit("update:value", newVal);
    }
  }
};
</script>
```

比较： v-model 和.sync 的区别在于 model 是自定义了子组件触发的事件，而 sync 是指定了你在改变值的时候要触发的事件名，使用.sync 的语法更加直观和简洁

补充：

**1)** 子组件\$emit('input',val)后，在父组件中监听 input 方法中有两种方法得到 val 值

1. 在父组件内联监听事件中可以用\$event 获得 val 的值
2. 用一个 func 的参数接受这个值

```vue
<Add @input="val = $event"></Add>//$event就是emit的第二个参数val
<Add @input="func"></Add>
func(value){ console.log(value)//value就是emit的第二个参数val }
```

**2)** 在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event` 属性：`v-on:click="handle('ok', $event)"`。
