'use strict';

var app = angular.module('sprinterApp');
app.factory('SprintResource', function($resource, SERVER_URL) {
  return $resource(
    SERVER_URL,
    {} // no parameters
  );
});
