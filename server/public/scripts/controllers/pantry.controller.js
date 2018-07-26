myApp.controller('PantryController', function (UserService, FoodService, RecipeService, $scope, $filter, $mdDialog) {
  $scope.currentNavItem = 'pantry';
  $scope.about = true;

  var vm = this;
  vm.addToggle = false;
  vm.editToggle = -1;
  vm.sortMethod = 'expiry';
  vm.reverse = false;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.foodObj = FoodService.foodObj;
  vm.dateDefault = new Date();
  vm.mobileSearch = false;

  vm.pantryAdd = {
    qty: '',
    name: '',
    expiry: new Date(),
  }

  vm.pantryEdit = {
    food: '',
    qty: '',
    name: '',
    expiry: ''
  }

  vm.sort = function (method) {
    vm.reverse = (vm.sortMethod === method) ? !vm.reverse : false;
    vm.sortMethod = method;
  }

  // clears input fields
  vm.resetItems = function () {
    vm.pantryAdd.qty = '';
    vm.pantryAdd.name = '';
    vm.pantryAdd.expiry = new Date();
  }

  vm.resetEdit = function () {
    vm.pantryEdit.food = '';
    vm.pantryEdit.qty = '';
    vm.pantryEdit.name = '';
    vm.pantryEdit.expiry = '';
  }

  // gets food items from database
  vm.getFood = function () {
    FoodService.getFood();
  }

  // adds new food item to database
  vm.addItem = function () {
    vm.addToggle = false;
    vm.pantryAdd.expiry = $filter('date')(vm.pantryAdd.expiry, "MM/dd/yyyy");

    FoodService.postFood(vm.pantryAdd).then(function () {
      vm.resetItems();
      vm.getFood();
    });
  }

  // displays suggested recipe dialog
  vm.suggestDialog = function (ev, food) {

    RecipeService.recipeSuggest(food).then($mdDialog.show({
        controller: DialogController,
        templateUrl: '../views/partials/suggest.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true
      })
    )}

  // controller for vm.suggestDialog
  function DialogController(RecipeService, $scope, $mdDialog) {

    $scope.recipeObject = RecipeService.recipeObject;
    $scope.loading = false;
    

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };

    $scope.stopLoad = function () {
      $scope.loading = false;
    }

    $scope.favorite = function (recipe) {
      $scope.loading = true;
      RecipeService.postRecipe(recipe).then($scope.stopLoad());
    };

    $scope.unFavorite = function (id) {
      $scope.loading = true;
      RecipeService.deleteRecipe(id).then($scope.stopLoad());
    };

    $scope.selectedTab = '';
  }

  // edits pantry item
  vm.editFood = function (food) {
    vm.editToggle = -1;
    vm.pantryEdit.food = food;
    vm.pantryEdit.expiry = $filter('date')(vm.pantryEdit.expiry, "MM/dd/yyyy");
    FoodService.putFood(vm.pantryEdit)
      .then(function () {
        vm.resetEdit();
        vm.getFood();
      })
  }

  // deletes food from pantry
  vm.deleteFood = function (food) {
    FoodService.deleteFood(food).then(function () {
      vm.getFood();
    });
  }
});