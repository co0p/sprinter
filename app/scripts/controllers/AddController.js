'use strict';

var app = angular.module('sprinterApp');
app.controller('AddController', function($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  }
});
