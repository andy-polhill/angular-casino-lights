'use strict';

angular.module('casino').
	controller('LightsCtrl', function ($scope, _, $http, $timeout, $filter, filters) {

		var frame = 0, //start at frame 0
				font = 'Bitter'; //a data file of light locations is needed

		$scope.word = 'ANDY'.split(''); //TODO: this would be better in the template
		$scope.power = true; // on/off switch
		$scope.animation = 'vertical'; //default animation
		$scope.filters = filters;

		$scope.speed = {
			min: 10,
			max: 30,
			current: 10
		};

		//Fetch the font data, parse it and start
		$http.get('data/' + font + '.json').success(function() {
			$scope.parse.apply(this, arguments);
			$scope.start();
		});

		$scope.toggle = function() {

			$scope.power = ($scope.power) ? false : true; //invert

			if(!$scope.power) { //stop it
				$scope.stop();
			} else { //start it
				$scope.start();
			}
		};

		$scope.animate = function() {
			$filter($scope.animation)($scope.lights, $scope.allLights, frame++);
			$scope.start();
		};

		//start it up
		$scope.start = function() {
			if($scope.power) {
				//speed is inverted. small timeout out = faster animation.
				$scope.timeout = $timeout($scope.animate, 
						($scope.speed.max + $scope.speed.min) - $scope.speed.current);
			}
		};

		//stop it
		$scope.stop = function() {
			if(!$scope.power) {
				$timeout.cancel($scope.timeout);
			}
		};

		//transform the data into a more suitable format
		$scope.parse = function(letters) {
			var lights = {};

			_.each($scope.word, function(letter) {
				lights[letter] = [];
				_.each(letters[letter], function(light) {
					lights[letter].push({'pos': light});
				}, this);
			}, this);

			$scope.lights = lights;

			//create a flattened version of the lights, useful for some filters
			$scope.allLights = _.flatten(_.values(lights), true);
		};
	}
);
