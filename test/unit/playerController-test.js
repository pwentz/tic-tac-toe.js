const assert = require('chai').assert
const PlayerController = require('./../../playerController')
const AI = require('./../../ai')

describe('PlayerController', () => {
  context('functions', () => {
    describe('switchPlayers', () => {
      it('changes the currentPlayer to the dormant player', () => {
        const players = new PlayerController()
        const currentSymbol = 'X'
        players.secondPlayer = new AI()

        players.switchPlayers(currentSymbol)

        assert.deepEqual(players.currentPlayer, players.secondPlayer)
      })
    })

    describe('setCurrentPlayer', () => {
      context("argument matches ai property's symbol", () => {
        it('sets the currentPlayer to equal ai', () => {
          const players = new PlayerController()
          const currentSymbol = 'X'
          players.ai.symbol = 'X'

          players.setCurrentPlayer(currentSymbol)

          assert.deepEqual(players.currentPlayer, players.ai)
        })
      })

      context("argument matches secondPlayer property's symbol", () => {
        it('sets the currentPlayer equal to secondPlayer', () => {
          const players = new PlayerController()
          const currentSymbol = 'X'
          players.secondPlayer = new AI()
          players.secondPlayer.symbol = 'X'

          players.setCurrentPlayer(currentSymbol)

          assert.deepEqual(players.currentPlayer, players.secondPlayer)
        })
      })
    })

    describe('addSecondPlayer', () => {
      it('sets the secondPlayer prop to a new instance of AI', () => {
        const players = new PlayerController()

        assert.isNull(players.secondPlayer)

        players.addSecondPlayer()

        assert.instanceOf(players.secondPlayer, AI)
      })
    })
  })
})
