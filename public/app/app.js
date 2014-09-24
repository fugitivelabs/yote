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

// end file
;
