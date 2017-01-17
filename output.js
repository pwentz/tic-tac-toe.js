class Output {
  constructor(stdout, log) {
    this.prompt = stdout.write.bind(stdout)
    this.log = log
  }

  promptUserForGameType() {
    this.prompt(
      'Please choose 1 for human vs computer, 2 for human vs human, and 3 for computer vs computer: '
    )
  }

  promptUserForSymbol() {
    this.prompt(
      "Please choose which symbol you'd like to represent your player: "
    )
  }

  promptUserForOpponentSymbol() {
    this.prompt(
      "Please choose which symbol you'd like to represent your opponent: "
    )
  }

  promptUserForFirstPlayer() {
    this.prompt(
      'Please enter 1 to let your player go first, or enter 2 to go second: '
    )
  }

  renderBoard(board) {
    this.log(
      ' ' + board[0] + ' |' + ' ' + board[1] + ' |' + ' ' + board[2]
      + '\n===+===+===\n' +
      ' ' + board[3] + ' |' + ' ' + board[4] + ' |' + ' ' + board[5]
      + '\n===+===+===\n' +
      ' ' + board[6] + ' |' + ' ' + board[7] + ' |' + ' ' + board[8]
    )
  }

  promptUserForPosition() {
    this.prompt(
      'Please enter a number 0-8: '
    )
  }

  gameOver() {
    this.log(
      'Game Over'
    )
  }
}

module.exports = Output
