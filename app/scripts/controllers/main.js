'use strict';

/**
 * @ngdoc function
 * @name scupTelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scupTelApp
 */
angular.module('scupTelApp')

  .controller('MainCtrl', function (apiRest, $q) {
    
    var $public = this,
        $private = {};
    
    $public.listDDD = [];
    $public.load = true;

    /**
     * Get all api data
     * @return {[type]} [description]
     */
    $private.getApiData = function () {
      
      var queue = [
          apiRest.get({filter1: 'ddd', filter2: 'pricing'}).$promise,
          apiRest.get({filter1: 'ddd', filter2: 'details'}).$promise,
          apiRest.get({filter1: 'plans'}).$promise
        ];

      $q.all(queue)
        .then(
          function(results) {
            $public.listDDD = results[1].data;
            $public.load = false;
          },
          function(results) {
            console.log('error', results);
          }
        );

    };

    $private.init = (function () {
      
      $private.getApiData();

    })();



  });
