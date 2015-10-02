'use strict';

describe('Service: STANDARDPLAN', function () {

  // load the service's module
  beforeEach(module('scupTelApp'));

  // instantiate service
  var STANDARDPLAN;
  beforeEach(inject(function (_STANDARDPLAN_) {
    STANDARDPLAN = _STANDARDPLAN_;
  }));

  it('should do something', function () {
    expect(!!STANDARDPLAN).toBe(true);
  });

});
