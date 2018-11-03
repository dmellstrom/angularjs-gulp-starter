(function() {
  "use strict";

  angular.module('templates', []);
  angular.module('myApp', ['ngRoute', 'ngMaterial', 'templates']);

  function config ($routeProvider, $locationProvider, $mdThemingProvider, $compileProvider, $httpProvider) {
    "ngInject";

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

    // Performance tweaks
    $compileProvider.debugInfoEnabled(false);
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
    $httpProvider.useApplyAsync(true);
  }

  function run() {
    console.log('Module myApp running');
  }
  
  angular
    .module('myApp')
    .config(config)
    .run(run);
})();