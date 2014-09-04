'use strict';

/* HOMEPAGE CONTROLLER */

angular.module('Yote').controller('HomeCtrl', ['$scope', '$http', function($scope, $http){
  $scope.bigBoss = "homepage bigboss";
  console.log($scope.bigBoss);

}]);