app.controller('JuMeFoodCtrl', function($scope, $window){
	$scope.MoveTo = function(state){
		$window.location = "#/" + state;
	}
});