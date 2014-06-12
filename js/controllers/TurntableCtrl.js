app.controller('TurntableCtrl', function($scope, $rootScope, Core, $timeout, $ionicSideMenuDelegate, ServerAPI, $state){
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
		$rootScope.hideLoading();

		var winnerIndex = getIndex(args.goal);
		console.log("winnerIndex: " + winnerIndex);

		$('.slot').jSlots({
			spinner: '#playGo',
			winnerIndex: winnerIndex,
			number: 1,
			onEnd: function(result){
				var store = $scope.room.advices[args.goal];
				console.log(store);
			},
		});
		$("#playGo").click();
	});

	$scope.toMap = function(){
		$state.go("Map", {sid: $scope.selectSid});
	}

	$scope.go = function(){
		console.log('go');
		if($scope.room.rid == "self")
		{
			$scope.canShowMap = false;
			if(!isCreateJSlots){
				isCreateJSlots = true;
				$('.slot').jSlots({
					spinner: '#playGo',
					number: 1,
					onEnd: function(result){
						console.log("finish");
						var keys = Object.keys($scope.room.advices);
						var store = $scope.room.advices[keys[result[0]]];
						console.log(store);
						$scope.selectSid = store.sid;
						$scope.canShowMap = true;
						$scope.$apply();
					},
				});
			}
			$("#playGo").click();
		}
		else
		{
			$rootScope.showLoading("同步中...");
			isCreateJSlots = true;
			ServerAPI.go({rid: $scope.room.rid});
		}
	}

	$scope.canGo = function(){
		if($scope.room && $scope.room.rid == "self")
			return true;
		if(!isCreateJSlots)
			return true;
		return false;
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