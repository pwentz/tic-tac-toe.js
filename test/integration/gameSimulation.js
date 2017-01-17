const assert = require('chai').assert
const sinon = require('sinon')
const HumanVsComputerGame = require('./../../games').HvC
const SymbolController = require('./../../symbolController')
const PlayerController = require('./../../playerController')
const BoardManager = require('./../../boardManager')
const ScoreKeeper = require('./../../scoreKeeper')

describe('GameSimulation', function() {
  this.timeout(100000)

  context('5,000 games played when human goes first', () => {

    it('beats or ties the user everytime', () => {
      for(let i = 1; i < 5000 ; i++) {
        // generate peculiar characters at random to test handling different symbols
        const randomSymbolOne = String.fromCharCode(0x30A0 + Math.random() * (0x30FF-0x30A0+1))
        let randomSymbolTwo = String.fromCharCode(0x30A0 + Math.random() * (0x30FF-0x30A0+1))

        while(randomSymbolOne === randomSymbolTwo) {
          randomSymbolTwo = String.fromCharCode(0x30A0 + Math.random() * (0x30FF-0x30A0+1))
        }

        const symbols = new SymbolController()
        symbols.currentSymbol = symbols.selectedSymbol = randomSymbolOne
        symbols.secondSelectedSymbol = randomSymbolTwo

        const players = new PlayerController()
        players.firstPlayerSymbol = players.ai.opposingSymbol = randomSymbolOne
        players.secondPlayerSymbol = players.ai.symbol = randomSymbolTwo

        const bm = new BoardManager()
        const score = new ScoreKeeper()

        while(!score.isGameOver(bm, randomSymbolTwo)) {
          let openPositions = bm.getPositions(' ')

          let randomOpenPosition = openPositions[Math.round(Math.random() * (openPositions.length - 1))]

          bm.addMarker(randomOpenPosition, randomSymbolOne)

          assert.isNotOk(score.hasWinner(bm, randomSymbolOne))

          symbols.switchSymbols()
          bm.addMarker(players.ai.bestMove(bm), randomSymbolTwo)
        }
      }
    })
  })

  context('5,000 games played computer vs computer', () => {
    it('is a draw every time', () => {
      for(let i = 1; i < 5000 ; i++) {
        // generate peculiar characters at random to test handling different symbols
        const randomSymbolOne = String.fromCharCode(0x30A0 + Math.random() * (0x30FF-0x30A0+1))
        let randomSymbolTwo = String.fromCharCode(0x30A0 + Math.random() * (0x30FF-0x30A0+1))

        while(randomSymbolOne === randomSymbolTwo) {
          randomSymbolTwo = String.fromCharCode(0x30A0 + Math.random() * (0x30FF-0x30A0+1))
        }

        const symbols = new SymbolController()
        symbols.currentSymbol = symbols.selectedSymbol = randomSymbolOne
        symbols.secondSelectedSymbol = randomSymbolTwo

        const players = new PlayerController()
        players.addSecondPlayer()
        players.firstPlayerSymbol = players.ai.opposingSymbol = players.secondPlayer.symbol = randomSymbolOne
        players.secondPlayerSymbol = players.ai.symbol = players.secondPlayer.opposingSymbol = randomSymbolTwo
        players.currentPlayer = players.ai

        const bm = new BoardManager()
        const score = new ScoreKeeper()

        while(!score.isGameOver(bm, symbols.dormantSymbol)) {
          bm.addMarker(players.currentPlayer.bestMove(bm), symbols.currentSymbol)

          assert.isNotOk(score.hasWinner(bm, symbols.currentSymbol))

          players.switchPlayers(symbols.currentSymbol)
          symbols.switchSymbols()
        }
      }
    })
  })
})
