const person = {
  age: 18,
  name: '小明'
}

function defineReactive(obj, key, nowAge) {
  Object.defineProperty(obj, key, {
    // 读取数据的时候会触发getter
    get() {
      console.log(`有人访问了小明信息—————${nowAge}`) // 有人访问了小明信息—————22   有人访问了小明信息—————80
      return nowAge
    },
    // 修改数据的时候会触发setter
    set(value) {
      console.log(`小明的信息被修改了，赶紧去更新视图吧=====${value}`) //  小明的信息被修改了，赶紧去更新视图吧=====80
      nowAge = value
    }
  })
}

defineReactive(person, 'age', 22)

console.log(person.age) // 22
person.age = 80
console.log(person.age) // 80
