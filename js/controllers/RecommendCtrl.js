app.controller('RecommendCtrl', function($scope, $stateParams, Geolocation, Core){
	var mapOptions = {
		zoom: 17,
		disableDefaultUI: false
	};

	$scope.init = function(){
		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		var originMarker = new MarkerWithLabel();
		Geolocation.getCurrentPosition(function(position) {
			console.log("Self Position: " + JSON.stringify(position));
			var origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(origin);
			originMarker.setPosition(origin);
			originMarker.setMap(map);
		});
		google.maps.event.addListener(map, 'center_changed', function() {
			originMarker.setPosition(map.getCenter());
			originMarker.setMap(map);
		});
	}
});
