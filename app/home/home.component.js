angular
  .module('app.home')
  .controller('HomeController', HomeController)

angular
  .module('app.home')
  .component('home', {
    templateUrl: 'home/home.view.html',
    controller: 'HomeController',
    controllerAs: 'vm'
  });

function HomeController() {
  "ngInject";
  var vm = this;

  vm.message = "Welcome to the home page";
}