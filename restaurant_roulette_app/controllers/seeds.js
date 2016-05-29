// ===================
// Requirements
// ===================
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/users.js');


// router.get('/', function(req, res) {
// 	console.log("==> my root gets it?<==");
// 	Users.find({}, function(err, products) {
// 		res.json(Users);
// 	})
// });

// router.get('/newseeds', function(req, res) {
// 	console.log("===>The seeds have arrived<===");
// 	var newUsers = [
// 		{
// 			name: "Joe", 
// 			myPlaces: []
// 		}
// 	];

// 	Users.create(newUsers, function() {
// 		console.log("==>Seeds Planted<==");
// 		console.log(newUsers);
// 		res.redirect('/seed');
// 	});
// });



module.exports = router;
