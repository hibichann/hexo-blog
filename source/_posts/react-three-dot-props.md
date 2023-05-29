---
title: react中使用...批量传递props
date: 2023-02-09 21:56:12
categories:
  - CSS
tags:
  - Vue
  - SASS/SCSS
---
```jsx
class App extends React.Component {
    render() {
        const { name1, age } = this.props
        return (
            <span>
                {name1},{age}
            </span>
        )
    }
}
const p = { name1: "tom", age: 1 }
console.log({ ...p }) //输出对象p
console.log(...p) //报错，没有迭代器iterator
root.render(
    <h1>
        <App {...p}></App>
        {/* 这里的花括号是react表明内部是js语法，而非es6展开运算符 */}
        {/* 此处传入的是name1="tom",age=1,而非p对象{name1:'tom',age:1} */}
        {/* react为批量传递props提供了...迭代器，但仅能用于传递props */}
    </h1>
)
```
