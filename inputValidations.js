module.exports = {
  noBlanks: (input) => {
    return input !== ''
  },

  mustBeNumber: (input) => {
    return !isNaN(input)
  },

  positionIsOpen: (openings, input) => {
    return openings.includes(parseInt(input))
  },

  betweenTwoNums: (min, max, input) => {
    const num = parseInt(input)
    return (min <= num) && (num <= max)
  },

  mustNotEqual: (symbol, input) => {
    return symbol !== input
  },

  singleChar: (input) => {
    return input.length === 1
  }
}
