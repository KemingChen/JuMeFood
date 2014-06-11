app.factory('ServerAPI', function($window, $rootScope, Notification, Core) {
	return {
		login: login,
	}

	function login(datas){
		console.log(JSON.stringify(datas));
		var http = toRequest("/login", datas);

		http.success(function(respnose, status) {
			$rootScope.hideLoading();
			console.log("SUCCESS: " + toLog(respnose, 300));

			if(!isError(respnose)){
				Core.setHost(respnose);
				$rootScope.saveToInfo(respnose);
				$rootScope.onLoginSuccess(respnose);
			}
			else{
				Notification.alert(respnose.errors, function(){
					Core.setHost({});
					$rootScope.testLogin();
				}, "Error", "確定");
			}
		});
		http.error(function(data, status){
			$rootScope.showLoading("網路不穩, Login Retry...");
			$timeout(function(){
				login(loginForm);
			}, 1000);
		});
	}
	function toRequest(action, data, useToken){
		var info = $rootScope.info;
		var api = info.server + action;
		console.log("use api: " + api + ", DATA: " + toLog(data, 300));
		
		if(useToken && typeof data === "object"){
			data.token = info.token;
		}

		return $http({
			method: 'POST',
			url: api,
			data: data,
			timeout: info.timeout,
		});
	}

	function toLog(log, length){
		if(typeof log === "object")
			log = JSON.stringify(log);
		return  log.length >= length ? log.substr(0, length) + "..." : log;
	}

	function isError(respnose){
		console.log("RESPONSE: " + JSON.stringify(respnose));
		return typeof respnose.errors === "string";
	}

	function showNetworkError(message, callback){
		Notification.confirm(message, function(action){
			console.log("confirm get button " + action + ";");
			if(action == 2){
				callback();
			}
		}, "網路不穩", "No,Yes");
	}

	function doNothing(respnose, status){
		if(!isError(respnose)){
			console.log("Respnose Do Nothing!!!");
		}
	}
});