app.controller('MenuCtrl', function($scope, $state, Core, $ionicSideMenuDelegate){
	$scope.roomList = Core.roomList;

	$scope.$on('EnterRoom', function(event, args) {
		console.log(args);
		$scope.room = args.room;
	});

	$scope.rMoveToRoom = function(room){
		$ionicSideMenuDelegate.toggleRight($scope);
		console.log(room);
		$state.go('Room', {rid: room.rid});
	}

	$scope.lMoveTo = function(state){
		$ionicSideMenuDelegate.toggleLeft($scope);
		$state.go(state);
	}

	$scope.rMoveToTurnable = function(){
		$ionicSideMenuDelegate.toggleRight($scope);
		$state.go('Turntable');
	}

	$scope.lMoveToRoomList = function(){
		$ionicSideMenuDelegate.toggleLeft($scope);
		$ionicSideMenuDelegate.toggleRight($scope);
	}

	$scope.canOpenLeftMenu = function(){
		var permission = ["Room", "NewRoom", "Turntable"];
		return permission.indexOf($state.$current.name) >= 0;
	}

	$scope.canOpenRightMenu = function(){
		var permission = ["JuMeFood", "Room", "NewRoom", "Turntable"];
		return permission.indexOf($state.$current.name) >= 0;
	}

	$scope.canShow = function(array){
		return array.indexOf($state.$current.name) >= 0;
	}
});