const assert = require('chai').assert
const sinon = require('sinon')
const ComputerVsComputerGame = require('./../../games').CvC
const SymbolController = require('./../../symbolController')
const PlayerController = require('./../../playerController')
const BoardManager = require('./../../boardManager')
const AI = require('./../../ai')

describe('ComputerVsComputerGame', () => {
  const symbols = new SymbolController()
  const players = new PlayerController()
  players.currentPlayer = new AI()
  symbols.currentSymbol = 'X'
  symbols.selectedSymbol = 'X'
  symbols.secondSelectedSymbol = 'O'

  const options = {
    symbols: symbols,
    players: players
  }
  const game = new ComputerVsComputerGame(options,
                                          new BoardManager())
  describe('advanceOneTurn', () => {
    beforeEach(() => {
      bestMoveStub = sinon.stub(game.players.currentPlayer, 'bestMove').returns(4)
      addMarkerSpy = sinon.spy(game.boardManager, 'addMarker')
      switchPlayerSpy = sinon.spy(game.players, 'switchPlayers')
      switchSymbolSpy = sinon.spy(game.symbols, 'switchSymbols')
    })

    afterEach(() => {
      bestMoveStub.restore()
      addMarkerSpy.restore()
      switchPlayerSpy.restore()
      switchSymbolSpy.restore()
    })

    it("passes the ai's bestMove and symbol's currentSymbol to board's addMarker", () => {
      const currentSymbol = game.symbols.currentSymbol

      game.advanceOneTurn()

      assert.equal(addMarkerSpy.getCall(0).args[0], 4)
      assert.equal(addMarkerSpy.getCall(0).args[1], currentSymbol)
    })

    it("passes the symbols's currentSymbol to player's switchPlayers", () => {
      const currentSymbol = game.symbols.currentSymbol

      game.advanceOneTurn()

      assert.equal(switchPlayerSpy.getCall(0).args[0], currentSymbol)
    })

    it("calls symbols.switchSymbols()", () => {
      game.advanceOneTurn()

      assert.equal(switchSymbolSpy.callCount, 1)
    })

    it('returns a promise', () => {
      const expectedReturn = game.advanceOneTurn()

      assert.instanceOf(expectedReturn, Promise)
    })
  })

})
