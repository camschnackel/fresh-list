myApp.controller('DiscoverController', function (UserService, RecipeService, $scope) {
    console.log('DiscoverController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.recipeObject = RecipeService.recipeObject;
    vm.toggleState = {};
    vm.hideCard = {};
    vm.query = '';

    vm.toggleIngredients = function (index) {
        vm.toggleState[index] = {};
        vm.toggleState[index].Ingredients = true;
        vm.toggleState[index].Health = false;
        vm.toggleState[index].Diet = false;
    }
    vm.toggleHealth = function (index) {
        vm.toggleState[index] = {};
        vm.toggleState[index].Ingredients = false;
        vm.toggleState[index].Health = true;
        vm.toggleState[index].Diet = false;
    }
    vm.toggleDiet = function (index) {
        vm.toggleState[index] = {};
        vm.toggleState[index].Ingredients = false;
        vm.toggleState[index].Health = false;
        vm.toggleState[index].Diet = true;
    }

    vm.getSaved = function () {
        RecipeService.getSaved();
        console.log('vm.recipeObject ->', vm.recipeObject);
    }

    vm.favorite = function (recipe) {
        console.log('favorite clicked w/ ->', recipe);
        RecipeService.postRecipe(recipe);
    };

    vm.unFavorite = function (id) {
        console.log('unFavorite clicked w/ ->', id);
        RecipeService.deleteRecipe(id);
    };

    vm.search = function () {
        RecipeService.search(vm.query).then(function () {
            vm.query = '';
        })
    }

    vm.getSaved();

    $scope.currentNavItem = 'discover';
});