<script>

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
  this.name = name
  this.age = age
}
let a = myNew(Animal, 'dag', 18)
console.log(a)

</script>


<template>
  <div>222</div>
</template>