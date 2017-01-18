(function() {
  'use strict'

  angular.module('app')
    .component('postEdit', {
      templateUrl: '/js/posts/post-edit.template.html',
      controllerAs: 'model',
      controller: controller
    })

  controller.$inject = ['$http', '$stateParams', '$state']
  function controller($http, $stateParams, $state) {
    var model = this

    model.$onInit = onInit
    model.updatePost = updatePost

    function onInit() {
      $http.get(`/api/posts/${$stateParams.id}`)
        .then(response => {
          model.post = response.data
          $http.get(`/api/posts/${$stateParams.id}/comments`)
            .then(response => {
              model.post.comments = response.data
            })
        })
    }

    function updatePost() {
      $http.patch(`/api/posts/${$stateParams.id}`, model.post)
        .then(response => {
            $state.go('posts')
        })
    }

  }

}());
