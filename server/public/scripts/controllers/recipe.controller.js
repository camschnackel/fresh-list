myApp.controller('RecipeController', function (UserService, RecipeService, $scope) {
    console.log('RecipeController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.recipeObject = RecipeService.recipeObject;
    vm.getSaved = function () {
        RecipeService.getSaved();
        console.log('vm.recipeObject ->', vm.recipeObject);
    }

    vm.getSaved();
    $scope.currentNavItem = 'recipes';
});