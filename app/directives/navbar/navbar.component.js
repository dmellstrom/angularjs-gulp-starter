angular
  .module('myApp')
  .component('navbar', {
    templateUrl: 'directives/navbar/navbar.template.html',
    controller: ('NavbarController', NavbarController),
    controllerAs: 'vm'
  });

function NavbarController() {
  "ngInject";
  var vm = this;

  vm.title = "AngularJS Starter Application";
}