'use strict';

angular.module('sprinterApp')
  .controller('MainCtrl', function ($scope, $modal, $log, SprintResource, SprintService, AlertService) {

    $scope.teams = [];
    var data = SprintResource.query(function(data) {
      AlertService.add('info', 'Database ('+data.length+' entries) has been loaded.', 2000);
      SprintService.init(data);

    }, function(reason) {
      AlertService.add('danger', 'Failed loading database: ' + reason);
    });
  });


  // /**
  //  * user wants to save current data to database
  //  */
  // $scope.save = function() {
  //   var dataStringified = JSON.stringify($scope.teams);
  //   $http({
  //     method:'POST',
  //     url:serverUrl,
  //     data: dataStringified
  //   })
  //   .success(function() { //  status, headers, config
  //     AlertService.add('info', 'Data has been saved.', 2000);
  //   })
  //   .error(function() {
  //     AlertService.add('danger', 'Failed saving data', 2000);
  //   });
  // };
  //
  // /**
  //  * user wants to reset the database
  //  */
  // $scope.reset = function() {
  //   var demoData = [
  //     {
  //       name:'ia',
  //       members: [
  //         {name:'peter', group:'frontend', drag:0.3, days:4},
  //         {name:'hans', group:'backend', drag:0.7, days:3}
  //       ]
  //     },{
  //       name:'dx',
  //       members: [
  //         {name:'josie', group:'frontend', drag:0.5, days:1},
  //         {name:'heinz', group:'frontend', drag:0.3, days:6}
  //       ]
  //     }
  //   ];
  //   var dataStringified = JSON.stringify(demoData);
  //   $http({
  //     method:'POST',
  //     url:serverUrl,
  //     data: dataStringified
  //   })
  //   .success(function() { //  status, headers, config
  //     AlertService.add('info', 'Database has been resetted successfully', 2000);
  //   })
  //   .error(function() {
  //     AlertService.add('danger', 'Failed resetting the database', 2000);
  //   });
  // };
  // /**
  //  * user wants to add a new team
  //  */
  // $scope.addNewTeam = function() {
  //   var modalInstance = $modal.open({
  //     templateUrl: 'views/addNewTeam.html',
  //     controller: function ($scope, $modalInstance) {
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
  // };
  //
  //
  //
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
