app.controller('MapCtrl', function($scope, $stateParams, Geolocation, Core){
	var sid = $stateParams.sid;
	var store = Core.stores[sid];

	var latitude = store.latitude;
	var longitude = store.longitude;

	var mapOptions = {
		zoom: 13,
		disableDefaultUI: true
	};

	$scope.distance = {text: ""};
	$scope.duration = {duration: ""};
	$scope.title = store.name;

	function testGeolocation(callback){
		callback({
			coords: {
				latitude: 25.0441269,
				longitude: 121.5368463,
			},
		});
	}

	$scope.init = function(){
		// Geolocation.getCurrentPosition(function(position) {
		testGeolocation(function(position){
			console.log("Self Position: " + JSON.stringify(position));
			var directionsService = new google.maps.DirectionsService();

			var origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var destination = new google.maps.LatLng(latitude, longitude);
			
			mapOptions.center = origin;
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			
			var directionsDisplay = new google.maps.DirectionsRenderer({
				markerOptions: {
					visible:false
				},
				map: map,
			});
			var request = {
				origin: origin,
				destination: destination,
				travelMode: google.maps.TravelMode.WALKING
			};
			directionsService.route(request, function(result, status) {
				console.log(JSON.stringify(status));
				if (status == google.maps.DirectionsStatus.OK) {
					console.log(JSON.stringify(result));
					var leg = result.routes[0].legs[0];
					directionsDisplay.setDirections(result);
					$scope.distance.text = leg.distance.text;
					$scope.duration.text = leg.duration.text;
					$scope.$apply();

					var destinationMarker = new MarkerWithLabel({
						position: new google.maps.LatLng(leg.end_location.k, leg.end_location.A),
						labelContent: "店家",
						labelAnchor: new google.maps.Point(30, 0),
						labelClass: "labels"
					});
					var originMarker = new MarkerWithLabel({
						position: new google.maps.LatLng(leg.start_location.k, leg.start_location.A),
						labelContent: "我",
						labelAnchor: new google.maps.Point(30, 0),
						labelClass: "labels"
					});
					originMarker.setMap(map);
					destinationMarker.setMap(map);
					directionsDisplay.setMap(map);
				}
			});
		});
	}
});
