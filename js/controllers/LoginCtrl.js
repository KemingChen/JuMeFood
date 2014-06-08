app.controller('LoginCtrl', function($scope, $window, $state){
	console.log($state.$current.name);
	$scope.login = function(){
		$window.location = "#/JuMeFood";
	}
});