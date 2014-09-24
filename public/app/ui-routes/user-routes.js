angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router');
  
  $locationProvider.html5Mode(true);

  $stateProvider

    /********************** 
    *  User Routes
    ***********************/

    //parent state of users
    .state('user', {
      abstract: true
      , url: '/user'
      , templateUrl: '/views/layouts/default'
      , controller: 'UserCtrl'
    })
    //login view
    .state('user.login', {
      url: '/login'
      , templateUrl: '/views/user/login'
      , controller: 'UserLoginCtrl'
    })
    .state('user.logout', {
      url: '/logout'
      , controller: 'UserLogoutCtrl'
    })
    .state('user.register', {
      url: '/register'
      , templateUrl: '/views/user/register'
      , controller: 'UserRegisterCtrl'
    })

// ==> end state config
})

// end file
;