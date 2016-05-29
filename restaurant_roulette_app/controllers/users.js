// ======================
// Requirements
// ======================
var express = require('express');
var router = express();
var request = require('request');
var cookieParser = require('cookie-parser');
var Users = require('../models/users.js');




//Get Index page
//====================================
// router.get('/', function(req, res) {
// 	console.log("===>We've got to the root page<===");
// 	res.render('index.ejs');
// });

//Get Create-User Page
//====================================
router.get('/newuser', function(req, res) {
	console.log("=======>Newbie On The Way<======");
	res.render('createuser.ejs');
});

//Get User Home Screen page
//===================================
router.get('/homepage', function(req, res) {
	console.log("=======>user homepage is working<=====");
	Users.find({}, function(err, users) {
		res.render('homescreen.ejs', {users})
	});
});

//Get Restaurant - This is my 1st API Request
//========================================
router.get('/', function(req, res) {
	var results;
	request('https://api.yelp.com/v2/search?term=food&location=San+Francisco', function(err, response, body) {
		if(!err && response.statusCode == 200) {
			console.log("Yelp API Data Below======>");
			console.log(body);
			results = body;
		}
	});
	console.log("My results are poppin======>", results);
	res.json(results);
})
//Get Restaurant Show page
//==============================
// router.get('/show', function(req, res) {
// 	res.
// })

module.exports = router;
