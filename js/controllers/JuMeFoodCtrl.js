app.controller('JuMeFoodCtrl', function($scope, $window, $ionicSideMenuDelegate, Core){
	$scope.MoveTo = function(state){
		if(state == "NewRoom")
			Core.deleteTemp("NewRoom");
		$window.location = "#/" + state;
	}
	
	$scope.slideRight = function(){
		$ionicSideMenuDelegate.toggleRight($scope);
	}
});