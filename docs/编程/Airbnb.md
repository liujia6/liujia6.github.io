# Airbnb

1. 不要使用 JavaScript 的 getters/setters，因为他们会产生副作用，并且难以测试、维护和理解。相反的，你可以用 getVal() 和 setVal('hello') 去创造你自己的访问器函数。
2. 大写变量处在 export 的最高级(例如：EXPORTED_OBJECT.key) 并且他包含的所有子属性都是不可变的。（译者注：即导出的变量是全大写的，但他的属性不用大写）

## 数组

1. 用 ... 运算符而不是 [Array.from](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 来将一个可迭代的对象转换成数组。
2. 用 [Array.from](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 将一个类数组对象转成一个数组。
3. 用 [Array.from](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 而不是 ... 运算符去做 map 遍历。 因为这样可以避免创建一个临时数组。
4. 用扩展运算符做数组浅拷贝，类似上面的对象浅拷贝。

## 函数

1. 把立即执行函数包裹在圆括号里。eslint: [wrap-iife](http://eslint.org/docs/rules/wrap-iife.html)
2. 不要修改参数，不要对参数重新赋值
3. 当你一定要用函数表达式（在回调函数里）的时候，使用箭头函数。
4. 避免箭头函数（=>）和比较操作符（<=, >=）混淆
5. 方法可以返回 this 来实现链式调用。
6. 如果没有特别定义，类有默认的构造方法。一个空的构造函数或只是代表父类的构造函数是不需要写的。
7. **除非外部库或框架需要使用特定的非静态方法，否则类方法应该使用** **this** **或被写成静态方法。 作为一个实例方法表明它应该根据实例的属性有不同的行为。eslint:** [**class-methods-use-this**](https://eslint.org/docs/rules/class-methods-use-this)

## **模块**

1. 不要用 import 通配符， 即 * 这种方式。为什么？这确保你有单个默认的导出。
2. 不要直接从 import 中直接 export。为什么？虽然只写一行很简洁，但是使用明确 import 和明确的 export 来保证一致性。
3. 不要导出可变的东西。
4. 在一个单一导出模块里，用 export default 更好。eslint: [import/prefer-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)
5. import JavaScript文件不用包含扩展名 eslint: [import/extensions](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md)为什么? 使用扩展名重构不友好，而且让模块使用者去了解模块的实现细节是不合适的。

## 变量

1. 不要使用一元自增自减运算符（++， --）. eslint [no-plusplus](http://eslint.org/docs/rules/no-plusplus)

为什么？根据 eslint 文档，一元增量和减量语句受到自动分号插入的影响，并且可能会导致应用程序中的值递增或递减的静默错误。 使用 num + = 1 而不是 num ++ 或 num ++ 语句也是含义清晰的。 禁止一元增量和减量语句还会阻止您无意地预增/预减值，这也会导致程序出现意外行为。

比较运算符与相等

1. 布尔值要用缩写，而字符串和数字要明确使用比较操作符。
2. 如果 if 语句中总是需要用 return 返回，那后续的 else 就不需要写，[no-else-return](https://eslint.org/docs/rules/no-else-return)

## 逗号

1. 额外结尾逗号，: **要** eslint: [comma-dangle](http://eslint.org/docs/rules/comma-dangle.html)

为什么？这使 git diffs 更简洁。此外，像Babel这样的转换器会删除转换代码中的额外的逗号，这意味着你不必担心旧版浏览器中的 [结尾逗号问题](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas)。注意，逗号不应出现在使用了 ... 操作符后的参数后面

## 类型转换与强制转换

1. 字符串用String函数强制转换const totalScore = String(this.reviewScore);
2. 数字: 用 Number 做类型转换，parseInt 转换 string 应总是带上基数。 eslint: [radix](http://eslint.org/docs/rules/radix)
3. 布尔：使用!!age

## 命名

1. 不要用前置或后置下划线。eslint: [no-underscore-dangle](http://eslint.org/docs/rules/no-underscore-dangle.html)

为什么？JavaScript 没有私有属性或私有方法的概念。尽管前置下划线通常的概念上意味着私有，事实上，这些属性是完全公有的，因此这部分也是你的 API 的内容。这一概念可能会导致开发者误以为更改这个不会导致崩溃或者不需要测试。如果你想要什么东西变成私有，那就不要让它在这里出现。

2. export default 导出模块A，则这个文件名也叫 A.*， import 时候的参数也叫 A。 大小写完全一致。
3. 当你 export 一个结构体/类/单例/函数库/对象 时用大驼峰。
4. 简称和缩写应该全部大写或全部小写。

为什么？名字都是给人读的，不是为了去适应计算机算法。
