app.controller('LoginCtrl', function($scope, $window, $state, ServerAPI, FacebookAPI){
	console.log($state.$current.name);
	
	$scope.login = function(){
		FacebookAPI.login(function(FBToken){
			ServerAPI.login({
				GCMId: $rootScope.info.gcmRegId,
				FBToken: FBToken,
			});
		});
	}
});