class UserInputHandler {
  constructor(stdin) {
    this.stdin = stdin
  }

  didUserHitEnter(rawInput) {
    return rawInput.includes('\n')
  }

  getInput(rules) {
    return new Promise((resolve, reject) => {
      let input = ''

      this.stdin.resume()

      this.stdin.once('data', chunk => {
        input += chunk

        if(this.didUserHitEnter(input)) {
          input = input.replace('\n', '')

          this.stdin.pause()

          const isInputValid = this.isInputValid(rules, input)

          if(isInputValid) {
            resolve(input)
          }
          else {
            reject('Invalid input')
          }
        }
      })
    })
  }

  isInputValid(rules, input) {
    return rules.every(rule => rule(input))
  }
}

module.exports = UserInputHandler
