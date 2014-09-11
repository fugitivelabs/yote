'use strict'

angular.module('Yote')

  .controller('UserCtrl', ['$scope', '$stateParams', '$state', 'UserFactory', function($scope, $stateParams, $state, UserFactory) {
    console.log('UserCtrl loaded');
  }])

  .controller('UserLoginCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UserFactory', function($scope, $stateParams, $state, $rootScope, UserFactory) {
    console.log('UserLoginCtrl loaded');

    $scope.loginAction = function(username, password) {
      console.log("login action initiated");
      console.log(username);
      console.log(password);

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



  ;

