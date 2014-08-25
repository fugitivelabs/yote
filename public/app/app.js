'use strict'


console.log('angular application loaded');

var Yote = angular.module('Yote', [
  'ngRoute'
  , 'ui.router'
  , 'YoteControllers'
]).config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router');
  
  $locationProvider.html5Mode(true);
  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('landing', {
      url: '/landing'
      , templateUrl: '/views/landing/index'
      , controller: 'LandingCtrl'
    })
});