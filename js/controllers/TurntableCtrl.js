app.controller('TurntableCtrl', function($scope, $rootScope, Core, $stateParams){
	var roomId = $stateParams.roomId;
	var roomList = Core.roomList;

	$scope.selfId = $rootScope.info.uId;
	$scope.room = roomList[roomId] ? roomList[roomId] : throwRoomError(roomId);

	$rootScope.$broadcast('EnterRoom', {room: $scope.room});
	console.log($scope.room);

	function throwRoomError(roomId){
		throw "No This Room ID: " + roomId;
	}
});