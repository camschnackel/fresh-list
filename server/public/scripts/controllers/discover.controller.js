myApp.controller('DiscoverController', function (UserService, RecipeService, $scope) {
  console.log('DiscoverController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.recipeObject = RecipeService.recipeObject;
  // vm.toggleState = {};
  vm.hideCard = {};
  vm.query = '';
  vm.loading = false;
  RecipeService.recipeObject.suggested = '';

  vm.stopLoad = function () {
    vm.loading = false;
  }

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

  vm.getSaved = function () {
    RecipeService.getSaved();
    console.log('vm.recipeObject ->', vm.recipeObject);
  }

  vm.favorite = function (recipe) {
    vm.loading = true;
    console.log('favorite clicked w/ ->', recipe);
    RecipeService.postRecipe(recipe).then(function () {
      vm.stopLoad();
      console.log('vm.recipeObject ->', vm.recipeObject);
    });
  };

  vm.unFavorite = function (id) {
    vm.loading = true;
    console.log('unFavorite clicked w/ ->', id);
    RecipeService.deleteRecipe(id).then(function () {
      vm.stopLoad();
      console.log('vm.recipeObject ->', vm.recipeObject);
    });
  };

  vm.search = function () {
    RecipeService.search(vm.query).then(function () {
      vm.query = '';
    })
  }

  vm.getSaved();

  $scope.currentNavItem = 'discover';
});