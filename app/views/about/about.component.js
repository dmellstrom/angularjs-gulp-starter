angular
  .module('myApp')
  .component('about', {
    templateUrl: 'views/about/about.view.html',
    controller: ('AboutController', AboutController),
    controllerAs: 'vm'
  });

function AboutController() {
  "ngInject";

  var vm = this;
}