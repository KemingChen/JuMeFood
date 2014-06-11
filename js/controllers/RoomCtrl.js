app.controller('RoomCtrl', function($scope, $rootScope, $ionicSideMenuDelegate, Core, $stateParams){
	var roomId = $stateParams.roomId;
	var roomList = Core.roomList;

	$scope.selfId = $rootScope.info.uId;
	$scope.room = roomList[roomId] ? roomList[roomId] : throwRoomError(roomId);

	$rootScope.$broadcast('EnterRoom', {room: $scope.room});
	console.log($scope.room);

	$scope.slideLeft = function(){
		$ionicSideMenuDelegate.toggleLeft($scope);
	}

	$scope.slideRight = function(){
		$ionicSideMenuDelegate.toggleRight($scope);
	}

	function throwRoomError(roomId){
		throw "No This Room ID: " + roomId;
	}

	/* ------- Test ------------ */
	$scope.test = function(){
		$rootScope.$broadcast('EnterRoom', {room: $scope.room});
	}
});