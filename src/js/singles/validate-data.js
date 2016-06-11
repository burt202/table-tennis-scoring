module.exports = function (validators, players, results) {
  var invalidPlayersInResults = validators.getInvalidPlayersInResults(players, results);

  var invalidErrors = invalidPlayersInResults.map(function (player) {
    return "Player '" + player + "' in result doesnt exist";
  });

  var duplicateResults = validators.getDuplicateResults(results);

  var duplicateErrors = duplicateResults.map(function (combination) {
    return "Duplicate result found for combination '" + combination + "'";
  });

  return [].concat(invalidErrors, duplicateErrors);
}
