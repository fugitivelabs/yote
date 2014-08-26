'use strict';

// console.log("angular controllers loaded");

/* GLOBAL CONTROLLER
  
  this is accessible throughout the application.  All subsequent controllers
  can inherit $scope from here.  

 */

//init
var YoteControllers = angular.module('YoteControllers', []);



Yote.controller('GlobalCtrl', ['$scope', '$http', function($scope, $http){
  $scope.boss = "Boz";
  console.log("boss: " + $scope.boss);
}])