var fs = require("fs");
var gulp = require("gulp");
var replace = require("gulp-replace-task");
var rename = require("gulp-rename");

var getResultsForLeague = require("./src/get-results-for-league");

gulp.task("build", function () {
  var basePath = __dirname + "/leagues";
  var leagues = fs.readdirSync(basePath);

  leagues.forEach(function (leagueName) {
    var results = getResultsForLeague(basePath, leagueName);

    gulp.src("index.html")
      .pipe(replace({
        patterns: [
          {
            match: "name",
            replacement: leagueName
          },
          {
            match: "results",
            replacement: results
          }
        ]
      }))
      .pipe(rename(leagueName + ".html"))
      .pipe(gulp.dest("build"));
  })
});
