# 目录

- [数组常见的去重的方法?](##2)
- [多维数组如何扁平化去重？](##3)
- [新增数组的实例方法？](##5)

## 数组常见的去重的方法? {##2}

常见的有三种。
第一种：利用 es6 中的 set 数据结构直接去重，set 中不包含重复的元素，然后使用 Array.from 将 set 结构转换成数组。
第二种：利用 indexOf 或者 includes 去判断当前项的下标是否和等于当前元素的下标，如果相等则 push 进新数组。
第三种：利用传统的双 for 循环，进行排序去重，如果相等第一项和第二项，则使用 splice 删除第二项。

```js
// 1、双 for 循环；
let array = [
  [1, 2, 3, [9, 10, 11]],
  [4, 5, 5, 6, [7, 8, 9, [10, 11, 12, 12]]]
]
let arr = ['h', 'e', 'l', 'l', 'o', 'h', 'e', 'l', 'l', 'o']
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] === arr[j]) {
      arr.splice(j, 1)
      j--
    }
  }
}
console.log(arr)
// 2、filter + indexOf || includes
let arr = ['h', 'e', 'l', 'l', 'o', 'h', 'e', 'l', 'l', 'o']
let indexOF = arr.filter((item, index) => arr.indexOf(item) === index)
let newArr = []
arr.forEach(item => {
  if (!newArr.includes(item)) {
    newArr.push(item)
  }
})
// 3、Array.from + new Set()
let arr = ['h', 'e', 'l', 'l', 'o', 'h', 'e', 'l', 'l', 'o']
console.log(Array.from(new Set(arr))) // [ 'h', 'e', 'l', 'o' ]
```

## 多维数组如何扁平化去重？ {##3}

第一种：利用 flat 函数，es2019 提出的方法。
flat 方法哟用于拉平嵌套的数组 flat 方法中可以传入一个整数，表示拉平的层数，默认是 1，使用 infinity 关键字作为参数表示无论嵌套多少层都可以转换成一组数组，flat 方法不会改变原数组。

```js
let newArr = arr.flat(3).reduce((pred, item, index, arr) => {
  if (arr.indexOf(item) === index) {
    pred.push(item)
  }
  return pred
}, [])
```

第二种：利用 toString 函数。

```js
let newArr = arr.toString().split(',')
for (let i = 0; i < newArr.length; i++) {
  for (let J = i + 1; J < newArr.length; J++) {
    if (newArr[i] === newArr[J]) {
      newArr.splice(J, 1)
      J--
    }
  }
}
```

第三种：利用递归。

```js
let a = [] //存放结果
function removeArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      //判断是否是数组
      removeArray(arr[i])
    } else {
      a.push(arr[i])
    }
  }
}
removeArray(arr)
let newArr = [...new Set(a)]
```

## 数组方法的实现？{##4}

```js
// forEach 的实现
Array.prototype.myEach = function (callBack) {
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    let index = i
    let array = this
    callBack(item, index, array)
  }
}
let arr = [4, 5, 6, 7]
arr.myEach(item => console.log(item + 1))

// map 的实现
Array.prototype.myMap = function (callBack) {
  let all = []
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    let index = i
    let array = this
    all.push(callBack(item, index, array))
  }
  return all
}
let arr = [4, 5, 6, 7]
let newMap = arr.myMap(item => {
  return { key: item }
})
console.log(newMap)

// filter 的实现
Array.prototype.myFilter = function (callBack) {
  let all = []
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    let index = i
    let array = this
    if (callBack(item, index, array)) {
      all.push(item)
    }
  }
  return all
}
let arr = [4, 5, 6, 7]
let newArr = arr.myFilter((item, index) => index > 0)
console.log(newArr)

//find 的实现
Array.prototype.myFind = function (callBack) {
  let allFalse = []
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    let index = i
    let array = this
    if (callBack(item, index, array)) {
      return item
    }
    allFalse.push(callBack(item, index, array))
  }
  return allFalse.every(i => !i) && undefined
}
let arr = [4, 5, 6, 7]
let newArr = arr.myFind((item, index) => index > 10)
console.log(newArr)

//reduce 的实现
Array.prototype.myReduce = function (callBack, pre) {
  let pred = pre || 0
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    let index = i
    let array = this
    pred = callBack(pred, item, index, array)
  }
  return pred
}
let arr = [4, 5, 6, 7]
let newArr = arr.myReduce((pred, item) => pred + item)
console.log(newArr)
```

## 新增数组的实例方法？{##5}

```js
// 1、fill 方法：用于填充一个数组，常用于数组的初始化，如果原来数组有值则会覆盖原本的值。
console.log(new Array(4).fill(7)) // [ 7, 7, 7, 7 ]
console.log([1, 2, 3].fill(7)) // [ 7, 7, 7 ]

// 2、flat 方法：用于拉平嵌套的数组。
console.log([[1, 2, [3, 4]]].flat(1)) // [ 1, 2, [ 3, 4 ] ]
console.log([[1, 2, [3, 4]]].flat(2)) // [ 1, 2, 3, 4 ]
console.log([[1, 2, [3, 4]]].flat(Infinity)) // [ 1, 2, 3, 4 ]
console.log([2, 3, 4].flatMap(x => [x, x * 2])) // [ 2, 4, 3, 6, 4, 8 ]
console.log([2, 3, 4].map(item => [item, item * 2]).flat(1))[(2, 4, 3, 6, 4, 8)]

// 3、flatMap 方法：将原数组每个成员先执行 map 再执行 flat。
```
