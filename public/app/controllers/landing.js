'use strict';

/* LANDING CONTROLLER */

angular.module('Yote').controller('LandingCtrl', ['$scope', '$http', function($scope, $http){
  $scope.bigBoss = "Rob";
  console.log($scope.bigBoss);

}])