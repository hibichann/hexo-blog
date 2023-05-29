---
title: 初识Vue3
date: 2022-07-26 10:39:43
categories:
  - Vue
tags:
  - Vue3
---

#### 首次学习 vue3 时的笔记

要从单个绑定获取多个 ref，请将  `ref`  绑定到一个更灵活的函数上：

```html
<div v-for="item in list" :ref="setItemRef"></div>
```

`$attrs`  现在包含了所有传递给组件的 `attribute`，包括  `class`  和  `style`。

`ref()`用于基本类型 `reactive()`用于对象或数组 实现深层的响应式数据

具名插槽 `slot=“qwe” `>>>>` v-solt:qwe`

自定义事件需要用`emits`接受

`setup`会接受两个参数

`props`接收后为 setup 第一个参数

`context `

`attrs`值为对象，包含了未被`props`接受的来自父组件中的属性，包括`class`和`style`

`slots`收到的插槽内容

`emit`分发自定义事件的函数，用于触发自定义事件

`expose` 指定组件向父组件暴露出去的公共函数

```javascript
watch(prop, callback(newValue,oldValue)=>{
    ...
}, {immediate：true,deep:true})
```

###### watch 监听对象

1 监听`reactive`定义的对象时 `oldValue`无法正确获取，

2 监听`reactive`定义的对象时 强制开启了`deep`深层监视，无法关闭

3 监听`reactive`定义对象中的某个属性 ，`prop`不能直接写`ob1.prop`需要写成返回值的样式 `()=>ob1.prop`

4 监听对象中的深层属性如`ob1.job`，需要开启`deep`

`watchEffect`默认开启`immediate`，只监视回调函数中被使用的值

###### 生命周期

创建前后>>` setup()`

挂载前后`onBeforeMount`/`onMounted`

更新前后`onBeforeUpdated`/`onUpdated`

卸载前后`onBeforeUnmount`/`onUnmounted`

###### 自定义 hook

`toRef `创建一个 ref 对象，其 value 值指向另一个对象的中的某个属性

```javascript
const name = toRef(person, "name")
```

`toRefs`可以展开一个 reactive 生成的 proxy 对象，让它成为一个普通对象，但该对象中的所有属性都是一个 ref 对象

###### 移除了.`native`

想要为组件绑定如 click 这种原生事件时，只需注意不要在 emits 中接受即可，即可防止 click 被视为自定义事件，相同的，若要重载 click 事件，在 emits 中接收即可

移除过滤器

`fragment `组件模板中可以不写根元素，减少了性能开销

`teleport`组件可以将某一部分元素输送到某个指定元素中，更方便定位。

###### 异步组件

使用`defineAsyncComponent`来引入一个异步组件，

```javascript
import {defineAsyncComponent} from 'vue'
const Child=defineAsyncComponent(()=>import('./Components/Child')
```

```html
<suspense>
	<template #default>
		<!--此处放置真正的组件-->
		<todo-list />
	</template>
	<template #fallback>
		<!--此处放置骨架屏/渲染期间的显示-->
		<div>Loading...</div>
	</template>
</suspense>
```

`shallowReactive`只有第一层数据拥有响应式

如同

```javascript
let ob1=shallowReactive({
    name:"zhangsan",
    age:18,
    job:{
        j1:"stuff"
        salary:20 // 深层次的数据将会是一个普通的对象

    }
})
```

这样的数据，采用 shallowReactive 无法令 j1 和 salary 拥有响应式

`shallowRef`对于基本类型等同于 ref，对于对象类型，不会添加响应式

readonly 只读

```javascript
ob1 = readonly(ob1)
```

**_采用 readonly 不会令数据丢失响应式，但是会令数据不可更改_**

`shallowReadonly`浅只读

仅令 ob1 中的 name 和 age 不可更改，job 内部的属性可以更改

`toRaw`令一个 reactive 数据失去响应式

`markRaw`令一个 reactive 数据永远不能转为响应式

**_isRef:检查一个值是否为一个 ref 对象_**
**_lsReactive:检查一个对象是否是由 reactive 创建的响应式代理_**
**_isReadonly:检查—个对象是否是由 readonly 创建的只读代理
isProxy:检查一个对象是否是由 reactive 或者 readonly 方法创建的代理_**

`provide`/`inject`适用于祖孙通信

祖先组件无需指名传值给哪个后代，后代也无需声明数据来源

```javascript
provide(name, data)
```

```javascript
inject(name)
```

customRef 自定义 ref

---
