const assert = require('chai').assert
const SymbolController = require('./../../symbolController')

describe('SymbolController', () => {
  context('functions', () => {
    describe('switchSymbols', () => {
      it('sets its dormantSymbol equal to the currentSymbol', () => {
        const symbols = new SymbolController()
        symbols.currentSymbol = 'R'

        assert.isNull(symbols.dormantSymbol)

        symbols.switchSymbols()

        assert.equal(symbols.dormantSymbol, 'R')
      })

      context('currentSymbol is equal to selectedSymbol', () => {
        it('sets currentSymbol to the secondSelectedSymbol', () => {
          const symbols = new SymbolController()
          symbols.selectedSymbol = '¿'
          symbols.secondSelectedSymbol = '@'
          symbols.currentSymbol = '¿'

          symbols.switchSymbols()

          assert.equal(symbols.currentSymbol, '@')
        })
      })

      context('currentSymbol is not equal to selectedSymbol', () => {
        it('sets currentSymbol to the selectedSymbol', () => {
          const symbols = new SymbolController()
          symbols.selectedSymbol = '¿'
          symbols.secondSelectedSymbol = '@'
          symbols.currentSymbol = '@'

          symbols.switchSymbols()

          assert.equal(symbols.currentSymbol, '¿')
        })
      })
    })
  })
})
