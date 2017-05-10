(function() {
  "use strict";

  angular.module('myApp', ['ngRoute', 'ngMaterial']);

  function config ($routeProvider, $locationProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.view.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'views/about/about.view.html',
        controller: 'AboutController',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    // Set default theme
    $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .accentPalette('orange');
  }

  function run() {
    console.log('Module myApp running');
  }
  
  angular
    .module('myApp')
    .config(['$routeProvider', '$locationProvider', '$mdThemingProvider', config])
    .run([run]);
})();