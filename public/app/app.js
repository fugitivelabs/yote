'use strict'


console.log('angular application loaded');

var Yote = angular.module('Yote', [
  'ngRoute'
  , 'ui.router'
  , 'YoteModels'
  , 'YoteControllers'
]).config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router');
  
  $locationProvider.html5Mode(true);
  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/'
      , templateUrl: '/views/homepage/index'
      , controller: 'HomeCtrl'
    })
    .state('landing', {
      url: '/landing'
      , templateUrl: '/views/landing/index'
      , controller: 'LandingCtrl'
    })
});