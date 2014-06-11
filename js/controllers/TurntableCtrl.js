app.controller('TurntableCtrl', function($scope, $rootScope, Core, $timeout, $ionicSideMenuDelegate){
	// $scope.room = Core.roomList[1];
	$scope.room = Core.getTemp("Turntable");
	console.log(JSON.stringify($scope.room));
	$rootScope.$broadcast('EnterRoom', {room: $scope.room});

	$scope.go = function(){
		console.log('go');
		if($scope.room.rid == "self")
		{
			$('.slot').jSlots({
				spinner : '#playGo',
				number : 1,
				onEnd: function(result){
					console.log("finish");
					var store = $scope.room.advices[result[0]];
					console.log(store);
				},
			});
			$("#playGo").click();
		}
		else
		{
			/*
			api.go(function(result){
				$('.slot').jSlots({
					spinner : '#playGo',
					number : 1,
					winnerIndex : result,
					onEnd: function(result){
						console.log("finish");
						var store = $scope.room.advices[result[0]];
						console.log(store);
					},
				});
				$("#playGo").click();		
			})
			*/
		}
	}

	$scope.isNoAdvices = function(){
		var advices = $scope.room.advices;
		for(var i in advices){
			if(advices[i])
				return false;
		}
		return true;
	}

	$scope.slideLeft = function(){
		$ionicSideMenuDelegate.toggleLeft($scope);
	}

	$scope.slideRight = function(){
		$ionicSideMenuDelegate.toggleRight($scope);
	}
});