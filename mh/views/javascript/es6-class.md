# 目录

- [类的介绍？](##1)

## 类的介绍？{##1}

1、es6 提出类的概念是作为对象的模版，class 作为类的关键字；
2、类本身是一个构造函数，通过 new 关键字实例化，类中有一个 constructor 方法，是原型对象上的方法，constructor 方法中的 this 指向的是实例对象。
3、在类中定义的方法都是定义在类的 prototype 属性上，所以调用类上的方法就是调用原型上的方法。

**类的基础演示**

```js
class Animal {
  constructor(name, color) {
    this.name = name
    this.color = color
    console.log('this', this)
  }
  toString() {
    console.log('toString', this)
  }
}
const cat = new Animal('小猫', '红色')
const dog = new Animal('小狗', '黑色')
console.log('cat', cat)
console.log('dog', dog)
cat.toString()
dog.toString()
```

**向类中添加方法**

```js
class Point {
  constructor(a, b) {
    this.a = a
    this.b = b
  }
}
Object.assign(Point.prototype, {
  toValue() {
    console.log(this.a + this.b)
  }
})
const p = new Point(1, 2)
p.toValue()
```

```js
// 类的属性名，可以采用表达式
const methodName = 1 + 3
class Animal {
  constructor() {}
  [methodName]() {
    console.log('属性名')
  }
}
const a = new Animal()[methodName]()

// class 表达式
let person = new (class {
  constructor(name) {
    this.name = name
  }

  sayName() {
    console.log(this.name)
  }
})('张三')
person.sayName() // "张三"

// 实例属性新写法
// 实例属性除了定义在 constructor()方法里面的 this 上面，也可以定义在类的最顶层。
class Animal {
  bun = '包子'
  eat() {
    console.log(this.bun)
  }
}
const dog = new Animal()
dog.eat()

// 判断一个类是否继承了另一个类
class Animal {}
class dag extends Animal {}
// Object.getPrototypeOf(ColorPoint) === Point
console.log(Object.getPrototypeOf(dag) === Animal) //true

// super 关键字
class A {
  constructor() {
    // console.log(this);
  }
}
class B extends A {
  constructor() {
    console.log(super())
  }
  eat() {
    // console.log(111);
    return 111
  }
}
new B() // B
// 总结： 当 super()当作方法调用的时候，代表父类的构造函数，
// 但是此时返回的是子类的实例，this 指向子类的实例
// super（）相当于执行了 A.prototype.constructor.call(this)。

// class A {
// constructor() {
// this.a = 3 //父类实例属性 this 指向子类的实例对象
// }
// p() {
// //方法放在父类的原型对象 this 指向子类的实例对象
// return 2
// }
// }
// class B extends A {
// constructor() {
// super() //当 super()当作方法调用的时候，代表父类的构造函数，但是此时返回的是子类的实例，this 指向子类的实例
// // 相当于执行了 A.prototype.constructor.call(this)。

// // console.log(this.p()); //2 这里的 this 指向子类的实例对象
// // console.log(super.p()); // 2
// //当 super 当作对象调用的时候 这里的 super 指向父类的原型对象 可以调用父类的原型对象上的方法

// // console.log(super.a); // undifind a 属性是父类实例上属性 所以拿不到
// // console.log(this.a); //3 这里的 this 指向的是子类的实例对象 由于继承关系，可以访问到父类的实例属性
// }
// eat() {
// // console.log(this); //eat 方法放在子类的原型对象上，this 指向子类的实例对象
// // console.log(this.p()); //子类原型对象上的方法可以调用父类原型对象上的方法
// }
// }
// let b = new B()
// b.eat()

// 第二种情况，super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

class A {
  static p() {
    return 2
  }
}
class B extends A {
  constructor() {
    super()
    console.log(super.p()) // 2
    // 相当于 A.prototype.p()
    // console.log(A.p()); // 当开启静态方法的时候 static 2
    // console.log(A.prototype);
  }
}
let b = new B()
```
