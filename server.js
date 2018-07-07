// step 1 of 15: (see main.hndlbrs for step 2)



// Required Dependencies:
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// hosts designated ||'or' 3000
var PORT = process.env.PORT || 3000;

// instantiate express app
var app = express();

// setup Express application
var router = express.Router();
require("./config/routes")(router);

// make the public folder designated static dir
app.use(express.static(__dirname + "/public"));

// connnects handlebars to express app
app.engine("handlebars", expressHandlebars({
defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// using bp in app
app.use(bodyParser.urlencoded({
extended: false
}));

// every req goes thru router middleware
app.use(router);

// if deployed, use that deployed db if not then use local assigned db
// also this Names the DB and connects to it
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";

// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });



// connects mongoose to db
mongoose.connect(db, function(error) {

// log errors when connecting to mongoose
   if (error) {
    console.log(error);
  }

// or log success msg
  else {
    console.log("mongoose connection is successful");
  }
});

// port listening
app.listen(PORT, function() {
   console.log("Listening on port:" + PORT);
});
