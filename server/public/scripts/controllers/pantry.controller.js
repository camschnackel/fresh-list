myApp.controller('PantryController', function (UserService, FoodService, $scope, $filter, $mdDialog) {
  console.log('PantryController created');
  $scope.currentNavItem = 'pantry';

  var vm = this;
  vm.addToggle = false;
  vm.editToggle = -1;
  vm.sortMethod = 'expiry';
  vm.reverse = false;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.foodObj = FoodService.foodObj;
  vm.dateDefault = new Date();

  console.log('vm.userObject ->', vm.userObject);

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

  // function to clear input fields
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

  // function to get food items from database
  vm.getFood = function () {
    FoodService.getFood();
    console.log('vm.foodObj ->', vm.foodObj);
  }

  // function to add new food item to database
  vm.addItem = function () {
    pc.addToggle = false;
    vm.pantryAdd.expiry = $filter('date')(vm.pantryAdd.expiry, "MM/dd/yyyy");
    console.log('addItem clicked! vm.pantryAdd ->', vm.pantryAdd);

    FoodService.postFood(vm.pantryAdd).then(function () {
      vm.resetItems();
      vm.getFood();
    });
  }

  vm.recipeSuggest = function (ev, food) {
    console.log('recipeSuggest called with food ->', food);

    $mdDialog.show({
        controller: DialogController,
        templateUrl: '../views/partials/suggest.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true // Only for -xs, -sm breakpoints.
      })
      // .then(function (answer) {
      //   $scope.status = 'You said the information was "' + answer + '".';
      // }, function () {
      //   $scope.status = 'You cancelled the dialog.';
      // });
  }

  function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  }

  //function to delete item from database
  vm.editFood = function (food) {
    console.log('in editFood with food ->', food);
    vm.editToggle = -1;
    vm.pantryEdit.food = food;
    vm.pantryEdit.expiry = $filter('date')(vm.pantryEdit.expiry, "MM/dd/yyyy");
    FoodService.putFood(vm.pantryEdit)
      .then(function () {
        vm.resetEdit();
        vm.getFood();
      })
  }

  //function to delete item from database
  vm.deleteFood = function (food) {
    console.log('in deleteFood with food ->', food);
    FoodService.deleteFood(food).then(function () {
      vm.getFood();
    });
  }
});