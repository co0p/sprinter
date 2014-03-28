'use strict';

var app = angular.module('sprinterApp');
app.factory('SprinterResource', function($q, $http, SERVER_URL) {

  var members = [];

  /**
   * loads the database from the server
   */
  function load() {
    var deferred = $q.defer();

    $http({method:'GET', url:SERVER_URL})

      .success(function(data) {
        members = data;
        deferred.resolve(members);
      })

      .error(function(rejection) {
        deferred.reject(rejection);
      });
    return deferred;
  }

  function save() {

  }

  return {
    load: load,
    save: save
  };
});
