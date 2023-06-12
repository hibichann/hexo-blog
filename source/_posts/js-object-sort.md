---
title: JS总能够保证对象顺序么
date: 2023-04-23 20:30:49
categories:
  - JavaScript
tags:
  - JavaScript
---

当你创建了一个对象类似于：

```javascript
var obj = {}
obj.prop1 = "Foo"
obj.prop2 = "Bar"
```

那它是否总是能表现为：

```javascript
{ prop1 : "Foo", prop2 : "Bar" }
```

换句话说，js 是否总能保证对象的顺序？

答案是能够保证，但不一定是插入顺序（ES 2015 之前）

大部分浏览器都遵循这样的迭代规则：

> 1.正整数键按升序排列（以及像“1”这样的字符串被解析为整数）
>
> 2.字符串键，按插入顺序（ES 2015 保证这一点，所有浏览器都遵守）
>
> 3.符号名称，按插入顺序排列（ES 2015 保证所有浏览器都符合此要求）

一些较旧的浏览器采用的是前两种，按插入顺序迭代所有键。如果键可以被解析为整数，那么最好不要依赖于任何特定的迭代顺序。

当前语言规范（ES 2015 及以后）中，插入顺序被保留，除非键被解析为正整数（包括“7”或“99”这样字符串包裹的整数），这种情况下行为因浏览器而异。比如，Chrome/V8 在键解析为数字时将不遵守插入顺序。

#### Demo:

![image-20230516105647021](https://cdn.jsdelivr.net/gh/hibichann/picgo@main/202305161056090.png)

![image-20230516105709791](https://cdn.jsdelivr.net/gh/hibichann/picgo@main/202305161057834.png)

在 chrome 中，整数键不遵守插入顺序，而是升序。

#### 后记

这是一个很好的，现有的约定俗成的行为驱动规范完善的例子。es2015 之前并没有规范，但是 es2015 根据多数浏览器的实现制定了规则。
但我们开发时并不能确定所处的运行环境，单就对象中 key 的顺序而言，最好不要依赖规范，而是自行遍历再过滤 key。或者采用 map 来保证 key 的顺序固定，map 中的键是有序的，map 在遍历的时候保证会按照插入顺序来迭代

[信息来源]: https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
