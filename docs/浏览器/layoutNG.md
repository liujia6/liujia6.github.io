### [LayoutNG介绍](https://zhuanlan.zhihu.com/p/37847490)

参考： https://docs.google.com/document/d/1uxbDh4uONFQOiGuiumlJBLGgO4KDWB8ZEkp7Rd47fw4/edit#heading=h.guvbepjyp0oj

layout tree 只是结合了 dom tree 和 compuedStyle，并没有计算出每个 layout object 的具体在屏幕上的物理位置，之前是直接将更新结果更新在 layout tree 上，通过 layoutNG，我们将布局输出，放在 NGPhysicalFragment 上面，从而实现了 layout 的输入与输出分离

<img src="https://i.loli.net/2021/01/13/MYtPWRQ9fF3p1hK.png" alt="image-20210113183808157" style="zoom:50%;" />

NGPaintFragments 是：

- 一成不变的
- 所有坐标都是物理的。参见 [layout_box_model_object.h](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/layout/layout_box_model_object.h)。
- NGFragment 具有 Offset（）而不是 Location（），它是与父片段的物理偏移量。

#### CSS Fragmentation

CSS Fragment 中，把一个 paged media（比如图片，幻灯片）、分成众多 fragments，如果 paged media 中间出现了一些障碍物如文字，排版能正常排开。下面例子，中间部分为 Fragment，在改变了尺寸后，以及滚动后，可能的效果。

<img src="https://pic2.zhimg.com/80/v2-11b044653e288d520a32773c43b9a501_720w.jpg" alt="img" style="zoom: 50%;" />

#### NGFragment

NGFragment 是 CSS Fragment 在 LayoutNG 中的形式。任何 CSS Box 都可以生成 NGFragment（一可能对多）。特别是文字节点在换行的时候。文字的时候 NGFragment 为 NGText。这里还有个 NGBreakToken 的概念，当一个 CSS Box 生成了 N 个 NGFragments，如果他还需要继续 Fragment，那么就会有 N 个 NGBreakTokens。

#### NGConstraintSpace

每个 NGFragment 存在一个叫 NGConstraintSpace 的地方，表示当前排版的可用空间和不可用空间。不可用空间存的东西为 NGExclution，可用空间存的东西即 NGFragment。整个 Layout 就是在 NGConstraintSpace 里面完成的。

下图为一个 NGConstraintSpace 的例子，里面有三个 NGExclutions 以及一个 NGFragment。

<img src="https://pic4.zhimg.com/80/v2-397e2a4ea830f3cdba40e04722908db7_720w.jpg" alt="img" style="zoom:50%;" />

一个新的 NGConstraintSpace 可以由一个旧的 NGConstraintSpace 生成，目的是方便接下来儿子的排版。

<img src="https://pic1.zhimg.com/80/v2-1f29faff0678db5f134d88d19dacc35c_720w.jpg" alt="img" style="zoom:50%;" />

NGLayout Tree（LayoutNG Tree/Fragment Tree）

<img src="https://pic1.zhimg.com/80/v2-6a28a56f47f42d6fecae58cb70b13b08_720w.jpg" alt="img" style="zoom:50%;" />

这里说到的 NGLayout Tree 是由 Legacy Tree 转变来的。Legacy Tree 是指以前老的 Layout Tree。NGLayout Tree 并不是从 Legacy Tree 慢慢过渡来的，而是直接建立出 NGLayout Tree。
