app.controller('LoginCtrl', function($scope, $rootScope, $window, $state, ServerAPI, FacebookAPI){
	console.log($state.$current.name);
	
	$scope.login = function(){
		FacebookAPI.login(function(FBToken){
			console.log(FBToken);
			ServerAPI.login({
				GCMId: $rootScope.info.gcmRegId,
				FBToken: FBToken,
			});
		});
	}
});