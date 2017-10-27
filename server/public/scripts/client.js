var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngMdIcons']);
/// Routes ///
myApp.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
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
    }).when('/support', {
      templateUrl: '/views/templates/support.html',
      controller: 'SupportController as sc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: '/home'
    });


  $locationProvider.html5Mode(true);

  $mdThemingProvider.theme('default').primaryPalette('green').accentPalette('green', {
    'default': '300'
  });
});
