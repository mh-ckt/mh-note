// -----------------------ts中的类型--------------------------
// Resulting type: { name: string; age: number; }

// 安全的any类型   不能将unknown类型的值赋值给任意变量
// let c:unknown
// c = 'hello'
// let e:string
// e = c  //会报错   不能将一个未知的类型赋值给字符串

// 解决方法  1
// if(typeof c ==='string'){
//     e = c  //不会报错
// }

// 解决方法 2  使用类型断言
// e = c as string
// e = <string>c

// never表示永远不会返回结果
// function fn1():never{
//     throw new Error ('报错了')
// }

// ts学习资料
// https://lurongtao.github.io/felixbooks-typescript/

// const a:number = 111  //数值类型
// const b:boolean = true  //布尔类型
// const c:string = 'jj'  //字符串类型
// const d:number[] = [1,2,3]  //数值类型的数组
// const dd:Array<number> = [1,23,3]  //第二种方式是使用数组泛型，Array<元素类型>：

//--------------------数组------------------
// 在Typescript中有两种方式定义数组，分别如下：
// 在元素的后面加上[]
// let a:number[] = [1,2,3,]
// 使用范型
// let b:Array<number>  =  [1,2,3,]

// --------------------元祖------------------
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。
// // 声明一个元组类型 x
// let x: [string, number]
// // 初始化 x
// x = ['hello', 10] // OK
// // 无效的初始值
// x = [10, 'hello'] // Error

// console.log(x[0].substr(1)) // OK
// console.log(x[1].substr(1)) // Error, 'number' 不存在 'substr' 方法

// ------------------枚举---------------------
// 可以将一组数值进行编号，指定每个成员的数值，如果没有编号，默认从0开始
// 案例一
// enum Color { 'Red' = 1, "Green" = 2, "Blue" = 3 }
// const a = Color[2]
// const b = Color.Blue
// console.log(a);  //Green
// console.log(b);  //3

// // 案例二
// enum Color { Red, Green, Blue }
// const c = Color[2]
// const d = Color.Blue
// console.log(c);  //Blue
// console.log(d);  //2

// -----------------------类型断言---------------------
// interface FooType{
//   a: string,
//   b: number,
// }

// const Foo = {} as FooType
// Foo.a = 'a'
// Foo.b = 1

// interface Person {
//   name: string
//   age?: number
//   [propName: string]: any
// }

// let tom: Person = {
//   name: 'Tom',
//   gender: 'male'
// }

// -----------------------any---------------------
// // 表示任意类型
// //当一个变量赋值any类型时 默认编译时关闭了ts的类型检查
// let a:any = 1
// a = '1111'
// a = false
// // 比如，你有一个数组，它包含了不同的类型的数据
// let list: any[] = [1, true, "free"]
// list[1] = undefined

//  -----------------------void---------------------
// // void表示没有任何类型，用在变量上只能赋值undefined  与any相反
// // 常用于函数没有返回值或者返回值是undefined
// function aa ():void{
//   console.log('没有返回值');
// }
// function fn():void{
//   return undefined
// }
// const a:void = undefined
// const b:void = null //不能将类型null分配给类型“void”
// const c:void = 111  //不能将类型“number”分配给类型“void”

//  -----------------------null---------------------

// let x: undefined = undefined;
// let y: null  =  null;

// x = undefined;
// y = undefined

// --------------------------------------------------------函数的类型检测---------------------------------------------------
// 声明式函数
// 指定了参数的类型是数值，且返回值也是数值
// function sum (a:number,b:number):number{
//     return a+b
// }
// sum(1,33)

// 表达式的函数
// 解释：对于函数表达式，实际上只是对函数的右边进行了类型检测，表达式的左边的赋值操作是通过类型推论推断出来的。
// const sum = function (a: number, b: number): number {
//     return a + b
// }
// sum(1, 111)

// 解释：完整的写法如下，在ts中的=>含义是定义函数的类型，左侧是输入类型，需要用（）括起来，右侧是输出类型
// const sum:(a:number,b:number)=>number = function (a: number, b: number): number {
//     return a + b
// }
// sum(1, 111)

// ///用接口定义函数的形状
// interface SearchFunc {
//   (source: string, subString: string): boolean
// }

// let mySearch: SearchFunc
// mySearch = function(source, subString) {
//   return source.search(subString) !== -1
// }

//可选参数
//使用 ? 表示可选的参数
//注意事项：可选参数必须定义在必选参数的后面，可选参数的后面不可以有必选参数。
// function buildName(firstName: string, lastName?: string) {
//   if (lastName) {
//   return firstName + ' ' + lastName
//   } else {
//   return firstName
//   }
// }
// let tomcat = buildName('Tom', 'Cat')
// let tom = buildName('Tom')

// interface Person {
//   name: string
//   age?: number
//   [propName: string]: string
// }

// let tom: Person = {
//   name: 'Tom',
//   age: 25,
//   gender: 'male'
// }
// //类型“number | undefined”的属性“age”不能赋给“string”索引类型“string”。

