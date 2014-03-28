'use strict';

angular.module('sprinterApp')
  .directive('sprinterCalculator', function() {
    return {
      templateUrl : 'views/sprinterCalculator.html',
      controller: function($scope) {
        $scope.days = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
        $scope.drags = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

        function averageDays(team) {
          var avgDays = 0;
          var i, length;
          for (i=0, length = team.members.length; i<length; i++) {
            avgDays += +team.members[i].days; // + converts to number
          }
          return avgDays / length;
        }

        function averageDrag(team) {
          var avgDrag = 0;
          var i, length;
          for (i=0, length = team.members.length; i<length; i++) {
            avgDrag += +team.members[i].drag; // + converts to number
          }
          return (avgDrag / length).toFixed(1);
        }


        $scope.$watch('team', function() {
          console.log('changed');
          $scope.averageDays = averageDays($scope.team);
          $scope.averageDrag = averageDrag($scope.team);
        }, true);
      }
    };
  });
