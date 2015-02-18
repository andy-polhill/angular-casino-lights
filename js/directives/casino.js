'use strict';

angular.module('casino-lights')
.directive('casinoLights', ['$timeout', '$q', '$filter', 'casino.font-service',
    function($timeout, $q, $filter, fontService) {

  function link(scope, element, attrs, ctrl, transclude) {

    function animate() {
      $filter(scope.config.filter)(scope.word, frame++);
      start();
    }

    function start() {
      if(scope.config.power) {
        scope.animatePromise = $timeout(animate, scope.config.speed);
      }
    }

    function stop() {
      frame = 0;
      $timeout.cancel(scope.animatePromise);
      angular.forEach(scope.word, function(letter) {
        angular.forEach(letter.lights, function(light) {
          light.power = false;
        }, this);
      });
    }

    var frame = 0;

    scope.config = angular.extend({
      speed: 100,
      filter: 'random',
      power: true,
      letters: transclude().text(),
      font: window.getComputedStyle(element[0]).getPropertyValue('font-family').split(',')[0].replace(/"/g, '').toLowerCase(), //sorry
    }, scope.config);

    scope.word = []; //primary data structure for lights

    fontService.fetch(scope.config, function(lights) {
      return angular.forEach(scope.config.letters, function(char) {
        scope.word.push({
          char: char,
          lights: angular.copy(lights[char])
        });
      });
    });

    scope.$watch('config.filter', function() {
      if(scope.animatePromise) {
        stop();
      }
      start();
    });

    scope.$watch('config.power', function(isOn, wasOn) {
      if(isOn && !wasOn) {
        start();
      } else if (!isOn && wasOn) {
        stop();
      }
    });

    element.on('$destroy', function() {
      $timeout.cancel(scope.animatePromise);
    });
  }

  function template(){
    return [
      '<span ng-repeat="letter in word track by $index" data-content="{{letter.char}}">',
        '{{letter.char}}',
        '<i ng-repeat="light in letter.lights" class="light" ng-class="{on:light.power}"',
        '    ng-style="{\'left\':light.x + \'%\', \'bottom\':light.y + \'%\'}">',
        '</i>',
      '</span>'
    ].join('');
  }

  return {
    restrict: 'A',
    scope: {
      text: '@',
      config: '=?'
    },
    link: link,
    transclude: true,
    template: template
  };
}]);
