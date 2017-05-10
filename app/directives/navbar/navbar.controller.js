(function() {
  "use strict";

  angular
    .module('myApp')
    .controller('NavbarController', NavbarController);

  function NavbarController() {
    "ngInject";
    var vm = this;

    vm.title = "AngularJS Starter Application";
  }

})();