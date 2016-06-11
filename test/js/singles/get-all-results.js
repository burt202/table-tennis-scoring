var chai = require("chai");
var expect = chai.expect;

var path = "singles/get-all-results";
var getAllResults = require("../../../src/js/" + path);

describe(path, function () {

  var res;

  beforeEach(function () {
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "Fred,Billy,2-0,20160606",
      "John,Bob,2-0,20160607"
    ];

    res = getAllResults(mockResults);
  })

  it("should group results by date", function () {
    expect(res.length).to.eql(2);
  });

  it("should format the date in each group", function () {
    expect(res[0].date).to.eql("June 7th 2016");
    expect(res[1].date).to.eql("June 6th 2016");
  });

  it("should list the results in each group", function () {
    expect(res[0].results).to.eql([
      {winner: "John", loser: "Bob", score: "2-0"}
    ]);

    expect(res[1].results).to.eql([
      {winner: "Bob", loser: "Tom", score: "2-0"},
      {winner: "Fred", loser: "Billy", score: "2-0"}
    ]);
  });
});
