const MoveCalculator = require('./moveCalculator')

class AI {
  constructor() {
    this.symbol = null
    this.opposingSymbol = null
    this.moveCalculator = new MoveCalculator()
  }

  bestMove(boardManager) {
    let x = this.moveCalculator.getMove(boardManager, this.symbol, 'winningScenarios')
      if ( x === -1 ) {
        x = this.moveCalculator.getMove(boardManager, this.opposingSymbol, 'losingScenarios')
          if ( x === -1 ) {
            x = this.moveCalculator.getFallbackMove(boardManager)
          }
      }
    return x
  }
}

module.exports = AI
