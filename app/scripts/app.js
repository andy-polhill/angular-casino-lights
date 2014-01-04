'use strict';

var portfolioApp = angular.module('portfolioApp', [
  'portfolioFilters',
  'ngRoute'
])

portfolioApp.config(['$routeProvider',
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
