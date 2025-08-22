/**
 * @TypeScript 中的类型别名和接口有什么区别？
 */
// 用途不同：type可以用于定义基础数据类型，复杂数据类型，联合类型，元祖等各种类型，interface只用于定义对象类型。

// type primitive = string | number
// let Name: primitive = '张三'
// let Age: primitive = 20

// // 声明合并： 接口支持声明合并，即多次声明同一个接口的时候会合并成同一个声明，这点在项目中当你使用第三方的库需要为其添加额外的属性的时候非常有用，这是type不具备的。
// interface User {
//   name: string
// }
// interface User {
//   age: number
// }
// let person: User = {
//   name: '张三',
//   age: 22
// }

// // 扩展方式不同：interface通过extends进行继承，而type使用交叉类型实现组合。

// interface Animal {
//   name: string
// }
// interface Dog extends Animal {
//   breed: string
// }
// let dog: Dog = {
//   name: '小黑',
//   breed: '土狗'
// }

// type Animal2 = { name: string }
// type Dog2 = Animal2 & { breed: string }

// let do2: Dog2 = {
//   name: '小黑',
//   breed: '土狗'
// }
