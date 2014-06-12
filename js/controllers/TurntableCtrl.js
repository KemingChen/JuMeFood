app.controller('TurntableCtrl', function($scope, $rootScope, Core, $timeout, $ionicSideMenuDelegate, ServerAPI){
	// $scope.room = Core.roomList[1];
	var isCreateJSlots = false;
	init();

	function init(){
		$scope.room = Core.getTemp("Turntable");
		console.log(JSON.stringify($scope.room));
		$rootScope.$broadcast('EnterRoom', {room: $scope.room});
		$scope.$on('RefreshTurntable', function(event, args) {
			init();
		});
	}

	function getIndex(goal){
		var advices = $scope.room.advices;
		var count = 1;
		for(var i in advices){
			if(i == goal)
				return count;
			count++;
		}
		throw "Goal Error!!";
	}

	$rootScope.$on('GO', function(event, args) {
		$scope.room.goalUId = args.goal;
		$rootScope.hideLoading();

		var winnerIndex = getIndex(args.goal);
		console.log("winnerIndex: " + winnerIndex);

		$('.slot').jSlots({
			spinner: '#playGo',
			winnerIndex: winnerIndex,
			number: 1,
			onEnd: function(result){
				console.log("finish");
				var store = $scope.room.advices[result[0]];
				console.log(store);
			},
		});
		$("#playGo").click();
	});

	$scope.go = function(){
		console.log('go');
		if($scope.room.rid == "self")
		{
			if(!isCreateJSlots){
				isCreateJSlots = true;
				$('.slot').jSlots({
					spinner: '#playGo',
					number: 1,
					onEnd: function(result){
						console.log("finish");
						var store = $scope.room.advices[result[0]];
						console.log(store);
					},
				});
			}
			$("#playGo").click();
		}
		else
		{
			$rootScope.showLoading("同步中...");
			ServerAPI.go({rid: $scope.room.rid});
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