myApp.controller('PantryController', function (UserService, FoodService, $scope, $filter) {
    console.log('PantryController created');
    $scope.currentNavItem = 'pantry';

    var vm = this;
    vm.addToggle = false;
    vm.editToggle = -1;
    vm.sortMethod = 'date';
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.foodObj = FoodService.foodObj;
    vm.dateDefault = new Date();

    console.log('vm.userObject ->', vm.userObject);
    
    vm.pantryAdd = {
        qty: '',
        name: '',
        expiry: new Date()
    }

    vm.pantryEdit = {
        qty: '',
        name: '',
        expiry: ''
    }

    // function to clear input fields
    vm.resetItems = function () {
        vm.pantryAdd.qty = '';
        vm.pantryAdd.name = '';
        vm.pantryAdd.expiry = new Date();
    }

    // function to get food items from database
    vm.getFood = function () {
        FoodService.getFood();
        console.log('vm.foodObj ->', vm.foodObj);
    }

    // function to add new food item to database
    vm.addItem = function () {
        vm.pantryAdd.expiry = $filter('date')(vm.pantryAdd.expiry, "MM/dd/yyyy");
        console.log('addItem clicked! vm.pantryAdd ->', vm.pantryAdd);

        FoodService.postFood(vm.pantryAdd).then(function () {
            vm.resetItems();
            vm.getFood();
        });
    }

    //function to delete item from database
    vm.editFood = function (food) {
        console.log('in editFood with food ->', food);
        vm.editToggle = -1

    }

    //function to delete item from database
    vm.deleteFood = function (food) {
        console.log('in deleteFood with food ->', food);
        FoodService.deleteFood(food).then(function () {
            vm.getFood();
        });
    }
});