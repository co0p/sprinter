'use strict';

var app = angular.module('sprinterApp');
app.controller('DeleteController', function($scope, $modalInstance, member) {

  $scope.teamName = member.team;
  $scope.memberName = member.name;
  $scope.groupName = member.group;

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
});
