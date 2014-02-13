'use strict';

angular.module('casino.filters', []).config(function($filterProvider, $provide) {
  // keep the original register fucntion
  var registerFn = $filterProvider.register,
      allFilters = [];

  // replace the register function with our own implementation
  $filterProvider.register = function(name, fn){
    // save the name in the array
    allFilters.push(name);
    // call the original function
    registerFn(name, fn);
  };

  // register a value to retrieve the filters
  $provide.value('filters', allFilters);
});

angular.module('casino.dependencies', []).factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

angular.module('casino', [
  'casino.filters',
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
