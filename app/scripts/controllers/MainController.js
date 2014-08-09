'use strict';

var app = angular.module('sprinterApp');
app.controller('MainController', function ($scope, $http, SERVER_URL, $route, $modal, $log, SprintService, AlertService) {

  $scope.teams = [];

  // load the data from the db initially
  $http({method:'GET', url:SERVER_URL})
  .success(function(data) {
    SprintService.init(data);
    $scope.teams = SprintService.getTeams();
    AlertService.add('info', 'Loaded '+data.length+' entries from database', 2000);
  })
  .error(function(rejection) {
    AlertService.add('warning', 'Couldn\'t load database:', rejection);
  });

  // user wants to add a new member
  $scope.add = function() {
    var modalInstance = $modal.open({
      templateUrl: 'views/add.html',
      controller: 'AddController'
    });
    modalInstance.result.then(function (member) {
      SprintService.addMember(member);
      $scope.teams = SprintService.getTeams();
      $scope.teams[$scope.activeTeamIndex].active = true;
    });
  };

   // user wants to save current data to database
  $scope.save = function() {
    var dataStringified = JSON.stringify(SprintService.getData());
    $http({
      method:'POST',
      url:SERVER_URL,
      data: dataStringified
    })
    .success(function() {
      AlertService.add('info', 'Data has been saved.', 2000);
    })
    .error(function() {
      AlertService.add('danger', 'Failed saving data', 2000);
    });
  };

  // user wants to reset the database
  $scope.reset = function() {
    var data = [];
    var dataStringified = JSON.stringify(data);
    $http({
      method:'POST',
      url:SERVER_URL,
      data: dataStringified
    })
    .success(function() {
      // on success reload the app to start with a fresh setup
      $route.reload();
    })
    .error(function() {
      AlertService.add('danger', 'Failed resetting data', 2000);
    });
  };

  // remember which tab has been selected
  $scope.tabSelected = function(index) {
    $scope.activeTeamIndex = index;
  };
});
