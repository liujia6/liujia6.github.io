

layout tree只是结合了dom tree和compuedStyle，并没有计算出每个layout object的具体在屏幕上的物理位置，之前是直接将更新结果更新在layout tree上，通过layoutNG，我们将布局输出，放在NGPhysicalFragment上面，从而实现了layout的输入与输出分离

<img src="https://i.loli.net/2021/01/13/MYtPWRQ9fF3p1hK.png" alt="image-20210113183808157" style="zoom:50%;" />

### [LayoutNG介绍](https://zhuanlan.zhihu.com/p/37847490)

参考： https://docs.google.com/document/d/1uxbDh4uONFQOiGuiumlJBLGgO4KDWB8ZEkp7Rd47fw4/edit#heading=h.guvbepjyp0oj

NGPaintFragments是：

- 一成不变的
- 所有坐标都是物理的。参见[layout_box_model_object.h](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/layout/layout_box_model_object.h)。
- NGFragment具有Offset（）而不是Location（），它是与父片段的物理偏移量。

#### **CSS Fragmentation**

CSS Fragment中，把一个paged media（比如图片，幻灯片）、分成众多fragments，如果paged media中间出现了一些障碍物如文字，排版能正常排开。下面例子，**中间部分为Fragment**，在改变了尺寸后，以及滚动后，可能的效果。

<img src="https://pic2.zhimg.com/80/v2-11b044653e288d520a32773c43b9a501_720w.jpg" alt="img" style="zoom: 50%;" />

#### **NGFragment**

NGFragment是CSS Fragment在LayoutNG中的形式。任何CSS Box都可以生成NGFragment（一可能对多）。特别是文字节点在换行的时候。文字的时候NGFragment为NGText。这里还有个NGBreakToken的概念，当一个CSS Box生成了N个NGFragments，如果他还需要继续Fragment，那么就会有N个NGBreakTokens。

#### **NGConstraintSpace**

每个NGFragment存在一个叫NGConstraintSpace的地方，表示当前排版的可用空间和不可用空间。不可用空间存的东西为NGExclution，可用空间存的东西即NGFragment。整个Layout就是在NGConstraintSpace里面完成的。

下图为一个NGConstraintSpace的例子，里面有三个NGExclutions以及一个NGFragment。

<img src="https://pic4.zhimg.com/80/v2-397e2a4ea830f3cdba40e04722908db7_720w.jpg" alt="img" style="zoom:50%;" />

一个新的NGConstraintSpace可以由一个旧的NGConstraintSpace生成，目的是方便接下来儿子的排版。

<img src="https://pic1.zhimg.com/80/v2-1f29faff0678db5f134d88d19dacc35c_720w.jpg" alt="img" style="zoom:50%;" />

NGLayout Tree（LayoutNG Tree/Fragment Tree）

<img src="https://pic1.zhimg.com/80/v2-6a28a56f47f42d6fecae58cb70b13b08_720w.jpg" alt="img" style="zoom:50%;" />

这里说到的NGLayout Tree是由Legacy Tree转变来的。Legacy Tree是指以前老的Layout Tree。NGLayout Tree并不是从Legacy Tree慢慢过渡来的，而是直接建立出NGLayout Tree。
