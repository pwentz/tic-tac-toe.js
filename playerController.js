const AI = require('./ai')

class PlayerController {
  constructor() {
    this.firstPlayerSymbol = null
    this.secondPlayerSymbol = null
    this.secondPlayer = null
    this.currentPlayer = null
    this.ai = new AI()
  }

  doesAiHaveTurn(currentSymbol) {
    return this.ai.symbol === currentSymbol
  }

  switchPlayers(currentSymbol) {
    if (this.ai.symbol === currentSymbol) {
      this.currentPlayer = this.secondPlayer
    }
    else {
      this.currentPlayer = this.ai
    }
  }

  setCurrentPlayer(currentSymbol) {
    if (this.ai.symbol === currentSymbol) {
      this.currentPlayer = this.ai
    }
    else {
      this.currentPlayer = this.secondPlayer
    }
  }

  addSecondPlayer() {
    this.secondPlayer = new AI()
  }

  setMultiplayerAiSymbols(symbol) {
    this.secondPlayer.symbol = this.ai.opposingSymbol
    this.secondPlayer.opposingSymbol = symbol
  }

  assignPlayerSymbols(firstPlayerSymbol, secondPlayerSymbol) {
    this.firstPlayerSymbol = firstPlayerSymbol
    this.secondPlayerSymbol = secondPlayerSymbol
  }
}

module.exports = PlayerController
