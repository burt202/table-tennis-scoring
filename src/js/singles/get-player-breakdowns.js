var R = require("ramda");

module.exports = function (players, results) {
  var base = R.reduce(function (acc, val) {
    acc[val] = {yetToPlay: R.without([val], players), results: []};
    return acc;
  }, {}, players);

  return R.pipe(
    R.reduce(function (acc, val) {
      var resultParts = R.split(",", val);
      var winner = resultParts[0];
      var loser = resultParts[1];
      var score = resultParts[2];

      acc[winner] = R.evolve({
        results: R.prepend({winner: winner, loser: loser, score: score}),
        yetToPlay: R.without([loser])
      }, acc[winner]);

      acc[loser] = R.evolve({
        results: R.prepend({winner: winner, loser: loser, score: score}),
        yetToPlay: R.without([winner])
      }, acc[loser]);

      return acc;
    }, base),
    R.toPairs,
    R.map(function (pair) {
      return R.merge(pair[1], {name: pair[0]});
    })
  )(results);
}
