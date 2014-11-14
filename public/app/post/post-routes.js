angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router - post');
  
  $locationProvider.html5Mode(true);

  $stateProvider

    /********************** 
    *  Post Routes
    ***********************/
    
    // parent state of post.  
    .state('post', {
      abstract: true
      , url: '/post'
      , templateUrl: '/html/static/templates/default-layout'
      , controller: 'PostCtrl'
    })
    // list of all posts.  url: 's' signifies /posts
    .state('post.list', {
      url: 's'
      , templateUrl: '/html/post/templates/list'
      , controller: 'PostListCtrl'
    })
    .state('post.show', {
      url: '/show/:slug'
      , templateUrl: '/html/post/templates/show'
      , controller: 'PostShowCtrl'
    })
    .state('post.new', {
      url: '/new'
      , templateUrl: '/html/post/templates/create'
      , controller: 'PostCreateCtrl'
      , data: {
        role: "login"
      }
    })
    .state('post.edit', {
      url: '/edit/:slug'
      , templateUrl: '/html/post/templates/edit'
      , controller: 'PostUpdateCtrl'
      , data: {
        role: "login"
      }
    })

// ==> end state config
})

// end file
;