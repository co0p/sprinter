'use strict';

/**
* this is a service that handles the housekeeping of our dataset
*/
var SprintService = function() {
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

  function deleteMember(member) {
    for (var pos in teams) {
      var index = teams[pos].members.indexOf(member);
      // delete from teams
      if (index > -1) {
        teams[pos].members.splice(index, 1);
      }

      var memberIndex = members.indexOf(member);
      if (index > -1) {
        members.splice(memberIndex, 1);
      }
    }
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
    deleteMember: deleteMember,
    getMembers: getMembers
  };
};


var app = angular.module('sprinterApp');
app.factory('SprintService', SprintService);
