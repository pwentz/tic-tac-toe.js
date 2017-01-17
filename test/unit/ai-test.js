const assert = require('chai').assert
const AI = require('./../../ai.js')
const MoveCalculator = require('./../../moveCalculator')
const BoardManager = require('./../../boardManager')

describe('AI', () => {
  const boardManager = new BoardManager()
  const ai = new AI()

  context('functions', () => {
    describe('bestMove', () => {
      context('offensive move is available', () => {
        it('returns the best offensive option', () => {
          boardManager.board = [' ', 'O', 'O',
                                ' ', ' ', 'X',
                                'X', ' ', 'O']
          ai.symbol = 'O'

          const result = ai.bestMove(boardManager)

          assert.equal(result, 0)
        })
      })

      context('offensive move is not available', () => {
        it('returns the best defensive option', () => {
          boardManager.board = ['X', 'O', 'O',
                                ' ', ' ', 'X',
                                'X', ' ', 'O']

          ai.opposingSymbol = 'X'

          const result = ai.bestMove(boardManager)

          assert.equal(result, 3)
        })
      })

      context('offensive & defensive moves not available', () => {
        context('middle position is open', () => {
          it('returns the middle position', () => {
            boardManager.board = ['X', ' ', 'O',
                                  'O', ' ', 'X',
                                  'X', ' ', 'O']
            ai.symbol = 'O'

            const result = ai.bestMove(boardManager)

            assert.equal(result, 4)
          })
        })

        context('multiple open spaces available', () => {
          it('returns the first open space available', () => {
            boardManager.board = ['X', ' ', 'O',
                                  'O', 'O', 'X',
                                  'X', ' ', 'O']
            ai.symbol = 'O'
            const result = ai.bestMove(boardManager)

            assert.equal(result, 1)
          })
        })
      })
    })
  })
})
