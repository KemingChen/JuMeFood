var app = angular.module("JuMeFood", ['ionic', 'PhoneGap', 'ngTouch']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('tab', {
			url: "/tab",
			abstract: true,
			templateUrl: "templates/tab.html"
		})
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			controller: 'LoginCtrl'
		})
		.state('JuMeFood', {
			url: '/JuMeFood',
			templateUrl: 'templates/juMeFood.html',
			controller: 'JuMeFoodCtrl'
		})
		.state('NewRoom', {
			url: '/NewRoom',
			templateUrl: 'templates/newRoom.html',
			controller: 'NewRoomCtrl'
		})
		.state('SetRoomFriends', {
			url: '/SetRoomFriends',
			templateUrl: 'templates/chooseFriends.html',
			controller: 'NewRoomCtrl'
		})
		.state('Room', {
			url: '/Room/:rid',
			templateUrl: 'templates/chatRoom.html',
			controller: 'RoomCtrl'
		})
		.state('Turntable', {
			url: '/Turntable',
			templateUrl: 'templates/turntable.html',
			controller: 'TurntableCtrl'
		})
		.state('NewAdvice', {
			url: '/NewAdvice',
			templateUrl: 'templates/newAdvice.html',
			controller: 'NewAdviceCtrl'
		});
	// $urlRouterProvider.otherwise("/Reminder/0961276368/3");
});

app.run(function($rootScope, $window, $ionicLoading, PushNotificationsFactory, PhoneGap, FacebookAPI, MQTTActions, Core, ServerAPI) {
	var version = "JuMeFood v3.0";
	console.log(version);
	$rootScope.info = {
		server: "http://192.168.20.101:8888",
		timeout: 15000,
		gcmSenderId: '389225011519',
		FBAppId: '270369976420378',
	};
	console.log($rootScope.info.server);
	FacebookAPI.init();

	$rootScope.saveToInfo = function(data){
		for(i in data){
			$rootScope.info[i] = data[i];
		}
	}

	$rootScope.showLoading = function(message){
		$rootScope.loading = $ionicLoading.show({
			content: message,
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0,
		});
	}

	$rootScope.hideLoading = function(){
		if($rootScope.loading && $rootScope.loading.hide)
			$rootScope.loading.hide();
	}

	$rootScope.testLogin = function(){
		$rootScope.hideLoading();
		var response = Core.getHost();
		if(response.token){
			console.log("Auto Login...");
			FacebookAPI.login(function(FBToken){
				ServerAPI.login({
					GCMId: $rootScope.info.gcmRegId,
					FBToken: FBToken,
				});
			});
			return;
		}

		$window.location = "#/login";
	}

	$rootScope.onLoginSuccess = function(response){
		PhoneGap.ready(function(){
			var clientId = "JuMe" + response.FBId;
            var topic = "JuMe-" + response.token;
			$window.plugins.MQTTPlugin.CONNECT(angular.noop, angular.noop, clientId, topic);

			ServerAPI.listRooms();
			ServerAPI.listInvited();
			ServerAPI.listStore({tag: 1});

			// Test
			$window.receiveMessage('{"action":"listStore","data":[{"sid":1,"name":"高家涼麵","price":40,"latitude":25.042524,"longitude":121.539728},{"sid":2,"name":"垃圾麵","price":40,"latitude":25.043507,"longitude":121.53176},{"sid":3,"name":"漢堡王","price":100,"latitude":25.044112,"longitude":121.53144},{"sid":5,"name":"嵐迪義大利麵","price":100,"latitude":25.0428984,"longitude":121.5314894}]}');
			$window.receiveMessage('{"action":"listRooms","data":[{"rid":6,"title":"aaa","masterUid":8,"masterName":"Keming Chen","masterPhoto":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/t1.0-1/c21.76.462.462/s100x100/546081_4583705557198_1334797284_n.jpg","time":1402513200},{"rid":7,"title":"QQQ","masterUid":8,"masterName":"Keming Chen","masterPhoto":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/t1.0-1/c21.76.462.462/s100x100/546081_4583705557198_1334797284_n.jpg","time":1402515000},{"rid":8,"title":"宵夜團","masterUid":8,"masterName":"Keming Chen","masterPhoto":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/t1.0-1/c21.76.462.462/s100x100/546081_4583705557198_1334797284_n.jpg","time":1402516800},{"rid":9,"title":"衝衝團","masterUid":8,"masterName":"Keming Chen","masterPhoto":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/t1.0-1/c21.76.462.462/s100x100/546081_4583705557198_1334797284_n.jpg","time":1402516800}]}');
		});
		console.log("Success: Login");
		$window.location = "#/JuMeFood";
	}

	$rootScope.successGetGCMRegId = function(gcmRegId){
		console.log("SUCCESS: Get GCMRegId=>" + gcmRegId);
		$rootScope.info.gcmRegId = gcmRegId;

		$rootScope.testLogin();
	}

	$rootScope.getInitTime = function(){
		var time = new Date();
		time.setMinutes(time.getMinutes() + 20);
		var hour = time.getHours();
		var min = time.getMinutes();
		if(min > 30){
			time.setMinutes(0);
			time.setHours(hour + 1);
		}
		else{
			time.setMinutes(30);
		}
		time.setMilliseconds(0);
		time.setSeconds(0);
		return time;
	}

	$window.receiveMessage = function(payload) {
		var message = payload.length < 2000 ? payload : payload.length;
		console.log('SUCCESS FROM MQTT: ' + message);
		var res = JSON.parse(payload);
		if(!res || !res.action || !res.data){
			console.log("Received Error MQTTActions");
			return;
		}
		MQTTActions[res.action](res.data);
	}

	//$rootScope.showLoading(version);
	PushNotificationsFactory();
});

app.filter('orderObjectBy', function(){
	return function(input, attribute){
		if (!angular.isObject(input)) return input;

		var array = [];
		for(var objectKey in input){
			array.push(input[objectKey]);
		}

		array.sort(function(a, b){
			a = parseInt(a[attribute]);
			b = parseInt(b[attribute]);
			return a - b;
		});
		return array;
	}
});