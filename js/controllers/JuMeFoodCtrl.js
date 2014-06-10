app.controller('JuMeFoodCtrl', function($scope, $window, $ionicSideMenuDelegate){
	$scope.MoveTo = function(state){
		$window.location = "#/" + state;
	}
	
	$scope.slideLeft = function(){
		$ionicSideMenuDelegate.toggleLeft($scope);
	}
});