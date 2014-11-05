'use strict';

/* USER FACTORY */

angular.module('Yote')

/*******************************************************************************************
* By default, Yote uses Angular factories as the services model. 
* 
* Using factories vs services vs provider is mostly a matter of preference, though 
* there are some fundamental advantages to each. 
* 
* A starting point for further documentation and discussion on the matter can be found at 
* http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/
*
* If services or providers are preferred for this specific resource, this is still the  
* place to put them.
*******************************************************************************************/

.factory('UserFactory', ['$http', '$q', function($http, $q) {

  console.log("user factory initiated");
  var urlBase = "/api/users";
  var UserFactory = {};
  var _user;

  UserFactory.login = function(username, password) {
    console.log("user login action called");
    var deferred = $q.defer();

    $http.post(urlBase + "/login", { 'username': username, 'password': password, 'next': '/' })
      .success(function(user) {
        if(user.success) { //intermediate if statement is unnecessary after dev is done
          console.log('LOGIN SUCCESSFUL');
          // console.log(user);
          deferred.resolve(user);
        } else {
          console.log('LOGIN FAILURE');
          // console.log(user);
          deferred.resolve(user);
        }
      })
      .error(function(err, user) {
        console.log('LOGIN FAILURE - error');
        // console.log(err);
        deferred.resolve(err);
      });
      return deferred.promise;
  }

  UserFactory.logout = function() {
    console.log("user logout option called");
    var deferred = $q.defer();

    $http.post(urlBase + "/logout")
      .success(function(err) {
        if(!err) {
          console.log('LOGOUT SUCCESSFUL');
          // console.log(user);
          deferred.resolve({"success": true});
        } else {
          console.log('LOGIN FAILURE');
          // console.log(user);
          deferred.resolve({"success": false, "error": err});
        }
      })
      .error(function(err, user) {
        console.log('LOGIN FAILURE - error');
        // console.log(err);
        deferred.resolve({"success": false, "error": err});
      });
    return deferred.promise;
  }

  UserFactory.register = function(userData) {
    console.log("user register option called");
    var deferred = $q.defer();

    $http.post(urlBase, userData)
      .success(function(user) {
        console.log(user);
        if(user.success) {
          console.log('REGISTER SUCCESS');
          deferred.resolve(user);
        } else {
          console.log('REGISTER FAILURE');
          // console.log(user);
          deferred.resolve(user);
        }
      })
      .error(function(err, user) {
        console.log('REGISTER FAILURE - err');
        deferred.resolve(err);
      });
    return deferred.promise;
  }

  UserFactory.list = function() {
    var deferred = $q.defer();

    $http.get(urlBase)
      .success(function(data){
        deferred.resolve(data);
      }).error(function() {
        deferred.reject("Error. Please try logging in as an admin");
      });
    return deferred.promise;
  }

  return UserFactory;

}])

// end of file
;