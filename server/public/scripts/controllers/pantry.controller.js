myApp.controller('PantryController', function (UserService, FoodService, $scope) {
    console.log('PantryController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;

    $scope.currentNavItem = 'pantry';

    vm.pantryAdd = {
        qty: '',
        name: '',
        expiry: ''
    }

    vm.reset = function () {
        vm.pantryAdd.qty = '';
        vm.pantryAdd.name = '';
        vm.pantryAdd.expiry = '';
    }

    vm.sortMethod = 'date';

    vm.addToggle = false;

    vm.addItem = function () {
        console.log('addItem clicked!');

        UserService
    }
});