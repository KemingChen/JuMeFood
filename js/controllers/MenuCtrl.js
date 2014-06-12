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

	$scope.rMoveToNewAdvice = function(){
		$ionicSideMenuDelegate.toggleRight($scope);
		$state.go('NewAdvice', {rid: $scope.room.rid});
	}

	$scope.rMoveToTurnable = function(){
		$ionicSideMenuDelegate.toggleRight($scope);
		Core.createTemp("Turntable", $scope.room);
		$state.go('Turntable');
	}

	$scope.lMoveToRoomList = function(){
		$ionicSideMenuDelegate.toggleLeft($scope);
		$ionicSideMenuDelegate.toggleRight($scope);
	}

	$scope.canOpenLeftMenu = function(){
		var permission = ["Room", "NewRoom", "Turntable", "NewAdvice"];
		return permission.indexOf($state.$current.name) >= 0;
	}

	$scope.canOpenRightMenu = function(){
		var permission = ["JuMeFood", "Room", "NewRoom"];
		if($scope.room && $scope.room.rid != 'self')
			permission.push("Turntable");
		return permission.indexOf($state.$current.name) >= 0;
	}

	$scope.canShow = function(array){
		return array.indexOf($state.$current.name) >= 0;
	}
});