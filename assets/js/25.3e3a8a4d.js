(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{497:function(n,e,t){"use strict";t.r(e);var a=t(22),o=Object(a.a)({},(function(){var n=this.$createElement,e=this._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[e("h1",{attrs:{id:"vue-双向绑定编写"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-双向绑定编写"}},[this._v("#")]),this._v(" vue 双向绑定编写")]),this._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title></title>\n  </head>\n\n  <body>\n    <div id=\"app\"><input type=\"text\" v-model=\"text\" /> {{text}}</div>\n  </body>\n\n  <script type=\"text/javascript\">\n    function compile(node, vm) {\n      var reg = /\\{\\{(.*)\\}\\}/; // 来匹配{{xxx}}中的xxx\n      //如果是元素节点\n      if (node.nodeType === 1) {\n        var attr = node.attributes;\n        //解析元素节点的所有属性\n        for (let i = 0; i < attr.length; i++) {\n          if (attr[i].nodeName == 'v-model') {\n            var name = attr[i].nodeValue; //看看是与哪一个数据相关\n            node.addEventListener('input', function (e) {\n              //将与其相关的数据改为最新值\n              vm[name] = e.target.value;\n            });\n            node.value = vm.data[name]; //将data中的值赋予给该node\n            node.removeAttribute('v-model');\n          }\n        }\n      }\n\n      //如果是文本节点\n      if (node.nodeType === 3) {\n        if (reg.test(node.nodeValue)) {\n          var name = RegExp.$1; //获取到匹配的字符串\n          name = name.trim();\n          //\t\t\t\t\tnode.nodeValue = vm[name]; //将data中的值赋予给该node\n          new Watcher(vm, node, name); //绑定一个订阅者\n        }\n      }\n    }\n\n    //\t\t\t在向碎片化文档中添加节点时，每个节点都处理一下\n    function nodeToFragment(node, vm) {\n      var fragment = document.createDocumentFragment();\n      var child;\n      while ((child = node.firstChild)) {\n        compile(child, vm);\n        fragment.appendChild(child);\n      }\n      return fragment;\n    }\n    //\t\t\tVue构造函数\n    //\t\t观察data中的所有属性值，注意增添了observe\n\n    function Vue(options) {\n      this.data = options.data;\n      observe(this.data, this);\n      var id = options.el;\n      var dom = nodeToFragment(document.getElementById(id), this);\n      //处理完所有节点后，重新把内容添加回去\n      document.getElementById(id).appendChild(dom);\n    }\n\n    //\t\t实现一个响应式监听属性的函数。一旦有赋新值就发生变化\n    function defineReactive(obj, key, val) {\n      var dep = new Dep();\n      Object.defineProperty(obj, key, {\n        get: function () {\n          if (Dep.target) {\n            dep.addSub(Dep.target);\n          }\n          return val;\n        },\n        set: function (newVal) {\n          if (newVal === val) {\n            return;\n          }\n          val = newVal;\n          console.log('新值' + val);\n          //一旦更新立马通知\n          dep.notify();\n        },\n      });\n    }\n\n    //\t\t实现一个观察者，对于一个实例 每一个属性值都进行观察。\n    function observe(obj, vm) {\n      for (let key of Object.keys(obj)) {\n        defineReactive(vm, key, obj[key]);\n      }\n    }\n    function observe(data) {\n      for (var key in data) {\n        // 每个data数据有一个dep，数据变化时，让dep通知所有观察者做出视图更新\n        // 在编译时，会获取数据以将视图节点对应watcher（每个watcher需要有不用的更新视图的更新函数，所以一个视图节点对应一个watcher）\n        // 将watcher添加到对应数据的dep当中\n        if (data.hasOwnProperty(key)) {\n          const dep = new Dep();\n          Object.defineProperty(data, key, {\n            //  enumerable:\n            enumerable: true,\n            configurable: true,\n            get(val) {\n              Dep.target && Dep.addSub(Dep.target);\n              return val;\n            },\n            set(val) {\n              Dep.notify();\n              data[key] = val;\n            },\n          });\n        }\n      }\n    }\n    //\t\tWatcher监听者\n    // 因为一个data数据可能有不同的视图节点依赖，所以需要采用发布订阅模式来监听data数据变化更新相关视图节点的变化\n    // 在编译时new watcher的时候将当前节点所对应watcher加入订阅器来监听对应data的相关视图变化\n    function Watcher(vm, node, name) {\n      Dep.target = this;\n\n      this.vm = vm;\n      this.node = node;\n      this.name = name;\n\n      this.update();\n\n      Dep.target = null;\n    }\n\n    Watcher.prototype = {\n      update() {\n        this.get(); // 通过get将watcher加入订阅器\n        this.node.nodeValue = this.value; //更改节点内容的关键\n      },\n      get() {\n        this.value = this.vm[this.name]; //触发相应的get\n      },\n    };\n\n    //\t\tdep构造函数\n    function Dep() {\n      this.subs = [];\n    }\n    Dep.prototype = {\n      addSub(sub) {\n        this.subs.push(sub);\n      },\n      notify() {\n        this.subs.forEach(function (sub) {\n          sub.update();\n        });\n      },\n    };\n    var vm = new Vue({\n      el: 'app',\n\n      data: {\n        text: '赵刚',\n      },\n    });\n  <\/script>\n</html>\n\n")])])])])}),[],!1,null,null,null);e.default=o.exports}}]);