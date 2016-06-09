var R = require("ramda");
var fs = require("fs");

module.exports = function (basePath) {
  var leagueNames = R.without([".gitkeep", "LIVE_LEAGUE"], fs.readdirSync(basePath));

  var allLeagues = leagueNames.map(function (name) {
    var leaguePath = basePath + "/" + name;
    var metaData = JSON.parse(fs.readFileSync(leaguePath + "/meta", "utf8"));
    return {name: name, displayName: metaData.displayName, meta: metaData};
  });

  var liveLeagueName;

  try {
    liveLeagueName = fs.readFileSync(basePath + "/LIVE_LEAGUE");
  } catch (e) {
    liveLeagueName = null;
  }

  var liveLeague = R.find(R.propEq("name", liveLeagueName))(allLeagues);
  if (!liveLeague && allLeagues.length) liveLeague = R.head(allLeagues);

  var previousLeagues = allLeagues;
  if (liveLeague) previousLeagues = R.reject(R.propEq("name", liveLeague.name), allLeagues);

  return {
    all: allLeagues,
    live: liveLeague,
    previous: previousLeagues
  };
}
