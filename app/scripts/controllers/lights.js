angular.module('portfolioApp').
	controller('LightsCtrl', function ($scope, $interval) {

		var maxFrame = 20;

		$scope.brightness = 0,
		$scope.speed = 0,
		$scope.power = 'on',
		$scope.frame = 1;

		$scope.changeAnimation = function() {
			console.log(this.animation);
		}

		$scope.animation = $interval(function() {
			$scope.frame++;
			if($scope.frame > maxFrame) {
				$scope.frame = 0;
			}
			console.log($scope.frame);
		}, 500);
	}
);