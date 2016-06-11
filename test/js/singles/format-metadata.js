var chai = require("chai");
var expect = chai.expect;

var path = "singles/format-metadata";
var formatMetadata = require("../../../src/js/" + path);

describe(path, function () {

  var res;

  beforeEach(function () {
    res = formatMetadata({
      startDate: "2016-06-06",
      endDate: "2016-07-06"
    });
  })

  it("should format the startDate", function () {
    expect(res.startDate).to.eql("June 6th 2016");
  });

  it("should format the endDate", function () {
    expect(res.endDate).to.eql("July 6th 2016");
  });
});
