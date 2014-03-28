'use strict';

/**
* this is a service that handles the housekeeping of our dataset
*/
var SprintService = function($log) {
  var members = [];

  function init(data) {
    $log.info('SprintService got data ', data.length);
    members = data;
  }

  /*
  * returns an array of unique team names
  */
  function getTeams() {
    var teams = [], name = null;
    
    for (var pos in members) {
      var name = members[pos].team;
      if (name && teams.indexOf(name) < 0) {
        teams.push(name);
      } else {
        // team name is already in list
      }
    }
    $log.info('SprintService found '+teams.length+' teams');
    return teams;
  }

  return {
    init: init,
    getTeams: getTeams
  };
};


var app = angular.module('sprinterApp');
app.factory('SprintService', SprintService);
