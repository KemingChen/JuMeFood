app.controller('JuMeFoodCtrl', function($scope, $state, $ionicSideMenuDelegate, Core, Notification){
	$scope.MoveTo = function(state){
		if(state == ""){
			Notification.alert("Coming Soon...", null, "施工中!!!", "朕知道了");
			return;
		}
		if(state == "NewRoom")
			Core.deleteTemp("NewRoom");
		$state.go(state);
	}
	
	$scope.slideRight = function(){
		$ionicSideMenuDelegate.toggleRight($scope);
	}
});