// ==============================
// Requirements
// ==============================
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	db = process.env.MONGODB_URI || "mongodb://localhost/restaurant_roulette",
	methodOverride = require("method-override"),
	mongoose = require("mongoose"),
	morgan = require("morgan"),
	cookieParser = require('cookie-parser');
	port = process.env.PORT || 3000;


// ==============================
// Middleware
// ==============================
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


// ==============================
// Database
// ==============================
mongoose.connect(db);

// ==============================
// Controllers
// ==============================
var usersController = require('./controllers/users.js');
app.use('/rroulette', usersController);

// var seedController = require('./controllers/seeds.js');
// app.use('/seed', seedController);

// ==============================
// Listen
// ==============================
app.listen(port);
console.log("=============================");
console.log("Server is up and running on Andre" + port);
console.log("=============================");
