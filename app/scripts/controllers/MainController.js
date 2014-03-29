'use strict';

var app = angular.module('sprinterApp');
app.controller('MainController', function ($scope, $http, $modal, $log, SprintService, AlertService, SERVER_URL) {

  $scope.teams = [];

  // load the data from the db initially
  $http({method:'GET', url:SERVER_URL})
  .success(function(data) {
    SprintService.init(data);
    $scope.teams = SprintService.getTeams();
    AlertService.add('info', 'Loaded '+$scope.teams.length+' entries from database', 2000);
  })
  .error(function(rejection) {
    AlertService.add('warning', 'Couldn\'t load database:', rejection);
  });

  // user wants to add a new member
  $scope.add = function() {
    var modalInstance = $modal.open({
      templateUrl: 'views/add.html',
      controllerUrl: 'scripts/controllers/AddController.js'
    });
  }

   // user wants to save current data to database
  $scope.save = function() {
    var dataStringified = JSON.stringify(SprintService.getData());
    $http({
      method:'POST',
      url:SERVER_URL,
      data: dataStringified
    })
    .success(function() { //  status, headers, config
      AlertService.add('info', 'Data has been saved.', 2000);
    })
    .error(function() {
      AlertService.add('danger', 'Failed saving data', 2000);
    });
  };
});

  // /**
  //  * user wants to delete a team
  //  */
  // $scope.deleteTeam = function() {
  //   var modalInstance = $modal.open({
  //     templateUrl: 'views/deleteTeam.html',
  //     controller: function ($scope, $modalInstance) {
  //       $scope.team = getActiveTeam();
  //
  //       $scope.ok = function () {
  //         $modalInstance.close();
  //       };
  //
  //       $scope.cancel = function () {
  //         $modalInstance.dismiss();
  //       };
  //     }
  //   });
  //
  //   modalInstance.result.then(function () {
  //     console.log('a');
  //   }, function () {
  //     console.log('b');
  //   });
