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

  return {
    init: init
  };
};


var app = angular.module('sprinterApp');
app.factory('SprintService', SprintService);
