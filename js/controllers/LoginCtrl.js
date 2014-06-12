app.controller('LoginCtrl', function($scope, $rootScope, $window, $state, ServerAPI, FacebookAPI){
	console.log($state.$current.name);
	
	$scope.login = function(){
		$rootScope.FacebookLogin();
	}
});