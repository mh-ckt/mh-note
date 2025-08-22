- [常见的字符串方法？](##1)
- [es6 中字符串新增的方法？](##1)

## 常见的字符串方法？{##1}

lenght: 长度
split: 将字符串转换成数组；
includes: 查找字符串中某一个字符，有返回 true，没有返回 false；
indexOf: 查找字符串中的字符；找到返回下标，找不到返回-1；
slice: 截取字符串中的一段字符；
subString: 截取字符串中一段字符；
trimStart: 去除字符串的开始空格；
trim: 去除字符串的首尾空格；
toLocaleLowerCase: 大写转换成小写，大多数情况下和 toLowerCase 没有区别；
trimEnd:去除字符串中的结束空格；
toLowerCase: 大写转换成小写；
toLocaleUpperCase: 小写转换成大些；
concat: 合并一个字符串；
toUpperCase: 小写转换成大写；
padEnd:同理，拉长；
padStart(number,'str')：从字符的开始位置拉长一个字符串，number 拉长的长度，str，补充的字符；
sharAt:根据下表返回对应的字符；
search:查找一个字符，返回查找的字符下标，没有返回-1,与 indexOf 的区别是支持正则，indexOf 不支持正则表达式；
repeat:重复字符；

```js
let str = ' Hello World '
console.log(str.split()) //[ ' Hello World ' ]
console.log(str.indexOf('W')) // -1
console.log(str.substring(2, 3)) // e
console.log(str.slice(2, 3)) // e
console.log(str.trim()) // Hello World
console.log(str.trimStart()) // Hello World
console.log(str.trimEnd()) // Hello World
console.log(str.toLocaleLowerCase()) // hello world
console.log(str.toLocaleUpperCase()) // HELLO WORLD
console.log(str.includes('W')) // true
console.log(str.length) // 13
console.log(str.charAt(2)) // e
console.log(str.repeat(2)) // Hello World Hello World
console.log(str.search('h')) // -1
console.log(str.concat('jack')) // Hello World jack
console.log(str.toLowerCase()) // hello world
console.log(str.toUpperCase()) // HELLO WORLD
console.log(str.padEnd(20, 'jack')) // Hello World jackjac
console.log(str.padStart(20, 'jack')) // jackjac Hello World
```

## es6 中字符串新增的方法？{##2}

1. 查找字符串中的字符。es+提供了 includes(),startsWith(),endsWith(),indexOf(),search()。

```js
let str = 'hello world'
console.log(str.indexOf('l')) // 2
console.log(str.includes('l')) // true
console.log(str.search('s')) // -1
console.log(str.startsWith('he')) // true
console.log(str.endsWith('rld')) // true
```

2. 将原来的字符串重复。repeat(n),n 表示重复的次数，返回新的字符串。

```js
let str = '123'
console.log(str.repeat(5)) //123123123123123
```

3. 补全字符串的长度。str.padStart(n,'m')，str.padEnd(n,'m'),n 表示返回新的字符串的长度，m 是要补的字符串.

```js
console.log('重要的事情说三遍：'.padEnd(27, ' 我要吃饭！')) // 重要的事情说三遍： 我要吃饭！ 我要吃饭！ 我要吃饭！
console.log('你好'.padStart(5, 'jock')) //joc 你好
```

4、去除字符串中的首尾空格。trim.Start() && trim.End()

```js
// 第一种：使用trim()函数，最简单的方式。
let str = ' hello world '
console.log(str.trimEnd()) // hello world
console.log(str.trimStart()) // hello world

// 第二种：如果是去除其他特定的字符，使用replace函数：例如；
let str = '---Hello, World!---'
str = str.replace(/^\-+|\-+$/g, '') // 去除首尾的'-'字符
console.log(str) // 输出: 'Hello, World!'
```

5、截取字符串中的一段

```js
let str = 'Hello world'
console.log(str.substring(0, 5)) // Hello
console.log(str.substring(-5)) // Hello
console.log(str.slice(0, 5)) // Hello
console.log(str.slice(-5)) // world
```

6. 通过下标返回指定位置的字符

```js
let str = 'Hello world'
console.log(str.charAt(0)) // H
```

7. 英文大小写转换

```js
let str = 'Hello world'
console.log(str.toLocaleLowerCase()) // hello world
console.log(str.toLocaleUpperCase()) // HELLO WORLD
```

8. 将字符串转换成数组

```js
let str = 'Hello world'
console.log(str.split()) // ['Hello world']
```

9. 替换字符中的某些字符

```js
let str = 'Hello world'
console.log(str.replace('l', 'L')) // HeLlo world
console.log(str.replaceAll('l', 'L')) // HeLLo worLd
```

10. 字符串转数字的方法？

第一种：Number()：将字符串转换成数字，如果含有英文返回 NAN。
第二种：parseInt():将字符串转换成整数，如果含有字母只转换字母之前的数字。
第三种：parseFloat():将字符串转换成小数。
第四种：一元加号运算符+：类似于 Number()。

**总结：**
1、查找字符串中的字符。indexOf()、includes()、startsWith()、endsWith()
2、去除字符串中的空格。trim()、trimStart()、trimEnd()
3、截取字符串中的一段。 substr() substring() slice() (他们的区别：如下，substr()已经被弃用,since 中可以传入负数表示从字符串的末尾开始截取)
4、通过下标返回指定位置的字符。 charAt()
5、英文大小写转换。toLocaleLowerCase() toLocaleUpperCase()
6、将字符串转换成数组。 split()
7、替换字符中的某些字符。replace() replaceAll()
