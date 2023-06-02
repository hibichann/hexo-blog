---
title: 错误的v-deep弃用警告
date: 2023-05-12 12:35:23
categories:
  - CSS
tags:
  - Vue3
  - SASS/SCSS
thumbnail: "https://cdn.jsdelivr.net/gh/hibichann/picgo@main/%E8%AD%A6%E5%91%8A.jpg #26303A"
---

在 sass/scss 项目中

注意到项目中经常会有关于`::v-deep`的弃用警告，但是项目里又搜不到`::v-deep`

![警告](https://cdn.jsdelivr.net/gh/hibichann/picgo@main/%E8%AD%A6%E5%91%8A.jpg)

![没有::v-deep](https://cdn.jsdelivr.net/gh/hibichann/picgo@main/%E6%B2%A1%E6%9C%89v-deep.jpg)

然后也去查看了源码里关于这段报错的：

![vdeep判断部分源码](https://cdn.jsdelivr.net/gh/hibichann/picgo@main/202305151015288.png)

打印 n.nodes：

![n.nodes](https://cdn.jsdelivr.net/gh/hibichann/picgo@main/202305151017431.png)

依旧无果，最终在 vuejs 的 issue 中找到:

[Misleading deprecation warning about "::v-deep", when ":deep" is used in a nested block with SASS](https://github.com/vuejs/core/issues/4745)

实际上是:deep 使用错误，应该是

```scss
:deep(.ClassName) {
	// more rules
}
```

而非

```scss
:deep .ClassName {
	// more rules
}
```

虽然后者也能工作，但是会错误地触发::v-deep 弃用警告
