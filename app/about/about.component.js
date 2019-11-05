angular
  .module('app.about')
  .controller('AboutController', AboutController)

angular
  .module('app.about')
  .component('about', {
    templateUrl: 'about/about.view.html',
    controller: 'AboutController',
    controllerAs: 'vm'
  });

function AboutController() {
  "ngInject";

  var vm = this;
}