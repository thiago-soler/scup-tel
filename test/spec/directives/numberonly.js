'use strict';

describe('Directive: numberOnly', function () {

  // load the directive's module
  beforeEach(module('scupTelApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<number-only></number-only>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the numberOnly directive');
  }));
});
