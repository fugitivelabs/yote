'use strict'


console.log('angular application loaded');

var Yote = angular.module('Yote', [
  'ngRoute'
  , 'ui.router'
  // , 'YoteServices'
  // , 'YoteControllers'
  //unnecessary to do it this way. controllers and services can be registered automatically. see respective files for changes.
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
      , controller: 'PostIndexCtrl'
    })
    .state('post.list', {
      url: '/list'
      , templateUrl: '/views/post/list'
      , controller: 'PostListCtrl'
    })
    .state('post.show', {
      url: '/show/:postId'
      , templateUrl: '/views/post/show'
      , controller: 'PostShowCtrl'
    })
});

/*
  DIRECTIVES CAN GO HERE -

  Though if you have more than a few, they can be
  abstracted into their own directives.js file that 
  should live in /public/app/
*/


// this is a sample directive
Yote.directive("enter", function() {
    return function(scope, element, attrs) {
        element.bind("mouseenter", function() {
          // scope.$apply(attrs.enter);
          alert("this is working!");
        });
    }
});
