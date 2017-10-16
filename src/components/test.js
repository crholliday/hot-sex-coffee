const utils = require('../utils/iota-utils')
let num = parseInt(0)

let newVal = utils.convertUnits(num, 'i', 'Mi')
console.log(newVal)
