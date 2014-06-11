app.controller('JuMeFoodCtrl', function($scope, $rootScope, $state, $ionicSideMenuDelegate, Core, Notification){
	// Core.checkLogin();

	$scope.MoveTo = function(state){
		if(state == ""){
			Notification.alert("Coming Soon...", null, "施工中!!!", "朕知道了");
			return;
		}
		if(state == "NewRoom")
			Core.deleteTemp("NewRoom");
		if(state == "Turntable"){
			var info = $rootScope.info;
			var room = {
				rid: "self",
				master: {
					uid: info.uid,
					name: info.name,
					photo: info.photo,
				},
				title: "一個人的享受時光",
				time: $rootScope.getInitTime().getTime(),
				goalUId: null,
				chats: {},
				members: {"Server": {name: "Server", photo: "images/NoPhoto.jpg", uid: "Server"}},
				advices: {},
			};
			var stores = Core.stores;
			console.log(stores);
			for(var i in Core.stores){
				var store = stores[i];
				room.advices[store.sid] = {
					sid: store.sid,
					name: store.name,
					uid: "Server",
				};
			}
			Core.createTemp("Turntable", room);
		}
			
		$state.go(state);
	}
	
	$scope.slideRight = function(){
		$ionicSideMenuDelegate.toggleRight($scope);
	}
});