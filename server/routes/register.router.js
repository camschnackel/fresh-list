var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var path = require('path');


// Handles request for HTML file
router.get('/', function(req, res, next) {
  console.log('get /register route');
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {
  console.log('post /register route');
  /*
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  recipes: {type: Array}
  */
    // var userToSave = {
    //   name : req.body.name,
    //   username : req.body.username,
    //   password : req.body.password
    // };

    var newUser = new User ({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });

    console.log('userToSave', newUser);
    
    // Users.create

    newUser.save(function(err, post) {
      console.log('post /register -- User.create');
         if(err) {
           console.log('err ->', err);
           console.log('post /register -- User.create -- failure');
           res.sendStatus(500);
         } else {
           console.log('post /register -- User.create -- success');
           res.sendStatus(201);
         }
    });
});


module.exports = router;
