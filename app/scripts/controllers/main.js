'use strict';

angular.module('sprinterApp')
  .controller('MainCtrl', function ($scope, $modal, $http, AlertService) {

    var serverUrl = 'http://127.0.0.1:8080/server.php';

    ///////////////////////////////
    //            helper         //
    ///////////////////////////////

    function getActiveTeam() {
      for (var i=0, length=$scope.teams.length; i<length; i++) {
        if ($scope.teams[i].active) {
          return $scope.teams[i];
        }
      }
    }

    $scope.isActiveTab = function(name) {
      return (name === $scope.activeTeam);
    };

    /////////////////////////////////
    //           main              //
    /////////////////////////////////
    $http({method:'GET', url:serverUrl})
      .success(function(data) { //  status, headers, config
        $scope.teams = data;

        AlertService.add('info', 'Loaded '+data.length+' entries from database', 2000);
      })
      .error(function(rejection) {
        AlertService.add('warning', 'Couldn\'t load database:', rejection);
      });

    /**
     * user wants to save current data to database
     */
    $scope.save = function() {
      var dataStringified = JSON.stringify($scope.teams);
      $http({
        method:'POST',
        url:serverUrl,
        data: dataStringified
      })
      .success(function() { //  status, headers, config
        AlertService.add('info', 'Data has been saved.', 2000);
      })
      .error(function() {
        AlertService.add('danger', 'Failed saving data', 2000);
      });
    };

    /**
     * user wants to reset the database
     */
    $scope.reset = function() {
      var demoData = [
        {
          name:'ia',
          members: [
            {name:'peter', group:'frontend', drag:0.3, days:4},
            {name:'hans', group:'backend', drag:0.7, days:3}
          ]
        },{
          name:'dx',
          members: [
            {name:'josie', group:'frontend', drag:0.5, days:1},
            {name:'heinz', group:'frontend', drag:0.3, days:6}
          ]
        }
      ];
      var dataStringified = JSON.stringify(demoData);
      $http({
        method:'POST',
        url:serverUrl,
        data: dataStringified
      })
      .success(function() { //  status, headers, config
        AlertService.add('info', 'Database has been resetted successfully', 2000);
      })
      .error(function() {
        AlertService.add('danger', 'Failed resetting the database', 2000);
      });
    };

    /**
     * user wants to add a new team
     */
    $scope.addNewTeam = function() {
      var modalInstance = $modal.open({
        templateUrl: 'views/addNewTeam.html',
        controller: function ($scope, $modalInstance) {

          $scope.ok = function () {
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss();
          };
        }
      });

      modalInstance.result.then(function () {
        console.log('a');
      }, function () {
        console.log('b');
      });
    };



    /**
     * user wants to delete a team
     */
    $scope.deleteTeam = function() {
      var modalInstance = $modal.open({
        templateUrl: 'views/deleteTeam.html',
        controller: function ($scope, $modalInstance) {
          $scope.team = getActiveTeam();

          $scope.ok = function () {
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss();
          };
        }
      });

      modalInstance.result.then(function () {
        console.log('a');
      }, function () {
        console.log('b');
      });
    };
  });
