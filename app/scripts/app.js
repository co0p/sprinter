'use strict';

angular.module('sprinterApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.bootstrap.tpls'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .factory('chartjs', function() {
    return window.Chart;
  })
  .factory('d3', function() {
    return window.d3;
  })


  .constant('SERVER_URL','http://127.0.0.1:8080/server.php')
  .constant('HOURS_IN_DAY', 8);
