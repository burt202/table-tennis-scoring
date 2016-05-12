var fs = require("fs");
var gulp = require("gulp");
var replace = require("gulp-replace-task");
var rename = require("gulp-rename");
var runSequence = require("run-sequence");
var clean = require("gulp-clean");
var deploy = require("gulp-gh-pages");
var es = require("event-stream");

var getResultsForLeague = require("./src/get-results-for-league");

gulp.task("default", ["watch"]);

gulp.task("watch", function () {
  gulp.watch("src/**", ["build"]);
});

gulp.task("clean", function () {
  return gulp.src("build")
    .pipe(clean());
});

gulp.task("process-templates", function () {
  var basePath = __dirname + "/leagues";
  var leagues = fs.readdirSync(basePath);

  return es.merge(leagues.map(function (leagueName) {
    var results = getResultsForLeague(basePath, leagueName);

    return gulp.src("src/template.html")
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
  }));
});

gulp.task("build", function (callback) {
  runSequence(
    "clean",
    "process-templates",
    callback
  );
});

gulp.task("deploy", ["build"], function () {
  return gulp.src("./build/**/*")
    .pipe(deploy());
});