//disable console.log function if older IE, where it is undefined, or in production environment
//additionally, IE 11 seems to have a strange implementation of console log. replacing it breaks the page javascript.
var isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./) || false;  //http://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript

if(!window.console || (!window.development && !isIE11)) {
  console = {log: function() {}};
}

console.log('root angular application loaded');

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
        $rootScope.next = {
          toState: toState
          , toParams: toParams
        }
        $state.transitionTo("user.login", {next: toState.name});
        event.preventDefault();
      } else if((toState.data.role == "admin") && ($rootScope.currentUser.roles.indexOf("admin") == -1)) {
        console.log("NOT LOGGED IN AS ADMIN");
        $rootScope.next = {
          toState: toState
          , toParams: toParams
        }
        $state.transitionTo("user.login", {next: toState.name});
        event.preventDefault();
      }
    }
  });
})

// end file
;
