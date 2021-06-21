---
autoGroup-1: VUE
---

# 响应式原理 vue watcher

首先看下以下代码，试想一下以下代码中点击$('#id')元素会发生什么呢？会触发test方法吗
```vue
<template>
  <div>
    <div @click="a+='s'">
      text: {{ text }}
    </div>
    <span>
      age: {{ age }}
    </span>
    <div>
      a: {{ a }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '12',
      age: '12',
      a: 2
    };
  },
  computed: {
    text() {
      console.log('computed text again!');
      if (this.age !== '12') {
        return this.name;
      } else {
        return this.a;
      }
    }
  },
  mounted() {
    console.log(this);
  },
  methods: {
    test() {
      console.log(this.age);
    }
  }
};
</script>

```

答案是会触发。这是什么原因呢，为什么会触发test方法呢，是computed的依赖收集还会收集到test函数里面去？

为了解答这个问题，我们需要首先理解vue响应式的原理    了解computed是如何收集依赖的，为什么computed里面调用的函数里面涉及到的data也能够收集到？带着疑问我们看下computed是如果收集依赖的

- 首先我们看下vue是如何实现依赖收集的

```javascript
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    // ...
  })
}
```
- 数据对象的访问会触发getter方法，那么什么时候会被访问呢，在vue组件的mountComponent方法执行时会需要渲染并访问到数据，从而触发getter

```javascript
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
new Watcher(vm, updateComponent, noop, {
  before () {
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
  }
}, true /* isRenderWatcher */)

```
- 此处实例化了一个renderWatcher，首先进入 watcher 的构造函数如下逻辑，，然后会执行它的 this.get() 方法，进入 get 函数，首先会执行：pushTarget(this)，把 Dep.target 赋值为当前的渲染watcher并压栈（为了恢复用），着又执行了：`value = this.getter.call(vm, vm)`this.getter 对应就是 updateComponent函数，这实际上就是在执行：`vm._update(vm._render(), hydrating)`,它会先执行 vm._render() 方法，因为之前分析过这个方法会生成 渲染 VNode，并且在这个过程中会对 vm 上的数据访问，这个时候就触发了数据对象的 getter。
```javascript
export default class Watcher {
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    // 如果是renderWatcher，记录当前的watcher
    if (isRenderWatcher) {
      vm._watcher = this
    }
    // 全局watchers记录
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
    // 从此处可以看到watcher有4中类型分别是deep、user、lazy、sync类
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
    // watch 转换'a.b.c'为this.a.b.c,转换路径
      this.getter = parsePath(expOrFn)
    }
    // 这里调用了get方法，如果lazy为true代表是computed属性，此处先忽略。
    this.value = this.lazy
      ? undefined
      : this.get()
  }
  get () {
  // 把 Dep.target 赋值为当前的渲染 watcher 并压栈（为了恢复用）
    pushTarget(this)
    let value
    const vm = this.vm
    try {
    // 调用updateComponent方法，在此处组件渲染
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }
  run () {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}

```
- 从此处我们可以看到const dep = new Dep() 实例化一个 Dep 的实例，这表示vue中每个data都会有一个dep实例，并在getter中通过dep.depend()做依赖收集，
- 可以看到有Dep.target的判断， name这个Dep。t

源码中初始化computed属性调用initComputed函数 ，initComputed函数将
computed属性也是一个watcher实例

```javascript

const computedWatcherOptions = { lazy: true }
function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
  // create internal watcher for the computed property.
  // 为每个computed属性都创建一个Watcher
  watchers[key] = new Watcher(
    vm,
    getter || noop,
    noop,
    computedWatcherOptions
  )
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    }
  }
}

export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  Object.defineProperty(target, key,  {
    enumerable: true,
    configurable: true,

// 调用计算属性时会触发其Object.defineProperty的get访问器函数
    get: function computedGetter () {
        const watcher = this._computedWatchers && this._computedWatchers[key]
        if (watcher) {
// 注意，这时候的 Dep.target 是渲染 watcher，所以 this.dep.depend() 相当于渲染 watcher 订阅了这个 computed watcher 的变化。
            watcher.depend()
            return watcher.evaluate()
        }
    },
    set: userDef.set || noop
}
}
```
### computed属性特性：

1. 为每个computed属性创建了一个watcher。
2. 为每个computed属性设置Object.defineProperty代理使得computed属性能通过this访问
3. 在vue $mount函数里面生成渲染watcher，染watcher 会立即求值，调用 其getter 方法，也就是会执行 updateComponent 方法。在 vm._render() 过程中，会执行我们编译出的 render 函数。这样就会调用我们的 computed属性的的 get 访问器：


```javascript
export default class Dep {
  static target: ?Watcher;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null
const targetStack = []
function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}
export

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

```

## 总结

1. vue在mount的时候会new一个render watcher，并且传入更新渲染函数，
2. watcher构造函数会将当前render watcher放入Dep.target中，然后调用render方法，在render方法中会读取data数据并触发组件的data的getter。此时，在每个data的getter中都会调用每个data的dep实例的depend方法，将该render watcher 添加到data的subs数组当中。