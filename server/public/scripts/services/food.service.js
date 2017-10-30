myApp.service('FoodService', function ($http) {
  console.log('in FoodService');
  var self = this;

  self.foodObj = {
    food: []
  };

  self.dateDif = function (date) {
    var date1 = new Date();
    var date2 = new Date(date);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  self.getFood = function () {
    console.log('in getFood');
    $http({
      method: 'GET',
      url: '/food'
    }).then(function (response) {
      console.log('response.data ->', response.data);
      self.foodObj.food = response.data[0].food;
      console.log('self.foodObj ->', self.foodObj);
    }).then(function () {

      // var dateDif = function (date) {
      //   var date1 = new Date();
      //   var date2 = new Date(date);
      //   var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      //   var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      //   return diffDays;
      // }

      for (var i = 0; i < self.foodObj.food.length; i++) {
        self.foodObj.food[i].dif = self.dateDif(self.foodObj.food[i].expiry);
        console.log('self.foodObj.food[i].dif ->', self.foodObj.food[i].dif)
      }
    })
  }

  self.postFood = function (objToSend) {
    objToSend.dif = self.dateDif(objToSend.expiry);

    console.log('in postFood');
    return $http({
      method: 'POST',
      url: '/food',
      data: objToSend
    });
  }

  self.putFood = function (objToSend) {
    objToSend.dif = self.dateDif(objToSend.expiry);

    console.log('in putFood w/ objToSend ->', objToSend);
    return $http({
      method: 'PUT',
      url: '/food',
      data: objToSend
    });
  }

  self.deleteFood = function (food) {
    console.log('in deleteFood w/ ->', food);

    return $http({
      method: 'DELETE',
      url: '/food/' + food
    });
  }

});