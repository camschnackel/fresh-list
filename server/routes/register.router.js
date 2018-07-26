var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var path = require('path');


// Handles request for HTML file
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {

    var newUser = new User ({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });

    newUser.save(function(err, post) {
         if(err) {
           res.sendStatus(500);
         } else {
           res.sendStatus(201);
         }
    });
});


module.exports = router;
