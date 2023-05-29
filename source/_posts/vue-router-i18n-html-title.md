---
title: vue-router中使用i18n来进行网页标题的国际化
date: 2022-12-29 19:39:12
categories:
  - Vue
tags:
  - Vue Router
  - I18n
---

思路很简单，在完成`vue-i18n`的安装后，第一次访问页面时候缓存默认语言，更改语言时，把当前语言缓存起来。在 i18n 中定义好不同语言的标题，然后在路由中引用作为 meta.title。在路由后置守卫中进行网页标题的修改。

代码：

首先完成 vue-i18n 配置：

```javascript
import { createI18n } from "vue-i18n"
import zh from "./zh"
import en from "./en"
const i18n = createI18n({
	legacy: false,
	locale: "zh", // 语言标识（缓存里面没有就用中文）
	messages: {
		zh,
		en,
	},
})
if (
	window.localStorage.getItem("lang") !== "zh" &&
	window.localStorage.getItem("lang") !== "en"
) {
	window.localStorage.setItem("lang", "zh")
}
i18n.global.locale.value = window.localStorage.getItem("lang")
export default i18n
```

en.js:

```javascript
export default {
	meg: {
		language: "中文",
		home: "Home",
		category: "Category",
		tags: "Tags",
		test: "Test",
		articles: "Articles",
		album: "Album",
		finNew: "Latest Articles",
	},
}
```

zh.js:

```js
export default {
	meg: {
		language: "English",
		home: "主页",
		category: "分类",
		tags: "标签",
		test: "测试",
		articles: "文章",
		album: "相册",
		finNew: "最新文章",
	},
}
```

router.js

```js
//路由中的定义方式
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: i18n.global.t('meg.home')
    }
  }
//...
//后置守卫
router.afterEach((to, from) => {
  document.title = (i18n.global.locale.value === 'zh') ? 'Hibi 博客站' : 'Hibi Blog' + '-' + to.meta.title
})
```
