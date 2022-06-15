# Dom

一个 DOM 元素可以有以下两类 DOM 子树：

1. Light tree（光明树） —— 一个常规 DOM 子树，由 HTML 子元素组成。我们在之前章节看到的所有子树都是「光明的」。
2. Shadow tree（影子树） —— 一个隐藏的 DOM 子树，不在 HTML 中反映，无法被察觉。



`Node`是节点树中所有类型节点的基类。每个`Node`都有以下3个指针（但不限于）：

- `parent_or_shadow_host_node_`：指向父级（如果是影子根，则指向影子主机；稍后说明）
- `previous_`：指向上一个同级
- `next_`：指向下一个兄弟姐妹

`ContainerNode`从`Element`扩展，为其子级提供了其他指针：

- `first_child_`：
- `last_child_`：

这意味着：

- Siblings 是 linked list类型.  获取parent's n-th child需要O(N) 
- 不能在O（1）下获取parent的所有子

### Composed Tree (a tree of node trees)

**Shadow tree**的根节点是`ShadowRoot`

一个**影子树**是一个节点树，其根是一个`ShadowRoot`。从Web开发人员的角度来看，可以通过调用`element.attachShadow{ ... }`API创建影子根。这里的*元素*称为**影子主机**，如果上下文清晰，则仅称为**主机**。

- 影子根始终通过其host连接到另一个节点树。
- 影子根主机的节点树有时称为**light tree**。

![image-20210123000133936](https://i.loli.net/2021/01/23/HFcQUKTamRfdXAp.png)

- document tree不包含shadow tree
- `Document` 和 `ShadowRoot` 总是节点树的根，并且 implements `TreeScope`.
- TreeScope具有ID到元素的映射
- 普通的dom遍历不能穿过shadow root：因为shadowRoot并不算是其host的child
- FlatTree:
- FlatTreeTraversal：Blink不会在内存中存储或维护平面树数据结构。相反，Blink提供了一个实用程序类，该实用程序类*以平面树顺序*[`FlatTreeTraversal`](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/dom/flat_tree_traversal.h)遍历组成的树。

```
document
├── a1 (host)
│   ├──/shadowRoot1
│   │   └── b1
```

Composed Tree

```
document
├── shadowRoot1
├── shadowRoot2
└── shadowRoot3
    ├── shadowRoot4
    └── shadowRoot5
```

Flat tree

```
document              
└── a1 (host)
   └── B
```

Blink doesn't store nor maintain a flat tree data structure in the memory. Instead, Blink provides a utility class, [`FlatTreeTraversal`](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/dom/flat_tree_traversal.h), which traverses a composed tree *in a flat tree order*.

