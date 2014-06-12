app.controller('JuMeFoodCtrl', function($scope, $rootScope, $state, $ionicSideMenuDelegate, Core, Notification){
	// Core.checkLogin();

	$scope.MoveTo = function(state){
		if(state == ""){
			Notification.alert("Coming Soon...", null, "施工中!!!", "朕知道了");
			return;
		}
		if(state == "NewRoom")
			Core.deleteTemp("NewRoom");
		if(state == "Turntable"){
			var room = $rootScope.getSelfRoom();
			Core.createTemp("Turntable", room);
		}
			
		$state.go(state);
	}
	
	$scope.slideRight = function(){
		$ionicSideMenuDelegate.toggleRight($scope);
	}
});