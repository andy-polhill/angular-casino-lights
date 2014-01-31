angular.module('lightFilters').
	filter('vertical', function() {
	  return function(lights, frame, maxFrame) {

	  	var filtered = [];

	  	angular.forEach(lights, function(light) {

	  		light.power = 'on';

	  		//lights up
	  		if((maxFrame)/2 > frame) {
		  		if(parseInt(light.pos.bottom) < (frame * 10)) {
		  			light.power = 'off';
		  		}

	  		//lights down
	  		} else {
		  		if(parseInt(light.pos.bottom) < ((maxFrame - frame) * 10)) {
		  			light.power = 'off';
		  		}
	  		}

				filtered.push(light);
	  	}, this);
	    return filtered;
	  };
	}
);