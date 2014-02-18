'use strict';

angular.module('casino.filters', []);

angular.module('casino.services', []);

angular.module('casino.dependencies', []).factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

angular.module('casino', [
  'casino.filters',
  'casino.services',
  'casino.dependencies',
  'ngRoute'
]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/lights.html',
      controller: 'LightsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);
