var fs = require("fs");
var gulp = require("gulp");
var rename = require("gulp-rename");
var runSequence = require("run-sequence");
var clean = require("gulp-clean");
var deploy = require("gulp-gh-pages");
var es = require("event-stream");
var swig = require("gulp-swig");
var data = require("gulp-data");
var R = require("ramda");

var getDataForLeague = require("./src/get-data-for-league");

var LIVE_LEAGUE = "test";

var basePath = __dirname + "/leagues";
var leagues = fs.readdirSync(basePath);

gulp.task("default", ["watch"]);

gulp.task("watch", function () {
  gulp.watch("src/**", ["build"]);
});

gulp.task("clean", function () {
  return gulp.src("build")
    .pipe(clean());
});

gulp.task("process-league-templates", function () {
  return es.merge(leagues.map(function (leagueName) {
    var leagueData = getDataForLeague(basePath, leagueName);

    return gulp.src("src/template.html")
      .pipe(data(R.merge({name: leagueName}, leagueData)))
      .pipe(swig())
      .pipe(rename(leagueName + ".html"))
      .pipe(gulp.dest("build"));
  }));
});

gulp.task("process-index-template", function () {
  var previousLeagues = R.without(LIVE_LEAGUE, leagues);

  return gulp.src("./src/index.html")
    .pipe(data({liveLeague: LIVE_LEAGUE, previousLeagues: previousLeagues}))
    .pipe(swig())
    .pipe(gulp.dest("build"));
});

gulp.task("build", function (callback) {
  runSequence(
    "clean",
    "process-index-template",
    "process-league-templates",
    callback
  );
});

gulp.task("deploy", ["build"], function () {
  return gulp.src("./build/**/*")
    .pipe(deploy());
});
