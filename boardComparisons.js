class BoardComparisons {
  arePositionsAMatch(allMatchingPositions, comparativeIndices) {
    const doPositionsMatch = comparativeIndices.every(position => {
      return allMatchingPositions.includes(position)
    })

    return doPositionsMatch
  }
}

module.exports = BoardComparisons
