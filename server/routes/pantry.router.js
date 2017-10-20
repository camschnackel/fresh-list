var router = require('express').Router();
var path = require('path');
var Food = require('../models/user.js');

router.post('/', function (req, res) {
    console.log('in pantry post router, req.body ->', req.body);
    console.log('in pantry post router, req.user ->', req.user);

    Food.updateOne({ username: req.user.username },
        { $push: { food: { qty: req.body.qty, name: req.body.name, expiry: req.body.expiry } } },
        function (err, response) {
            if (err) {
                console.log('Food.updateOne err', err);
                res.sendStatus(500);
            } else {
                console.log('Update added');
                res.sendStatus(201);
            }
        }
    );
});

router.get('/', function (req, res) {
    console.log('in pantry get route');
    
    Food.find({ username: req.user.username }, function (err, foodResults) {
        if (err) {
            console.log('Food.find err ->', err);
            res.sendStatus(500);
        } else {
            console.log('foodResults ->', foodResults);
            res.send(foodResults);
        }
    })
})

router.delete('/:food', function (req, res) {
    console.log('in pantry delete route with req.params ->', req.params);
    
    Food.update({ username: req.user.username }, { $pull: { food: { "name": req.params.food } } },
        function (err, response) {
            if (err) {
                console.log('Food.update err ->', err);
                res.sendStatus(500);
            } else {
                console.log('Delete Update Added');
                res.sendStatus(201);
            }
    })
})

module.exports = router;