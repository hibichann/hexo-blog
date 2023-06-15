---
title: 阻止表单的默认行为时的行为
date: 2023-06-15 09:27:51
categories:
  - JavaScript
tags:
  - JavaScript
thumbnail: "https://cdn.jsdelivr.net/gh/hibichann/picgo@main/202306150929505.png"
---

想象有一个这样的表单：

![form-default](https://cdn.jsdelivr.net/gh/hibichann/picgo@main/202306150929505.png)

我们很多时候，并不想在表单提交以后刷新页面，就需要阻止默认的提交行为
此时如果在 input 输入框输入之后按下 enter 会触发哪个函数？
会触发整个表单中的第一个按钮？或者 input 输入框后的第一个按钮？再或者是具有`type="submit"`的按钮？
答案是会触发整个表单的第一个按钮，无论多少个输入框，总会触发整个表单的第一个按钮
