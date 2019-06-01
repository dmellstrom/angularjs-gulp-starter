angular
  .module('myApp')
  .component('home', {
    templateUrl: 'views/home/home.view.html',
    controller: ('HomeController', HomeController),
    controllerAs: 'vm'
  });

function HomeController() {
  "ngInject";
  var vm = this;

  vm.message = "Welcome to the home page";
}