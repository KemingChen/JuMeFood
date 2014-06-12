app.controller('RoomCtrl', function($scope, $rootScope, $ionicSideMenuDelegate, Core, $state, $stateParams, Notification, ServerAPI, $ionicScrollDelegate, $timeout){
	var rid = $stateParams.rid;
	var roomList = Core.roomList;

	$scope.selfId = $rootScope.info.uid;
	$scope.room = roomList[rid] ? roomList[rid] : throwRoomError(rid);
	console.log(JSON.stringify($scope.room));

	if(!$scope.room.isUpdate){
		$scope.room.isUpdate = true;
		console.log("Update Room Info!!!");
		ServerAPI.listRoomMsg({rid: rid});
		ServerAPI.listRoomMembers({rid: rid});
		ServerAPI.listRoomAdvices({rid: rid});
	}
	
	$rootScope.$broadcast('EnterRoom', {room: $scope.room});

	$rootScope.$on('NewMsg', function(event, args) {
		console.log(JSON.stringify(args));
		console.log(rid == args.rid);
		if(rid == args.rid){
			$scope.$apply();
			$timeout($ionicScrollDelegate.scrollBottom, 500);
		}
		console.log(JSON.stringify($scope.room));
	});

	$rootScope.$on('QuitRoom', function(event, args) {
		if(rid == args.rid){
			$state.go("JuMeFood");
		}
	});

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