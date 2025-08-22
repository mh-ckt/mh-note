- [es5 和 es6 继承有什么区别？](##1)
- [ES6 中有那些新特性？](##2)
- [](##3)
- [词法作用域和动态作用域?](##4)
- [ECMAScript 和 javaScript 的关系？ es6 和 es2015 的关系？](##5)
- [常见的解构赋值？](##6)
- [函数默认值？](##7)
- [箭头函数和普通函数的区别?](##8)
- [什么是剩余参数？](##9)
- [什么是函数柯里化？](##10)

## es5 和 es6 继承有什么区别？{##1}

ES5 和 ES6 在继承方面的主要区别在于 ES5 是通过原型链或构造函数机制来实现继承，而 ES6 则是通过 class 和 extends 关键字来实现继承。（具体后续探讨）

说说 var、let、const 之间的区别？

## ES6 中有那些新特性？{##2}

1、let 关键字和 const 关键字。
2、数据类型：symblo 基本数据类型，表示独一无二的值。
3、模版字符串，同时增加了新的方法 includes 等。
4、数组对象的解构赋值。
5、模块的导入和导出：import 和 export。
6、Map 和 Set 数据对象。
7、增加的 Array.from 方法，可以用于将一个可迭代对象转换数组结构，数组的 for...of..循环。
8、对象的方法：Object.is(), Object.keys(), Object.values(), Object.assign(), Object.entries()
9、函数新增了参数默认值、以及剩余参数、箭头函数、扩展运算符等等。
10、promise，class 类等。
11、Reflect 对象与 Proxy 对象

## {##3}

## 词法作用域和动态作用域? {##4}

```js
var a = 2
function f() {
  console.log(a + 10)
}
function n() {
  var a = 3
  f()
}
n()

// 作用域和变量提升let和const
// 代码段1，没有变量声明，因此报错。
// 代码段2，因为存在变量提升，因此打印undefined。
// 代码段3，let声明不能有重复声明，因此报错。

console.log(a)
a = 10
console.log(b)
var b = 20
var c = 30
let c = 40
console.log(c)

var arr = ['第一次输出', '第二次输出', '第三次输出']
for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(arr[i])
  }, i * 2000)
}

for (var i = 0; i < 5; i++) {
  console.log(i) //0 1 2 3 4
}
console.log(i) // 5
// 解释：这是由于js没有块级作用域，对于有块级作用域的语言来讲，初始化定义的变量，只存在于循环体中，
//而此时js循环体已经执行完毕，但是执行的结果任然存储在执行体外部的执行环境中。

for (let t = 0; t < 5; t++) {
  console.log(t) //0 1 2 3 4
}
console.log(t) // i is not defined
// 解释：let是有作用域的，所以在for循环体外得不到i的值。

for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}

for (var i = 0; i < 10; i++) {
  setTimeout(
    i => {
      console.log(i)
    },
    1000,
    i
  )
}

for (var i = 0; i < 10; i++) {
  let _i = i
  setTimeout(() => {
    console.log(_i)
  }, 1000)
}

for (var i = 0; i < 10; i++) {
  ;(i => {
    setTimeout(() => {
      console.log(i)
    }, 1000)
  })(i)
}

for (var i = 0; i < 10; i++) {
  setTimeout(console.log(i), 1000)
}
```

## ECMAScript 和 javaScript 的关系？ es6 和 es2015 的关系？{##5}

1. es 是针对 js 制定的标准及规范，js 技术栈的实现是基于 es 的基础，常见的 es6 就是 es2015 年开始制定的。
2. 《ECMAScript 2015 标准》简称 es2015，是 es6 在 2015 年 6 月发布的了第一个版本，后来在 2016 年又发布了 es2016，2017 年发布了 es2017，因此 ES6 既是一个历史名词，也是一个泛指，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。

## 常见的解构赋值？{##6}

1、数组的解构赋值？ let [a, b] = [1, 2]；let [first, ...surplus] = [1, 2, 3, 4, 5]；
2、对象的解构赋值？ let { a: foo, b: bar } = { a: 1, b: 2 }； let { c, d } = { c: 1, d: 2 }；
3、字符串的解构赋值？let [a, b, c, d, e] = 'hello'； let [frist, ...surplus] = 'world'；let { length } = 'nihao'；
4、数值和布尔的解构赋值？解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。let { toString: s } = 123;let { toString: s } = true;
5、用途？交换两个变量 ===>let a = 1;let b = 2;[a, b] = [b, a];

## 函数默认值？{##7}

1、undefiend 和 null 的区别？(解释：已经指定了默认值，如何实参传递的是 undefined 这不会替换默认值，如果传递的是 null 会替换默认值。)
2、默认值会影响函数的 length 属性。（解释：函数的 length 是根据函数的行参的个数决定的，同时 length 的长度还由函数的默认值中断，当行参中出现参数默认值只计算之前的个数）
3、函数默认值与机构赋值结合。
4、当默认值是表达式的时候。

```js
// 1、undefiend 和 null 的区别？
function fn(a = 1, b = 2) {
  console.log(a, b) // 1 null
}
fn(undefined, null)

// 2、默认值会影响函数的 length 属性
console.log(((a, b, c) => {}).length) // 3
console.log(function (a, b, c = 5) {}.length) // 2
console.log(((a, b = 5, c) => {}).length) // 1

// 3、函数默认值与机构赋值结合。
let fn = ({ a, b = 2 }) => {
  console.log(a, b) // 1,3
}
fn({ a: 1, b: 3 })

// 4、当默认值是表达式的时候。
// 情况一
let num = 1
function fnn() {
  return num++
}
function foo(a = fnn()) {
  console.log(a)
}
foo() //1
foo() //2
foo() //3
foo() //4

// 情况二
function fnn(val) {
  return val + 5
}
function foo(x, y = fnn(x)) {
  console.log(x) // 1
  console.log(y) // 6
}
foo(1, undefined)

// 情况三
function fnn(val) {
  return val + 5
}
function foo(x = fnn(y), y) {
  console.log(y) // Cannot access 'y' before initialization
}
foo(undefined, 1)
```

## 箭头函数和普通函数的区别? {##8}

1.箭头函数的写法 ()=>{} 2.箭头函数不需要写 return 3.箭头函数没有自己的 this，他的 this 是在定义的时候决定的，同时不可以修改（bind，apply,call） 4.箭头函数没有原型，同时不可以使用 new，没有 agruments

```js
//  案例一
let obj = {
  a: function () {
    return () => {
      console.log(this)
    }
  },
  b: function () {
    return function () {
      console.log(this)
    }
  }
}
obj.a()()
obj.b()()

// 案例二
var name = 'John'
let obj = {
  name: 'Colin',
  pop: {
    name: 'Aurello',
    getname: function () {
      return this?.name
    },
    setname: () => this?.name
  }
}
console.log(obj.pop.getname())
console.log(obj.pop.setname())

// 案例三
function Fn() {
  Fn.a = function () {
    console.log(1)
  }
  this.a = function () {
    console.log(2)
  }
}
Fn.a = function () {
  console.log(3)
}
Fn.prototype.a = function () {
  console.log(4)
}
const obj = new Fn()
Fn.a()
obj.a()
Fn.a()
```

## 什么是剩余参数？{##9}

1、解释：剩余参数指的的是获取函数多余的参数，剩余参数必须写在其他参数后面。
2、语法：...变量名
3、思考：当未知函数实参个数的时候如果对函数进行运算，运算的方式根据第一个参数传递的运算符号。请写出 sun 函数？

```js
sum('+', 1, 2, 3) // 6
sum('*', 1, 2, 3, 4) // 24
sum('+', 1, 2, 3, 4, 5) // 15
function sum(symb, ...items) {
  if (symb === '+') {
    return items.reduce((pred, item) => item + pred, 0)
  } else {
    return items.reduce((pred, item) => item * pred, 1)
  }
}
console.log(sum('+', 1, 2, 3)) // 6
console.log(sum('*', 1, 2, 3, 4)) // 24
console.log(sum('+', 1, 2, 3, 4, 5)) // 15
// 1.如果函数参数使用了默认值、解构赋值、或者扩展运算符，函数内部就不能显式设定为严格模式。
function fn(a, b = a) {
  'use strict';
}
const fn = function ({ a, b }) {
  'use strict';
};
const fn = (...a) => {
  'use strict';
};
fn()  //Illegal 'use strict' directive in function with non-simple parameter list

// 2.函数name属性返回函数名，在ES5中返回的是空字符串
function fn() { }
console.log(fn.name);  //fn

//3.ES2019 对函数实例的toString()方法做出了修改。

// toString()方法返回函数代码本身，以前会省略注释和空格。修改后的toString()方法，明确要求返回一模一样的原始代码。
// function /* 111 */ foo() { }
// console.log(foo.toString());// "function /* 111 */ foo () {}"

//4.ES2019 做出了改变，允许catch语句省略参数。
try {
  // ...
} catch {
  // ...
}
```

## 什么是函数柯里化？ {##10}

```js
let sum = (a, b, c, d) => a + b + c + d
console.log(corey(sum)(1)(2)(3)(4)) //10
console.log(corey(sum, 1)(2)(3)(4)) //10
console.log(corey(sum, 1, 2)(3)(4)) //10
console.log(corey(sum, 1)(2, 3)(4)) //10
console.log(corey(sum, 1)(2, 3, 4)) //10
console.log(corey(sum, 1, 2)(3, 4)) //10
console.log(corey(sum, 1, 2, 3)(4)) //10

function corey(fn, ...before) {
  return (...after) => {
    let all = [...before, ...after]
    if (all.length < fn.length) {
      return corey(fn, ...all)
    } else {
      return fn(...all)
    }
  }
}
```
