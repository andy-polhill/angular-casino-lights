'use strict';

angular.module('casino-demo', [
  'casino-lights'
])
.controller('CasinoDemoBasic', ['$scope', function(scope) {
  $scope.tab = 'output';
}])
.controller('CasinoDemoControl', ['$scope', function(scope) {
  scope.config = {
    speed: 60,
    filter: 'letter',
    power: true,
    dataPath: 'app/bower_components/angular-casino-lights/js/data/'
  };

  scope.tab = 'output';
}])
.controller('CasinoDemoWinner', ['$scope', function(scope) {
  scope.config = {
    speed: 20,
    power: false,
    dataPath: 'app/bower_components/angular-casino-lights/js/data/'
  };

  scope.code ='';

  scope.$watch('code', function(newValue, oldValue) {
    if(newValue.toLowerCase() === 'andy') {
      scope.config.power = true;
    } else {
      scope.config.power = false;
    }
  });

  scope.tab = 'output';
}]);
