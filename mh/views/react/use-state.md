## useState 介绍

[官方解释：useState 是一个 React 钩子，可让你将 状态变量 添加到组件中。](https://react.nodejs.cn/reference/react/useState)

个人理解：useState 用于函数式组件中声明状态变量，类似于类组件中的 state 对象。同时使用 useState 声明的状态变量可以添加到组件中，同时状态变量也是响应式的。

### 语法

1. initialState 是初始状态。

2. state 是当前状态。

3. setState 是更新函数。

它们是关系是第一次调用 setState （更新函数） 更新 initialState（初始状态），拿到最新的 state（当前状态），再次调用 setState 时，这个时候可以理解为第一次初始状态已经被当前的状态替换，所以后面每一次更新都是替换上一次的状态。

```js
const [state, setState] = useState(initialState)
```

### 用法

#### 1. 向组件中添加状态，并根据之前的状态改变状态。（在 set 函数中有两种方式更新状态）

第一种：直接传递下一个状态。

```js
const [age, setAge] = useState(10)
const handleClick = () => {
  setAge(11)
}
// 或者
// const handleClick = () => {
// 	setAge(age + 1)
// }
return <button onClick={handleClick}>改变状态{age}</button>
```

注意事项：在 set 函数被调用后，并不能立即获取新的状态值，这是由于 set 函数仅更新下一次渲染的状态变量。

```js
const [age, setAge] = useState(10)

const handleClick = () => {
  setAge(age + 1)
  console.log(age) // 10
}
```

如果你想获取更新后的状态，可以添加 useEffect 副作用函数。

```js
const [age, setAge] = useState(10)

useEffect(() => {
  console.log(age) // 11
}, [age])

const handleClick = () => {
  setAge(age + 1)
  console.log(age) // 10
}
```

第二种：传递更新函数。

```js
const [age, setAge] = useState(10)

const handleClick = () => {
  setAge(val => val + 1) //  setAge(10 => 11)
}
```

区别：通过上面的注意事项，我们知道 set 函数后并不会获取最新最新的状态变量，所以我们可以大胆的猜测，在一个点击事件中多次调用 set 并不会更新 set 的值。例如：

```js
const [age, setAge] = useState(10)

const handleClick = () => {
  setAge(age + 1) // setAge(10 + 1)
  console.log(age) // 10
  setAge(age + 1) // setAge(10 + 1)
  setAge(age + 1) // setAge(10 + 1)
}
```

这是由于 set 函数的执行是异步的，而每次 set 时，当前的状态仍然是并没有改变。如果我们希望下一次的 set 会根据上一次 set 的结果进行 set，那么不妨尝试使用更新函数的方式。

```jsx
const AddState = () => {
  const [age, setAge] = useState(10)

  const handleClick = () => {
    // 直接变更状态
    // setAge(age + 1)
    // setAge(age + 1)
    // setAge(age + 1)

    // 传递一个更新函数
    setAge(val => val + 1)
    setAge(val => val + 1)
    setAge(val => val + 1)
  }
  return (
    <div className="box">
      <p>1、向组件中添加状态,并根据之前的状态改变状态</p>
      <button onClick={handleClick}>age: {age} </button>
    </div>
  )
}
```

为什么传递一个更新函数，会根据上一次的 set 结果去计算下一次的 set 值呢？

答案：react 会将传递的更新函数放入一个队列中，并在下一次渲染期间依次调用它们，当依次调用的时候会将上一次更新函数的状态挂起，从而计算出下一个状态，并返回下一个状态值。当队列中的更新函数更新完成后，react 会将最后一次更新函数返回的结果作为当前的状态。

#### 2. 更新状态中的对象和数组。

解释：在 react 中状态允许是对象的形式，同时状态又是只读的，所以对于状态的变更，必须通过 set 函数进行，如果你直接变更状态，react 并不会监听到变化，这样视图就不会更新。所以当状态是一个对象或者数组的时候，调用 set 函数去替换原来的状态，而不是手动的修改状态。

```js
const UpdateObject = () => {
  const [person, setPerson] = useState({
    name: 'zhuangshan',
    age: 20
  })
  const handleClick = () => {
    // 🙅错误做法
    // person.name = 'lishi'

    // 🙆正确做法
    setPerson({
      ...person,
      name: 'lishi'
    })
  }
  return (
    <div className="box">
      <p>2、更新状态中的对象和数组</p>
      <button onClick={handleClick}>
        name: {person.name} == age:{person.age}
      </button>
    </div>
  )
}
```

#### 3. 如何避免重新创建初始化状态。

当我们初始化状态是昂贵的计算时，可以通过传递一个初始化函数去避免每次更新状态都去执行昂贵的计算。

例如初始化的时候需要渲染一个 todolist。

```js
const NotRepeatCreate = () => {
  function createInitialTodos() {
    const initialTodos = []
    for (let i = 0; i < 50; i++) {
      initialTodos.push({
        id: i,
        text: 'Item ' + (i + 1)
      })
    }
    console.log('initialTodos', initialTodos)
    return initialTodos
  }

  // 🙅错误做法
  // const [todos, setTodos] = useState(createInitialTodos())
  const [todos, setTodos] = useState(createInitialTodos)
  const [text, setText] = useState('')

  const addClick = () => {
    setText('')
    setTodos([
      {
        id: todos.length,
        text: text
      },
      ...todos
    ])
  }
  const onChange = e => {
    setText(e.target.value)
  }
  return (
    <div className="box">
      <p>3、如何避免重新创建初始化状态</p>
      <input value={text} onChange={onChange} />
      <button onClick={addClick}>Add</button>
      <ul className="list">
        {todos.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  )
}
```

上面初始化状态时拿到的 createInitialTodos 函数的结果，所以当每一次 todos 的状态改变的时候，createInitialTodos 函数都会重新计算。为了避免这种计算，可以使用初始化函数的方式，让 react 去缓存你的初始状态。

#### 4. 通过键值重置组件状态。

在 react 中当父组件向子组件中传递一个参数的时候，这个参数如果改变，那么子组件就会重新渲染，所以下面的 Input 组件中传递的 key 值改变的时候，Input 输入框中的状态就会变成初始状态，这是由于 react 组件自上而下的更新机制决定的。

```js
const KeyResetComponent = () => {
  function Input() {
    const [value, setValue] = useState('')
    return <input onChange={e => setValue(e.target.value)} value={value} />
  }
  const [key, setKey] = useState(0)
  const handleReset = () => {
    setKey(key + 1)
  }
  return (
    <div className="box">
      <p>4、通过键值重置组件状态</p>
      <button onClick={handleReset}>Reset</button>
      <Input key={key} />
    </div>
  )
}
```

### 故障排查

#### 1. 状态改变，页面没有更新。

例如：当初始状态是一个对象或者数组的时候，尝试在 set 之前对当前状态进行更改，这种做法是无效的，因为 react 会对下一个状态和当一个状态进行比对，采用的 Object.is 的方式，当比对的结果为 true 时 react 会忽略你的更新。

```js
const Malfunction1 = () => {
  const [person, SetPerson] = useState({ name: 'zhaungshan', age: 18 })
  const handleChange = () => {
    // 🙅错误示范
    person.age = 19
    console.log('person', person) // {name: 'zhaungshan', age: 19}
    // 在set之前会进行 Object.is 比对，所以在这里比对的是  Object.is(person,person) 无论对person对象如何修改返回的都true。
    SetPerson(person)
  }

  return (
    <div className="box">
      <button onClick={handleChange}>age:{person.age}</button>
    </div>
  )
}
```

同理，在第二步的更新状态是数组和对象也提到了，状态是只读的，所以对于状态的更新是替换，而不是修改。正确做法如下：

```js
const Malfunction1 = () => {
  const [person, SetPerson] = useState({ name: 'zhaungshan', age: 18 })
  const handleChange = () => {
    // 🙆正确做法
    SetPerson({ ...person, age: 19 })
  }
  return (
    <div className="box">
      <button onClick={handleChange}>age:{person.age}</button>
    </div>
  )
}
```

#### 2. 状态改变，日志记录没有更新?

在之前的 set 用法的介绍中已经说过了，更新 set 函数后并不能立即获取更新后的值，react 会在下一次渲染时获取更新后的值。

```js
const Malfunction2 = () => {
  const [person, SetPerson] = useState({ name: 'zhaungshan', age: 18 })

  const handleChange = () => {
    // 🙅错误示范
    SetPerson({ ...person, age: person.age + 1 })
    console.log(person.age) // 18
  }

  return (
    <div className="box">
      <p>6、故障排查:状态改变，日志记录没有更新?</p>
      <button onClick={handleChange}>age:{person.age}</button>
    </div>
  )
}
```

正确的做法是将需要 set 的的值保存在变量中。

```js
const Malfunction2 = () => {
  const [person, SetPerson] = useState({ name: 'zhaungshan', age: 18 })

  const handleChange = () => {
    // 🙆正确做法
    const Nage = person.age + 1
    SetPerson({ ...person, age: Nage })
  }

  return (
    <div className="box">
      <button onClick={handleChange}>age:{person.age}</button>
    </div>
  )
}
```
