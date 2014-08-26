'use strict';

/* POST CONTROLLER */

//init
var YoteControllers = angular.module('YoteControllers', []);



Yote.controller('PostIndexCtrl', ['$scope', '$stateParams', '$state', 'PostResource', function($scope, $stateParams, $state, PostResource){
  // console.log('Post controller called');
  PostResource.fetch();
  $scope.posts = PostResource;
  console.log($scope.posts);
}]);

Yote.controller('PostShowCtrl', ['$scope', '$stateParams', '$state', 'PostResource', function($scope, $stateParams, $state, PostResource){

  PostResource.show($stateParams.postId);
  $scope.post = PostResource;
  // $scope.post = $scope.resource.post;
  console.log($scope.post);

}]);