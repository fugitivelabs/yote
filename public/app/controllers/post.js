'use strict';

var YoteControllers = angular.module('YoteControllers', []);

console.log("post controller file loaded");

Yote.controller('PostIndexCtrl', ['$scope', '$stateParams', '$state', 'PostResource', function($scope, $stateParams, $state, PostResource){
  console.log('post index ctrl');
}]);


Yote.controller('PostListCtrl', ['$scope', '$stateParams', '$state', 'PostResource', function($scope, $stateParams, $state, PostResource){
  console.log('post list ctrl');
  PostResource.all();
  $scope.posts = PostResource;
  console.log($scope.posts);
}]);


Yote.controller('PostShowCtrl', ['$scope', '$stateParams', '$state', 'PostResource', function($scope, $stateParams, $state, PostResource){
  console.log("post show ctrl");
  PostResource.show($stateParams.postId);
  $scope.post = PostResource;
  // $scope.post = $scope.resource.post;
  console.log($scope.post);
  
}]);