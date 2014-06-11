app.controller('NewRoomCtrl', function($scope, $rootScope, $window, Core, $state, $ionicSideMenuDelegate, FacebookAPI){
	$scope.MoveTo = function(state){
		Core.createTemp("NewRoom", {
			friends: $scope.friends,
			title: $scope.title,
			startTime: getStartTime(),
			FBFriends: $scope.FBFriends,
		});
		$state.go(state);
	}

	$scope.Leave = function(){
		$state.go('JuMeFood');
	}

	$scope.canGo = function(){
		console.log($scope.title);
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
			$scope.startTime = getInitTime();
			FacebookAPI.login(function(){
				$scope.FBFriends = FacebookAPI.friends(function(FBFriends){
					console.log(FBFriends);
					$scope.FBFriends = FBFriends;
					$rootScope.hideLoading();
				});
			});
		}
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

	function getInitTime(){
		var time = new Date();
		time.setMinutes(time.getMinutes() + 20);
		var hour = time.getHours();
		var min = time.getMinutes();
		if(min > 30){
			time.setMinutes(0);
			time.setHours(hour + 1);
		}
		else{
			time.setMinutes(30);
		}
		time.setMilliseconds(0);
		time.setSeconds(0);
		return time;
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