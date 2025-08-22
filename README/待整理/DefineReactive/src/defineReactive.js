import observe from "./observe";


// 给对象data的属性key定义监听
export default function defineReactive(data, key, value) {
  if (arguments.length === 2) {
    value = data[key];
  }

  // 子元素要进行observe，形成递归
  let childOb = observe(value)


  Object.defineProperty(data, key, {
    // 可枚举 可以for-in
    enumerable: true,
    // 可被配置，比如可以被delete
    configurable: true,
    // getter
    get() {
      console.log('你正在访问' + key + "上的属性");
      return value
    },
    // setter
    set(newValue) {
      console.log('你试图改变' + key + "上的属性", newValue);
      if (newValue === value) return
      value = newValue
      // 当设置了新值，新值也要被observe
      childOb = observe(newValue)
    }
  })
}
