class ScoreKeeper {
  get endGamePatterns() {
    return (
      [[0, 1, 2], [3, 4, 5], [6, 7, 8],
       [0, 3, 6], [1, 4, 7], [2, 5, 8],
       [0, 4, 8], [2, 4, 6]]
    )
  }

  boardFilled(boardManager) {
    const openPositions = boardManager.getPositions(' ')
    return openPositions.length === 0
  }

  isGameOver(boardManager, currentSymbol) {
    return this.hasWinner(boardManager, currentSymbol) || this.boardFilled(boardManager)
  }

  hasWinner(boardManager, symbol) {
    for( let i = 0 ; i < this.endGamePatterns.length ; i++ ) {

      const isMatching = boardManager.doPositionsMatch(this.endGamePatterns[i], symbol)
      if (isMatching) { return true }
    }
  }
}

module.exports = ScoreKeeper
