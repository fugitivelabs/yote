angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router - static');

  $locationProvider.html5Mode(true);

  // add a route to 404 page here
  $urlRouterProvider.otherwise('/');

  $stateProvider

    /**********************
    *  Static Routes
    ***********************/

    .state('static', {
      abstract: true
      , url: '/'
      , templateUrl: '/html/static/templates/default-layout'
      , controller: 'StaticCtrl'
    })

    .state('static.home', {
      url: ''
      , templateUrl: '/html/static/templates/home'
      , controller: 'HomeCtrl'
    })

    .state('static.about', {
      url: '/about'
      , templateUrl: '/html/static/templates/about'
    })

    .state('static.faq', {
      url: '/faq'
      , templateUrl: '/html/static/templates/faq'
    })

// ==> end state config
})

// end file
;
