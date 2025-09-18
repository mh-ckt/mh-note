<script>
let url = 'https://google.com?id=123&searchKey=word'
// let newUrl = "https://google.com?{'id':'123','searchKey':'word'}

// 创建一个 URL 对象
const urlObj = new URL(url);

// 获取查询参数对象
const params = urlObj.searchParams;
console.log(99999, params.entries());


// 将查询参数转换为 {key: value} 形式的对象
const queryParams = {};
for (const [key, value] of params.entries()) {
  queryParams[key] = value;
}

console.log(queryParams); // { id: '123', searchKey: 'word' }


// let aa = url.split('?')[1].split('&')

// let obj = {}
// let bb = aa.map(item => {
//   obj[item.split('=')[0]] = item.split('=')[1]
// })

// console.log(9999, obj);



// let newUrl = url.split('?')[0]

</script>


<template>
  <div>222</div>
</template>