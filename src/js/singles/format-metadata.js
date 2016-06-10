var R = require("ramda");
var moment = require("moment");

module.exports = function (metaData) {
  return R.merge(metaData, {
    startDate: (metaData.startDate) ? moment(metaData.startDate, "YYYY-MM-DD").format("MMMM Do YYYY") : null,
    endDate: (metaData.endDate) ? moment(metaData.endDate, "YYYY-MM-DD").format("MMMM Do YYYY") : null
  });
}
