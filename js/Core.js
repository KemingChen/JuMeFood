app.factory("Core", function() {
	var temps = {};
	var roomList = {};

	function addRoom(datas){
		if(checkDatas(datas, ["roomId", "master", "title", "time"])){
			roomList[datas.roomId] = {
				roomId: datas.roomId,
				master: datas.master,
				title: datas.title,
				time: (new Date(datas.time)).getTime(),
				chats: {},
				members: {},
				advises: {},
			}
			console.log(roomList);
		}
	}

	function addMember(datas){
		console.log(datas);
		if(checkDatas(datas, ["roomId", "uId", "name", "photo", "isAccept"])){
			if(roomList[datas.roomId]){
				roomList[datas.roomId].members[datas.uId] = {
					uId: datas.uId,
					name: datas.name,
					photo: datas.photo,
					isAccept: datas.isAccept,
				}
			}
		}
	}

	function addChat(datas){
		if(checkDatas(datas, ["roomId", "mId", "uId", "message", "timestamp"])){
			if(roomList[datas.roomId]){
				roomList[datas.roomId].chats[datas.mId] = {
					uId: datas.uId,
					message: datas.message,
					timestamp: (new Date(datas.timestamp)).getTime(),
				}
			}
		}
	}

	function addAdvise(datas){
		if(checkDatas(datas, ["roomId", "storeId", "name", "uId"])){
			if(roomList[datas.roomId]){
				roomList[datas.roomId].advises[datas.uId] = {
					uId: datas.uId,
					name: datas.name,
					storeId: datas.storeId,
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

	// --------- Test ------------- //
	addRoom({roomId: 1, master: {uId: 1, name: "Flex", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1.0-1/c37.55.466.466/s160x160/547766_578607275491125_1443285479_n.jpg"}, title: "午餐吃啥好哩", time: "2014-06-9 12:00:00"})
	addRoom({roomId: 2, master: {uId: 2, name: "Keming", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/t1.0-1/c21.76.462.462/s160x160/546081_4583705557198_1334797284_n.jpg"}, title: "想逛夜市拉!!!!", time: "2014-06-8 18:00:00"})
	addRoom({roomId: 3, master: {uId: 3, name: "Kai", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/t1.0-1/c1.105.539.539/s160x160/10177381_864736900207514_741078063891111022_n.jpg"}, title: "不知吃啥好哩QQ", time: "2014-06-12 19:00:00"})

	addMember({roomId: 1, uId: 1, name: "Flex", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1.0-1/c37.55.466.466/s160x160/547766_578607275491125_1443285479_n.jpg", isAccept: true});
	addMember({roomId: 1, uId: 2, name: "Keming", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/t1.0-1/c21.76.462.462/s160x160/546081_4583705557198_1334797284_n.jpg", isAccept: true});
	addMember({roomId: 1, uId: 3, name: "Kai", photo: "http://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/t1.0-1/c1.105.539.539/s160x160/10177381_864736900207514_741078063891111022_n.jpg", isAccept: false});

	addChat({roomId: 1, mId: 1, uId: 1, message: "哈囉各位~~~", timestamp: "2014-06-8 21:06:01"});
	addChat({roomId: 1, mId: 2, uId: 2, message: "Hi!!!!", timestamp: "2014-06-8 21:07:01"});
	addChat({roomId: 1, mId: 3, uId: 3, message: "要吃高家嗎?", timestamp: "2014-06-8 21:08:01"});
	addChat({roomId: 1, mId: 4, uId: 1, message: "哎唷~ 不錯唷~~~~", timestamp: "2014-06-8 21:09:01"});
	addChat({roomId: 1, mId: 5, uId: 3, message: "推薦了 '高家涼麵'", timestamp: "2014-06-8 21:09:11"});
	addChat({roomId: 1, mId: 6, uId: 2, message: "推薦了 '楊記餛飩麵'", timestamp: "2014-06-8 21:11:15"});
	addChat({roomId: 1, mId: 7, uId: 2, message: "我想吃這個....", timestamp: "2014-06-8 21:11:19"});

	addAdvise({roomId: 1, storeId: null, uId: 3, name: "高家涼麵"});
	addAdvise({roomId: 1, storeId: null, uId: 2, name: "楊記餛飩麵"});

	return{
		roomList: roomList,
		
		getTemp: getTemp,
		createTemp: createTemp,
		deleteTemp: deleteTemp,
	}
});