# 目录

- [谈谈你对 promise 的理解？](##1)
- [any 方法 && race 方法的区别？](##2)
- [promsie 如何解决回调地狱？](##3)
- [promsie.all 和 promise.allSettled 的区别？](##4)
- [关于 promise.all 中传入多个 promsie 的执行顺序？](##5)
- [promsie.all 的实现？](##6)
- [使用 promise 封装 ajax？](##7)
- [async 和 await 的介绍？](##8)
- [promise 和 async、await 的区别？](##9)
- [promise 的工作原理？及如何实现一个 promise 对象？](##10)
- [使用函数实现 promise 的封装和 promise.then()的封装？](##11)
- [使用 class 实现 promise 的封装和 promise.then()的封装？](##12)

## 谈谈你对 promise 的理解？{##1}

1. promise 是异步编程的解决方案，promise 的出现解决了回调地狱的问题，promise 本身是一个构造函数，promise 的状态有三种，分别是进行中，已成功和已失败，状态之间的改变只能是从进行中到已成功或者已失败，状态的改变就不能再变。

2. promise 提供了很多的方法，比如原型上的 then 方法，then 方法中返回两个回调函数，分别是 promise 状态从进行中到成功的的返回值和 promise 状态从进行中到失败的的返回值。同时 catch 方法是用于捕获 promise 状态失败时的返回值，finally 方法中的回调函数用于无论失败还是成功都会调用。

3. promise 的本身也提供了很多的方法，比如 reject 方法，返回一个失败的 promise，relove 方法返回一个成功的 promise，all 方法中可以接受多个 promise 组成的数组，如果都是成功的，则返回全部，如果有一个失败，则返回失败的 promise。allSettled 方法和 all 方法有些像，也是返回多个 promise 组成的数组，不同的是即使有失败的 promise 状态也会返回全部的 promise 状态。还有 rece 方法返回的执行最快的那个 promise 对象。any 方法返回的最先执行成功的 promise 对象，如果都没有成功，返回的最先执行完的失败的 promise 对象。

ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例,里面保存着某个未来才会结束的事件。
Promise 是异步编程的一种解决方案，比传统的异步解决方案【回调函数】和【事件】更合理、更强大。
promise 对象里面接收一个函数作为参数，该函数的两个参数分别是 reject 和 resolve，reject 和 resolve 是 js 引擎提供的两个方法。
reject 的作用是将 promise 对象的状态从‘未完成’变为‘失败’，在异步操作失败时调用，并将异步操作报错作为参数传递出去。
resolve 的作用是当 promise 对象状态从“未完成”变为“成功”时调用，并将异步操作的结果作为参数传递出去。
promise 对象上方法：
Promise.resolve()方法（快速返回一个成功 promise 对象）
Promise.reject()方法（快速返回一个失败的 promise 对象）
Promise.all()方法（参数是数组，可以是多个 promise 对象，都是成功返回成功，值是成功 promise 组成的数组，有一个失败返回失败，值是失败的 promise）
Promise.race()方法（返回最先执行的 promise）
Promise.prototype.then()方法（接收两个回调函数）
Promise.prototype.catch()方法（接受一个回调函数）
Promise.prototype.finally()方法（不依赖 Prominse 执行结果，最后执行）

**promise 的状态一旦改变不会再变？**

```js
let p = new Promise((resolve, reject) => {
  resolve('200')
  setTimeout(() => {
    reject('500')
  }, 500)
})
p.then(
  res => {
    console.log('res', res)
  },
  err => {
    console.log('err', err)
  }
)
```

## any 方法 && race 方法的区别？{##2}

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('成功了 1')
    reject('失败了 1')
  }, 500)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('失败了')
  }, 200)
})

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('成功了 2')
    reject('失败了 2')
  }, 300)
})

Promise.race([p1, p2, p3]).then(
  res => {
    console.log('race-res', res)
  },
  err => {
    console.log('race-err', err)
  }
)

Promise.any([p1, p2, p3]).then(
  res => {
    console.log('any-res', res)
  },
  err => {
    console.log('any-err', err)
  }
)
```

## promsie 如何解决回调地狱？ {##3}

```js
// 1、解释回调地狱：指的是在编写异步编程的过程中，回调函数嵌套越来越深，导致代码的可读性和维护性极差的现象。
// 2、解决：promsie 通过链式调用，和错误处理里解决异步编程中嵌套过深的问题。

setTimeout(() => {
  console.log('起床了')
  setTimeout(() => {
    console.log('刷牙了')
    setTimeout(() => {
      console.log('吃饭了')
    }, 1000)
  }, 1000)
}, 1000)

// 使用 promsie.then()方法解决回调地狱问题
let toDoing = val => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(val)
    }, 1000)
  })
}

