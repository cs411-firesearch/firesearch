myApp.controller('StatusController', function(
	$scope, $rootScope, AuthService, $location) {

	AuthService.checkLogin(function(user) {
		// console.log(user);
		$rootScope.user = user;
	});

	$scope.logout = function(){
    	AuthService.logOut();
  	};
});