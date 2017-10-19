myApp.controller('SupportController', function (UserService, $scope) {
    console.log('SupportController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;

    $scope.currentNavItem = 'support';
});