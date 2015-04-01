'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/addComp', {
        templateUrl: 'partials/addComp',
        controller: AddCompCtrl
      }).
      when('/addStock', {
        templateUrl: 'partials/addStock',
        controller: AddStockCtrl
      }).
      when('/readStock/:id', {
        templateUrl: 'partials/readStock',
        controller: ReadStockCtrl
      }).
      when('/editPost/:id', {
        templateUrl: 'partials/editPost',
        controller: EditPostCtrl
      }).
      when('/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeletePostCtrl
      }).
      when('/readComp/:id', {
        templateUrl: 'partials/readComp',
        controller: ReadCompCtrl
      }).
      when('/searchStock',{                     //newly added
        templateUrl: 'partials/searchStock',
        controller: SearchStockCtrl 
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);