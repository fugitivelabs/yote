angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router - user');
  
  $locationProvider.html5Mode(true);

  $stateProvider

    /********************** 
    *  User Routes
    ***********************/

    //parent state of users
    .state('user', {
      abstract: true
      , url: '/user'
      , templateUrl: '/html/static/views/default-layout'
      , controller: 'UserCtrl'
    })
    //login view
    .state('user.login', {
      url: '/login/:next'
      , templateUrl: '/html/users/views/login'
      , controller: 'UserLoginCtrl'
    })
    .state('user.logout', {
      url: '/logout'
      , controller: 'UserLogoutCtrl'
    })
    .state('user.register', {
      url: '/register'
      , templateUrl: '/html/users/views/register'
      , controller: 'UserRegisterCtrl'
    })

// ==> end state config
})

// end file
;