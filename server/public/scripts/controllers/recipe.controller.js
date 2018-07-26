myApp.controller('RecipeController', function (UserService, RecipeService, $scope) {
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.recipeObject = RecipeService.recipeObject;
  vm.toggleState = {};
  vm.hideCard = {};
  vm.query = '';

  // the following 3 functions allow the information displays within recipe cards to be toggled
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

  // retrieves saved recipes
  vm.getSaved = function () {
    RecipeService.getSaved();
  }

  // favorites an unfavorited recipe
  vm.favorite = function (recipe) {
    RecipeService.postRecipe(recipe);
  };

  // unfavorites a favorited recipe
  vm.unFavorite = function (id, index) {
    vm[index] = true;
    RecipeService.deleteRecipeStop(id);
  };

  vm.getSaved(); // ensures saved recipes load on page render
  $scope.currentNavItem = 'recipes';
});