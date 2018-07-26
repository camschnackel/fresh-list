myApp.factory('UserService', function($http, $location){

  var userObject = {};

  return {
    userObject : userObject,

    getuser : function(){
      $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a current session on the server
              userObject.userName = response.data.username;
              userObject.name = response.data.name;
          } else {
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      },function(response){
        $location.path("/home");
      });
    },

    logout : function() {
      $http.get('/user/logout').then(function(response) {
        $location.path("/home");
      });
    }
  };
});
