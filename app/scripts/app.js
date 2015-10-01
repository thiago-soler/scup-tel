'use strict';

/**
 * @ngdoc overview
 * @name scupTelApp
 * @description
 * # scupTelApp
 *
 * Main module of the application.
 */
angular
  .module('scupTelApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])
  .config(function ($routeProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('orange');
  });
