angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
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
      , templateUrl: '/views/layouts/homepage-layout'
    })

    // first child of root. is the hompage. Empty url: '' signifies '/' + ''
    .state('root.home', {
      url: ''
      , templateUrl: '/views/homepage/index'
      , controller: 'HomeCtrl'
    })

    /********************** 
    *  Admin Routes
    ***********************/

    .state('admin', {
      abstract: true
      , url: '/admin'
      , templateUrl: '/views/layouts/admin'
      , controller: 'AdminCtrl'
    })

    .state('admin.dashboard', {
      url: ''
      , templateUrl: '/views/admin/dashboard'
    })

    /********************** 
    *  Static Routes
    ***********************/

    .state('static', {
      abstract: true
      , url: '/static'
      , templateUrl: '/views/layouts/default'
      , controller: 'StaticCtrl'
    })

    .state('static.about', {
      url: '^/about'
      , templateUrl: '/views/static/about'
    })

    .state('static.faq', {
      url: '^/frequently-asked-questions'
      , templateUrl: '/views/static/faq'
    })

    /********************** 
    *  User Routes
    ***********************/

    //parent state of users
    .state('user', {
      abstract: true
      , url: '/user'
      , templateUrl: '/views/layouts/default'
      , controller: 'UserCtrl'
    })
    //login view
    .state('user.login', {
      url: '/login'
      , templateUrl: '/views/user/login'
      , controller: 'UserLoginCtrl'
    })
    .state('user.logout', {
      url: '/logout'
      , controller: 'UserLogoutCtrl'
    })
    .state('user.register', {
      url: '/register'
      , templateUrl: '/views/user/register'
      , controller: 'UserRegisterCtrl'
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
      url: '/show/:slug'
      , templateUrl: '/views/post/show'
      , controller: 'PostShowCtrl'
    })
    .state('post.new', {
      url: '/new'
      , templateUrl: '/views/post/create'
      , controller: 'PostCreateCtrl'
    })
    .state('post.edit', {
      url: '/edit/:slug'
      , templateUrl: '/views/post/edit'
      , controller: 'PostUpdateCtrl'
    })
})



// end of file
;