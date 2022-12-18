最简单的响应式更新

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
