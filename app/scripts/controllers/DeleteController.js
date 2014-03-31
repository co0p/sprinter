'use strict';

var app = angular.module('sprinterApp');
app.controller('DeleteController', function($scope, $modalInstance) {

  $scope.name = '';
  $scope.team = '';
  $scope.group = '';

  $scope.ok = function () {
    var member = {
      name: name,
      team: team,
      group: group,
      days: 0,
      drag: 1
    };
    $modalInstance.close(member);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
});
