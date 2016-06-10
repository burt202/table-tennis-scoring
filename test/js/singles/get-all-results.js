var chai = require("chai");
var expect = chai.expect;

var getAllResults = require("../../../src/js/singles/get-all-results");

describe("Get All Results", function () {

  it("should group results by date", function () {
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "Fred,Billy,2-0,20160606",
      "John,Bob,2-0,20160607"
    ];

    var res = getAllResults(mockResults);

    expect(res).to.eql([
      {
        date: "June 7th 2016",
        results: [
          {winner: "John", loser: "Bob", score: "2-0"}
        ]
      },
      {
        date: "June 6th 2016",
        results: [
          {winner: "Bob", loser: "Tom", score: "2-0"},
          {winner: "Fred", loser: "Billy", score: "2-0"}
        ]
      }
    ]);
  });
});
