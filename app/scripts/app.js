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
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('SERVER_URL',"http://127.0.0.1:8080/server.php");
