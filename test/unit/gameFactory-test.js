const assert = require('chai').assert
const sinon = require('sinon')
const GameFactory = require('./../../gameFactory')
const HumanVsComputerGame = require('./../../games').HvC
const HumanVsHumanGame = require('./../../games').HvH
const ComputerVsComputerGame = require('./../../games').CvC

describe('GameFactory', () => {
  const factory = new GameFactory()

  describe('getGame', () => {
    context('type is "Human vs Computer"', () => {
      const type = 'Human vs Computer'

      it('returns a new HumanVsComputerGame instance', () => {
        const game = factory.getGame(type, {})

        assert.instanceOf(game, HumanVsComputerGame)
      })

      it('passes an options hash to the game', () => {
        const options = {
          symbols: 'symbols',
          players: 'players'
        }

        const game = factory.getGame(type, options)

        assert.equal(game.symbols, options.symbols)
        assert.equal(game.players, options.players)
      })
    })

    context('type is "Human vs Human"', () => {
      const type = 'Human vs Human'

      it('returns a new HumanVsHumanGame instance', () => {
        const game = factory.getGame(type, {})

        assert.instanceOf(game, HumanVsHumanGame)
      })

      it('passes an options hash to the game', () => {
        const options = {
          symbols: 'symbols'
        }

        const game = factory.getGame(type, options)

        assert.equal(game.symbols, options.symbols)
      })
    })

    context('type is "Computer vs Computer"', () => {
      const type = 'Computer vs Computer'

      it('returns a new ComputerVsComputerGame instance', () => {
        const game = factory.getGame(type, {})

        assert.instanceOf(game, ComputerVsComputerGame)
      })

      it('passes an options hash to the game', () => {
        const options = {
          symbols: 'symbols',
          players: 'players'
        }

        const game = factory.getGame(type, options)

        assert.equal(game.symbols, options.symbols)
      })
    })
  })
})
