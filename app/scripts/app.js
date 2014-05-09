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


  .constant('SERVER_URL','server/server.php')
  .constant('HOURS_IN_DAY', 8);
