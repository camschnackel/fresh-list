var router = require('express').Router();
var path = require('path');
var Food = require('../models/user.js');

router.get('/', function (req, res) {
  console.log('in pantry get route');

  Food.find({
    username: req.user.username
  }, function (err, foodResults) {
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
  console.log('in pantry post router, req.body ->', req.body);
  console.log('in pantry post router, req.user ->', req.user);

  Food.updateOne({
      username: req.user.username
    }, {
      $push: {
        food: {
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
  console.log('in pantry put router, req.body ->', req.body);

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
  console.log('in pantry delete route with req.params ->', req.params);

  Food.update({
      username: req.user.username
    }, {
      $pull: {
        food: {
          "name": req.params.food
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