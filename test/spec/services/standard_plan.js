'use strict';

describe('Service: STANDARD_PLAN', function () {

  // load the service's module
  beforeEach(module('scupTelApp'));

  // instantiate service
  var STANDARD_PLAN;
  beforeEach(inject(function (_STANDARD_PLAN_) {
    STANDARD_PLAN = _STANDARD_PLAN_;
  }));

  it('should do something', function () {
    expect(!!STANDARD_PLAN).toBe(true);
  });

});
