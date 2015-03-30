'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/api/stocks').
    success(function(data, status, headers, config) {
      $scope.stocks = data.stocks;
    });
  $http.get('/api/comps').
    success(function(data, status, headers, config) {
      $scope.comps = data.comps;
    });
}

function AddCompCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/addComp', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}

function AddStockCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function() {
    $http.post('/api/addStock', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  }
}

function ReadCompCtrl($scope, $http, $routeParams) {
  $http.get('/api/comp/' + $routeParams.id).
    success(function(data) {
      $scope.comp = data.comp;
    });
}

function ReadStockCtrl($scope, $http, $routeParams) {
  $http.get('/api/stock/' + $routeParams.id).
    success(function(data) {
      $scope.stock = data.stock;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}
