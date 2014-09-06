'use strict'


console.log('angular application loaded');

angular.module('Yote', [
  'ngRoute'
  , 'ui.router'
]).config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router');
  
  $locationProvider.html5Mode(true);
  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('root', {
      abstract: true
      , url: '/'
      , templateUrl: '/views/layouts/default'
    })
});


