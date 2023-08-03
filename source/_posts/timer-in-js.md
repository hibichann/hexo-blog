---
title: js中的定时器似乎比实际时间更慢？
date: 2023-08-01 15:35:23
categories:
  - JavaScript
tags:
  - JavaScript
---

有时你可能会注意到，你切换到了另一个网页，然后过一会儿再回到当前页面，这个页面上的某个计时器似乎比预期的要慢一些。
难道是开发者肆意为之？想要在你等待计时器的时候，让你多看几眼广告或者多等几秒再开始下载？当然不是，这是因为浏览器的一些优化策略和单进程的js导致的。

#### 1.嵌套超时

正如 HTML 标准中规定的那样，一旦对 setTimeout 的嵌套调用被安排了 5
次，浏览器将强制执行 4
毫秒的最小超时。但这个嵌套的次数和超时时间各家浏览器的实可能不尽相同。

这可以在下面的例子中看到，在这个例子中，我们嵌套了对 setTimeout 的调用，延迟为 0
毫秒，并记录每次调用处理程序时的延迟。前四次，延迟约为 0 毫秒，之后约为 4 毫秒：

```html
<button id="run">运行</button>
<table>
	<thead>
		<tr>
			<th>之前</th>
			<th>现在</th>
			<th>实际延时</th>
		</tr>
	</thead>
	<tbody id="log"></tbody>
</table>
```

```js
let last = 0;
let iterations = 10;

function timeout() {
  // 记录调用时间
  logline(new Date().getMilliseconds());
  // 如果还没结束，计划下次调用
  if (iterations-- > 0) {
    setTimeout(timeout, 0);
  }
}
function run() {
  // 清除日志
  const log = document.querySelector("#log");
  while (log.lastElementChild) {
    log.removeChild(log.lastElementChild);
  }

  // 初始化迭代次数和开始时间戳
  iterations = 10;
  last = new Date().getMilliseconds();
  // 开启计时器
  setTimeout(timeout, 0);
}

function logline(now) {
  // 输出上一个时间戳、新的时间戳及差值
  const tableBody = document.getElementById("log");
  const logRow = tableBody.insertRow();
  logRow.insertCell().textContent = last;
  logRow.insertCell().textContent = now;
  logRow.insertCell().textContent = now - last;
  last = now;
}

document.querySelector("#run").addEventListener("click", run);
```

![结果](https://cdn.jsdelivr.net/gh/hibichann/picgo@main/202308030952843.png)

#### 2.非活动标签的超时

为了优化后台标签的加载损耗（以及降低耗电量），浏览器会在非活动标签中强制执行一个最小的超时延迟。如果一个页面正在使用网络音频
API AudioContext 播放声音，也可以不执行该延迟。

这方面的具体情况与浏览器有关：

Firefox 桌面版和 Chrome 针对不活动标签都有一个 1 秒的最小超时值。 安卓版 Firefox
浏览器对不活动的标签有一个至少 15 分钟的超时，并可能完全卸载它们。
如果标签中包含 AudioContext，Firefox 不会对非活动标签进行节流。

#### 3.单线程的 JavaScript

JS 是单线程的，有它独特的事件循环机制。当我们调用 setTimeout
时，浏览器会将回调函数放入事件队列中，等待执行。当主线程执行完毕后，会立即执行事件队列中的回调函数。如果主线程执行时间过长，那么回调函数就会被延迟执行。

事件循环机制的执行顺序:

> 1.执行当前执行栈中的顺序
> 2.当执行栈是空的时候，事件循环会从事件队列中取出一个任务进行执行，该任务是宏任务
> 3.当宏任务执行完毕后，事件循环会检查是否有微任务需要执行，如果有会依次执行所有微任务，直到微任务队列为空
> 4.重复执行步骤 2-3，直到事件队列和微任务队列均为空

所以如果页面（或操作系统/浏览器）正忙于其他任务，超时也可能比预期的晚。需要注意的一个重要情况是，在调用
setTimeout() 的线程结束之前，函数或代码片段不能被执行。例如：

```js
function foo() {
  console.log("foo 被调用");
}
setTimeout(foo, 0);
console.log("setTimeout 之后的代码");
```

会在控制台输出：

```
setTimeout 之后的代码
foo 被调用
```

出现这个结果的原因是，尽管 setTimeout 以 0ms
的延迟来调用函数，但这个任务已经被放入了队列中并且等待下一次执行；并不是立即执行；队列中的等待函数被调用之前，当前代码必须全部运行完毕，因此这里运行结果并非预想的那样。