// interface Person {
//   readonly id: number
//   name: string
//   age?: number
//   [propName: string]: any
// }

// let tom: Person = {
//   id: 89757,
//   name: 'Tom',
//   gender: 'male'
// }

// tom.id = 9527
// 上例中，使用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错了。

// interface Person {
//   readonly id: number
//   name: string
//   age?: number
//   [propName: string]: any
// }

// let tom: Person = {
//   name: 'Tom',
//   gender: 'male'
// }

// tom.id = 89757
// 上例中，报错信息有两处，第一处是在对 tom 进行赋值的时候，没有给 id 赋值。 第二处是在给 tom.id 赋值的时候，由于它是只读属性，所以报错了。

// ---------------------接口----------------------
// 其他解释：在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。 TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
// 解释：接口是对行为的抽象，它可以除了可以对类的一部分行为进行抽象外，还可以对对象的形状进行描述。

// 接口关键字 interface
// 确定属性
// eg:1 基础用法
// interface IPerson {  //定义接口
//     name: string
//     age: number
// }
// const man:IPerson = {
//     name:'222',
//     age:111
// }

// 可选属性
// 解释：在属性的后面添加一个？表示这个属性是可选的
// interface Person {
//     name: string    //确定属性
//     age?: number    //可选属性
//   }

//   let tom: Person = {
//     name: 'Tom'
//   }

// 任意属性
// 解释：
// interface Person {
//     name: string
//     age?: number
//     [propName: string]: any
//   }

//   let tom: Person = {
//     name: 'Tom',
//     gender: 'male'
//   }

// interface Person {
//     name: number
//     age?: number  //类型“number”的属性“age”不能赋给“string”索引类型“string”。
//     [propName: string]: number
//   }

// let tom: Person = {  //不能将类型“{ name: string; age: number; gender: string; }”分配给类型“Person”。
//     name: 2222,
//     age: 25,
//     gender: 222
//   }

// ----------------------------类--------------------------
// 虽然 JavaScript 中有类的概念，但是可能大多数 JavaScript 程序员并不是非常熟悉类，这里对类相关的概念做一个简单的介绍。
// 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
// 对象（Object）：类的实例，通过 new 生成
// 面向对象（OOP）的三大特性：封装、继承、多态
// 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
// 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
// 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
// 存取器（getter & setter）：用以改变属性的读取和赋值行为
// 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
// 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
// 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

// class Animal {
//     public name;
//     constructor(name) {
//         this.name = name;
//     }
//     sayHi() {
//         return `My name is ${this.name}`;
//     }
// }

// let a = new Animal('Jack');
// console.log(a.sayHi()); // My name is Jack

// ts提供了三种修饰符  分别是
// public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
// protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

//   class Animal {
//     public name:string;
//     public constructor(name:string) {
//       this.name = name;
//     }
//   }

//   let a = new Animal('Jack');
//   console.log(a.name); // Jack
//   a.name = 'Tom';
//   console.log(a.name); // Tom

// 在指定了属性或者方法是 private 修xiu饰符
//   class Animal {
//     private name:string;
//     public constructor(name:string) {
//       this.name = name;
//       console.log(name);
//     }
//   }

//   let a = new Animal('Jack');
//   console.log(a.name);  ///属性“name”为私有属性，只能在类“Animal”中访问
//   a.name = 'Tom';
//   console.log(a.name);  //属性“name”为私有属性，只能在类“Animal”中访问。

// 解释：当父类的属性或者方法使用了 private修饰符的时候，他的子类属性或者方法也不可以访问
// class Animal {
//     private name:string;
//     public constructor(name:string) {
//       this.name = name;
//     }
//   }

//   class Cat extends Animal {
//     constructor(name:string) {
//       super(name);
//       console.log(this.name);    //属性“name”为私有属性，只能在类“Animal”中访问
//     }
//   }

// 当使用protected 修饰属性和方法时  在子类中可以访问到
//   class Animal {
//     protected name:string;
//     public constructor(name:string) {
//       this.name = name;
//       console.log(name);
//     }
//   }

//   class Cat extends Animal {
//     constructor(name:string) {
//       super(name);
//       console.log(this.name);
//     }
//   }

//   let Animal1 = new Animal('Tom')
//   let cat1 = new Cat('tom')

// 当构造函数使用private修饰符的时候  该构造函数不允许被实例化或者继承
// class Animal {
//     public name;
//     private constructor(name) {
//       this.name = name;
//     }
//   }
//   class Cat extends Animal {   //无法扩展类“Animal”。类构造函数标记为私有。
//     constructor(name) {
//       super(name);
//     }
//   }

//   let a = new Animal('Jack');

// 参数属性
// class Animal {
//     // public name: string;
//     public constructor(public name) {
//       // this.name = name;
//     }
//   }

// 使用readonly定义属性是只读属性
// class Animal {
//     readonly name;
//     public constructor(name) {
//       this.name = name;
//     }
//   }

