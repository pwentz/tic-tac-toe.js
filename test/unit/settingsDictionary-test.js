const assert = require('chai').assert
const dictionary = require('./../../settingsDictionary')

describe('dictionary', () => {
  context('getters', () => {
    describe('gameTypeOptions', () => {

      it('matches 1 with Human vs Computer', () => {
        assert.equal(dictionary.gameTypeOptions[1], 'Human vs Computer')
      })

      it('matches 2 with Human vs Human', () => {
        assert.equal(dictionary.gameTypeOptions[2], 'Human vs Human')
      })

      it('matches 3 with Computer vs Computer', () => {
        assert.equal(dictionary.gameTypeOptions[3], 'Computer vs Computer')
      })
    })
  })
})
