'use strict';

angular.module('casino.filters').
	factory('Random', function() {
		return function(lights, frame) {

			//throttle this filter to operate every 10 frames
			if(frame % 10 !== 0) {
				return;
			}
			
			angular.forEach(lights.flat, function(light) {
				light.power = (Math.random() > 0.5) ? 'on' : 'off';
			}, this);
		};
	}
);
