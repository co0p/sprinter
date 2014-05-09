'use strict';

var app = angular.module('sprinterApp');
app.directive('sprinterChart', function($compile, chartjs) {
  return {
    restrict: 'A',
    scope: {
      team: '=team'
    },

    link: function($scope, $elem, attrs) {
      var Chart = chartjs;
      var ctx = $elem[0].getContext('2d');
      var chart = new Chart(ctx);

      $scope.$watch('team', function() {
          var data = [];
          var team = $scope.team;
          team.forEach(function(item) {
            data.push({
              value: item.hours * 100, // make floating point time to decimal
              color: '#'+ Math.floor(Math.random()*16777215).toString(16)
            });
            chart.Pie(data);
          });
      });
    }
  };
});