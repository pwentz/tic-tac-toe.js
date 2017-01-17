const BoardComparisons = require('./boardComparisons')

class BoardManager {
  constructor() {
    this.board = [' ', ' ', ' ',
                  ' ', ' ', ' ',
                  ' ', ' ', ' ']

    this.comparisons = new BoardComparisons()
  }

  getPositions(query) {
    const matchingIndices = this.board.reduce((result, position, index) => {
      if (position === query) result.push(index)
        return result
    }, [])

    return matchingIndices
  }

  doPositionsMatch(comparativeIndices, query) {
    const positions = this.getPositions(query)
    const haveMatchingPositions = this.comparisons
                                   .arePositionsAMatch(positions, comparativeIndices)

    return haveMatchingPositions
  }

  addMarker(position, marker) {
    this.board[position] = marker
  }
}

module.exports = BoardManager
