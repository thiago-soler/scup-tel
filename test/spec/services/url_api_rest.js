'use strict';

describe('Service: URLAPIREST', function () {

  // load the service's module
  beforeEach(module('scupTelApp'));

  // instantiate service
  var URLAPIREST;
  beforeEach(inject(function (_URLAPIREST_) {
    URLAPIREST = _URLAPIREST_;
  }));

  it('should do something', function () {
    expect(!!URLAPIREST).toBe(true);
  });

});
