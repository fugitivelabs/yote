angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router');
  
  $locationProvider.html5Mode(true);

  $stateProvider

    /********************** 
    *  Admin Routes
    ***********************/

    .state('admin', {
      abstract: true
      , url: '/admin'
      , templateUrl: '/views/layouts/admin'
      , controller: 'AdminCtrl'
    })

    .state('admin.dashboard', {
      url: ''
      , templateUrl: '/views/admin/dashboard'
    })

    // move this to a child of admin later
    .state('docs', {
      abstract: true
      , url: '/docs'
      , templateUrl: '/views/layouts/admin'
      , controller: 'DocsCtrl'
    })

    .state('docs.dashboard', {
      url: ''
      , templateUrl: '/views/admin/docs/dashboard'
    })

    .state('docs.dashboard.style', {
      url: '/style-guide'
      , templateUrl: '/views/admin/docs/style-guide'
    })

// ==> end state config
})

// end file
;