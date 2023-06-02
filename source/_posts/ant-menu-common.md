---
title: Ant Design的菜单常用设置
date: 2023-06-02 17:47:36
categories:
  - React
tags:
  - React
  - Ant Design
---

1.实现手风琴模式
Ant Design 默认没有为菜单组件提供手风琴模式的配置项，需要自己手动实现

```javascript
const handleChange = (Keys: string[]) => {
	// 实现手风琴
	setOpenKeys([Keys[Keys.length - 1]])
}
```

把该函数绑定在 menu 的 `onOpenChange`回调函数上，原理是该事件会传递一个已打开的菜单项的`key`的数组，而且是 push 进去的，数组的最后一项总是最新打开的一项，所以可以把`openkeys`设置为该数组的最后一项

2.在二级菜单下刷新页面时保留菜单选中和展开

```javascript
let firstOpen = ""
//菜单的key设置为路由地址，获取当前Url地址
const location = useLocation()
//用于寻找key和当前页面地址对应项
const findkey = (obj: ItemType) => obj?.key === location.pathname
items.forEach((i: any) => {
    // 若菜单项的children不为空数组，去查找二级菜单中是否有对应的key
	if (i?.children && i?.children.length > 1 && i?.children.find(findkey)) {
		firstOpen = i.key
		console.log(firstOpen)
	}
})
const [openKeys, setOpenKeys] = useState([firstOpen] as string[])
```
