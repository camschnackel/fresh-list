var router = require('express').Router();
var path = require('path');
var request = require('request');
var mongoose = require('mongoose');
var Food = require('../models/user.js');

// sends call to recipe API to request suggested recipes based on selected pantry item
router.get('/suggest', function (req, res) {
  var options = {
    url: 'https://api.edamam.com/search?q=' + req.query.name + '&app_id=' + process.env.EDAMOM_ID + '&app_key=' + process.env.EDAMOM_KEY + '&from=' + 0 + '&to=' + 10,
    method: 'GET'
  }

  request(options, function (error, response, body) {
    res.status(200).send(JSON.parse(body));
  })

})

// send call to recipe API to request recipes based on search performed in discover view
router.get('/search', function (req, res) {

  var options = {
    url: 'https://api.edamam.com/search?q=' + req.query.name + '&app_id=' + process.env.EDAMOM_ID + '&app_key=' + process.env.EDAMOM_KEY + '&from=' + 0 + '&to=' + 10,
    method: 'GET'
  }

  request(options, function (error, response, body) {
    res.status(200).send(JSON.parse(body));
  })

})

// retrieves all saved recipes for logged in user
router.get('/', function (req, res) {

  Food.find({
      username: req.user.username
    }, {
      recipes: 1,
      _id: 0
    },
    function (err, recipeResults) {
      if (err || recipeResults === undefined) {
        res.sendStatus(500);
      } else {
        res.send(recipeResults);
      }
    })
})

// post request to save new recipe
router.post('/', function (req, res) {

  Food.updateOne({
      username: req.user.username
    }, {
      $push: {
        recipes: {
          label: req.body.label,
          url: req.body.url,
          uri: req.body.uri,
          dietLabels: req.body.diet,
          healthLabels: req.body.healthLabels,
          ingredientLines: req.body.ingredientLines,
          image: req.body.image,
          source: req.body.source,
          uri: req.body.uri
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
})

// delete request to remove previously saved recipe
router.delete('/:uri', function (req, res) {

  var uri = 'http://www.edamam.com/ontologies/edamam.owl#';
  uri += req.params.uri; // Adding rest of URI back
  req.params = uri; // setting req.params value to full URI

  Food.update({
    username: req.user.username
  }, {
      $pull: {
        recipes: {
          "uri": req.params
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
})

module.exports = router;