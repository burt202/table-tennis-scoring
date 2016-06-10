var chai = require("chai");
var expect = chai.expect;

var path = "singles/get-invalid-players-in-results";
var getInvalidPlayersInResults = require("../../../src/js/" + path);

describe(path, function () {

  it("should return empty array if no invalid players are found", function () {
    var mockPlayers = ["Bob", "Tom", "Fred", "Billy", "John", "Sarah"];
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "Fred,Billy,2-0,20160606",
      "John,Bob,2-0,20160607"
    ];

    var res = getInvalidPlayersInResults(mockPlayers, mockResults)

    expect(res).to.eql([]);
  });

  it("should return invalid players if any are found", function () {
    var mockPlayers = ["Bob", "Tom", "Fred", "Billy", "John", "Sarah"];
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "Fred,Billy,2-0,20160606",
      "John,Amy,2-0,20160607"
    ];

    var res = getInvalidPlayersInResults(mockPlayers, mockResults)

    expect(res).to.eql(["Amy"]);
  });

  it("should return multiple results", function () {
    var mockPlayers = ["Bob", "Tom", "Fred", "Billy", "John", "Sarah"];
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "Fred,Billy,2-0,20160606",
      "Mark,Amy,2-0,20160607"
    ];

    var res = getInvalidPlayersInResults(mockPlayers, mockResults)

    expect(res).to.eql(["Mark", "Amy"]);
  });
});
