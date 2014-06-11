app.controller('NewAdviceCtrl', function($scope, $state, $ionicSideMenuDelegate){
	$scope.search = "";
	$scope.customOpinion = "";

	var store = [{"sid":1,"name":"高家涼麵","price":40,"latitude":25.042524,"longitude":121.539728},{"sid":2,"name":"垃圾麵","price":40,"latitude":25.043507,"longitude":121.53176},{"sid":3,"name":"漢堡王","price":100,"latitude":25.044112,"longitude":121.53144},{"sid":5,"name":"嵐迪義大利麵","price":100,"latitude":25.0428984,"longitude":121.5314894}];

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