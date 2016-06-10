var R = require("ramda");

module.exports = function (results) {

  return R.pipe(
    R.reduce(function (acc, val) {
      var resultParts = R.split(",", val);
      var sortAsc = R.comparator(function (a, b) {return a < b});

      var key = R.pipe(
        R.take(2),
        R.sort(sortAsc),
        R.join(",")
      )(resultParts);

      if (!acc[key]) acc[key] = 0;
      acc[key] += 1;
      return acc;
    }, {}),
    R.toPairs,
    R.filter(function (result) {
      return result[1] > 1;
    }),
    R.map(R.head)
  )(results);
}
