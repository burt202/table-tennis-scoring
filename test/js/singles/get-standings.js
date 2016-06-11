var chai = require("chai");
var expect = chai.expect;

var path = "singles/get-standings";
var getStandings = require("../../../src/js/" + path);

describe(path, function () {

  var res;
  var mockPlayers;
  var mockResults;

  beforeEach(function () {
    mockPlayers = ["Bob", "Tom", "John", "Sarah"];
    mockResults = [
      "Bob,Tom,2-0,20160606",
      "John,Bob,2-0,20160607",
      "John,Tom,2-1,20160607"
    ];

    res = getStandings(mockPlayers, mockResults)
  })

  it("should return a row for each player", function () {
    expect(res.length).to.eql(4);
  });

  it("should return how many games a player has played", function () {
    expect(res[0].name).to.eql("John");
    expect(res[0].played).to.eql(2);
  });

  it("should return how many for, a player has got", function () {
    expect(res[0].name).to.eql("John");
    expect(res[0].for).to.eql(4);
  });

  it("should return how many against, a player has got", function () {
    expect(res[0].name).to.eql("John");
    expect(res[0].against).to.eql(1);
  });

  it("should order rows by player wins", function () {
    expect(res[0].name).to.eql("John");
    expect(res[0].wins).to.eql(2);
    expect(res[1].name).to.eql("Bob");
    expect(res[1].wins).to.eql(1);
  });

  it("should take into account score diff if players have the same number of wins", function () {
    expect(res[2].name).to.eql("Sarah");
    expect(res[2].wins).to.eql(0);
    expect(res[2].diff).to.eql(0);
    expect(res[3].name).to.eql("Tom");
    expect(res[3].wins).to.eql(0);
    expect(res[3].diff).to.eql(-3);
  });
});
