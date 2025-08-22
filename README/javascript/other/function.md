# 目录

- [构造函数？new 方法的实现？](##1)
- [构造函数内 super 函数的作用？](##)
- [call apply bind 的区别？](##)

变量提升是什么？与函数提升有什么区别？

## 构造函数？new 方法的实现? {##1}

构造函数介绍

```js
function F() {
  this.name = '张三'
  console.log(this) /// 指向实例对象
}

var f = new F()
console.log(f.name) //张三

function Animal(name, age) {
  ;(this.name = name), (this.age = age)
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
  ;(this.name = name), (this.age = age)
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

## 构造函数内 super 函数的作用？{##2}

在 ES6 实现继承中会有 constructor 构造函数，而实现继承的子类构造函数中必须先调用 super()方法，此处的 super()为父类的构造方法，而如果不调用，浏览器则会报错。报错原因是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工,而 super
就代表了父类的构造函数。super 虽然代表了父类 Person 的构造函数，但是返回的是子类 Son 的实例，即 super 内部的 this 指的是 Son。

## call apply bind 的区别？ {##2}

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
  ;(this.name = name), (this.age = age)
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
  }
}
var b = a.fn
b.bind(a, 1, 2)()
```
