'use strict'

angular.module('Yote')

  .controller('UserCtrl', ['$scope', '$stateParams', '$state', 'UserFactory', function($scope, $stateParams, $state, UserFactory) {
    console.log('UserCtrl loaded');
  }])

  .controller('UserLoginCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UserFactory', function($scope, $stateParams, $state, $rootScope, UserFactory) {
    console.log('UserLoginCtrl loaded');
    $scope.loginAction = function(username, password) {
      console.log("login action initiated");
      UserFactory.login(username, password)
        .then(function(data) {
          console.log(data);
          if(data.success) {
            //change state programmatically
            //set root scope to user
            $rootScope.currentUser = data.user;
            $state.go('root.home');
          } else {
            alert(data.message + " Please try again.");
          }
        });
    }
  }])

  .controller('UserLogoutCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UserFactory', function($scope, $stateParams, $state, $rootScope, UserFactory) {
    console.log('UserLogoutCtrl loaded');
    UserFactory.logout()
      .then(function(data) {
        console.log(data);
        if(data.success) {
          //change state programmatically
          //set root scope to user
          $rootScope.currentUser = {};
          console.log("Logged out");
          $state.go('root.home');
        } else {
          alert(data.message + " Please try again.");
        }
      });
  }])

  //////
  .controller('UserRegisterCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UserFactory', function($scope, $stateParams, $state, $rootScope, UserFactory) {
    console.log('UserRegisterCtrl loaded');
    $scope.registerAction = function(userData) {
      console.log(userData);
      console.log("register action initiated");
      UserFactory.register(userData)
        .then(function(data) {
          console.log(data);
          if(data.success) {
            //NOW LOGIN
            $rootScope.currentUser = data.user;
            $state.go('root.home');
          } else {
            alert(data.message + " Please try again.");
          }
        });
    }
  }])


  ;

