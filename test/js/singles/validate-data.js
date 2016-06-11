var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

var path = "singles/validate-data";
var validateData = require("../../../src/js/" + path);

describe(path, function () {

  var mockValidators;
  var getInvalidPlayersInResultsStub;
  var getDuplicateResultsStub;

  beforeEach(function () {
    getInvalidPlayersInResultsStub = sinon.stub();
    getDuplicateResultsStub = sinon.stub();

    mockValidators = {
      getInvalidPlayersInResults: getInvalidPlayersInResultsStub,
      getDuplicateResults: getDuplicateResultsStub
    };
  });

  afterEach(function () {
    getInvalidPlayersInResultsStub.reset();
    getDuplicateResultsStub.reset();
  })

  it("should call all validators", function () {
    getInvalidPlayersInResultsStub.returns([]);
    getDuplicateResultsStub.returns([]);
    validateData(mockValidators, [], []);

    expect(getInvalidPlayersInResultsStub).to.have.been.calledOnce;
    expect(getDuplicateResultsStub).to.have.been.calledOnce;
  });

  it("should return empty array when no errors are found", function () {
    getInvalidPlayersInResultsStub.returns([]);
    getDuplicateResultsStub.returns([]);
    var res = validateData(mockValidators, [], []);

    expect(res).to.eql([]);
  });

  it("should return any errors from getInvalidPlayersInResults validator", function () {
    getInvalidPlayersInResultsStub.returns(["Fred"]);
    getDuplicateResultsStub.returns([]);
    var res = validateData(mockValidators, [], []);

    expect(res).to.eql([
      "Player 'Fred' in result doesnt exist"
    ]);
  });

  it("should return any errors from getDuplicateResults validator", function () {
    getInvalidPlayersInResultsStub.returns([]);
    getDuplicateResultsStub.returns(["Tom,Bob"]);
    var res = validateData(mockValidators, [], []);

    expect(res).to.eql([
      "Duplicate result found for combination 'Tom,Bob'"
    ]);
  });

  it("should return multiple errors", function () {
    getInvalidPlayersInResultsStub.returns(["Fred"]);
    getDuplicateResultsStub.returns(["Tom,Bob"]);
    var res = validateData(mockValidators, [], []);

    expect(res.length).to.eql(2);
  });
});
