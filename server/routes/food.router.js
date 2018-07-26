var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var Food = require('../models/user.js');
var mongodb = require('mongodb');

// retrieves pantry items for logged in user from database
router.get('/', function (req, res) {

  Food.find({
      username: req.user.username
    }, {
      food: 1,
      _id: 0
    },
    function (err, foodResults) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(foodResults);
      }
    })
})

// posts newly created pantry item to database
router.post('/', function (req, res) {

  Food.updateOne({
      username: req.user.username
    }, {
      $push: {
        food: {
          _id: mongoose.Types.ObjectId(),
          qty: req.body.qty,
          name: req.body.name,
          expiry: req.body.expiry,
          dif: req.body.dif
        }
      }
    },
    function (err, response) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    }
  );
});

// puts edited pantry item in database
router.put('/', function (req, res) {

  Food.update({
      username: req.user.username,
      "food.name": req.body.food
    }, {
      $set: {
        "food.$.name": req.body.name,
        "food.$.qty": req.body.qty,
        "food.$.expiry": req.body.expiry,
        "food.$.dif": req.body.dif
      }
    },
    function (err, response) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    })
})

// deletes pantry item from database
router.delete('/:food', function (req, res) {

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
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    })
})

module.exports = router;