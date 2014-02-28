'use strict';

angular.module('casino.filters').
  filter('letter', function() {
    return function(lights, frame) {

      var keys = _.keys(lights.all),
          throttle = 10,
          mod = Math.floor((frame % (keys.length * throttle)) / throttle),
          cur = keys[mod],
          prev = (mod > 0) ? keys[mod - 1] : _.last(keys);

      //turn on current light
      angular.forEach(lights.all[cur], function(light) {
        light.power = 'on';
      }, this);

      //turn off previous light
      angular.forEach(lights.all[prev], function(light) {
        light.power = 'off';
      }, this);
    };
  }
);