toDoing('起床了')
  .then(res => {
    console.log(res)
    return toDoing('刷牙了')
  })
  .then(res => {
    console.log(res)
    return toDoing('吃饭了')
  })
  .then(res => {
    console.log(res)
  })
// 使用 await 方法解决回调地狱问题

let toDoing = val => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(val)
      console.log(val)
    }, 1000)
  })
}

let fn = async () => {
  await toDoing('起床了')
  await toDoing('刷牙了')
  await toDoing('吃饭了')
}
fn()
```

## promsie.all 和 promise.allSettled 的区别？ {##4}

1、promsie.all 和 promsie.allSettled 都是可以接受多个 promsie，返回一个 promise 数组。
2、all 当遇到失败的 promsie 则会返回那个失败的 promise，allSettled 无论数组中是失败还是成功都会返回。

## 关于 promise.all 中传入多个 promsie 的执行顺序？{##5}

```js
let a = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 4000)
})
let b = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2)
  }, 2000)
})
console.log('b', b)

console.time()
let P = Promise.all([a, b]).finally(() => {
  console.timeEnd() // default: 4002.10498046875 ms
})
console.log(P)
```

## promsie.all 的实现？{##6}

```js
// 1、promsie.all 和 promsie.allSettled 都是可以接受多个 promsie，返回一个 promise 数组。
// 2、all 当遇到失败的 promsie 则会返回那个失败的 promise，allSettled 无论数组中是失败还是成功都会返回。

Promise.myAll = function (values) {
  let P = new Promise((resolve, reject) => {
    resolve(values)
  })
  // // 因为 values 可能不是数组，可能是迭代器，所以不能使用 length 判断当前传入的是不是空的
  let index = 0
  let resluts = [] // 存放返回的结果
  for (let i of values) {
    resluts[i] = Promise.resolve(i)
    index++
  }
  if (!index) {
    return P
  }
  for (let j of resluts) {
    try {
      // console.log(await resluts);
    } catch (error) {}
  }
  return P
}

console.log(Promise.myAll([1, 2, 3]))
```

## 使用 promise 封装 ajax？{##7}

```js
// 1、xmlHttpRequest 是 ajax 的核心。
// 2、readyState 属性，当 xmlHttpRequest 对象被创建后，readyState 属性标志当前对象的状态。

function caseXml(url) {
  const p = new Promise((resolve, reject) => {
    // 1.引入 xml
    const xml = new XMLHttpRequest()
    console.log(xml)
    xml.responseType = 'json' //指定返回的结果类型
    // 2.指定请求方式，请求地址 是否异步
    xml.open('POST', url)
    // 3.发送请求
    xml.send()
    // 4.处理返回的结果
    xml.onreadystatechange = function () {
      if (xml.readyState === 4) {
        if (xml.status >= 200 && xml.status < 300) {
          resolve(xml.response)
        } else {
          reject(xml.status)
        }
      }
    }
  })
  return p
}
caseXml('https://www.fastmock.site/mock/c49f0f85fc61eb33e3f5709421b48465/hello/home').then(
  res => {
    console.log(res)
  },
  err => {
    // console.log(err);
  }
)
```

## async 和 await 的介绍？{##8}

1、async 函数返回的是 promise 对象。
2、await 命令后面如果是 promise 对象返回的值是 promise 的执行结果，如果是普通值返回的是普通值。
3、await 不可以单独使用，相当于 Promise.then(),async 可以单独使用，一个 async 函数中可以写多个 await 函数。
4、await 函数后面如果返回的是失败的 promise 对象会阻碍后面的 await 执行。

**await 函数后面如果返回的是失败的 promise 对象会阻碍后面的 await 执行**

```js
;async () => {
  let val1 = await Promise.resolve('hello')
  console.log(val1)
  let val2 = await Promise.reject('err')
  console.log(val2)
  let val3 = await Promise.resolve('world')
  console.log(val3)
}
// 上面的代码不能打印 world，如何可以打印 world

