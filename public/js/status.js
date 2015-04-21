myApp.controller('StatusController', function(
	$scope, $rootScope, AuthService, $location) {

	AuthService.checkLogin(function(user) {
		$rootScope.user = user;
	});

	$scope.logout = function(){
    	AuthService.logOut();
  	};
});