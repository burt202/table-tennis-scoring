var fs = require("fs");

module.exports = function () {
  var basePath = __dirname + "/leagues";
  var leagues = fs.readdirSync(basePath);

  return leagues.map(function (leagueName) {
    var leaguePath = basePath + "/" + leagueName;
    var players = fs.readFileSync(leaguePath + "/players", "utf8").split("\n");
    var resultFiles = fs.readdirSync(leaguePath + "/results");

    var results = resultFiles.map(function (fileName) {
      var rows = fs.readFileSync(leaguePath + "/results/" + fileName, "utf8").split("\n");

      return rows.map(function (row) {
        return row + "," + fileName;
      });
    });

    return {
      name: leagueName,
      players: players,
      results: results
    };
  });
}