// 方法一：在 reject 函数中，使用 catch 函数
;async () => {
  let val1 = await Promise.resolve('hello')
  console.log(val1)
  let val2 = await Promise.reject('err').catch(err => err)
  console.log(val2)
  let val3 = await Promise.resolve('world')
  console.log(val3)
}

// 方法二：使用 try...catch...函数,虽然可以拿到失败的 promise 对象，但是并不会继续执行下去。
;(async () => {
  try {
    let val1 = await Promise.resolve('hello')
    console.log(val1)
    let val2 = await Promise.reject('err')
    console.log(val2)
    let val3 = await Promise.resolve('world')
    console.log(val3)
  } catch (error) {
    console.log(error)
  }
})()(
  // 方法三：使用 promise.allsettled
  async () => {
    let [obj1, obj2, obj3] = await Promise.allSettled([
      Promise.resolve('hello'),
      Promise.reject('err'),
      Promise.resolve('world')
    ])
    console.log(obj1, obj2, obj3)
  }
)()

// ----------------- case1： 对代码的代码进行改造，要求第一秒打印’hello‘，第二秒打印’world‘ -----------------
let f1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello')
    }, 1000)
  })
}
let f2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('world')
    }, 1000)
  })
}

// 使用 promise 进行改造
f1()
  .then(res => {
    console.log(res)
  })
  .then(() => {
    f2().then(res => {
      console.log(res)
    })
  })(
  // 使用 async && await 进行改造
  async () => {
    let F1 = await f1()
    console.log(F1)
    let F2 = await f2()
    console.log(F2)
  }
)()
```

## promise 和 async、await 的区别？{##9}

区别：
1、promise 是通过链式调用，通过 then 和 catch 方法来拿到异步的结果。async 和 await 是通过 try...catch 的方式捕获异常。书写方面更加美观同时更像同步的写法。特别是处理多个异步的时候更容易理解。

## promise 的工作原理？及如何实现一个 promise 对象？{##10}

工作原理：当创建一个 promsie 的时候它的状态是待定的，也就是 padding，当异步操作完成以后，可以将异步的结果传递给 resolve 方法或者 reject 方法，此时通过.then 或者.catch 方法可以拿到异步操作的结果。
实现步骤：
第一步：由于 promise 本身是一个构造函数，可以简单的创建一个 promsie 类。
第二步：在 promsie 中有三种状态，可以用设置一个状态变量 state，默认是 padding，由于 promsie 的调用会返回一个 promise 实例，实例中包含异步执行的结果，设置一个结果变量 result，默认是 undefined。
第三步：由于 promsie 中接受一个回调函数，同时回调函数中传递两个参数，resolve 和 reject，通过调用 resolve 和 reject 把异步的结果传递出去，这一步可以在构造器中传递一个 callback 函数，同时在构造器中定义 resolve 和 reject 方法，同时在 class 中定另一个方法 changeState 用于改变状态和设置结果，在 resolve 方法和 reject 方法中调用 changState 方法，当用户调用这两个方法的时候会把状态和传递的值传递给 changeState，用于设置状态和结果。

```js
class Mypromise {
  // 设置状态
  #state = 'padding'
  #result = 'undefined'

