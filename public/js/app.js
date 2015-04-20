'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute','myApp.filters', 'myApp.services', 'myApp.directives']).
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
      when('/readComp/:id', {
        templateUrl: 'partials/readComp',
        controller: ReadCompCtrl
      }).
      when('/searchStock',{                     //newly added
        templateUrl: 'partials/searchStock',
        controller: SearchStockCtrl 
      }).
      when('/loginpage', {
        templateUrl: 'partials/logInUser',
        controller: LogInCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);