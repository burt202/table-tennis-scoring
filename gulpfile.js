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
var cleanCSS = require("gulp-clean-css");

var getDataForLeague = require("./src/get-data-for-league");

var LIVE_LEAGUE = "test";
var liveLeague = null;
var previousLeagues = [];

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

    if (leagueName === LIVE_LEAGUE) {
      liveLeague = {name: leagueName, displayName: leagueData.displayName};
    } else {
      previousLeagues = R.append({name: leagueName, displayName: leagueData.displayName}, previousLeagues);
    }

    return gulp.src("src/templates/league.html")
      .pipe(data(R.merge({name: leagueName}, leagueData)))
      .pipe(swig())
      .pipe(rename(leagueName + ".html"))
      .pipe(gulp.dest("build"));
  }));
});

gulp.task("process-index-template", function () {
  return gulp.src("./src/templates/index.html")
    .pipe(data({liveLeague: liveLeague, previousLeagues: previousLeagues}))
    .pipe(swig())
    .pipe(gulp.dest("build"));
});

gulp.task("minify-css", function () {
  return gulp.src("src/css/app.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("build"));
});

gulp.task("build", function (callback) {
  runSequence(
    "clean",
    "process-league-templates",
    "process-index-template",
    "minify-css",
    callback
  );
});

gulp.task("deploy", ["build"], function () {
  return gulp.src("./build/**/*")
    .pipe(deploy());
});
