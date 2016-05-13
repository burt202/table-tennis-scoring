var R = require("ramda");

module.exports = function (players, results) {
  var base = R.reduce(function (acc, val) {
    acc[val] = {played: 0, wins: 0, for: 0, against: 0, diff: 0, results: []};
    return acc;
  }, {}, players);

  var standings = R.pipe(
    R.flatten,
    R.reduce(function (acc, val) {
      var resultParts = R.split(",", val);
      var winner = resultParts[0];
      var loser = resultParts[1];
      var score = resultParts[2];

      var scoreParts = R.split("-", score);
      var fore = scoreParts[0];
      var against = scoreParts[1];

      acc[winner] = R.evolve({
        played: R.add(1),
        wins: R.add(1),
        for: R.add(fore),
        against: R.add(against),
        results: R.append(val)
      }, acc[winner]);

      acc[winner].diff = acc[winner].for - acc[winner].against;

      acc[loser] = R.evolve({
        played: R.add(1),
        wins: R.identity,
        for: R.add(against),
        against: R.add(fore),
        results: R.append(val)
      }, acc[loser]);

      acc[loser].diff = acc[loser].for - acc[loser].against;

      return acc;
    }, base),
    R.toPairs,
    R.map(function (pair) {
      return R.merge(pair[1], {name: pair[0]});
    }),
    R.sort(function (a, b) {
      return a["wins"] - b["wins"] || a["diff"] - b["diff"];
    }),
    R.reverse
  )(results);

  return {
    standings: standings
  };
}
