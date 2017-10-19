myApp.service('FoodService', function ($http) {
    console.log('in FoodService');
    var self = this;

    self.foodObj = {food: []};

    self.getFood = function () {
        console.log('in getFood');
        $http({
            method: 'GET',
            url: '/pantry'
        }).then(function (response) {
            console.log('response.data ->', response.data);
            self.foodObj.food = response.data[0].food;
            console.log('self.foodObj ->', self.foodObj);
            
        })
    }

    self.postFood = function (objToSend) {
        console.log('in postFood');
        return $http({
            method: 'POST',
            url: '/pantry',
            data: objToSend
        });
    }

});