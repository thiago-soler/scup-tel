'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('scupTelApp'));

  var scope,
      createController,
      priceList = {total: 6, data: [{origin: '011', destiny: '016', price: '1.90'}, {origin: '016', destiny: '011', price: '2.90'}, {origin: '011', destiny: '017', price: '1.70'}, {origin: '017', destiny: '011', price: '2.70'}, {origin: '011', destiny: '018', price: '0.90'}, {origin: '018', destiny: '011', price: '1.90'}]},
      plansList = {total: 3, data: [{plan: 'FaleMais 30', time: '30'}, {plan: 'FaleMais 60', time: '60'}, {plan: 'FaleMais 120', time: '120'}]},
      STANDARD_PLAN;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _STANDARD_PLAN_) {
    
    scope = $rootScope.$new();

    STANDARD_PLAN = _STANDARD_PLAN_;

    createController = function() {
        return $controller('MainCtrl', {
            '$scope': scope
        });
    };

  }));

  it('getApiData - Inicializa a aplicacao', function () {
    
    var controller = createController();

    controller.getApiData();

  });

  it('createPlansListPrint - Cria lista no escopo para exbir valores dos planos calculados', function () {

    var controller = createController();

    priceList = controller.formatPriceList(priceList.data);

    plansList = plansList.data;
    
    // Adding the standard plan
    plansList.push({plan: 'Normal',time: STANDARD_PLAN.toString()});

    expect(controller.createPlansListPrint()).toEqual({});
    
    expect(controller.createPlansListPrint(plansList)).toEqual(jasmine.objectContaining({
      '30' : jasmine.any(Object),
      '60' : jasmine.any(Object),
      '120' : jasmine.any(Object),
      '999999' : jasmine.any(Object)
    }));

  });

  it('calcPrices - Testa retorno da funcao de calculo dos planos quando os dados do backend nao sao enviados', function () {
    
    var controller = createController();

    expect(controller.calcPrices()).toEqual({});

  });

  it('calcPrices - Verifica o formato minimo esperado no retorno de uma requisisao valida de um plano que existe', function () {
    
    var controller = createController(),
        prices;

    scope.form = {};
    scope.form.origin = '011';
    scope.form.destination = '016';
    scope.form.time = '200';


    prices = controller.calcPrices(plansList, priceList, scope);

    expect(prices).toEqual(jasmine.objectContaining({
      '30' : jasmine.any(Object),
      '60' : jasmine.any(Object),
      '120' : jasmine.any(Object),
      '999999' : jasmine.any(Object)
    }));

  });

  it('calcPrices - Verifica o formato minimo esperado no retorno de uma requisisao valida de um plano que nao existe', function () {
    
     var controller = createController(),
        prices;

    scope.form = {};
    scope.form.origin = '016';
    scope.form.destination = '016';
    scope.form.time = '200';

    prices = controller.calcPrices(plansList, priceList, scope);

    expect(prices['30']).toEqual(jasmine.objectContaining({
      value : '-',
      currency : '',
      integer : '-',
      decimal : ''
    }));

  });

  it('calcPrices - Verifica o retorno caso o plano informado nao cobre valores adicionais', function () {
    
     var controller = createController(),
        prices;

    scope.form = {};
    scope.form.origin = '011';
    scope.form.destination = '016';
    scope.form.time = '20';

    prices = controller.calcPrices(plansList, priceList, scope);

    expect(prices['30']).toEqual(jasmine.objectContaining({
      value : 0,
      currency : 'R$',
      integer : '0',
      decimal : ',00'
    }));

    expect(prices['60']).toEqual(jasmine.objectContaining({
      value : 0,
      currency : 'R$',
      integer : '0',
      decimal : ',00'
    }));

    expect(prices['120']).toEqual(jasmine.objectContaining({
      value : 0,
      currency : 'R$',
      integer : '0',
      decimal : ',00'
    }));

  });

  it('refreshData - Atualiza tabela de precos na tela quando o usuario atualiza os campos', function () {

    var controller = createController();
    
    scope.form = {};
    scope.form.origin = '011';
    scope.form.destination = '016';
    scope.form.time = '200';

    controller.plansList = plansList;
    controller.priceList = priceList;
    controller.plansListPrint = controller.createPlansListPrint(plansList);

    expect(controller.refreshData(controller, scope)).toBe(true);
    
  });

  it('refreshData - Atualiza tabela de precos na tela quando o usuario atualiza os campos', function () {

    var controller = createController();

    scope.form = {};
    scope.form.origin = '011';
    scope.form.destination = '016';
    scope.form.time = '200';
    
    expect(controller.refreshData()).toBe(false);
    
  });

});
