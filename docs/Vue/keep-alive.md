---
autoGroup-1: VUE
---
# keep-alive 缓存

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
用法也很简单：

```html
<keep-alive>
  <component>
    <!-- 该组件将被缓存！ -->
  </component>
</keep-alive>
```

### include 和 exclude prop

允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

```html
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

## 只让 router-view 里面指定组件被缓存

1. 使用 include/exclude
2. 增加 router.meta 属性

### 使用 include/exclude

```vue
<template>
  <keep-alive include="a">
    <router-view>
      <!-- 只有路径匹配到的视图 a 组件会被缓存！ -->
    </router-view>
  </keep-alive>
</template>
// 组件 a export default { name: 'a', data () { return {} } }
```

缺点：需要知道组件的 name，项目复杂的时候不是很好的选择

### 增加 router.meta 属性

```vue
<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
  </div>
</template>
```

- 路由配置

```javascript
[
  {
    path: "/",
    component: () => import("@/views/pages/main.vue"),
    children: [
      {
        name: "organization",
        path: "organization",
        component: () => import("@/views/pages/organization/index.vue"),
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        name: "editOrganization",
        path: "organization/edit",
        component: () => import("@/views/pages/organization/edit.vue")
      } // 不需要缓存
    ]
  }
];
```

## 实现动态控制缓存

需求：详情页面是单独的一个页面，我们需要从详情跳转回首页的时候保留首页的用户操作例如页数和搜索状态，但是因为新增后列表数据会变需要在跳转回去的时候刷新列表数据

方法

1. 使用 router.meta
2. 使用 include 和 exclude

### 使用 router.meta

- 法一：监听$route变化,或者使用$router.beforeEach，每次路由跳转判断逻辑并改变 meta 值
- 法二：在 beforeRouterLeave 勾子里面判断页面跳转情况改变 meta 的 keepAlive 值

在最外层的包裹路由组件下

```vue
//监听$route变化
<script>
export default {
  watch: {
    $route(to, from) {
      // 新增编辑和查看页面返回需要缓存
      if (/edit|view/.test(to.name) && !/edit|view/.test(from.name)) {
        from.meta.keepAlive = true;
      } else {
        from.meta.keepAlive = false;
      }
    }
  }
};
</script>
```

```javascript
//使用$router.beforeEach
this.$router.beforeEach((to, from, next) => {
  if (/edit|view/.test(to.name) && !/edit|view/.test(from.name)) {
    from.meta.keepAlive = true;
  } else {
    from.meta.keepAlive = false;
  }
  next();
});
```

在 a 路由组件内部

```javascript
beforeRouteLeave(to, from, next) {
    if(to.name==='edit'){// 缓存逻辑
        to.meta.keepAlive = false; // 让 A 不缓存
    }
    next();
}

