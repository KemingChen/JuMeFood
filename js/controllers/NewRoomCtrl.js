app.controller('NewRoomCtrl', function($scope, $rootScope, $window, Core, $state, $ionicSideMenuDelegate, FacebookAPI, ServerAPI){
	$scope.MoveTo = function(state){
		Core.createTemp("NewRoom", {
			friends: $scope.friends,
			title: $scope.title,
			startTime: getStartTime(),
			FBFriends: $scope.FBFriends,
		});
		$state.go(state);
	}

	$scope.changeTitle = function(title){
		$scope.title = title;
	}

	$scope.Leave = function(){
		$state.go('JuMeFood');
	}

	$scope.newRoom = function(){
		$rootScope.showLoading("New Room...");
		ServerAPI.createRoom({
			time: Math.round(getStartTime().getTime() / 1000),
			name: $scope.title,
			FBIds: Object.keys($scope.friends),
		});
	}

	$scope.canGo = function(){
		// console.log($scope.title);
		return $scope.title.trim() != "" && !$scope.isNoFriends();
	}

	$scope.slideLeft = function(){
		$ionicSideMenuDelegate.toggleLeft($scope);
	}

	$scope.showPicker = function(type){
		$window.plugins.datePicker.show({
			date : $scope.startTime[type],
			mode : type, // date or time
			allowOldDates : true
		}, function(returnDate) {
			console.log(returnDate);
			var newDate = type == "date" ? new Date(returnDate) : new Date(parseInt(returnDate))
			$scope.startTime[type] = newDate;
			$scope.$apply();
		});
	}

	$scope.init = function(){
		console.log("New Init");
		loadTemp();
		initStartTime();
	}

	$scope.cancelAddFriend = function(){
		console.log( $scope.tempFriends);
		Core.createTemp("NewRoom", {
			friends: $scope.tempFriends,
			title: $scope.title,
			startTime: getStartTime(),
			FBFriends: $scope.FBFriends,
		});
		$state.go('NewRoom');
	}

	function loadTemp(){
		var datas = Core.getTemp("NewRoom");
		if(datas){
			console.log("LoadTemp: true");
			$scope.friends = datas.friends;
			$scope.title = datas.title;
			$scope.startTime = datas.startTime;
			$scope.FBFriends = datas.FBFriends;
		}
		else{
			$rootScope.showLoading("Loading Facebook...");
			$scope.friends = {};
			$scope.title = "";
			$scope.startTime = $rootScope.getInitTime();
			$scope.FBFriends = Core.getTemp('FBFriends');
			$rootScope.hideLoading();
		}
		//use to implement cancel add friends
		$scope.tempFriends = angular.copy($scope.friends);
	}

	function getStartTime(){
		var result = new Date();
		var date = $scope.startTime.date;
		var time = $scope.startTime.time;
		result.setFullYear(date.getFullYear());
		result.setMonth(date.getMonth());
		result.setDate(date.getDate());

		result.setHours(date.getHours());
		result.setMinutes(date.getMinutes());

		result.setMilliseconds(0);
		result.setSeconds(0);
		return result;
	}

	function initStartTime(){
		var time = $scope.startTime;
		$scope.startTime = {
			date: time,
			time: time,
		}
	}

	$scope.isNoFriends = function (){
		var friends = $scope.friends;
		for(var i in friends){
			if(friends[i])
				return false;
		}
		return true;
	}
});