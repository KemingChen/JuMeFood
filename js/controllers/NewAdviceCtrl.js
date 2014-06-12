app.controller('NewAdviceCtrl', function($scope, $state, $ionicSideMenuDelegate, Core, ServerAPI, $window, $stateParams){
	var rid = $stateParams.rid;
	$scope.search = "";
	$scope.customOption = "";

	$scope.stores = Core.stores;
	console.log($scope.stores);

	$scope.filter = function(key){
		$scope.search = key;
	}

	$scope.changeOption = function(option){
		$scope.selectId = null;
		if(option.trim() == "")
			$scope.showOptionName = false;
		else
			$scope.showOptionName = option;
		$scope.customOption = option;
	}

	$scope.select = function(store){
		$scope.selectId = store.sid;
		$scope.showOptionName = store.name;
		$scope.selection = store;
	}
	
	$scope.canShow = function(store){
		var result = $scope.search.trim() == "" ? true : (store.name.match($scope.search) ? true : false);
		// console.log("check canShow: " + result);
		return result;
	}

	$scope.ok = function(){
		if($scope.customOption.trim() != ""){
			ServerAPI.sendAdvice({
				rid: rid, 
				name: $scope.customOption.trim(),
			});
		}
		else{
			ServerAPI.sendAdvice({
				rid: rid, 
				sid: $scope.selection.sid,
			});
		}
		$window.history.back();
	}

	$scope.cancel = function(){
		$window.history.back();
	}

	$scope.slideLeft = function(){
		$ionicSideMenuDelegate.toggleLeft($scope);
	}
});