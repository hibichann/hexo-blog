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

但这样的 curry 函数局限过大，那如何封装一个通用的 curry 函数呢？

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

`curry` 函数接受一个普通函数 `fn` 并返回一个新的函数 `curried。当` `curried` 被调用时，它会检查传递给它的参数数量是否足够调用 `fn`。如果足够，`fn` 就会被应用并返回结果。否则，`curried` 会返回一个新的函数，该函数使用 `args.concat(args2)` 将之前传递的参数和新传递的参数合并，然后再次调用 `curried`

在这个过程中，每个返回的新函数都具有对原始函数 `fn` 的引用，并且可以收集任意数量的参数。最终，当最后一个新函数被调用并传入了所有需要的参数时，`fn` 被调用并返回结果。

通过使用柯里化，我们可以创建更加灵活和重复使用的函数。
