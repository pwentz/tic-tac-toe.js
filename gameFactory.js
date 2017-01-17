const HumanVsComputerGame = require('./games').HvC
const HumanVsHumanGame = require('./games').HvH
const ComputerVsComputerGame = require('./games').CvC
const BoardManager = require('./boardManager')

class GameFactory {
  constructor(input, output) {
    this.input = input
    this.output = output
  }

  getGame(type, options) {
    switch (type) {
      case 'Human vs Computer':
        return new HumanVsComputerGame(options,
                                       this.output,
                                       new BoardManager(),
                                       this.input)
      case 'Human vs Human':
        return new HumanVsHumanGame(options,
                                    this.output,
                                    new BoardManager(),
                                    this.input)
      case 'Computer vs Computer':
        return new ComputerVsComputerGame(options,
                                          new BoardManager())
      default:
        return new HumanVsComputerGame(options,
                                       this.output,
                                       new BoardManager(),
                                       this.input)
    }
  }
}

module.exports = GameFactory
