app.controller('NewRoomCtrl', function($scope, $window, Core, $state){
	$scope.MoveTo = function(state){
		Core.createTemp("NewRoom", {
			friends: $scope.friends,
			title: $scope.title,
			startTime: getStartTime(),
			FBFriends: $scope.FBFriends,
		});
		$state.go(state);
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
			$scope.friends = {};
			$scope.title = "";
			$scope.startTime = getInitTime();
			$scope.FBFriends = getFBfriends();
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

	/* -------------- Test ---------------*/
	$scope.test = function(){
		console.log($scope.friends);
	}

	function getFBfriends(){
		var datas = [
			{
				"name": "KinGhoster Chen", 
				"id": "1261346803"
			}, 
			{
				"name": "Luā Tîng-Gān", 
				"id": "1357466415"
			}, 
			{
				"name": "Weizhe Ding", 
				"id": "1594166637"
			}, 
			{
				"name": "張嘉賢", 
				"id": "1830196702"
			}, 
			{
				"name": "許展榮", 
				"id": "100000100188426"
			}, 
			{
				"name": "黃驤", 
				"id": "100000115320688"
			}, 
			{
				"name": "楊俊仁", 
				"id": "100000123264499"
			}, 
			{
				"name": "翰良", 
				"id": "819058634775049"
			}, 
			{
				"name": "唐軒尉", 
				"id": "100000147641368"
			}, 
			{
				"name": "呂學昱", 
				"id": "871465529536621"
			}, 
			{
				"name": "彥竹", 
				"id": "100000255101290"
			}, 
			{
				"name": "謝宗廷", 
				"id": "100000255741179"
			}, 
			{
				"name": "徐嘉陞", 
				"id": "100000297708113"
			}, 
			{
				"name": "楊忠霖", 
				"id": "100000379531646"
			}, 
			{
				"name": "陳碩漢", 
				"id": "100000381342920"
			}, 
			{
				"name": "WenJye Lo", 
				"id": "100001277033773"
			}, 
			{
				"name": "陳子琦", 
				"id": "100001671669392"
			}, 
			{
				"name": "Wang Han-Yu", 
				"id": "100002002364018"
			}, 
			{
				"name": "劉庭瑋", 
				"id": "100002023551378"
			}, 
			{
				"name": "Yi-An Chen", 
				"id": "661227687303554"
			}];
		for(var i in datas){
			datas[i].photo = "https://graph.facebook.com/" + datas[i].id + "/picture";
		}

		return datas;
	}
});