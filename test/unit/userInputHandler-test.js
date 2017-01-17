const assert = require('chai').assert
// library for simulating user stdin
const robot = require('robotjs')
const UserInputHandler = require('./../../userInputHandler')
const BoardManager = require('./../../boardManager')
const inputValidations = require('./../../inputValidations')

describe('UserInputHandler', () => {
  const inputHandler = new UserInputHandler(process.stdin)

  describe('didUserHitEnter', () => {
    context('rawInput contains newline', () => {
      it('returns true', () => {
        const rawInput = 'O\n'
        const result = inputHandler.didUserHitEnter(rawInput)

        assert.isTrue(result)
      })
    })

    context('rawInput does not contain newline', () => {
      it('returns false', () => {
        const rawInput = 'O'
        const result = inputHandler.didUserHitEnter(rawInput)

        assert.isFalse(result)
      })
    })
  })

  describe('isInputInvalid', () => {
    context('input does not violate any rules', () => {
      it('returns true', () => {
        const rules = [inputValidations.mustBeNumber,
                       inputValidations.betweenTwoNums.bind(null, 0, 2)]
        const input = '1'

        const result = inputHandler.isInputValid(rules, input)

        assert.isTrue(result)
      })
    })

    context('input violates any rules', () => {
      it('returns false', () => {
        const rules = [inputValidations.mustNotEqual.bind(null, '1')]
        const input = '1'

        const result = inputHandler.isInputValid(rules, input)

        assert.isFalse(result)
      })
    })
  })

  describe('getInput', () => {
    context('valid user input', () => {
      it('it resolves with the valid input', () => {
        const rules = [inputValidations.noBlanks,
                       inputValidations.mustBeNumber,
                       inputValidations.betweenTwoNums.bind(null, 0, 4)]

        // mock user input into terminal
        robot.typeString('1')
        robot.keyTap('enter')

        return inputHandler.getInput(rules)
         .then(input => {
            assert.equal(input, '1')
         })
      })
    })

    context('invalid user input', () => {
      it('rejects the promise with "Invalid input" warning', () => {
        const rules = [inputValidations.noBlanks,
                       inputValidations.mustBeNumber]

        // mock user input into terminal
        robot.typeString('akdnsa')
        robot.keyTap('enter')

        return inputHandler.getInput(rules)
         .catch(warning => {
           assert.equal(warning, 'Invalid input')
         })
      })
    })
  })
})
