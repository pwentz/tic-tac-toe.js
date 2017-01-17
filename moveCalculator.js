class MoveCalculator {
  get winningScenarios() {
    return (
      [{ positions: [1, 2], blanks: [0], selection: 0 }, { positions: [0, 3], blanks: [6], selection: 6 }, { positions: [6, 7] ,blanks: [8], selection: 8 },
      { positions: [5, 8], blanks: [2], selection: 2 }, { positions: [3, 6], blanks: [0], selection: 0 }, { positions: [7, 8], blanks: [6], selection: 6 },
      { positions: [2, 5], blanks: [8], selection: 8 }, { positions: [0, 1], blanks: [2], selection: 2 }, { positions: [4, 8], blanks: [0], selection: 0 },
      { positions: [2, 4], blanks: [6], selection: 6 }, { positions: [0, 4], blanks: [8], selection: 8 }, { positions: [4, 6], blanks: [2], selection: 2 },
      { positions: [0, 2], blanks: [1], selection: 1 }, { positions: [0, 6], blanks: [3], selection: 3 }, { positions: [8, 6], blanks: [7], selection: 7 },
      { positions: [2, 8], blanks: [5], selection: 5 }, { positions: [4, 7], blanks: [1], selection: 1 }, { positions: [4, 5], blanks: [3], selection: 3 },
      { positions: [1, 4], blanks: [7], selection: 7 }, { positions: [3, 4], blanks: [5], selection: 5 }]
    )
  }

  get losingScenarios() {
    return (
      [{ positions: [2, 6], blanks: [0, 1, 3, 5, 7, 8], selection: 1 }, { positions: [1, 2], blanks: [0], selection: 0 }, { positions: [0, 3], blanks: [6], selection: 6 },
      { positions: [6, 7], blanks: [8], selection: 8 }, { positions: [5, 8], blanks: [2], selection: 2 }, { positions: [3, 6], blanks: [0], selection: 0 },
      { positions: [7, 8], blanks: [6], selection: 6 }, { positions: [2, 5], blanks: [8], selection: 8 }, { positions: [0, 1], blanks: [2], selection: 2 },
      { positions: [4, 8], blanks: [0], selection: 0 }, { positions: [2, 4], blanks: [6], selection: 6 }, { positions: [0, 4], blanks: [8], selection: 8 },
      { positions: [4, 6], blanks: [2], selection: 2 }, { positions: [0, 2], blanks: [1], selection: 1 }, { positions: [0, 6], blanks: [3], selection: 3 },
      { positions: [6, 8], blanks: [7], selection: 7 }, { positions: [2, 8], blanks: [5], selection: 5 }, { positions: [4, 7], blanks: [1], selection: 1 },
      { positions: [4, 5], blanks: [3], selection: 3 }, { positions: [1, 4], blanks: [7], selection: 7 }, { positions: [3, 4], blanks: [5], selection: 5 },
      { positions: [1, 3], blanks: [0, 2, 6], selection: 0 }, { positions: [3, 7], blanks: [0, 6, 8], selection: 6 }, { positions: [5, 7], blanks: [2, 6, 8], selection: 8 },
      { positions: [1, 5], blanks: [0, 2, 8], selection: 2 }, { positions: [2, 3], blanks: [0, 1, 6], selection: 0 }, { positions: [0, 7], blanks: [3, 6, 8], selection: 6 },
      { positions: [4, 5], blanks: [2, 6, 7, 8], selection: 8 }, { positions: [0, 5], blanks: [1, 2, 8], selection: 2 }, { positions: [1, 6], blanks: [0, 2, 3], selection: 0 },
      { positions: [3, 8], blanks: [0, 6, 7], selection: 6 }, { positions: [2, 7], blanks: [5, 6, 8], selection: 8 }, { positions: [0, 5], blanks: [1, 2, 8], selection: 2 },
      { positions: [4, 8], blanks: [1, 2, 3, 5, 6], selection: 2 }, { positions: [5, 6], blanks: [0, 1, 2, 3, 7, 8], selection: 8 }]
    )
  }

  getMove(boardManager, symbol, scenario) {
    for( let i = 0; i < this[scenario].length ; i++ ) {

      const doBlanksMatch = boardManager.doPositionsMatch(this[scenario][i].blanks, ' ')
      const doSymbolsMatch = boardManager.doPositionsMatch(this[scenario][i].positions, symbol)

      if (doBlanksMatch && doSymbolsMatch) {
        return this[scenario][i].selection
      }
    }
    return -1
  }

  getFallbackMove(boardManager) {
    const openPositions = boardManager.getPositions(' ')

    if (openPositions.includes(4)) { return 4 }
      return openPositions[0]
  }
}

module.exports = MoveCalculator
