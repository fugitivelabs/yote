'use strict'

angular.module('Yote')

  .controller('UserCtrl', ['$scope', '$stateParams', '$state', 'UserFactory', function($scope, $stateParams, $state, UserFactory) {
    console.log('UserCtrl loaded');
  }])

  .controller('UserLoginCtrl', ['$scope', '$stateParams', '$state', 'UserFactory', function($scope, $stateParams, $state, UserFactory) {
    console.log('UserLoginCtrl loaded');

    $scope.loginAction = function(username, password) {
      console.log("login action initiated");
      console.log(username);
      console.log(password);

      UserFactory.login(username, password)
        .then(function(data) {
          console.log("DONE");
          console.log(data);
        });

    }


  }])





  ;