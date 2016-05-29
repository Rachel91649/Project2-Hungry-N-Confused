// ===================
// Requirements
// ===================
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/user.js');


router.get('/', function(req, res) {
	console.log("==> my root gets it?<==");
	Users.find({}, function(err, products) {
		res.json(users);
	})
});

router.get('/newseeds', function(req, res) {
	console.log("===>The seeds have arrived<===");
	var newUsers = [
		{
			name: "Joe", 
			myPlaces: {
				label: "home",
				zipcode: 10010}
		}
	];
	Users.create(newUsers, function() {
		console.log("==>Seeds Planted<==");
		res.redirect('/seed');
	});
});



module.exports = router;
