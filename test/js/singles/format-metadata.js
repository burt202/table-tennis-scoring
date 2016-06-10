var chai = require("chai");
var expect = chai.expect;

var formatMetadata = require("../../../src/js/singles/format-metadata");

describe("Format Metadata", function () {

  it("should format the startDate", function () {
    var res = formatMetadata({startDate: "2016-06-06"})

    expect(res.startDate).to.eql("June 6th 2016");
  });

  it("should format the endDate", function () {
    var res = formatMetadata({endDate: "2016-06-06"})

    expect(res.endDate).to.eql("June 6th 2016");
  });
});
