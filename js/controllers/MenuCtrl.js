app.controller('MenuCtrl', function($scope, $state){
	$scope.canOpenRoomsMenu = function(){
		var permission = ["JuMeFood"];
		return permission.indexOf($state.$current.name) >= 0;
	}

	$scope.list = [
		{ text: '1 Page One', iconClass: 'icon ion-map', link: 'one'},
		{ text: '2 Page Two', iconClass: 'icon ion-gear-b', link: 'two'},
		{ text: '3 Page Three', iconClass: 'icon ion-star', link: 'three'}
	];
});