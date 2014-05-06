'use strict';

/**
 * converts a floating point number to a floating point
 * number in minutes
 *
 * 12.5 -> 12h 30m
 */
var app = angular.module('sprinterApp');
app.filter('floatToTime', function() {
  var filter = function(input) {

    if (!isNaN(parseFloat(input)) && isFinite(input)) {

      var hours = Math.floor(input);
      var minutes = Math.round((input - hours) * 60);
      return hours + 'h ' + minutes.toFixed(0) + 'm';
    } else {
      console.error('floatToTime: input is not a number');
      return NaN;
    }
  };
  return filter;
});