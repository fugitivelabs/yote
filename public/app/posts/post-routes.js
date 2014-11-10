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
      , templateUrl: '/html/static/views/default-layout'
      , controller: 'PostCtrl'
    })
    // first child of post. Empty url: '' signifies "/post" + " "
    .state('post.list', {
      url: ''
      , templateUrl: '/html/posts/views/list'
      , controller: 'PostListCtrl'
    })
    .state('post.show', {
      url: '/show/:slug'
      , templateUrl: '/html/posts/views/show'
      , controller: 'PostShowCtrl'
    })
    .state('post.new', {
      url: '/new'
      , templateUrl: '/html/posts/views/create'
      , controller: 'PostCreateCtrl'
      , data: {
        role: "login"
      }
    })
    .state('post.edit', {
      url: '/edit/:slug'
      , templateUrl: '/html/posts/views/edit'
      , controller: 'PostUpdateCtrl'
      , data: {
        role: "login"
      }
    })

// ==> end state config
})

// end file
;