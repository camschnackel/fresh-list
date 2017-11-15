myApp.controller('RecipeController', function (UserService, RecipeService, $scope) {
    console.log('RecipeController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.recipeObject = RecipeService.recipeObject;
    vm.toggleState = {};
    vm.hideCard = {};
    vm.query = '';
    console.log('vm.recipeObject ->', vm.recipeObject);

    // vm.setDefaultToggle = function () {
    //     console.log('setDefaultToggle ran, vm.recipeObject.saved ->', vm.recipeObject.saved);
        
    //     for (var i = 0; i < vm.recipeObject.saved.length; i++) {
    //         vm.recipeObject.saved[i].toggleState.Ingredients = true;
    //         vm.recipeObject.saved[i].toggleState.Health = false;
    //         vm.recipeObject.saved[i].toggleState.Diet = false;
    //         console.log('vm.recipeObject.saved[i].toggleState ->', vm.recipeObject.saved[i].toggleState);
            
    //     }
    // }

    vm.toggleIngredients = function (index) {
        vm.recipeObject.saved[index].toggleState = {};
        vm.recipeObject.saved[index].toggleState.Ingredients = true;
        vm.recipeObject.saved[index].toggleState.Health = false;
        vm.recipeObject.saved[index].toggleState.Diet = false;
    }
    vm.toggleHealth = function (index) {
        vm.recipeObject.saved[index].toggleState = {};
        vm.recipeObject.saved[index].toggleState.Ingredients = false;
        vm.recipeObject.saved[index].toggleState.Health = true;
        vm.recipeObject.saved[index].toggleState.Diet = false;
    }
    vm.toggleDiet = function (index) {
        vm.recipeObject.saved[index].toggleState = {};
        vm.recipeObject.saved[index].toggleState.Ingredients = false;
        vm.recipeObject.saved[index].toggleState.Health = false;
        vm.recipeObject.saved[index].toggleState.Diet = true;
    }

    vm.getSaved = function () {
        RecipeService.getSaved();
        console.log('vm.recipeObject ->', vm.recipeObject);
    }

    vm.favorite = function (recipe) {
        console.log('favorite clicked w/ ->', recipe);
        RecipeService.postRecipe(recipe);
    };

    vm.unFavorite = function (id, index) {
        console.log('unFavorite clicked w/ ->', id);
        vm[index] = true;
        RecipeService.deleteRecipeStop(id);
    };

    vm.getSaved();
    $scope.currentNavItem = 'recipes';
});