const assert = require('chai').assert
const ScoreKeeper = require('./../../scoreKeeper')
const BoardManager = require('./../../boardManager')

describe('ScoreKeeper', () => {
  const sk = new ScoreKeeper()
  const boardManager = new BoardManager

  describe('boardFilled', () => {
    context('board has open spaces available', () => {
      it('returns false', () => {

        assert.isFalse(sk.boardFilled(boardManager))
      })
    })

    context('board has no open spaces available', () => {
      it('returns true', () => {
        boardManager.board = ['X', 'X', 'O',
                              'A', 'B', 'C',
                              'E', 'F', 'G']

        assert.isTrue(sk.boardFilled(boardManager))
      })
    })
  })

  describe('hasWinner', () => {
    context('three in a row horizontally', () => {
      context('top row', () => {
        it('returns true', () => {
          boardManager.board = ['X', 'X', 'X',
                                'A', 'J', 'C',
                                'E', 'F', 'X']

          assert.isTrue(sk.hasWinner(boardManager, 'X'))
        })
      })

      context('middle row', () => {
        it('returns true', () => {
          boardManager.board = ['A', 'J', 'C',
                                'X', 'X', 'X',
                                'E', 'F', 'X']

          assert.isTrue(sk.hasWinner(boardManager, 'X'))
        })
      })

      context('bottom row', () => {
        it('returns true', () => {
          boardManager.board = ['A', 'J', 'C',
                                'E', 'F', 'O',
                                'X', 'X', 'X']

          assert.isTrue(sk.hasWinner(boardManager, 'X'))
        })
      })
    })

    context('three in a row vertically', () => {
      context('left column', () => {
        it('returns true', () => {
          boardManager.board = ['X', 'J', 'C',
                                'X', 'F', 'O',
                                'X', 'L', 'G']

          assert.isTrue(sk.hasWinner(boardManager, 'X'))
        })
      })

      context('middle column', () => {
        it('returns true', () => {
          boardManager.board = ['J', 'X', 'C',
                                'F', 'X', 'O',
                                'L', 'X', 'G']

          assert.isTrue(sk.hasWinner(boardManager, 'X'))
        })
      })

      context('right column', () => {
        it('returns true', () => {
          boardManager.board = ['C', 'J', 'X',
                                'O', 'F', 'X',
                                'G', 'L', 'X']

          assert.isTrue(sk.hasWinner(boardManager, 'X'))
        })
      })
    })

    context('three in a row diagonally', () => {
      context('top-left to bottom-right', () => {
        it('returns true', () => {
          boardManager.board = ['X', 'J', 'L',
                                'O', 'X', 'O',
                                'G', 'L', 'X']

          assert.isTrue(sk.hasWinner(boardManager, 'X'))
        })
      })

      context('top-right to bottom-left', () => {
        it('returns true', () => {
          boardManager.board = ['C', 'J', 'X',
                                'O', 'X', 'O',
                                'X', 'L', 'L']

          assert.isTrue(sk.hasWinner(boardManager, 'X'))
        })
      })
    })
  })

  describe('isGameOver', () => {
    context('there is a winner', () => {
      it('returns true', () => {
        boardManager.board = ['O', 'O', 'O',
                              ' ', ' ', ' ',
                              ' ', ' ', ' ']

        assert.isTrue(sk.isGameOver(boardManager, 'O'))
      })
    })

    context('the board is full', () => {
      it('returns true', () => {
        boardManager.board = ['X', 'O', 'M',
                              'F', 'Z', 'O',
                              'N', 'S', 'Y']

        assert.isTrue(sk.isGameOver(boardManager, 'O'))
      })
    })

    context('the board is not full and there is no winner', () => {
      it('returns false', () => {
        boardManager.board = [' ', ' ', ' ',
                              ' ', ' ', ' ',
                              ' ', ' ', ' ' ]

        assert.isFalse(sk.isGameOver(boardManager, 'O'))
      })
    })
  })
})
