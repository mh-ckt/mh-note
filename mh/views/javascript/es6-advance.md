- [import 和 require 的区别？](##1)
- [import 语句有多少种写法？](##2)

## import 和 require 的区别？{##1}

import 是是 es6 中的新特性，require 的是 node.js 中导入模块的函数，他们都是用于导入模块使用。
import 语句和 import 函数语法是不同的，import 语句是在编译的时候就进行了加载，而 import 函数和 require 函数是在代码执行的时候才进行加载。
import 函数是基于 promise 的异步加载，require 函数是同步加载。
在整个应用程序中，使用 import 和 import() 语句导入的模块都是单例模式，也就是共用同一个模块实例，而使用 require() 导入的模块则会因为复制而产生多个实例。
import 和 import() 语句支持模块的默认导出和命名导出，而 require() 只支持模块的默认导出 (module.exports) 导出。

## import 语句有多少种写法？{##2}

import 和 import()是 es6 新增的语法，用于导入模块，他们的语法有所区别：

常见的 import 语法如下：
// Export 可以是默认导出的也可以是单独到处的
import Export from "module-name";
// export1 是从一个对象中解构出来的
import { export1 } from "module-name";
// 这里指的的是从 module-name 中导入所有的模块内容，通过 name 属性可以拿到模块中所有的导出
import \* as name from "module-name";

常见的 import()语法如下：
// import 函数返回的是一个 promise 对象，可以通过.then 的方式拿到模块中的内容
const home = await import('./home.js')
