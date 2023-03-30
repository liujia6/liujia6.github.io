(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{500:function(t,a,s){"use strict";s.r(a);var n=s(22),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"实现-vue-父子组件的双向数据绑定"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现-vue-父子组件的双向数据绑定"}},[t._v("#")]),t._v(" 实现 vue 父子组件的双向数据绑定")]),t._v(" "),s("h2",{attrs:{id:"一、前言"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、前言"}},[t._v("#")]),t._v(" 一、前言：")]),t._v(" "),s("p",[s("strong",[t._v("遇到了一个问题")]),t._v("：将新增弹出框抽出为一个外部的组件，将 modal 上绑定的 show 变量变为 true，可以正常打开，正常关闭，但是第二次点击不能正常打开")]),t._v(" "),s("p",[s("strong",[t._v("原因分析")]),t._v("：第一次打开 modal 时，父组件传了 show 的值为 true 给子组件，可以显示，然后在子组件将这个值变为 false 的时候，弹框关闭，因为这个值只在子组件中改变，所以父组件中还是 true，所以这个时候当你再想打开这个组件的时候，就打开不了了，这是因为"),s("strong",[t._v("子组件中的改变没有传到父中")]),t._v("。")]),t._v(" "),s("ul",[s("li",[t._v("以下代码示例中子组件中 fui-modal 上的.sync 修饰符是用来给 modal 组件控制关闭的，用来和 modal 上的 show 属性进行双向绑定，如果去掉的话，modal 上的关闭按钮无效")]),t._v(" "),s("li",[t._v("因为我们自己又对 modal 组件进行了一个封装，又涉及到了封装的这个组件和上级组件之间的父子组件传递，所以用了两个.sync")])]),t._v(" "),s("h2",{attrs:{id:"二、实现父子组件的双向数据绑定"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、实现父子组件的双向数据绑定"}},[t._v("#")]),t._v(" 二、实现父子组件的双向数据绑定")]),t._v(" "),s("ul",[s("li",[t._v("首先，当父组件中的 prop 传入子组件，子组件改变传入的 prop 的时候，父组件中对应的值并不会跟着改变，如果我们想让父组件的值也跟着改变，只能通过在子组件中 prop 改变的时候触发一个事件让父接受，父接受事件并改变父的值")]),t._v(" "),s("li",[t._v("我们可以通过以下两个方法来简化实现点击多次点击父组件都能够正确打开 modal，在子组件中改变也会传递到父组件")])]),t._v(" "),s("h3",{attrs:{id:"_1-自定义组件的-v-model"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-自定义组件的-v-model"}},[t._v("#")]),t._v(" 1）自定义组件的 v-model")]),t._v(" "),s("ol",[s("li",[s("strong",[t._v("普通 v-model")])])]),t._v(" "),s("p",[s("code",[t._v('<input v-model="something">')])]),t._v(" "),s("p",[t._v("仅仅是一个语法糖：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('<input :value="something" @input="something=$event.target.value">\n')])])]),s("p",[s("code",[t._v("v-model")]),t._v(" 指令在表单 "),s("code",[t._v("<input>")]),t._v("、"),s("code",[t._v("<textarea>")]),t._v(" 及 "),s("code",[t._v("<select>")]),t._v(" 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。")]),t._v(" "),s("p",[s("code",[t._v("v-model")]),t._v(" 在内部为不同的输入元素使用不同的属性并抛出不同的事件：")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("text 和 textarea 元素使用 "),s("code",[t._v("value")]),t._v(" 属性和 "),s("code",[t._v("input")]),t._v(" 事件；传 e.tatget.value")])]),t._v(" "),s("li",[s("p",[t._v("checkbox 和 radio 使用 "),s("code",[t._v("checked")]),t._v(" 属性和 "),s("code",[t._v("change")]),t._v(" 事件；传 e.target.checked")])]),t._v(" "),s("li",[s("p",[t._v("select 字段将 "),s("code",[t._v("value")]),t._v(" 作为 prop 并将 "),s("code",[t._v("change")]),t._v(" 作为事件。")]),t._v(" "),s("p",[s("strong",[t._v("2. 自定义组件上的 v-model 实现父子组件双向绑定")])])]),t._v(" "),s("li",[s("p",[t._v("在自定义的组件上 v-model 默认会利用名为 value 的 prop 和名为 input 的事件实现，")])]),t._v(" "),s("li",[s("p",[t._v("vue 提供 model 配置属性。model 是一个对象：接受一个 prop 属性,在有新的值时触发相应事件 event")])]),t._v(" "),s("li",[s("p",[t._v("要让组件的 v-model 生效，它应该 ：在子组件接受指定 prop，并且在 prop 变化时触发一个指定 event")])])]),t._v(" "),s("div",{staticClass:"language-vue extra-class"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[t._v("- 父组件\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Add")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-model")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("add.show"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("add.show = true"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("Add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n语法糖为\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Add")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":value")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("add.show"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@input")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("add.show = $event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("add.show = true"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("Add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("ul",[s("li",[t._v("子组件")])]),t._v(" "),s("div",{staticClass:"language-vue extra-class"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("fui-modal")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":visible.sync")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("fui-modal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\nexport default { \n  //自定义双向绑定的值和事件，value和input是默认值，可以不写\n  model: { \n    prop: 'value', //父组件设置 v-model时，将value传给子组件，可以设置为其他prop \n    event: 'input' //父组件监听input事件，也可以定义其他事件如change \n  }, \n  //用modal定义的prop值，必须的值 \n  props: {\n    value: { // required: true, type: [Boolean], default: false, }, },\n//用watch监听value值变化 \n  watch:{ value(v) { this.$emit('input',\n  v);//传值给父组件, 让父组件监听到这个变化 }, }, }\n")])])]),s("h3",{attrs:{id:"_2-sync-修饰符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-sync-修饰符"}},[t._v("#")]),t._v(" 2）.sync 修饰符")]),t._v(" "),s("p",[t._v("在父组件中用 sync 修饰要改变的属性，它能自动接收到事件并改变值")]),t._v(" "),s("div",{staticClass:"language-vue extra-class"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[t._v("- 父组件\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Add")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":value.sync")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("add.show"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("add.show = true"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("Add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 等价于 --\x3e")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Add")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":value")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("add.show"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("@update:")]),t._v("value")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("add.show = $event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("add.show = true"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("Add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("ul",[s("li",[t._v("子组件")])]),t._v(" "),s("div",{staticClass:"language-vue extra-class"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("fui-modal")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":visible.sync")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("fui-modal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  props"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    value"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// required: true,")]),t._v("\n      type"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Boolean"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  watch"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("newVal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//这里与model不同，.sync指定'update:value'方法来表示value的更新方法")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$emit")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"update:value"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" newVal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("比较： v-model 和.sync 的区别在于 model 是自定义了子组件触发的事件，而 sync 是指定了你在改变值的时候要触发的事件名，使用.sync 的语法更加直观和简洁")]),t._v(" "),s("p",[t._v("补充：")]),t._v(" "),s("p",[s("strong",[t._v("1)")]),t._v(" 子组件$emit('input',val)后，在父组件中监听 input 方法中有两种方法得到 val 值")]),t._v(" "),s("ol",[s("li",[t._v("在父组件内联监听事件中可以用$event 获得 val 的值")]),t._v(" "),s("li",[t._v("用一个 func 的参数接受这个值")])]),t._v(" "),s("div",{staticClass:"language-vue extra-class"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Add")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@input")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("val = $event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("Add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("//$event就是emit的第二个参数val\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Add")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@input")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("func"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("Add")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\nfunc(value){ console.log(value)//value就是emit的第二个参数val }\n")])])]),s("p",[s("strong",[t._v("2)")]),t._v(" 在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 "),s("code",[t._v("$event")]),t._v(" 属性："),s("code",[t._v("v-on:click=\"handle('ok', $event)\"")]),t._v("。")])])}),[],!1,null,null,null);a.default=e.exports}}]);