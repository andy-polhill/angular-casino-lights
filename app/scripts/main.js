'use strict';

angular.module('casino-demo', [
  'casino-lights'
]).controller('CasinoDemo', ['$scope', function($scope) {
  $scope.config = {
    speed: 100,
    filter: 'letter',
    power: true
  }
}]);
