const assert = require('chai').assert
const sinon = require('sinon')
const HumanVsHumanGame = require('./../../games').HvH
const SymbolController = require('./../../symbolController')
const PlayerController = require('./../../playerController')
const BoardManager = require('./../../boardManager')
const UserInputHandler = require('./../../userInputHandler')
const Output = require('./../../output')

describe('HumanVsHumanGame', () => {
  const symbols = new SymbolController()
  symbols.currentSymbol = 'X'
  symbols.selectedSymbol = 'X'
  symbols.secondSelectedSymbol = 'O'

  const options = {
    symbols: symbols
  }

  const game = new HumanVsHumanGame(options,
                                    new Output(process.stdout, console.log),
                                    new BoardManager(),
                                    new UserInputHandler(process.stdin))
  describe('advanceOneTurn', () => {
    context('valid user input', () => {
      beforeEach(() => {
        handlerStub = sinon.stub(game.input, 'getInput').returns(new Promise(( resolve, reject ) => resolve(4)))
        addMarkerSpy = sinon.spy(game.boardManager, 'addMarker')
        switchSymbolsSpy = sinon.spy(game.symbols, 'switchSymbols')
      })

      afterEach(() => {
        handlerStub.restore()
        addMarkerSpy.restore()
        switchSymbolsSpy.restore()
      })

      it('passes the board openings to the inputHandler', () => {
        return game.advanceOneTurn()
         .then(input => {
           assert.equal(addMarkerSpy.getCall(0).args[0], 4)
         })
      })

      it('tells the symbolsController to switchSymbols', () => {
        return game.advanceOneTurn()
         .then(input => {
            assert.equal(switchSymbolsSpy.callCount, 1)
         })
      })
    })

    context('invalid user input', () => {
      beforeEach(() => {
        rejectStub = sinon.stub(game.input, 'getInput').returns(new Promise((resolve, reject) => reject('invalid')))
        outputStub = sinon.stub(game.output, 'log')
      })

      afterEach(() => {
        rejectStub.restore()
        outputStub.restore()
      })

      it('outputs the warning', () => {
        return game.advanceOneTurn()
         .then(input => {
            assert.equal(outputStub.getCall(0).args[0], 'invalid')
         })
      })
    })
  })
})
