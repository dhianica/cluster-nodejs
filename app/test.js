const positive = [4, 5]
const negative = [1, 2, 3]

const listNegative = [4, 7, 9, 13, 18, 27]

const randomValue = (list) => list[Math.floor(Math.random() * list.length)]

const result = []
let temp = ''
let netral = 0
let sumdata = 0
let item

for (let x = 0; x < 140; x++) {
  for (let y = 0; y < 30; y++) {
    if (listNegative.includes(y)) {
      item = randomValue(negative)
    } else {
      item = randomValue(positive)
    }

    sumdata += item

    if (item === 3) {
      if (netral < 1) {
        temp += `, ${item}`
        // eslint-disable-next-line no-plusplus
        netral++
      } else {
        temp += `, ${item}`
      }
    } else {
      temp += `, ${item}`
    }

    if (y === 14 || y === 29) {
      temp += `, ${sumdata} `
      sumdata = 0
    }
  }
  result.push(temp)
  temp = ''
}

for (let p = 0; p < 140; p++) {
  console.log(`${p + 31}. ${result[p]}`)
}
