'use strict';

describe('Service: URL_API_REST', function () {

  // load the service's module
  beforeEach(module('scupTelApp'));

  // instantiate service
  var URL_API_REST;
  beforeEach(inject(function (_URL_API_REST_) {
    URL_API_REST = _URL_API_REST_;
  }));

  it('should do something', function () {
    expect(!!URL_API_REST).toBe(true);
  });

});
