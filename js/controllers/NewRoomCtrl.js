app.controller('NewRoomCtrl', function($scope, $window){
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

	$scope.MoveTo = function(state){
		$window.location = "#/" + state;
	}

	$scope.initStartTime = function(){
		var time = getInitTime();
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
});