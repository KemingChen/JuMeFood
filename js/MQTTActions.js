app.factory('MQTTActions', function($window, $rootScope, Notification, Core, $state) {
	function listInvited(datas){
		if(!isError(datas)){
			var invitedList = datas.invitedList;
			for(var i in invitedList){
				var invited = invitedList[i];
				invited.master = getMaster(invited);
				invited.time = invited.time * 1000;
				Core.addInvited(invited);
			}
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function listRooms(datas){
		if(!isError(datas)){
			var rooms = datas;
			for(var i in rooms){
				var room = rooms[i];
				room.master = getMaster(room);
				room.time = room.time * 1000;
				Core.addRoom(room);
			}
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function listRoomMembers(datas){
		if(!isError(datas)){
			var members = datas.members;
			for(var i in members){
				var member = members[i];
				member.rid = datas.rid;
				member.isAccept = datas.status == "accept";
				Core.addMember(member);
			}
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function listRoomAdvices(datas){
		if(!isError(datas)){
			var advices = datas.advices;
			for(var i in advices){
				var advice = advices[i];
				advice.rid = datas.rid;
				advice.goalUId = datas.goalUId;
				Core.addAdvice(advice);
			}
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function roomMsgs(datas){
		if(!isError(datas)){
			var Msgs = datas.Msgs;
			for(var i in Msgs){
				var Msg = Msgs[i];
				Msg.rid = datas.rid;
				Msg.timestamp = Msg.timestamp * 1000;
				Core.addChat(Msg);
			}
			$rootScope.$broadcast('NewMsg', {rid: datas.rid});
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function createRoom(datas){
		if(!isError(datas)){
			datas.master = getMaster(datas);
			datas.time = datas.time * 1000;
			Core.addRoom(datas);
			$rootScope.hideLoading();
			$state.go("Room", {rid: datas.rid});
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function newInvited(datas){
		if(!isError(datas)){
			datas.master = getMaster(datas);
			datas.time = datas.time * 1000;
			Core.addInvited(datas);
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function quitRoom(datas){
		if(!isError(datas)){
			$rootScope.$broadcast('QuitRoom', {rid: datas.rid});
			delete Core.roomList[datas.rid];
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function addAdvice(datas){
		if(!isError(datas)){
			Core.addAdvice(datas);
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function sendMsg(datas){
		if(!isError(datas)){
			datas.timestamp = datas.timestamp * 1000;
			Core.addChat(datas);
			$rootScope.$broadcast('NewMsg', {rid: datas.rid});
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function listStore(datas){
		if(!isError(datas)){
			for(var i in datas){
				Core.addStore(datas[i]);
			}
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function go(datas){
		if(!isError(datas)){
			$rootScope.$broadcast('GO', datas);
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function acceptInvitation(datas){
		if(!isError(datas)){
			var roomList = Core.roomList;
			if(roomList[datas.rid]){
				var member = roomList[datas.rid].members[datas.uid];
				if(member){
					member.isAccept = true;
				}
			}
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function refuseInvitation(datas){
		if(!isError(datas)){
			var roomList = Core.roomList;
			if(roomList[datas.rid]){
				var member = roomList[datas.rid].members[datas.uid];
				if(member){
					member.isAccept = false;
				}
			}
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors, null, "Error", "確定");
		}
	}

	function getMaster(data){
		return {
			uid: data.masterUid,
			name: data.masterName,
			photo: data.masterPhoto,
		};
	}

	function isError(datas){
		console.log("RESPONSE: " + JSON.stringify(datas));
		return typeof datas.errors != "undefined";
	}
	
	return{
		listInvited: listInvited,
		listRooms: listRooms,
		listRoomMembers: listRoomMembers,
		listRoomAdvices: listRoomAdvices,
		roomMsgs: roomMsgs,
		createRoom: createRoom,
		newInvited: newInvited,
		quitRoom: quitRoom,
		addAdvice: addAdvice,
		sendMsg: sendMsg,
		listStore: listStore,
		go: go,
		acceptInvitation: acceptInvitation,
		refuseInvitation: refuseInvitation,
	}	
});