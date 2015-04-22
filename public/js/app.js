'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']).
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
      when('/searchStock',{                      
        templateUrl: 'partials/searchStock',
        controller: SearchStockCtrl 
      }).
      when('/signup',{
        templateUrl:'partials/SignUpUser',
        controller: SignUpCtrl
      }).
      when('/loginpage', {
        templateUrl: 'partials/logInUser',
        controller: LogInCtrl
      }).
      when('/myPort',{
        templateUrl: 'partials/myPortfolio',
        controller: MyPortCtrl
      }).
      when('/recommend',{
        templateUrl: 'partials/recommend',
        controller: RecommendCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);


// myApp.directive("linearChart", function($window) {
//   return{
//     restrict: "EA",
//     link: function(scope, elem, attrs){
      
// var margin = {top: 30, right: 20, bottom: 30, left: 50},
//     width = 600 - margin.left - margin.right,
//     height = 270 - margin.top - margin.bottom;


// var datas = [76.1, 75.1, 78.5, 68.1]
// var max = d3.max(datas);

// var min = d3.min(datas);

// var scope = max - min;
// //console.log(scope);
// // Set the ranges
// var x = d3.scale.linear().range([0, width]);
// var y = d3.scale.linear().range([height, 0]);

// // Define the axes
// var xAxis = d3.svg.axis().scale(x)
//     .orient("bottom").ticks(5);

// var yAxis = d3.svg.axis().scale(y)
//     .orient("left").ticks(5);

// var unitWeight = width/4;

// var unitY = height/(scope*2);
// // Define the line
// var i = 0;
// var valueline = d3.svg.line()
//     .x(function(d) { i++; return (i-0.5)*unitWeight; })
//     .y(function(d) { var posY = height - (datas[i-1]-min+scope/2)*unitY; return posY; });
    
// // Adds the svg canvas
// var svg = d3.select(".title")
//     .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//         .attr("transform", 
//               "translate(" + margin.left + "," + margin.top + ")");

// var point = svg.append("g")
// .attr("class", "line-point");


// // Get the data
// x.domain([0.5, 4.5]);
// y.domain([min - scope/2, max + scope/2]);

// svg.append("path")
//     .attr("class", "line")
//     .attr("d", valueline(datas));

// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);

//     // Add the Y Axis
// svg.append("g")
//     .attr("class", "y axis")
//     .call(yAxis);


// var b = 0;
// point.selectAll('circle')
// .data(datas)
// .enter().append('circle')
// .attr("cx", function(d) { b++; return (b-0.5)*unitWeight; })
// .attr("cy", function(d) { var pos = height - (d-min+scope/2)*unitY;  return pos;})
// .attr("r", 3.5)
// .style("fill", "black")

// var c = 0;

// var labels = svg.append("g")
// .attr("class", "labels");

// var xArray = [0, 1*unitWeight,2*unitWeight,3*unitWeight];
// var yArray = [height - (datas[0]-min+scope/2)*unitY, height - (datas[1]-min+scope/2)*unitY, height - (datas[2]-min+scope/2)*unitY, height - (datas[3]-min+scope/2)*unitY]
// var one = [0];
// for (var i = datas.length - 1; i >= 0; i--) {
//     //console.log(i); 
//     var xPP = (i+0.25)*unitWeight;
//     var yPP = height - (datas[i]-min+scope/1.5)*unitY;
//     labels.selectAll('labels')
//     .data(one)
//     .enter().append("text")
//     .attr("x", function() { return xPP;})
//     .attr("y", function() { return yPP; })
//     .text((4-i)+" days before: "+datas[i]);
// };
//     }
//   };
// });