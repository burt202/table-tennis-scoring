var R = require("ramda");

module.exports = function (results) {

  return R.pipe(
    R.map(
      R.pipe(
        R.split(","),
        R.take(2),
        R.sort(R.gte),
        R.join(",")
      )
    ),
    R.countBy(R.identity),
    R.filter(R.lt(1)),
    R.keys
  )(results);
}
