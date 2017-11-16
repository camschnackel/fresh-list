myApp.controller('LoginController', function($http, $location, $scope, UserService) {
    console.log('LoginController created');
    var vm = this;
    $scope.about = true;

    vm.user = {
      name: '',
      username: '',
      password: ''
    };
    vm.message = '';

    vm.login = function() {
      console.log('LoginController -- login');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = 'Enter your email and password!';
      } else {
        console.log('LoginController -- login -- sending to server...', vm.user);
        // delete vm.user.name;
        $http.post('/', vm.user).then(function(response) {
          if(response.data.username) {
            console.log('LoginController -- login -- success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/pantry'); // http://localhost:5000/#/user
          } else {
            console.log('LoginController -- login -- failure: ', response);
            vm.message = "Wrong!!";
          }
        }).catch(function(response){
          console.log('LoginController -- registerUser -- failure: ', response);
          vm.message = "Wrong!!";
        });
      }
    };

    vm.registerUser = function() {
      console.log('LoginController -- registerUser');
      if(vm.user.password !== vm.user.passwordConfirm) {
        vm.confirmMessage = "Passwords do not match!";
        delete vm.user.passwordConfirm;
        vm.user.password = '';
      } else {
        console.log('LoginController -- registerUser -- sending to server...', vm.user);
        $http.post('/register', vm.user).then(function(response) {
          console.log('LoginController -- registerUser -- success');
          $location.path('/home');
        }).catch(function(response) {
          console.log('LoginController -- registerUser -- error');
          vm.message = "Please try again."
        });
      }
    }
});
