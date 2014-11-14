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
      , templateUrl: '/html/static/templates/admin-layout'
      , controller: 'AdminCtrl'
      , data: {
        role: "admin"
      }
    })

    .state('admin.dashboard', {
      url: ''
      , templateUrl: '/html/admin/templates/dashboard'
    })

    .state('admin.style', {
      url: '/style-guide'
      , templateUrl: '/html/admin/templates/docs/style-guide'
    })

// ==> end state config
})

// end file
;
