## 权衡的艺术

* **声明式框架试图带来的性能消耗**

  * **Vue采用声明式的视图框架** **，由于声明式的代码不优于命令式代码的性能，我们需要关注性能优化**
  * **声明式代码的更新性能消耗=找出差异的性能消耗+直接修改的性能消耗，而****虚拟DOM则是为最小化找出差异的性能消耗而出现的**
* **运行时与编译时**

  * **运行时**
* **通过框架提供的方法，用户的代码在浏览器中直接调用框架的方法执行**
* **编译时**

  * **用户的代码需要借助工具编译器编译成浏览器最后执行的代码后再放到浏览器执行**
  * **优点**

    * **性能会更好，免去了一部分执行代码带来的性能消耗**
  * **缺点**

    * **灵活性弱，必须编译后才能执行难**
* **Vue.js采用运行时+编译时**

  * 保留了虚拟  **dom** ，但是会通过响应式去控制虚拟 **dom** 的颗粒度，在预编译里面，又做了足够多的性能优化，做到了按需更新。
* **svelte采用纯编译时，为性能而生**

## 框架设计的核心要素

* **框架设计**

  * **框架提供开发环境和生产环境两种不同的包**
* **只在开发环境中为用户提供友好的警告信息，不会增加生产环境代码的体积**
* **在顶级调用函数上使用pure注释使得编译器可以tree-shaking**
* **不同的输出格式**
* **IIFE**

  * **支持在浏览器引入script包的cdnjs文件使用**
* **esm**

  * **支持直接引入esm格式的资源**
* **esm-bundler**

  * **用户可以通过webpack配置自行决定构建资源的目标环境**
  * **__DEV__常量会变成process,env.NODE_ENV**
* **cjs**

  * **支持node环境的服务端渲染**
* **特性开关**

  * **用户可以通过设置来开启或者关闭对应的特性，通过tree-shaking来减少最终资源的体积**
* **错误处理**

  * **决定应用的健壮性以及用户开发时错误处理的心智负担**

## vuejs3的设计思路

## 组件的本质

* **组件是一组dom元素的封装**
* 渲染器的作用是把虚拟DOM对象渲染为真实DOM元素，其精髓在于后续的更新，会用过diff算法找出变更点，只会更新需要更新的内容

## 响应式

* **分支切换与cleanup**
  * **定义：在字段obj,ok的值发生变化时，代码执行的分支会跟着变化**

```plain
const data = {ok: true, text: "hello vue3!"}
const obj = new Proxy(data, { ... })
effect(()=>{
  // 没有第9行的清理，effect run会被打印3次
  console.log("effect run");
  document.getElementById("app").innerText = obj.ok ? obj.text : "not";
})
```

* **分支切换可能会导致遗留的副作用函数**

  * **obj.ok值的不同会有不同的子依赖**
