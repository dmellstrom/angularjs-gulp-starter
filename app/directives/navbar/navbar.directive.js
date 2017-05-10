(function() {
  "use strict";

  angular
    .module('myApp')
    .directive('navbar', navbar);

  function navbar() {
    return {
      restrict: 'E',
      templateUrl: 'directives/navbar/navbar.template.html',
      controller: 'NavbarController',
      controllerAs: 'vm'
    };
  }

})();