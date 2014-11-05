'use strict';

/* HOMEPAGE CONTROLLER */

angular.module('Yote')

  .controller('NavCtrl', ['$scope', '$stateParams', '$state', 'UserFactory', 'PostFactory', function($scope, $stateParams, $state, UserFactory, PostFactory){
    console.log("NavCtrl loaded...");
  }])

  .controller('StaticCtrl', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state){
    console.log("StaticCtrl loaded...");
    $scope.data = {};
    $scope.data.message = "Try me out!";
  }])

  .controller('HomeCtrl', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state){
    console.log("HomeCtrl loaded...");
  }])

  /********************** 
  *  Custom Controllers 
  ***********************/

// end of file
;