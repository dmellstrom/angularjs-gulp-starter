function config ($routeProvider, $locationProvider, $mdThemingProvider, $compileProvider, $httpProvider) {
  "ngInject";

  $routeProvider
    .when('/', {
      template: '<home></home>'
    })
    .when('/about', {
      template: '<about></about>'
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
  console.log('Module "app" running');
}

angular
  .module('app')
  .config(config)
  .run(run);