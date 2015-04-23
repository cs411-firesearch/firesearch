myApp.controller('StatusController', function(
	$scope, $rootScope, AuthService, $location, $route, $http) {

	AuthService.checkLogin(function(user) {
		// console.log(user);
		$rootScope.user = user;
	});

	$scope.logout = function(){
    	AuthService.logOut();
  	};

  	$scope.nextDay = function() {
  		$http.post('/refreshPrices', {
  			password: 'molotov'
  		}).success(function() {
  			$route.reload();
  		});
  	}
});