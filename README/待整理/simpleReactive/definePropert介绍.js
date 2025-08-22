const person = {
  age: 18,
  name: '小明'
}

let nowAge = null
Object.defineProperty(person, 'age', {
  // 读取数据的时候会触发getter
  get() {
    console.log(`有人访问了小明信息—————${nowAge}`) // 有人访问了小明信息————————undefined   有人访问了小明信息————————22
    return nowAge
  },

  // 修改数据的时候会触发setter
  set(value) {
    console.log(`小明的信息被修改了，=>${value}`) //  小明的信息被修改了，赶紧去更新视图吧=====22
    nowAge = value
  }
})

console.log(person.age) // undefined
person.age = 22
console.log(person.age) // 22
