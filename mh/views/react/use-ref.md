## useRef 介绍

[官方解释：useRef 是一个 React 钩子，可让你引用渲染不需要的值。](https://react.nodejs.cn/reference/react/useRef)

个人理解：useRef 允许你在组件的整个生命周期内保持一个不需要渲染的值的引用，useRef 返回的是一个可变的 ref 对象。

### 语法

1. initialValue：初始化参数。

2. ref：可以通过给元素设置 ref 属性，并传入 useRef() 返回的 ref 对象。

useRef 是 React 中的一个 Hook，它允许你在函数组件中“记住”任何可变值，类似于在类组件中使用的实例变量。useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传递给 useRef() 的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

```js
const ref = useRef(initialValue)
```

### 用法

#### 1. useRef 存储的变量和常规变量的区别？

```js
const VariateComparison = () => {
  let [num, setNum] = useState(1)
  let ref = useRef(null)
  let variate = null

  const handleChange = () => {
    setNum(a => a + 1)
  }

  useEffect(() => {
    ref.current = num
    // 对于variate的赋值会在每次渲染前丢失
    // variate = num
  }, [num])

  if (num !== 1) {
    console.log('ref.current', ref.current) // 获取的是每次num更新前的值
    console.log('variate', variate) // 获取的始终是全局状态null
  }

  return (
    <div className="box">
      <p>1.useRef存储的变量和常规变量的区别</p>
      <button onClick={handleChange}>更新数字：{num}</button>
    </div>
  )
}
```

useRef 允许你在每次渲染之间存储信息，而常规的变量会在渲染时被重置。所以当点击更新数字的时候，虽然在 num 每次更新的时候都会把 num 的值分别赋值给 ref.current 和变量 variate，但是在重新渲染的时候 ref.current 的值被保存而 variate 的值被重置。

#### 2. 更新 useRef 不会触发重新渲染。

```js
const UpdateRef = () => {
  const num = useRef(1)
  const handleChange = () => {
    num.current = 2
  }

  return (
    <div className="box">
      <p>2.更改useRef不会触发重新渲染</p>
      <button onClick={handleChange}>更新数字：{num.current}</button>
    </div>
  )
}
```

与 useState 不同，更新 useState 会触发重新渲染，而更新 useRef 不会触发重新渲染。

#### 3. 操作 DOM,聚焦文本输入。

使用引用操作 DOM 是一种常见的做法，首先使用 useRef 创建一个引用对象，然后将引用对象作为 ref 传递给你需要操作的 DOM，然后通过引用对象的 current 属性拿到该 DOM 的节点。

```js
const FocusingInput = () => {
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current.focus()
  }
  return (
    <div className="box">
      <p>3.使用useRef操作DOM,聚焦文本输入</p>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </div>
  )
}
```

上面的案例就是通过获取 input 的 DOM 使文本聚焦。

### 故障排查

#### 1.无法获取自定义组件的引用?

当我们尝试获取自定义租价的 ref 时，这时控制台会提示函数组件不能给出 refs，但是可以用 React.forwardRef()。

```js
const CustomComponent = () => {
  const inputRef = useRef(null)

  const handleClick = () => {
    console.log(inputRef.current)
  }
  const MyInput = () => {
    return <input />
  }
  return (
    <div className="box">
      <p>1.无法获取自定义组件的引用</p>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>获取DOM</button>
    </div>
  )
}
```

使用 forwardRef 去包裹一下 ref,并将 ref 传递给自组件的 ref，这个时候就可以获取到子组件的 ref 了。

```js
const CustomComponent = () => {
  const inputRef = useRef(null)

  const handleClick = () => {
    console.log(inputRef.current)
  }

  const MyInput = forwardRef((props, ref) => {
    return <input ref={ref} />
  })

  return (
    <div className="box">
      <p>1.使用forwardRef获取自定义组件的引用</p>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>获取DOM</button>
    </div>
  )
}
```

### 注意事项

1. useRef 不会在组件之间共享数据。如果你需要在组件之间共享数据，请考虑使用 React Context 或 Redux 等状态管理库。

2. useRef 返回的 ref 对象在组件的整个生命周期内保持不变，这意味着你可以安全地在多个渲染之间访问 .current 属性，而无需担心它会被重新创建。

3. 更改 .current 属性的值不会引起组件的重新渲染。如果你需要基于某些值的更改来重新渲染组件，请考虑使用 useState 或 useReducer。
