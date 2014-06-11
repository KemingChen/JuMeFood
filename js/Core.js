app.factory("Core", function($window, $rootScope) {
	var roomList = {};
	var inviteds = {};
	var stores = {};
	var myTemp = {};

	function addInvited(datas){
		if(checkDatas(datas, ["rid", "title", "master", "time"])){
			inviteds[datas.rid] = {
				rid: datas.rid,
				master: datas.master,
				title: datas.title,
				time: (new Date(datas.time)).getTime(),
			}
			// console.log(inviteds);
		}
	}

	function addRoom(datas){
		if(checkDatas(datas, ["rid", "master", "title", "time"])){
			roomList[datas.rid] = {
				rid: datas.rid,
				master: datas.master,
				title: datas.title,
				time: (new Date(datas.time)).getTime(),
				goalUId: null,
				chats: {},
				members: {},
				advices: {},
				isUpdate: false,
			}
			// console.log(roomList);
		}
	}

	function addMember(datas){
		console.log(datas);
		if(checkDatas(datas, ["rid", "uid", "name", "photo", "isAccept"])){
			if(roomList[datas.rid]){
				roomList[datas.rid].members[datas.uid] = {
					uid: datas.uid,
					name: datas.name,
					photo: datas.photo,
					isAccept: datas.isAccept,
				}
			}
		}
	}

	function addChat(datas){
		if(checkDatas(datas, ["rid", "mid", "uid", "message", "timestamp"])){
			if(roomList[datas.rid]){
				roomList[datas.rid].chats[datas.mid] = {
					mid: datas.mid,
					uid: datas.uid,
					message: datas.message,
					timestamp: (new Date(datas.timestamp)).getTime(),
				}
			}
		}
	}

	function addAdvice(datas){
		if(checkDatas(datas, ["rid", "sid", "name", "uid"])){
			if(roomList[datas.rid]){
				roomList[datas.rid].goalUId = datas.goalUId ? datas.goalUId : null;
				roomList[datas.rid].advices[datas.uid] = {
					uid: datas.uid,
					name: datas.name,
					sid: datas.sid,
				}
			}
		}
	}

	function addStore(datas){
		console.log(datas);
		if(checkDatas(datas, ["sid", "name", "price", "latitude", "longitude"])){
			stores[datas.sid] = {
				sid: datas.sid,
				name: datas.name,
				price: datas.price,
				latitude: datas.latitude,
				longitude: datas.longitude,
			};
		}
		console.log(stores);
	}

	function checkDatas(datas, array){
		for(var i in array){
			if(typeof(datas[array[i]]) === "undefined"){
				console.log("checkDatas Error!!!");
				return false;
			}
		}
		return true;
	}

	function deleteTemp(tag){
		delete myTemp[tag];
	}

	function createTemp(tag, datas){
		myTemp[tag] = datas;
	}

	function getTemp(tag){
		return myTemp[tag] ? myTemp[tag] : null;
	}

	function setHost(datas){
		$window.localStorage['host'] = JSON.stringify(datas);
	}

	function getHost(){
		return $window.localStorage['host'] ? JSON.parse($window.localStorage['host']) : {};
	}

	function checkLogin(){
		console.log("check login: " + $rootScope.info.token);
		if($rootScope.info.token){
			return true;
		}
		$window.location = "#/login";
	}

	return{
		roomList: roomList,
		inviteds: inviteds,
		stores: stores,

		addInvited: addInvited,
		addRoom: addRoom,
		addMember: addMember,
		addChat: addChat,
		addAdvice: addAdvice,
		addStore: addStore,

		getTemp: getTemp,
		createTemp: createTemp,
		deleteTemp: deleteTemp,

		setHost: setHost,
		getHost: getHost,

		checkLogin: checkLogin,
	};

});