(function() {
  "use strict";
  
  angular
    .module('myApp')
    .controller('HomeController', HomeController);

  function HomeController() {
    "ngInject";
    var vm = this;

    vm.message = "Welcome to the home page";
  }

})();