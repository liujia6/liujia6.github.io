# Error

## 基本 Error 语法

Error 发生运行时错误时抛出对象，该 Error 对象还可以用作用户定义异常的基础对象。

Error 对象基本包含三个属性

- name
- stack
- message

一般使用语法
`new Error(message)`
控制台上展示 Error 的格式为

```
name: message
  stack...
```

例如

```
// name: message
Uncaught ReferenceError: afs is not defined
    at <anonymous>:1:1  // stack
```

浏览器能自主识别报错的 Error 常见的有 [TypeError 等](https://note.youdao.com/)，都是 Error 的子类.

注意：throw 后面可以接任意数据类型，但是最佳实践是 throw 一个 Error 类型或者自定义 Error 类型，行为同 Promise.reject，eslint 就有一个规则https://eslint.org/docs/rules/prefer-promise-reject-errors

## 同步与异步

mdn 对 Error 的定义描述是 Error 在发生运行时错误时抛出，什么是运行时错误呢，简单理解就是在当前的执行调用栈中发生的错误都浏览器都可以 catch 到 Error，反之。

- try、catch 只能捕获当前执行栈发生的错误，异步错误执行时， try、catch 代码已经出栈了所以捕获不到
- 对异步代码的错误捕获我们可以使用 Promise.reject 通过回调捕获到

### Reject 和 throw Error 的区别

1. 错误捕获差异
   1. reject 是回调函数，可以捕获异步方法，
   2. throw 只能抛出当前执行栈的错误
2. 流程问题
   1. reject 只是一个回调方法，不会阻断程序，如果在 promise 构造函数中 reject 后想要阻断代码执行，需要加上 return
   2. throw 后代码会停止执行
3. 使用 promise 抛出错误，promise 出错永远都是返回一个 promise，而不会阻断程序执行，也不会抛出错误。在浏览器端，我们可以通过 unhandledReject 事件监听 promise 的未处理错误
   1. 在 executor 周围的“隐式 `try..catch`”自动捕获了 error，并将其变为 rejected promise。
      这不仅仅发生在 executor 函数中，同样也发生在其 handler 中。如果我们在 `.then` 处理程序（handler）中 `throw`，这意味着 promise 被 rejected，因此控制权移交至最近的 error 处理程序（handler）。
   2. catch 执行后的 then 会继续运行

```js
try {
    setTimeout(()=>{
        throw new Error('error')
    },1000)
} catch (err) {
    console.log("catching an error", err); // 不会执行，应为settimeout执行时，该catch函数已经出栈了，浏览器会在1s后抛出一个uncath error
}


rejectIn = (ms) =>
  new Promise((_, r) => {
    setTimeout(() => {
      r(1);
    }, ms);
  });
async function t() {
  try {
    await rejectIn(0);
  } catch (err) {
    console.log("catching an error", err);
  }
}

t();
```

## 异常的传播

异常的传播与浏览器事件模型相似。不同之处在于

- 异常传播作用在函数调用栈
- 异常传播没有捕获阶段
  - 错误发生后会一直在调用栈中冒泡，直到被 catch 住，如果 catch 后不再将错误抛出则停止传播。
  - 如果一个异常没有被 catch，它会沿着函数调用栈一层层传播直到栈空。
  - 如果 catch 语句内部发生了异常，也一样会沿着其函数调用栈继续执行上述逻辑，专业术语是 stack unwinding。

## 异常的处理

我们知道当处于函数调用栈顶部的函数报错， 其函数调用栈下方的任意函数都可以进行捕获，并且效果没有本质不同。那么问题来了，我到底应该在哪里进行错误处理呢？

- catch 应该只处理它知道的 error，并“抛出”所有其他 error。
- 通过责任链模式，谁有责任干什么事情是确定的，不要做能力范围以外的事情

## [JS中已有的异常类型](https://mp.weixin.qq.com/s/xXSeT2Q6HDJE0Q8Wn9Zz_A)

## 自定义 Error，扩展 Error

开发中，需要根据不同的错误场景定义不同的自定义 Error 类型。例如对于网络操作中的 error，我们需要 HttpError，对于数据库操作中的 error，我们需要 DbError，对于搜索操作中的 error，我们需要 NotFoundError，等等。

- 标准错误
  分析所有可能的错误，我们可以定义出一个通用的 Error 所拥有的数据结构如下，不同的错误可以在以下错误字段的基础上中进行扩展

```
{
    code:''， // 表示错误码，用来作为错误的唯一标识判断
    message:'', // 错误描述
    details:'', // 错误详情
}
```

## 自定义 Error

- 如何自定义一个 Error 类型呢

```js
// 继承Error基础类
class CustomError extends Error {
  constructor(foo = 'bar', ...params) {
    //传递基础参数给
    super(...params)

    //  追踪stack栈，以正确展示stack属性
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    this.name = 'CustomError'
    // 自定义错误属性
    this.foo = foo
    this.date = new Date()
  }
}

try {
  throw new CustomError('baz', 'bazMessage')
} catch(e) {
  console.error(e.name)    //CustomError
  console.error(e.foo)     //baz
  console.error(e.message) //bazMessage
  console.error(e.stack)   //stacktrace
}
```

## 包装异常

当我们在不同的函数中会遇到不同的 Error，但是实际可以对这些 Error 统一处理，这时我们可以用包装异常去处理，
例如我们会遇到 SyntaxError 和 ValidationError，我们可以用 ReadError 将以上两种包装成同一种

- 我们将创建一个新的类 ReadError 来表示一般的“数据读取” error。
- 函数 readUser 将捕获内部发生的数据读取 error，例如 ValidationError 和 SyntaxError，并生成一个 ReadError 来进行替代。
- 对象 ReadError 会把对原始 error 的引用保存在其 cause 属性中。

```js
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
  } else {
    throw e;
  }
}
```

## 全局错误监听

- JS 语法错误、代码异常
- AJAX 请求异常
- 静态资源加载异常
- Promise 异常
- Iframe 异常
- 跨域 Script error
- 崩溃和卡顿

### window.onerror

当 `JS` 运行时错误发生时，`window` 会触发一个 `ErrorEvent` 接口的 `error` 事件，并执行`window.onerror()`。

```javascript
/**
 * @param {String}  message    错误信息
 * @param {String}  source     出错文件
 * @param {Number}  lineno     行号
 * @param {Number}  colno      列号
 * @param {Object}  error      Error对象（对象）
 */
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：', { message, source, lineno, colno, error });
};
```

同步错误可以捕获到，但是，请注意 `window.error` 无法捕获静态资源异常和 JS 代码错误。

- 当 `JS` 运行时错误发生时，`window` 会触发一个 `ErrorEvent` 接口的 `error` 事件，并执行 `window.onerror()`。

- `onerror` 无法捕获语法错误；

- ```
  window.onerror` 函数只有在返回 `true` 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 `Uncaught Error: xxxxx
  ```

捕获场景

1. 异步执行的语法错误

```js
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：', { message, source, lineno, colno, error });
};
setTimeout(() => {
});
```

### window.addEventListener

当一项资源（如图片或脚本）加载失败，加载资源的元素会触发一个 `Event` 接口的 `error` 事件，并执行该元素上的`onerror()` 处理函数。这些 `error` 事件不会向上冒泡到 `window` ，不过（至少在 `Firefox` 中）能被单一的`window.addEventListener` 捕获。

- 会比 window.onerror 先触发，与 onerror 的功能大体类似，不过事件回调函数传参只有一个保存所有错误信息的参数，不能阻止默认事件处理函数的执行，但可以全局捕获资源加载异常的错误

### unhandledrejection

没有写 catch 的 Promise 中抛出的错误无法被 onerror 或 try-catch 捕获到，所以我们务必要在 Promise 中不要忘记写 catch 处理抛出的异常。

解决方案： 为了防止有漏掉的 Promise 异常，建议在全局增加一个对 unhandledrejection 的监听，用来全局监听 Uncaught Promise Error。使用方式：

```
window.addEventListener("unhandledrejection", function(e){
  console.log(e);
});
```

## 参考

- [如何优雅处理前端异常](http://jartto.wang/2018/11/20/js-exception-handling/)
- [自定义 Error，扩展 Error](https://zh.javascript.info/custom-errors)
- [mdn Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error)
- [你不知道的前端异常处理（万字长文，建议收藏）](https://segmentfault.com/a/1190000022977773)
- [ window.onerror 和 window.addEventListener('error')的区别 ](https://segmentfault.com/a/1190000023259434)
