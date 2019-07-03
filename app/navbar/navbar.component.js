angular
  .module('app.navbar')
  .component('navbar', {
    templateUrl: 'navbar/navbar.template.html',
    controller: ('NavbarController', NavbarController),
    controllerAs: 'vm'
  });

function NavbarController() {
  "ngInject";
  var vm = this;

  vm.title = "AngularJS Starter Application";
}