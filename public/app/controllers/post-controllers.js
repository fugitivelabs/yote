'use strict';


//Post Index Controller
angular.module('Yote').config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router');
  
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('post', {
      abstract: true
      , url: '/post'
      , templateUrl: '/views/layouts/default'
      , controller: 'PostIndexCtrl'
    })
    .state('post.list', {
      url: ''
      , templateUrl: '/views/post/list'
      , controller: 'PostListCtrl'
    })
    .state('post.show', {
      url: '/show/:postId'
      , templateUrl: '/views/post/show'
      , controller: 'PostShowCtrl'
    })
})

.controller('PostIndexCtrl', ['$scope', '$stateParams', '$state', 'PostFactory', function($scope, $stateParams, $state, PostFactory){
  console.log('post index ctrl');
}])




.controller('PostListCtrl', ['$scope', '$stateParams', '$state', 'PostFactory', function($scope, $stateParams, $state, PostFactory){
  console.log('post list ctrl');
  // $scope.data = {};
  PostFactory.all()
    .then(function(data) {
      $scope.posts = data;
    }, function(data){
      alert(data);
    });
  console.log($scope.posts);
}])



.controller('PostShowCtrl', ['$scope', '$stateParams', '$state', 'PostFactory', function($scope, $stateParams, $state, PostFactory){
  console.log("post show ctrl");

  //next call breaks second time it is called, regardless. why?
  var postId = $stateParams.postId;
  console.log(postId);

  PostFactory.show(postId)
    .then(function(data){
      $scope.post = data;
    }, function(data){
      alert(data);
    });


}]);