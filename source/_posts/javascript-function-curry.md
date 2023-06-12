---
title: Javascript函数柯里化
date: 2023-06-12 08:58:05
categories:
  - JavaScript
tags:
  - JavaScript
---

函数柯里化就是接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数,并且返回接受余下的参数且返回结果的新函数的函数。
听起来有点绕，对吧？换句话就是：

```javascript
fn(a, b, c)
const curryFn = curry(fn)
fn(a, b, c) === curryFn(a)(b)(c)
```

我们要做的就是实现这个`curry`函数，它不会调用函数，它只是对函数做了一次转换

先来一个简单的例子：

```javascript
function add(x, y) {
	return x + y
}
const curryAdd = curry(add)
function curry(fn) {
	return (x) => {
		return (y) => {
			return fn(x, y)
		}
	}
}

```

但这样的curry函数局限过大，那如何封装一个通用的curry函数呢？

首先有两个目标，首先要确定函数执行的时机，然后就是参数收集的时机，如果参数没有收集完成，就继续收集和汇总参数。

```javascript
function curry(fn) {
	return function curried(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args)
		} else {
			return function (...args2) {
				return curried.apply(this, args.concat(args2))
			}
		}
	}
}
```

