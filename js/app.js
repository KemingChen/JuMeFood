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
		.state('Room', {
			url: '/Room/:roomId',
			templateUrl: 'templates/chatRoom.html',
			controller: 'RoomCtrl'
		})
		.state('Turntable', {
			url: '/Turntable',
			templateUrl: 'templates/turntable.html',
			controller: 'TurntableCtrl'
		});

	// $urlRouterProvider.otherwise("/Reminder/0961276368/3");
});

app.run(function($rootScope, $window, $ionicLoading, PushNotificationsFactory, PhoneGap, FacebookAPI, MQTTActions) {
	var version = "JuMeFood v3.0";
	console.log(version);
	$rootScope.info = {
		server: "http://192.168.1.176:8888",
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

		$rootScope.info.uId = 2;

		$window.location = "#/login"
	}

	$rootScope.onLoginSuccess = function(response){
		PhoneGap.ready(function(){
            var clientId = "JuMe" + response.FBId;
            var topic = "JuMe" + response.token;
			$window.plugins.MQTTPlugin.CONNECT(angular.noop, angular.noop, clientId, topic);
		});
		console.log("Success: Login")
	}

	$rootScope.successGetGCMRegId = function(gcmRegId){
		console.log("SUCCESS: Get GCMRegId=>" + gcmRegId);
		$rootScope.info.gcmRegId = gcmRegId;

		$rootScope.testLogin();
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

	$rootScope.showLoading(version);
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