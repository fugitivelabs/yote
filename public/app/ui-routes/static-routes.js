angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router');
  
  $locationProvider.html5Mode(true);

  $stateProvider

    /********************** 
    *  Static Routes
    ***********************/

    .state('static', {
      abstract: true
      , url: '/static'
      , templateUrl: '/views/layouts/default'
      , controller: 'StaticCtrl'
    })

    .state('static.about', {
      url: '^/about'
      , templateUrl: '/views/static/about'
    })

    .state('static.faq', {
      url: '^/frequently-asked-questions'
      , templateUrl: '/views/static/faq'
    })

// ==> end state config
})

// end file
;