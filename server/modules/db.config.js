var mongoose = require('mongoose');

// Mongo Connection //
var mongoURI = '';
// process.env.MONGODB_URI will only be defined if you are running on Heroku
if(process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost/solo';
}

// var mongoURI = "mongodb://localhost:27017/passport";
var db = mongoose.connect(mongoURI).connection;

// mongoDB.on('error', function(err, res){
//    if(err) {
//      console.log("MONGO ERROR: ", err);
//    }
//    res.sendStatus(500);
// });

// mongoDB.once('open', function(){
//    console.log("Connected to Mongo!");
// });

db.on('error', function (err) {
  console.log(err.message);
});
db.once('open', function () {
  console.log("mongodb connection open");
});

// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", function (callback) {
//   console.log("Connection Succeeded");
// });

module.exports = db;
