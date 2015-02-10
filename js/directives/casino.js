'use strict';

angular.module('casino-lights')
.directive('casino-lights', ['$timeout', '$q', '$filter', 'casino.font-service',
    function($timeout, $q, $filter, fontService) {

  var text; //original dom node text

  //TODO: Refactor link method as it's slightly large
  function link(scope, element) {

    function animate() {
      $filter(scope.config.filter)(scope.word, frame++);
      start();
    }

    function start() {
      if(scope.config.on) {
        scope.animatePromise = $timeout(animate,
          (scope.config.speed.max + scope.config.speed.min) - scope.config.speed.current);
      }
    }

    var letters = text.split(''),
        font = window.getComputedStyle(element[0]).getPropertyValue('font-family').split(',')[0].toLowerCase(), //sorry
        frame = 0;

    scope.config = angular.extend({
      speed : {
	      min: 50,
			  max: 200,
        current: 100
		  },
      filter: 'vertical'
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

    scope.$watch('config.on', function(newValue, oldValue) {
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

    text = elem.text();

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
      config: '='
    },
    link: link,
    template: template
  };
}]);
