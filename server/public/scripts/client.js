var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngMdIcons']);

myApp.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    }).when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    }).when('/pantry', {
      templateUrl: '/views/templates/pantry.html',
      controller: 'PantryController as pc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    }).when('/recipes', {
      templateUrl: '/views/templates/recipes.html',
      controller: 'RecipeController as rc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    }).when('/discover', {
      templateUrl: '/views/templates/discover.html',
      controller: 'DiscoverController as dc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    }).when('/about', {
      templateUrl: '/views/templates/about.html'
    })
    .otherwise({
      redirectTo: '/home'
    });


  $locationProvider.html5Mode(true);

  $mdThemingProvider.theme('default').primaryPalette('green').accentPalette('green', {
    'default': '300'
  });
});
