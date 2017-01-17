const inputValidations = require('./inputValidations')

class ComputerVsComputerGame {
  constructor(options, boardManager) {
    this.symbols = options.symbols
    this.players = options.players
    this.boardManager = boardManager
  }

  advanceOneTurn() {
    const aiPosition = this.players.currentPlayer.bestMove(this.boardManager)

    this.boardManager.addMarker(aiPosition, this.symbols.currentSymbol)
    this.players.switchPlayers(this.symbols.currentSymbol)
    this.symbols.switchSymbols()
    return new Promise((resolve, reject) => resolve())
  }
}

class HumanVsHumanGame {
  constructor(options, output, boardManager, input) {
    this.symbols = options.symbols
    this.boardManager = boardManager
    this.input = input
    this.output = output
  }

  advanceOneTurn() {
    const openings = this.boardManager.getPositions(' ')

    const positionRules = [inputValidations.noBlanks,
                           inputValidations.mustBeNumber,
                           inputValidations.positionIsOpen.bind(null, openings),
                           inputValidations.betweenTwoNums.bind(null, 0, 8)]


    this.output.promptUserForPosition()

    return this.input.getInput(positionRules)
     .then(input => {
       this.boardManager.addMarker(input, this.symbols.currentSymbol)
       this.symbols.switchSymbols()
     })
     .catch(warning => {
       this.output.log(warning)
     })
  }
}

class HumanVsComputerGame {
  constructor(options, output, boardManager, input) {
    this.symbols = options.symbols
    this.players = options.players
    this.input = input
    this.output = output
    this.boardManager = boardManager
  }

  advanceOneTurn() {
    if (this.players.doesAiHaveTurn(this.symbols.currentSymbol)) {
      return this.advanceAiTurn()
    }
    else {
      return this.advanceUserTurn()
    }
  }

  advanceAiTurn() {
    const aiPosition = this.players.ai.bestMove(this.boardManager)

    this.boardManager.addMarker(aiPosition, this.symbols.currentSymbol)
    this.symbols.switchSymbols()
    return new Promise((resolve, reject) => resolve())
  }

  advanceUserTurn() {
    const openings = this.boardManager.getPositions(' ')
    const positionRules = [inputValidations.noBlanks,
                           inputValidations.mustBeNumber,
                           inputValidations.positionIsOpen.bind(null, openings),
                           inputValidations.betweenTwoNums.bind(null, 0, 8)]

    this.output.promptUserForPosition()

    return this.input.getInput(positionRules)
    .then(input => {
      this.boardManager.addMarker(input, this.symbols.currentSymbol)
      this.symbols.switchSymbols()
    })

    .catch(warning => {
      this.output.log(warning)
    })
  }
}

module.exports = { HvC: HumanVsComputerGame,
                   HvH: HumanVsHumanGame,
                   CvC: ComputerVsComputerGame }
