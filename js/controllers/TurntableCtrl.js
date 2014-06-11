app.controller('TurntableCtrl', function($scope, $rootScope, Core, $timeout, $ionicSideMenuDelegate){
	$scope.room = Core.roomList[1];
	console.log($scope.room);
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

	$scope.isNoAdvises = function(){
		var advises = $scope.room.advises;
		for(var i in advises){
			if(advises[i])
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