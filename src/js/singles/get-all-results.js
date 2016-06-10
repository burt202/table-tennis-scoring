var R = require("ramda");
var moment = require("moment");

module.exports = function (results) {
  return  R.pipe(
    R.reduce(function (acc, val) {
      var resultParts = R.split(",", val);
      var winner = resultParts[0];
      var loser = resultParts[1];
      var score = resultParts[2];
      var date = resultParts[3];

      if (!acc[date]) acc[date] = [];
      acc[date].push({winner: winner, loser: loser, score: score});

      return acc;
    }, {}),
    R.toPairs,
    R.map(function (pair) {
      return {
        date: moment(pair[0], "YYYYMMDD").format("MMMM Do YYYY"),
        results: pair[1]
      };
    }),
    R.reverse
  )(results);
}
