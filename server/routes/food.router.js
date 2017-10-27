var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var Food = require('../models/user.js');
var mongodb = require('mongodb');


router.get('/', function (req, res) {
  console.log('in the food get route');

  Food.find({
      username: req.user.username
    }, {
      food: 1,
      _id: 0
    },
    function (err, foodResults) {
      if (err) {
        console.log('Food.find err ->', err);
        res.sendStatus(500);
      } else {
        console.log('Get Update Added');
        res.send(foodResults);
      }
    })
})

router.post('/', function (req, res) {
  console.log('in food post router, req.body ->', req.body);
  console.log('in food post router, req.user ->', req.user);

  Food.updateOne({
      username: req.user.username
    }, {
      $push: {
        food: {
          _id: mongoose.Types.ObjectId(),
          qty: req.body.qty,
          name: req.body.name,
          expiry: req.body.expiry
        }
      }
    },
    function (err, response) {
      if (err) {
        console.log('Food.updateOne err', err);
        res.sendStatus(500);
      } else {
        console.log('Post Update added');
        res.sendStatus(201);
      }
    }
  );
});

router.put('/', function (req, res) {
  console.log('in food put router, req.body ->', req.body);

  Food.update({
      username: req.user.username,
      "food.name": req.body.food
    }, {
      $set: {
        "food.$.name": req.body.name,
        "food.$.qty": req.body.qty,
        "food.$.expiry": req.body.expiry
      }
    },
    function (err, response) {
      if (err) {
        console.log('Food.update err ->', err);
        res.sendStatus(500);
      } else {
        console.log('Put Update Added');
        res.sendStatus(201);
      }
    })
})

router.delete('/:food', function (req, res) {
  console.log('in food delete route with req.params.food ->', req.params.food);

  Food.update({
      username: req.user.username
    }, {
      $pull: {
        food: {
          "_id": mongodb.ObjectId(req.params.food)
        }
      }
    },
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