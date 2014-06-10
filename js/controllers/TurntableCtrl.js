app.controller('TurntableCtrl', function($scope, $rootScope, Core){
	$('.slot').jSlots({
		spinner : '#playNormal',
		winnerNumber : 7,
		number : 1,
		winnerIndex : 3
	});
});