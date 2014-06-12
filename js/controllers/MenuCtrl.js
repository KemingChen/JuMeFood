app.controller('MenuCtrl', function($scope, $state, $rootScope, Core, $ionicSideMenuDelegate, ServerAPI){
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
		console.log(state);
		if(state == "Turntable"){
			var room = $rootScope.getSelfRoom();
			Core.createTemp("Turntable", room);
			$rootScope.$broadcast('RefreshTurntable', {});
		}
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

	$scope.isRoomsEmpty = function(){
		return Object.keys($scope.roomList).length == 0;
	}

	$scope.quitRoom = function(){
		ServerAPI.quitRoom({rid: $scope.room.rid});
		$ionicSideMenuDelegate.toggleLeft($scope);
	}

	$scope.canGo = function(){
		if(!$scope.hasEnoughAdvices())
			return false;
		return $scope.room && $scope.room.master.uid == $rootScope.info.uid && !$scope.room.goalUId;
	}

	$scope.canAddAdvice = function(){
		return $scope.room && !$scope.room.goalUId;
	}

	$scope.hasEnoughAdvices = function(){
		if(!($scope.room && $scope.room.master.uid == $rootScope.info.uid))
			return false;
		if($scope.room){
			var advicesLength = Object.keys($scope.room.advices).length;
			var memberLength = Object.keys($scope.room.members).length;
			// console.log([advicesLength, memberLength]);
			return advicesLength * 2 >= memberLength;
		}
		return false;
	}
});