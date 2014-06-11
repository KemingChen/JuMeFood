app.controller('NewAdviceCtrl', function($scope, $state, $ionicSideMenuDelegate, Core){
	$scope.search = "";
	$scope.customOpinion = "";

	var store = Core.store;

	$scope.filter = function(key){
		$scope.search = key;
		$scope.filterStores = [];
		angular.forEach(store, function(obj){
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
		if($scope.customOpinion != "")opinion = $scope.customOpinion;
		else opinion = $scope.selection;
		console.log(opinion);
	}

	$scope.slideLeft = function(){
		$ionicSideMenuDelegate.toggleLeft($scope);
	}
});