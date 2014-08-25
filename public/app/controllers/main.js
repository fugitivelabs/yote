'use strict';

// console.log("angular controllers loaded");

/* CONTROLLERS */

//init
var YoteControllers = angular.module('YoteControllers', []);



Yote.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
  $scope.boss = "Boz";
  console.log("boss: " + $scope.boss);
}])