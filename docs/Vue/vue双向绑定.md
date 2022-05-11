# vue 双向绑定编写

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>

  <body>
    <div id="app"><input type="text" v-model="text" /> {{text}}</div>
  </body>

  <script type="text/javascript">
    function compile(node, vm) {
      var reg = /\{\{(.*)\}\}/; // 来匹配{{xxx}}中的xxx
      //如果是元素节点
      if (node.nodeType === 1) {
        var attr = node.attributes;
        //解析元素节点的所有属性
        for (let i = 0; i < attr.length; i++) {
          if (attr[i].nodeName == 'v-model') {
            var name = attr[i].nodeValue; //看看是与哪一个数据相关
            node.addEventListener('input', function (e) {
              //将与其相关的数据改为最新值
              vm[name] = e.target.value;
            });
            node.value = vm.data[name]; //将data中的值赋予给该node
            node.removeAttribute('v-model');
          }
        }
      }

      //如果是文本节点
      if (node.nodeType === 3) {
        if (reg.test(node.nodeValue)) {
          var name = RegExp.$1; //获取到匹配的字符串
          name = name.trim();
          //					node.nodeValue = vm[name]; //将data中的值赋予给该node
          new Watcher(vm, node, name); //绑定一个订阅者
        }
      }
    }

    //			在向碎片化文档中添加节点时，每个节点都处理一下
    function nodeToFragment(node, vm) {
      var fragment = document.createDocumentFragment();
      var child;
      while ((child = node.firstChild)) {
        compile(child, vm);
        fragment.appendChild(child);
      }
      return fragment;
    }
    //			Vue构造函数
    //		观察data中的所有属性值，注意增添了observe

    function Vue(options) {
      this.data = options.data;
      observe(this.data, this);
      var id = options.el;
      var dom = nodeToFragment(document.getElementById(id), this);
      //处理完所有节点后，重新把内容添加回去
      document.getElementById(id).appendChild(dom);
    }

    //		实现一个响应式监听属性的函数。一旦有赋新值就发生变化
    function defineReactive(obj, key, val) {
      var dep = new Dep();
      Object.defineProperty(obj, key, {
        get: function () {
          if (Dep.target) {
            dep.addSub(Dep.target);
          }
          return val;
        },
        set: function (newVal) {
          if (newVal === val) {
            return;
          }
          val = newVal;
          console.log('新值' + val);
          //一旦更新立马通知
          dep.notify();
        },
      });
    }

    //		实现一个观察者，对于一个实例 每一个属性值都进行观察。
    function observe(obj, vm) {
      for (let key of Object.keys(obj)) {
        defineReactive(vm, key, obj[key]);
      }
    }
    function observe(data) {
      for (var key in data) {
        // 每个data数据有一个dep，数据变化时，让dep通知所有观察者做出视图更新
        // 在编译时，会获取数据以将视图节点对应watcher（每个watcher需要有不用的更新视图的更新函数，所以一个视图节点对应一个watcher）
        // 将watcher添加到对应数据的dep当中
        if (data.hasOwnProperty(key)) {
          const dep = new Dep();
          Object.defineProperty(data, key, {
            //  enumerable:
            enumerable: true,
            configurable: true,
            get(val) {
              Dep.target && Dep.addSub(Dep.target);
              return val;
            },
            set(val) {
              Dep.notify();
              data[key] = val;
            },
          });
        }
      }
    }
    //		Watcher监听者
    // 因为一个data数据可能有不同的视图节点依赖，所以需要采用发布订阅模式来监听data数据变化更新相关视图节点的变化
    // 在编译时new watcher的时候将当前节点所对应watcher加入订阅器来监听对应data的相关视图变化
    function Watcher(vm, node, name) {
      Dep.target = this;

      this.vm = vm;
      this.node = node;
      this.name = name;

      this.update();

      Dep.target = null;
    }

    Watcher.prototype = {
      update() {
        this.get(); // 通过get将watcher加入订阅器
        this.node.nodeValue = this.value; //更改节点内容的关键
      },
      get() {
        this.value = this.vm[this.name]; //触发相应的get
      },
    };

    //		dep构造函数
    function Dep() {
      this.subs = [];
    }
    Dep.prototype = {
      addSub(sub) {
        this.subs.push(sub);
      },
      notify() {
        this.subs.forEach(function (sub) {
          sub.update();
        });
      },
    };
    var vm = new Vue({
      el: 'app',

      data: {
        text: '赵刚',
      },
    });
  </script>
</html>

```
