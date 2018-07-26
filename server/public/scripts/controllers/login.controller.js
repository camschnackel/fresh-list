myApp.controller('LoginController', function ($http, $location, $scope, UserService) {
  var vm = this;
  $scope.about = true;

  vm.user = {
    name: '',
    username: '',
    password: ''
  };
  vm.message = '';

  vm.login = function () {
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = 'Enter your email and password!';
    } else {
      // delete vm.user.name;
      $http.post('/', vm.user).then(function (response) {
        if (response.data.username) {
          // location works with SPA (ng-route)
          $location.path('/pantry'); // http://localhost:5000/#/user
        } else {
          vm.message = "That password was incorrect, please try again.";
        }
      }).catch(function (response) {
        vm.message = "That password was incorrect, please try again.";
      });
    }
  };

  vm.registerUser = function () {
    if (vm.user.password !== vm.user.passwordConfirm) {
      vm.confirmMessage = "Passwords do not match!";
      delete vm.user.passwordConfirm;
      vm.user.password = '';
    } else {
      $http.post('/register', vm.user).then(function (response) {
        $location.path('/home');
      }).catch(function (response) {
        vm.message = "Please try again."
      });
    }
  }
});