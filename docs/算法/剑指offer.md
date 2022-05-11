# 剑指 offer

## [斐波那契数列](https://www.nowcoder.com/practice/c6c7742f5ba7442aada113136ddea0c3?tpId=13&tqId=23255&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

- 要求输入一个正整数 n ，请你输出斐波那契数列的第 n 项。
- 斐波那契数列：前两项是 1，后面的数组项是前两项的和
- `1，1，2，3，5，8`

```js
// 递归
function fibonacci() {
  // write code here
  if (n <= 2) return 1;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

// 动态规划
function fibonacci(n) {
  const result = [0, 1, 1];
  for (var i = 3; i <= n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result[n];
}
```

## [跳台阶](https://www.nowcoder.com/practice/8c82a5b80378478f9484d87d1c5f12a4?tpId=13&tqId=11161&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

- 利用动态规划，到达第 n 个台阶只可能有两种情况，从前一个台阶来，从前前个台阶来

```js
function fibonacci() {
  // write code here
  if (n <= 2) return n;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

function jumpFloor(n) {
  const result = [0, 1, 2];
  for (var i = 3; i <= n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result[n];
}
```

## 变态跳台阶

一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级……它也可以跳上 n 级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

- 每个台阶都有两种情况，跳与不跳 就用数学解

```js
function jumpFloorII(number) {
  return 2 ^ (n - 1);
}
```
