angular.module('portfolioFilters', []).
	filter('vertical', function() {
	  return function(input) {
	  	console.log(input);
	    return input;
	  };
	}
);
