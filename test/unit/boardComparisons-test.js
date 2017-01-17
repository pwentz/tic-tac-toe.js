const assert = require('chai').assert
const BoardComparisons = require('./../../boardComparisons')

describe('BoardComparisons', () => {
  const bc = new BoardComparisons()

  describe('arePositionsAMatch', () => {
    context('all indices are in matching positions array', () => {
      it('returns true', () => {
        const allMatchingPositions = [2, 4, 6, 7]
        const comparativeIndices = [2, 4]

        const result = bc.arePositionsAMatch(allMatchingPositions,
                                             comparativeIndices)

        assert.isTrue(result)
      })
    })

    context('not all indices are in matching positions array', () => {
      it('returns false', () => {
        const allMatchingPositions = [2, 4, 6, 7]
        const comparativeIndices = [2, 3]

        const result = bc.arePositionsAMatch(allMatchingPositions,
                                             comparativeIndices)

        assert.isFalse(result)
      })
    })
  })
})
