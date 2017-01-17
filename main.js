const Settings = require('./settings')
const ScoreKeeper = require('./scoreKeeper')
const GameFactory = require('./gameFactory')
const Output = require('./output')
const UserInputHandler = require('./userInputHandler')

const output = new Output(process.stdout, console.log)
const input = new UserInputHandler(process.stdin)

const gameFactory = new GameFactory(input, output)

new Settings(input, output, gameFactory, game => {
  new Runner(output, game).play()
}).getSettings()

class Runner {
  constructor(output, game) {
    this.output = output
    this.game = game
    this.score = new ScoreKeeper()
  }

  play() {
    this.output.renderBoard(this.game.boardManager.board)

    this.game.advanceOneTurn()

    .then(() => {
      const isGameOver = this.score.isGameOver(this.game.boardManager, this.game.symbols.dormantSymbol)

      if (isGameOver) {
        this.output.renderBoard(this.game.boardManager.board)
        this.output.gameOver()
      }
      else {
        this.play()
      }
    })
    .catch(error => {
      this.output.log(error)
    })
  }
}
