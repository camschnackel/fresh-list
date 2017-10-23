myApp.controller('PantryController', function (UserService, FoodService, $scope, $filter) {
    console.log('PantryController created');
    $scope.currentNavItem = 'pantry';

    var vm = this;
    vm.addToggle = false;
    vm.editToggle = -1;
    vm.sortMethod = '';
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
        food: '',
        qty: '',
        name: '',
        expiry: ''
    }

    vm.sort = function () {
        if (vm.sortMethod === 'date') {
            console.log('Sort by Date!');
            vm.sortByDate();
        } else {
            console.log('Sort by Name!');
            FoodService.foodObj.food.sort();
        }
    }

    vm.sortByDate = function () {

        for (var i = 0; i < FoodService.foodObj.food.length; i++) {
            FoodService.foodObj.food[i].dif = dateDif(FoodService.foodObj.food[i].expiry);
            console.log('FoodService.foodObj.food[i].dif ->', FoodService.foodObj.food[i].dif)
        }

        var dateDif = function (date) {
        var date1 = new Date();
        var date2 = new Date(date);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
        }

        FoodService.foodObj.food.sort(function (a, b) { return a - b });
        console.log('FoodService.foodObj.food after sort ->', FoodService.foodObj.food);
        
    }

    // function to clear input fields
    vm.resetItems = function () {
        vm.pantryAdd.qty = '';
        vm.pantryAdd.name = '';
        vm.pantryAdd.expiry = new Date();
    }

    vm.resetEdit = function () {
        vm.pantryAdd.food = '';
        vm.pantryAdd.qty = '';
        vm.pantryAdd.name = '';
        vm.pantryAdd.expiry = '';
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