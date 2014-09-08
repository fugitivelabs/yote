angular.module('Yote').config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router');
  
  $locationProvider.html5Mode(true);

  // add a route to 404 page here
  $urlRouterProvider.otherwise('/');

  $stateProvider

    /********************** 
    *  Default Routes
    ***********************/

    // root state of the application. Loades default template. Is abstract so it also defers to the first child template
    .state('root', {
      abstract: true
      , url: '/'
      , templateUrl: '/views/layouts/default'
    })

    // first child of root. is the hompage. Empty url: '' signifies '/' + ''
    .state('root.home', {
      url: ''
      , templateUrl: '/views/homepage/index'
      , controller: 'HomeCtrl'
    })

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
      url: '/show/:postId'
      , templateUrl: '/views/post/show'
      , controller: 'PostShowCtrl'
    })
})

// end of file
;