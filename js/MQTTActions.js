app.factory('MQTTActions', function($window, $rootScope, Notification, Core) {
	function listRooms(datas){
		if(!isError(datas)){
			var rooms = datas.roomList;
			for(var i in rooms){
				var room = rooms[i];
				room.master = {
					uid: room.masterUid,
					name: room.masterName,
					photo: room.masterPhoto,
				};
				room.time = (new Date(room.time)).getTime();
				Core.addRoom(room);
			}
		}
		else{
			console.log(datas.errors);
			Notification.alert(datas.errors.code, null, "Error", "確定");
		}
	}

	function isError(datas){
		console.log("RESPONSE: " + JSON.stringify(datas));
		return typeof datas.errors != "undefined";
	}	
});