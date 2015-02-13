angular.module('casino-lights', []);

'use strict';

angular.module('casino-lights')
.directive('casinoLights', ['$timeout', '$q', '$filter', 'casino.font-service',
    function($timeout, $q, $filter, fontService) {

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
      letters: scope.text,
      dataPath: 'app/bower_components/angular-casino-lights/js/data/',
      font: window.getComputedStyle(element[0]).getPropertyValue('font-family').split(',')[0].toLowerCase(), //sorry
    }, scope.config);

    scope.word = []; //primary data structure for lights

    fontService.fetch(scope.config, function(lights) {
      return angular.forEach(scope.config.letters, function(char) {
        scope.word.push({
          char: char,
          lights: lights[char]
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

'use strict';

angular.module('casino-lights')
.service('casino.font-service', ['$q', '$http', '$injector', '$log', function($q, $http, $injector, $log) {

  this.fetch = function(config, callback) {
    try {
      return callback($injector.get('casino.' + config.font));
    } catch(e) {

      $log.info('Asyncronously Loading data for ' + config.font + ': Recommended that you bootstrap data into page');

      $http({
        method: 'GET',
        url: config.dataPath + config.font + '.json',
        cache: true
      })
      .success(callback)
      .error(function() {
        throw 'Font data not found for font:' + config.font +
            ',\nPlease check data file exists: http://github.com/thatguynamedandy/angular-casino-lights';
      });
    }
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
          if(isUp && light.bottom < upFrame) {
            light.power = true;
          }
          if(!isUp && light.bottom > downFrame) {
            light.power = false;
          }
        }, this);
      }, this);
    };
  }
);