//   let a = new Animal('Jack');
//   console.log(a.name); // Jack
//   a.name = 'Tom';  //无法分配到 "name" ，因为它是只读属性

// 解释：abstract是用来定义抽象类和抽象方法
//  抽象类是不允许实例话的
// abstract class Animal {
//     public name;
//     public constructor(name) {
//       this.name = name;
//     }
//     public abstract sayHi();
//   }

//   let a = new Animal('Jack');   //无法创建抽象类的实例。

// 解释：抽象类中抽象方法必须被子类实现
// abstract class Animal {
//     public name;
//     public constructor(name) {
//       this.name = name;
//     }
//     public abstract sayHi();
//   }

//   class Cat extends Animal {
//     public sayHi() {
//       console.log(`Meow, My name is ${this.name}`);
//     }
//   }

//   let cat = new Cat('Tom');

// 存取器
//当我们不想内部的属性被随意修改的时候，可以使用private将属性设置为私有属性，同时可以在类中定义get和set方法来设置私有属性的值，有效的避免了私有属性被随意修改
// class Animal {
//    private name:string
//    private age:number
//     constructor(name:string,age:number){
//         this.name = name,
//         this.age = age
//     }
//     getAge(){
//         return this.age
//     }
//     setAge(age:number){
//         if(age > 0){
//             this.age = age
//         }
//     }
// }

// const cat = new Animal('Tom',18)
// // cat.age = -13
// cat.setAge(-12)
// console.log(cat.getAge());

// 在ts中设置存取器的方式
//使用 getter 和 setter 可以改变属性的赋值和读取行为：
// 存取器ECMAScript 5 和更高版本时可用
// class Animal {
//    private name:string
//    private age:number
//     constructor(name:string,age:number){
//         this.name = name,
//         this.age = age
//     }
//     get ageval(){
//         return this.age
//     }
//     set ageval(age:number){
//         if(age > 0){
//             this.age = age
//         }
//     }
// }

// const cat = new Animal('Tom',18)
// cat.ageval = 13
// console.log(cat.ageval);   //13

// 接口定义函数的形状
// 解释： 使用接口定义一个函数需要的形状
// interface SearchFunc {
//     (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc = function(source: string, subString: string) {
//     return source.search(subString) !== -1;
// }

// 函数的可选参数
// function buildName(firstName: string, lastName?: string) {
//     if (lastName) {
//         return firstName + ' ' + lastName;
//     } else {
//         return firstName;
//     }
// }
// let tomcat = buildName('Tom', 'Cat');
// let tom = buildName('Tom');

// 函数的默认值
// function buildName(firstName: string = 'Tom', lastName: string) {
//     return firstName + ' ' + lastName;
// }
// let tomcat = buildName('Tommmm', 'Cat');
// let cat = buildName(undefined, 'Cat');
// console.log(cat);

// 剩余参数
// function push(array:number[], ...items:number[]) {
//     // console.log(items);
//     items.forEach(function(item) {
//         array.push(item);
//     });
//     return array
// }

// let a: any[] = [];
// push(a, 1, 2, 3)

// 重载
// function reverse(x: number): number;
// function reverse(x: string): string;
// function reverse(x: number | string): number | string | void {
//     if (typeof x === 'number') {
//         return Number(x.toString().split('').reverse().join(''));
//     } else if (typeof x === 'string') {
//         return x.split('').reverse().join('');
//     }
// }
// console.log(reverse('res'));
// console.log(reverse(123));

// 断言
// 解释：可以用来手动指定一个值的类型
// interface Cat {
//     name: string;
//     run(): void;
// }
// interface Fish {
//     name: string;
//     swim(): void;
// }

// function getName(animal: Cat | Fish) {
//     return animal.name;
// }

// interface Cat {
//     name: string;
//     run(): void;
// }
// interface Fish {
//     name: string;
//     swim(): void;
// }

// function swim(animal: Cat | Fish) {
//     (animal as Fish).swim();
// }

// const tom: Cat = {
//     name: 'Tom',
//     run() { console.log('run') }
// };
// swim(tom);

// window.foo = 1;
// (window as any).foo = 1;

// 类型别名
// type Name = string;
// type NameResolver = () => string;
// type NameOrResolver = Name | NameResolver;
// function getName(n: NameOrResolver): Name {
//     if (typeof n === 'string') {
//         return n;
//     } else {
//         return n();
//     }
// }
// console.log(getName(()=>"2222"));

// 枚举
// 解释：枚举取值用于取值在一定范围内的
// 如果枚举项没有进行赋值 枚举值默认从0开始每次递增1   并且可以进行反向映射
// enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}
// console.log(Days["Sun"]); // 0
// console.log(Days[0]);  //sun

// enum Color {Red = "2", Green="4", Blue='6'};
// console.log(Color[0]);
// console.log(Color['Blue']);

// ----------------------never-----------------
// function fail() {
//     return error("Something failed")
//   }

// function error(message: string): never {
//     throw new Error(message)
//   }
