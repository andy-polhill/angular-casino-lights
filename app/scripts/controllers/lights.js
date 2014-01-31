angular.module('portfolioApp').
	controller('LightsCtrl', function ($scope, $timeout, $filter) {

		$scope.maxFrame = 15;
		$scope.brightness = 0;
		$scope.speed = 200;
		$scope.power = true;
		$scope.frame = 0;
		$scope.animation = 'random';

		$scope.toggle = function() {
			if(!$scope.power) { //stop it
				$timeout.cancel($scope.timeout)
			} else { //start it
				$scope.timeout = $timeout(frame, $scope.speed);
			}
		}

		function frame() {
			$scope.frame++;

			$filter($scope.animation)($scope.lights, $scope.frame, $scope.maxFrame);

			if($scope.frame > $scope.maxFrame) {
				$scope.frame = 0;
			}
			$scope.timeout = $timeout(frame, $scope.speed);
		}

		if($scope.power) { //start it up
			$scope.timeout = $timeout(frame, $scope.speed);
		}
	}
);