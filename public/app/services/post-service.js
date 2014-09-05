'use strict';

/* POST MODEL */

//TODO: http://www.bennadel.com/blog/2612-using-the-http-service-in-angularjs-to-make-ajax-requests.htm

angular.module('Yote').factory('PostResource', ['$http', function($http) {

  var urlBase = "/api/posts";
  var PostResource = {};

  return {
    all: function() {
      console.log("fetch all Posts called");
      return $http.get(urlBase)
        .success(function(data){
          this = data;
        }).error(function(data){
          console.log("error retrieving all posts.");
        });
    }
  }


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