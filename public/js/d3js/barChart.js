myApp.directive("barChart", function($window) {
  return{
    restrict: "EA",
    link: function(scope, elem, attrs){
        scope.$watch('stocks', function(newVal) {
            var max = 0;
            for (var i = newVal.length - 1; i >= 0; i--) {
                if (max<newVal[i].Volume) {max = newVal[i].Volume};  
            };
            var x = d3.scale.linear()
                .domain([0, max])
                .range([0, 420]);

            d3.select(".bchart")
              .selectAll("div")
                .data(newVal)
              .enter().append("div")
                .style("width", function(d) { return x(d.Volume) + "px"; })
                .text(function(d) { return d.TransCode+": "+d.Volume; });

        });
    }
  };
});