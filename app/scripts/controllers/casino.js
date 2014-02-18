'use strict';

angular.module('casino').
	controller('LightsCtrl', function ($scope, $timeout, $filter, filters, fontService) {

		var frame = 0, //start at frame 0
				font = 'Bitter'; //a data file of light locations is needed

		$scope.word = 'ANDY'.split('');
		$scope.power = true; // on/off switch
		$scope.animation = 'vertical'; //default animation
		$scope.filters = filters;

		$scope.speed = {
			min: 10,
			max: 30,
			current: 10
		};

		$scope.toggle = function() {
			$scope.power = ($scope.power) ? false : true; //invert
			if(!$scope.power) { //stop it
				$scope.stop();
			} else { //start it
				$scope.start();
			}
		};

		$scope.animate = function() {
			$filter($scope.animation)($scope.lights, frame++);
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

		fontService.fetch(font, $scope.word, function(lights) {
			$scope.lights = lights;
			$scope.start();
		})
	}
);
