var fs = require("fs");
var R = require("ramda");

var typeMap = {
  singles: require("./singles")
};

var DEFAULT_LEAGUE_TYPE = "singles";
var VALID_LEAGUE_TYPES = R.keys(typeMap);

function validateMetaData (metaData) {
  return R.merge(metaData, {
    type: ensureValidLeagueType()
  });
}

function extractResults (fileName, rows) {
  return R.pipe(
    R.reject(R.compose(R.equals(0), R.length)),
    R.map(function (row) {
      return row + "," + fileName;
    })
  )(rows)
}

function ensureValidLeagueType (type) {
  var leagueType = type || DEFAULT_LEAGUE_TYPE;
  if (!R.contains(leagueType, VALID_LEAGUE_TYPES)) leagueType = DEFAULT_LEAGUE_TYPE;
  return leagueType;
}

module.exports = function (basePath) {

  return function (leagueName, metaData) {
    var leaguePath = basePath + "/" + leagueName;
    var players = fs.readFileSync(leaguePath + "/players", "utf8").split("\n");
    var resultFiles = fs.readdirSync(leaguePath + "/results");

    var results = resultFiles.map(function (fileName) {
      var rows = fs.readFileSync(leaguePath + "/results/" + fileName, "utf8").split("\n");
      return extractResults(fileName, rows);
    });

    var validatedMetaData = validateMetaData(metaData);
    return typeMap[validatedMetaData.type](validatedMetaData, players, R.flatten(results));
  }
}
