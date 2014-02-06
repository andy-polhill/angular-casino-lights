angular.module('portfolioApp').
	controller('LightsCtrl', function ($scope, $http, $timeout, $filter) {

		var maxFrame = 16,
				frame = 0;

		$scope.speed = 200; // animation interval
		$scope.power = true; // on/off switch
		$scope.animation = 'vertical'; //current animation

		$scope.word = 'ANDY'.split('');

		$scope.toggle = function() {
			if(!$scope.power) { //stop it
				$timeout.cancel($scope.timeout)
			} else { //start it
				$scope.timeout = $timeout(frame, $scope.speed);
			}
		}

		function animate() {
			frame++;

			$filter($scope.animation)($scope.lights, $scope.allLights, frame, maxFrame);

			if(frame > maxFrame) {
				frame = 0;
			}
			$scope.timeout = $timeout(animate, $scope.speed);
		}

		$http.get('data/Bitter.json').success(function(lights) {

			$scope.lights = lights;

			$scope.allLights = _.flatten(_.values($scope.lights), true);

			if($scope.power) { //start it up
				$scope.timeout = $timeout(animate, $scope.speed);
			}

		});
	}
);
