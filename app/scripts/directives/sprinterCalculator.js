'use strict';

angular.module('sprinterApp')
  .directive('sprinterCalculator', function() {
    return {
      templateUrl : 'views/sprinterCalculator.html',
      scope: {
        teamName: '@teamName'
      },
      controller: function($scope, $modal, SprintService, HOURS_IN_DAY) {

        // calculates the average days of the team
        function averageDays() {
          var avgDays = 0;
          var i, length;
          for (i=0, length = activeTeam.members.length; i<length; i++) {
            avgDays += +activeTeam.members[i].days; // + converts to number
          }
          return (avgDays / length).toFixed(1);
        }

        // calculates the average drag factor of the team
        function averageDrag() {
          var avgDrag = 0;
          var i, length;
          for (i=0, length = activeTeam.members.length; i<length; i++) {
            avgDrag += +activeTeam.members[i].drag; // + converts to number
          }
          return (avgDrag / length).toFixed(1);
        }

        // calculates the total hours available
        function totalHours() {
          var total = 0;
          for (var pos in activeTeam.members) {
            total += activeTeam.members[pos].days * HOURS_IN_DAY * activeTeam.members[pos].drag;
          }
          return total.toFixed(1);
        }

        // calculates the current stats for the individual groups of one team
        function groupStats() {
          var groups = [];

          function getGroupIndex(group) {
            for (var pos in groups) {
              if (groups[pos].name === group) {
                return pos;
              }
            }
            return -1;
          }

          for (var pos in activeTeam.members) {
            var member = activeTeam.members[pos];

            var candidate = member.group;
            var index = getGroupIndex(candidate);

            // add new group if not found, else add to hours count
            if (index < 0) {
              groups.push({
                name: candidate,
                hours: member.days * member.drag * HOURS_IN_DAY,
                memberCount: 1
              });
            } else {
              groups[index].hours += member.days * member.drag * HOURS_IN_DAY;
              groups[index].memberCount += 1;
            }
          }

          // make sure that the numbers are fixed
          groups.forEach(function(group) {
            group.hours = group.hours.toFixed(1);
          });

          return groups;
        }

        // updates the team stats
        function updateStats() {
          $scope.averageDays = averageDays();
          $scope.averageDrag = averageDrag();
          $scope.totalHours = totalHours();
          $scope.groups = groupStats();
        }

        // get a handle for the currently active team
        $scope.team = SprintService.getTeam($scope.teamName);
        var activeTeam = $scope.team;

        // the possible values for the drop downns
        $scope.days = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
        $scope.drags = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

        updateStats();

        // user wants to delete a member
        $scope.deleteMember = function(member) {
          var modalInstance = $modal.open({
            templateUrl: 'views/delete.html',
            controller: 'DeleteController',
            resolve: {
              member: function() {
                return member;
              }
            }
          });

          modalInstance.result.then(function () {
            SprintService.deleteMember(member);
            $scope.team = SprintService.getTeam($scope.teamName);
          });
        };


        // react to a user changed the drag or day selection
        // by deep watching the data
        $scope.$watch('team.members', function () {
          updateStats();
        }, true);
      }
    };
  });
