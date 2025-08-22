
import observe from "./observe";

const obj = {
  a: {
    m: {
      n: 33
    }
  },
  b: {
    w: 22
  }
}

observe(obj)
console.log(obj.a.m);
console.log(new Array());
// obj.a = 5;
// console.log(obj.a);

