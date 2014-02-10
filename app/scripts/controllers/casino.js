'use strict';

angular.module('casino').
	controller('LightsCtrl', function ($scope, _, $http, $timeout, $filter, filters) {

		var maxFrame = 16, //all filters should fit into a 16 frame animation
				frame = 0, //start at frame 0
				font = 'Bitter'; //this our font, a data file of light locations is needed

		$scope.word = 'ANDY'.split(''); //TODO: this would be better in the template
		$scope.speed = 200; // animation interval
		$scope.maxSpeed = 500;
		$scope.power = true; // on/off switch
		$scope.animation = 'vertical'; //default animation
		$scope.filters = filters;

		$scope.toggle = function() {
			if(!$scope.power) { //stop it
				$timeout.cancel($scope.timeout);
			} else { //start it
				$scope.timeout = $timeout(animate, $scope.speed);
			}
		};

		function animate() {
			frame++;

			//call the specified filter
			$filter($scope.animation)($scope.lights, $scope.allLights, frame, maxFrame);

			if(frame > maxFrame) {
				frame = 0;
			}
			$scope.timeout = $timeout(animate, $scope.speed);
		}

		$http.get('data/' + font + '.json').success(function(letters) {

			var lights = {};

			//transform the data into a more suitable format
			//TODO: move this out to a separate function and optimise if possible
			_.each(_.keys(letters), function(letter) {
				lights[letter] = [];
				_.each(letters[letter], function(light) {
					lights[letter].push({'pos': light});
				}, this);
			}, this);

			$scope.lights = lights;

			//create a flattened version of the lights, useful for some filters
			$scope.allLights = _.flatten(_.values(lights), true);

			if($scope.power) { //start it up
				$scope.timeout = $timeout(animate, $scope.speed);
			}

		});
	}
);
