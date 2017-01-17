const assert = require('chai').assert
const inputValidations = require('./../../inputValidations')

describe('inputValidations', () => {
  describe('noBlanks', () => {
    context('input is empty string', () => {
      it('returns false', () => {
        const input = ''

        assert.isFalse(inputValidations.noBlanks(input))
      })
    })

    context('input is not an empty string', () => {
      it('returns true', () => {
        const input = 'n'

        assert.isTrue(inputValidations.noBlanks(input))
      })
    })
  })

  describe('mustBeNumber', () => {
    context('input is not a number', () => {
      it('returns false', () => {
        const input = 'm'

        assert.isFalse(inputValidations.mustBeNumber(input))
      })
    })

    context('input is a number', () => {
      it('returns true', () => {
        const input = '3'

        assert.isTrue(inputValidations.mustBeNumber(input))
      })
    })
  })

  describe('positionIsOpen', () => {
    context('"openings" does not contain position', () => {
      it('returns false', () => {
        const openings = [0, 3, 8]
        const input = '4'

        const result = inputValidations.positionIsOpen(openings, input)

        assert.isFalse(result)
      })
    })

    context('"openings" does contain position', () => {
      it('returns true', () => {
        const openings = [0, 3, 8]
        const input = '0'

        const result = inputValidations.positionIsOpen(openings, input)

        assert.isTrue(result)
      })
    })
  })

  describe('betweenTwoNums', () => {
    context('input is exclusively between two numbers', () => {
      it('returns true', () => {
        const min = 0
        const max = 3
        const input = '3'

        const result = inputValidations.betweenTwoNums(min, max, input)

        assert.isTrue(result)
      })
    })

    context('input is not between two nums', () => {
      it('returns false', () => {
        const min = 0
        const max = 3
        const input = '4'

        const result = inputValidations.betweenTwoNums(min, max, input)

        assert.isFalse(result)
      })
    })
  })

  describe('mustNotEqual', () => {
    context('input is equal to argument', () => {
      it('returns false', () => {
        const arg = 'o'
        const input = 'o'

        const result = inputValidations.mustNotEqual(arg, input)

        assert.isFalse(result)
      })
    })

    context('input is not equal to argument', () => {
      it('returns true', () => {
        const arg = 'x'
        const input = 'o'

        const result = inputValidations.mustNotEqual(arg, input)

        assert.isTrue(result)
      })
    })
  })

  describe('singleChar', () => {
    context('input is one char', () => {
      it('returns true', () => {
        const input = 'o'
        const result = inputValidations.singleChar(input)

        assert.isTrue(result)
      })
    })

    context('input is multiple chars', () => {
      it('returns false', () => {
        const input = 'nsdjnksnja'
        const result = inputValidations.singleChar(input)

        assert.isFalse(result)
      })
    })
  })
})
