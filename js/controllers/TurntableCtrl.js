app.controller('TurntableCtrl', function($scope, $rootScope, Core){
	$('.slot').jSlots({
		spinner : '#playNormal',
		number : 1,
		winnerIndex : 3
	});
});