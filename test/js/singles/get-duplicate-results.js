var chai = require("chai");
var expect = chai.expect;

var getDuplicateResults = require("../../../src/js/singles/get-duplicate-results");

describe("Get Duplicate Results", function () {

  it("should return empty array when there are no duplicates", function () {
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "John,Bob,2-0,20160607"
    ];

    var res = getDuplicateResults(mockResults);

    expect(res).to.eql([]);
  });

  it("should return player combo if duplicates are found", function () {
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "John,Bob,2-0,20160607",
      "Bob,Tom,2-0,20160607"
    ];

    var res = getDuplicateResults(mockResults);

    expect(res).to.eql(["Bob,Tom"]);
  });

  it("should return player combo if reverse duplicates are found", function () {
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "John,Bob,2-0,20160607",
      "Tom,Bob,2-0,20160607"
    ];

    var res = getDuplicateResults(mockResults);

    expect(res).to.eql(["Bob,Tom"]);
  });

  it("should return multiple results", function () {
    var mockResults = [
      "Bob,Tom,2-0,20160606",
      "John,Bob,2-0,20160607",
      "Tom,Bob,2-0,20160607",
      "John,Bob,2-0,20160608"
    ];

    var res = getDuplicateResults(mockResults);

    expect(res).to.eql(["Bob,Tom", "Bob,John"]);
  });
});
