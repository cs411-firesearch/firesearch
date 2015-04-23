myApp.directive("linearChart", function($window) {
  return{
    restrict: "EA",
    link: function(scope, elem, attrs){
scope.$watch('stock', function(newVal) {

    if (!newVal)
        return;

    var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

var datas = [newVal.Season1, newVal.Season2, newVal.Season3, newVal.Season4];
var max = d3.max(datas);

var min = d3.min(datas);

var scopes = max - min;
//console.log(scope);
// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

var unitWeight = width/4.3;

var unitY = height/(scopes*2);
// Define the line
var i = 0;
var valueline = d3.svg.line()
    .x(function(d) { i++; return (i-0.5)*unitWeight; })
    .y(function(d) { var posY = height - (datas[i-1]-min+scopes/2)*unitY; return posY; });
    
// Adds the svg canvas
var svg = d3.select(".title")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

var point = svg.append("g")
.attr("class", "line-point");


// Get the data
x.domain([0.5, 4.8]);
y.domain([min - scopes/2, max + scopes/2]);

svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(datas));

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    // Add the Y Axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);


var b = 0;
point.selectAll('circle')
.data(datas)
.enter().append('circle')
.attr("cx", function(d) { b++; return (b-0.5)*unitWeight; })
.attr("cy", function(d) { var pos = height - (d-min+scopes/2)*unitY;  return pos;})
.attr("r", 3.5)
.style("fill", "black")

var c = 0;

var labels = svg.append("g")
.attr("class", "labels");

var one = [0];
for (var i = datas.length - 1; i >= 0; i--) {
    //console.log(i); 
    var xPP = (i+0.1)*unitWeight;
    var yPP = height - (datas[i]-min+scopes/1.5)*unitY;
    labels.selectAll('labels')
    .data(one)
    .enter().append("text")
    .attr("x", function() { return xPP;})
    .attr("y", function() { return yPP; })
    .text((4-i)+" days before: "+datas[i]);
};
});
        
      

    }
  };
});