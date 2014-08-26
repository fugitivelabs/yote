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
    .state('post', {
      url: '/post'
      , templateUrl: '/views/post/index'
    })
    .state('post.list', {
      url: '/all'
      , templateUrl: '/views/post/list'
      , controller: 'PostIndexCtrl'
    })
    .state('post.show', {
      url: '/show/:postId'
      , templateUrl: '/views/post/show'
      , controller: 'PostShowCtrl'
    })
});