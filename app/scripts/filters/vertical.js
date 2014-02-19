'use strict';

/* Vertical Filter: Provides a simple up/down filter
 */

angular.module('casino.filters').
  filter('vertical', function() {
    return function(lights, frame) {

      var magic = 10, //used to force a slight stall for all on/off
          lowest = lights.lowest - magic,
          highest = lights.highest + magic,
          range = highest - lowest,
          step = 2,
          mod = frame % range,
          isUp = Math.round(mod / range) ? false : true,
          upFrame = (mod * step) + lowest,
          downFrame = highest + (((range / 2) - mod) * step);

      angular.forEach(lights.flat, function(light) {

        light.power = 'off';

        if(isUp && parseInt(light.pos.bottom, 10) < upFrame) {
          light.power = 'on';
        }

        if(!isUp && parseInt(light.pos.bottom, 10) < downFrame) {
          light.power = 'on';
        }

      }, this);
    };
  }
);
