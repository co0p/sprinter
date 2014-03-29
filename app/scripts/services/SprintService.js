'use strict';

/**
* this is a service that handles the housekeeping of our dataset
*/
var SprintService = function($log) {
  var members = [];
  var teams = [];

  function init(data) {
    $log.info('SprintService got data ', data.length);
    members = data;
    teams = [];
  }

  /*
  * returns an array of unique team names
  */
  function getTeams() {
    if (teams.length > 0) return teams;

    var name = null;
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

  function getData() {
    return members;
  }

  return {
    init: init,
    getTeams: getTeams,
    getData: getData
  };
};


var app = angular.module('sprinterApp');
app.factory('SprintService', SprintService);
