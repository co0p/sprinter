'use strict';

/**
* this is a service that handles the housekeeping of our dataset
*/
var SprintService = function($log) {
  var members = [];
  var teams = [];

  function init(data) {
    members = data;
    teams = [];
  }

  /*
  * returns an array of unique team names
  */
  function getTeams() {
    teams = [];

    function isInTeams(name) {
      for (var pos in teams) {
        if (teams[pos].name === name) {
          return true;
        }
      }
      return false;
    }

    for (var pos in members) {
      var name = members[pos].team;
      if (!isInTeams(name)) {
        teams.push({
          name: name,
          members: getMembers(name)
        });
      } else {
        // team name is already in list
      }
    }
    console.log('teams', teams);
    return teams;
  }

  function getTeam(name) {
    for (var pos in teams) {
      if (teams[pos].name === name) {
        return teams[pos];
      }
    }
    return null;
  }

  function getData() {
    return members;
  }

  function addMember(member) {
    members.push(member);
  }

  function getMembers(teamName) {
    var candidates = [];
    for (var pos in members) {
      if (members[pos].team === teamName) {
        candidates.push(members[pos]);
      }
    }
    return candidates;
  }

  return {
    init: init,
    getTeams: getTeams,
    getTeam: getTeam,
    getData: getData,
    addMember: addMember,
    getMembers: getMembers
  };
};


var app = angular.module('sprinterApp');
app.factory('SprintService', SprintService);
