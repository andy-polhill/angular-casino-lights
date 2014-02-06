angular.module('lightFilters').
	filter('vertical', function() {
	  return function(lights, allLights, frame, maxFrame) {

	  	var filtered = [],
	  			verticalStep = 8; //approx 8% between steps

	  	angular.forEach(allLights, function(light) {

	  		light.power = 'on';

	  		//lights up
	  		if((maxFrame)/2 > frame) {
		  		if(parseInt(light.bottom) < (frame * verticalStep)) {
		  			light.power = 'off';
		  		}

	  		//lights down
	  		} else {
		  		if(parseInt(light.bottom) < ((maxFrame - frame) * verticalStep)) {
		  			light.power = 'off';
		  		}
	  		}

				filtered.push(light);
	  	}, this);
	    return filtered;
	  };
	}
);
