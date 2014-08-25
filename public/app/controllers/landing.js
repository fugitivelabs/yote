'use strict';

// console.log("angular controllers loaded");

/* CONTROLLERS */

//init
var YoteControllers = angular.module('YoteControllers', []);



Yote.controller('LandingCtrl', ['$scope', '$http', function($scope, $http){
  $scope.bigBoss = "Rob";
  console.log($scope.bigBoss);

}])