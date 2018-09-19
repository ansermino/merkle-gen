var utils = require('ethereumjs-util')
var BN = utils.BN

const print = (hash, name) => console.log(name + ' new BN(\'' + hash.toString('hex') + "\', 16)")
const hashValue = (val) => utils.keccak256(new BN(val))
const hashAB = (a, b) => {
  return utils.keccak256(a, b)
}

const order = (items) => {
  for(let i = 0; i < items.length; i+=2) {
    if(new BN(items[i+1], 16).lt(new BN(items[i], 16))){
      let tmp = items[i]
      items[i] = items[i + 1]
      items[i+1] = tmp
    }
  }
  return items
}

const generateLeafs = (vals) => {
  let leafs = []
  vals.map((val) => {
    leafs.push(hashValue(val))
  })
  return order(leafs)
}

const generateParents = (children) => {
  let parents = []
  children.map((child, i, arr) => {
    if(i%2 !== 0){}
    else{
      parents.push(hashAB(child, arr[i+1]))
    }
  })
  return order(parents)
}


let a = hashValue(10)
let b = hashValue(11)
let c = hashValue(12)
let d = hashValue(13)
let e = hashValue(14)
let f = hashValue(15)
let g = hashValue(16)
let h = hashValue(17)

let ab = hashAB(a, b)
let cd = hashAB(c, d)
let ef = hashAB(e, f)
let gh = hashAB(g, h)

let abcd = hashAB(ab, cd)
let efgh = hashAB(ef, gh)

let root = hashAB(abcd, efgh)

print(a, 'a')
print(b, 'b')
print(c, 'c')
print(d, 'd')
print(e, 'e')
print(f, 'f')
print(g, 'g')
print(h, 'h')
print(ab, 'ab')
print(cd, 'cd')
print(ef, 'ef')
print(gh, 'gh')
print(abcd, 'abcd')
print(efgh, 'efgh')
print(root, 'root')

console.log('\nFull Path: ')
let path = b + cd + efgh
console.log(`Path: ${path}`)
let pathArr = []
for(let i = 0; i < path.length; i+=2){
  pathArr.push('0x' + path[i] + path[i+1])
}
console.log('[\"' + pathArr.join("\", \"") + '\"]')

console.log('\nSimple Path: ')
path = b
pathArr = []
for(let i = 0; i < path.length; i+=2){
  pathArr.push('0x' + path[i] + path[i+1])
}
console.log('[\"' + pathArr.join("\", \"") + '\"]')