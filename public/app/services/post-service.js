'use strict';

/* POST FACTORY */

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

.factory('PostFactory', ['$http', '$q', function($http, $q) {

  var urlBase = "/api/posts";
  var PostFactory = {};
  var _post;

  PostFactory.all = function() {
    console.log("get all Posts called");
    var deferred = $q.defer();
    $http.get(urlBase)
      .success(function(data){
        console.log("it worked!");
        console.log(data);
        deferred.resolve(data);
      }).error(function(){
        console.log("Error retrieving all posts.");
        deferred.reject("Error retrieving all posts.")
      });
    return deferred.promise;
  }

  PostFactory.show = function(id) {
    console.log("show this post: " + id);
    var deferred = $q.defer();
    $http.get(urlBase + '/' + id)
      .success(function(data){
        console.log("it worked again!!!");
        console.log(data);
        deferred.resolve(data);
      }).error(function(){
        console.log("error showing this post");
        deferred.reject("error showing this post");
      });
    return deferred.promise;
  }

  return PostFactory;

}])

// end of file
;

