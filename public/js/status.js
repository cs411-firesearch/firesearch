myApp.controller('StatusController', function(
	$scope, $rootScope, AuthService) {

	AuthService.checkLogin(function(user) {
		$rootScope.user = user;
	});

});