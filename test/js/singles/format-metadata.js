var chai = require("chai");
var expect = chai.expect;

var path = "singles/format-metadata";
var formatMetadata = require("../../../src/js/" + path);

describe(path, function () {

  it("should format the startDate", function () {
    var res = formatMetadata({startDate: "2016-06-06"})

    expect(res.startDate).to.eql("June 6th 2016");
  });

  it("should format the endDate", function () {
    var res = formatMetadata({endDate: "2016-06-06"})

    expect(res.endDate).to.eql("June 6th 2016");
  });
});
