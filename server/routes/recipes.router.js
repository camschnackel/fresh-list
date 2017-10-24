var router = require('express').Router();
var path = require('path');
var request = require('request');

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

module.exports = router;