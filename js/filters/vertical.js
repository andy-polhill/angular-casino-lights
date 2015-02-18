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
