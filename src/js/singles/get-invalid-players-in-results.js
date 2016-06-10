var R = require("ramda");

module.exports = function (players, results) {
  return R.pipe(
    R.reduce(function (acc, val) {
      var resultParts = R.split(",", val);
      var winner = resultParts[0];
      var loser = resultParts[1];

      return R.concat(acc, [winner, loser]);
    }, []),
    R.uniq,
    R.difference(R.__, players)
  )(results);
}
