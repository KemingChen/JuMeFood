app.factory('ServerAPI', function($window, $rootScope, $http, Notification, Core, $timeout) {
	function login(datas){
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
				console.log(respnose.errors.code);
				Notification.alert(respnose.errors.code, function(){
					Core.setHost({});
					$rootScope.testLogin();
				}, "Error", "確定");
			}
		});
		http.error(function(data, status){
			$rootScope.showLoading("網路不穩, Login Retry...");
			$timeout(function(){
				login(datas);
			}, 1000);
		});
	}

	function listInvited(){
		var http = toRequest("/listInvited", {}, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				listInvited();
			}, 1000);
		});
	}

	function listRooms(){
		var http = toRequest("/listRooms", {}, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				listRooms();
			}, 1000);
		});
	}

	function listRoomMembers(datas){
		var http = toRequest("/listRoomMembers", datas, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				listRoomMembers(datas);
			}, 1000);
		});
	}

	function listRoomAdvices(datas){
		var http = toRequest("/listRoomAdvices", datas, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				listRoomAdvices(datas);
			}, 1000);
		});
	}

	function listRoomMsg(datas){
		var http = toRequest("/listRoomMsg", datas, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				listRoomMsg(datas);
			}, 1000);
		});
	}

	function createRoom(datas){
		var http = toRequest("/createRoom", datas, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				createRoom(datas);
			}, 1000);
		});
	}

	function quitRoom(datas){
		var http = toRequest("/quitRoom", datas, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				quitRoom(datas);
			}, 1000);
		});
	}

	function sendAdvice(datas){
		var http = toRequest("/sendAdvice", datas, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				sendAdvice(datas);
			}, 1000);
		});
	}

	function sendMsg(datas){
		var http = toRequest("/sendMsg", datas, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				sendMsg(datas);
			}, 1000);
		});
	}

	function listStore(datas){
		var http = toRequest("/listStore", datas, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				listStore(datas);
			}, 1000);
		});
	}

	function go(datas){
		var http = toRequest("/go", datas, true);

		//test
		$window.receiveMessage('{"action":"go","data":{"rid":1,"goal":9}}');


		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				go(datas);
			}, 1000);
		});
	}

	function acceptInvitation(datas){
		var http = toRequest("/acceptInvitation", datas, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				acceptInvitation(datas);
			}, 1000);
		});
	}

	function refuseInvitation(datas){
		var http = toRequest("/refuseInvitation", datas, true);

		http.success(doNothing);
		http.error(function(data, status){
			$timeout(function(){
				refuseInvitation(datas);
			}, 1000);
		});
	}


	function toRequest(action, data, useToken){
		var info = $rootScope.info;
		var api = info.server + action;
		
		if(useToken && typeof data === "object"){
			console.log("using Token!!!");
			data.token = info.token;
		}
		console.log("use api: " + api + ", DATA: " + toLog(data, 300));

		return $http({
			method: 'POST',
			url: api,
			data: data,
			timeout: info.timeout,
		});
	}

	function toLog(data, length){
		if(typeof data === "object")
			log = JSON.stringify(data);
		return  log.length >= length ? log.substr(0, length) + "..." : log;
	}

	function isError(respnose){
		console.log("RESPONSE: " + JSON.stringify(respnose));
		return typeof respnose.errors != "undefined";
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
		// $rootScope.hideLoading();
		console.log("SUCCESS: " + toLog(respnose, 300));
		if(!isError(respnose)){
			console.log("Respnose Do Nothing!!!");
		}
	}

	return {
		login: login,
		listInvited: listInvited,
		listRooms: listRooms,
		listRoomMembers: listRoomMembers,
		listRoomAdvices: listRoomAdvices,
		listRoomMsg: listRoomMsg,
		createRoom: createRoom,
		quitRoom: quitRoom,
		sendAdvice: sendAdvice,
		sendMsg: sendMsg,
		listStore: listStore,
		go: go,
		acceptInvitation: acceptInvitation,
		refuseInvitation: refuseInvitation,
	}
});