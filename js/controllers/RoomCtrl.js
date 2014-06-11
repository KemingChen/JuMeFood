app.controller('RoomCtrl', function($scope, $rootScope, $ionicSideMenuDelegate, Core, $stateParams, Notification, ServerAPI){
	var rid = $stateParams.rid;
	var roomList = Core.roomList;

	console.log($rootScope.info);
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

	$scope.typeMessage = function(){
		console.log("Type Message!!!");
		Notification.prompt('Chat in ' + $scope.room.title,
			function(answer){
				console.log(JSON.stringify(answer));
				if (answer.buttonIndex === 1) {
					// 取消
				}
				else {
					// 送出
					var message = answer.input1;
					if(message.trim() != ""){
						ServerAPI.sendMsg({
							rid: $scope.room.rid,
							message: message,
						});
					}
				}
			},
			'輸入訊息',
			['取消','送出']
		);
	}

	function throwRoomError(rid){
		throw "No This Room ID: " + rid;
	}
});