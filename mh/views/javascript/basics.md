## 常见的字符串方法？

lenght: 长度
split: 将字符串转换成数组；
includes: 查找字符串中某一个字符，有返回 true，没有返回 false；
indexOf: 查找字符串中的字符；找到返回下标，找不到返回-1；
slice: 截取字符串中的一段字符；
subString: 截取字符串中一段字符；
trimStart: 去除字符串的开始空格；
trim: 去除字符串的首尾空格；
toLocaleLowerCase: 大写转换成小写，大多数情况下和 toLowerCase 没有区别；
trimEnd:去除字符串中的结束空格；
toLowerCase: 大写转换成小写；
toLocaleUpperCase: 小写转换成大些；
concat: 合并一个字符串；
toUpperCase: 小写转换成大写；
padEnd:同理，拉长；
padStart(number,'str')：从字符的开始位置拉长一个字符串，number 拉长的长度，str，补充的字符；
sharAt:根据下表返回对应的字符；
search:查找一个字符，返回查找的字符下标，没有返回-1,与 indexOf 的区别是支持正则，indexOf 不支持正则表达式；
repeat:重复字符；

```js
let str = ' Hello World '
console.log(str.split()) //[ ' Hello World ' ]
console.log(str.indexOf('W')) // -1
console.log(str.substring(2, 3)) // e
console.log(str.slice(2, 3)) // e
console.log(str.trim()) // Hello World
console.log(str.trimStart()) // Hello World
console.log(str.trimEnd()) // Hello World
console.log(str.toLocaleLowerCase()) // hello world
console.log(str.toLocaleUpperCase()) // HELLO WORLD
console.log(str.includes('W')) // true
console.log(str.length) // 13
console.log(str.charAt(2)) // e
console.log(str.repeat(2)) // Hello World Hello World
console.log(str.search('h')) // -1
console.log(str.concat('jack')) // Hello World jack
console.log(str.toLowerCase()) // hello world
console.log(str.toUpperCase()) // HELLO WORLD
console.log(str.padEnd(20, 'jack')) // Hello World jackjac
console.log(str.padStart(20, 'jack')) // jackjac Hello World
```

## es6 中字符串新增的方法？

1. 查找字符串中的字符。es+提供了 includes(),startsWith(),endsWith(),indexOf(),search()。

```js
let str = 'hello world'
console.log(str.indexOf('l')) // 2
console.log(str.includes('l')) // true
console.log(str.search('s')) // -1
console.log(str.startsWith('he')) // true
console.log(str.endsWith('rld')) // true
```

2. 将原来的字符串重复。repeat(n),n 表示重复的次数，返回新的字符串。

```js
let str = '123'
console.log(str.repeat(5)) //123123123123123
```

3. 补全字符串的长度。str.padStart(n,'m')，str.padEnd(n,'m'),n 表示返回新的字符串的长度，m 是要补的字符串.

```js
console.log('重要的事情说三遍：'.padEnd(27, ' 我要吃饭！')) // 重要的事情说三遍： 我要吃饭！ 我要吃饭！ 我要吃饭！
console.log('你好'.padStart(5, 'jock')) //joc 你好
```

4、去除字符串中的首尾空格。trim.Start() && trim.End()

```js
// 第一种：使用trim()函数，最简单的方式。
let str = ' hello world '
console.log(str.trimEnd()) // hello world
console.log(str.trimStart()) // hello world

// 第二种：如果是去除其他特定的字符，使用replace函数：例如；
let str = '---Hello, World!---'
str = str.replace(/^\-+|\-+$/g, '') // 去除首尾的'-'字符
console.log(str) // 输出: 'Hello, World!'
```

5、截取字符串中的一段

```js
let str = 'Hello world'
console.log(str.substring(0, 5)) // Hello
console.log(str.substring(-5)) // Hello
console.log(str.slice(0, 5)) // Hello
console.log(str.slice(-5)) // world
```

6. 通过下标返回指定位置的字符

```js
let str = 'Hello world'
console.log(str.charAt(0)) // H
```

7. 英文大小写转换

```js
let str = 'Hello world'
console.log(str.toLocaleLowerCase()) // hello world
console.log(str.toLocaleUpperCase()) // HELLO WORLD
```

8. 将字符串转换成数组

```js
let str = 'Hello world'
console.log(str.split()) // ['Hello world']
```

9. 替换字符中的某些字符

```js
let str = 'Hello world'
console.log(str.replace('l', 'L')) // HeLlo world
console.log(str.replaceAll('l', 'L')) // HeLLo worLd
```

10. 字符串转数字的方法？

第一种：Number()：将字符串转换成数字，如果含有英文返回 NAN。
第二种：parseInt():将字符串转换成整数，如果含有字母只转换字母之前的数字。
第三种：parseFloat():将字符串转换成小数。
第四种：一元加号运算符+：类似于 Number()。

**总结：**
1、查找字符串中的字符。indexOf()、includes()、startsWith()、endsWith()
2、去除字符串中的空格。trim()、trimStart()、trimEnd()
3、截取字符串中的一段。 substr() substring() slice() (他们的区别：如下，substr()已经被弃用,since 中可以传入负数表示从字符串的末尾开始截取)
4、通过下标返回指定位置的字符。 charAt()
5、英文大小写转换。toLocaleLowerCase() toLocaleUpperCase()
6、将字符串转换成数组。 split()
7、替换字符中的某些字符。replace() replaceAll()

