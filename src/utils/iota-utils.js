var unitMap = {
  'i': 1,
  'Ki': 1000,
  'Mi': 1000000,
  'Gi': 1000000000,
  'Ti': 1000000000000,
  'Pi': 1000000000000000  // For the very, very rich
}

/**
*   converts IOTA units
*
*   @method convertUnits
*   @param {string || int || float} value
*   @param {string} fromUnit
*   @param {string} toUnit
*   @returns {integer} converted
**/
var convertUnits = function (value, fromUnit, toUnit) {
    // Check if wrong unit provided
  if (unitMap[fromUnit] === undefined || unitMap[toUnit] === undefined) {
    throw new Error('Invalid unit provided')
  }

  var afterComma = String(value).match(/\.([\d]+)$/)

  if (afterComma && afterComma[1].length > String(unitMap[fromUnit]).length - 1) {
    throw new Error('Too many digits after comma')
  }

    // If not valid value, throw error
  if (isNaN(value)) {
    throw new Error('Invalid value')
  }

  var floatValue = parseFloat(value)

  var converted = (floatValue * unitMap[fromUnit]) / unitMap[toUnit]

  return converted
}

module.exports = {
  convertUnits: convertUnits
}
