'use strict';

/* HOMEPAGE CONTROLLER */

angular.module('Yote').config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('root.home', {
      url: ''
      , templateUrl: '/views/homepage/index'
      , controller: 'HomeCtrl'
    })
})

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http){
  $scope.bigBoss = "homepage bigboss";
  console.log($scope.bigBoss);

}])

// end of file
;