  constructor(callback) {
    const resolve = res => {
      this.#changeState('fulfilled', res)
    }
    const reject = err => {
      this.#changeState('rejected', err)
    }
    try {
      callback(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  #changeState = (state, result) => {
    //判断当前状态，如果不是 padding 就不执行
    if (this.#state !== 'padding') return
    this.#state = state
    this.#result = result
  }
}
```

第四步：关于 then 方法和 catch 方法的封装。then 方法和 catch 方法以及 finally 方法等都是在 promsie 的构造函数的原型上定义的方法，通过判断当前的 promsie 的状态把对应的结果传递过去。

```js
MyPromise.prototype.then = function (resolveFn, rejectFn) {
  //判断当前的promise状态是否成功
  if (this.PromiseState === 'fulfilled') {
    resolveFn(this.PromiseResult)
  }
  if (this.PromiseState === 'rejected') {
    resolveFn(this.PromiseResult)
  }

  //当promise是异步的时候，此时then方法中并不能拿到promise的值，可以使用callback对象存储下当前的then方法中的回调，当promise状态改变的时候再执行then方法
  if (this.PromiseState === 'pending') {
    this.callback = {
      resolveFn,
      rejectFn
    }
  }
}
```

## 使用函数实现 promise 的封装和 promise.then()的封装？{##11}

1、创建一个 promsie 函数，里面接收一个 callBack 回调函数，在 callBack 函数中返回两个函数。
2、定义两个变量，一个是状态变量，一个是存储的结果。
3、callBack 的第一个函数中判断当前的状态是否改变，如果改变就 return，防止状态再次改变。同时在下面改变状态为成功，同时函数中接受的参数赋值给定义的定义的存储变量。
4、失败的函数同样的道理，这个时候执封装的 promise 可以拿到状态和结果。
5、实现 then 方法，在 promise 函数的原型对象上添加 then 函数，then 函数中接受两个 callBack 函数，一个成功，一个失败，判断状态有没有改变，如果改变就调用相应的函数。
6、解决 promise 异步调用问题，上面的实现中虽然同步调用在 then 方法中可以拿到 promise 的执行结果，但是异步调用时返回的是 undefined，这是因为 then 方法在调用的时候状态仍然是 pending，需要等待状态改变再执行相应的 relove 和 reject 函数，所以在 then 方法中判断一下当前 promise 的状态，如果是 padding 的话用一个对象存储一下 relove 和 reject 函数，当调用完 then 方法后这个时候 relove 和 reject 方法已经存入了对象中，当异步执行完成执行相应的 reject 和 relove 回调时就可以执行相应的 relove 和 reject。
7、实现链式调用，需要在 then 方法中返回 this，同时需要使用数组去存储一下 then 方法中的两个回调函数，这种做的目的是和上面一样，在 then 方法中 return 一个值可以作为下一 then 方法的参数，所以在状态改变的时候 then 方法中的两个函数的值需要赋值给 promise 的值。

```js
function MyPromise(callBack) {
  this.PromiseState = 'pending' // 定义初始化状态
  this.PromiseResult = undefined // 返回的结果
  let _this = this
  callBack(
    function fnRelove(val) {
      if (_this.PromiseState !== 'pending') return //状态改变就不能再变
      _this.PromiseState = 'fulfilled'
      _this.PromiseResult = val
      if (_this.store) {
        _this.store.resolveFn(val)
      }
    },
    function fnRelove(val) {
      if (_this.PromiseState !== 'pending') return //状态改变就不能再变
      _this.PromiseState = 'rejected'
      _this.PromiseResult = val

      if (_this.store) {
        _this.store.resolveFn(val)
      }
    }
  )
}

MyPromise.prototype.then = function (resolveFn, rejectFn) {
  if (this.PromiseState === 'fulfilled') {
    resolveFn(this.PromiseResult)
  }
  if (this.PromiseState === 'rejected') {
    resolveFn(this.PromiseResult)
  }
  if (this.PromiseState === 'pending') {
    this.store = {
      resolveFn,
      rejectFn
    }
  }
}
let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(11)
  }, 1000)
  // resolve(222);
}).then(res => {
  console.log('res', res)
})
```

**基于上面的代码实现 then 方法的链式调用**

```js
function MyPromise(callBack) {
  this.PromiseState = 'pending' // 定义初始化状态
  this.PromiseResult = undefined // 返回的结果
  this.stores = [] // 当需要多次.then 的时候
  let _this = this
  function resolve(val) {
    if (_this.PromiseState !== 'pending') return
    _this.PromiseState = 'fulfilled'
    _this.PromiseResult = val

    if (_this.stores.length) {
      _this.stores.forEach(item => {
        _this.PromiseResult = item.resolveFn(_this.PromiseResult)
      })
    }
  }
  function reject(val) {
    if (_this.PromiseState !== 'pending') return
    _this.PromiseState = 'rejected'
    _this.PromiseResult = val

    if (_this.stores?.length) {
      _this.stores.forEach(item => {
        item.rejectFn(val)
      })
    }
  }
  try {
    callBack(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

MyPromise.prototype.then = function (resolveFn, rejectFn) {
  if (this.PromiseState === 'fulfilled') {
    this.PromiseResult = resolveFn(this.PromiseResult)
  }
  if (this.PromiseState === 'rejected') {
    rejectFn(this.PromiseResult)
  }
  if (this.PromiseState === 'pending') {
    this.stores.push({
      resolveFn,
      rejectFn
    })
  }
  return this
}
let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
  // resolve(2);
})
  .then(res => {
    return res + 1
  })
  .then(res => {
    return res + 1
  })
  .then(res => {
    console.log('res', res)
  })
```

## 使用 class 实现 promise 的封装和 promise.then()的封装？{##12}

1、构造器的实现第一步定义两个私有属性，然后在 contructor 中根据不同的 promise 执行改变状态和结果。
2、

```js
// 构造器的实现
class MyPromise {
  #state = 'pedding'
  #result = 'undefined'

  #changeState = function (state, res) {
    if (this.#state !== 'pedding') return
    this.#state = state
    this.#result = res
  }

  constructor(callback) {
    const resolve = res => {
      this.#changeState('fulfilled', res)
    }
    const reject = res => {
      this.#changeState('rejected', res)
    }
    try {
      callback(resolve, reject)
    } catch (error) {
      console.log(errror)
    }
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve(2)
  resolve(4)
})
console.log(p)

// then 方法的实现和链式调用
class Mypromise {
  // 设置状态
  #state = 'padding'
  #result = 'undefined'
  // 保存当前的状态以及 then 方法中回调
  #depThen = []

  constructor(callback) {
    const resolve = res => {
      this.#changeState('fulfilled', res)
    }
    const reject = err => {
      this.#changeState('rejected', err)
    }
    try {
      callback(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  //在这里调用 then 方法的回调
  #thenRun = () => {
    if (this.#state === 'padding') return //当状态发生改变的时候才会调用 then 方法
    while (this.#depThen.length) {
      const { onSucceed, onFail, resolve, reject } = this.#depThen.shift()
      if (this.#state === 'fulfilled' && typeof onSucceed === 'function') {
        onSucceed(this.#result)
      }
      if (this.#state === 'rejected' && typeof onFail === 'function') {
        onFail(this.#result)
      }
    }
  }

  then = (onSucceed, onFail) => {
    // 返回一个 promsie 对象
    return new Mypromise((resolve, reject) => {
      // 这里收集 then 方法的回调
      this.#depThen.push({
        onSucceed,
        onFail,
        resolve,
        reject
      })
      // 如果是同步的直接执行
      this.#thenRun()
    })
  }

  #changeState = (state, result) => {
    //判断当前状态，如果不是 padding 就不执行
    if (this.#state !== 'padding') return
    this.#state = state
    this.#result = result
    //这里处理异步的情况
    this.#thenRun()
  }
}

const p = new Mypromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
})
p.then(
  res => {
    return res + 1
  },
  err => {
    console.log(err)
  }
).then(
  res => {
    console.log(res)
  },
  err => {
    console.log(err)
  }
)
```
