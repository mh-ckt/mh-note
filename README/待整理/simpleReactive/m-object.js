const person = {
  age: 18,
  name: "小明",
  hobby: {
    ball: "篮球",
  },
}

observer(person) // 第一次监听，这里只会监听 person 对象的第一层属性

function observer(data) {
  if (typeof data === "object") {
    for (let key in data) {
      defineReactive(data, key, data[key])
    }
  } else {
    return data
  }
}

function defineReactive(obj, key, nowAge) {
  // 深度监听对象中每一层
  observer(nowAge)

  Object.defineProperty(obj, key, {
    // 读取数据的时候会触发getter
    get() {
      console.log(`有人访问了小明信息————${nowAge}`) // 有人访问了小明信息————[object Object],篮球,[object Object],[object Object],足球
      return nowAge
    },

    // 修改数据的时候会触发setter
    set(value) {
      // observer(value)
      console.log(`小明的信息被修改了，赶紧去更新视图吧=====${value}`) //  小明的信息被修改了，赶紧去更新视图吧=====足球
      nowAge = value
    },
  })
}

person.hobby = {
  reading: "鲁滨逊漂流记",
}
person.hobby.reading = "上下五千年"

// console.log(person.hobby.reading); // 足球

/*
分析：这里的 observer 函数是为了实现对于对象中嵌套的每一层属性都可以实时监听。
*/
