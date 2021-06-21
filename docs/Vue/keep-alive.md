---
autoGroup-1: VUE
---

# keep-alive缓存

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

## 只让router-view里面指定组件被缓存

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
// 组件 a
export default {
  name: 'a',
  data () {
    return {}
  }
}
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
    path: '/',
    component: () => import('@/views/pages/main.vue'),
    children: [
      {
        name: 'organization',
        path: 'organization',
        component: () => import('@/views/pages/organization/index.vue'),
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        name: 'editOrganization',
        path: 'organization/edit',
        component: () => import('@/views/pages/organization/edit.vue')
      },// 不需要缓存
    ]
  }
];

```

## 实现动态控制缓存
需求：详情页面是单独的一个页面，我们需要从详情跳转回首页的时候保留首页的用户操作例如页数和搜索状态，但是因为新增后列表数据会变需要在跳转回去的时候刷新列表数据

方法
1. 使用router.meta
2. 使用include和exclude

### 使用router.meta
- 法一：监听$route变化,或者使用$router.beforeEach，每次路由跳转判断逻辑并改变meta值
- 法二：在beforeRouterLeave勾子里面判断页面跳转情况改变meta的keepAlive值

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
在a路由组件内部
```javascript
beforeRouteLeave(to, from, next) {
    if(to.name==='edit'){// 缓存逻辑
        to.meta.keepAlive = false; // 让 A 不缓存
    }
    next();
}

```

### 使用include和exclude方法

router-cache组件解决方案，将逻辑写在router的meta的cache函数里面，该cache函数返回需要缓存的组件name值，使用this.$router.beforeEach，每次跳转前将跳转的cache函数返回值作为缓存
- 局限：只能满足两个页面之间的缓存控制，如果需要多页面之间多跳转控制的复杂场景不能满足要求，适用于一般类似新增查看页面返回保存缓存场景
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
        to: '',
        from: '',
      }
    }
  },
  methods: {
    cleanCache(nto, nfrom) {
      const {to, from} = this.lastCacheRoute;
      if (to !== nfrom || from !== nto) {
        this.cacheArr = [];
        this.lastCacheRoute = {
          to: '',
          from: '',
        };
      }
    },
    changeCache(to, from) {
      if (from.meta && from.meta.cache) {
        const cacheName = from.meta.cache(to, from);
        this.cacheArr = cacheName ? [cacheName]: [];
        this.lastCacheRoute = {
          to: to.name,
          from: from.name,
        };
      }
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.cleanCache(to.name, from.name);
      this.changeCache(to, from);
      next();
    });
  },
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

## keep-alive其他知识点 

- 使用router-view或者是include里面写的是路由组件的name都是把`整个页面都缓存`起来了，那么该页面的所有状态例如state都是缓存了的，在激活的时候会调用activated函数
- 首次渲染的时候actived也会调用，调用顺序是在mounted之后，，如果逻辑和creaed或者mounted重复，需要去掉created或者mounted里面的逻辑，不然会重复。让activated里面的函数不在首次渲染时执行。

```javascript
activated() {
    // 首次进入loading为true，不需要执行fetchList，在mounted里面执行过了，获取列表数据后loading会变为false，作为判断首次进入的flag
    this.list.loading === false && this.fetchList();
},
```

### activated钩子函数调用顺序
- component-a初始化：
    - beforeCreate
    - created
    - beforeMount
    - mounted
    - activated
- 从component-a切换到：component-b的生命周期执行顺序
    - component-b beforeCreate
    - component-b created
    - component-b beforeMount
    - component-a deactivated
    - component-b mounted
    - component-b activated
- 可以注意到，这个时候没有了之前看到的destroy类的触发，而是deactivated；mounted之后，也是跟之前类似，也会调用activated方法
- 然后从component-b再切换到： component-a:
    - component-b deactivated
    - component-a activated
- 因为这个时候component-a已经初始化了，所以没有触发create与mount类的hook，而是先component-b停用，再component-a激活；后续不断切换也是只反复调用这两个hook...


### 参考
- [vue-router时 keep-alive 页面缓存问题解决](https://zhuanlan.zhihu.com/p/137458102)
- [vue组件的生命周期与hook执行顺序](https://github.com/jingzhiMo/jingzhiMo.github.io/issues/8)
- [keep-alive组件缓存问题issue #811](https://github.com/vuejs/vue-router/issues/811)
- [keep-alive：组件级缓存](https://juejin.im/post/6844903634841370631#heading-0)
- [vue-router 之 keep-alive](https://www.jianshu.com/p/0b0222954483)