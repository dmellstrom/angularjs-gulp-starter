angular
  .module('app.about')
  .component('about', {
    templateUrl: 'about/about.view.html',
    controller: ('AboutController', AboutController),
    controllerAs: 'vm'
  });

function AboutController() {
  "ngInject";

  var vm = this;
}