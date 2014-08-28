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

  //next call breaks second time it is called, regardless. why?
  var params = $stateParams.postId;
  console.log(params);
  
  PostResource.show(params);

  $scope.post = PostResource;
  
  // $scope.post = $scope.resource.post;
  console.log("debug 2");
  console.log($scope.post);

}]);