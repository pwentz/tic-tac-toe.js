const chai = require('chai')
const assert = chai.assert
const sinon = require('sinon')
const Settings = require('./../../settings')
const AI = require('./../../ai')
const Output = require('./../../output')
const GameFactory = require('./../../gameFactory')
const UserInputHandler = require('./../../userInputHandler')
const PlayerController = require('./../../playerController')
const SymbolController = require('./../../symbolController')
const HumanVsComputerGame = require('./../../games').HvC
const inputValidations = require('./../../inputValidations')

describe('Settings', () => {
  const callback = () => 'I got called!'
  const output = new Output(process.stdout, console.log)
  const input = new UserInputHandler(process.stdin)
  const gameFactory = new GameFactory(input, output)

  const settings = new Settings(input, output, gameFactory, callback)

  beforeEach(() => sinon.stub(settings.output, 'prompt'))
  afterEach(() => settings.output.prompt.restore())

  describe('getSettings', () => {
    const input = '1'

    beforeEach(() => {
      outputStub = sinon.stub(settings.output, 'promptUserForGameType')
      inputStub = sinon.stub(settings.input, 'getInput').returns(new Promise(resolve => resolve(input)))
      applyGameTypeStub = sinon.stub(settings, 'applyGameType')
      symbolSettingsStub = sinon.stub(settings, 'getSymbolSettings')
    })

    afterEach(() => {
      outputStub.restore()
      inputStub.restore()
      applyGameTypeStub.restore()
      symbolSettingsStub.restore()
    })

    it('tells output to run promptUserForGameType', () => {
      settings.getSettings()

      assert.equal(outputStub.callCount, 1)
    })

    it("passes three game rules to input's getInput fn", () => {
      const config = [inputValidations.betweenTwoNums.bind(null, 0, 4),
                      inputValidations.mustBeNumber,
                      inputValidations.noBlanks]

      settings.getSettings()

      const configResults = config.map(rule => rule('1'))
      const argResults = inputStub.getCall(0).args[0].map(rule => rule('1'))

      assert.deepEqual(argResults, configResults)
    })

    it('passes the input to applyGameType', () => {
      return settings.getSettings()
       .then(() => {
         const arg = applyGameTypeStub.getCall(0).args[0]

         assert.equal(arg, '1')
       })
    })

    it("runs the getSymbolSettings fn", () => {
      return settings.getSettings()
       .then(() => {
         assert.equal(symbolSettingsStub.callCount, 1)
       })
    })
  })

  describe('getSymbolSettings', () => {
    const symbol = '@'

    beforeEach(() => {
      outputStub = sinon.stub(settings.output, 'promptUserForSymbol')
      inputStub = sinon.stub(settings.input, 'getInput').returns(new Promise(resolve => resolve(symbol)))
      applySymbolStub = sinon.stub(settings, 'applySelectedSymbol')
      opponentSymbolSettingsStub = sinon.stub(settings, 'getOpponentSymbolSettings')
    })

    afterEach(() => {
      outputStub.restore()
      inputStub.restore()
      applySymbolStub.restore()
      opponentSymbolSettingsStub.restore()
    })

    it('tells output to run its promptUserForSymbol fn', () => {
      settings.getSymbolSettings()

      assert.equal(outputStub.callCount, 1)
    })

    it("passes three inputValidations to input's getInput fn", () => {
      const config = [inputValidations.noBlanks,
                      inputValidations.singleChar,
                      inputValidations.mustNotEqual.bind(null, ' ')]

      settings.getSymbolSettings()

      const configResults = config.map(rule => rule('@'))
      const argResults = inputStub.getCall(0).args[0].map(rule => rule('@'))

      assert.deepEqual(argResults, configResults)
    })

    it("passes input to applySelectedSymbol fn", () => {
      return settings.getSymbolSettings()
       .then(() => {
         const arg = applySymbolStub.getCall(0).args[0]

         assert.equal(arg, '@')
       })
    })

    it('runs the getOpponentSymbol fn', () => {
      return settings.getSymbolSettings()
       .then(() => {
          assert.equal(opponentSymbolSettingsStub.callCount, 1)
       })
    })
  })

  describe('getOpponentSymbolSettings', () => {
    const symbol = '$'

    beforeEach(() => {
      outputStub = sinon.stub(settings.output, 'promptUserForOpponentSymbol')
      inputStub = sinon.stub(settings.input, 'getInput').returns(new Promise(resolve => resolve(symbol)))
      applyStub = sinon.stub(settings, 'applyOpponentSymbol')
      getFirstPlayerSettingsStub = sinon.stub(settings, 'getFirstPlayerSettings')
    })

    afterEach(() => {
      outputStub.restore()
      inputStub.restore()
      applyStub.restore()
      getFirstPlayerSettingsStub.restore()
    })

    it('tells the output to promptUserForOpponentSymbol', () => {
      settings.getOpponentSymbolSettings()

      assert.equal(outputStub.callCount, 1)
    })

    it('passes four inputValidations to getInput', () => {
      settings.symbols.selectedSymbol = '@'

      const config = [inputValidations.noBlanks,
                      inputValidations.mustNotEqual.bind(null, ' '),
                      inputValidations.singleChar,
                      inputValidations.mustNotEqual.bind(null, '@')]

      settings.getOpponentSymbolSettings()

      const configResults = config.map(rule => rule('$'))
      const argResults = inputStub.getCall(0).args[0].map(rule => rule('$'))

      assert.deepEqual(argResults, configResults)
    })

    it('passes the input to applyOpponentSymbol fn', () => {
      return settings.getOpponentSymbolSettings()
       .then(() => {
          const arg = applyStub.getCall(0).args[0]

          assert.equal(arg, '$')
       })
    })

    it('runs the getFirstPlayerSettings fn', () => {
      return settings.getOpponentSymbolSettings()
       .then(() => {
          assert.equal(getFirstPlayerSettingsStub.callCount, 1)
       })
    })
  })

  describe('getFirstPlayerSettings', () => {
    const input = '2'

    beforeEach(() => {
      outputStub = sinon.stub(settings.output, 'promptUserForFirstPlayer')
      inputStub = sinon.stub(settings.input, 'getInput').returns(new Promise(resolve => resolve(input)))
      applyStub = sinon.stub(settings, 'applyFirstPlayerChoice')
      factorySpy = sinon.spy(settings.gameFactory, 'getGame')
      callbackStub = sinon.stub(settings, 'settingsCallback')
    })

    afterEach(() => {
      outputStub.restore()
      inputStub.restore()
      applyStub.restore()
      factorySpy.restore()
      callbackStub.restore()
    })

    it('tells the output to promptUserForFirstPlayer', () => {
      settings.getFirstPlayerSettings()

      assert.equal(outputStub.callCount, 1)
    })

    it('passes two input rules to getInput fn', () => {
      const config = [inputValidations.noBlanks,
                      inputValidations.betweenTwoNums.bind(null, 0, 3)]

      settings.getFirstPlayerSettings()

      const configResults = config.map(rule => rule('2'))
      const argResults = inputStub.getCall(0).args[0].map(rule => rule('2'))

      assert.deepEqual(argResults, configResults)
    })

    it('passes the input to applyFirstPlayerChoice', () => {
      return settings.getFirstPlayerSettings()
       .then(() => {
         const arg = applyStub.getCall(0).args[0]

         assert.equal(arg, '2')
       })
    })

    it('uses factory to create a game which gets passed into callback', () => {
      settings.gameType = 'Human vs Computer'

      return settings.getFirstPlayerSettings()
       .then(() => {
         const arg = callbackStub.getCall(0).args[0]

         assert.instanceOf(arg, HumanVsComputerGame)
       })
    })
  })

  describe('applyGameType', () => {
    context('response is 3', () => {
      const response = '3'

      beforeEach(() => secondPlayerStub = sinon.stub(settings.players, 'addSecondPlayer'))
      afterEach(() => secondPlayerStub.restore())

      it("calls the player's addSecondPlayer fn", () => {
        settings.applyGameType(response)

        assert.equal(secondPlayerStub.callCount, 1)
      })
    })

    it('sets its gameType equal to the dictionary response reference', () => {
      const dictionary = require('./../../settingsDictionary')
      const response = '1'
      const newGameType = dictionary.gameTypeOptions[response]

      settings.applyGameType(response)

      assert.equal(settings.gameType, newGameType)
    })
  })

  describe('applySelectedSymbol', () => {
    const symbols = settings.symbols

    it("sets the symbol's selectedSymbol equal to argument", () => {
      const chosenSymbol = '&'

      settings.applySelectedSymbol(chosenSymbol)

      assert.equal(symbols.selectedSymbol, chosenSymbol)
    })

    it("sets the player's ai's opposingSymbol to argument", () => {
      const chosenSymbol = '!'

      settings.applySelectedSymbol(chosenSymbol)

      assert.equal(symbols.selectedSymbol, chosenSymbol)
    })
  })

  describe('applyOpponentSymbol', () => {
    context('players has a secondPlayer', () => {
      const secondSelectedSymbol = '¿'
      settings.players.secondPlayer = new AI()

      beforeEach(() => {
        setMultiplayerSymbolsStub = sinon.stub(settings.players, 'setMultiplayerAiSymbols')
      })

      afterEach(() => {
        setMultiplayerSymbolsStub.restore()
      })

      it('tells players to run its setMultiPlayerAiSymbols() fn', () => {
        settings.applyOpponentSymbol(secondSelectedSymbol)

        assert.equal(setMultiplayerSymbolsStub.callCount, 1)
      })
    })

    it("sets the symbol's secondSelectedSymbol prop equal to argument", () => {
      const secondSelectedSymbol = '~'

      settings.applyOpponentSymbol(secondSelectedSymbol)

      assert.equal(settings.symbols.secondSelectedSymbol, secondSelectedSymbol)
    })

    it("sets the player's ai's symbol equal to argument", () => {
      const secondSelectedSymbol = '/'

      settings.applyOpponentSymbol(secondSelectedSymbol)

      assert.equal(settings.players.ai.symbol, secondSelectedSymbol)
    })
  })

  describe('applyFirstPlayerChoice', () => {
    settings.symbols.selectedSymbol = 'L'
    settings.symbols.secondSelectedSymbol = '>'

    beforeEach(() => {
      assignSymbolStub = sinon.stub(settings.players, 'assignPlayerSymbols')
      setCurrentPlayerStub = sinon.stub(settings.players, 'setCurrentPlayer')
    })

    afterEach(() => {
      assignSymbolStub.restore()
      setCurrentPlayerStub.restore()
    })

    context('response is 1', () => {
      const response = '1'

      it("passes the symbol's selectedSymbol as first arg to player's assignPlayerSymbols", () => {
        settings.applyFirstPlayerChoice(response)

        const firstArg = assignSymbolStub.getCall(0).args[0]
        const initialSymbol = settings.symbols.selectedSymbol

        assert.equal(firstArg, initialSymbol)
      })

      it("passes the symbol's secondSymbol as second arg to player's assignPlayerSymbols", () => {
        settings.applyFirstPlayerChoice(response)

        const secondArg = assignSymbolStub.getCall(0).args[1]
        const secondSymbol = settings.symbols.secondSelectedSymbol

        assert.equal(secondArg, secondSymbol)
      })
    })

    context('response is not 1', () => {
      const response = '2'

      it("passes the symbol's secondSymbol as first arg to player's assignPlayerSymbols", () => {
        settings.applyFirstPlayerChoice(response)

        const firstArg = assignSymbolStub.getCall(0).args[0]
        const secondSymbol = settings.symbols.secondSelectedSymbol

        assert.equal(firstArg, secondSymbol)
      })

      it("passes the symbol's selectedSymbol as second arg to player's assignPlayerSymbols", () => {
        settings.applyFirstPlayerChoice(response)

        const secondArg = assignSymbolStub.getCall(0).args[1]
        const initialSymbol = settings.symbols.selectedSymbol

        assert.equal(secondArg, initialSymbol)
      })
    })

    it("assigns symbol's currentSymbol as player's firstPlayerSymbol", () => {
      settings.symbols.currentSymbol = '^'

      settings.applyFirstPlayerChoice()

      const currentSymbol = settings.symbols.currentSymbol
      const firstPlayerSymbol = settings.players.firstPlayerSymbol

      assert.equal(currentSymbol, firstPlayerSymbol)
    })

    it("passes symbol's currentSymbol to player's setCurrentPlayer", () => {
      settings.symbols.currentSymbol = '!'

      settings.applyFirstPlayerChoice()

      const arg = setCurrentPlayerStub.getCall(0).args[0]
      const currentSymbol = settings.symbols.currentSymbol

      assert.equal(arg, currentSymbol)
    })
  })
})
