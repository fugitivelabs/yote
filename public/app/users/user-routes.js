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
      , templateUrl: '/html/static/templates/default-layout'
      , controller: 'UserCtrl'
    })
    //login view
    .state('user.login', {
      url: '/login/:next'
      , templateUrl: '/html/users/templates/login'
      , controller: 'UserLoginCtrl'
    })
    .state('user.logout', {
      url: '/logout'
      , controller: 'UserLogoutCtrl'
    })
    .state('user.register', {
      url: '/register'
      , templateUrl: '/html/users/templates/register'
      , controller: 'UserRegisterCtrl'
    })
    .state('user.profile', {
      url: '/profile'
      , templateUrl: '/html/users/templates/profile'
      , controller: 'UserProfileCtrl'
    })
    .state('user.password', {
      url: '/password'
      , templateUrl: '/html/users/templates/password'
      , controller: 'UserPasswordCtrl'
    })
    .state('user.forgotpassword', {
      url: '/forgotpassword'
      , templateUrl: '/html/users/templates/forgotpassword'
      , controller: 'UserForgotPasswordCtrl'
    })
    .state('user.resetpassword', {
      url: '/resetpassword/:resetHex'
      , templateUrl: '/html/users/templates/resetpassword'
      , controller: 'UserResetPasswordCtrl'
    })

})

// end file
;