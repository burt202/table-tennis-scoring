var R = require("ramda");

var validateData = require("./validate-data");
var getStandings = require("./get-standings");
var getAllResults = require("./get-all-results");
var getPlayerBreakdowns = require("./get-player-breakdowns");
var formatMetaData = require("./format-metadata");

var validators = {
  getInvalidPlayersInResults: require("./get-invalid-players-in-results"),
  getDuplicateResults: require("./get-duplicate-results")
};

module.exports = function (metaData, players, results) {

  var errors = validateData(validators, players, results);

  if (errors.length) {
    throw new Error("League: " + metaData.displayName + " - " + JSON.stringify(errors[0]));
  } else {
    var leagueData = {
      resultsTotal: results.length,
      standings: getStandings(players, results),
      allResults: getAllResults(results),
      playerBreakdowns: getPlayerBreakdowns(players, results)
    };

    return R.mergeAll([
      formatMetaData(metaData),
      leagueData
    ]);
  }
}
