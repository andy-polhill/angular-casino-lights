'use strict';

angular.module('lightFilters', []);

var portfolioApp = angular.module('portfolioApp', [
  'lightFilters',
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
