'use strict';

// console.log("angular controllers loaded");

/* CONTROLLERS */

//init
var YoteControllers = angular.module('YoteControllers', []);



Yote.controller('HomeCtrl', ['$scope', '$http', function($scope, $http){
  $scope.bigBoss = "Samsonite";
  console.log($scope.bigBoss);

}])