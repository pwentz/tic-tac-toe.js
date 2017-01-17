const assert = require('chai').assert
const sinon = require('sinon')
const Output = require('./../../output')

describe('Output', () => {
  const output = new Output(process.stdout, console.log)

  beforeEach(() => {
    stdoutStub = sinon.stub(output, 'prompt')
  })

  afterEach(() => {
    stdoutStub.restore()
  })

  describe('promptUserForGameType', () => {
    it('asks the user to select a game type', () => {
      output.promptUserForGameType()

      const message = 'Please choose 1 for human vs computer, 2 for human vs human, and 3 for computer vs computer: '
      const expectedResult = stdoutStub.getCall(0).args[0]

      assert.equal(expectedResult, message)
    })
  })

  describe('promptUserForSymbol', () => {
    it('asks the user to select a symbol', () => {
      output.promptUserForSymbol()

      const message = "Please choose which symbol you'd like to represent your player: "
      const expectedResult = stdoutStub.getCall(0).args[0]

      assert.equal(expectedResult, message)
    })
  })

  describe('promptUserForOpponentSymbol', () => {
    it('asks the user to select a symbol to represent the alternate player', () => {
      output.promptUserForOpponentSymbol()

      const message = "Please choose which symbol you'd like to represent your opponent: "
      const expectedResult = stdoutStub.getCall(0).args[0]

      assert.equal(expectedResult, message)
    })
  })

  describe('promptUserForFirstPlayer', () => {
    it('asks the user to select 1 to go first or 2 to go second', () => {
      output.promptUserForFirstPlayer()

      const message = "Please enter 1 to let your player go first, or enter 2 to go second: "
      const expectedResult = stdoutStub.getCall(0).args[0]

      assert.equal(expectedResult, message)
    })
  })

  describe('promptUserForPosition', () => {
    it('prompts the user to enter a number 0-8', () => {
      output.promptUserForPosition()

      const message = "Please enter a number 0-8: "
      const expectedResult = stdoutStub.getCall(0).args[0]

      assert.equal(expectedResult, message)
    })
  })

  describe('renderBoard', () => {
    beforeEach(() => logStub = sinon.stub(output, 'log'))
    afterEach(() => logStub.restore())

    it('logs the board to the console', () => {
      const board = ['g', 'u', ' ',
                     ' ', 'j', 'n',
                     'n', 'l', 'h']

      output.renderBoard(board)

      const message = logStub.getCall(0).args[0]

      assert.includeDeepMembers(message.split(''), board)
    })
  })

  describe('gameOver', () => {
    beforeEach(() => logStub = sinon.stub(output, 'log'))
    afterEach(() => logStub.restore())

    it('logs "Game Over" to the console', () => {
      output.gameOver()

      const message = 'Game Over'
      const expectedResult = logStub.getCall(0).args[0]

      assert.equal(expectedResult, message)
    })
  })
})
