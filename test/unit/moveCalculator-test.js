const assert = require('chai').assert
const MoveCalculator = require('./../../moveCalculator')
const BoardManager = require('./../../boardManager')

describe('MoveCalculator', () => {
  const mc = new MoveCalculator()

  context('getters', () => {
    it('has a winningScenarios getter', () => {
      assert.property(mc, 'winningScenarios')
    })

    it('has a losingScenarios getter', () => {
      assert.property(mc, 'losingScenarios')
    })

  })

  describe('getMove', () => {
    context('playing offense', () => {
      context('with matching board layout', () => {
        it('returns the winning position', () => {
          const boardManager = new BoardManager()
          const mc = new MoveCalculator()

          boardManager.board = [' ', 'X', 'X',
                                ' ', ' ', '.',
                                '.', '.', ' ']

          const winningPosition = mc.getMove(boardManager, 'X', 'winningScenarios')

          assert.equal(winningPosition, 0)
        })
      })

      context('without matching board layout', () => {
        it('returns -1', () => {
          const boardManager = new BoardManager()

          boardManager.board = ['O', ' ', ' ',
                                ' ', ' ', 'O',
                                ' ', ' ', ' ']

          const noPosition = mc.getMove(boardManager, 'O', 'winningScenarios')

          assert.equal(noPosition, -1)
        })
      })
    })

    context('playing defense', () => {
      context('with matching board layout', () => {
        it('returns the intercepting board position', () => {
          const boardManager = new BoardManager()

          boardManager.board = ['X', ' ', ' ',
                                ' ', ' ', ' ',
                                'X', ' ', ' ']

          const interceptingPosition = mc.getMove(boardManager, 'X', 'losingScenarios')

          assert.equal(interceptingPosition, 3)
        })
      })

      context('without matching board layout', () => {
        it('returns -1', () => {
          const boardManager = new BoardManager()

          boardManager.board = [' ', ' ', ' ',
                                'X', ' ', 'O',
                                ' ', 'O', 'X']

          const noPosition = mc.getMove(boardManager, 'X', 'losingScenarios')

          assert.equal(noPosition, -1)
        })
      })

      context('opponent tries forking strategy', () => {
        it('cuts off the opponent before they can fork', () => {
          const boardManager = new BoardManager()

          boardManager.board = ['O', ' ', ' ',
                                ' ', 'X', ' ',
                                ' ', ' ', 'X']

          const interceptingPosition = mc.getMove(boardManager, 'X', 'losingScenarios')

          assert.equal(interceptingPosition, 2)
        })
      })
    })
  })

  describe('getFallbackMove', () => {
    const mc = new MoveCalculator()

    context('middle square is open', () => {
      it('returns the middle position', () => {
        const boardManager = new BoardManager()

        boardManager.board = [' ', ' ', ' ',
                              ' ', ' ', 'X',
                              'X', ' ', ' ']

        const middlePosition = mc.getFallbackMove(boardManager)

        assert.equal(middlePosition, 4)
      })
    })

    context('middle square is taken', () => {
      it('returns any open spaces', () => {
        const boardManager = new BoardManager()

        boardManager.board = ['O', 'X', 'O',
                              'O', 'O', 'X',
                              'X', ' ', 'X']

        const openPosition = mc.getFallbackMove(boardManager)

        assert.equal(openPosition, 7)
      })
    })
  })
})
