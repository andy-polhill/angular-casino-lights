angular.module('casino-lights', []);

'use strict';

angular.module('casino-lights')
.directive('casinoLights', ['$timeout', '$q', '$filter', 'casino.font-service',
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
        '    style="left:{{light.left}};bottom:{{light.bottom}}">',
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

'use strict';

angular.module('casino-lights').
  config(function($filterProvider, $provide) {
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
  }
);

'use strict';

angular.module('casino-lights').
  filter('letter', function() {
    return function(word, frame) {

      var throttle = 8,
          mod = Math.floor((frame % (word.length * throttle)) / throttle),
          current = word[mod],
          prev = (mod > 0) ? word[mod - 1] : word[word.length - 1];

      angular.forEach(current.lights, function(light) {
        light.power = true;
      }, this);

      angular.forEach(prev.lights, function(light) {
        light.power = false;
      }, this);
    };
  }
);

'use strict';

angular.module('casino-lights').
	filter('random', function() {
		return function(word, frame) {

      //throttle filter
	    if(frame % 8 !== 0) {
				return;
			}

      angular.forEach(word, function(letter) {
        angular.forEach(letter.lights, function(light) {
          light.power = (Math.random() > 0.5) ? true : false;
        }, this);
      }, this);
		};
	}
);

'use strict';

angular.module('casino-lights').
  filter('vertical', function() {
    return function(word, frame) {

      var highest = 100,
          step = 3, //step by 3%, decrease for granularity at performance impact
          mod = frame % highest,
          isUp = Math.round(mod / highest) ? false : true,
          upFrame = mod * step,
          downFrame = highest + ((50 - mod) * step);

      angular.forEach(word, function(letter) {
        angular.forEach(letter.lights, function(light) {
          if(isUp && parseInt(light.bottom, 10) < upFrame) {
            light.power = true;
          }
          if(!isUp && parseInt(light.bottom, 10) > downFrame) {
            light.power = false;
          }
        }, this);
      }, this);
    };
  }
);

'use strict';

angular.module('casino-lights')
.service('casino.font-service', ['$q', '$http', '$injector', '$log', function($q, $http, $injector, $log) {

  this.fetch = function(font, letters, callback) {
    try {
      return callback($injector.get('casino.' + font));
    } catch(e) {

      $log.info('Asyncronously Loading data for ' + font + ': Recommended that you bootstrap data into page');

      $http({
        method: 'GET',
        url: 'bower_components/angular-casino-lights/js/data/' + font + '.json',
        cache: true
      })
      .success(callback)
      .error(function() {
        throw 'Font data not found for font:' + font +
            ',\nPlease check data file exists: http://github.com/thatguynamedandy/angular-casino-lights';
      });
    }
  };
}]);
