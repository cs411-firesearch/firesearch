
myApp.factory('Utilities', function($http) {
	
	var utils = {};

	utils.wrapFloat = function(n) {
		return n.toFixed(2);
	}

	return utils;
});