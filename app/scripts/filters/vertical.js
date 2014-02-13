'use strict';

/* Vertical Filter: Provides a simple up/down filter
 */

angular.module('casino.filters').
  filter('vertical', function() {
    return function(lights, allLights, frame) {

      var filtered = [],
          maxFrame = 100, //FIXME: frame animation
          verticalStep = 2, //FIXME: approx 4% between steps
          frame = frame % maxFrame,
          isUp = Math.round(frame / maxFrame) ? true : false,
          upFrame = (maxFrame - frame) * verticalStep,
          downFrame = frame * verticalStep;

      angular.forEach(allLights, function(light) {

        light.power = 'off';

        if(isUp && parseInt(light.pos.bottom, 10) < upFrame) {
          light.power = 'on';
        }

        if(!isUp && parseInt(light.pos.bottom, 10) < downFrame) {
          light.power = 'on';
        }

        filtered.push(light);
      }, this);
      return filtered;
    };
  }
);
