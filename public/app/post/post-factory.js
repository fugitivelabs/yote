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

  //define base url
  var urlBase = "/api/posts";
  //PostFactory object
  var PostFactory = {};

  PostFactory.list = function() {
    console.log("get all posts called in factory");
    var deferred = $q.defer();
    $http.get(urlBase)
      .success(function(data){
        console.log(data);
        deferred.resolve(data);
      }).error(function() {
        console.log("Error retrieving all posts.");
        deferred.reject("Error retrieving all posts.")
      });
    return deferred.promise;
  }

  PostFactory.show = function(slug) {
    console.log("show post " + slug + " in factory");
    var deferred = $q.defer();
    $http.get(urlBase + '/' + slug)
      .success(function(data){
        console.log(data);
        deferred.resolve(data);
      }).error(function() {
        console.log("error showing this post");
        deferred.reject("error showing this post");
      });
    return deferred.promise;
  }

  PostFactory.create = function(postData) {
    console.log("creating post in factory");
    var deferred = $q.defer();
    $http.post(urlBase, postData)
      .success(function(data) {
        console.log(data);
        deferred.resolve(data);
      }).error(function() {
        console.log("error creating new post");
        deferred.reject("Error creating new post");
      });
    return deferred.promise;
  }

  PostFactory.update = function(postData) {
    console.log("updating a post in factory");
    var deferred = $q.defer();
    $http.put(urlBase + "/" + postData.slug, postData)
      .success(function(data) {
        console.log(data);
        deferred.resolve(data);
      }).error(function() {
        console.log("error updating post");
        deferred.reject("Error updating post");
      });
    return deferred.promise;
  }

  return PostFactory;

}])

// end of file
;

