app.controller('LoginCtrl', function($scope, $rootScope, $window, $state, ServerAPI, FacebookAPI){
	console.log($state.$current.name);
	
	$scope.login = function(){
		FacebookAPI.login(function(FBToken){
			ServerAPI.login({
				GCMId: $rootScope.info.gcmRegId ? $rootScope.info.gcmRegId : "NoGCMId",
				FBToken: FBToken,
			});
		});
	}
});