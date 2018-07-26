myApp.service('FoodService', function ($http) {
  var self = this;

  self.foodObj = {
    food: []
  };

  // function to calculate how many days a food item has before it expires
  self.dateDif = function (date) {
    var date1 = new Date();
    var date2 = new Date(date);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  // function to retrieve pantry items from database
  self.getFood = function () {
    $http({
      method: 'GET',
      url: '/food'
    }).then(function (response) {
      self.foodObj.food = response.data[0].food;
    }).then(function () {

      for (var i = 0; i < self.foodObj.food.length; i++) {
        self.foodObj.food[i].dif = self.dateDif(self.foodObj.food[i].expiry);
      }
    })
  }

  // function to add new item to pantry
  self.postFood = function (objToSend) {
    objToSend.dif = self.dateDif(objToSend.expiry);

    return $http({
      method: 'POST',
      url: '/food',
      data: objToSend
    });
  }

  // function to edit pantry item
  self.putFood = function (objToSend) {
    objToSend.dif = self.dateDif(objToSend.expiry);

    return $http({
      method: 'PUT',
      url: '/food',
      data: objToSend
    });
  }

  // function to delete pantry item
  self.deleteFood = function (food) {

    return $http({
      method: 'DELETE',
      url: '/food/' + food
    });
  }

});