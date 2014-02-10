'use strict';

angular.module('casino.filters').
	filter('random', function() {
		return function(lights, allLights, frame, maxFrame) {
			var filtered = [];
			
			angular.forEach(allLights, function(light) {

				light.power = (Math.random() > 0.5) ? 'on' : 'off';

				filtered.push(light);
			}, this);

			return filtered;
		};
	}
);
