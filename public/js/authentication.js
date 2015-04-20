myApp.factory('AuthService', function( $http, $rootScope, $location) {
	var authService = {};

	authService.checkLoggedIn = function(fn) {
		$http.get('/auth/checklogin').success(function(data) {
			fn(data.loggedin);
		});
	}

	authService.getCurrentUser = function(fn) {
		$http.get('/auth/checklogin').success(function(data) {
			if (data.userId) {
				fn({
					userId: data.userId,
					userName: data.userName
				});
			}
		});
	}

	authService.logOut = function() {
		$http.get('/auth/logout').success(function(){
			$location.path('/');
		})
	}

	authService.logIn = function(form, success) {
		$http.post('/auth/login', form).
			success(function(data) {
				success(data);
			});
	}

	return authService;
});