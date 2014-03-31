'use strict';

var app = angular.module('sprinterApp');
app.controller('AddController', function($scope, $modalInstance) {

  $scope.name = '';
  $scope.team = '';
  $scope.group = '';

  $scope.ok = function (name, team, group) {
    var member = {
      name: name,
      team: team,
      group: group,
      days: 0,
      drag: 1
    };
    member.team = member.team.toLowerCase();

    if (member.group) {
      member.group = member.group.toLowerCase();
    }

    $modalInstance.close(member);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
});
