angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router');
  
  $locationProvider.html5Mode(true);

  // add a route to 404 page here
  $urlRouterProvider.otherwise('/');

  $stateProvider

    /********************** 
    *  Default Routes
    ***********************/

    // root state of the application. Loades default template. Is abstract so it also defers to the first child template
    .state('root', {
      abstract: true
      , url: '/'
      , templateUrl: '/views/layouts/homepage-layout'
    })

    // first child of root. is the hompage. Empty url: '' signifies '/' + ''
    .state('root.home', {
      url: ''
      , templateUrl: '/views/homepage/index'
      , controller: 'HomeCtrl'
    })

// ==> end state config
})

// end file
;