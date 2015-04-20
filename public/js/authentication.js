myApp.factory('AuthService', function( $http, $rootScope, $location) {
	var authService = {};

	authService.checkLoggedIn = function(fn) {
		$http.get('/checklogin').success(function(data) {
			fn(data.loggedin);
		});
	}

	authService.getCurrentUser = function(fn) {
		$http.get('/checklogin').success(function(data) {
			if (data.userId) {
				fn({
					userId: data.userId,
					userName: data.userName
				});
			}
		});
	}

	authService.logOut = function() {
		$http.get('/logout').success(function(){
			$location.path('/');
		})
	}

	return authService;
});