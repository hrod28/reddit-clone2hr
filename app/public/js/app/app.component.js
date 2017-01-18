(function() {
  'use strict';

  angular.module('app')
    .component('app', {
      templateUrl: '/js/app/app.template.html',
      controllerAs: 'model',
      controller: controller
    });

  controller.$inject = ['$http']
  function controller($http) {
    var model = this;

    model.$onInit = onInit;

    function onInit() {
      model.addingPost = false;
    }
  }

}());
