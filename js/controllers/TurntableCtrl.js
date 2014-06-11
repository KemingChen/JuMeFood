app.controller('TurntableCtrl', function($scope, $rootScope, Core, $timeout, $ionicSideMenuDelegate){
	// $scope.room = Core.roomList[1];
	$scope.room = Core.getTemp("Turntable");
	console.log(JSON.stringify($scope.room));
	$rootScope.$broadcast('EnterRoom', {room: $scope.room});

	$timeout(function(){
		$('.slot').jSlots({
			spinner : '#playGo',
			number : 1,
			winnerIndex : 2,
			onEnd: function(){
				console.log("finish");
			},
		});
	}, 100);

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