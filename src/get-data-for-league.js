var fs = require("fs");
var R = require("ramda");
var formatResults = require("./format-results");

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

  return formatResults(metaData, players, R.flatten(results));
}
