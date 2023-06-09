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
