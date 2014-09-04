'use strict';

/* LANDING CONTROLLER */

//init
var YoteControllers = angular.module('YoteControllers', []);



Yote.controller('LandingCtrl', ['$scope', '$http', function($scope, $http){
  $scope.bigBoss = "Rob";
  console.log($scope.bigBoss);

}])