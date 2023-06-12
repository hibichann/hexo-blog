---
title: hexo在网页中插入一段自定义的代码
date: 2023-06-6 08:51:24
categories:
  - JavaScript
tags:
  - CSS
  - JavaScript
  - HTML
---

在 hexo 根目录下创建文件夹`scripts`，然后写自己的代码进去
有时我们想要修改主题的默认样式，但是主题是`npm install`安装的，不在`themes`目录下，也可通过这种方式注入一段 js

```javascript
hexo.extend.filter.register("after_render:html", function (htmlContent) {
	// 在此处输入你想要注入的 CSS 样式代码
	var css = `.φbm {
        max-height: 500px;
        object-fit: cover;
        filter:brightness(0.95);
        transition:all 0.2s;
    }
    .φbm:hover{
        filter:unset;
        transition:all 0.2s;
        transform: scale(1.05);
    }
    `
	// 将 CSS 样式代码插入到 HTML 中
	return htmlContent.replace(/<\/head>/i, "<style>" + css + "</style></head>")
})
```

这段代码就可以自动的被 hexo 注入到项目中，具体参考 hexo 插件手册
