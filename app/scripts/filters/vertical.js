'use strict';

angular.module('casino.filters').
  filter('vertical', function() {
    return function(lights, allLights, frame, maxFrame) {

      var filtered = [],
          verticalStep = 8; //approx 8% between steps

      angular.forEach(allLights, function(light) {

        light.power = 'on';

        if((maxFrame)/2 > frame) {  //lights up
          if(parseInt(light.pos.bottom) < (frame * verticalStep)) {
            light.power = 'off';
          }

        } else {  //lights down
          if(parseInt(light.pos.bottom) < ((maxFrame - frame) * verticalStep)) {
            light.power = 'off';
          }
        }

        filtered.push(light);
      }, this);
      return filtered;
    };
  }
);
