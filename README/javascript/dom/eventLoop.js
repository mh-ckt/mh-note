//-------------------------js的事件循环机制？**-----------------------
// var p = new Promise((resolve) => {
//   console.log(4)
//   resolve(5)
// })
// function fun1() {
//   console.log(1)
// }
// function fun2() {
//   setTimeout(() => {
//     console.log(2)
//   })
//   fun1()
//   console.log(3)
//   p.then((res) => {
//     console.log(res)
//   })
//     .then(() => {
//       console.log(6)
//     })
//     .then(() => {
//       console.log(7)
//     })
// }
// fun2()

//  宏任务和微任务都是怎样执行的？
// 1.执行宏任务script，
// 2.进入script后，所有的同步任务主线程执行
// 3.所有宏任务放入宏任务执行队列
// 4.所有微任务放入微任务执行队列
// 5.先清空微任务队列，
// 6.再取一个宏任务，执行，再清空微任务队列
// 7.依次循环

// ----------------    案例一   **--------------------
// setTimeout(function () {
//   console.log('1')
// })
// new Promise(function (resolve) {
//   console.log('2')
//   resolve()
// }).then(function () {
//   console.log('3')
// })
// console.log('4')
// new Promise(function (resolve) {
//   console.log('5')
//   resolve()
// }).then(function () {
//   console.log('6')
// })
// setTimeout(function () {
//   console.log('7')
// })
// function bar() {
//   console.log('8')
//   foo()
// }
// function foo() {
//   console.log('9')
// }
// console.log('10')
// bar()
// 解析：
// 1.首先浏览器执行Js代码由上至下顺序，遇到setTimeout，把setTimeout分发到宏任务Event Queue中
// 2.new Promise属于主线程任务直接执行打印2
// 3.Promis下的then方法属于微任务，把then分到微任务 Event Queue中
// 4.console.log(‘4’)属于主线程任务，直接执行打印4
// 5.又遇到new Promise也是直接执行打印5，Promise 下到then分发到微任务Event Queue中
// 6.又遇到setTimouse也是直接分发到宏任务Event Queue中，等待执行
// 7.console.log(‘10’)属于主线程任务直接执行
// 8.遇到bar()函数调用，执行构造函数内到代码，打印8，在bar函数中调用foo函数，执行foo函数到中代码，打印9
// 9.主线程中任务执行完后，就要执行分发到微任务Event Queue中代码，实行先进先出，所以依次打印3，6
// 10.微任务Event Queue中代码执行完，就执行宏任务Event Queue中代码，也是先进先出，依次打印1，7。

// -------------------  案例二  ***--------------
// setTimeout(() => {
//   console.log('1')
//   new Promise(function (resolve) {
//     console.log('2')
//     setTimeout(() => {
//       console.log('3')
//     }, 0)
//     resolve()
//   }).then(function () {
//     console.log('4')
//   })
// }, 0)
// console.log('5')
// setTimeout(() => {
//   console.log('6')
// }, 0)
// new Promise(function (resolve) {
//   console.log('7')
//   resolve()
// })
//   .then(function () {
//     console.log('8')
//   })
//   .catch(function () {
//     console.log('9')
//   })
// console.log('10')

// -------------------  案例三  美团 ***--------------
// async function async1() {
//   console.log(1)
//   await async2()
//   console.log(2)
// }
// async function async2() {
//   console.log(3)
// }
// console.log(4)
// setTimeout(function () {
//   console.log(5)
// }, 0)
// async1()
// new Promise(function (resolve) {
//   console.log(6)
//   resolve()
// }).then(function () {
//   console.log(7)
// })
// console.log(8)

// -------------------  案例三 协创 ***--------------
// setTimeout(() => {
//   console.log(2)
//   Promise.resolve().then(() => {
//     console.log(3)
//   })
// }, 0)
// new Promise(function (resolve) {
//   console.log(4)
//   setTimeout(function () {
//     console.log(5)
//     resolve(6)
//   }, 0)
// }).then((res) => {
//   console.log(7)
//   setTimeout(() => {
//     console.log(res)
//   }, 0)
// })
// console.log(1)
