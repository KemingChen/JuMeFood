app.controller('JuMeFoodCtrl', function($scope, $state, $ionicSideMenuDelegate){
	$scope.slideLeft = function(){
		$ionicSideMenuDelegate.toggleLeft($scope);
	}
});