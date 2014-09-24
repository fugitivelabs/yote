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

// ==> end state config
})

// end file
;