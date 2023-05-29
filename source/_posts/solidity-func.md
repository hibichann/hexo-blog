---
title: solidity函数
date: 2023-05-29 20:12:12
categories:
  - Crypto
tags:
  - ETH
  - Solidity
---

function <function name>(<parameter types>) {internal|external|public|private} [pure|view|payable] [returns (<return types>)]

1. `function`：声明函数时的固定用法，想写函数，就要以 function 关键字开头。

2. `<function name>`：函数名。

3. `(<parameter types>)`：圆括号里写函数的参数，也就是要输入到函数的变量类型和名字。

4. `{internal|external|public|private}`：函数可见性说明符，一共 4 种。没标明函数类型的，默认`public`。合约之外的函数，即"自由函数"，始终具有隐含`internal`可见性。

   - `public`: 内部外部均可见。
   - `private`: 只能从本合约内部访问，继承的合约也不能用。
   - `external`: 只能从合约外部访问（但是可以用`this.f()`来调用，`f`是函数名）。
   - `internal`: 只能从合约内部访问，继承的合约可以用。

   **Note 1**: 没有标明可见性类型的函数，默认为`public`。

   **Note 2**: `public|private|internal`  也可用于修饰状态变量。 `public`变量会自动生成同名的`getter`函数，用于查询数值。

   **Note 3**: 没有标明可见性类型的状态变量，默认为`internal`。

5. `[pure|view|payable]`：决定函数权限/功能的关键字。`payable`（可支付的）很好理解，带着它的函数，运行的时候可以给合约转入`ETH`。

6. `[returns ()]`：函数返回的变量类型和名称。

关于 pure/view：

被 pure 修饰的函数不可读取也不可修改链上数据，即纯粹的函数，函数内部无法直接读到合约内的变量，可以传入参数进行处理

被 view 修饰的函数可以读取链上数据，但是不能修改

默认为 payable 状态，可读可写

> 注：实际上 pure/view 修饰的函数 gas 费会更高，猜测原因是由于默认支持链上数据读写，所以减少功能需要额外的标识，提升了 gas 费
