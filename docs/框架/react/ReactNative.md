## React Native 和 Web 最大区别

### 运行环境不同

我觉得 RN 和 Web 最大区别还是运行平台不同。Web 运行在浏览器环境中，依赖 DOM 和浏览器能力；RN 虽然使用 React 开发，但最终运行在 iOS 或 Android 上。

这种差异主要体现在三个方面：

第一是渲染方式不同，Web 渲染 DOM，而 RN 最终渲染原生组件。

第二是平台能力不同，RN 需要接触相机、相册、推送、Apple 登录等原生能力。

第三是工程体系不同，除了业务开发外，还需要处理 Xcode 工程、证书签名、TestFlight 和 App Store 发布流程。

另外移动端还有一些特有问题需要处理，比如安全区域、键盘遮挡、前后台切换和设备适配等。我自己在独立开发并上线愈记时，对这些问题都有比较实际的体验。

## React-native 和 react 的区别

React Native 本质上是 React 在移动端的实现，所以组件化、Hooks、状态驱动 UI 等核心思想是一致的。

最大区别在于渲染目标不同，React 最终渲染 DOM，而 React Native 最终渲染原生组件，因此组件体系、样式体系和平台 API 都有所不同。

比如 React 使用 div、span 和 CSS，而 RN 使用 View、Text 和 StyleSheet；React 依赖浏览器提供的 DOM API，而 RN 更多依赖移动端提供的原生能力。