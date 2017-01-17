const assert = require('chai').assert
const sinon = require('sinon')
const BoardManager = require('./../../boardManager')

describe('BoardManager', () => {
  const boardManager = new BoardManager()

  describe('getPositions', () => {
    it('returns the index of argument within the board', () => {
      boardManager.board = [' ', 'x', ' ',
                            'h', ' ', 'h',
                            'u', 'h', 'x']
      const query = 'x'

      const result = boardManager.getPositions(query)

      assert.deepEqual(result, [1, 8])
    })
  })

  describe('doPositionsMatch', () => {
    it('takes an array of indices and returns boolean whether symbol matches', () => {
      boardManager.board = [' ', 'x', ' ',
                            'h', ' ', 'h',
                            'u', 'h', 'x']

      const indices = [1, 8]
      const query = 'x'

      const result = boardManager.doPositionsMatch(indices, query)

      assert.isTrue(result)
    })
  })

  describe('addMarker', () => {
    it('takes an index and a symbol and sets the board accordingly', () => {
      boardManager.board = [' ', ' ', ' ',
                            ' ', ' ', ' ',
                            ' ', ' ', ' ']
      const position = [2]
      const marker = 'x'

      boardManager.addMarker(position, marker)

      assert.equal(boardManager.board[2], 'x')
    })
  })
})
