#### CSS 对象模型（CSSOM）

​	在W3C标准中，它包含两个部分：

- 描述样式表和规则等CSS的模型部分（CSSOM）
- 跟元素视图相关的View部分（CSSOM View）。

#### [CSS-API(CSS编程接口),CSSOM(css对象模型)](https://blog.csdn.net/u014711690/article/details/82346584)

#### [CSSOM](https://wangdoc.com/javascript/dom/css.html)


![image-20210111000903634](https://i.loli.net/2021/01/11/Szl1qsV7UmXaKOF.png)

修改样式表中的内容。

document.styleSheets[0].insertRule("p { color:pink; }", 0) 

document.styleSheets[0].removeRule(0)

innerHeight、innerWidth和devicePixelRatio


#### StyleSheet接口

- `StyleSheet`接口代表网页的一张样式表，包括`<link>`元素加载的样式表和`<style>`元素内嵌的样式表。

- ```javascript
  var sheets = document.styleSheets;
  ```

#### CSSRuleList 接口{CSSRuls}

- 表示一组 CSS 规则，成员都是 CSSRule 实例。

- ![image-20210107132525566](https://i.loli.net/2021/01/12/BbFjgAKrJLDq3Yw.png)![image-20210107133750359](https://i.loli.net/2021/01/12/KnhkNvaS63IfZjR.png)

- ```javascript
  var myStyleSheet = document.getElementById('myStyle').sheet;
  var crl = myStyleSheet.cssRules;
  crl instanceof CSSRuleList // true
  ```

#### CSSStyleRule 接口

- 如果一条 CSS 规则是普通的样式规则（不含特殊的 CSS 命令），那么除了 CSSRule 接口，它还部署了 CSSStyleRule 接口。

* CSSOM，即 CSS Object Model，CSS 对象模型，是对 CSS 样式表的对象化表示，同时还提供了相关 API 用来操作 CSS 样式。
* `element.style`只是获取某个元素的内联样式，而非完整的样式表。
* [CSSOM 在 W3C 规范中有一个独立的模块](https://www.w3.org/TR/cssom-1/)
* document.styleSheets

- **CSSStyleDeclaration接口**：

<img src="https://i.loli.net/2021/01/11/Euk3B6qwCVoPR2M.png" alt="image-20210111001940533" style="zoom:50%;" />

- 特性：

  - 如果读取 CSS 原始的属性名，要用方括号运算符，比如`styleObj['z-index']`；如果读取骆驼拼写法的 CSS 属性名，可以直接读取`styleObj.zIndex`。
  - 属性值都是字符串
  - 如果 CSS 属性名是 JavaScript 保留字，则规则名之前需要加上字符串css，比如float写成cssFloat
  - CSSStyleDeclaration 实例返回的 CSS 值都是绝对单位。比如，长度都是像素单位（返回值包括`px`后缀），颜色是`rgb(#, #, #)`或`rgba(#, #, #, #)`格式
  - CSS 规则的简写形式无效。比如，想读取`margin`属性的值，不能直接读，只能读`marginLeft`、`marginTop`等属性；再比如，`font`属性也是不能直接读的，只能读`font-size`等单个属性。
  - 该方法返回的 CSSStyleDeclaration 实例的`cssText`属性无效，返回`undefined`。
  - 也可以使用 CSSStyleDeclaration 实例的`getPropertyValue`方法，获取伪元素的属性

- 应用接口

  - el.style（只是获取的行内样式，不是全部样式） // 可读、可写

  - document.styleSheets[0].cssRules[0].style;

  - ```javascript
    style = window.getComputedStyle(dom , ":after"); // 只可读
    ```



#### **CSSStyleDeclaration 接口**：

<img src="https://i.loli.net/2021/01/11/Euk3B6qwCVoPR2M.png" alt="image-20210111001940533" style="zoom:50%;" />

- 特性：

  - 如果读取 CSS 原始的属性名，要用方括号运算符，比如`styleObj['z-index']`；如果读取骆驼拼写法的 CSS 属性名，可以直接读取`styleObj.zIndex`。
  - 属性值都是字符串
  - 如果 CSS 属性名是 JavaScript 保留字，则规则名之前需要加上字符串 css，比如 float 写成 cssFloat
  - CSSStyleDeclaration 实例返回的 CSS 值都是绝对单位。比如，长度都是像素单位（返回值包括`px`后缀），颜色是`rgb(#, #, #)`或`rgba(#, #, #, #)`格式
  - CSS 规则的简写形式无效。比如，想读取`margin`属性的值，不能直接读，只能读`marginLeft`、`marginTop`等属性；再比如，`font`属性也是不能直接读的，只能读`font-size`等单个属性。
  - 该方法返回的 CSSStyleDeclaration 实例的`cssText`属性无效，返回`undefined`。
  - 也可以使用 CSSStyleDeclaration 实例的`getPropertyValue`方法，获取伪元素的属性
- 应用接口

  - el.style（只是获取的行内样式，不是全部样式） // 可读、可写
  - document.styleSheets[0].cssRules[0].style;

#### CSSRuleList 接口{CSSRuls}

- 表示一组 CSS 规则，成员都是 CSSRule 实例。

- ![image-20210107132525566](C:%5CUsers%5Cliujia11%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210107132525566.png)![image-20210107133750359](C:%5CUsers%5Cliujia11%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210107133750359.png)

- ```javascript
  var myStyleSheet = document.getElementById('myStyle').sheet
  var crl = myStyleSheet.cssRules
  crl instanceof CSSRuleList // true
  ```
