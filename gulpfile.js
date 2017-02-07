var gulp = require("gulp");
var rename = require("gulp-rename");
var runSequence = require("run-sequence");
var clean = require("gulp-clean");
var deploy = require("gulp-gh-pages");
var es = require("event-stream");
var nunjucks = require("gulp-nunjucks");
var data = require("gulp-data");
var R = require("ramda");
var cleanCSS = require("gulp-clean-css");
var gulpWebpack = require("gulp-webpack");
var webpack = require("webpack");

var basePath = __dirname + "/leagues";
var leagues = require("./src/js/get-leagues")(basePath);
var getDataForLeague = require("./src/js/get-data-for-league")(basePath);

gulp.task("default", ["watch"]);

gulp.task("watch", function () {
  gulp.watch("src/**", ["build"]);
});

gulp.task("clean", function () {
  return gulp.src("build")
    .pipe(clean());
});

gulp.task("process-league-templates", function () {
  return es.merge(leagues.all.map(function (league) {
    var leagueData = getDataForLeague(league.name, league.meta);

    return gulp.src("src/templates/" + leagueData.type + ".html")
      .pipe(data(R.merge(league, leagueData)))
      .pipe(nunjucks.compile())
      .pipe(rename(league.name + ".html"))
      .pipe(gulp.dest("build"));
  }));
});

gulp.task("process-index-template", function () {
  return gulp.src("./src/templates/index.html")
    .pipe(data({liveLeague: leagues.live, previousLeagues: leagues.previous, lastModified: new Date().toISOString()}))
    .pipe(nunjucks.compile())
    .pipe(gulp.dest("build"));
});

gulp.task("minify-css", function () {
  return gulp.src("src/css/app.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("build"));
});

gulp.task("webpack", function () {
  return gulp.src("src/js/app.js")
    .pipe(gulpWebpack({
      output: {
        filename: "app.js"
      },
      plugins: [new webpack.optimize.UglifyJsPlugin()]
    }, webpack))
    .pipe(gulp.dest("build"));
});

gulp.task("build", function (callback) {
  if (!leagues.all.length) return;

  runSequence(
    "clean",
    "process-league-templates",
    "process-index-template",
    "minify-css",
    "webpack",
    callback
  );
});

gulp.task("deploy", ["build"], function () {
  return gulp.src("./build/**/*")
    .pipe(deploy());
});
