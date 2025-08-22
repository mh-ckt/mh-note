import { dealtRequest } from './EruptRequest.js'

// 遍历拿到 url 的集合
function getStack(num) {
  const BASE_URL = 'http://localhost:8000/'
  let stacks = []
  for (let i = 0; i < num; i++) {
    stacks.push(BASE_URL + 'test' + i)
  }
  return stacks
}

let URLS = getStack(100) //请求总接口数

console.log(URLS)
let maxNum = 3 //请求最大并发数

let result = dealtRequest(URLS, maxNum)
