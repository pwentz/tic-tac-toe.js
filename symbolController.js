class SymbolController {
  constructor() {
    this.currentSymbol = null
    this.dormantSymbol = null
    this.selectedSymbol = null
    this.secondSelectedSymbol = null
  }

  switchSymbols() {
    this.dormantSymbol = this.currentSymbol

    if (this.currentSymbol === this.selectedSymbol) {
      this.currentSymbol = this.secondSelectedSymbol
    }
    else {
      this.currentSymbol = this.selectedSymbol
    }
  }
}

module.exports = SymbolController
