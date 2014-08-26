'use strict';

/* HOMEPAGE CONTROLLER */

//init
var YoteControllers = angular.module('YoteControllers', []);



Yote.controller('HomeCtrl', ['$scope', '$http', function($scope, $http){
  $scope.bigBoss = "homepage bigboss";
  console.log($scope.bigBoss);

}]);