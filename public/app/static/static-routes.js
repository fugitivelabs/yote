angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router - static');
  
  $locationProvider.html5Mode(true);

  $stateProvider

    /********************** 
    *  Static Routes
    ***********************/

    .state('static', {
      abstract: true
      , url: '/static'
      , templateUrl: '/html/static/views/default-layout'
      , controller: 'StaticCtrl'
    })

    .state('static.about', {
      url: '^/about'
      , templateUrl: '/html/static/views/about'
    })

    .state('static.faq', {
      url: '^/frequently-asked-questions'
      , templateUrl: '/html/static/views/faq'
    })

// ==> end state config
})

// end file
;