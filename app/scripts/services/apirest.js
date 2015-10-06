'use strict';

/**
 * @ngdoc service
 * @name scupTelApp.apiRest
 * @description
 * # apiRest
 * Factory in the scupTelApp.
 */
angular.module('scupTelApp')
  .factory('apiRest', function ($resource, URL_API_REST) {
    return $resource(URL_API_REST+'/:filter1/:filter2', {filter1: '@filter1', filter2: '@filter2'});
  });