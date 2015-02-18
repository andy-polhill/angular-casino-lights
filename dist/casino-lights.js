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
          if(isUp && light.y < upFrame) {
            light.power = true;
          }
          if(!isUp && light.y > downFrame) {
            light.power = false;
          }
        }, this);
      }, this);
    };
  }
);

'use strict';

angular.module('casino-lights')
  .factory('casino.raleway', function() {
    return {
      'A':[
        {'y':32, 'x':50},
        {'y':32, 'x':24},
        {'y':32, 'x':76},
        {'y':52, 'x':31},
        {'y':52, 'x':69},
        {'y':12, 'x':16},
        {'y':12, 'x':84},
        {'y':71, 'x':38},
        {'y':71, 'x':62},
        {'y':90, 'x':50}
      ],
      'B':[
        {'y':9, 'x':20},
        {'y':29, 'x':20},
        {'y':52, 'x':20},
        {'y':71, 'x':20},
        {'y':92, 'x':20},

        {'y':9, 'x':40},
        {'y':9, 'x':60},
        {'y':15, 'x':80},
        {'y':35, 'x':83},

        {'y':92, 'x':40},
        {'y':92, 'x':60},
        {'y':85, 'x':80},
        {'y':65, 'x':78},

        {'y':52, 'x':40},
        {'y':52, 'x':60}
      ],
      'C':[
        {'y':50, 'x':16},
        {'y':9, 'x':55},
        {'y':93, 'x':55},

        {'y':30, 'x':20},
        {'y':16, 'x':33},
        {'y':16, 'x':78},
        {'y':84, 'x':78},

        {'y':70, 'x':20},
        {'y':86, 'x':33}
      ],
      'D':[
        {'y':9, 'x':20},
        {'y':29, 'x':20},
        {'y':52, 'x':20},
        {'y':71, 'x':20},
        {'y':92, 'x':20},

        {'y':9, 'x':40},
        {'y':10, 'x':60},
        {'y':22, 'x':76},

        {'y':92, 'x':40},
        {'y':90, 'x':60},
        {'y':78, 'x':76},

        {'y':40, 'x':85},
        {'y':60, 'x':85}
      ],
      'E':[
        {'y':9, 'x':23},
        {'y':29, 'x':23},
        {'y':52, 'x':23},
        {'y':71, 'x':23},
        {'y':92, 'x':23},

        {'y':9, 'x':43},
        {'y':9, 'x':63},
        {'y':9, 'x':82},

        {'y':92, 'x':43},
        {'y':92, 'x':63},
        {'y':92, 'x':82},

        {'y':52, 'x':47},
        {'y':52, 'x':69}
      ],
      'F':[
        {'y':9, 'x':24},
        {'y':29, 'x':24},
        {'y':51, 'x':24},
        {'y':71, 'x':24},
        {'y':92, 'x':24},

        {'y':92, 'x':43},
        {'y':92, 'x':63},
        {'y':92, 'x':82},

        {'y':51, 'x':47},
        {'y':51, 'x':69}
      ],
      'G':[
        {'y':50, 'x':15},
        {'y':9, 'x':54},
        {'y':93, 'x':54},

        {'y':30, 'x':19},
        {'y':16, 'x':32},
        {'y':84, 'x':77},

        {'y':72, 'x':16},
        {'y':86, 'x':32},
        {'y':16, 'x':72},
        {'y':9, 'x':86},
        {'y':28, 'x':86},
        {'y':46, 'x':86},
        {'y':46, 'x':68},
      ],
      'H':[
        {'y':9, 'x':19},
        {'y':30, 'x':19},
        {'y':52, 'x':19},
        {'y':72, 'x':19},
        {'y':92, 'x':19},
        {'y':9, 'x':81},

        {'y':30, 'x':81},
        {'y':52, 'x':81},
        {'y':72, 'x':81},
        {'y':92, 'x':81},

        {'y':52, 'x':39},
        {'y':52, 'x':59},
      ],
      'I':[
        {'y':9, 'x':50},
        {'y':30, 'x':50},
        {'y':50, 'x':50},
        {'y':70, 'x':50},
        {'y':90, 'x':50}
      ],
      'J':[
        {'y':12, 'x':56},
        {'y':9, 'x':24},
        {'y':30, 'x':72},
        {'y':50, 'x':72},
        {'y':70, 'x':72},
        {'y':90, 'x':72}
      ],
      'K':[
        {'y':9, 'x':20},
        {'y':30, 'x':20},
        {'y':50, 'x':20},
        {'y':70, 'x':20},
        {'y':90, 'x':20},
        {'y':55, 'x':47},
        {'y':73, 'x':63},
        {'y':90, 'x':78},
        {'y':39, 'x':62},
        {'y':23, 'x':74},
        {'y':9, 'x':85}
      ],
      'L':[
        {'y':9, 'x':24},
        {'y':29, 'x':24},
        {'y':52, 'x':24},
        {'y':71, 'x':24},
        {'y':92, 'x':24},

        {'y':9, 'x':43},
        {'y':9, 'x':63},
        {'y':9, 'x':82},

      ],
      'M':[
        {'y':9, 'x':17},
        {'y':29, 'x':17},
        {'y':52, 'x':17},
        {'y':71, 'x':17},
        {'y':92, 'x':17},

        {'y':71, 'x':30},
        {'y':51, 'x':39},

        {'y':71, 'x':69},
        {'y':51, 'x':61},
        {'y':31, 'x':50},

        {'y':9, 'x':83},
        {'y':29, 'x':83},
        {'y':52, 'x':83},
        {'y':71, 'x':83},
        {'y':92, 'x':83}

      ],
      'N':[
        {'y':9, 'x':18},
        {'y':30, 'x':18},
        {'y':50, 'x':18},
        {'y':70, 'x':18},
        {'y':90, 'x':18},
        {'y':30, 'x':65},
        {'y':50, 'x':50},
        {'y':70, 'x':36},
        {'y':9, 'x':82},
        {'y':30, 'x':82},
        {'y':50, 'x':82},
        {'y':70, 'x':82},
        {'y':90, 'x':82}
      ],
      'O':[
        {'y':9, 'x':50},
        {'y':14, 'x':31},
        {'y':30, 'x':18},
        {'y':50, 'x':14},
        {'y':70, 'x':18},
        {'y':86, 'x':30},
        {'y':92, 'x':50},
        {'y':14, 'x':69},
        {'y':30, 'x':82},
        {'y':50, 'x':86},
        {'y':70, 'x':82},
        {'y':86, 'x':70}
      ],
      'P':[
        {'y':9, 'x':22},
        {'y':29, 'x':22},
        {'y':52, 'x':22},
        {'y':71, 'x':22},
        {'y':92, 'x':22},
        {'y':92, 'x':42},
        {'y':92, 'x':62},
        {'y':85, 'x':79},
        {'y':68, 'x':84},
        {'y':51, 'x':79},
        {'y':43, 'x':62},
        {'y':43, 'x':42}
      ],
      'Q':[
        {'y':9, 'x':50},
        {'y':14, 'x':31},
        {'y':30, 'x':18},
        {'y':50, 'x':14},
        {'y':70, 'x':18},
        {'y':86, 'x':30},
        {'y':92, 'x':50},
        {'y':14, 'x':69},
        {'y':30, 'x':82},
        {'y':50, 'x':86},
        {'y':70, 'x':82},
        {'y':86, 'x':70},
        {'y':9, 'x':82},
        {'y':30, 'x':63}
      ],
      'R':[
        {'y':9, 'x':22},
        {'y':29, 'x':22},
        {'y':52, 'x':22},
        {'y':71, 'x':22},
        {'y':92, 'x':22},
        {'y':92, 'x':41},
        {'y':92, 'x':60},
        {'y':85, 'x':76},
        {'y':68, 'x':81},
        {'y':51, 'x':76},
        {'y':43, 'x':60},
        {'y':43, 'x':41},
        {'y':25, 'x':69},
        {'y':9, 'x':80}
      ],
      'S':[
        {'y':13, 'x':23},
        {'y':7, 'x':50},
        {'y':50, 'x':50},
        {'y':93, 'x':50},
        {'y':88, 'x':74},
        {'y':84, 'x':23},
        {'y':60, 'x':24},
        {'y':16, 'x':77},
        {'y':40, 'x':78}
      ],
      'T':[
        {'y':9, 'x':50},
        {'y':30, 'x':50},
        {'y':50, 'x':50},
        {'y':70, 'x':50},
        {'y':92, 'x':50},
        {'y':92, 'x':31},
        {'y':92, 'x':12},
        {'y':92, 'x':69},
        {'y':92, 'x':88}
      ],
      'U':[
        {'y':14, 'x':30},
        {'y':31, 'x':20},
        {'y':52, 'x':18},
        {'y':71, 'x':18},
        {'y':92, 'x':18},
        {'y':14, 'x':70},
        {'y':31, 'x':81},
        {'y':52, 'x':83},
        {'y':71, 'x':83},
        {'y':92, 'x':83},
        {'y':9, 'x':50},

      ],
      'V':[
        {'y':92, 'x':15},
        {'y':72, 'x':23},
        {'y':92, 'x':86},
        {'y':72, 'x':78},
        {'y':52, 'x':31},
        {'y':52, 'x':69},
        {'y':32, 'x':38},
        {'y':32, 'x':62},
        {'y':9, 'x':50}
      ],
      'W':[
        {'y':92, 'x':9},
        {'y':72, 'x':15},
        {'y':92, 'x':61},
        {'y':72, 'x':57},
        {'y':52, 'x':20},
        {'y':52, 'x':50},
        {'y':32, 'x':24},
        {'y':32, 'x':41},
        {'y':9, 'x':33},
        {'y':92, 'x':39},
        {'y':72, 'x':44},
        {'y':92, 'x':91},
        {'y':72, 'x':85},
        {'y':52, 'x':80},
        {'y':32, 'x':59},
        {'y':32, 'x':75},
        {'y':9, 'x':67}
      ],
      'X':[
        {'y':92, 'x':17},
        {'y':72, 'x':32},
        {'y':92, 'x':84},
        {'y':72, 'x':68},
        {'y':9, 'x':17},
        {'y':29, 'x':32},
        {'y':29, 'x':68},
        {'y':9, 'x':84},
        {'y':50, 'x':50},
      ],
      'Y':[
        {'y':9, 'x':50},
        {'y':29, 'x':50},
        {'y':49, 'x':40},
        {'y':49, 'x':60},
        {'y':72, 'x':28},
        {'y':72, 'x':72},
        {'y':92, 'x':18},
        {'y':92, 'x':84}
      ],
      'Z':[
        {'y':92, 'x':16},
        {'y':92, 'x':37},
        {'y':92, 'x':58},
        {'y':92, 'x':79},

        {'y':31, 'x':32},
        {'y':50, 'x':49},
        {'y':69, 'x':68},

        {'y':9, 'x':16},
        {'y':9, 'x':37},
        {'y':9, 'x':58},
        {'y':9, 'x':79}
      ]
    };
  });