* **解决：通过保存一个effect函数的依赖dep，在每次执行effect时重新计算dep**![](https://cdn.nlark.com/yuque/0/2022/png/2198140/1668353866943-022a5f2a-42c2-48f0-97f7-d4649b5e60fb.png)
* **嵌套的effect**
* **场景：父子组件effect嵌套**
* **解决：通过**

## diff算法

**快速 diff算法在实测中性能最优。借鉴了文本 Diff 中的预处理思路，先处理新旧两组子节点中相同的前置节点和相同的后置节点。当前置节点和后置节点全部处理完毕后，如果无法简单地通过挂载新节点或者卸载已经不存在的节点来完成更新，则需要根据节点的素引关系，构造出一个最长递增子序列。最长递增子序列所指向的节点即为不需要移动的节点。**

* **找到两边的相同的前后节点**
* **找到剩余的最长递增子序列**
* **以上为不需要移动的节点，最后找出差异来新增或者删除多余的节点**

1. **组件插槽**
2. **插槽在编译组件时有两个重点**
   1. **如果组件有使用插槽那么其render函数会返回一个插槽数组 **

```plain
function render(){
	return [{
    type:'header',
    chi ldren:[this.$slots.header()]
  }]
}
定义slots对象为children
const slots = vnode.Children
```

## 实现最简单的响应式更新

- 副作用函数，执行该函数后，有副作用（body.innerHTML 会改变）副作用函数，执行该函数后，有副作用（body.innerHTML 会改变）

```js
let data = { text: 'hello world' };

// 副作用函数，执行该函数后，有副作用（body.innerHTML会改变）
function effect() {
  document.body.innerHTML = obj.text;
}
// 希望该值变化时 effect函数能执行
obj.text = 'hello vue3';

const bucket = new Set();
const obj = new Proxy(obj, {
  get(target, key) {
    bucket.add(effect);
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    bucket.forEach((item) => item());
    return true;
  },
});
```

提供注册 effect 的方法

```js
/**
 * 提供注册effect的方法,通过一个全局effect变量，收集依赖的一刻只能有一个副作用函数在执行
 */
let activeEffectFn = null;
function effect(fn) {
  activeEffectFn = fn;
  fn();
}

const bucket = new Set();
const obj = new Proxy(obj, {
  get(target, key) {
    if (activeEffectFn) {
      bucket.add(effectFn);
    }
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    bucket.forEach((item) => item());
    return true;
  },
});
```

```js
/**
 * 提供注册effect的方法,通过一个全局effect变量，收集依赖的一刻只能有一个副作用函数在执行
 */
let activeEffectFn = null;
function effect(fn) {
  activeEffectFn = fn;
  fn();
}
// 使用weakMap的原因：如果引用的对象没有引用了，说明用户不需要这个值了，
// 如果这里不使用weakMap，那么这个dep依赖不会被回收，导致内存溢出
const bucket = new WeakMap();
const obj = new Proxy(obj, {
  get(target, key) {
    if (!activeEffectFn) return target[key];
    let depsMap = bucket.get(target);
    if (!depsMap) {
      bucket.set(target, new Map());
    }
    const deps = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (deps = new Set()));
    }
    depsMap.add(activeEffect);
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    // 实质上就是通过全局加了一个weakMap管理所有代理的对象依赖effect，其中又分了对象的每个属性的依赖
    const effects = bucket.get(target)?.get(key);
    effects?.forEach((item) => item());
  },
});
```

分支切换

```js
/**
 * 提供注册effect的方法,通过一个全局effect变量，收集依赖的一刻只能有一个副作用函数在执行
 */
let activeEffectFn = null;
function effect(fn) {
  activeEffectFn = fn;
  cleanup(fn);
  fn();
}
function cleanup(effect) {
  // effect.deps存放的是effect函数中对应不同key的deps函数集合
  effect.deps.forEach((item) => {
    // 将effect从deps集合中删除清空
    item.delete(effect);
  });
  effect.deps = [];
}
// 使用weakMap的原因：如果引用的对象没有引用了，说明用户不需要这个值了，
// 如果这里不使用weakMap，那么这个dep依赖不会被回收，导致内存溢出
const bucket = new WeakMap();
const obj = new Proxy(obj, {
  get(target, key) {
    if (!activeEffectFn) return target[key];
    let depsMap = bucket.get(target);
    if (!depsMap) {
      bucket.set(target, new Map());
    }
    const deps = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (deps = new Set()));
    }
    depsMap.add(activeEffect);
    // ADD: 将对应key的deps放入activeEffectFn
    activeEffectFn.deps.push(deps);
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    // 实质上就是通过全局加了一个weakMap管理所有代理的对象依赖effect，其中又分了对象的每个属性的依赖
    const effects = bucket.get(target)?.get(key);
    // 构造此数据变量以解决effect函数中clean函数的delete后立即add导致的无限循环的问题
    const effectsToRun = new Set(effects);
    effectsToRun?.forEach((item) => item());
  },
});
```

嵌套的 effect

- 父子组件嵌套 effect
- 通过栈来解决

```js
/**
 * 提供注册effect的方法,通过一个全局effect变量，收集依赖的一刻只能有一个副作用函数在执行
 */
let activeEffectFn = [];
function effect(fn) {
  activeEffectFn = fn;
  activeEffectFn.push(fn);
  cleanup(fn);
  fn();
  activeEffectFn.pop();
  activeEffectFn = activeEffectFn.at(-1);
}
function cleanup(effect) {
  // effect.deps存放的是effect函数中对应不同key的deps函数集合
  effect.deps.forEach((item) => {
    // 将effect从deps集合中删除清空
    item.delete(effect);
  });
  effect.deps = [];
}
// 使用weakMap的原因：如果引用的对象没有引用了，说明用户不需要这个值了，
// 如果这里不使用weakMap，那么这个dep依赖不会被回收，导致内存溢出
const bucket = new WeakMap();
const obj = new Proxy(obj, {
  get(target, key) {
    if (!activeEffectFn) return target[key];
    let depsMap = bucket.get(target);
    if (!depsMap) {
      bucket.set(target, new Map());
    }
    const deps = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (deps = new Set()));
    }
    depsMap.add(activeEffect);
    // ADD: 将对应key的deps放入activeEffectFn
    activeEffectFn.deps.push(deps);
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    // 实质上就是通过全局加了一个weakMap管理所有代理的对象依赖effect，其中又分了对象的每个属性的依赖
    const effects = bucket.get(target)?.get(key);
    // 构造此数据变量以解决effect函数中clean函数的delete后立即add导致的无限循环的问题
    const effectsToRun = new Set(effects);
    effectsToRun?.forEach((item) => item());
  },
});
```

防止无限循环

```js
/**
 * 提供注册effect的方法,通过一个全局effect变量，收集依赖的一刻只能有一个副作用函数在执行
 */
let activeEffectFn = [];
function effect(fn) {
  activeEffectFn = fn;
  activeEffectFn.push(fn);
  cleanup(fn);
  fn();
  activeEffectFn.pop();
  activeEffectFn = activeEffectFn.at(-1);
}
function cleanup(effect) {
  // effect.deps存放的是effect函数中对应不同key的deps函数集合
  effect.deps.forEach((item) => {
    // 将effect从deps集合中删除清空
    item.delete(effect);
  });
  effect.deps = [];
}
// 使用weakMap的原因：如果引用的对象没有引用了，说明用户不需要这个值了，
// 如果这里不使用weakMap，那么这个dep依赖不会被回收，导致内存溢出
const bucket = new WeakMap();
const obj = new Proxy(obj, {
  get(target, key) {
    if (!activeEffectFn) return target[key];
    let depsMap = bucket.get(target);
    if (!depsMap) {
      bucket.set(target, new Map());
    }
    const deps = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (deps = new Set()));
    }
    depsMap.add(activeEffect);
    // ADD: 将对应key的deps放入activeEffectFn
    activeEffectFn.deps.push(deps);
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    // 实质上就是通过全局加了一个weakMap管理所有代理的对象依赖effect，其中又分了对象的每个属性的依赖
    const effects = bucket.get(target)?.get(key);
    // 构造此数据变量以解决effect函数中clean函数的delete后立即add导致的无限循环的问题
    const effectsToRun = new Set(effects);
    effectsToRun?.forEach((item) => {
      // 如果在执行track的过程中同时执行了写操作，则不触发trigger，去重
      if (effectFn === activeEffect) return;
      item();
    });
  },
});
```

## computed

实质上是一个懒执行的 effect，当读取计算属性的值时，手动执行 effect，当计算属性依赖的响应式数据变化时，通过 scheduler 将 dirty 标记设置为 true，下次计算计算属性的值时会重新计算

```js

export class ComputedRefImpl {
  public dep: any;
  public effect: ReactiveEffect;

  private _dirty: boolean;
  private _value

  constructor(getter) {
    this._dirty = true;
    this.dep = createDep();
    this.effect = new ReactiveEffect(getter, () => {
      // scheduler
      // 只要触发了这个函数说明响应式对象的值发生改变了
      // 那么就解锁，后续在调用 get 的时候就会重新执行，所以会得到最新的值
      if (this._dirty) return;

      this._dirty = true;
      triggerRefValue(this);
    });
  }

  get value() {
    // 收集依赖
    trackRefValue(this);
    // 锁上，只可以调用一次
    // 当数据改变的时候才会解锁
    // 这里就是缓存实现的核心
    // 解锁是在 scheduler 里面做的
    if (this._dirty) {
      this._dirty = false;
      // 这里执行 run 的话，就是执行用户传入的 fn
      this._value = this.effect.run();
    }

    return this._value;
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter);
}
```

## watch

watch 实质是 effect 函数的回调，特殊的地方是可以自定义依赖，通过 scheduler 回调手动执行

## 竞态问题

通过 onInvalidate 注册过期回调，代码中判断只有当数据未过期时才执行真正的赋值操作
