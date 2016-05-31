var fs = require("fs");
var R = require("ramda");
var moment = require("moment");

var typeMap = {
  singles: require("./singles")
};

function formatMetaData (metaData) {
  return R.merge(metaData, {
    startDate: (metaData.startDate) ? moment(metaData.startDate, "YYYY-MM-DD").format("MMMM Do YYYY") : null,
    endDate: (metaData.endDate) ? moment(metaData.endDate, "YYYY-MM-DD").format("MMMM Do YYYY"): null
  });
}

module.exports = function (basePath, leagueName) {
  var leaguePath = basePath + "/" + leagueName;
  var players = fs.readFileSync(leaguePath + "/players", "utf8").split("\n");
  var metaData = JSON.parse(fs.readFileSync(leaguePath + "/meta", "utf8"));
  var resultFiles = fs.readdirSync(leaguePath + "/results");

  var results = resultFiles.map(function (fileName) {
    var rows = fs.readFileSync(leaguePath + "/results/" + fileName, "utf8").split("\n");

    return R.pipe(
      R.reject(R.compose(R.equals(0), R.length)),
      R.map(function (row) {
        return row + "," + fileName;
      })
    )(rows);
  });

  var leagueType = metaData.type || "singles";
  var formatter = typeMap[leagueType](players, R.flatten(results));

  return R.merge(formatMetaData(metaData), {
    resultsTotal: results.length,
    standings: formatter.getStandings(),
    allResults: formatter.getAllResults(),
    playerBreakdowns: formatter.getPlayerBreakdowns()
  });
}
