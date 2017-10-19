myApp.service('FoodService', function ($http) {
    console.log('in FoodService');
    var self = this;

    self.rentalsList = { homes: [] };
    self.salesList = { homes: [] };
    self.listing = {};

    self.getRentals = function () {
        console.log('in getHomes');
        $http({
            method: 'GET',
            url: '/housing/rentals'
        }).then(function (response) {
            self.rentalsList.homes = response.data;
            console.log('self.rentalsList ->', self.rentalsList.homes);

        })
    }

    self.getSales = function () {
        console.log('in getHomes');
        $http({
            method: 'GET',
            url: '/housing/sales'
        }).then(function (response) {
            self.salesList.homes = response.data;
            console.log('self.salesList ->', self.salesList.homes);

        })
    }

    self.postListing = function (objToSend) {
        console.log('in postListing');
        $http({
            method: 'POST',
            url: '/housing/listings',
            data: objToSend
        }).then(function (response) {

        })
    }

});