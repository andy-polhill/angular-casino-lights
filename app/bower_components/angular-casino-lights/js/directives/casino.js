'use strict';

angular.module('casino-lights')
.directive('casinoLights', ['$timeout', '$q', '$filter', 'casino.font-service',
    function($timeout, $q, $filter, fontService) {

  //TODO: Refactor link method as it's slightly large
  function link(scope, element) {

    function animate() {
      $filter(scope.config.filter)(scope.word, frame++);
      start();
    }

    function start() {
      if(scope.config.power) {
        scope.animatePromise = $timeout(animate, scope.config.speed);
      }
    }

    var letters = scope.text,
        font = window.getComputedStyle(element[0]).getPropertyValue('font-family').split(',')[0].toLowerCase(), //sorry
        frame = 0;

    scope.config = angular.extend({
      speed: 100,
      filter: 'random',
      power: true
    }, scope.config);

    scope.word = []; //primary data structure for lights

    fontService.fetch(font, letters, function(lights) {
      return angular.forEach(letters, function(char) {
        scope.word.push({
          char: char,
          lights: lights[char]
        });
      });
    });

    scope.$watch('config.power', function(newValue, oldValue) {
      if(newValue === true && oldValue === false) { //from off to on
        start();
      }
    });

    element.on('$destroy', function() {
      $timeout.cancel(scope.animatePromise);
    });

    start();
  }

  function template(elem){

    return [
      '<span ng-repeat="letter in word track by $index" data-content="{{letter.char}}">',
        '{{letter.char}}',
        '<i ng-repeat="light in letter.lights" class="light" ng-class="{on:light.power}"',
        '    style="left:{{light.left}}%;bottom:{{light.bottom}}%">',
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
    template: template
  };
}]);
