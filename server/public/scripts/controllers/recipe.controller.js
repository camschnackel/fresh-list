myApp.controller('RecipeController', function (UserService, $scope) {
    console.log('RecipeController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    
    $scope.currentNavItem = 'recipes';
});