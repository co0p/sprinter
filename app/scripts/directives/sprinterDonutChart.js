'use strict';

var app = angular.module('sprinterApp');
app.directive('sprinterDonutChart', function($compile, d3) {
  return {
    replace: true,
    restrict: 'A',
    scope: {
      team: '=',
      teamName: '='
    },

    link: function($scope, $elem, attrs) {
      var data = [];
      var width = 350;
      var height = 200;
      var radius = Math.min(width, height) / 2;
      var color = d3.scale.category20();
      var labelr = radius + 10; // radius for label anchor
      var donut = d3.layout.pie();

      var groupingName = 'grouping-' + $scope.teamName;

      var arc = d3.svg.arc()
        .innerRadius(radius - radius*0.7)
        .outerRadius(radius);

      var vis = d3.select($elem[0])
        .append("svg:svg")
        .attr('id', 'svg-chart')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('id', groupingName);

      $scope.$watch('team', function() {

        // make sure we create a fresh diagram on change
        vis.selectAll('*').remove();
        data = [];

        var team = $scope.team;
        team.forEach(function(item) {
          if (item.hours > 0) {
            data.push({
              name: item.name,
              value: item.hours
            });
          }
        });

        vis.data([data]);
        var arcs = vis.selectAll("g.arc")
          .data(donut.value(function(d) { return d.value }))
          .enter().append("svg:g")
          .attr("class", "arc")
          .attr("transform", "translate(" + (radius + 10) + "," + radius + ")");

        arcs.append("svg:path")
          .attr("fill", function(d, i) { return color(i); })
          .attr("d", arc);

        arcs.append("svg:text")
          .attr("transform", function(d) {
            // put the label in center of pie but outside
            var c = arc.centroid(d),
              x = c[0],
              y = c[1],
              h = Math.sqrt(x*x + y*y);
            return "translate(" + (x/h * labelr) +  ',' + (y/h * labelr) +  ")";
          })
          .attr("dy", ".35em")
          .attr("text-anchor", function(d) {
            // are we past the center?
            return (d.endAngle + d.startAngle)/2 > Math.PI ?
              "end" : "start";
          })
          .text(function(d, i) { return d.data.name; });

        // we changed the dimension while adding text, therefore we have to scale the group
        // to fit into the parent container.
        var group = d3.select('#' + groupingName);
        var groupBBox = group.node().getBBox();
        var groupX = groupBBox.width  + 5; // add some padding
        var groupY = groupBBox.height + 5;
        var scaleX = (width < groupX) ? width / groupX : 1;
        var scaleY = (height < groupY) ? height / groupY : 1;
        var scale = (scaleX < scaleY) ? scaleX : scaleY;

        // now we have to reposition the group into the parent's center
        var newX = (groupBBox.x < 0) ? groupBBox.x * -1 : groupBBox.x;
        var newY = (groupBBox.y < 0) ? groupBBox.y * -1 : groupBBox.y;
        group.attr('transform', 'translate(' + newX + ',' + newY +  '), scale(' + scale.toFixed(2) + ')');

      });
    }
  };
});
