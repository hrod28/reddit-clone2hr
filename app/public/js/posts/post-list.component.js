(function() {
  'use strict'

  angular.module('app')
    .component('postList', {
      require: {
        layout: '^app'
      },
      templateUrl: '/js/posts/post-list.template.html',
      controllerAs: 'model',
      controller: controller
    })

  controller.$inject = ['$http']
  function controller($http) {
    var model = this

    model.$onInit = onInit
    model.togglePostForm = togglePostForm
    model.createPost = createPost
    model.createComment = createComment
    model.voteUp = voteUp
    model.voteDown = voteDown

    function onInit() {
      $http.get('/api/posts')
        .then(response => model.posts = response.data)
    }

    function togglePostForm() {
      model.addingPost = !model.addingPost
    }

    function createPost() {
      $http.post('/api/posts', model.post)
        .then(response => {
          response.data.comments = []
          model.posts.push(response.data)
          model.togglePostForm()
          delete model.post
        })
    }

    function createComment(post) {
      $http.post(`/api/posts/${post.id}/comments`, post.newComment )
        .then(response => {
          post.comments.push(response.data)
          delete post.newComment
        })
    }

    function voteUp(post) {
      $http.post(`/api/posts/${post.id}/votes`)
        .then(response => {
          post.vote_count = response.data.vote_count
        })
    }

    function voteDown(post) {
      if(post.vote_count == 0) return
      $http.delete(`/api/posts/${post.id}/votes`)
        .then(response => {
          post.vote_count = response.data.vote_count
        })
    }

  }

}());
