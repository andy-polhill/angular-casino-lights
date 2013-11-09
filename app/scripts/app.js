'use strict';

angular.module('portfolioApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/lights.html',
        controller: 'LightsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
