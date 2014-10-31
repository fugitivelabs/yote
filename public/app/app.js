'use strict'


console.log('angular application loaded');

angular.module('Yote', [
  // add in custom dependencies here
  'ngRoute'
  , 'ngTouch'
  , 'ui.router'
])
.run(function($rootScope) {
  $rootScope.currentUser = window.currentUser;
  console.log($rootScope.currentUser);
})
.run(function($rootScope, $state) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    if(toState.data) {
      if((toState.data.role == "login" || toState.data.role == "admin") && !($rootScope.currentUser.username)) {
        console.log("NOT LOGGED IN");
        $state.transitionTo("user.login", {next: toState.name});
        event.preventDefault();
      } else if((toState.data.role == "admin") && ($rootScope.currentUser.roles.indexOf("admin") == -1)) {
        console.log("NOT LOGGED IN AS ADMIN");
        $state.transitionTo("user.login", {next: toState.name});
        event.preventDefault();
      }
    }
  });
})

// end file
;
