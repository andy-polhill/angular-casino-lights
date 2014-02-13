'use strict';

angular.module('casino.filters').
	filter('random', function() {
		return function(lights, allLights, frame) {

			//throttle this filter to operate every 10 frames
			if(frame % 10 != 0) {
				return allLights;
			}

			var filtered = [];
			
			angular.forEach(allLights, function(light) {

				light.power = (Math.random() > 0.5) ? 'on' : 'off';

				filtered.push(light);
			}, this);

			return filtered;
		};
	}
);
