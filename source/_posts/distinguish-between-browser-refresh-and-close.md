---
title: 如何区分浏览器刷新和关闭？
date: 2023-07-12 11:09:23
categories:
  - JavaScript
tags:
  - JavaScript
---

####起因
起因呢是群里有人提问说如何区分浏览器刷新和关闭的事件，他需求在关闭浏览器时清空所有 localStorage 的数据，因为 uhhh————很奇怪，他们的项目要求不能使用 sessionStorage，只能使用 localStorage。

**所以这篇文章讨论的是如何在不使用 sessionStorage 的情况下，区分并实现浏览器刷新和关闭的事件。**

我一开始想到的是`onbeforeunload`或者`unload`事件，但是这个事件在浏览器关闭和刷新时都会触发的，
而且各个浏览器厂商的加载流程也不近相同，所以这个事件并不能用来区分浏览器刷新和关闭。
也包括其参数中的`e.currentTarget.performance.navigation.type`也是一样的。

这个类型可以理解为当前的导航类型，而非下一步操作的类型，所以无法区分刷新和关闭。
他可以确定你是第一次加载或者是刷新所进来的方式（之前的类型），但是无法确定你将要刷新还是关闭（下一步的操作）。
然后是几个可行的方法：

#### 心跳包

1.在页面上，添加 `onunload` 事件（伪 JavaScript）：

```js
function myUnload(event) {
	if (window.localStorage) {
		// 标记页面正在被卸载
		window.localStorage["myUnloadEventFlag"] = new Date().getTime()
	}
	//通知服务器我们想在几秒钟内断开用户的连接
	askServerToDisconnectUserInAFewSeconds()
	// 异步 AJAX call
}
```
