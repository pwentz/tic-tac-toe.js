const assert = require('chai').assert
const sinon = require('sinon')
const HumanVsComputerGame = require('./../../games').HvC
const inputValidations = require('./../../inputValidations')
const PlayerController = require('./../../playerController')
const SymbolController = require('./../../symbolController')
const UserInputHandler = require('./../../userInputHandler')
const Output = require('./../../output')
const BoardManager = require('./../../boardManager')

describe('HumanVsComputerGame', () => {
  const symbols = new SymbolController()
  symbols.currentSymbol = 'X'
  symbols.selectedSymbol = 'X'
  symbols.secondSelectedSymbol = 'O'

  const players = new PlayerController()

  const options = {
    symbols: symbols,
    players: players
  }

  const game = new HumanVsComputerGame(options,
                                       new Output(process.stdout, console.log),
                                       new BoardManager(),
                                       new UserInputHandler(process.stdin))

  describe('advanceOneTurn', () => {
    context('ai has turn', () => {
      beforeEach(() => {
        doesAiHaveTurnStub = sinon.stub(game.players, 'doesAiHaveTurn').returns(true)
        aiTurnStub = sinon.stub(game, 'advanceAiTurn')
      })

      afterEach(() => {
        doesAiHaveTurnStub.restore()
        aiTurnStub.restore()
      })

      it('runs advanceAiTurn', () => {
        game.advanceOneTurn()

        assert.equal(aiTurnStub.callCount, 1)
      })
    })

    context('user has turn', () => {
      beforeEach(() => {
        doesAiHaveTurnStub = sinon.stub(game.players, 'doesAiHaveTurn').returns(false)
        userTurnStub = sinon.stub(game, 'advanceUserTurn')
      })

      afterEach(() => {
        doesAiHaveTurnStub.restore()
        userTurnStub.restore()
      })

      it('runs advanceUserTurn', () => {
        game.advanceOneTurn()

        assert.equal(userTurnStub.callCount, 1)
      })
    })
  })

  describe('advanceAiTurn', () => {
    beforeEach(() => {
      bestMoveStub = sinon.stub(game.players.ai, 'bestMove').returns(4)
      addMarkerStub = sinon.stub(game.boardManager, 'addMarker')
      symbolSwitchStub = sinon.stub(game.symbols, 'switchSymbols')
    })

    afterEach(() => {
      bestMoveStub.restore()
      addMarkerStub.restore()
      symbolSwitchStub.restore()
    })

    it("passes ai's best move and symbol to boardManager's addMarker fn", () => {
      return game.advanceAiTurn()
       .then(() => {
          assert.equal(addMarkerStub.getCall(0).args[0], 4)
          assert.equal(addMarkerStub.getCall(0).args[1], game.symbols.currentSymbol)
       })
    })

    it('tells the symbolController to switch symbols', () => {
      return game.advanceAiTurn()
       .then(() => {
          assert.equal(symbolSwitchStub.callCount, 1)
       })
    })
  })

  describe('advanceUserTurn', () => {
    const positionRules = [inputValidations.noBlanks,
                           inputValidations.mustBeNumber,
                           inputValidations.positionIsOpen.bind(null, []),
                           inputValidations.betweenTwoNums.bind(null, -1, 9)]

    context('valid input', () => {
      beforeEach(() => {
        inputStub = sinon.stub(game.input, 'getInput').returns(new Promise(resolve => resolve(4)))
        outputStub = sinon.stub(game.output, 'promptUserForPosition')
        addMarkerStub = sinon.stub(game.boardManager, 'addMarker')
        symbolSwitchStub = sinon.stub(game.symbols, 'switchSymbols')
      })

      afterEach(() => {
        inputStub.restore()
        outputStub.restore()
        addMarkerStub.restore()
        symbolSwitchStub.restore()
      })

      it('tells the renderer to promptUserForPosition', () => {
        return game.advanceUserTurn()
         .then(() => {
           assert.equal(outputStub.callCount, 1)
         })
      })

      it("passes the positionRules to inputHandler's getInput", () => {
        return game.advanceUserTurn()
         .then(() => {
           const inputOutcomes = positionRules.map(rule => rule())
           const argOutcomes = inputStub.getCall(0).args[0].map(r => r())

           assert.deepEqual(inputOutcomes, argOutcomes)
         })
      })

      it("passes the input and symbol's currentSymbol to boardManager's addMarker", () => {
        return game.advanceUserTurn()
         .then(() => {
            assert.equal(addMarkerStub.getCall(0).args[0], 4)
            assert.equal(addMarkerStub.getCall(0).args[1], game.symbols.currentSymbol)
         })
      })

      it("tells the symbolController to switchSymbols", () => {
        return game.advanceUserTurn()
         .then(() => {
           assert.equal(symbolSwitchStub.callCount, 1)
         })
      })
    })

    context('invalid input', () => {
      beforeEach(() => {
        inputStub = sinon.stub(game.input, 'getInput').returns(new Promise((resolve, reject) => reject('invalid')))
        outputStub = sinon.stub(game.output, 'log')
      })

      afterEach(() => {
        inputStub.restore()
        outputStub.restore()
      })

      it('outputs the warning', () => {
        return game.advanceUserTurn()
         .then(() => {
           assert.equal(outputStub.getCall(0).args[0], 'invalid')
         })
      })
    })
  })
})
