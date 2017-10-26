var router = require('express').Router();
var path = require('path');
var request = require('request');
var mongoose = require('mongoose');
var Food = require('../models/user.js');

router.get('/suggest', function (req, res) {
  console.log('in the recipe suggest get route', req.query);

  var options = {
    url: 'https://api.edamam.com/search?q=' + req.query.name,
    method: 'GET',
    headers: {
      'app_id': process.env.EDAMOM_ID,
      'app_key': process.env.EDAMOM_KEY,
      'from': 0,
      'to': 2
    }
  }

  request(options, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    // send entire body or parts of it
    res.status(200).send(JSON.parse(body));
  })

})

router.get('/', function (req, res) {
  console.log('in the recipe get route');

  Food.find({
      username: req.user.username
    }, {
      recipes: 1,
      _id: 0
    },
    function (err, recipeResults) {
      if (err) {
        console.log('Food.find err ->', err);
        res.sendStatus(500);
      } else {
        console.log('Get Update Added');
        res.send(recipeResults);
      }
    })
})

router.post('/', function (req, res) {
  console.log('in the recipe post route, req.body ->', req.body);

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
        console.log('Recipe.updateOne err', err);
        res.sendStatus(500);
      } else {
        console.log('Post Update added');
        res.sendStatus(201);
      }
    }
  );
})

router.delete('/:uri', function (req, res) {
  console.log('in the recipe delete route, req.params ->', req.params);

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
        console.log('Recipe.updateOne err', err);
        res.sendStatus(500);
      } else {
        console.log('Delete Update added');
        res.sendStatus(201);
      }
    }
  );
})

module.exports = router;