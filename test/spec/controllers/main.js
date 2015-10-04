'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('scupTelApp'));

  var MainCtrl,
    $scope,
    ctrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    
    $scope = $rootScope.$new();
    ctrl = $scope;

    MainCtrl = $controller('MainCtrl as ctrl', {
      $scope: $scope
    });

  }));

  it('calcPrices - Testa funcao que realiza o calculo dos planos', function () {
    
    expect(MainCtrl.calcPrices()).toEqual({});

    // console.log(MainCtrl.calcPrices());

  });
});
