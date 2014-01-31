angular.module('lightFilters').
	filter('random', function() {
	  return function(lights, frame, maxFrame) {
	  	var filtered = [];
	  	angular.forEach(lights, function(light) {

	  		light.power = (Math.random() > 0.5) ? 'on' : 'off';

				filtered.push(light);
	  	}, this);

	    return filtered;
	  };
	}
);