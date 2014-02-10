'use strict';

angular.module('casino').
	controller('LightsCtrl', function ($scope, _, $http, $timeout, $filter, filters) {

		var frame = 0, //start at frame 0
				font = 'Bitter'; //this our font, a data file of light locations is needed

		$scope.word = 'ANDY'.split(''); //TODO: this would be better in the template
		$scope.speed = 200; // animation interval
		$scope.maxSpeed = 500;
		$scope.power = true; // on/off switch
		$scope.animation = 'vertical'; //default animation
		$scope.filters = filters;

		$scope.toggle = function() {
			if(!$scope.power) { //stop it
				$scope.stop();
			} else { //start it
				$scope.start();
			}
		};

		//Fetch the font data, parse it and start
		$http.get('data/' + font + '.json').success(function() {
			$scope.parse.apply(this, arguments);
			$scope.start();
		});

		$scope.animate = function() {
			frame++;
			$filter($scope.animation)($scope.lights, $scope.allLights, frame);
			$scope.timeout = $timeout($scope.animate, $scope.speed);
		};

		//transform the data into a more suitable format
		$scope.parse = function(letters) {
			var lights = {};

			_.each(_.keys(letters), function(letter) {
				lights[letter] = [];
				_.each(letters[letter], function(light) {
					lights[letter].push({'pos': light});
				}, this);
			}, this);

			$scope.lights = lights;

			//create a flattened version of the lights, useful for some filters
			$scope.allLights = _.flatten(_.values(lights), true);
		};

		//start it up
		$scope.start = function() {
			if($scope.power) {
				$scope.timeout = $timeout($scope.animate, $scope.speed);
			}			
		};

		//stop it
		$scope.stop = function() {
			if(!$scope.power) {
				$timeout.cancel($scope.timeout);
			}			
		};
	}
);
