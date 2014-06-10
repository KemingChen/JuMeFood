app.controller('MenuCtrl', function($scope, $state, Core, $window, $ionicSideMenuDelegate){
	$scope.roomList = Core.roomList;

	$scope.$on('EnterRoom', function(event, args) {
		console.log(args);
		$scope.room = args.room;
	});

	$scope.moveToRoom = function(room){
		$ionicSideMenuDelegate.toggleLeft($scope);
		$window.location = "#/Room/" + room.roomId;
	}

	$scope.moveToTurnable = function(){
		Core.setTurntable($scope.room.advises);
		$ionicSideMenuDelegate.toggleLeft($scope);
		$window.location = "#/Turntable";
	}

	$scope.canOpenLeftMenu = function(){
		var permission = ["JuMeFood", "Room"];
		return permission.indexOf($state.$current.name) >= 0;
	}

	$scope.canOpenRightMenu = function(){
		var permission = ["JuMeFood", "Room"];
		return permission.indexOf($state.$current.name) >= 0;
	}

	$scope.canShow = function(array){
		return array.indexOf($state.$current.name) >= 0;
	}

	$scope.hasAdvises = function(){
		return Object.keys(scope.room.advises).length > 0;
	}
});