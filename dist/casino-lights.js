angular.module('casino-lights', []);

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
        '    ng-style="{\'left\':light.left + \'%\', \'bottom\':light.bottom + \'%\'}">',
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

'use strict';

angular.module('casino-lights').
  config(['$filterProvider', '$provide', function($filterProvider, $provide) {
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
]);

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

'use strict';

angular.module('casino-lights')
.service('casino.font-service', ['$q', '$injector', function($q, $injector) {

  this.fetch = function(config, callback) {
    try {
      return callback($injector.get('casino.' + config.font));
    } catch(e) {
      throw 'Font data not found for font:' + config.font +
          ',\nPlease check data file exists: http://github.com/thatguynamedandy/angular-casino-lights';
    }
  };
}]);

'use strict';

angular.module('casino-lights')
  .factory('casino.raleway', function() {
    return {
      'A':[
        {'bottom':32, 'left':50},
        {'bottom':32, 'left':24},
        {'bottom':32, 'left':76},
        {'bottom':52, 'left':31},
        {'bottom':52, 'left':69},
        {'bottom':12, 'left':16},
        {'bottom':12, 'left':84},
        {'bottom':71, 'left':38},
        {'bottom':71, 'left':62},
        {'bottom':90, 'left':50}
      ],
      'B':[],
      'C':[
        {'bottom':50, 'left':16},
        {'bottom':8, 'left':55},
        {'bottom':93, 'left':55},

        {'bottom':30, 'left':20},
        {'bottom':16, 'left':33},
        {'bottom':16, 'left':78},
        {'bottom':84, 'left':78},

        {'bottom':70, 'left':20},
        {'bottom':86, 'left':33}
      ],
      'D':[],
      'E':[],
      'F':[],
      'G':[],
      'H':[],
      'I':[
        {'bottom':10, 'left':50},
        {'bottom':30, 'left':50},
        {'bottom':50, 'left':50},
        {'bottom':70, 'left':50},
        {'bottom':90, 'left':50}
      ],
      'J':[],
      'K':[],
      'L':[],
      'M':[],
      'N':[
        {'bottom':10, 'left':18},
        {'bottom':30, 'left':18},
        {'bottom':50, 'left':18},
        {'bottom':70, 'left':18},
        {'bottom':90, 'left':18},
        {'bottom':30, 'left':65},
        {'bottom':50, 'left':50},
        {'bottom':70, 'left':36},
        {'bottom':10, 'left':82},
        {'bottom':30, 'left':82},
        {'bottom':50, 'left':82},
        {'bottom':70, 'left':82},
        {'bottom':90, 'left':82}
      ],
      'O':[
        {'bottom':8, 'left':50},
        {'bottom':14, 'left':31},
        {'bottom':30, 'left':18},
        {'bottom':50, 'left':14},
        {'bottom':70, 'left':18},
        {'bottom':86, 'left':30},
        {'bottom':92, 'left':50},
        {'bottom':14, 'left':69},
        {'bottom':30, 'left':82},
        {'bottom':50, 'left':86},
        {'bottom':70, 'left':82},
        {'bottom':86, 'left':70}
      ],
      'P':[],
      'Q':[],
      'R':[],
      'S':[
        {'bottom':13, 'left':23},
        {'bottom':7, 'left':50},
        {'bottom':50, 'left':50},
        {'bottom':93, 'left':50},
        {'bottom':88, 'left':74},
        {'bottom':84, 'left':23},
        {'bottom':60, 'left':24},
        {'bottom':16, 'left':77},
        {'bottom':40, 'left':78}
      ],
      'T':[],
      'U':[],
      'V':[],
      'W':[],
      'X':[],
      'Y':[],
      'Z':[]
    };
  });
