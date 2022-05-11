## 得到树当前节点和子级的 map

```javascript

// 循环设置每个节点的ids为后代id的组合
_dfsGetIdsMap(data = []) {
      const map = {};
      var stack = [...data].reverse();
      while (stack.length !== 0) {
        let lasteNode = stack[stack.length - 1];
        // 有未被遍历的子节点则存储在栈中
        if (lasteNode.children && lasteNode.children.length && !lasteNode.children[0].ids) {
          stack.push(...lasteNode.children.reverse());
        }
        // 子节点计算好了则直接计算当前节点
        if (lasteNode.children && lasteNode.children.length && lasteNode.children[0].ids) {
          lasteNode.ids = lasteNode.id + lasteNode.children.reduce((ids, item)=>{
            return `${ids},${item.ids}`;
          }, '');
          map[lasteNode.id] = lasteNode.ids;
          stack.pop();
        }
        // 没有子节点了直接给自己赋值
        if (!lasteNode.children || lasteNode.children.length === 0) {
          lasteNode.ids = lasteNode.id;
          map[lasteNode.id] = lasteNode.ids;
          stack.pop();
        }
      }
      return map;
}
```
