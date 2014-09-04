'use strict';

/* POST MODEL */

//init
var YoteModels = angular.module('YoteModels', []);

Yote.factory('PostResource', ['$http', function($http) {

  var urlBase = "/api/posts";
  var PostResource = {};

  PostResource.all = function {
    return $http.get(urlBase);
  };

  PostResource.show = function(postId) {
    return $http.get(urlBase + "/" + postId);
  };


}]);

// Yote.factory('PostResource', function($http, $q){
//   return {
//     list:[]
//     , all: function() {
//       console.log("fetch all Posts called");
//       var that = this;
//       return $http.get("/api/posts")
//         .success(function(data){
//           console.log(data);
//           that.list = data;
//         }).error(function(data){
//           console.log("error fetching posts:");
//           console.log(data);
//         });
//     }
//     , show: function(postId) {
//       console.log("show post view called");
//       // var that = this;
//       // return $http.get("/api/posts/" + postId)
//       //   .success(function(data){
//       //     console.log("debug 1");
//       //     console.log(data);
//       //     that.show = data;
//       //   }).error(function(data){
//       //     console.log("error finding post");
//       //     console.log(data);
//       //   })
// //below doesn't throw errors, but isn't populating. above throws errors the second
// //  time you call it. plus, it has some funky quirks, and I don't think it is the 
// //    correct way to do it. you are basically returning the entire http request to 
// //      the controller (which is why you say "that = this", and "show", and that crap)
// //      which kind of defeats the idea of a model in the first place. but the below 
// //        doesnt work, and the above does. trying to find the better way to do it.

//       var deferred = $q.defer();
//       $http.get("/api/posts/" + postId).success(function(data) {
//         console.log("debug 1");
//         console.log(data);
//         deferred.resolve(data);
//       });
//       return deferred.promise;
//     }
//   }
// });