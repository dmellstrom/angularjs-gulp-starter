angular
  .module('app.navbar')
  .controller('NavbarController', NavbarController)

angular
  .module('app.navbar')
  .component('navbar', {
    templateUrl: 'navbar/navbar.template.html',
    controller: 'NavbarController',
    controllerAs: 'vm'
  });

function NavbarController() {
  "ngInject";
  var vm = this;

  vm.title = "AngularJS Starter Application";
}