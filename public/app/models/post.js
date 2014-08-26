'use strict';

/* POST MODEL */

//init
var YoteModels = angular.module('YoteModels', []);

Yote.factory('PostResource', function($http, $q){
  return {
    list:[]

    , all: function() {
      console.log("fetch all Posts called");
      var that = this;
      return $http.get("/api/posts")
        .success(function(data){
          console.log(data);
          that.list = data;
        }).error(function(data){
          console.log("error fetching posts:");
          console.log(data);
        });
    }

    , show: function(postId) {
      console.log("show post view called");
      var that = this;
      return $http.get("/api/posts/" + postId)
        .success(function(data){
          console.log(data);
          that.show = data;
        }).error(function(data){
          console.log("error finding post");
          console.log(data);
        })
    }

  }
});