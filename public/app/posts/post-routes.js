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
      , templateUrl: '/views/layouts/default'
      , controller: 'PostCtrl'
    })
    // first child of post. Empty url: '' signifies "/post" + " "
    .state('post.list', {
      url: ''
      , templateUrl: '/views/post/list'
      , controller: 'PostListCtrl'
    })
    .state('post.show', {
      url: '/show/:slug'
      , templateUrl: '/views/post/show'
      , controller: 'PostShowCtrl'
    })
    .state('post.new', {
      url: '/new'
      , templateUrl: '/views/post/create'
      , controller: 'PostCreateCtrl'
      , data: {
        role: "login"
      }
    })
    .state('post.edit', {
      url: '/edit/:slug'
      , templateUrl: '/views/post/edit'
      , controller: 'PostUpdateCtrl'
      , data: {
        role: "login"
      }
    })

// ==> end state config
})

// end file
;