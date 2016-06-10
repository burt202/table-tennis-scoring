var chai = require("chai");
var expect = chai.expect;

var path = "singles/get-player-breakdowns";
var getPlayerBreakdowns = require("../../../src/js/" + path);

describe(path, function () {

  it("should return a breakdown for every player, even ones who havent played any games yet", function () {
    var mockPlayers = ["Bob", "Tom", "John", "Sarah"];
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "John,Bob,2-0,20160607"
    ];

    var res = getPlayerBreakdowns(mockPlayers, mockResults)

    expect(res.length).to.eql(4);
    expect(res[0].name).to.eql("Bob");
    expect(res[1].name).to.eql("Tom");
    expect(res[2].name).to.eql("John");
    expect(res[3].name).to.eql("Sarah");
  });

  it("should return an empty array for 'yetToPlay' prop if a player has played all their games", function () {
    var mockPlayers = ["Bob", "Tom", "John"];
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "John,Bob,2-0,20160607"
    ];

    var res = getPlayerBreakdowns(mockPlayers, mockResults)

    expect(res[0].name).to.eql("Bob");
    expect(res[0].yetToPlay).to.eql([]);
  });

  it("should return an empty array for 'results' prop if a player hasnt played any games yet", function () {
    var mockPlayers = ["Bob", "Tom", "John", "Sarah"];
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "John,Bob,2-0,20160607"
    ];

    var res = getPlayerBreakdowns(mockPlayers, mockResults)

    expect(res[3].name).to.eql("Sarah");
    expect(res[3].results).to.eql([]);
  });

  it("should list results for a player", function () {
    var mockPlayers = ["Bob", "Tom", "John", "Sarah"];
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "John,Bob,2-0,20160607"
    ];

    var res = getPlayerBreakdowns(mockPlayers, mockResults)

    expect(res[1].name).to.eql("Tom");
    expect(res[1].results).to.eql([
      {winner: "Bob", loser: "Tom", score: "2-0"}
    ]);
  });

  it("should list remaining fixtures for a player", function () {
    var mockPlayers = ["Bob", "Tom", "John", "Sarah"];
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "John,Bob,2-0,20160607"
    ];

    var res = getPlayerBreakdowns(mockPlayers, mockResults)

    expect(res[1].name).to.eql("Tom");
    expect(res[1].yetToPlay).to.eql(["John", "Sarah"]);
  });
});
