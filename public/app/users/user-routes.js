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
    .state('user.profile', {
      url: '/profile'
      , templateUrl: '/html/users/views/profile'
      , controller: 'UserProfileCtrl'
    })
    .state('user.password', {
      url: '/password'
      , templateUrl: '/html/users/views/password'
      , controller: 'UserPasswordCtrl'
    })
    .state('user.forgotpassword', {
      url: '/forgotpassword'
      , templateUrl: '/html/users/views/forgotpassword'
      , controller: 'UserForgotPasswordCtrl'
    })
    .state('user.resetpassword', {
      url: '/resetpassword/:resetHex'
      , templateUrl: '/html/users/views/resetpassword'
      , controller: 'UserResetPasswordCtrl'
    })

// ==> end state config
})

// end file
;