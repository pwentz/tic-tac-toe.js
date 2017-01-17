const PlayerController = require('./playerController')
const dictionary = require('./settingsDictionary')
const SymbolController = require('./symbolController')
const inputValidations = require('./inputValidations')

class Settings {
  constructor(input, output, gameFactory, settingsCallback) {
    this.gameFactory = gameFactory
    this.settingsCallback = settingsCallback
    this.input = input
    this.output = output
    this.gameType = null
    this.players = new PlayerController()
    this.symbols = new SymbolController()
  }

  getSettings() {
    this.output.promptUserForGameType()
    const inputConfig = [inputValidations.betweenTwoNums.bind(null, 1, 3),
                         inputValidations.mustBeNumber,
                         inputValidations.noBlanks]

    return this.input.getInput(inputConfig)

     .then(input => {
       this.applyGameType(input)
       this.getSymbolSettings()
     })
     .catch(warning => {
       this.output.log(warning)
       this.getSettings()
     })
  }

  getSymbolSettings() {
    this.output.promptUserForSymbol()
    const inputConfig = [inputValidations.noBlanks,
                         inputValidations.singleChar,
                         inputValidations.mustNotEqual.bind(null, ' ')]

    return this.input.getInput(inputConfig)
     .then(input => {
       this.applySelectedSymbol(input)
       this.getOpponentSymbolSettings()
     })
     .catch(warning => {
       this.output.log(warning)
       this.getSymbolSettings()
     })
  }

  getOpponentSymbolSettings() {
    this.output.promptUserForOpponentSymbol()
    const configRules = [inputValidations.mustNotEqual.bind(null, this.symbols.selectedSymbol),
                         inputValidations.mustNotEqual.bind(null, ' '),
                         inputValidations.singleChar,
                         inputValidations.noBlanks]

    return this.input.getInput(configRules)
     .then(input => {
       this.applyOpponentSymbol(input)
       this.getFirstPlayerSettings()
     })
     .catch(warning => {
       this.output.log(warning)
       this.getOpponentSymbolSettings()
     })
  }

  getFirstPlayerSettings() {
    this.output.promptUserForFirstPlayer()
    const rules = [inputValidations.noBlanks,
                   inputValidations.betweenTwoNums.bind(null, 1, 2)]

    return this.input.getInput(rules)

     .then(input => {
       this.applyFirstPlayerChoice(input)

       const newGameSettings = {
         symbols: this.symbols,
         players: this.players
       }

       const newGame = this.gameFactory.getGame(this.gameType, newGameSettings)

       this.settingsCallback(newGame)
     })
     .catch(warning => {
       this.output.log(warning)
       this.getFirstPlayerSettings()
     })
  }

  applyGameType(response) {
    if (response === '3') {
      this.players.addSecondPlayer()
    }

    this.gameType = dictionary.gameTypeOptions[response]
  }

  applySelectedSymbol(chosenSymbol) {
    this.symbols.selectedSymbol = this.players.ai.opposingSymbol = chosenSymbol
  }

  applyOpponentSymbol(selectedSymbol) {
    if (this.players.secondPlayer) {
      this.players.setMultiplayerAiSymbols(selectedSymbol)
    }

    this.symbols.secondSelectedSymbol = this.players.ai.symbol = selectedSymbol
  }

  applyFirstPlayerChoice(response) {
    if (response === '1') {
      this.players.assignPlayerSymbols(this.symbols.selectedSymbol,
                                       this.symbols.secondSelectedSymbol)
    }
    else {
      this.players.assignPlayerSymbols(this.symbols.secondSelectedSymbol,
                                       this.symbols.selectedSymbol)
    }

    this.symbols.currentSymbol = this.players.firstPlayerSymbol
    this.players.setCurrentPlayer(this.symbols.currentSymbol)
  }
}

module.exports = Settings
