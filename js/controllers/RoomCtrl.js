app.controller('RoomCtrl', function($scope, $rootScope, $ionicSideMenuDelegate, Core, $stateParams){
	var rid = $stateParams.rid;
	var roomList = Core.roomList;

	$scope.selfId = $rootScope.info.uid;
	$scope.room = roomList[rid] ? roomList[rid] : throwRoomError(rid);

	$rootScope.$broadcast('EnterRoom', {room: $scope.room});
	console.log($scope.room);

	$scope.slideLeft = function(){
		$ionicSideMenuDelegate.toggleLeft($scope);
	}

	$scope.slideRight = function(){
		$ionicSideMenuDelegate.toggleRight($scope);
	}

	function throwRoomError(rid){
		throw "No This Room ID: " + rid;
	}

	/* ------- Test ------------ */
	$scope.test = function(){
		$rootScope.$broadcast('EnterRoom', {room: $scope.room});
	}
});