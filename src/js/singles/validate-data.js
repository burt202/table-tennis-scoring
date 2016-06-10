module.exports = function (validators, metaData, players, results) {
  var errors = [];

  var invalidPlayersInResults = validators.getInvalidPlayersInResults(players, results);

  if (invalidPlayersInResults.length) {
    invalidPlayersInResults.forEach(function (player) {
      errors.push("Player '" + player + "' in result for league '" + metaData.displayName + "' doesnt exist");
    })
  }

  var duplicateResults = validators.getDuplicateResults(results);

  if (duplicateResults.length) {
    duplicateResults.forEach(function (combination) {
      errors.push("Duplicate result found for combination: " + combination);
    })
  }

  return errors;
}