```

### 使用 include 和 exclude 方法

router-cache 组件解决方案，将逻辑写在 router 的 meta 的 cache 函数里面，该 cache 函数返回需要缓存的组件 name 值，使用 this.\$router.beforeEach，每次跳转前将跳转的 cache 函数返回值作为缓存

- 局限：只能满足两个页面之间的缓存控制，如果需要多页面之间多跳转控制的复杂场景不能满足要求，适用于一般类似新增查看页面返回保存缓存场景
- 缓存也只存在于包裹的内容内，例如，当从keepalive包裹的页面切换到外部再切换回来，此时是没有缓存的，会重新渲染

```vue
<template>
  <keep-alive :include="cacheArr">
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  data() {
    return {
      cacheArr: [],
      lastCacheRoute: {
        to: "",
        from: ""
      }
    };
  },
  methods: {
    cleanCache(nto, nfrom) {
      const { to, from } = this.lastCacheRoute;
      if (to !== nfrom || from !== nto) {
        this.cacheArr = [];
        this.lastCacheRoute = {
          to: "",
          from: ""
        };
      }
    },
    changeCache(to, from) {
      if (from.meta && from.meta.cache) {
        const cacheName = from.meta.cache(to, from);
        this.cacheArr = cacheName ? [cacheName] : [];
        this.lastCacheRoute = {
          to: to.name,
          from: from.name
        };
      }
    }
  },
  created() {
  // 场景：在列表页使用suspendAndPush到详情页，然后详情页有多个不同的tab，点击tab通过router.replace添加了tab对应的query在url上，也会触发缓存的重新计算，这时会导致缓存清空路由挂起失效，再返回列表页会重新加载
  // 处理：此处需要排除用router.replace的方式调用的处理，
 // 1. 无论是router.replace还是router.push都会走路由的钩子，不会引起页面刷新，但是vue-router等路由库会监听路由处理页面渲染
 // 2. 直接使用window.history.replaceState也会走路由的钩子
 // 3. window.history.replace(state,'',url) 
 // state用于路由改变时的传值,通过popstate事件或者window.history.state可以获取到，会经过json序列化copy一份，可以直接传递空对象
 // 第二个参数是历史因素，大部分浏览器不支持，传空值就好，url上传值为我们需要跳转的路由路径
    this.$router.beforeEach((to, from, next) => {
      this.cleanCache(to.name, from.name);
      this.changeCache(to, from);
      next();
    });
  }
};
</script>
```

- 路由配置

```javascript
{
    path: '/',
    component: () => import('@/views/pages/main.vue'),
    children: [{
        name: 'system',
        path: 'system',
        component: () => import('@/views/pages/system'),
        meta: {
          cache: to => {
            const { name } = to;
            // 编辑或者查看页面返回需要有缓存
            if (name === 'viewSystem' || name === 'editSystem') {
              // 当需要缓存时，返回需缓存的组件名，不支持匿名组件
              return 'System';
            }
            return ''; // 否则请返回空字符串
          }
        }
    }]
}
```

鉴于经常会用到详情页面返回列表页面时，列表需要缓存上次访问的状态，可通过keep-alive实现，最简单的使用方法就是在router上加个suspendAndPush方法

```

```

## [原理](https://github.com/answershuto/learnVue/blob/master/vue-src/core/components/keep-alive.js)

keep-alive这个词在HTTP中被称为持久连接，允许多个请求或响应共用一个TCP连接，没有keep-alive的情况下，HTTP请求会在每次结束后关闭，频繁创建和销毁会带来性能开销。

keep-alive组件可以避免组件被频繁地创建和销毁

keep-alive的本质是缓存管理以及特殊的挂载/卸载逻辑，与渲染器的代码强关联

## keep-alive 其他知识点

- 使用 router-view 或者是 include 里面写的是路由组件的 name 都是把 `整个页面都缓存`起来了，那么该页面的所有状态例如 state 都是缓存了的，在激活的时候会调用 activated 函数
- 首次渲染的时候 actived 也会调用，调用顺序是在 mounted 之后，，如果逻辑和 creaed 或者 mounted 重复，需要去掉 created 或者 mounted 里面的逻辑，不然会重复。让 activated 里面的函数不在首次渲染时执行。

```javascript
activated() {
    // 首次进入loading为true，不需要执行fetchList，在mounted里面执行过了，获取列表数据后loading会变为false，作为判断首次进入的flag
    this.list.loading === false && this.fetchList();
},
```

## activated 钩子函数调用顺序

- component-a 初始化：
  - beforeCreate
  - created
  - beforeMount
  - mounted
  - activated
- 从 component-a 切换到：component-b 的生命周期执行顺序
  - component-b beforeCreate
  - component-b created
  - component-b beforeMount
  - component-a deactivated
  - component-b mounted
  - component-b activated
- 可以注意到，这个时候没有了之前看到的 destroy 类的触发，而是 deactivated；mounted 之后，也是跟之前类似，也会调用 activated 方法
- 然后从 component-b 再切换到： component-a:
  - component-b deactivated
  - component-a activated
- 因为这个时候 component-a 已经初始化了，所以没有触发 create 与 mount 类的 hook，而是先 component-b 停用，再 component-a 激活；后续不断切换也是只反复调用这两个 hook...

## 参考

- [vue-router 时 keep-alive 页面缓存问题解决](https://zhuanlan.zhihu.com/p/137458102)
- [vue 组件的生命周期与 hook 执行顺序](https://github.com/jingzhiMo/jingzhiMo.github.io/issues/8)
- [keep-alive 组件缓存问题 issue #811](https://github.com/vuejs/vue-router/issues/811)
- [keep-alive：组件级缓存](https://juejin.im/post/6844903634841370631#heading-0)
- [vue-router 之 keep-alive](https://www.jianshu.com/p/0b0222954483)
