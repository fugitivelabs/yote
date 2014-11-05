angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router - admin');
  
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
      , data: {
        role: "admin"
      }
    })

    .state('admin.dashboard', {
      url: ''
      , templateUrl: '/views/admin/dashboard'
    })

    .state('admin.style', {
      url: '/style-guide'
      , templateUrl: '/views/admin/docs/style-guide'
    })

// ==> end state config
})

// end file
;