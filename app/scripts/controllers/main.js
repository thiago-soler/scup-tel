'use strict';

/**
 * @ngdoc function
 * @name scupTelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scupTelApp
 */
angular.module('scupTelApp')

  .controller('MainCtrl', function ($scope, apiRest, $q, STANDARD_PLAN) {
    
    $scope.awesomeThings = ['', '', ''];
    var $public = this,
        $private = {};
    
    $public.dddList = [];
    $public.plansList = [];
    $public.plansListPrint = [];
    $public.priceList = [];
    $public.load = true;
    $public.error = false;
    
    $private.consultPriceList = [];
    
    /**
     * Calculates price of plans
     * @param  {objec} plansList Object plans
     * @param  {object} priceList Object price
     * @return {object} prices Object with price of plans calculated {value: 100.94, currency:'R$', integer: 100, decimal: ',94'}
     */
    $public.calcPrices = function (plansList, priceList, scope) {

      scope = scope || {form: {}};

      var dddOrigin = scope.form.origin,
          dddDestination = scope.form.destination,
          newTime = scope.form.time,
          idx,
          prices = {};
      
      if (typeof dddOrigin === 'undefined' || typeof dddDestination === 'undefined' || typeof newTime === 'undefined') {
        return prices;
      }

      newTime = parseInt(newTime);

      // This loop was designed to support adding and removing plans
      for (idx in plansList) {

        var planTime = plansList[idx].time;

        if (typeof priceList[dddOrigin][dddDestination] === 'number') {

          var price = priceList[dddOrigin][dddDestination],
              calc = 0,
              calcTime = 0,
              valueSplit = '',
              integer = '',
              decimal = '';

          // Calculates additional values
          if (newTime > parseInt(planTime) && parseInt(planTime) !== STANDARD_PLAN) {

            price = price + (price * 0.1);

            calcTime = newTime - parseInt(planTime);


          } else if(parseInt(planTime) === STANDARD_PLAN) {
            
            price = priceList[dddOrigin][dddDestination];
            
            calcTime = newTime;

          } else {
            
            price = 0;

          }
          
          calc = (calcTime * price).toFixed(2);

          valueSplit = calc.split('.');

          integer = valueSplit[0];
          decimal = valueSplit[1];

          calc = parseFloat(calc);

          prices[planTime] = {value: calc, currency:'R$', integer: integer, decimal: ',' + decimal};

        } else {
          
          prices[planTime] = {value: '-', currency:'', integer: '-', decimal: ''};

        }

      }

      return prices;

    };

    $public.createPlansListPrint = function (plansList) {

      var listPrint = {},
          idx = {},
          data = {};

      for (idx in plansList) {

        var tplData = {
            title: '',
            time: '',
            price: {
              currency: '',
              integer: '-',
              decimal: ''
            }
          };

        data = plansList[idx];

        tplData.title = data.plan;
        tplData.time = data.time;

        listPrint[data.time] = tplData;
      }

      return listPrint;

    };

    $public.formatPriceList = function (priceList) {
      var idx,
          formattedList = {},
          temp;

      for (idx in priceList) {
        
        if ( typeof formattedList[priceList[idx].origin] === 'undefined') {
          
          temp = {};

          temp[priceList[idx].destiny] = parseFloat(priceList[idx].price);

          formattedList[priceList[idx].origin] = temp;

        } else {

          formattedList[priceList[idx].origin][priceList[idx].destiny] = parseFloat(priceList[idx].price);

        }

      }

      return formattedList;

    };

    $public.refreshData = function (self, scope) {

      scope = $scope || scope;
      self = $public || self;

      var prices = self.calcPrices(self.plansList, self.priceList, scope),
          idx,
          result = false;

      for(idx in prices){

        self.plansListPrint[idx].price.currency = prices[idx].currency;
        self.plansListPrint[idx].price.integer = prices[idx].integer;
        self.plansListPrint[idx].price.decimal = prices[idx].decimal;

        result = true;

      }

      return result;

    };

    /**
     * Get all api data
     * @return {[type]} [description]
     */
    $public.getApiData = function () {
      
      // Creates a queue to get all data of the API REST
      var queue = [
          apiRest.get({filter1: 'ddd', filter2: 'pricing'}).$promise,
          apiRest.get({filter1: 'ddd', filter2: 'details'}).$promise,
          apiRest.get({filter1: 'plans'}).$promise
        ];

      $q.all(queue)
        .then(
          function(results) {
            
            $public.priceList = $public.formatPriceList(results[0].data);
            $public.dddList = results[1].data;
            $public.plansList = results[2].data;

            // Adding the standard plan
            $public.plansList.push({plan: 'Normal',time: STANDARD_PLAN.toString()});

            $public.plansListPrint = $public.createPlansListPrint($public.plansList);

            $public.load = false;

          },
          function(results) {
            console.log('error', results);
            $public.error = true;
          }
        );

    };

    $private.init = (function () {
      
      $public.getApiData();

    })();

  });