## 数组常见的去重的方法?

常见的有三种。
第一种：利用 es6 中的 set 数据结构直接去重，set 中不包含重复的元素，然后使用 Array.from 将 set 结构转换成数组。
第二种：利用 indexOf 或者 includes 去判断当前项的下标是否和等于当前元素的下标，如果相等则 push 进新数组。
第三种：利用传统的双 for 循环，进行排序去重，如果相等第一项和第二项，则使用 splice 删除第二项。

```js
// 1、双 for 循环；
let array = [
  [1, 2, 3, [9, 10, 11]],
  [4, 5, 5, 6, [7, 8, 9, [10, 11, 12, 12]]],
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

## 多维数组如何扁平化去重？

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

变量提升是什么？与函数提升有什么区别？

## 构造函数？new 方法的实现?

构造函数介绍

```js
function F() {
  this.name = '张三'
  console.log(this) /// 指向实例对象
}

var f = new F()
console.log(f.name) //张三

function Animal(name, age) {
  ;((this.name = name), (this.age = age))
}
let a = new Animal('dag', 12)
console.log(a) //Animal 对象
console.log(Animal.prototype)
```

第一步：创建了一个空对象，作为将要返回的对象
第二步：将空对象的原型指向构造函数的 prototype 属性上
第三步：将构造函数的 this 赋值给这个空对象
第四步：返回当前的对象

new 命令的作用，就是执行一个构造函数，并且返回一个对象实例。使用 new 命令时，它后面的函数调用就不是正常的调用，而是依次执行下面的步骤
a：创建一个空对象，作为将要返回的对象实例。
b：将空对象的原型指向了构造函数的 prototype 属性。
c：将空对象赋值给构造函数内部的 this 关键字。
d：构造函数中如果没有 return 语句，则将新创建的对象返回。

也就是说，构造函数内部，this 指向的是一个新生成的空对象，所有针对 this 的操作，都会发生在这个空对象上。构造函数之所谓构造函数，意思是这个函数的目的就是操作一个空对象（即 this 对象），将其构造为需要的样子。

注意事项：构造函数实际是一个函数，this 指向的构造函数创建的实例对象。

```js
function myNew(fn, ...args) {
  // 创建一个空对象
  let obj = {}
  // 使空对象的隐式原型指向原函数的显式原型
  obj.proto = fn.prototype
  // this 指向 obj
  let result = fn.apply(obj, args)
  // 返回
  return result instanceof Object ? result : obj
}

function Animal(name, age) {
  ;((this.name = name), (this.age = age))
}
let a = myNew(Animal, 'dag', 18)
console.log(a)
```

（1）首先创建了一个新的空对象
（2）设置原型，将对象的原型设置为函数的 prototype 对象。
（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
function myNew(fn, ...args) {
  // 判断参数是否是一个函数
  if (typeof fn !== 'function') {
    return console.error('type error')
  }
  // 创建一个对象，并将对象的原型绑定到构造函数的原型上
  const obj = Object.create(fn.prototype)
  const value = fn.apply(obj, args) // 调用构造函数，并且this绑定到obj上
  // 如果构造函数有返回值，并且返回的是对象，就返回value ;否则返回obj
  return value instanceof Object ? value : obj
}
```

## 构造函数内 super 函数的作用？

在 ES6 实现继承中会有 constructor 构造函数，而实现继承的子类构造函数中必须先调用 super()方法，此处的 super()为父类的构造方法，而如果不调用，浏览器则会报错。报错原因是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工,而 super
就代表了父类的构造函数。super 虽然代表了父类 Person 的构造函数，但是返回的是子类 Son 的实例，即 super 内部的 this 指的是 Son。

## call apply bind 的区别？

1. apply:语法：fun.apply(thisArg, [argsArray])
2. 作用：改变 this 的指向，第一个参数是需要指向的 this 对象（函数），如果传递的是 null 和 undefined 会指向全局。同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。第二个参数是数组或者类数组对象，会将该值一次传递给第一个参数。

```js
// 场景一： 使用 apply 将一个数组中的元素添加到另一个数组中
let arr1 = [1, 2, 3, 4, 5]
let arr2 = [7, 8, 9]
let T = arr1.push.apply(arr1, arr2)

// 场景二：找出数组中的最大最小值。
let arr1 = [1, 2, 3, 4, 5]
let min = Math.min.apply(null, arr1) // 1
let max = Math.max.apply(null, arr1) // 5
```

1. call:语法：call(thisArg, arg1, arg2, argN)
2. 作用：作用基本和 apply 相同，不同的是传递的第二个参数或者后面的 n 个参数会以列表的形式依次传递给 call，而 apply 是数组的形式传递。

```js
// 场景继承一个构造函数的方法：
function Animal(name, age) {
  ;((this.name = name), (this.age = age))
}
function Cat(name, age) {
  Animal.call(this, name, age)
}
let cat = new Cat('Tom', 2)
console.log(cat.name) // Tom
```

1. bind:语法：bind(thisArg, arg1, arg2, argN)()
2. 作用：作用基本和 call 相同,不同的 bind 会重新创建一个函数，需要再次调用才会执行

```js
var a = {
  name: 'Cherry',
  fn: function (a, b) {
    console.log(a + b)
  },
}
var b = a.fn
b.bind(a, 1, 2)()
```
