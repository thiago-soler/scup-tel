'use strict';

/**
 * @ngdoc function
 * @name scupTelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scupTelApp
 */
angular.module('scupTelApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var that = this;

    that.listDDD = [];

    
    $http({
	  method: 'GET',
	  url: 'http://private-fe2a-scuptel.apiary-mock.com/ddd/details'
	}).then(function successCallback(response) {
    	that.listDDD = response.data.data;
	  }, function errorCallback(response) {
    	console.log('error', response);
	  });


  });
