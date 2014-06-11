app.controller('NewAdviceCtrl', function($scope, $state, $ionicSideMenuDelegate, Core, ServerAPI){
	$scope.search = "";
	$scope.customOpinion = "";

	var stores = Core.stores;
	console.log(stores);

	$scope.filter = function(key){
		$scope.search = key;
		$scope.filterStores = [];
		angular.forEach(stores, function(obj){
			if(key == "" || obj.name.match(key) !== null){
				$scope.filterStores.push(obj);
			}
		});
	};

	$scope.select = function(store){
		$scope.selection = store;
	}

	$scope.changeOpinion = function(opinion){
		$scope.customOpinion = opinion;
	}

	$scope.ok = function(){
		var opinion = "";
		if($scope.customOpinion.trim() != "")opinion = $scope.customOpinion;
		else opinion = $scope.selection;
		console.log(opinion);

		// 以下我不知道你要怎麼寫 QQ
		ServerAPI.sendAdvice({
			rid: rid, 
			sid| name: ,
		})
	}

	$scope.slideLeft = function(){
		$ionicSideMenuDelegate.toggleLeft($scope);
	}
});