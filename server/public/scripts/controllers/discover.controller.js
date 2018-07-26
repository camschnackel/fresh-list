myApp.controller('DiscoverController', function (UserService, RecipeService, $scope) {
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.recipeObject = RecipeService.recipeObject;
  vm.hideCard = {};
  vm.query = '';
  vm.loading = false;
  RecipeService.recipeObject.suggested = '';

  vm.stopLoad = function () {
    vm.loading = false;
  }

  // the following 3 functions allow the information displays within recipe cards to be toggled
  vm.toggleIngredients = function (index) {
    vm.recipeObject.results[index].toggleState = {};
    vm.recipeObject.results[index].toggleState.Ingredients = true;
    vm.recipeObject.results[index].toggleState.Health = false;
    vm.recipeObject.results[index].toggleState.Diet = false;
  }
  vm.toggleHealth = function (index) {
    vm.recipeObject.results[index].toggleState = {};
    vm.recipeObject.results[index].toggleState.Ingredients = false;
    vm.recipeObject.results[index].toggleState.Health = true;
    vm.recipeObject.results[index].toggleState.Diet = false;
  }
  vm.toggleDiet = function (index) {
    vm.recipeObject.results[index].toggleState = {};
    vm.recipeObject.results[index].toggleState.Ingredients = false;
    vm.recipeObject.results[index].toggleState.Health = false;
    vm.recipeObject.results[index].toggleState.Diet = true;
  }

  // retrieves saved recipes from database
  vm.getSaved = function () {
    RecipeService.getSaved();
  }

  // saves an unsaved recipe and stores its data in database, triggered when unfilled heart icon is clicked in discover view
  vm.favorite = function (recipe) {
    vm.loading = true;
    RecipeService.postRecipe(recipe).then(function () {
      vm.stopLoad();
    });
  };

  // unsaves a saved recipe and removes its data from the database, triggered when a filled heart icon is clicked in discover view
  vm.unFavorite = function (id) {
    vm.loading = true;
    RecipeService.deleteRecipe(id).then(function () {
      vm.stopLoad();
    });
  };

  // sends API request when a search is performed in the discover view
  vm.search = function () {
    RecipeService.search(vm.query).then(function () {
      vm.query = '';
    })
  }

  // retrieves saved recipes to allow their hearts to be displayed properly
  vm.getSaved();

  $scope.currentNavItem = 'discover';
});