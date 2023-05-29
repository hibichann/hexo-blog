---
title: 在 element-plus 中保持菜单展开
date: 2023-02-22 20:35:12
categories:
  - Vue
tags:
  - Vue3
  - Element Plus
thumbnail: "https://cdn.jsdelivr.net/gh/hibichann/picgo@main/img1.png #26303A"
---​

在element plus中，有时我们需要始终保持菜单的展开状态（如单独的全展开的分类页），而在 element plus 中并未提供相应的属性。

但是可以首先为`el-menu`设置`default-openeds` 属性，值为需要展开的菜单。
然后直接在`el-menu`的属性中，为菜单创建`ref`实例，并绑定`close`方法，在`close`方法中调用菜单实例身上的`open`方法来再次展开这个菜单。

​需要保持菜单展开的情况许多时候还需要去除二级菜单后面的小箭头，可以通过为`.el-sub-menu__icon-arrow`设置 `display: none !important;` 来清除二级菜单后的按钮。

模板：

```html
<el-menu
	class="el-menu-demo"
	:ellipsis="false"
	:default-openeds="['2', '2-4']"
	@close="keepopen"
	ref="menuRef">
	<el-menu-item index="0">LOGO</el-menu-item>
	<div class="flex-grow" />
	<el-menu-item index="1">Processing Center</el-menu-item>
	<el-sub-menu index="2">
		<template #title>Workspace</template>
		<el-menu-item index="2-1">item one</el-menu-item>
		<el-menu-item index="2-2">item two</el-menu-item>
		<el-menu-item index="2-3">item three</el-menu-item>
		<el-sub-menu index="2-4">
			<template #title>item four</template>
			<el-menu-item index="2-4-1">item one</el-menu-item>
			<el-menu-item index="2-4-2">item two</el-menu-item>
			<el-menu-item index="2-4-3">item three</el-menu-item>
		</el-sub-menu>
	</el-sub-menu>
</el-menu>
```

方法：

```javascript
const menuRef = ref < any > ""
const keepopen = (s) => {
	menuRef.value.open(s)
}
```

![效果](https://cdn.jsdelivr.net/gh/hibichann/picgo@main/img1.png)
