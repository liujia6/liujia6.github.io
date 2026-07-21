# RXJS

- Rxjs 是使用 Observables 的响应式编程（Reactive Programming）的库，它使编写异步或基于回调的代码更容易
- rxjs 官网是介绍的 rxjs5，[新版 rxjs6 与 rxjs5 的不同之处](https://www.jianshu.com/p/ce1a15957a7f)
- RXJS 主要用于处理较为复杂的异步请求，并且统一了异步和同步的 api 编写方式。前端 的各种异步的 API，例如 DOM Events，XMLHttpRequest，fetch，WebSocket，Service Worker，setTimeout，setInterval，requestAnimationFrame，在 Rxjs 中，万物皆是数据流，我们都可以把异步 api 转换成一个异步的数据流 转换为 Observerbal，一个可观察的对象
- observable 可以被用于代表任何可以用伴随时间流动的数据流表示的东西，比如事件、Promise、定时执行函数、间隔执行函数和动画。
- 就像对数组做的那些操作一样，你可以对这些数据进行 map、filter 或者做些其他的操作，来创建和组合新的 observable。最后，你还可以 subscribe（订阅）到这些 observable 上，来对最后的数据流进行你想要的任何操作。

## 使用场景

RxJS 可用于解决竞态危害问题。如果你的业务场景中有大量的异步行为，而且它们的执行顺序错乱会导致输出的不正确，这时候就应该考虑引入 RxJS 来规范你的代码了。

## 基本用法

- observable 和 promise 在简单场景下的使用是很类似的，都是传递一个构造函数，promise 是通过 resove、reject 传值，observable 是通过 next、error、complete 传值并且可以传递多次
- 并且 promise 的构造函数是立即执行的，而 subscribe 函数是等到订阅才执行的
- Rx的observable被subscribe之后，并不是继续返回一个新的observable，而是返回一个subscriber，这样用来取消订阅，但是这也导致了链式断裂，所以它不能像Promise那样组成无限then链。
- Rx的数据是否流出不取决于是否subscribe，也就是说一个observable在未被订阅的时候也可以流出数据，在之后它被订阅过后，先前的数据是无法被数据消费者所查知，所以Rx还引入了一个lazy模式，允许数据缓存着直到被subscribe，但是数据是否流出还是并不依赖subscribe。

```js
//其思想是将时间看作数组，随着时间发生的事件被看作是数组的项，然后以操作数组的方式变换事件

// 可观察对象（惰性推送的声明式数据流，需要订阅才会执行）   subscribe函数（也叫生产者）（用以描述数据流和数据流如何传送给观察者，也即随意创建一个数据流），每个观察者订阅之后都会执行此函数
//变量后($)约定表明此变量是 observable            // observer：观察者：将数据流中的一个个数据一个个传输给观察者
var observable$ = Rx.Observable.create(function subscribe(observer) {
  try {
    observer.next(1) //同步传输数据给观察者
    observer.next(2)
    observer.next(3)
    setTimeout(() => {
      observer.next(4)
    }, 1000)
    let i = 0
    let id = setInterval(() => {
      //异步传输数据，可以自定义ajax函数将结果用next传送
      observer.next(i++)
      observer.complete() //完成数据传输
      observer.next(4) // complete后不再传输数据，所以不会发送
    }, 1000)
  } catch (err) {
    observer.error(err) // 如果捕获到异常会发送一个错误
  }
  return function() {
    //标准的可观察对象会返回一个取消执行的函数，之后观察者可以直接取消订阅
    clearInterval(id)
  }
})
//观察者是一个有着next、error、complete方法的对象，
//观察者订阅一个Observable数据流，这个观察者，有next方法：正确拿到数据后的操作，error方法：发生错误时的操作，complete：完成时的操作，三个方法都是可选的，没有就会忽略
var subscription = observable.subscribe({
  next: (x) => console.log('got value ' + x),
  error: (err) => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
})
//也可以取消对应订阅
subscription.unsubscribe()
```

## 热&冷的 Observables

Observable 有冷热两种类型。
在 RxJS 中，默认的 observables 是冷的或者单播的。多播操作符可以使 observable 变成热的或者多播的，以允许副作用可以在多个订阅者之间共享。

- **冷的**：两个订阅者得到值是两份完全相同的副本，每次订阅都会执行一次生产者函数（subscribe 函数），也就是在订阅的时候才产生值。
- **热的**：订阅者只能收到当它开始订阅后的值，这很像是足球比赛的实况直播，如果你在开场 5 分钟后才开始观看，你会错失开场前 5 分钟的一切，从观看的这一刻起你才开始接收数据：比如监听 mousemove 事件。
  - **publish()和 connect()** 共享源 observable 并通过调用 connect 方法使其变成热的。 source 在 publish 后 不会发出任何值直到 connect() 被调用。Rx.Observable.interval(1000) .publish().connect()操作会变成热的。立即执行不管有没有订阅
  - **share()** 操作符：observable 的操作符操作中的副作用只会执行一次。在多个订阅者间共享源 observable ，如果对 source
- **暖的**：在订阅的时候才产生值，但是观察者订阅的先后顺序有影响得到的值。
  - **refCount()** 操作符确保 observable 变成暖的，也就是不会发出值直到 sub1 订阅了流。另一方面 sub2 是后加入的，也就是说订阅接收的是当前的值，而无法接收订阅之前的值。

* publish、connect

```js
// 每1秒发出值
const source = interval(1000)
const example = source.pipe(
  // 副作用只会执行1次
  tap((_) => console.log('Do Something!')),
  // 不会做任何事直到 connect() 被调用
  publish()
)

/*
  source 不会发出任何值直到 connect() 被调用
  输出: (5秒后)
  "Do Something!"
  "Subscriber One: 0"
  "Subscriber Two: 0"
  "Do Something!"
  "Subscriber One: 1"
  "Subscriber Two: 1"
*/
const subscribe = example.subscribe((val) =>
  console.log(`Subscriber One: ${val}`)
)
const subscribeTwo = example.subscribe((val) =>
  console.log(`Subscriber Two: ${val}`)
)

// 5秒后调用 connect，这会使得 source 开始发出值
setTimeout(() => {
  example.connect()
}, 5000)
```

- share

```js
const source = timer(1000)
// 输出副作用，然后发出结果
const example = source.pipe(
  tap(() => console.log('***SIDE EFFECT***')),
  mapTo('***RESULT***')
)

/*
  ***不共享的话，副作用会执行两次***
  输出: 
  "***SIDE EFFECT***"
  "***RESULT***"
  "***SIDE EFFECT***"
  "***RESULT***"
*/
const subscribe = example.subscribe((val) => console.log(val))
const subscribeTwo = example.subscribe((val) => console.log(val))

// 在多个订阅者间共享 observable
const sharedExample = example.pipe(share())
/*
   ***共享的话，副作用只执行一次***
  输出:
  "***SIDE EFFECT***"
  "***RESULT***"
  "***RESULT***"
*/
const subscribeThree = sharedExample.subscribe((val) => console.log(val))
const subscribeFour = sharedExample.subscribe((val) => console.log(val))
```

- refCount

```js
let obs = Rx.Observable.interval(1000)
  .publish()
  .refCount()

setTimeout(() => {
  // delay both subscriptions by 2 seconds
  obs.subscribe((v) => console.log('1st subscriber:' + v))
  setTimeout(
    // delay for a little more than a second and then add second subscriber
    () => obs.subscribe((v) => console.log('2nd subscriber:' + v)),
    1100
  )
}, 2000)
```

[冷热模式以及 refCount 具体使用参考](https://segmentfault.com/a/1190000011052037)

## 操作符

- RXJS 提供了很多函数来帮助我们处理数据流，包括创建操作符（声明 observal 对象）、转换操作符（将数据流看做一个数组，对数组做过滤处理，新增等操作函数）、完整的操作符可以查阅[操作符列表](https://cn.rx.js.org/manual/overview.html#h213),可以通过[弹珠图](https://rxmarbles.com/)快速了解操作符的作用
- 操作符是一个纯函数，每次都返回一个新的 Observerble 对象
- rxjs6 中通过 pipe 操作符，传入所有操作符按照顺序调用并且操作符函数并接受上一个操作符的返回值作为参数，最后返回操作后的 observable 来进行订阅

### 静态方法，又有实例方法

操作符既有静态方法，也有实例方法

- 实例方法是指对一个 observaseble 进行操作的操作符例如 map、mapTo
- 静态方法有两类
  - 创建操作符
  - 组合操作符

## 创建执行

- 上节说到，可以用 Rx.Observable.create(subscribe)自定义描述一个可观察对象（数据流），在绝大多数情况下你不需要使用 create，因为现有的操作符创建出来的 Observable 能满足绝大多数使用场景。create 是允许你创建任何 Observable 的底层机制，如果你有非常特殊的需求的话，可以使用它
- 常用的创建操作符有 from,fromEvent, of,ajax,bindNodeCallback,create,defer,empty,from,fromEvent,fromEventPattern,fromPromise,generate,interval,never,of,repeat,

* fromEvent

```js
var clicks = Rx.Observable.fromEvent(document, 'click')
clicks.subscribe((x) => console.log(x))
// 相当于
document.addEventListener('click', () => console.log(x))
```

- from

```js
var array = [10, 20, 30]
var result = Rx.Observable.from(array)
result.subscribe((x) => console.log(x))
// 结果如下:
// 10 20 30
```

- interval

```js
每1秒发出一个自增数
var numbers = Rx.Observable.interval(1000)
numbers.subscribe((x) => console.log(x))
```

## 组合操作符

组合操作符是指将多个 observable 流组合成一个流的不同方法

- merge 可以合并两个 observabel，而 mergeAll 将多个 observable 转化为一个

> 注意：以下代码示例省略操作符的 import 直接使用了操作符

## 转换操作符

转换操作符是指将 observable 经过处理变成另外一个流，相当于异步嵌套操作。
常见的转换操作符有

- switchMap，相当于异步嵌套，将当前可观察对象转换为新的 observbel，当父可观察对象再一次执行的时候，会取消旧的子 observable 继续执行，相当于 switchMap
- mergeMap 就不会执行取消，单嵌套执行，mergeMap 相当于先 map 将父 observalmap 执行再将子 observable 合并

## [高阶操作符](https://semlinker.com/rxjs-merge-map-and-switch-map/)

高阶操作符和高阶函数类似，接受多个或一个函数并且返回另外一个函数。而它接受多个或一个 observable 并且返回另外一个 observable

- 组合操作符有：mergeAll、concatAll、forkJoin、switch、race 等用于对多个 observable 不同类型的合并等操作。接受多个或一个 observable 并且返回另外一个 observable
- 转换操作符有：switchMap、mergeMap、concatMap 等直接将当前 observable 转换为另外一个 observable。接受一个 observable 并且返回另外一个 observable

### **forkJoin**

类似于 promise.all，等最后一个 observable 发出值后用数组包裹所有 observable 结果。
既有实例方法，也能当静态方法

- 静态方法

```js
const example = forkJoin(
  // 立即发出 'Hello'
  of('Hello'),
  // 1秒后发出 'World'
  of('World').pipe(delay(1000))
)
//输出: ["Hello", "World"]
const subscribe = example.subscribe((val) => console.log(val))
```

- 实例方法

```js
const myPromise = (val) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
  )

const source = of([1, 2, 3, 4, 5])
// 发出数组的全部5个结果
const example = source.pipe(mergeMap((q) => forkJoin(...q.map(myPromise))))
/*
  输出:
  [
   "Promise Resolved: 1",
   "Promise Resolved: 2",
   "Promise Resolved: 3",
   "Promise Resolved: 4",
   "Promise Resolved: 5"
  ]
*/
const subscribe = example.subscribe((val) => console.log(val))
```

### race

可对比 promise.race，接受多个 observable 并且订阅最快发出值的 observable

```js
// 接收第一个发出值的 observable
const example = race(
  // 每1.5秒发出值
  interval(1500),
  // 每1秒发出值
  interval(1000).pipe(mapTo('1s won!'))
)
// 输出: "1s won!"..."1s won!"...etc
const subscribe = example.subscribe((val) => console.log(val))
```

### **concatAll**

- 串行连接源(高阶 Observable)所发出的每个 Observable，只有当一个内部 Observable 完成的时候才订阅下 一个内部 Observable，并将它们的所有值合并到返回的 Observable 中。
- concatAll 和 forkJoin 的不同之处在于 forkJoin 是同时订阅所有 observable 再最后收集结果，而 concatAll 是等前一个完成后再订阅下一个
  ![image](https://cn.rx.js.org/img/concatAll.png)

```js
const obs1 = interval(1000).pipe(take(5))
const obs2 = interval(500).pipe(take(2))
const obs3 = interval(2000).pipe(take(1))
// 发出3个 observables
const source = of(obs1, obs2, obs3)
// 按顺序订阅每个内部 obserable，前一个完成了再订阅下一个
const example = source.pipe(concatAll())
//以上代码也可以用
/*
  输出: 0,1,2,3,4,0,1,0
  怎么运行的...
  订阅每个内部 observable 并发出值，当一个完成了才订阅下一个
  obs1: 0,1,2,3,4 (complete)
  obs2: 0,1 (complete)
  obs3: 0 (complete)
*/

const subscribe = example.subscribe((val) => console.log(val))
```

- **concatMap** = map + concatAll : 先 map 后 concatAll：相当于 concatMap,concat 负责将 map 返回的 observable 对象直接转换为结果，如果没有 concatAll()操作符，在订阅时 val 是 of(val+10)这个 observable 对象

```js
// 每2秒发出值
const source = interval(2000)
const example = source.pipe(
  // 为了演示，增加10并作为 observable 返回
  map((val) => of(val + 10)),
  // 合并内部 observables 的值
  concatAll()
)
// 输出: 'Example with Basic Observable 10', 'Example with Basic Observable 11'...
const subscribe = example.subscribe((val) =>
  console.log('Example with Basic Observable:', val)
)
```

### mergeAll

- 每当观察到发出的内部 Observable 时，它会订阅并发出输出 Observable 上的这个 内部 Observable 的所有值。所有的内部 Observable 都完成了，输出 Observable 才能完成。任何由内部 Observable 发出的错误都会立即在输出 Observalbe 上发出。
  ![image](https://cn.rx.js.org/img/mergeAll.png)

```js
const myPromise = (val) =>
  new Promise((resolve) => setTimeout(() => resolve(`Result: ${val}`), 2000))
// 发出 1,2,3
const source = of(1, 2, 3)
const example = source.pipe(
  // 将每个值映射成 promise
  map((val) => myPromise(val)),
  // 发出 source 的结果
  mergeAll()
)
/*
const example = source.pipe(
  mergeMap(val => myPromise(val)),
);
*/

/*
  输出:
  "Result: 1"
  "Result: 2"
  "Result: 3"
*/
const subscribe = example.subscribe((val) => console.log(val))
```

- mergeMap = map + mergeAll ，example 同以上

### switch

![image](https://cn.rx.js.org/img/switch.png)

当发出一个新的内部 Observable 时， switch 会从先前发送的内部 Observable 那取消订阅，然后订阅新的内部 Observable 并开始发出它的值。后续的内部 Observables 也是如此。

```js
var clicks = Rx.Observable.fromEvent(document, 'click');
// 每次点击事件都会映射成间隔1秒的 interval Observable
var switched = clicks.pipe(
    map((ev) => Rx.Observable.interval(1000)),
    switch()
)

// 相当于
/*
const switched = clicks.pipe(
  switchMap(val => Rx.Observable.interval(1000)),
);
*/

// 结果是 `switched` 本质上是一个每次点击时会重新启动的计时器。
// 之前点击产生的 interval Observables 不会与当前的合并。
switched.subscribe(x => console.log(x));
```

- switchMap = switch + mergeAll
- 将每个源值投射成 Observable，该 Observable 会合并到输出 Observable 中， 并且只发出最新投射的 Observable 中的值。

## subject

subject 相当于订阅中心，基于订阅者模式。由 subject 订阅数据流 observable，多个订阅者（之前的观察者）可以在（订阅中心）subject 上代为订阅

```js
// Every second
var source = Rx.Observable.interval(1000)

var subject = new Rx.Subject()

var subSource = source.subscribe(subject)

var subSubject1 = subject.subscribe(
  (x) => console.log('Value published to observer #1: ' + x),
  (e) => console.log('onError: ' + e.message),
  () => console.log('onCompleted')
)

var subSubject2 = subject.subscribe(
  (x) => console.log('Value published to observer #2: ' + x),
  (e) => console.log('onError: ' + e.message),
  () => console.log('onCompleted')
)

setTimeout(() => {
  // Clean up
  subject.onCompleted()
  subSubject1.dispose()
  subSubject2.dispose()
}, 5000)

// => Value published to observer #1: 0
// => Value published to observer #2: 0
// => Value published to observer #1: 1
// => Value published to observer #2: 1
// => Value published to observer #1: 2
// => Value published to observer #2: 2
// => Value published to observer #1: 3
// => Value published to observer #2: 3
// => onCompleted
// => onCompleted
```

- ReplaySubject 存储它发布过的所有值。因些，当你订阅它时，你将自动接收到它发布数据的整个历史，即使当你订阅的时候已经发布了一些数据了。
- BehaviourSubject 类似于 ReplaySubject, 除了它仅存储它发布过的最后一个值。BehaviourSubject 还需要初始化时的默认值。当还没有收到 subject 的其他值的时候，这个默认值将会发送给它的观察者。 这意味着所有订阅者在订阅的时候会立即收到一个值。除非 Subject 已经结束了。
- AsyncSubject 类似于 ReplaySubject 和 BehaviourSubject。但它只会保存最后一个值，并且当序列完成（结束）发布时。当观察源很热并且可能结束之前，任何观察者可以订阅它，你可以使用 AsyncSubject 类型。这种情况，AsyncSubject 仍会提供最后一个值给将来的订阅者。

## 综合案例

### 案例一

简单案例 1

- 将以下代码改成 rxjs 形式

```js
document.querySelector('button').addEventListener('click', function() {
  let checked = document.querySelector("input[name='serviceName']").checked
  chrome.storage.sync.set({ serviceNameCheck: checked }, function() {
    document.querySelector('.success').style.display = 'block'
    setTimeout(() => {
      document.querySelector('.success').style.display = 'none'
    }, 1000)
  })
})
```

- rxjs 形式

```js
fromEvent(document.querySelector('button'), 'click') // 将click事件转换为observable数据流
  //pipe操作符参数是一个个对数据的操作符，会按照顺序处理数据最后返回当前observable
  .pipe(
    //每次点击都取到document.querySelector("input[name='serviceName']").checked值并将其变为要传递的数据
    mapTo(document.querySelector("input[name='serviceName']").checked),
    //
    switchMap((checked) => setChromeStorage({ serviceNameCheck: checked })),
    // 此函数执行不对数据做处理的函数
    tap(() => (document.querySelector('.success').style.display = 'block')),
    // 延时 5s
    delay(5000)
  )
  .subscribe(() => {
    // 得到数据执行相应处理
    document.querySelector('.success').style.display = 'none'
  })

function setChromeStorage(param) {
  return new Observable((observer) => {
    chrome.storage.sync.set(param, function() {
      observer.next()
      observer.complete()
    })
  })
}
```

## 案例二

难度升级！！

实现这样一个需求：监听 hash 变化并且是跳转到指定页面的等待页面中我们需要的所有 dom 渲染后并拿到它们
分解任务

1. 监听监听 hash 变化并且是跳转到指定页面
2. 等待页面中我们需要的所有 dom 渲染后并拿到它们

- rxjs 实现

```js
//监听hash变化
function observePageEnter(path = '/') {
  return fromEvent(window, 'hashchange')
    .pipe(startWith({ newURL: window.location.href }))
    .pipe(filter((e) => (Url.from(e.newURL).path **= path)))
}

// 等待doms渲染并拿到值（不断轮训check是否能拿到渲染的dom，一旦拿到就通过next传递）
function waitForDomsMounted(selector, timeout = 30e3) {
  const deadline = Date.now() + timeout
  return new Observable((observer) => {
    let timer = null
    function checkSelector() {
      const dom = document.querySelectorAll(selector)
      if (dom.length) {
        observer.next(dom)
        observer.complete()
        return
      }
      if (Date.now() >= deadline) {
        observer.error('TIME OUT')
        return
      }
      timer = setTimeout(checkSelector, 50)
    }
    checkSelector()
    return () => clearTimeout(timer)
  })
}

// 等待页面中的我们需要的所有doms渲染并且拿到它们

function waitForPageDomsMounted(PAGE_SELECTORS, timeout = 30e3) {
  return new Observable((observer) => {
    of(PAGE_SELECTORS)
      .pipe(
        mergeMap((urls) =>
          forkJoin(...urls.map((url) => waitForDomsMounted(url)))
        )
      )
      .subscribe((val) => {
        observable.next(val)
      })
  })
}
// mergeMap(urls => forkJoin(...urls.map(url => waitForDomsMounted(url))))
// 这一句可能比较难理解和复杂，我们一步步看,首先mergeMap的参数urls就是PAGE_SELECTORS数组，我们循环数组并且将数组中的每个值执行waitForDomsMounted函数，得到的是一个返回的observable数组，再通过相当于promise.all的forkJoin操作符将observable数组变成可以拿到对应结果数组的observable,最后，我们通过相当于map+mergeAll的mergeMap操作符直接将of(PAGE_SELECTORS)这个observable转换为我们最后通过forkJoin操作符组合成一个可以拿到所有结果数组的observable，然后通过订阅这个流就可以拿到我们页面上所有想要的doms啦

// 我们需要的所有 dom
const PAGE_SELECTORS = [URL_TEXT_SELECTOR, PAGE_PARAM_SELECTOR, CONFIG_SELECTOR]

// 我们总的流程为以下步骤
const pageEnter$ = observePageEnter(PAGE_URL).pipe(share())

pageEnter$
  .pipe(switchMap(() => waitForPageDomsMounted(PAGE_SELECTORS)))
  .subscribe({
    next: renderLintStyle,
    error: console.error,
  })
```

### 参考

- [RXJS 入门](https://juejin.im/post/58cd146a61ff4b0060277d32)
- [angularRXJS 介绍](https://angular.cn/guide/observables#observables)
- [响应式编程](https://zhuanlan.zhihu.com/p/27678951)
- [函数式编程、响应式编程、函数响应式编程](https://juejin.cn/post/6985517053390110728)
