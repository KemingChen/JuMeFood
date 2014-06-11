app.factory("Core", function($window, $rootScope) {
	return{
		roomList: roomList,
		inviteds: inviteds,
		stores: stores,

		addInvited: addInvited,
		addRoom: addRoom,
		addMember: addMember,
		addChat: addChat,
		addAdvise: addAdvise,
		addStore: addStore,

		getTemp: getTemp,
		createTemp: createTemp,
		deleteTemp: deleteTemp,

		setHost: setHost,
		getHost: getHost,

		checkLogin: checkLogin,
	}

	var temps = {};
	var roomList = {};
	var inviteds = {};
	var stores = {};

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
				advises: {},
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
					uid: datas.uid,
					message: datas.message,
					timestamp: (new Date(datas.timestamp)).getTime(),
				}
			}
		}
	}

	function addAdvise(datas){
		if(checkDatas(datas, ["rid", "sid", "name", "uid"])){
			if(roomList[datas.rid]){
				roomList[datas.rid].goalUId = datas.goalUId ? datas.goalUId : null;
				roomList[datas.rid].advises[datas.uid] = {
					uid: datas.uid,
					name: datas.name,
					sid: datas.sid,
				}
			}
		}
	}

	function addStore(datas){
		if(checkDatas(datas, ["sid", "name", "price", "latitude", "longitude"])){
			if(stores[datas.sid]){
				stores[datas.sid] = {
					sid: datas.sid,
					name: datas.name,
					price: datas.price,
					latitude: datas.latitude,
					longitude: datas.longitude,
				}
			}
		}
	}

	function checkDatas(datas, array){
		for(var i in array){
			if(typeof(datas[array[i]]) === "undefined")
				return false;
		}
		return true;
	}

	function deleteTemp(tag){
		delete temps[tag];
	}

	function createTemp(tag, datas){
		temps[tag] = datas;
	}

	function getTemp(tag){
		return temps[tag];
	}

	function setHost(datas){
		$window.localStorage['host'] = JSON.stringify(datas);
	}

	function getHost(){
		return $window.localStorage['host'] ? JSON.parse($window.localStorage['host']) : {};
	}

	function checkLogin(){
		if($rootScope.info.token){
			return true;
		}
		$window.location = "#/login";
	}

	// --------- Test ------------- //
	addRoom({rid: 1, master: {uid: 1, name: "Flex", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1.0-1/c37.55.466.466/s160x160/547766_578607275491125_1443285479_n.jpg"}, title: "午餐吃啥好哩", time: "2014-06-9 12:00:00"})
	addRoom({rid: 2, master: {uid: 2, name: "Keming", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/t1.0-1/c21.76.462.462/s160x160/546081_4583705557198_1334797284_n.jpg"}, title: "想逛夜市拉!!!!", time: "2014-06-8 18:00:00"})
	addRoom({rid: 3, master: {uid: 3, name: "Kai", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/t1.0-1/c1.105.539.539/s160x160/10177381_864736900207514_741078063891111022_n.jpg"}, title: "不知吃啥好哩QQ", time: "2014-06-12 19:00:00"})

	addMember({rid: 1, uid: 1, name: "Flex", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1.0-1/c37.55.466.466/s160x160/547766_578607275491125_1443285479_n.jpg", isAccept: true});
	addMember({rid: 1, uid: 2, name: "Keming", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/t1.0-1/c21.76.462.462/s160x160/546081_4583705557198_1334797284_n.jpg", isAccept: true});
	addMember({rid: 1, uid: 3, name: "Kai", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/t1.0-1/c1.105.539.539/s160x160/10177381_864736900207514_741078063891111022_n.jpg", isAccept: false});

	addChat({rid: 1, mid: 1, uid: 1, message: "哈囉各位~~~", timestamp: "2014-06-8 21:06:01"});
	addChat({rid: 1, mid: 2, uid: 2, message: "Hi!!!!", timestamp: "2014-06-8 21:07:01"});
	addChat({rid: 1, mid: 3, uid: 3, message: "要吃高家嗎?", timestamp: "2014-06-8 21:08:01"});
	addChat({rid: 1, mid: 4, uid: 1, message: "哎唷~ 不錯唷~~~~", timestamp: "2014-06-8 21:09:01"});
	addChat({rid: 1, mid: 5, uid: 3, message: "推薦了 '高家涼麵'", timestamp: "2014-06-8 21:09:11"});
	addChat({rid: 1, mid: 6, uid: 2, message: "推薦了 '楊記餛飩麵'", timestamp: "2014-06-8 21:11:15"});
	addChat({rid: 1, mid: 7, uid: 2, message: "我想吃這個....", timestamp: "2014-06-8 21:11:19"});

	addAdvise({rid: 1, goalUId: null, sid: null, uid: 3, name: "高家涼麵"});
	addAdvise({rid: 1, goalUId: null, sid: null, uid: 2, name: "楊記餛飩麵"});
});